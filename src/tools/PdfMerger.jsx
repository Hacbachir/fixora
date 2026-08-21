import { PDFDocument } from "pdf-lib"
import { useState } from "react"

function PdfMerger({ onBack }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [mergedUrl, setMergedUrl] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files)

    if (!selectedFiles.length) return

    setFiles(selectedFiles)
    setMergedUrl(null)
    setError("")
    setSuccess("")
  }

  const removeFile = (indexToRemove) => {
    setFiles((currentFiles) =>
      currentFiles.filter(
        (_, index) => index !== indexToRemove
      )
    )

    setMergedUrl(null)
    setError("")
    setSuccess("")
  }

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError(
        "Please select at least two PDF files."
      )
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const mergedPdf =
        await PDFDocument.create()

      for (const file of files) {
        const arrayBuffer =
          await file.arrayBuffer()

        const pdf =
          await PDFDocument.load(
            arrayBuffer
          )

        const pages =
          await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          )

        pages.forEach((page) => {
          mergedPdf.addPage(page)
        })
      }

      const mergedBytes =
        await mergedPdf.save({
          useObjectStreams: true,
        })

      const blob = new Blob(
        [mergedBytes],
        {
          type: "application/pdf",
        }
      )

      if (mergedUrl) {
        URL.revokeObjectURL(mergedUrl)
      }

      const url =
        URL.createObjectURL(blob)

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

    const link =
      document.createElement("a")

    link.href = mergedUrl
    link.download =
      "merged-document.pdf"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const reset = () => {
    if (mergedUrl) {
      URL.revokeObjectURL(mergedUrl)
    }

    setFiles([])
    setMergedUrl(null)
    setError("")
    setSuccess("")
    setLoading(false)
  }

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
          Merge PDF
        </h1>

        <p className="compressor-description">
          Combine multiple PDF files into one
          document.
        </p>
      </div>

      <div className="upload-box">
        <div className="pdf-file-icon">
          📚
        </div>

        <h2>
          Select PDF files
        </h2>

        <p>
          Choose two or more PDF files to merge.
        </p>

        <label className="upload-button">
          Choose PDF Files

          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFiles}
            hidden
          />
        </label>

        <p className="file-types">
          Select 2 or more PDF files
        </p>

        {files.length > 0 && (
          <div className="selected-file">
            <h3>
              {files.length} PDF file
              {files.length !== 1
                ? "s"
                : ""}{" "}
              selected
            </h3>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {files.map(
                (file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "space-between",
                      gap: "15px",
                      padding:
                        "14px 16px",
                      background:
                        "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius:
                        "12px",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        wordBreak:
                          "break-word",
                      }}
                    >
                      <strong>
                        {index + 1}.
                      </strong>{" "}
                      {file.name}
                    </span>

                    <button
                      onClick={() =>
                        removeFile(
                          index
                        )
                      }
                      style={{
                        flexShrink: 0,
                        border: "none",
                        background:
                          "#fee2e2",
                        color:
                          "#dc2626",
                        borderRadius:
                          "8px",
                        padding:
                          "7px 10px",
                        cursor:
                          "pointer",
                        fontWeight:
                          "700",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>

            <button
              className="compress-button"
              onClick={mergePdfs}
              disabled={
                loading ||
                files.length < 2
              }
              style={{
                marginTop: "25px",
              }}
            >
              {loading
                ? "Merging PDFs..."
                : "Merge PDF Files"}
            </button>
          </div>
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

        {success && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "12px",
              background: "#ecfdf5",
              color: "#059669",
              lineHeight: "1.6",
            }}
          >
            {success}
          </div>
        )}

        {mergedUrl && (
          <div className="result">
            <div className="result-success">
              ✓ PDFs Merged Successfully
            </div>

            <h2>
              Your merged PDF is ready 🎉
            </h2>

            <button
              className="download-button"
              onClick={
                downloadMergedPdf
              }
            >
              Download Merged PDF
            </button>

            <button
              className="another-button"
              onClick={reset}
            >
              Merge More PDF Files
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PdfMerger