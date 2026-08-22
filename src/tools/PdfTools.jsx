import { useState } from "react"
import PdfCompressor from "./PdfCompressor"
import PdfMerger from "./PdfMerger"
import PdfSplitter from "./PdfSplitter"

function Icon({ type }) {
  if (type === "compress") {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3v5" />
        <path d="M16 3v5" />
        <path d="M3 8h18" />
        <path d="M8 21v-5" />
        <path d="M16 21v-5" />
        <path d="M3 16h18" />
      </svg>
    )
  }

  if (type === "merge") {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="8" height="8" rx="2" />
        <rect x="12" y="12" width="8" height="8" rx="2" />
        <path d="M12 8h4a4 4 0 0 1 4 4v0" />
        <path d="M12 16H8a4 4 0 0 1-4-4v0" />
      </svg>
    )
  }

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12" />
      <path d="M6 21h12" />
      <path d="M8 3v7l4 2 4-2V3" />
      <path d="M8 21v-7l4-2 4 2v7" />
    </svg>
  )
}

function PdfTools({ initialAction = null }) {
  const [file, setFile] = useState(null)
  const [showCompressor, setShowCompressor] = useState(
    initialAction === "compress"
  )
  const [showMerger, setShowMerger] = useState(
    initialAction === "merge"
  )
  const [showSplitter, setShowSplitter] = useState(
    initialAction === "split"
  )

  const handleFile = (event) => {
    const selectedFile = event.target.files[0]

    if (!selectedFile) return

    setFile(selectedFile)
    setShowCompressor(false)
    setShowMerger(false)
    setShowSplitter(false)
  }

  const resetFile = () => {
    setFile(null)
    setShowCompressor(false)
    setShowMerger(false)
    setShowSplitter(false)
  }

  const openCompressor = () => {
    if (!file) return
    setShowCompressor(true)
    setShowMerger(false)
    setShowSplitter(false)
  }

  const openMerger = () => {
    setShowMerger(true)
    setShowCompressor(false)
    setShowSplitter(false)
  }

  const openSplitter = () => {
    setShowSplitter(true)
    setShowCompressor(false)
    setShowMerger(false)
  }

  if (showCompressor && file) {
    return (
      <PdfCompressor
        file={file}
        onBack={() => setShowCompressor(false)}
      />
    )
  }

  if (showMerger) {
    return (
      <PdfMerger
        onBack={() => setShowMerger(false)}
      />
    )
  }

  if (showSplitter) {
    return (
      <PdfSplitter
        onBack={() => setShowSplitter(false)}
      />
    )
  }

  return (
    <div
      className="pdf-page"
      style={{
        minHeight: "100vh",
        padding: "70px 20px 100px",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at 50% 0%, rgba(139,92,246,.14), transparent 35%), #05070b",
      }}
    >
      <div
        className="pdf-header"
        style={{
          width: "min(900px, 100%)",
          margin: "0 auto 45px",
          textAlign: "center",
        }}
      >
        <p className="eyebrow">
          PDF TOOLKIT
        </p>

        <h1
          style={{
            margin: "0",
            fontSize: "clamp(42px, 7vw, 72px)",
            lineHeight: "1",
            letterSpacing: "-3px",
            fontWeight: "900",
          }}
        >
          Everything PDF.
          <br />
          In one place.
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "22px auto 0",
            color: "#94a3b8",
            fontSize: "17px",
            lineHeight: "1.7",
          }}
        >
          Compress, merge and split PDF files
          with simple tools designed to get
          the job done quickly.
        </p>
      </div>

      <div
        className="pdf-upload-box"
        style={{
          width: "min(1000px, 100%)",
          margin: "0 auto",
        }}
      >
        {!file && (
          <div
            style={{
              padding: "45px 25px",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,.1)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025))",
              backdropFilter: "blur(18px)",
              textAlign: "center",
              boxShadow: "0 25px 80px rgba(0,0,0,.3)",
            }}
          >
            <div
              style={{
                width: "74px",
                height: "74px",
                margin: "0 auto 22px",
                display: "grid",
                placeItems: "center",
                borderRadius: "20px",
                color: "#c4b5fd",
                background:
                  "linear-gradient(135deg, rgba(139,92,246,.18), rgba(6,182,212,.1))",
                border:
                  "1px solid rgba(139,92,246,.22)",
              }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M8 13h8" />
                <path d="M8 17h5" />
              </svg>
            </div>

            <h2
              style={{
                margin: "0",
                fontSize: "25px",
                fontWeight: "800",
              }}
            >
              Upload your PDF
            </h2>

            <p
              style={{
                margin: "12px auto 24px",
                maxWidth: "500px",
                color: "#94a3b8",
                lineHeight: "1.7",
              }}
            >
              Choose a PDF from your computer
              to unlock the PDF tools.
            </p>

            <label
              className="upload-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "13px 22px",
                borderRadius: "11px",
                color: "#fff",
                background:
                  "linear-gradient(135deg, #7c3aed, #4f46e5, #0891b2)",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow:
                  "0 12px 35px rgba(79,70,229,.28)",
              }}
            >
              Choose PDF
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFile}
                hidden
              />
            </label>

            <p
              style={{
                marginTop: "14px",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              PDF files only
            </p>

            <div
              style={{
                marginTop: "40px",
                paddingTop: "30px",
                borderTop:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              <p
                style={{
                  margin: "0 0 18px",
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                Or start with a PDF tool
              </p>

              <div
                className="pdf-options"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, minmax(0, 1fr))",
                  gap: "14px",
                }}
              >
                <button
                  onClick={openMerger}
                  style={toolButtonStyle}
                >
                  <Icon type="merge" />
                  <span>
                    <strong>Merge PDF</strong>
                    <small>
                      Combine files
                    </small>
                  </span>
                </button>

                <button
                  onClick={openSplitter}
                  style={toolButtonStyle}
                >
                  <Icon type="split" />
                  <span>
                    <strong>Split PDF</strong>
                    <small>
                      Extract pages
                    </small>
                  </span>
                </button>

                <button
                  disabled
                  title="Upload a PDF first"
                  style={{
                    ...toolButtonStyle,
                    opacity: 0.5,
                    cursor: "not-allowed",
                  }}
                >
                  <Icon type="compress" />
                  <span>
                    <strong>
                      Compress PDF
                    </strong>
                    <small>
                      Upload first
                    </small>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {file && (
          <div
            className="pdf-selected-file"
            style={{
              padding: "35px 25px",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,.1)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025))",
              backdropFilter: "blur(18px)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                margin: "0 auto 20px",
                display: "grid",
                placeItems: "center",
                borderRadius: "18px",
                color: "#67e8f9",
                background:
                  "rgba(6,182,212,.08)",
                border:
                  "1px solid rgba(6,182,212,.18)",
              }}
            >
              <Icon type="compress" />
            </div>

            <p
              style={{
                margin: "0 0 8px",
                color: "#64748b",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Selected PDF
            </p>

            <h3
              style={{
                margin: "0",
                fontSize: "20px",
                fontWeight: "800",
                wordBreak: "break-word",
              }}
            >
              {file.name}
            </h3>

            <p
              style={{
                margin: "10px 0 28px",
                color: "#94a3b8",
              }}
            >
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <div
              className="pdf-options"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: "14px",
                maxWidth: "760px",
                margin: "0 auto",
              }}
            >
              <button
                onClick={openCompressor}
                style={toolButtonStyle}
              >
                <Icon type="compress" />
                <span>
                  <strong>
                    Compress PDF
                  </strong>
                  <small>
                    Reduce file size
                  </small>
                </span>
              </button>

              <button
                onClick={openMerger}
                style={toolButtonStyle}
              >
                <Icon type="merge" />
                <span>
                  <strong>Merge PDF</strong>
                  <small>
                    Combine files
                  </small>
                </span>
              </button>

              <button
                onClick={openSplitter}
                style={toolButtonStyle}
              >
                <Icon type="split" />
                <span>
                  <strong>Split PDF</strong>
                  <small>
                    Extract pages
                  </small>
                </span>
              </button>
            </div>

            <button
              className="another-button"
              onClick={resetFile}
              style={{
                marginTop: "24px",
                border: "none",
                background: "transparent",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "650",
              }}
            >
              Choose Another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const toolButtonStyle = {
  minHeight: "105px",
  padding: "18px",
  display: "flex",
  alignItems: "center",
  gap: "13px",
  textAlign: "left",
  border: "1px solid rgba(255,255,255,.09)",
  borderRadius: "15px",
  color: "#f8fafc",
  background: "rgba(255,255,255,.045)",
  cursor: "pointer",
  transition:
    "transform .25s ease, border-color .25s ease, background .25s ease",
}

export default PdfTools