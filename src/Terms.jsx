function Terms({ onBack }) {
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
          Terms of Service
        </h1>

        <p className="legal-updated">
          Last updated: August 20, 2026
        </p>

        <section>
          <h2>Acceptance of Terms</h2>

          <p>
            By using SmartFile Tools, you agree
            to these Terms of Service. If you do
            not agree with these terms, please do
            not use the website.
          </p>
        </section>

        <section>
          <h2>Using Our Tools</h2>

          <p>
            SmartFile Tools provides online tools
            for processing images, PDF files, and
            other digital documents. You agree to
            use these tools only for lawful
            purposes.
          </p>
        </section>

        <section>
          <h2>Your Files</h2>

          <p>
            You are responsible for the files you
            upload and process through our tools.
            You should only upload files that you
            have the right to use and process.
          </p>
        </section>

        <section>
          <h2>Service Availability</h2>

          <p>
            We aim to keep SmartFile Tools
            available and reliable, but we cannot
            guarantee that every tool or feature
            will always be available or free from
            interruptions.
          </p>
        </section>

        <section>
          <h2>Results and Accuracy</h2>

          <p>
            File processing results may vary
            depending on the file, browser, device,
            and selected options. You should review
            important files and results before
            relying on them.
          </p>
        </section>

        <section>
          <h2>Prohibited Use</h2>

          <p>
            You must not use SmartFile Tools to
            upload, process, distribute, or create
            content that violates applicable laws
            or the rights of others.
          </p>
        </section>

        <section>
          <h2>Changes to These Terms</h2>

          <p>
            We may update these Terms of Service
            as SmartFile Tools develops. Updated
            terms will be published on this page.
          </p>
        </section>

        <section>
          <h2>Contact</h2>

          <p>
            If you have questions about these
            Terms of Service, please contact the
            SmartFile Tools team.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Terms