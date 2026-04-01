import { Link, useOutletContext } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import { formatCurrency, getPrimaryImage } from '../utils/format'

function HomePage() {
  const { properties, agents } = useOutletContext()

  const featuredProperties = properties.slice(0, 3)

  return (
    <>
      <section className="hero" aria-labelledby="home-hero-title">
        <div className="hero-content">
          <p className="eyebrow">Chennai Residential Guide</p>
          <h1 id="home-hero-title">Find homes with clear information and guided support.</h1>
          <p className="lead">
            Browse by neighborhood, compare practical details, and connect with specialists through
            dedicated pages instead of one long scroll.
          </p>
          <div className="hero-actions" aria-label="Quick actions">
            <Link className="button button-primary" to="/listings">
              Browse Listings
            </Link>
            <Link className="button button-secondary" to="/contact">
              Speak to an Advisor
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <img src={heroImage} alt="Modern Chennai homes and skyline" />
        </div>
      </section>

      <section className="stats-grid" aria-label="Company highlights">
        <article className="stat-card">
          <h2>{properties.length}+</h2>
          <p>Active or curated listings</p>
        </article>
        <article className="stat-card">
          <h2>{agents.length}</h2>
          <p>Neighborhood specialists</p>
        </article>
        <article className="stat-card">
          <h2>7 Days</h2>
          <p>Average inquiry response window</p>
        </article>
      </section>

      <section className="section" aria-labelledby="featured-listings-title">
        <div className="section-heading-row">
          <h2 id="featured-listings-title">Featured Listings</h2>
          <Link className="section-link" to="/listings">
            View all listings
          </Link>
        </div>

        <div className="card-grid">
          {featuredProperties.map((property) => (
            <article className="property-card" key={property.id}>
              <img
                src={getPrimaryImage(property.images)}
                alt={`Exterior view of ${property.title}`}
                loading="lazy"
              />
              <div className="property-card-body">
                <h3>{property.title}</h3>
                <p className="muted">{property.location}</p>
                <p className="price">{formatCurrency(property.price)}</p>
                <p>{property.description}</p>
                <dl className="meta-grid">
                  <div>
                    <dt>Type</dt>
                    <dd>{property.type}</dd>
                  </div>
                  <div>
                    <dt>Beds</dt>
                    <dd>{property.beds}</dd>
                  </div>
                  <div>
                    <dt>Baths</dt>
                    <dd>{property.baths}</dd>
                  </div>
                  <div>
                    <dt>Area</dt>
                    <dd>{property.sqft} sq.ft.</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title">How We Work</h2>
        <ol className="process-list">
          <li>
            <h3>1. Review listings by page</h3>
            <p>Use dedicated listing and agent pages to avoid long-page scanning.</p>
          </li>
          <li>
            <h3>2. Confirm budget and location</h3>
            <p>Shortlist by neighborhood, property type, and practical amenities.</p>
          </li>
          <li>
            <h3>3. Request a guided follow-up</h3>
            <p>Submit a clear inquiry form and our team routes it to the right specialist.</p>
          </li>
        </ol>
      </section>
    </>
  )
}

export default HomePage
