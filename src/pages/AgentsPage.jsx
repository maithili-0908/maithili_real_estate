import { useOutletContext } from 'react-router-dom'

function AgentsPage() {
  const { agents } = useOutletContext()

  return (
    <section className="section" aria-labelledby="agents-title">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Specialist Team</p>
          <h1 id="agents-title">Agents</h1>
        </div>
      </div>

      <div className="agent-grid" role="list">
        {agents.map((agent) => {
          const name = agent.name || 'Agent'
          const email = typeof agent.email === 'string' ? agent.email : ''
          const phone = typeof agent.phone === 'string' ? agent.phone : ''
          const avatar =
            agent.avatar ||
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
          const telHref = phone ? `tel:${phone.replace(/\s+/g, '')}` : ''

          return (
            <article
              className="agent-card"
              key={agent.id || email || name}
              role="listitem"
            >
              <img src={avatar} alt={`Portrait of ${name}`} loading="lazy" />
              <div className="agent-card-body">
                <h2>{name}</h2>
                <p className="pill">{agent.role || 'Property Advisor'}</p>
                <p>{agent.bio || 'Reach out to discuss listings and availability.'}</p>
                <dl className="meta-grid">
                  <div>
                    <dt>Rating</dt>
                    <dd>{agent.rating || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt>Transactions</dt>
                    <dd>{agent.transactions || 0}</dd>
                  </div>
                </dl>

                {agent.areas?.length > 0 && (
                  <ul className="feature-list" aria-label={`${name} focus areas`}>
                    {agent.areas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                )}

                <div className="agent-contact-links">
                  {email ? <a href={`mailto:${email}`}>{email}</a> : <span>Email unavailable</span>}
                  {phone ? <a href={telHref}>{phone}</a> : <span>Phone unavailable</span>}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default AgentsPage
