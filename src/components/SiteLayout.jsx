import { NavLink, Outlet } from 'react-router-dom'
import { useSiteData } from '../hooks/useSiteData'
import ScrollToTop from './ScrollToTop'

const navigationLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/listings', label: 'Listings' },
  { to: '/agents', label: 'Agents' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function SiteLayout() {
  const { properties, agents, loading, notice, hasLiveData } = useSiteData()
  const currentYear = new Date().getFullYear()

  return (
    <div className="site-shell">
      <ScrollToTop />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header" role="banner">
        <div className="container site-header-inner">
          <NavLink className="brand" to="/" aria-label="Maithili Estates home">
            <span className="brand-mark" aria-hidden="true">
              ME
            </span>
            <span>
              <strong>Maithili Estates</strong>
              <small>Residential Real Estate</small>
            </span>
          </NavLink>

          <nav aria-label="Primary navigation">
            <ul className="site-nav-list">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'site-nav-link site-nav-link-active' : 'site-nav-link'
                    }
                    end={link.end}
                    to={link.to}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <a className="header-cta" href="tel:+919841022184">
            Call +91 98410 22184
          </a>
        </div>
      </header>

      <main id="main-content" className="site-main container" tabIndex="-1">
        {notice && (
          <p className="status-banner" role="status">
            {notice}
          </p>
        )}
        {loading && (
          <p className="loading-note" role="status">
            Loading latest listing information...
          </p>
        )}

        <Outlet
          context={{
            properties,
            agents,
            loading,
            hasLiveData,
          }}
        />
      </main>

      <footer className="site-footer">
        <div className="container site-footer-inner">
          <p>
            <strong>Maithili Estates</strong> <span>({currentYear})</span>
          </p>
          <p>Accessible and structured property information across Chennai neighborhoods.</p>
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
