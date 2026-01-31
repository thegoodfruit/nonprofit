import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import StatusTimeline from './StatusTimeline'
import ConfirmModal from './ConfirmModal'

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

function RequestCard({ request, onStatusChange }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const actionConfig = ACTION_CONFIGS[request.status]

  const handleAction = async () => {
    setIsUpdating(true)
    await onStatusChange(request.id)
    setIsUpdating(false)
    setShowConfirm(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="request-card">
      <div className="request-card-header">
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

      <div className="request-card-body">
        <Link to={`/request/${request.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="request-title">{request.title}</h3>
        </Link>
        {request.description && (
          <p className="request-description">{request.description}</p>
        )}
        <div className="request-meta">
          <span className="request-meta-item">
            <span>&#128100;</span>
            {request.requester_name}
          </span>
          {request.location && (
            <span className="request-meta-item">
              <span>&#128205;</span>
              {request.location}
            </span>
          )}
          <span className="request-meta-item">
            <span>&#128197;</span>
            {formatDate(request.created_at)}
          </span>
        </div>
      </div>

      <StatusTimeline status={request.status} />

      {request.canAdvance && actionConfig && (
        <div className="request-card-footer">
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
        <div className="request-card-footer">
          <div style={{ textAlign: 'center', color: 'var(--success)', fontWeight: 600 }}>
            <span>&#10004;</span> Request Completed
            {request.completed_at && (
              <div style={{ fontSize: '0.813rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                {formatDate(request.completed_at)}
              </div>
            )}
          </div>
        </div>
      )}

      {showConfirm && (
        <ConfirmModal
          title={actionConfig.confirmTitle}
          message={actionConfig.confirmMessage}
          confirmLabel={actionConfig.label}
          onConfirm={handleAction}
          onCancel={() => setShowConfirm(false)}
          isLoading={isUpdating}
        />
      )}
    </div>
  )
}

export default RequestCard
