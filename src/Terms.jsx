function Terms({ onBack }) {
  return (
    <div
      className="legal-page"
      style={{
        minHeight: "100vh",
        padding: "40px 20px 100px",
      }}
    >
      <div
        className="legal-container"
        style={{
          width: "min(900px, 100%)",
          margin: "0 auto",
        }}
      >
        <button
          className="legal-back"
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "30px",
            padding: "10px 16px",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: "10px",
            color: "#cbd5e1",
            background: "rgba(255,255,255,.05)",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          ← Back to Fixora
        </button>

        <div style={{ marginBottom: "55px" }}>
          <p className="eyebrow">FIXORA</p>

          <h1
            style={{
              margin: "0",
              color: "#f8fafc",
              fontSize: "clamp(42px, 7vw, 70px)",
              lineHeight: "1",
              letterSpacing: "-3px",
              fontWeight: "900",
            }}
          >
            Terms of Service
          </h1>

          <p
            className="legal-updated"
            style={{
              marginTop: "22px",
              color: "#94a3b8",
              fontSize: "15px",
            }}
          >
            Last updated: August 20, 2026
          </p>
        </div>

        <section>
          <h2>Acceptance of Terms</h2>

          <p>
            By using Fixora, you agree to these Terms of Service. If you do
            not agree with these terms, please do not use the website.
          </p>
        </section>

        <section>
          <h2>Using Our Tools</h2>

          <p>
            Fixora provides online tools for processing images, PDF files,
            and other digital documents. You agree to use the website and
            its tools only for lawful purposes and in a way that does not
            interfere with the service or the rights of others.
          </p>
        </section>

        <section>
          <h2>Your Files</h2>

          <p>
            You are responsible for the files you select, upload, process,
            or download through Fixora. You should only use files that you
            have the legal right to use and process.
          </p>
        </section>

        <section>
          <h2>Service Availability</h2>

          <p>
            We aim to keep Fixora available and reliable, but we cannot
            guarantee that every tool, feature, or part of the website will
            always be available, uninterrupted, or error-free.
          </p>
        </section>

        <section>
          <h2>Results and Accuracy</h2>

          <p>
            File-processing results can vary depending on the file, browser,
            device, software libraries, and selected options. You should
            review important files and results before relying on them for
            business, legal, financial, or other important purposes.
          </p>
        </section>

        <section>
          <h2>Prohibited Use</h2>

          <p>
            You must not use Fixora to process, distribute, or create content
            in violation of applicable laws, intellectual-property rights,
            privacy rights, or other rights of third parties.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>

          <p>
            Fixora may rely on third-party services for hosting, security,
            analytics, advertising, infrastructure, or other functionality.
            Those services may be subject to their own terms and policies.
          </p>
        </section>

        <section>
          <h2>Changes to These Terms</h2>

          <p>
            We may update these Terms of Service as Fixora develops, new
            tools are introduced, or the services used by the website change.
            Updated terms will be published on this page.
          </p>
        </section>

        <section>
          <h2>Contact</h2>

          <p>
            If you have questions about these Terms of Service, please use
            the contact method made available on the Fixora website.
          </p>
        </section>

        <section
          style={{
            marginTop: "45px",
            padding: "28px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,.09)",
            background:
              "linear-gradient(145deg, rgba(139,92,246,.07), rgba(255,255,255,.02))",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            FIXORA
          </p>

          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
            }}
          >
            Use the tools responsibly.
          </h2>

          <p
            style={{
              marginBottom: 0,
              color: "#94a3b8",
              lineHeight: "1.8",
            }}
          >
            Fixora is built to make everyday file tasks simpler while keeping
            expectations clear about how the service works.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Terms
