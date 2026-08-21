import { useState } from "react"
import PdfCompressor from "./PdfCompressor"
import PdfMerger from "./PdfMerger"
import PdfSplitter from "./PdfSplitter"

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
    <div className="pdf-page">
      <div className="pdf-header">
        <p className="eyebrow">
          PDF TOOLKIT
        </p>

        <h1>
          PDF Tools
        </h1>

        <p className="pdf-description">
          Simple and powerful tools for your
          PDF files.
        </p>
      </div>

      <div className="pdf-upload-box">
        {!file && !showMerger && !showSplitter && (
          <>
            <div className="pdf-upload-icon">
              📄
            </div>

            <h2>
              Upload your PDF
            </h2>

            <p>
              Choose a PDF file from your
              computer to get started.
            </p>

            <label className="upload-button">
              Choose PDF

              <input
                type="file"
                accept="application/pdf"
                onChange={handleFile}
                hidden
              />
            </label>

            <p className="file-types">
              PDF files only
            </p>

            <div
              style={{
                marginTop: "35px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Or choose a PDF tool below
            </div>

            <div
              className="pdf-options"
              style={{
                marginTop: "20px",
              }}
            >
              <button onClick={openMerger}>
                <span>🔗</span>
                Merge PDF
              </button>

              <button onClick={openSplitter}>
                <span>✂️</span>
                Split PDF
              </button>

              <button
                onClick={openCompressor}
                disabled
                title="Upload a PDF first"
              >
                <span>📦</span>
                Compress PDF
              </button>
            </div>
          </>
        )}

        {file && (
          <div className="pdf-selected-file">
            <div className="pdf-file-icon">
              📄
            </div>

            <h3>
              {file.name}
            </h3>

            <p>
              File size:{" "}
              <strong>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </strong>
            </p>

            <div className="pdf-options">
              <button onClick={openMerger}>
                <span>🔗</span>
                Merge PDF
              </button>

              <button onClick={openSplitter}>
                <span>✂️</span>
                Split PDF
              </button>

              <button onClick={openCompressor}>
                <span>📦</span>
                Compress PDF
              </button>
            </div>

            <button
              className="another-button"
              onClick={resetFile}
            >
              Choose Another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PdfTools