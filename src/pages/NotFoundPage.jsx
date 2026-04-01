import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="eyebrow">404</p>
      <h1 id="not-found-title">Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link className="button button-primary" to="/">
        Return to Home
      </Link>
    </section>
  )
}

export default NotFoundPage
