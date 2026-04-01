import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { formatCurrency, getPrimaryImage } from '../utils/format'

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Largest Area', value: 'area-desc' },
]

function ListingsPage() {
  const { properties } = useOutletContext()
  const [location, setLocation] = useState('all')
  const [type, setType] = useState('all')
  const [sortBy, setSortBy] = useState('recommended')

  const locations = useMemo(
    () => ['all', ...new Set(properties.map((property) => property.location))],
    [properties],
  )

  const types = useMemo(
    () => ['all', ...new Set(properties.map((property) => property.type))],
    [properties],
  )

  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const matchesLocation = location === 'all' || property.location === location
      const matchesType = type === 'all' || property.type === type
      return matchesLocation && matchesType
    })

    if (sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'area-desc') {
      return [...filtered].sort((a, b) => b.sqft - a.sqft)
    }

    return filtered
  }, [location, properties, sortBy, type])

  return (
    <section className="section" aria-labelledby="listings-title">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Property Directory</p>
          <h1 id="listings-title">Listings</h1>
        </div>
        <p className="muted" role="status" aria-live="polite">
          {filteredProperties.length} properties shown
        </p>
      </div>

      <form className="filter-panel" aria-label="Listing filters">
        <div>
          <label htmlFor="listing-location">Location</label>
          <select
            id="listing-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            {locations.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All locations' : option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="listing-type">Property type</label>
          <select id="listing-type" value={type} onChange={(event) => setType(event.target.value)}>
            {types.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All types' : option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="listing-sort">Sort by</label>
          <select id="listing-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="card-grid">
        {filteredProperties.map((property) => (
          <article className="property-card" key={property.id}>
            <img
              src={getPrimaryImage(property.images)}
              alt={`Exterior view of ${property.title}`}
              loading="lazy"
            />
            <div className="property-card-body">
              <p className="pill">{property.status || 'Available'}</p>
              <h2>{property.title}</h2>
              <p className="muted">{property.location}</p>
              <p className="price">{formatCurrency(property.price)}</p>
              <p>{property.description}</p>
              <ul className="feature-list" aria-label={`${property.title} features`}>
                <li>{property.type}</li>
                <li>{property.beds} beds</li>
                <li>{property.baths} baths</li>
                <li>{property.sqft} sq.ft.</li>
              </ul>
            </div>
          </article>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <p className="empty-state" role="status">
          No properties match these filters. Try broadening location or property type.
        </p>
      )}
    </section>
  )
}

export default ListingsPage
