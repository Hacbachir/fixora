function Privacy({ onBack }) {
  return (
    <div className="legal-page" style={{ minHeight: "100vh", padding: "40px 20px 100px" }}>
      <div className="legal-container" style={{ width: "min(900px, 100%)", margin: "0 auto" }}>
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
          <h1 style={{ margin: 0, color: "#f8fafc", fontSize: "clamp(42px, 7vw, 70px)", lineHeight: "1", letterSpacing: "-3px", fontWeight: "900" }}>
            Privacy Policy
          </h1>
          <p className="legal-updated" style={{ marginTop: "22px", color: "#94a3b8", fontSize: "15px" }}>
            Last updated: August 20, 2026
          </p>
        </div>

        <section>
          <h2>Introduction</h2>
          <p>
            Fixora is designed to provide simple online tools for everyday file and document tasks.
            This Privacy Policy explains the types of information that may be processed when you use
            the website and how that information may be used.
          </p>
        </section>

        <section>
          <h2>Files You Use With Fixora</h2>
          <p>
            Some Fixora tools are designed to process selected files directly in your web browser.
            When a tool performs processing in the browser, the file is handled by that browser session
            rather than being intentionally uploaded to a Fixora server by that tool.
          </p>
          <p>
            Different tools may work differently as the service develops. You should review the information
            displayed by a particular tool before using it with sensitive documents.
          </p>
        </section>

        <section>
          <h2>Information and Technical Data</h2>
          <p>
            Depending on how the website and its services are configured, limited technical information
            may be processed to operate, maintain, secure and improve Fixora. This can include information
            such as browser or device characteristics, approximate usage information and pages requested.
          </p>
        </section>

        <section>
          <h2>Cookies and Similar Technologies</h2>
          <p>
            Fixora may use cookies or similar technologies where they are necessary for website functionality,
            security, analytics or other services.
          </p>
          <p>
            Third-party services used on the website may also use their own cookies or similar technologies
            according to their respective policies.
          </p>
        </section>

        <section>
          <h2>Analytics and Third-Party Services</h2>
          <p>
            Fixora may use third-party providers for services such as hosting, security, analytics,
            advertising or other website functionality.
          </p>
          <p>
            When third-party services are used, those providers may process information under their own
            privacy policies and terms.
          </p>
        </section>

        <section>
          <h2>Advertising</h2>
          <p>
            Fixora may use advertising services in the future. Advertising providers may use cookies or
            similar technologies to deliver, measure or personalize advertising according to their own
            policies and the choices available to users.
          </p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We take reasonable steps to maintain the security and reliability of the website. However,
            no website, browser session or internet transmission can be guaranteed to be completely secure.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Fixora is intended for general use and does not knowingly request personal information from
            children through the website.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            This Privacy Policy may be updated as Fixora develops, new tools are introduced, or the services
            used by the website change. Any updated version will be published on this page with a revised update date.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy or how Fixora handles information, please use the
            contact method made available on the website.
          </p>
        </section>

        <section
          style={{
            marginTop: "45px",
            padding: "28px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,.09)",
            background: "linear-gradient(145deg, rgba(139,92,246,.07), rgba(255,255,255,.02))",
          }}
        >
          <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: "11px", fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            FIXORA
          </p>
          <h2 style={{ margin: 0, color: "#f8fafc" }}>
            Simple tools.
            <br />
            Clear information.
          </h2>
        </section>
      </div>
    </div>
  )
}

export default Privacy
