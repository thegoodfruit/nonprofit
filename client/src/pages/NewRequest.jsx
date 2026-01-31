import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'

const REQUEST_TYPES = [
  { value: 'food', label: 'Food', icon: '&#127829;' },
  { value: 'clothing', label: 'Clothing', icon: '&#128085;' },
  { value: 'shelter', label: 'Shelter', icon: '&#127968;' },
  { value: 'transportation', label: 'Transportation', icon: '&#128663;' },
  { value: 'medical', label: 'Medical', icon: '&#127973;' },
  { value: 'financial', label: 'Financial', icon: '&#128176;' },
  { value: 'other', label: 'Other', icon: '&#128300;' }
]

const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', description: 'Can wait a few days' },
  { value: 'normal', label: 'Normal', description: 'Within a day or two' },
  { value: 'high', label: 'High', description: 'Needed today' },
  { value: 'urgent', label: 'Urgent', description: 'Immediate need' }
]

function NewRequest() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    type: 'food',
    title: '',
    description: '',
    requester_name: '',
    requester_contact: '',
    location: '',
    urgency: 'normal'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.requester_name) {
      setToast({ type: 'error', message: 'Please fill in all required fields' })
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const newRequest = await res.json()
        setToast({ type: 'success', message: 'Request created successfully!' })
        setTimeout(() => {
          navigate(`/request/${newRequest.id}`)
        }, 1000)
      } else {
        const error = await res.json()
        setToast({ type: 'error', message: error.error || 'Failed to create request' })
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-card">
      <h2 className="form-title">&#10133; New Request</h2>
      <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
        Fill out the form below to submit a request for assistance.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Type of Request *</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem' }}>
            {REQUEST_TYPES.map(type => (
              <label
                key={type.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  border: `2px solid ${formData.type === type.value ? 'var(--primary)' : 'var(--gray-200)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: formData.type === type.value ? 'var(--gray-50)' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="radio"
                  name="type"
                  value={type.value}
                  checked={formData.type === type.value}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <span dangerouslySetInnerHTML={{ __html: type.icon }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="title">Request Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            placeholder="Brief description of what you need"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Details</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            placeholder="Provide additional details about your request..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Urgency Level</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {URGENCY_LEVELS.map(level => (
              <label
                key={level.value}
                style={{
                  padding: '0.75rem',
                  border: `2px solid ${formData.urgency === level.value ? 'var(--primary)' : 'var(--gray-200)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: formData.urgency === level.value ? 'var(--gray-50)' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={level.value}
                  checked={formData.urgency === level.value}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{level.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{level.description}</div>
              </label>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="requester_name">Your Name *</label>
            <input
              type="text"
              id="requester_name"
              name="requester_name"
              className="form-input"
              placeholder="John Doe"
              value={formData.requester_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="requester_contact">Contact (Phone/Email)</label>
            <input
              type="text"
              id="requester_contact"
              name="requester_contact"
              className="form-input"
              placeholder="phone or email"
              value={formData.requester_contact}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            placeholder="City, State or Address"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

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

export default NewRequest
