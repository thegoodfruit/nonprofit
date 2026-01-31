function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel, isLoading }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-icon success">&#128077;</div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button
            className="modal-btn cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="modal-btn confirm"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
