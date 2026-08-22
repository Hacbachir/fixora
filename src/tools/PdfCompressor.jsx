import { PDFDocument } from "pdf-lib"
import { useEffect, useState } from "react"

function PdfCompressor({ file, onBack }) {
  const [loading, setLoading] = useState(false)
  const [compressedUrl, setCompressedUrl] = useState(null)
  const [compressedSize, setCompressedSize] = useState(null)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    return () => {
      if (compressedUrl) URL.revokeObjectURL(compressedUrl)
    }
  }, [compressedUrl])

  const compressPdf = async () => {
    if (!file || loading) return

    try {
      setLoading(true)
      setError("")
      setMessage("")

      if (compressedUrl) {
        URL.revokeObjectURL(compressedUrl)
        setCompressedUrl(null)
      }
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

      if (blob.size >= file.size) {
        setMessage(
          "This PDF is already optimized, so the processed file was not smaller than the original."
        )
        return
      }

      const url = URL.createObjectURL(blob)
      setCompressedUrl(url)
      setCompressedSize(blob.size)
      setMessage("Your PDF was successfully optimized.")
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
    if (compressedUrl) URL.revokeObjectURL(compressedUrl)
    setCompressedUrl(null)
    setCompressedSize(null)
    setError("")
    setMessage("")
    setLoading(false)
  }

  const originalSize = (file.size / 1024 / 1024).toFixed(2)
  const newSize = compressedSize
    ? (compressedSize / 1024 / 1024).toFixed(2)
    : null
  const savedPercentage = compressedSize
    ? Math.max(
        0,
        (((file.size - compressedSize) / file.size) * 100).toFixed(1)
      )
    : null

  return (
    <div className="compressor-page" style={{ minHeight: "100vh", paddingBottom: "100px" }}>
      <div style={{ width: "min(1050px, calc(100% - 40px))", margin: "20px auto 0" }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 18px",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: "10px",
            color: "#f8fafc",
            background: "rgba(255,255,255,.05)",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          ← Back to PDF Tools
        </button>
      </div>

      <div
        className="compressor-header"
        style={{
          width: "min(900px, calc(100% - 40px))",
          margin: "35px auto 40px",
          textAlign: "center",
        }}
      >
        <p className="eyebrow">PDF TOOLKIT</p>
        <h1>Compress PDF Online</h1>
        <p
          className="compressor-description"
          style={{
            maxWidth: "700px",
            margin: "20px auto 0",
            color: "#94a3b8",
            fontSize: "17px",
            lineHeight: "1.8",
          }}
        >
          Optimize your PDF file and reduce its size when possible.
        </p>
      </div>

      <div
        className="upload-box"
        style={{
          width: "min(1050px, calc(100% - 40px))",
          margin: "0 auto",
          padding: "36px",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,.1)",
          background: "linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 25px 90px rgba(0,0,0,.28)",
        }}
      >
        <div style={{ width: "min(700px, 100%)", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow">SELECTED PDF</p>
          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: "850",
              wordBreak: "break-word",
            }}
          >
            {file.name}
          </h2>
          <p style={{ margin: "12px 0 0", color: "#94a3b8" }}>
            Original size: <strong>{originalSize} MB</strong>
          </p>

          {!compressedUrl && (
            <button
              className="compress-button"
              onClick={compressPdf}
              disabled={loading}
              style={{ marginTop: "25px" }}
            >
              {loading ? "Optimizing PDF..." : "Compress PDF"}
            </button>
          )}

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "13px",
                background: "rgba(239,68,68,.08)",
                border: "1px solid rgba(239,68,68,.15)",
                color: "#fca5a5",
                lineHeight: "1.6",
                textAlign: "left",
              }}
            >
              {error}
            </div>
          )}

          {message && !error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "13px",
                background: compressedUrl ? "rgba(34,197,94,.07)" : "rgba(59,130,246,.07)",
                border: compressedUrl
                  ? "1px solid rgba(34,197,94,.14)"
                  : "1px solid rgba(59,130,246,.14)",
                color: compressedUrl ? "#86efac" : "#93c5fd",
                lineHeight: "1.6",
                textAlign: "left",
              }}
            >
              {message}
            </div>
          )}
        </div>

        {compressedUrl && (
          <div
            className="result"
            style={{
              maxWidth: "760px",
              margin: "30px auto 0",
              padding: "30px",
              borderRadius: "20px",
              border: "1px solid rgba(34,197,94,.14)",
              background: "linear-gradient(145deg, rgba(34,197,94,.06), rgba(255,255,255,.025))",
              textAlign: "center",
            }}
          >
            <div className="result-success">✓ PDF Optimized Successfully</div>
            <h2>Compression Complete</h2>

            <div className="size-comparison">
              <div className="size-card">
                <span>Original</span>
                <strong>{originalSize} MB</strong>
              </div>
              <div className="size-arrow">→</div>
              <div className="size-card">
                <span>Compressed</span>
                <strong>{newSize} MB</strong>
              </div>
            </div>

            <p className="saved-text">
              You saved <strong>{savedPercentage}%</strong> of the file size.
            </p>

            <button className="download-button" onClick={downloadPdf}>
              Download Compressed PDF
            </button>
            <button className="another-button" onClick={reset}>
              Process PDF Again
            </button>
          </div>
        )}
      </div>

      <section style={{ width: "min(1050px, calc(100% - 40px))", margin: "70px auto 0" }}>
        <div
          style={{
            padding: "34px",
            borderRadius: "22px",
            border: "1px solid rgba(255,255,255,.09)",
            background: "linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.018))",
          }}
        >
          <p className="eyebrow">ABOUT PDF COMPRESSION</p>
          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: "1.1",
              letterSpacing: "-2px",
              fontWeight: "900",
            }}
          >
            Make your PDFs lighter when they can be optimized.
          </h2>
          <p style={{ maxWidth: "780px", margin: "18px 0 0", color: "#94a3b8", lineHeight: "1.85" }}>
            Smaller PDF files can be easier to upload, share and store.
            Fixora creates an optimized copy when the processed file is
            smaller than the original.
          </p>
        </div>
      </section>

      <section style={{ width: "min(1050px, calc(100% - 40px))", margin: "24px auto 0" }}>
        <div
          style={{
            padding: "34px",
            borderRadius: "22px",
            border: "1px solid rgba(255,255,255,.09)",
            background: "linear-gradient(145deg, rgba(139,92,246,.06), rgba(255,255,255,.018))",
          }}
        >
          <p className="eyebrow">FAQ</p>
          <FaqItem
            question="What does PDF compression do?"
            answer="PDF compression attempts to reduce the size of a PDF so it can be easier to store, share or upload."
          />
          <FaqItem
            question="Will every PDF become smaller?"
            answer="No. Some PDFs are already optimized or contain content that cannot be reduced significantly."
          />
          <FaqItem
            question="Will the PDF content be changed?"
            answer="The tool saves an optimized copy of the PDF. For important documents, review the downloaded result after processing."
          />
          <FaqItem
            question="Can I use the tool for a large PDF?"
            answer="The browser-based tool depends on your device and browser resources. Very large or complex PDFs may take longer to process."
          />
        </div>
      </section>
    </div>
  )
}

function FaqItem({ question, answer }) {
  return (
    <details
      style={{
        marginTop: "12px",
        padding: "17px 18px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,.07)",
        background: "rgba(255,255,255,.025)",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          color: "#e2e8f0",
          fontSize: "14px",
          fontWeight: "750",
        }}
      >
        {question}
      </summary>
      <p
        style={{
          margin: "12px 0 0",
          color: "#94a3b8",
          fontSize: "13px",
          lineHeight: "1.75",
        }}
      >
        {answer}
      </p>
    </details>
  )
}

export default PdfCompressor
