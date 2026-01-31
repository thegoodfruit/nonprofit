const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

const router = express.Router();

// Request types available
const REQUEST_TYPES = ['food', 'clothing', 'shelter', 'transportation', 'medical', 'financial', 'other'];

// Status flow (like Uber/Airbnb)
const STATUS_FLOW = {
  pending: { next: 'accepted', action: 'Accept Request', icon: 'clock' },
  accepted: { next: 'in_progress', action: 'Start Fulfilling', icon: 'check' },
  in_progress: { next: 'completed', action: 'Mark Complete', icon: 'truck' },
  completed: { next: null, action: null, icon: 'check-circle' },
  cancelled: { next: null, action: null, icon: 'x-circle' }
};

// Get all requests with optional filters
router.get('/', (req, res) => {
  const { status, type, urgency } = req.query;

  let query = 'SELECT * FROM requests WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }
  if (urgency) {
    query += ' AND urgency = ?';
    params.push(urgency);
  }

  query += ' ORDER BY CASE urgency WHEN "urgent" THEN 1 WHEN "high" THEN 2 WHEN "normal" THEN 3 WHEN "low" THEN 4 END, created_at DESC';

  const requests = db.prepare(query).all(...params);

  // Add next action info to each request
  const enrichedRequests = requests.map(req => ({
    ...req,
    statusInfo: STATUS_FLOW[req.status],
    canAdvance: STATUS_FLOW[req.status]?.next !== null
  }));

  res.json(enrichedRequests);
});

// Get single request with full history
router.get('/:id', (req, res) => {
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(req.params.id);

  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  const history = db.prepare(
    'SELECT * FROM status_history WHERE request_id = ? ORDER BY changed_at ASC'
  ).all(req.params.id);

  res.json({
    ...request,
    statusInfo: STATUS_FLOW[request.status],
    canAdvance: STATUS_FLOW[request.status]?.next !== null,
    history
  });
});

// Create new request
router.post('/', (req, res) => {
  const { type, title, description, requester_name, requester_contact, location, urgency } = req.body;

  if (!type || !title || !requester_name) {
    return res.status(400).json({ error: 'Type, title, and requester name are required' });
  }

  if (!REQUEST_TYPES.includes(type)) {
    return res.status(400).json({ error: `Invalid type. Must be one of: ${REQUEST_TYPES.join(', ')}` });
  }

  const id = uuidv4();

  db.prepare(`
    INSERT INTO requests (id, type, title, description, requester_name, requester_contact, location, urgency)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, type, title, description || '', requester_name, requester_contact || '', location || '', urgency || 'normal');

  // Record initial status
  db.prepare(`
    INSERT INTO status_history (request_id, status, changed_by, note)
    VALUES (?, 'pending', ?, 'Request created')
  `).run(id, requester_name);

  const newRequest = db.prepare('SELECT * FROM requests WHERE id = ?').get(id);

  res.status(201).json({
    ...newRequest,
    statusInfo: STATUS_FLOW[newRequest.status],
    canAdvance: true
  });
});

// Advance request to next status (one-click confirmation like Uber)
router.post('/:id/advance', (req, res) => {
  const { volunteer_name, note } = req.body;
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(req.params.id);

  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  const currentStatus = request.status;
  const nextStatus = STATUS_FLOW[currentStatus]?.next;

  if (!nextStatus) {
    return res.status(400).json({ error: 'Request cannot be advanced further' });
  }

  // Update request with new status and timestamps
  const now = new Date().toISOString();
  let updateQuery = 'UPDATE requests SET status = ?';
  const params = [nextStatus];

  if (nextStatus === 'accepted') {
    updateQuery += ', accepted_at = ?, volunteer_name = ?';
    params.push(now, volunteer_name || 'Anonymous Volunteer');
  } else if (nextStatus === 'in_progress') {
    updateQuery += ', started_at = ?';
    params.push(now);
  } else if (nextStatus === 'completed') {
    updateQuery += ', completed_at = ?';
    params.push(now);
  }

  updateQuery += ' WHERE id = ?';
  params.push(req.params.id);

  db.prepare(updateQuery).run(...params);

  // Record status change in history
  db.prepare(`
    INSERT INTO status_history (request_id, status, changed_by, note)
    VALUES (?, ?, ?, ?)
  `).run(req.params.id, nextStatus, volunteer_name || 'System', note || `Status changed to ${nextStatus}`);

  const updatedRequest = db.prepare('SELECT * FROM requests WHERE id = ?').get(req.params.id);
  const history = db.prepare('SELECT * FROM status_history WHERE request_id = ? ORDER BY changed_at ASC').all(req.params.id);

  res.json({
    ...updatedRequest,
    statusInfo: STATUS_FLOW[updatedRequest.status],
    canAdvance: STATUS_FLOW[updatedRequest.status]?.next !== null,
    history
  });
});

// Cancel request
router.post('/:id/cancel', (req, res) => {
  const { cancelled_by, reason } = req.body;
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(req.params.id);

  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  if (request.status === 'completed' || request.status === 'cancelled') {
    return res.status(400).json({ error: 'Cannot cancel a completed or already cancelled request' });
  }

  db.prepare('UPDATE requests SET status = ? WHERE id = ?').run('cancelled', req.params.id);

  db.prepare(`
    INSERT INTO status_history (request_id, status, changed_by, note)
    VALUES (?, 'cancelled', ?, ?)
  `).run(req.params.id, cancelled_by || 'System', reason || 'Request cancelled');

  const updatedRequest = db.prepare('SELECT * FROM requests WHERE id = ?').get(req.params.id);

  res.json({
    ...updatedRequest,
    statusInfo: STATUS_FLOW['cancelled'],
    canAdvance: false
  });
});

// Get request types and status flow info
router.get('/meta/info', (req, res) => {
  res.json({
    types: REQUEST_TYPES,
    statusFlow: STATUS_FLOW,
    urgencyLevels: ['low', 'normal', 'high', 'urgent']
  });
});

// Get dashboard stats
router.get('/stats/dashboard', (req, res) => {
  const stats = {
    total: db.prepare('SELECT COUNT(*) as count FROM requests').get().count,
    pending: db.prepare('SELECT COUNT(*) as count FROM requests WHERE status = ?').get('pending').count,
    accepted: db.prepare('SELECT COUNT(*) as count FROM requests WHERE status = ?').get('accepted').count,
    in_progress: db.prepare('SELECT COUNT(*) as count FROM requests WHERE status = ?').get('in_progress').count,
    completed: db.prepare('SELECT COUNT(*) as count FROM requests WHERE status = ?').get('completed').count,
    cancelled: db.prepare('SELECT COUNT(*) as count FROM requests WHERE status = ?').get('cancelled').count,
    byType: {},
    recentActivity: db.prepare(`
      SELECT sh.*, r.title as request_title
      FROM status_history sh
      JOIN requests r ON sh.request_id = r.id
      ORDER BY sh.changed_at DESC
      LIMIT 10
    `).all()
  };

  REQUEST_TYPES.forEach(type => {
    stats.byType[type] = db.prepare('SELECT COUNT(*) as count FROM requests WHERE type = ?').get(type).count;
  });

  res.json(stats);
});

module.exports = router;
