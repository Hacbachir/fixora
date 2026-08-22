function About() {
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
        <a
          href="/"
          className="legal-back"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#94a3b8",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          ← Back to Fixora
        </a>

        <div style={{ marginBottom: "55px" }}>
          <p className="eyebrow">
            ABOUT FIXORA
          </p>

          <h1
            style={{
              margin: "0",
              color: "#f8fafc",
              fontSize:
                "clamp(42px, 7vw, 70px)",
              lineHeight: "1",
              letterSpacing: "-3px",
              fontWeight: "900",
            }}
          >
            Useful tools.
            <br />
            Less hassle.
          </h1>

          <p
            className="legal-updated"
            style={{
              maxWidth: "700px",
              marginTop: "22px",
              color: "#94a3b8",
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            Fixora is a simple online workspace
            for everyday file and document tasks.
          </p>
        </div>

        <section>
          <h2>What is Fixora?</h2>

          <p>
            Fixora is built around a simple idea:
            common file tasks should not require
            complicated software or technical
            knowledge.
          </p>

          <p>
            We bring practical tools together in
            one clean interface so you can find
            what you need, process your file and
            move on with your day.
          </p>
        </section>

        <section>
          <h2>What can you do with Fixora?</h2>

          <p>
            Fixora currently focuses on useful
            image and PDF tools for everyday
            digital tasks.
          </p>

          <ul>
            <li>Compress images</li>
            <li>Compress PDF files</li>
            <li>Merge PDF files</li>
            <li>Split PDF files</li>
          </ul>
        </section>

        <section>
          <h2>Built for simplicity</h2>

          <p>
            Our goal is to make the path from
            problem to solution as short as
            possible.
          </p>

          <p>
            That means clear interfaces, focused
            tools and straightforward workflows
            instead of unnecessary complexity.
          </p>
        </section>

        <section>
          <h2>Your files and privacy</h2>

          <p>
            The current Fixora tools are designed
            to process files directly in your
            browser whenever the tool supports
            browser-based processing.
          </p>

          <p>
            We aim to keep the experience simple
            while treating privacy as an important
            part of the product.
          </p>
        </section>

        <section>
          <h2>What's next?</h2>

          <p>
            Fixora will continue to grow with more
            useful tools for files, documents and
            other everyday digital problems.
          </p>

          <p>
            Our focus is not adding tools just to
            increase a list. Each new tool should
            solve a real problem and make the
            experience more useful.
          </p>
        </section>

        <section
          style={{
            marginTop: "45px",
            padding: "28px",
            borderRadius: "20px",
            border:
              "1px solid rgba(255,255,255,.09)",
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
            THE FIXORA IDEA
          </p>

          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
            }}
          >
            One task.
            <br />
            One simple solution.
          </h2>

          <p
            style={{
              marginBottom: 0,
              color: "#94a3b8",
              lineHeight: "1.8",
            }}
          >
            Tell us what you need to do.
            We&apos;ll show you the easiest way.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About