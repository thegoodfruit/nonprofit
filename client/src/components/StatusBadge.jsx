const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: '&#9711;' },
  accepted: { label: 'Accepted', icon: '&#10004;' },
  in_progress: { label: 'In Progress', icon: '&#9654;' },
  completed: { label: 'Completed', icon: '&#10003;' },
  cancelled: { label: 'Cancelled', icon: '&#10005;' }
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending

  return (
    <span className={`status-badge ${status}`}>
      <span className="status-dot" />
      {config.label}
    </span>
  )
}

export default StatusBadge
