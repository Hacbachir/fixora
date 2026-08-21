import { useState } from "react"
import { PDFDocument } from "pdf-lib"

function PdfSplitter({ onBack }) {
  const [file, setFile] = useState(null)
  const [pages, setPages] = useState("")
  const [totalPages, setTotalPages] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleFile = async (event) => {
    const selectedFile = event.target.files[0]

    if (!selectedFile) return

    setFile(selectedFile)
    setPages("")
    setMessage("")
    setError("")
    setTotalPages(null)

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl)
      setResultUrl(null)
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)

      setTotalPages(pdf.getPageCount())
    } catch (err) {
      console.error(err)
      setError("Unable to read this PDF file.")
    }
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
            "Invalid page range. Example: 5-7"
          )
        }

        const start = Number(values[0])
        const end = Number(values[1])

        if (
          !Number.isInteger(start) ||
          !Number.isInteger(end)
        ) {
          throw new Error(
            "Please enter valid page numbers."
          )
        }

        const first = Math.min(start, end)
        const last = Math.max(start, end)

        if (first < 1 || last > total) {
          throw new Error(
            `Please enter pages between 1 and ${total}.`
          )
        }

        for (
          let page = first;
          page <= last;
          page++
        ) {
          pageNumbers.add(page)
        }
      } else {
        const page = Number(part)

        if (!Number.isInteger(page)) {
          throw new Error(
            "Please enter valid page numbers."
          )
        }

        if (page < 1 || page > total) {
          throw new Error(
            `Please enter pages between 1 and ${total}.`
          )
        }

        pageNumbers.add(page)
      }
    }

    return Array.from(pageNumbers).sort(
      (a, b) => a - b
    )
  }

  const splitPdf = async () => {
    if (!file) {
      setError("Please choose a PDF file first.")
      return
    }

    if (!pages.trim()) {
      setError(
        "Please enter the pages you want to extract."
      )
      return
    }

    setLoading(true)
    setError("")
    setMessage("")

    try {
      const arrayBuffer = await file.arrayBuffer()

      const sourcePdf =
        await PDFDocument.load(arrayBuffer)

      const pageCount = sourcePdf.getPageCount()

      const selectedPages = parsePages(
        pages,
        pageCount
      )

      if (!selectedPages.length) {
        throw new Error(
          "Please select at least one page."
        )
      }

      const newPdf =
        await PDFDocument.create()

      const copiedPages =
        await newPdf.copyPages(
          sourcePdf,
          selectedPages.map(
            (page) => page - 1
          )
        )

      copiedPages.forEach((page) => {
        newPdf.addPage(page)
      })

      const pdfBytes = await newPdf.save({
        useObjectStreams: true,
      })

      const blob = new Blob(
        [pdfBytes],
        {
          type: "application/pdf",
        }
      )

      const url =
        URL.createObjectURL(blob)

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl)
      }

      setResultUrl(url)

      setMessage(
        `${selectedPages.length} page${
          selectedPages.length === 1
            ? ""
            : "s"
        } extracted successfully.`
      )
    } catch (err) {
      console.error(err)

      setError(
        err.message ||
          "Something went wrong while splitting the PDF."
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
    <div className="pdf-page">
      <button
        onClick={onBack}
        style={{
          marginBottom: "30px",
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

      <div className="pdf-header">
        <p className="eyebrow">
          PDF TOOLKIT
        </p>

        <h1>
          Split PDF
        </h1>

        <p className="pdf-description">
          Extract specific pages from your PDF
          quickly and easily.
        </p>
      </div>

      <div className="pdf-upload-box">
        {!file ? (
          <>
            <div className="pdf-upload-icon">
              ✂️
            </div>

            <h2>
              Choose your PDF
            </h2>

            <p>
              Select a PDF file to choose
              which pages you want to extract.
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
          </>
        ) : (
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
                {(
                  file.size /
                  1024 /
                  1024
                ).toFixed(2)}{" "}
                MB
              </strong>
            </p>

            {totalPages && (
              <p>
                Total pages:{" "}
                <strong>
                  {totalPages}
                </strong>
              </p>
            )}

            <div className="quality-control">
              <div className="quality-header">
                <label>
                  Pages to extract
                </label>

                {totalPages && (
                  <strong>
                    {totalPages} pages
                  </strong>
                )}
              </div>

              <input
                type="text"
                value={pages}
                onChange={(event) => {
                  setPages(
                    event.target.value
                  )
                  setError("")
                  setMessage("")
                }}
                placeholder="Example: 1, 3, 5-7"
                style={{
                  width: "100%",
                  padding: "14px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius: "10px",
                  outline: "none",
                  background: "white",
                }}
              />

              <p
                style={{
                  marginTop: "10px",
                  marginBottom: 0,
                  color: "#94a3b8",
                  fontSize: "13px",
                }}
              >
                You can enter individual
                pages or ranges.
                <br />
                Example: 1, 3, 5-7
              </p>
            </div>

            <button
              className="compress-button"
              onClick={splitPdf}
              disabled={loading}
            >
              {loading
                ? "Splitting PDF..."
                : "Split PDF"}
            </button>

            {error && (
              <div
                style={{
                  marginTop: "25px",
                  padding: "15px",
                  borderRadius: "12px",
                  background: "#fef2f2",
                  color: "#dc2626",
                  lineHeight: 1.6,
                }}
              >
                {error}
              </div>
            )}

            {message && (
              <div
                style={{
                  marginTop: "25px",
                  padding: "15px",
                  borderRadius: "12px",
                  background: "#ecfdf5",
                  color: "#059669",
                  lineHeight: 1.6,
                }}
              >
                {message}
              </div>
            )}

            {resultUrl && (
              <button
                className="download-button"
                onClick={downloadPdf}
              >
                Download Split PDF
              </button>
            )}

            <button
              className="another-button"
              onClick={reset}
            >
              Choose Another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PdfSplitter