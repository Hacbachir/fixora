import { useEffect, useState } from "react"
import { PDFDocument } from "pdf-lib"

function PdfSplitter({ onBack }) {
  const [file, setFile] = useState(null)
  const [pages, setPages] = useState("")
  const [totalPages, setTotalPages] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl)
      }
    }
  }, [resultUrl])

  const handleFile = async (event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) return

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl)
    }

    setFile(selectedFile)
    setPages("")
    setMessage("")
    setError("")
    setTotalPages(null)
    setResultUrl(null)

    try {
      const arrayBuffer = await selectedFile.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)

      setTotalPages(pdf.getPageCount())
    } catch (err) {
      console.error(err)
      setError("Unable to read this PDF file. Please choose a valid PDF.")
    }

    event.target.value = ""
  }

  const parsePages = (text, total) => {
    const pageNumbers = new Set()

    const parts = text
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)

    for (const part of parts) {
      if (part.includes("-")) {
        const values = part
          .split("-")
          .map((value) => value.trim())

        if (values.length !== 2) {
          throw new Error(
            "Invalid page range. Use a format such as 5-7."
          )
        }

        const start = Number(values[0])
        const end = Number(values[1])

        if (!Number.isInteger(start) || !Number.isInteger(end)) {
          throw new Error("Please enter valid page numbers.")
        }

        const first = Math.min(start, end)
        const last = Math.max(start, end)

        if (first < 1 || last > total) {
          throw new Error(
            `Please enter pages between 1 and ${total}.`
          )
        }

        for (let page = first; page <= last; page++) {
          pageNumbers.add(page)
        }
      } else {
        const page = Number(part)

        if (!Number.isInteger(page)) {
          throw new Error("Please enter valid page numbers.")
        }

        if (page < 1 || page > total) {
          throw new Error(
            `Please enter pages between 1 and ${total}.`
          )
        }

        pageNumbers.add(page)
      }
    }

    return Array.from(pageNumbers).sort((a, b) => a - b)
  }

  const splitPdf = async () => {
    if (!file) {
      setError("Please choose a PDF file first.")
      return
    }

    if (!pages.trim()) {
      setError("Please enter the pages you want to extract.")
      return
    }

    try {
      setLoading(true)
      setError("")
      setMessage("")

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl)
        setResultUrl(null)
      }

      const arrayBuffer = await file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(arrayBuffer)
      const pageCount = sourcePdf.getPageCount()

      const selectedPages = parsePages(pages, pageCount)

      if (selectedPages.length === 0) {
        throw new Error("Please select at least one page.")
      }

      const newPdf = await PDFDocument.create()

      const copiedPages = await newPdf.copyPages(
        sourcePdf,
        selectedPages.map((page) => page - 1)
      )

      copiedPages.forEach((page) => {
        newPdf.addPage(page)
      })

      const pdfBytes = await newPdf.save({
        useObjectStreams: true,
      })

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      })

      const url = URL.createObjectURL(blob)

      setResultUrl(url)

      setMessage(
        `${selectedPages.length} page${
          selectedPages.length === 1 ? "" : "s"
        } extracted successfully.`
      )
    } catch (err) {
      console.error(err)

      setError(
        err.message || "Something went wrong while splitting the PDF."
      )
    } finally {
      setLoading(false)
    }
  }

  const downloadPdf = () => {
    if (!resultUrl) return

    const link = document.createElement("a")
    link.href = resultUrl
    link.download = "split-document.pdf"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const reset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl)
    }

    setFile(null)
    setPages("")
    setTotalPages(null)
    setLoading(false)
    setResultUrl(null)
    setMessage("")
    setError("")
  }

  return (
    <div
      className="pdf-page"
      style={{
        minHeight: "100vh",
        padding: "30px 20px 100px",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at 50% 0%, rgba(139,92,246,.14), transparent 35%), #05070b",
      }}
    >
      <div
        style={{
          width: "min(1050px, 100%)",
          margin: "0 auto",
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
        className="pdf-header"
        style={{
          width: "min(900px, 100%)",
          margin: "35px auto 40px",
          textAlign: "center",
        }}
      >
        <p className="eyebrow">PDF TOOLKIT</p>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(42px, 7vw, 72px)",
            lineHeight: "1",
            letterSpacing: "-3px",
            fontWeight: "900",
          }}
        >
          Split PDF.
          <br />
          Extract what you need.
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
          Select specific pages or page ranges and create a new PDF
          containing only those pages.
        </p>
      </div>

      <div
        className="pdf-upload-box"
        style={{
          width: "min(1000px, 100%)",
          margin: "0 auto",
          padding: "40px 25px",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,.1)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 25px 80px rgba(0,0,0,.3)",
        }}
      >
        {!file && (
          <div
            style={{
              textAlign: "center",
              maxWidth: "700px",
              margin: "0 auto",
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
                border: "1px solid rgba(139,92,246,.22)",
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
                margin: 0,
                fontSize: "25px",
                fontWeight: "800",
              }}
            >
              Choose your PDF
            </h2>

            <p
              style={{
                margin: "12px auto 24px",
                maxWidth: "500px",
                color: "#94a3b8",
                lineHeight: "1.7",
              }}
            >
              Select a PDF file and choose the pages you want to extract.
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
                boxShadow: "0 12px 35px rgba(79,70,229,.28)",
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
              className="file-types"
              style={{
                marginTop: "14px",
              }}
            >
              PDF files only
            </p>

            {error && (
              <div
                style={{
                  marginTop: "25px",
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
          </div>
        )}

        {file && (
          <div
            className="pdf-selected-file"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
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
                background: "rgba(6,182,212,.08)",
                border: "1px solid rgba(6,182,212,.18)",
              }}
            >
              <svg
                width="32"
                height="32"
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

            <p className="eyebrow">SELECTED PDF</p>

            <h2
              style={{
                margin: 0,
                fontSize: "clamp(22px, 4vw, 32px)",
                fontWeight: "850",
                wordBreak: "break-word",
              }}
            >
              {file.name}
            </h2>

            <p
              style={{
                margin: "10px 0 0",
                color: "#94a3b8",
              }}
            >
              File size:{" "}
              <strong>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </strong>
            </p>

            {totalPages !== null && (
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#94a3b8",
                }}
              >
                Total pages: <strong>{totalPages}</strong>
              </p>
            )}

            <div
              style={{
                marginTop: "30px",
                padding: "24px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.025)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                  marginBottom: "12px",
                }}
              >
                <label
                  htmlFor="pdf-pages"
                  style={{
                    color: "#e2e8f0",
                    fontWeight: "800",
                  }}
                >
                  Pages to extract
                </label>

                {totalPages !== null && (
                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                    }}
                  >
                    {totalPages} pages
                  </span>
                )}
              </div>

              <input
                id="pdf-pages"
                type="text"
                value={pages}
                onChange={(event) => {
                  setPages(event.target.value)
                  setError("")
                  setMessage("")
                }}
                placeholder="Example: 1, 3, 5-7"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "14px 16px",
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: "11px",
                  outline: "none",
                  background: "rgba(255,255,255,.06)",
                  color: "#f8fafc",
                  fontSize: "15px",
                }}
              />

              <p
                style={{
                  margin: "10px 0 0",
                  color: "#64748b",
                  fontSize: "13px",
                  lineHeight: "1.7",
                }}
              >
                Enter individual pages or ranges.
                <br />
                Example: 1, 3, 5-7
              </p>
            </div>

            <button
              className="compress-button"
              onClick={splitPdf}
              disabled={loading}
              style={{
                marginTop: "24px",
              }}
            >
              {loading ? "Splitting PDF..." : "Split PDF"}
            </button>

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

            {message && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  borderRadius: "13px",
                  background: "rgba(34,197,94,.07)",
                  border: "1px solid rgba(34,197,94,.14)",
                  color: "#86efac",
                  lineHeight: "1.6",
                  textAlign: "left",
                }}
              >
                {message}
              </div>
            )}

            {resultUrl && (
              <div
                style={{
                  marginTop: "25px",
                  padding: "25px",
                  borderRadius: "18px",
                  border: "1px solid rgba(34,197,94,.14)",
                  background:
                    "linear-gradient(145deg, rgba(34,197,94,.06), rgba(255,255,255,.025))",
                }}
              >
                <div
                  style={{
                    color: "#86efac",
                    fontWeight: "800",
                    marginBottom: "15px",
                  }}
                >
                  ✓ PDF Created Successfully
                </div>

                <button
                  className="download-button"
                  onClick={downloadPdf}
                >
                  Download Split PDF
                </button>
              </div>
            )}

            <button
              className="another-button"
              onClick={reset}
              style={{
                display: "block",
                margin: "24px auto 0",
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

      <section
        style={{
          width: "min(1000px, 100%)",
          margin: "60px auto 0",
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
          <p className="eyebrow">ABOUT PDF SPLITTING</p>

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
            Extract only the pages you need.
          </h2>

          <p
            style={{
              maxWidth: "780px",
              margin: "18px 0 0",
              color: "#94a3b8",
              lineHeight: "1.85",
            }}
          >
            Select individual pages or page ranges from your PDF and create
            a separate document. The original PDF remains unchanged.
          </p>
        </div>
      </section>

      <section
        style={{
          width: "min(1000px, 100%)",
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
            question="How do I select multiple pages?"
            answer="Enter page numbers separated by commas, such as 1, 3, 8."
          />

          <FaqItem
            question="Can I select a range of pages?"
            answer="Yes. Use a hyphen to specify a range, such as 5-10."
          />

          <FaqItem
            question="Can I combine individual pages and ranges?"
            answer="Yes. For example, 1, 3, 5-7 extracts pages 1, 3, 5, 6 and 7."
          />

          <FaqItem
            question="Does this change my original PDF?"
            answer="No. Fixora creates a new PDF containing the pages you selected."
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

export default PdfSplitter