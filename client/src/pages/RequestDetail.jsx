import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import StatusTimeline from '../components/StatusTimeline'
import ConfirmModal from '../components/ConfirmModal'
import Toast from '../components/Toast'

const TYPE_ICONS = {
  food: '&#127829;',
  clothing: '&#128085;',
  shelter: '&#127968;',
  transportation: '&#128663;',
  medical: '&#127973;',
  financial: '&#128176;',
  other: '&#128300;'
}

const ACTION_CONFIGS = {
  pending: {
    label: 'Accept Request',
    icon: '&#10004;',
    className: 'primary',
    confirmTitle: 'Accept this request?',
    confirmMessage: 'You will be assigned as the volunteer for this request.'
  },
  accepted: {
    label: 'Start Fulfilling',
    icon: '&#9654;',
    className: 'warning',
    confirmTitle: 'Start fulfilling this request?',
    confirmMessage: 'This indicates you are actively working on this request.'
  },
  in_progress: {
    label: 'Mark Complete',
    icon: '&#10003;',
    className: 'success',
    confirmTitle: 'Mark as complete?',
    confirmMessage: 'Confirm that this request has been fully fulfilled.'
  }
}

function RequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchRequest()
  }, [id])

  const fetchRequest = async () => {
    try {
      const res = await fetch(`/api/requests/${id}`)
      if (res.ok) {
        setRequest(await res.json())
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Failed to fetch request:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleAdvance = async () => {
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/requests/${id}/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ volunteer_name: 'Volunteer' })
      })

      if (res.ok) {
        const updated = await res.json()
        setRequest(updated)
        setToast({
          type: 'success',
          message: updated.status === 'completed' ? 'Request completed!' : 'Status updated!'
        })
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to update request' })
    } finally {
      setIsUpdating(false)
      setShowConfirm(false)
    }
  }

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this request?')) return

    try {
      const res = await fetch(`/api/requests/${id}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cancelled_by: 'User', reason: 'Cancelled by user' })
      })

      if (res.ok) {
        const updated = await res.json()
        setRequest(updated)
        setToast({ type: 'success', message: 'Request cancelled' })
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to cancel request' })
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return <div className="empty-state">Loading...</div>
  }

  if (!request) {
    return <div className="empty-state">Request not found</div>
  }

  const actionConfig = ACTION_CONFIGS[request.status]

  return (
    <div className="request-detail">
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary)',
          cursor: 'pointer',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}
      >
        &larr; Back to Dashboard
      </button>

      <div className="detail-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <span
              className={`request-type ${request.type}`}
              dangerouslySetInnerHTML={{ __html: `${TYPE_ICONS[request.type] || TYPE_ICONS.other} ${request.type}` }}
            />
            {request.urgency !== 'normal' && (
              <span className={`urgency-badge ${request.urgency}`} style={{ marginLeft: '0.5rem' }}>
                {request.urgency}
              </span>
            )}
          </div>
          <StatusBadge status={request.status} />
        </div>

        <h1 className="detail-title">{request.title}</h1>

        {request.description && (
          <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>{request.description}</p>
        )}

        <div className="request-meta">
          <span className="request-meta-item">
            <span>&#128100;</span>
            <strong>Requester:</strong> {request.requester_name}
          </span>
          {request.requester_contact && (
            <span className="request-meta-item">
              <span>&#128222;</span>
              <strong>Contact:</strong> {request.requester_contact}
            </span>
          )}
          {request.location && (
            <span className="request-meta-item">
              <span>&#128205;</span>
              <strong>Location:</strong> {request.location}
            </span>
          )}
        </div>
      </div>

      <div className="detail-section">
        <h3>&#128200; Request Progress</h3>
        <StatusTimeline status={request.status} />

        {request.canAdvance && actionConfig && (
          <div style={{ marginTop: '1.5rem' }}>
            <button
              className={`action-btn ${actionConfig.className}`}
              onClick={() => setShowConfirm(true)}
              disabled={isUpdating}
            >
              <span
                className="action-btn-icon"
                dangerouslySetInnerHTML={{ __html: actionConfig.icon }}
              />
              {isUpdating ? 'Updating...' : actionConfig.label}
            </button>
          </div>
        )}

        {request.status === 'completed' && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--success)' }}>
            <span style={{ fontSize: '2rem' }}>&#127881;</span>
            <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>Request Successfully Completed!</div>
            {request.completed_at && (
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                Completed on {formatDate(request.completed_at)}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="detail-section">
        <h3>&#128337; Activity History</h3>
        <div className="history-timeline">
          {request.history?.map((item, index) => (
            <div
              key={item.id || index}
              className={`history-item ${item.status === 'completed' ? 'completed' : ''}`}
            >
              <div className="history-time">{formatDate(item.changed_at)}</div>
              <div className="history-status">
                Status: {item.status.replace('_', ' ')}
              </div>
              {item.note && <div className="history-note">{item.note}</div>}
              {item.changed_by && (
                <div className="history-note">By: {item.changed_by}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {request.volunteer_name && (
        <div className="detail-section">
          <h3>&#129489; Assigned Volunteer</h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>&#128100;</span>
            <span>{request.volunteer_name}</span>
          </p>
          {request.accepted_at && (
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
              Accepted on {formatDate(request.accepted_at)}
            </p>
          )}
        </div>
      )}

      {request.status !== 'completed' && request.status !== 'cancelled' && (
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={handleCancel}
            style={{
              background: 'none',
              border: '2px solid var(--danger)',
              color: 'var(--danger)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Cancel Request
          </button>
        </div>
      )}

      {showConfirm && (
        <ConfirmModal
          title={actionConfig.confirmTitle}
          message={actionConfig.confirmMessage}
          confirmLabel={actionConfig.label}
          onConfirm={handleAdvance}
          onCancel={() => setShowConfirm(false)}
          isLoading={isUpdating}
        />
      )}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default RequestDetail
