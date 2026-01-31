const STEPS = [
  { key: 'pending', label: 'Requested', icon: '&#128221;' },
  { key: 'accepted', label: 'Accepted', icon: '&#10004;' },
  { key: 'in_progress', label: 'In Progress', icon: '&#128666;' },
  { key: 'completed', label: 'Completed', icon: '&#127881;' }
]

const STATUS_INDEX = {
  pending: 0,
  accepted: 1,
  in_progress: 2,
  completed: 3,
  cancelled: -1
}

function StatusTimeline({ status }) {
  const currentIndex = STATUS_INDEX[status] ?? 0
  const progressPercent = currentIndex === 3 ? 100 : (currentIndex / 3) * 100

  if (status === 'cancelled') {
    return (
      <div className="status-timeline" style={{ textAlign: 'center', color: 'var(--danger)' }}>
        <span style={{ fontSize: '1.5rem' }}>&#10005;</span>
        <span style={{ marginLeft: '0.5rem', fontWeight: 600 }}>Request Cancelled</span>
      </div>
    )
  }

  return (
    <div className="status-timeline">
      <div className="timeline-track">
        <div
          className="timeline-progress"
          style={{ width: `calc(${progressPercent}% - 40px)` }}
        />
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex

          return (
            <div
              key={step.key}
              className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              title={step.label}
            >
              <span dangerouslySetInnerHTML={{ __html: isCompleted ? '&#10003;' : step.icon }} />
            </div>
          )
        })}
      </div>
      <div className="timeline-labels">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex

          return (
            <span
              key={step.key}
              className={`timeline-label ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
            >
              {step.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default StatusTimeline
