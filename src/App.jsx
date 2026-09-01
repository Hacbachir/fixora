import { useEffect, useState } from "react"
import ImageCompressor from "./tools/ImageCompressor"
import PdfTools from "./tools/PdfTools"
import Privacy from "./Privacy"
import Terms from "./Terms"
import About from "./About.jsx"
import Contact from "./Contact.jsx"

const SITE_URL = "https://fixora-tools.pages.dev"

const categories = [
  {
    id: "image",
    name: "Image Tools",
    icon: "image",
    description:
      "Compress, optimize and prepare images for websites, sharing and everyday use.",
    status: "available",
  },
  {
    id: "pdf",
    name: "PDF Tools",
    icon: "pdf",
    description:
      "Compress, merge and split PDF documents quickly from one simple workspace.",
    status: "available",
  },
  {
    id: "ai",
    name: "AI Tools",
    icon: "ai",
    description:
      "Useful AI-powered tools for writing, text, ideas and everyday productivity.",
    status: "coming",
  },
  {
    id: "creator",
    name: "Creator Tools",
    icon: "creator",
    description:
      "Simple tools for creators working with content, images, video and social media.",
    status: "coming",
  },
  {
    id: "calculators",
    name: "Calculators",
    icon: "calculator",
    description:
      "Practical calculators for everyday decisions, work, study and planning.",
    status: "coming",
  },
]

const tools = [
  {
    id: "image-compressor",
    route: "/tools/image-compressor",
    category: "image",
    name: "Image Compressor",
    icon: "image",
    description:
      "Reduce image file size while keeping your images sharp and ready to share.",
    seoTitle:
      "Image Compressor Online - Reduce Image Size | Fixora",
    seoDescription:
      "Compress JPG, PNG and WebP images online with Fixora. Reduce image file size quickly while keeping your images looking sharp.",
    keywords:
      "image compressor compress image image size reducer jpg compressor png compressor webp compressor",
    available: true,
  },
  {
    id: "pdf-compressor",
    route: "/tools/pdf-compressor",
    category: "pdf",
    name: "PDF Compressor",
    icon: "compress",
    description:
      "Reduce PDF file size quickly when you need a lighter document.",
    seoTitle:
      "PDF Compressor Online - Reduce PDF Size | Fixora",
    seoDescription:
      "Compress PDF files online with Fixora and reduce document size for sharing, storage and uploads.",
    keywords:
      "pdf compressor compress pdf reduce pdf size shrink pdf pdf size reducer",
    pdfAction: "compress",
    available: true,
  },
  {
    id: "pdf-merger",
    route: "/tools/pdf-merger",
    category: "pdf",
    name: "PDF Merger",
    icon: "merge",
    description:
      "Combine multiple PDF files into one clean document.",
    seoTitle:
      "Merge PDF Online - Combine PDF Files | Fixora",
    seoDescription:
      "Merge multiple PDF files into one document with Fixora. A simple online PDF merger for combining your files.",
    keywords:
      "merge pdf combine pdf pdf merger join pdf files combine documents",
    pdfAction: "merge",
    available: true,
  },
  {
    id: "pdf-splitter",
    route: "/tools/pdf-splitter",
    category: "pdf",
    name: "PDF Splitter",
    icon: "split",
    description:
      "Split a PDF and extract the pages you actually need.",
    seoTitle:
      "Split PDF Online - Extract PDF Pages | Fixora",
    seoDescription:
      "Split PDF files online with Fixora and extract the pages you need from your documents.",
    keywords:
      "split pdf pdf splitter extract pdf pages separate pdf split document",
    pdfAction: "split",
    available: true,
  },
  {
    id: "pdf-tools",
    route: "/tools/pdf-tools",
    category: "pdf",
    name: "PDF Tools",
    icon: "pdf",
    description:
      "Access Fixora's PDF tools from one place.",
    seoTitle:
      "PDF Tools Online - Compress, Merge & Split PDFs | Fixora",
    seoDescription:
      "Use Fixora's online PDF tools to compress, merge and split PDF files from one simple workspace.",
    keywords:
      "pdf tools online pdf tools pdf toolkit compress pdf merge pdf split pdf",
    available: true,
  },
]

const steps = [
  {
    number: "01",
    icon: "search",
    title: "Choose a Tool",
    description:
      "Find the tool that matches the task you want to complete.",
  },
  {
    number: "02",
    icon: "upload",
    title: "Upload Your File",
    description:
      "Upload your file and let Fixora handle the work.",
  },
  {
    number: "03",
    icon: "download",
    title: "Download the Result",
    description:
      "Get your processed file quickly and continue with your day.",
  },
]

function AppIcon({ type, size = 25 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  }

  if (type === "image") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="8.5" cy="9" r="1.5" />
        <path d="m5 17 4.5-4 3.5 3 2.5-2.5L19 17" />
      </svg>
    )
  }

  if (type === "compress") {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h3" />
        <path d="M17 16v3" />
      </svg>
    )
  }

  if (type === "merge") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="8" height="8" rx="2" />
        <rect x="12" y="12" width="8" height="8" rx="2" />
        <path d="M12 8h4a4 4 0 0 1 4 4" />
        <path d="M12 16H8a4 4 0 0 1-4-4" />
      </svg>
    )
  }

  if (type === "split") {
    return (
      <svg {...common}>
        <path d="M6 3h12" />
        <path d="M6 21h12" />
        <path d="M8 3v7l4 2 4-2V3" />
        <path d="M8 21v-7l4-2 4 2v7" />
      </svg>
    )
  }

  if (type === "pdf") {
    return (
      <svg {...common}>
        <path d="M7 3h7l4 4v14H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z" />
        <path d="M14 3v5h5" />
        <path d="M8 16h2" />
        <path d="M8 12h7" />
      </svg>
    )
  }

  if (type === "ai") {
    return (
      <svg {...common}>
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <path d="m5.6 5.6 2.1 2.1" />
        <path d="m16.3 16.3 2.1 2.1" />
        <path d="m18.4 5.6-2.1 2.1" />
        <path d="m7.7 16.3-2.1 2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    )
  }

  if (type === "creator") {
    return (
      <svg {...common}>
        <path d="M4 5h16v14H4z" />
        <path d="m9 9 6 3-6 3z" />
      </svg>
    )
  }

  if (type === "calculator") {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 7h8" />
        <path d="M8 11h2" />
        <path d="M14 11h2" />
        <path d="M8 15h2" />
        <path d="M14 15h2" />
        <path d="M8 18h8" />
      </svg>
    )
  }

  if (type === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 5 5" />
      </svg>
    )
  }

  if (type === "upload") {
    return (
      <svg {...common}>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </svg>
    )
  }

  if (type === "download") {
    return (
      <svg {...common}>
        <path d="M12 4v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M5 20h14" />
      </svg>
    )
  }

  return null
}

function BackButton({
  onClick,
  children = "Back to Tools",
}) {
  return (
    <button
      onClick={onClick}
      style={{
        margin: "20px",
        padding: "10px 18px",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: "10px",
        color: "#f8fafc",
        background: "rgba(255,255,255,.06)",
        cursor: "pointer",
        fontWeight: "700",
      }}
    >
      {children}
    </button>
  )
}

function setMetaTag(attribute, value, content) {
  let tag = document.querySelector(
    `meta[${attribute}="${value}"]`
  )

  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute(attribute, value)
    document.head.appendChild(tag)
  }

  tag.setAttribute("content", content)
}

function updateDocumentMeta(tool) {
  const title = tool
    ? tool.seoTitle
    : "Fixora - Simple Online Tools for Everyday Tasks"

  const description = tool
    ? tool.seoDescription
    : "Fixora provides simple online tools for images, PDFs, productivity, creators and everyday digital tasks."

  const path = tool?.route || "/"
  const canonicalUrl = `${SITE_URL}${path}`

  document.title = title

  setMetaTag("name", "description", description)

  setMetaTag(
    "name",
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  )

  setMetaTag("property", "og:title", title)
  setMetaTag("property", "og:description", description)
  setMetaTag("property", "og:url", canonicalUrl)
  setMetaTag("property", "og:type", "website")
  setMetaTag("property", "og:site_name", "Fixora")

  setMetaTag("name", "twitter:title", title)
  setMetaTag("name", "twitter:description", description)
  setMetaTag("name", "twitter:card", "summary")

  let canonical = document.querySelector(
    'link[rel="canonical"]'
  )

  if (!canonical) {
    canonical = document.createElement("link")
    canonical.setAttribute("rel", "canonical")
    document.head.appendChild(canonical)
  }

  canonical.setAttribute("href", canonicalUrl)
}

function navigateTo(path, setPath) {
  if (window.location.pathname === path) {
    setPath(path)
    return
  }

  window.history.pushState({}, "", path)
  setPath(path)

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function ToolPage({ tool, onBack }) {
  return (
    <div style={{ minHeight: "100vh", paddingBottom: "90px" }}>
      <BackButton onClick={onBack} />

      <main>
        <section
          style={{
            width: "min(900px, calc(100% - 40px))",
            margin: "35px auto 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "66px",
              height: "66px",
              margin: "0 auto 22px",
              display: "grid",
              placeItems: "center",
              borderRadius: "18px",
              color: "#c4b5fd",
              background:
                "linear-gradient(135deg, rgba(139,92,246,.16), rgba(6,182,212,.08))",
              border: "1px solid rgba(139,92,246,.2)",
            }}
          >
            <AppIcon type={tool.icon} size={32} />
          </div>

          <p className="eyebrow">FIXORA TOOL</p>

          <h1
            style={{
              margin: "0",
              color: "#f8fafc",
              fontSize: "clamp(40px, 7vw, 70px)",
              lineHeight: "1",
              letterSpacing: "-3px",
              fontWeight: "900",
            }}
          >
            {tool.name}
          </h1>

          <p
            style={{
              maxWidth: "680px",
              margin: "24px auto 0",
              color: "#94a3b8",
              fontSize: "17px",
              lineHeight: "1.8",
            }}
          >
            {tool.description}
          </p>
        </section>

        <section
          style={{
            width: "min(1100px, calc(100% - 40px))",
            margin: "45px auto 70px",
          }}
        >
          {tool.id === "image-compressor" && (
            <ImageCompressor />
          )}

          {tool.id === "pdf-compressor" && (
            <PdfTools initialAction="compress" />
          )}

          {tool.id === "pdf-merger" && (
            <PdfTools initialAction="merge" />
          )}

          {tool.id === "pdf-splitter" && (
            <PdfTools initialAction="split" />
          )}

          {tool.id === "pdf-tools" && <PdfTools />}
        </section>

        <section
          style={{
            width: "min(900px, calc(100% - 40px))",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              padding: "32px",
              borderRadius: "22px",
              border: "1px solid rgba(255,255,255,.09)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018))",
            }}
          >
            <p className="eyebrow">ABOUT THIS TOOL</p>

            <h2
              style={{
                margin: "0",
                color: "#f8fafc",
                fontSize: "28px",
                fontWeight: "850",
                letterSpacing: "-1px",
              }}
            >
              {tool.name} made simple
            </h2>

            <p
              style={{
                marginTop: "16px",
                color: "#94a3b8",
                lineHeight: "1.8",
              }}
            >
              Fixora is designed to make common digital tasks
              easier to complete online. Choose the tool,
              work with your file, and get back to what you
              were doing.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

function CategorySection({ openTool }) {
  const availableCategories = categories.filter(
    (category) =>
      category.status === "available"
  )

  const comingCategories = categories.filter(
    (category) =>
      category.status === "coming"
  )

  return (
    <section
      style={{
        width: "min(1100px, calc(100% - 40px))",
        margin: "20px auto 80px",
      }}
    >
      <p className="eyebrow">EXPLORE FIXORA</p>

      <h2
        style={{
          margin: "0",
          color: "#f8fafc",
          fontSize: "clamp(32px, 5vw, 48px)",
          letterSpacing: "-2px",
          lineHeight: "1.05",
        }}
      >
        One place for useful digital tools.
      </h2>

      <p className="how-intro">
        Start with our available tools today. More useful
        categories are being built for the next stages of Fixora.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "14px",
          marginTop: "32px",
        }}
      >
        {availableCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              if (category.id === "image") {
                openTool("image-compressor")
              }

              if (category.id === "pdf") {
                openTool("pdf-tools")
              }
            }}
            style={categoryCardStyle}
          >
            <span style={categoryIconStyle}>
              <AppIcon
                type={category.icon}
                size={25}
              />
            </span>

            <strong
              style={{
                display: "block",
                color: "#f8fafc",
                fontSize: "17px",
              }}
            >
              {category.name}
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "9px",
                color: "#94a3b8",
                lineHeight: "1.6",
                fontSize: "13px",
              }}
            >
              {category.description}
            </span>

            <span
              style={{
                display: "inline-block",
                marginTop: "18px",
                color: "#a78bfa",
                fontSize: "12px",
                fontWeight: "800",
              }}
            >
              Explore category
            </span>
          </button>
        ))}

        {comingCategories.map((category) => (
          <div
            key={category.id}
            style={{
              ...categoryCardStyle,
              cursor: "default",
              opacity: 0.78,
            }}
          >
            <span style={categoryIconStyle}>
              <AppIcon
                type={category.icon}
                size={25}
              />
            </span>

            <strong
              style={{
                display: "block",
                color: "#f8fafc",
                fontSize: "17px",
              }}
            >
              {category.name}
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "9px",
                color: "#94a3b8",
                lineHeight: "1.6",
                fontSize: "13px",
              }}
            >
              {category.description}
            </span>

            <span
              style={{
                display: "inline-block",
                marginTop: "18px",
                padding: "5px 9px",
                borderRadius: "999px",
                color: "#94a3b8",
                background: "rgba(255,255,255,.05)",
                border:
                  "1px solid rgba(255,255,255,.08)",
                fontSize: "11px",
                fontWeight: "800",
              }}
            >
              Coming soon
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function HomePage({
  search,
  setSearch,
  filteredTools,
  openTool,
  scrollToTools,
  setPage,
}) {
  const findMatchingTool = () => {
    const text = search.toLowerCase().trim()

    if (!text) return null

    return (
      tools.find((tool) => {
        const searchableText = [
          tool.name,
          tool.description,
          tool.keywords,
        ]
          .join(" ")
          .toLowerCase()

        return searchableText.includes(text)
      }) || null
    )
  }

  const showSuggestions =
    search.trim().length > 0

  return (
    <div className="app">
      <header className="header">
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          style={plainButtonStyle}
          aria-label="Go to Fixora home"
        >
          <div className="logo">Fixora</div>
        </button>

        <nav aria-label="Main navigation">
          <a href="#tools">Tools</a>

          <a href="#categories">Categories</a>

          <a href="#how">How it works</a>

          <button
            onClick={() => setPage("contact")}
            style={navButtonStyle}
          >
            Contact
          </button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">
            DIGITAL TOOLS, MADE SIMPLE
          </p>

          <h1>
            Get more done
            <br />
            in seconds.
          </h1>

          <p className="subtitle">
            Simple online tools for files, documents,
            creators, productivity and everyday digital tasks.
          </p>

          <div
            className="search-box"
            style={{
              position: "relative",
              zIndex: 10,
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const tool = findMatchingTool()

                  if (tool) {
                    openTool(tool.id)
                  } else {
                    scrollToTools()
                  }
                }

                if (event.key === "Escape") {
                  setSearch("")
                }
              }}
              placeholder="What do you need to do?"
              aria-label="Search for a Fixora tool"
              autoComplete="off"
            />

            <button
              onClick={() => {
                const tool = findMatchingTool()

                if (tool) {
                  openTool(tool.id)
                } else {
                  scrollToTools()
                }
              }}
            >
              Find Tool
            </button>

            {showSuggestions && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  right: 0,
                  padding: "8px",
                  borderRadius: "16px",
                  border:
                    "1px solid rgba(255,255,255,.1)",
                  background: "rgba(15,23,42,.97)",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,.35)",
                  backdropFilter: "blur(18px)",
                }}
              >
                {filteredTools.length > 0 ? (
                  filteredTools
                    .slice(0, 5)
                    .map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() =>
                          openTool(tool.id)
                        }
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "13px 14px",
                          border: "none",
                          borderRadius: "11px",
                          color: "#e2e8f0",
                          background: "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.background =
                            "rgba(255,255,255,.06)"
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.background =
                            "transparent"
                        }}
                      >
                        <span
                          style={{
                            width: "38px",
                            height: "38px",
                            flexShrink: 0,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: "10px",
                            color: "#c4b5fd",
                            background:
                              "linear-gradient(135deg, rgba(139,92,246,.16), rgba(6,182,212,.08))",
                            border:
                              "1px solid rgba(139,92,246,.18)",
                          }}
                        >
                          <AppIcon
                            type={tool.icon}
                            size={20}
                          />
                        </span>

                        <span>
                          <strong
                            style={{
                              display: "block",
                              fontSize: "14px",
                              color: "#f8fafc",
                            }}
                          >
                            {tool.name}
                          </strong>

                          <span
                            style={{
                              display: "block",
                              marginTop: "3px",
                              color: "#64748b",
                              fontSize: "12px",
                            }}
                          >
                            {tool.description}
                          </span>
                        </span>
                      </button>
                    ))
                ) : (
                  <div
                    style={{
                      padding: "16px",
                      color: "#94a3b8",
                      fontSize: "13px",
                      textAlign: "left",
                    }}
                  >
                    No matching tool yet. Try searching
                    for PDF, image, compress, merge or split.
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <span style={pillStyle}>Free to use</span>
            <span style={pillStyle}>Fast workflow</span>
            <span style={pillStyle}>No installation</span>
            <span style={pillStyle}>More tools coming</span>
          </div>
        </section>

        <section
          id="categories"
          style={{ paddingTop: "20px" }}
        >
          <CategorySection
            openTool={openTool}
          />
        </section>

        <section id="tools" className="tools">
          <p className="eyebrow">AVAILABLE TOOLS</p>

          <h2>Tools that get the job done.</h2>

          <p className="how-intro">
            Start with the tools currently available on Fixora.
            New tools will be added in focused groups.
          </p>

          {filteredTools.length === 0 ? (
            <p className="no-results">
              No tools found. Try another search.
            </p>
          ) : (
            <div className="tool-grid">
              {filteredTools.map((tool, index) => (
                <div
                  className="tool-card"
                  key={tool.id}
                  style={
                    index === 0
                      ? { gridColumn: "span 2" }
                      : undefined
                  }
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      display: "grid",
                      placeItems: "center",
                      marginBottom: "22px",
                      borderRadius: "15px",
                      color: "#c4b5fd",
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,.16), rgba(6,182,212,.08))",
                      border:
                        "1px solid rgba(139,92,246,.18)",
                    }}
                  >
                    <AppIcon
                      type={tool.icon}
                      size={26}
                    />
                  </div>

                  <p
                    style={{
                      margin: "0 0 8px",
                      color: "#64748b",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "1.4px",
                      textTransform: "uppercase",
                    }}
                  >
                    {tool.category === "image"
                      ? "Image Tool"
                      : "PDF Tool"}
                  </p>

                  <h3>{tool.name}</h3>

                  <p>{tool.description}</p>

                  <button
                    onClick={() =>
                      openTool(tool.id)
                    }
                  >
                    Open Tool
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section
          id="how"
          className="how"
          style={{ paddingTop: "35px" }}
        >
          <div
            style={{
              width: "min(950px, 100%)",
              margin: "0 auto 75px",
              padding: "34px",
              borderRadius: "24px",
              border:
                "1px solid rgba(255,255,255,.1)",
              background:
                "linear-gradient(135deg, rgba(139,92,246,.08), rgba(255,255,255,.035))",
              boxShadow:
                "0 20px 70px rgba(0,0,0,.2)",
            }}
          >
            <p className="eyebrow">WHY FIXORA</p>

            <h2>
              Less hassle.
              <br />
              More done.
            </h2>

            <p className="how-intro">
              Fixora brings useful digital tools together in
              one simple place.
            </p>
          </div>

          <p className="eyebrow">SIMPLE PROCESS</p>

          <h2>How it works</h2>

          <p className="how-intro">
            Complete your task in three simple steps.
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
                    <AppIcon
                      type={step.icon}
                      size={22}
                    />
                  </span>
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            width: "min(950px, calc(100% - 40px))",
            margin: "70px auto 0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: "18px",
            }}
          >
            <div style={infoCardStyle}>
              <p className="eyebrow">IMAGE TOOLS</p>

              <h3 style={infoHeadingStyle}>
                Compress images online
              </h3>

              <p style={infoTextStyle}>
                Reduce image size and choose a quality
                level that fits your needs.
              </p>

              <button
                onClick={() =>
                  openTool("image-compressor")
                }
                style={secondaryButtonStyle}
              >
                Open Image Compressor
              </button>
            </div>

            <div style={infoCardStyle}>
              <p className="eyebrow">PDF TOOLS</p>

              <h3 style={infoHeadingStyle}>
                Work with PDF documents
              </h3>

              <p style={infoTextStyle}>
                Compress, merge and split PDF documents
                from one simple workspace.
              </p>

              <button
                onClick={() => openTool("pdf-tools")}
                style={secondaryButtonStyle}
              >
                Open PDF Tools
              </button>
            </div>
          </div>
        </section>

        <section
          style={{
            width: "min(950px, calc(100% - 40px))",
            margin: "70px auto 0",
            padding: "60px 0 100px",
            textAlign: "center",
          }}
        >
          <p className="eyebrow">THE FIXORA ROADMAP</p>

          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "clamp(35px, 5vw, 52px)",
              lineHeight: "1.05",
              letterSpacing: "-2.5px",
              fontWeight: "900",
            }}
          >
            More useful tools.
            <br />
            One simple platform.
          </h2>

          <p className="how-intro">
            We are building Fixora category by category,
            focusing on tools people actually search for.
          </p>

          <button
            onClick={scrollToTools}
            style={{
              marginTop: "14px",
              padding: "14px 24px",
              border: "none",
              borderRadius: "11px",
              color: "#ffffff",
              background:
                "linear-gradient(135deg, #7c3aed, #4f46e5, #0891b2)",
              fontSize: "14px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow:
                "0 12px 35px rgba(79,70,229,.3)",
            }}
          >
            Explore Available Tools
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="logo">Fixora</div>

            <p>
              Simple online tools for your everyday digital
              tasks.
            </p>
          </div>

          <div className="footer-links">
            <a href="#tools">Tools</a>

            <a href="#categories">Categories</a>

            <a href="#how">How it works</a>

            <button onClick={() => setPage("about")}>
              About
            </button>

            <button onClick={() => setPage("privacy")}>
              Privacy
            </button>

            <button onClick={() => setPage("terms")}>
              Terms
            </button>

            <button onClick={() => setPage("contact")}>
              Contact
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          Copyright {new Date().getFullYear()} Fixora.
          All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function App() {
  const [path, setPath] = useState(
    window.location.pathname || "/"
  )

  const [search, setSearch] = useState("")
  const [page, setPage] = useState("home")

  useEffect(() => {
    const handlePopState = () =>
      setPath(window.location.pathname || "/")

    window.addEventListener(
      "popstate",
      handlePopState
    )

    return () =>
      window.removeEventListener(
        "popstate",
        handlePopState
      )
  }, [])

  const currentTool =
    tools.find((tool) => tool.route === path) || null

  useEffect(() => {
    updateDocumentMeta(currentTool)
  }, [currentTool])

  const openTool = (toolId) => {
    const tool =
      tools.find((item) => item.id === toolId) || null

    if (!tool) return

    setPage("home")
    setSearch("")
    navigateTo(tool.route, setPath)
  }

  const scrollToTools = () => {
    if (path !== "/") {
      navigateTo("/", setPath)

      window.setTimeout(() => {
        document
          .getElementById("tools")
          ?.scrollIntoView({
            behavior: "smooth",
          })
      }, 50)

      return
    }

    document
      .getElementById("tools")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }

  if (currentTool) {
    return (
      <div className="app">
        <header className="header">
          <button
            onClick={() =>
              navigateTo("/", setPath)
            }
            style={plainButtonStyle}
            aria-label="Go to Fixora home"
          >
            <div className="logo">Fixora</div>
          </button>

          <nav aria-label="Tool navigation">
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault()
                navigateTo("/", setPath)
              }}
            >
              Tools
            </a>

            <a
              href="/#categories"
              onClick={(event) => {
                event.preventDefault()

                navigateTo("/", setPath)

                window.setTimeout(() => {
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }, 50)
              }}
            >
              Categories
            </a>

            <a
              href="/#how"
              onClick={(event) => {
                event.preventDefault()

                navigateTo("/", setPath)

                window.setTimeout(() => {
                  document
                    .getElementById("how")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }, 50)
              }}
            >
              How it works
            </a>

            <button
              onClick={() => setPage("contact")}
              style={navButtonStyle}
            >
              Contact
            </button>
          </nav>
        </header>

        <ToolPage
          tool={currentTool}
          onBack={() =>
            navigateTo("/", setPath)
          }
        />
      </div>
    )
  }

  if (page === "privacy") {
    return (
      <div className="app">
        <Privacy
          onBack={() => setPage("home")}
        />
      </div>
    )
  }

  if (page === "terms") {
    return (
      <div className="app">
        <Terms
          onBack={() => setPage("home")}
        />
      </div>
    )
  }

  if (page === "about") {
    return (
      <div className="app">
        <About />
      </div>
    )
  }

  if (page === "contact") {
    return (
      <div className="app">
        <Contact
          onBack={() => setPage("home")}
        />
      </div>
    )
  }

  const searchText = search.toLowerCase().trim()

  const filteredTools = tools.filter((tool) => {
    if (!searchText) return true

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
    <HomePage
      search={search}
      setSearch={setSearch}
      filteredTools={filteredTools}
      openTool={openTool}
      scrollToTools={scrollToTools}
      setPage={setPage}
    />
  )
}

const plainButtonStyle = {
  border: "none",
  background: "transparent",
  padding: 0,
  cursor: "pointer",
  color: "inherit",
}

const navButtonStyle = {
  border: "none",
  background: "transparent",
  padding: 0,
  color: "inherit",
  cursor: "pointer",
  font: "inherit",
}

const secondaryButtonStyle = {
  marginTop: "14px",
  border: "1px solid rgba(255,255,255,.1)",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "#cbd5e1",
  background: "rgba(255,255,255,.04)",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "750",
}

const infoCardStyle = {
  padding: "28px",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,.08)",
  background: "rgba(255,255,255,.025)",
}

const infoHeadingStyle = {
  color: "#f8fafc",
  margin: 0,
  fontSize: "24px",
}

const infoTextStyle = {
  color: "#94a3b8",
  lineHeight: "1.75",
}

const pillStyle = {
  padding: "7px 11px",
  border: "1px solid rgba(255,255,255,.09)",
  borderRadius: "999px",
  color: "#94a3b8",
  background: "rgba(255,255,255,.035)",
  fontSize: "12px",
  fontWeight: "700",
}

const categoryCardStyle = {
  padding: "24px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,.08)",
  background:
    "linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.018))",
  textAlign: "left",
  cursor: "pointer",
  transition:
    "transform .2s ease, border-color .2s ease",
}

const categoryIconStyle = {
  width: "48px",
  height: "48px",
  display: "grid",
  placeItems: "center",
  marginBottom: "18px",
  borderRadius: "14px",
  color: "#c4b5fd",
  background:
    "linear-gradient(135deg, rgba(139,92,246,.16), rgba(6,182,212,.08))",
  border:
    "1px solid rgba(139,92,246,.18)",
}

export default App



