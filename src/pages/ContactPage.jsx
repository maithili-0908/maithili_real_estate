import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { API_BASE } from '../config/api'

const initialFormState = {
  propertyId: '',
  name: '',
  email: '',
  phone: '',
  message: '',
}

function ContactPage() {
  const { properties, hasLiveData } = useOutletContext()
  const [formData, setFormData] = useState(initialFormState)
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState({ type: '', message: '' })

  useEffect(() => {
    if (!properties.length) {
      return
    }

    setFormData((previous) => {
      const propertyExists = properties.some((property) => property.id === previous.propertyId)
      if (propertyExists) {
        return previous
      }

      return {
        ...previous,
        propertyId: properties[0].id,
      }
    })
  }, [properties])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!hasLiveData) {
      setNotice({
        type: 'error',
        message:
          'Live inquiry submission is unavailable right now. Please call +91 98410 22184 or email hello@maithiliestates.in.',
      })
      return
    }

    setSubmitting(true)
    setNotice({ type: '', message: '' })

    try {
      const response = await fetch(`${API_BASE}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit your inquiry. Please try again.')
      }

      setNotice({ type: 'success', message: 'Inquiry submitted. An advisor will contact you shortly.' })
      setFormData((previous) => ({
        ...initialFormState,
        propertyId: previous.propertyId,
      }))
    } catch (error) {
      setNotice({ type: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section" aria-labelledby="contact-title">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 id="contact-title">Request information or a callback</h1>
        </div>
      </div>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} aria-describedby="contact-help">
          <p id="contact-help" className="muted">
            Fields marked with * are required.
          </p>

          <div>
            <label htmlFor="contact-property">Property *</label>
            <select
              id="contact-property"
              name="propertyId"
              onChange={handleChange}
              required
              value={formData.propertyId}
            >
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-name">Full name *</label>
            <input
              id="contact-name"
              name="name"
              onChange={handleChange}
              required
              type="text"
              value={formData.name}
            />
          </div>

          <div>
            <label htmlFor="contact-email">Email *</label>
            <input
              id="contact-email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={formData.email}
            />
          </div>

          <div>
            <label htmlFor="contact-phone">Phone</label>
            <input
              id="contact-phone"
              name="phone"
              onChange={handleChange}
              type="tel"
              value={formData.phone}
            />
          </div>

          <div>
            <label htmlFor="contact-message">Message *</label>
            <textarea
              id="contact-message"
              name="message"
              onChange={handleChange}
              required
              rows="6"
              value={formData.message}
            />
          </div>

          <button className="button button-primary" disabled={submitting} type="submit">
            {submitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>

          {notice.message && (
            <p
              className={notice.type === 'error' ? 'form-note form-note-error' : 'form-note form-note-success'}
              role="status"
              aria-live="polite"
            >
              {notice.message}
            </p>
          )}
        </form>

        <aside className="contact-card" aria-label="Office contact details">
          <h2>Office Details</h2>
          <p>
            <strong>Phone:</strong> <a href="tel:+919841022184">+91 98410 22184</a>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:hello@maithiliestates.in">hello@maithiliestates.in</a>
          </p>
          <p>
            <strong>Hours:</strong> Monday to Saturday, 9:00 AM to 6:00 PM IST
          </p>
          <p>
            <strong>Office:</strong> Nungambakkam High Road, Chennai, Tamil Nadu
          </p>
        </aside>
      </div>
    </section>
  )
}

export default ContactPage
