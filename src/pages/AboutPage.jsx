function AboutPage() {
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">About Maithili Estates</p>
          <h1 id="about-title">A clearer way to evaluate homes</h1>
        </div>
      </div>

      <div className="about-layout">
        <article className="about-card">
          <h2>Our Approach</h2>
          <p>
            We organize property information into focused pages so buyers can make decisions without
            navigating one long scrolling screen. Each page has clear headings, filters, and contact
            options.
          </p>
          <p>
            Our advisors prioritize practical decision points: budget fit, neighborhood context,
            commute impact, and move-in readiness.
          </p>
        </article>

        <article className="about-card">
          <h2>Accessibility Commitments</h2>
          <ul className="check-list">
            <li>Semantic landmarks and descriptive page headings on every route</li>
            <li>Keyboard-visible focus styles and skip-link support</li>
            <li>Explicit form labels and status updates announced with aria-live</li>
            <li>Text contrast tuned for readability in bright and low-light settings</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Who We Serve</h2>
          <p>
            First-time buyers, relocating families, and investors across Chennai neighborhoods,
            including ECR, OMR, Adyar, Anna Nagar, Mylapore, and Tambaram.
          </p>
        </article>
      </div>
    </section>
  )
}

export default AboutPage
