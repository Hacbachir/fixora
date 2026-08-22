import { PDFDocument } from "pdf-lib"
import { useEffect, useState } from "react"

function PdfMerger({ onBack }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [mergedUrl, setMergedUrl] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    return () => {
      if (mergedUrl) URL.revokeObjectURL(mergedUrl)
    }
  }, [mergedUrl])

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || [])
    const pdfFiles = selectedFiles.filter(
      (item) => item.type === "application/pdf"
    )

    if (!pdfFiles.length) return

    if (mergedUrl) URL.revokeObjectURL(mergedUrl)

    setFiles(pdfFiles)
    setMergedUrl(null)
    setError("")
    setSuccess("")
    event.target.value = ""
  }

  const removeFile = (indexToRemove) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove)
    )

    if (mergedUrl) URL.revokeObjectURL(mergedUrl)
    setMergedUrl(null)
    setError("")
    setSuccess("")
  }

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError("Please select at least two PDF files.")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      if (mergedUrl) {
        URL.revokeObjectURL(mergedUrl)
        setMergedUrl(null)
      }

      const mergedPdf = await PDFDocument.create()

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        )

        pages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedBytes = await mergedPdf.save({
        useObjectStreams: true,
      })

      const blob = new Blob([mergedBytes], {
        type: "application/pdf",
      })

      const url = URL.createObjectURL(blob)
      setMergedUrl(url)
      setSuccess(
        `${files.length} PDF files were merged successfully.`
      )
    } catch (err) {
      console.error(err)
      setError(
        "Unable to merge these PDF files. Please make sure they are valid PDF files."
      )
    } finally {
      setLoading(false)
    }
  }

  const downloadMergedPdf = () => {
    if (!mergedUrl) return

    const link = document.createElement("a")
    link.href = mergedUrl
    link.download = "merged-document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const reset = () => {
    if (mergedUrl) URL.revokeObjectURL(mergedUrl)
    setFiles([])
    setMergedUrl(null)
    setError("")
    setSuccess("")
    setLoading(false)
  }

  return (
    <div
      className="compressor-page"
      style={{ minHeight: "100vh", paddingBottom: "100px" }}
    >
      <div
        style={{
          width: "min(1050px, calc(100% - 40px))",
          margin: "20px auto 0",
        }}
      >
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
        <h1>Merge PDF Online</h1>
        <p
          className="compressor-description"
          style={{
            maxWidth: "700px",
            margin: "22px auto 0",
            color: "#94a3b8",
            fontSize: "17px",
            lineHeight: "1.8",
          }}
        >
          Combine multiple PDF files into one document with a simple
          online PDF merger.
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
          background:
            "linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 25px 90px rgba(0,0,0,.28)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p className="eyebrow">SELECT YOUR FILES</p>
          <h2>Combine PDFs in the order you choose.</h2>
          <p style={{ color: "#94a3b8" }}>
            Select two or more PDF files to create one combined document.
          </p>

          <label
            className="upload-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "12px",
              padding: "13px 22px",
              border: "none",
              borderRadius: "11px",
              color: "#ffffff",
              background:
                "linear-gradient(135deg, #7c3aed, #4f46e5, #0891b2)",
              fontSize: "14px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 12px 35px rgba(79,70,229,.28)",
            }}
          >
            Choose PDF Files
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFiles}
              hidden
            />
          </label>

          <p className="file-types">Select 2 or more PDF files</p>
        </div>

        {files.length > 0 && (
          <div
            className="selected-file"
            style={{ maxWidth: "850px", margin: "35px auto 0" }}
          >
            <p className="eyebrow">SELECTED FILES</p>
            <h3>
              {files.length} PDF{files.length === 1 ? " file" : " files"} selected
            </h3>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "15px",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,.035)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: "12px",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      wordBreak: "break-word",
                      color: "#cbd5e1",
                    }}
                  >
                    <strong>{index + 1}.</strong> {file.name}
                  </span>

                  <button
                    onClick={() => removeFile(index)}
                    style={{
                      flexShrink: 0,
                      border: "1px solid rgba(239,68,68,.15)",
                      background: "rgba(239,68,68,.07)",
                      color: "#fca5a5",
                      borderRadius: "8px",
                      padding: "7px 10px",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              className="compress-button"
              onClick={mergePdfs}
              disabled={loading || files.length < 2}
              style={{ marginTop: "25px" }}
            >
              {loading ? "Merging PDFs..." : "Merge PDF Files"}
            </button>
          </div>
        )}

        {error && (
          <div
            style={{
              maxWidth: "850px",
              margin: "20px auto 0",
              padding: "15px",
              borderRadius: "13px",
              background: "rgba(239,68,68,.08)",
              border: "1px solid rgba(239,68,68,.15)",
              color: "#fca5a5",
              lineHeight: "1.6",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              maxWidth: "850px",
              margin: "20px auto 0",
              padding: "15px",
              borderRadius: "13px",
              background: "rgba(34,197,94,.07)",
              border: "1px solid rgba(34,197,94,.14)",
              color: "#86efac",
              lineHeight: "1.6",
            }}
          >
            {success}
          </div>
        )}

        {mergedUrl && (
          <div
            className="result"
            style={{
              maxWidth: "760px",
              margin: "30px auto 0",
              padding: "30px",
              borderRadius: "20px",
              border: "1px solid rgba(34,197,94,.14)",
              background:
                "linear-gradient(145deg, rgba(34,197,94,.06), rgba(255,255,255,.025))",
              textAlign: "center",
            }}
          >
            <div className="result-success">✓ PDFs Merged Successfully</div>
            <h2>Your merged PDF is ready</h2>
            <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>
              {files.length} PDF files were combined into one document.
            </p>

            <button className="download-button" onClick={downloadMergedPdf}>
              Download Merged PDF
            </button>

            <button className="another-button" onClick={reset}>
              Merge More PDF Files
            </button>
          </div>
        )}
      </div>

      <section
        style={{
          width: "min(1050px, calc(100% - 40px))",
          margin: "70px auto 0",
        }}
      >
        <div
          style={{
            padding: "34px",
            borderRadius: "22px",
            border: "1px solid rgba(255,255,255,.09)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.018))",
          }}
        >
          <p className="eyebrow">ABOUT PDF MERGING</p>
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
            Combine your PDF files into one document.
          </h2>
          <p
            style={{
              maxWidth: "780px",
              margin: "18px 0 0",
              color: "#94a3b8",
              lineHeight: "1.85",
            }}
          >
            Merging PDFs is useful when you need to combine reports,
            applications, scanned documents, or multiple sections into one
            file. Fixora keeps the workflow simple: choose your files,
            merge them, and download the result.
          </p>
        </div>
      </section>

      <section
        style={{
          width: "min(1050px, calc(100% - 40px))",
          margin: "24px auto 0",
        }}
      >
        <div
          style={{
            padding: "34px",
            borderRadius: "22px",
            border: "1px solid rgba(255,255,255,.09)",
            background:
              "linear-gradient(145deg, rgba(139,92,246,.06), rgba(255,255,255,.018))",
          }}
        >
          <p className="eyebrow">FAQ</p>

          <FaqItem
            question="How many PDF files can I merge?"
            answer="The current interface requires at least two PDF files. The practical limit depends on your browser, device memory, and file size."
          />
          <FaqItem
            question="Does the order of the files matter?"
            answer="Yes. Files are merged in the order shown in the selected-file list."
          />
          <FaqItem
            question="Can I remove a PDF before merging?"
            answer="Yes. Use the Remove button next to any selected file before starting the merge."
          />
          <FaqItem
            question="What file type does the tool accept?"
            answer="The PDF merger accepts PDF files."
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

export default PdfMerger
