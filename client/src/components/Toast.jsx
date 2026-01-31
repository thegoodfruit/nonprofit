import { useEffect } from 'react'

function Toast({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: '&#10004;',
    error: '&#10005;',
    info: '&#8505;'
  }

  return (
    <div className={`toast ${type}`}>
      <span dangerouslySetInnerHTML={{ __html: icons[type] || icons.info }} />
      {message}
    </div>
  )
}

export default Toast
