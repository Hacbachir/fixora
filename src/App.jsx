import { useState } from "react"
import ImageCompressor from "./tools/ImageCompressor"
import PdfTools from "./tools/PdfTools"
import Privacy from "./Privacy"
import Terms from "./Terms"
import About from "./About.jsx"

const tools = [
  {
    id: "image-compressor",
    name: "Image Compressor",
    icon: "🖼️",
    description: "Reduce image size while keeping good quality.",
    keywords:
      "image compress compressor photo jpg jpeg png webp picture",
    available: true,
  },
  {
    id: "pdf-tools",
    name: "PDF Tools",
    icon: "📄",
    description: "Work with PDF files quickly and easily.",
    keywords:
      "pdf document file merge split compress combine extract",
    available: true,
  },
  {
    id: "file-tools",
    name: "File Tools",
    icon: "📁",
    description: "Useful tools for everyday file problems.",
    keywords: "file convert document",
    available: false,
  },
]

const steps = [
  {
    number: "01",
    icon: "🔎",
    title: "Choose a Tool",
    description:
      "Select the tool that matches the task you want to complete.",
  },
  {
    number: "02",
    icon: "📤",
    title: "Upload Your File",
    description:
      "Upload your image or PDF and let Fixora do the work.",
  },
  {
    number: "03",
    icon: "⬇️",
    title: "Download Result",
    description:
      "Download your processed file quickly and easily.",
  },
]

function BackButton({
  onClick,
  children = "← Back to Tools",
}) {
  return (
    <button
      onClick={onClick}
      style={{
        margin: "20px",
        background: "#111827",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}

function App() {
  const [search, setSearch] = useState("")
  const [activeTool, setActiveTool] = useState(null)
  const [page, setPage] = useState("home")

  const findTool = () => {
    const searchText = search.toLowerCase().trim()

    if (!searchText) {
      document
        .getElementById("tools")
        ?.scrollIntoView({ behavior: "smooth" })
      return
    }

    const matchingTool = tools.find((tool) => {
      const searchableText = [
        tool.name,
        tool.description,
        tool.keywords,
      ]
        .join(" ")
        .toLowerCase()

      return searchableText.includes(searchText)
    })

    if (matchingTool && matchingTool.available) {
      setActiveTool(matchingTool.id)
      return
    }

    document
      .getElementById("tools")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  if (page === "privacy") {
    return (
      <div>
        <BackButton onClick={() => setPage("home")} />
        <Privacy />
      </div>
    )
  }

  if (page === "terms") {
    return (
      <div>
        <BackButton onClick={() => setPage("home")} />
        <Terms />
      </div>
    )
  }

  if (page === "about") {
    return (
      <div>
        <BackButton onClick={() => setPage("home")} />
        <About />
      </div>
    )
  }

  if (activeTool === "image-compressor") {
    return (
      <div>
        <BackButton onClick={() => setActiveTool(null)} />
        <ImageCompressor />
      </div>
    )
  }

  if (activeTool === "pdf-tools") {
    return (
      <div>
        <BackButton onClick={() => setActiveTool(null)} />
        <PdfTools />
      </div>
    )
  }

  const searchText = search.toLowerCase().trim()

  const filteredTools = tools.filter((tool) => {
    if (!searchText) {
      return true
    }

    const searchableText = [
      tool.name,
      tool.description,
      tool.keywords,
    ]
      .join(" ")
      .toLowerCase()

    return searchableText.includes(searchText)
  })

  return (
    <div className="app">
      <header className="header">
        <div className="logo">Fixora</div>

        <nav>
          <a href="#tools">Tools</a>
          <a href="#how">How it works</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">
            FAST • SIMPLE • FREE
          </p>

          <h1>
            Fix your files in seconds.
          </h1>

          <p className="subtitle">
            Simple online tools to compress,
            merge, split and manage your files.
          </p>

          <div className="search-box">
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  findTool()
                }
              }}
              placeholder="What do you need to fix?"
            />

            <button onClick={findTool}>
              Find Tool
            </button>
          </div>
        </section>

        <section id="tools" className="tools">
          <p className="eyebrow">
            FIXORA TOOLS
          </p>

          <h2>
            Popular Tools
          </h2>

          <p className="how-intro">
            Free, simple tools for your everyday files.
          </p>

          {filteredTools.length === 0 ? (
            <p className="no-results">
              No tools found. Try another search.
            </p>
          ) : (
            <div className="tool-grid">
              {filteredTools.map((tool) => (
                <div
                  className="tool-card"
                  key={tool.id}
                >
                  <h3>
                    {tool.icon} {tool.name}
                  </h3>

                  <p>
                    {tool.description}
                  </p>

                  {tool.available ? (
                    <button
                      onClick={() =>
                        setActiveTool(tool.id)
                      }
                    >
                      Open Tool
                    </button>
                  ) : (
                    <button disabled>
                      Coming Soon
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="how" className="how">
          <p className="eyebrow">
            SIMPLE PROCESS
          </p>

          <h2>
            How it works
          </h2>

          <p className="how-intro">
            Get your task done in three simple steps.
          </p>

          <div className="steps-grid">
            {steps.map((step) => (
              <div
                className="step-card"
                key={step.number}
              >
                <div className="step-top">
                  <span className="step-number">
                    {step.number}
                  </span>

                  <span className="step-icon">
                    {step.icon}
                  </span>
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="logo">
              Fixora
            </div>

            <p>
              Simple online tools for your
              everyday file and document tasks.
            </p>
          </div>

          <div className="footer-links">
            <a href="#tools">Tools</a>

            <a href="#how">How it works</a>

            <button
              onClick={() => setPage("about")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#cbd5e1",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              About
            </button>

            <button
              onClick={() => setPage("privacy")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#cbd5e1",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Privacy
            </button>

            <button
              onClick={() => setPage("terms")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#cbd5e1",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Terms
            </button>
          </div>
        </div>

        <div className="footer-bottom">
      
         © {new Date().getFullYear()} Fixora.
          All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
