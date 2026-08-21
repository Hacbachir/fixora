function Privacy({ onBack }) {
  return (
    <div className="legal-page">
      <button
        className="legal-back"
        onClick={onBack}
      >
        ← Back to Tools
      </button>

      <div className="legal-content">
        <p className="eyebrow">
          SMARTFILE TOOLS
        </p>

        <h1>
          Privacy Policy
        </h1>

        <p className="legal-updated">
          Last updated: August 20, 2026
        </p>

        <section>
          <h2>Introduction</h2>

          <p>
            SmartFile Tools respects your privacy.
            This Privacy Policy explains how our
            website handles information when you
            use our online file and document tools.
          </p>
        </section>

        <section>
          <h2>Files You Upload</h2>

          <p>
            Our file tools are designed to process
            files directly in your browser whenever
            possible. Files selected for processing
            are not intentionally stored by
            SmartFile Tools.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>

          <p>
            We may collect limited technical
            information needed to operate,
            maintain, secure, and improve the
            website. This may include basic
            information such as browser type,
            device type, pages visited, and
            general usage information.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>

          <p>
            SmartFile Tools may use cookies or
            similar technologies in the future
            for essential functionality,
            analytics, advertising, or improving
            the user experience.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>

          <p>
            We may use trusted third-party
            services for analytics, hosting,
            security, advertising, or other
            website functionality. These services
            may process information according to
            their own privacy policies.
          </p>
        </section>

        <section>
          <h2>Data Security</h2>

          <p>
            We take reasonable measures to protect
            information associated with the
            website. However, no online service
            can guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>

          <p>
            We may update this Privacy Policy as
            the website develops and new services
            are introduced. Any updated version
            will be published on this page.
          </p>
        </section>

        <section>
          <h2>Contact</h2>

          <p>
            If you have questions about this
            Privacy Policy, please contact the
            SmartFile Tools team.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy