import { useState, useEffect } from 'react'
import RequestCard from '../components/RequestCard'
import Toast from '../components/Toast'

const STATUSES = ['all', 'pending', 'accepted', 'in_progress', 'completed']
const STATUS_LABELS = {
  all: 'All Requests',
  pending: 'Pending',
  accepted: 'Accepted',
  in_progress: 'In Progress',
  completed: 'Completed'
}

function Dashboard() {
  const [requests, setRequests] = useState([])
  const [stats, setStats] = useState(null)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchData()
  }, [filter])

  const fetchData = async () => {
    try {
      const [requestsRes, statsRes] = await Promise.all([
        fetch(`/api/requests${filter !== 'all' ? `?status=${filter}` : ''}`),
        fetch('/api/requests/stats/dashboard')
      ])

      const requestsData = await requestsRes.json()
      const statsData = await statsRes.json()

      setRequests(requestsData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setToast({ type: 'error', message: 'Failed to load requests' })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (requestId) => {
    try {
      const res = await fetch(`/api/requests/${requestId}/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ volunteer_name: 'Volunteer' })
      })

      if (res.ok) {
        const updatedRequest = await res.json()
        setRequests(prev =>
          prev.map(r => r.id === requestId ? updatedRequest : r)
        )
        setToast({
          type: 'success',
          message: `Request ${updatedRequest.status === 'completed' ? 'completed' : 'updated'}!`
        })
        // Refresh stats
        const statsRes = await fetch('/api/requests/stats/dashboard')
        setStats(await statsRes.json())
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to update request' })
    }
  }

  if (loading) {
    return <div className="empty-state">Loading...</div>
  }

  return (
    <div>
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Requests</h3>
            <div className="value">{stats.total}</div>
          </div>
          <div className="stat-card pending">
            <h3>Pending</h3>
            <div className="value">{stats.pending}</div>
          </div>
          <div className="stat-card in-progress">
            <h3>In Progress</h3>
            <div className="value">{stats.in_progress}</div>
          </div>
          <div className="stat-card completed">
            <h3>Completed</h3>
            <div className="value">{stats.completed}</div>
          </div>
        </div>
      )}

      <div className="filter-bar">
        {STATUSES.map(status => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {STATUS_LABELS[status]}
            {stats && status !== 'all' && (
              <span> ({stats[status] || 0})</span>
            )}
          </button>
        ))}
      </div>

      {requests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">&#128587;</div>
          <h3>No requests found</h3>
          <p>Create a new request to get started</p>
        </div>
      ) : (
        <div className="requests-grid">
          {requests.map(request => (
            <RequestCard
              key={request.id}
              request={request}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
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

export default Dashboard
