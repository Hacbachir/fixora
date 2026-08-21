import { PDFDocument } from "pdf-lib"
import { useState } from "react"

function PdfCompressor({ file, onBack }) {
  const [loading, setLoading] = useState(false)
  const [compressedUrl, setCompressedUrl] = useState(null)
  const [compressedSize, setCompressedSize] = useState(null)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const compressPdf = async () => {
    if (!file) return

    try {
      setLoading(true)
      setError("")
      setMessage("")
      setCompressedUrl(null)
      setCompressedSize(null)

      const arrayBuffer = await file.arrayBuffer()

      const pdfDoc = await PDFDocument.load(arrayBuffer)

      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        useUpdateFieldAppearances: false,
      })

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      })

      const originalBytes = file.size
      const newBytes = blob.size

      if (newBytes >= originalBytes) {
        setMessage(
          "This PDF is already optimized, so the processed file was not smaller than the original."
        )
        return
      }

      const url = URL.createObjectURL(blob)

      setCompressedUrl(url)
      setCompressedSize(newBytes)

      setMessage(
        "Your PDF was successfully optimized."
      )
    } catch (err) {
      console.error(err)

      setError(
        "Unable to optimize this PDF. Please make sure it is a valid PDF file."
      )
    } finally {
      setLoading(false)
    }
  }

  const downloadPdf = () => {
    if (!compressedUrl) return

    const link = document.createElement("a")

    link.href = compressedUrl
    link.download = "compressed-document.pdf"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const reset = () => {
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl)
    }

    setCompressedUrl(null)
    setCompressedSize(null)
    setError("")
    setMessage("")
    setLoading(false)
  }

  const originalSize = (
    file.size / 1024 / 1024
  ).toFixed(2)

  const newSize = compressedSize
    ? (
        compressedSize /
        1024 /
        1024
      ).toFixed(2)
    : null

  const savedPercentage = compressedSize
    ? Math.max(
        0,
        (
          ((file.size - compressedSize) /
            file.size) *
          100
        ).toFixed(1)
      )
    : null

  return (
    <div className="compressor-page">
      <button
        onClick={onBack}
        style={{
          marginBottom: "25px",
          background: "#111827",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← Back to PDF Tools
      </button>

      <div className="compressor-header">
        <p className="eyebrow">
          PDF TOOLKIT
        </p>

        <h1>
          Compress PDF
        </h1>

        <p className="compressor-description">
          Optimize your PDF file and reduce its
          size when possible.
        </p>
      </div>

      <div className="upload-box">
        <div className="pdf-file-icon">
          📄
        </div>

        <h2>{file.name}</h2>

        <p>
          Original size:{" "}
          <strong>
            {originalSize} MB
          </strong>
        </p>

        {!compressedUrl && (
          <button
            className="compress-button"
            onClick={compressPdf}
            disabled={loading}
          >
            {loading
              ? "Optimizing PDF..."
              : "Compress PDF"}
          </button>
        )}

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "12px",
              background: "#fef2f2",
              color: "#dc2626",
              lineHeight: "1.6",
            }}
          >
            {error}
          </div>
        )}

        {message && !error && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "12px",
              background: compressedUrl
                ? "#ecfdf5"
                : "#eff6ff",
              color: compressedUrl
                ? "#059669"
                : "#2563eb",
              lineHeight: "1.6",
            }}
          >
            {message}
          </div>
        )}

        {compressedUrl && (
          <div className="result">
            <div className="result-success">
              ✓ PDF Optimized Successfully
            </div>

            <h2>
              Compression Complete 🎉
            </h2>

            <div className="size-comparison">
              <div className="size-card">
                <span>
                  Original
                </span>

                <strong>
                  {originalSize} MB
                </strong>
              </div>

              <div className="size-arrow">
                →
              </div>

              <div className="size-card">
                <span>
                  Compressed
                </span>

                <strong>
                  {newSize} MB
                </strong>
              </div>
            </div>

            <p className="saved-text">
              You saved{" "}
              <strong>
                {savedPercentage}%
              </strong>{" "}
              of the file size.
            </p>

            <button
              className="download-button"
              onClick={downloadPdf}
            >
              Download Compressed PDF
            </button>

            <button
              className="another-button"
              onClick={reset}
            >
              Process PDF Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PdfCompressor