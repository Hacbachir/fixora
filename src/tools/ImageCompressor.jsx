import { useEffect, useState } from "react"

function ImageCompressor() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [compressedSize, setCompressedSize] = useState(null)
  const [quality, setQuality] = useState(0.7)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }

      if (compressedImage) {
        URL.revokeObjectURL(compressedImage)
      }
    }
  }, [preview, compressedImage])

  const handleFile = (event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) return

    if (!selectedFile.type.startsWith("image/")) {
      return
    }

    if (preview) {
      URL.revokeObjectURL(preview)
    }

    if (compressedImage) {
      URL.revokeObjectURL(compressedImage)
    }

    const previewUrl = URL.createObjectURL(selectedFile)

    setFile(selectedFile)
    setPreview(previewUrl)
    setCompressedImage(null)
    setCompressedSize(null)
  }

  const compressImage = () => {
    if (!file || loading) return

    setLoading(true)

    const image = new Image()
    const reader = new FileReader()

    reader.onload = (event) => {
      image.src = event.target.result
    }

    reader.onerror = () => {
      setLoading(false)
    }

    image.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        setLoading(false)
        return
      }

      canvas.width = image.width
      canvas.height = image.height

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height
      )

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setLoading(false)
            return
          }

          if (compressedImage) {
            URL.revokeObjectURL(compressedImage)
          }

          const url = URL.createObjectURL(blob)

          setCompressedImage(url)
          setCompressedSize(blob.size)
          setLoading(false)
        },
        "image/jpeg",
        quality
      )
    }

    image.onerror = () => {
      setLoading(false)
    }

    reader.readAsDataURL(file)
  }

  const downloadImage = () => {
    if (!compressedImage) return

    const link = document.createElement("a")

    link.href = compressedImage
    link.download = "compressed-image.jpg"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetTool = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }

    if (compressedImage) {
      URL.revokeObjectURL(compressedImage)
    }

    setFile(null)
    setPreview(null)
    setCompressedImage(null)
    setCompressedSize(null)
    setQuality(0.7)
    setLoading(false)
  }

  const originalSize = file
    ? (file.size / 1024 / 1024).toFixed(2)
    : null

  const newSize = compressedSize
    ? (compressedSize / 1024 / 1024).toFixed(2)
    : null

  const savedPercentage =
    file && compressedSize
      ? Math.max(
          0,
          ((file.size - compressedSize) / file.size) * 100
        ).toFixed(1)
      : null

  return (
    <div
      className="compressor-page"
      style={{
        minHeight: "100vh",
        paddingBottom: "100px",
      }}
    >
      <div
        className="compressor-header"
        style={{
          width: "min(900px, calc(100% - 40px))",
          margin: "0 auto 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "68px",
            height: "68px",
            margin: "0 auto 20px",
            display: "grid",
            placeItems: "center",
            borderRadius: "19px",
            color: "#c4b5fd",
            background:
              "linear-gradient(135deg, rgba(139,92,246,.17), rgba(6,182,212,.08))",
            border: "1px solid rgba(139,92,246,.2)",
            boxShadow: "0 0 40px rgba(139,92,246,.08)",
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
            aria-hidden="true"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="3"
            />
            <circle
              cx="8.5"
              cy="9"
              r="1.5"
            />
            <path d="m5 17 4.5-4 3.5 3 2.5-2.5L19 17" />
          </svg>
        </div>

        <p className="eyebrow">
          IMAGE TOOL
        </p>

        <h1>
          Compress Images Online
        </h1>

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
          Reduce image file size quickly while
          keeping the quality you need for
          websites, sharing, uploads and
          everyday use.
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
        {!file && (
          <>
            <div
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <div
                className="upload-icon"
                style={{
                  width: "78px",
                  height: "78px",
                  margin: "0 auto 22px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "21px",
                  color: "#c4b5fd",
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,.15), rgba(6,182,212,.08))",
                  border: "1px solid rgba(139,92,246,.18)",
                }}
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="3"
                  />
                  <circle
                    cx="8.5"
                    cy="9"
                    r="1.5"
                  />
                  <path d="m5 17 4.5-4 3.5 3 2.5-2.5L19 17" />
                </svg>
              </div>

              <h2>
                Upload your image
              </h2>

              <p>
                Choose an image from your
                computer to get started.
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
                  boxShadow:
                    "0 12px 35px rgba(79,70,229,.28)",
                }}
              >
                Choose Image

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFile}
                  hidden
                />
              </label>

              <p
                className="file-types"
                style={{
                  marginTop: "13px",
                }}
              >
                JPG, PNG or WebP
              </p>
            </div>

            <div
              style={{
                maxWidth: "850px",
                margin: "40px auto 0",
                paddingTop: "30px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: "14px",
                borderTop:
                  "1px solid rgba(255,255,255,.07)",
              }}
            >
              <InfoCard
                title="Smaller Files"
                text="Reduce image size for easier sharing and uploads."
              />

              <InfoCard
                title="Simple Workflow"
                text="Upload, choose quality, compress and download."
              />

              <InfoCard
                title="Common Formats"
                text="Works with JPG, PNG and WebP images."
              />
            </div>
          </>
        )}

        {file && (
          <div
            className="selected-file"
            style={{
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {preview && (
              <div
                className="image-preview-container"
                style={{
                  minHeight: "240px",
                  padding: "20px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "18px",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  background:
                    "rgba(0,0,0,.16)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={preview}
                  alt={file.name}
                  className="image-preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "420px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              </div>
            )}

            <div
              className="file-info"
              style={{
                marginTop: "24px",
                textAlign: "center",
              }}
            >
              <p className="eyebrow">
                SELECTED IMAGE
              </p>

              <h3>
                {file.name}
              </h3>

              <p>
                Original size:{" "}
                <strong>
                  {originalSize} MB
                </strong>
              </p>
            </div>

            <div
              className="quality-control"
              style={{
                maxWidth: "720px",
                margin: "28px auto 0",
                padding: "24px",
                borderRadius: "18px",
                border:
                  "1px solid rgba(255,255,255,.08)",
                background:
                  "rgba(255,255,255,.03)",
              }}
            >
              <div className="quality-header">
                <label>
                  Compression Quality
                </label>

                <strong>
                  {Math.round(quality * 100)}%
                </strong>
              </div>

              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(event) =>
                  setQuality(
                    Number(event.target.value)
                  )
                }
              />

              <div className="quality-labels">
                <span>
                  Smaller file
                </span>

                <span>
                  Better quality
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "24px",
              }}
            >
              <button
                className="compress-button"
                onClick={compressImage}
                disabled={loading}
              >
                {loading
                  ? "Compressing..."
                  : "Compress Image"}
              </button>

              <button
                className="another-button"
                onClick={resetTool}
                disabled={loading}
              >
                Choose Another Image
              </button>
            </div>

            {compressedImage && (
              <div
                className="result"
                style={{
                  marginTop: "30px",
                  padding: "30px",
                  borderRadius: "20px",
                  border:
                    "1px solid rgba(34,197,94,.14)",
                  background:
                    "linear-gradient(145deg, rgba(34,197,94,.06), rgba(255,255,255,.025))",
                  textAlign: "center",
                }}
              >
                <div className="result-success">
                  ✓ Compression Complete
                </div>

                <h2>
                  Your image is ready
                </h2>

                <div
                  className="size-comparison"
                  style={{
                    marginTop: "22px",
                  }}
                >
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
                  onClick={downloadImage}
                >
                  Download Compressed Image
                </button>

                <button
                  className="another-button"
                  onClick={resetTool}
                >
                  Compress Another Image
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <section
        style={{
          width:
            "min(1050px, calc(100% - 40px))",
          margin: "70px auto 0",
        }}
      >
        <div
          style={{
            padding: "34px",
            borderRadius: "22px",
            border:
              "1px solid rgba(255,255,255,.09)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.018))",
          }}
        >
          <p className="eyebrow">
            ABOUT IMAGE COMPRESSION
          </p>

          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize:
                "clamp(28px, 4vw, 42px)",
              letterSpacing: "-2px",
              fontWeight: "900",
            }}
          >
            Make images lighter without
            making your workflow harder.
          </h2>

          <p
            style={{
              maxWidth: "780px",
              margin: "18px 0 0",
              color: "#94a3b8",
              lineHeight: "1.85",
            }}
          >
            Large image files can take
            longer to upload, share and
            store. Fixora's image compressor
            gives you a simple way to reduce
            an image's file size by choosing
            the compression quality you need.
          </p>
        </div>
      </section>

      <section
        style={{
          width:
            "min(1050px, calc(100% - 40px))",
          margin: "24px auto 0",
        }}
      >
        <div
          style={{
            padding: "34px",
            borderRadius: "22px",
            border:
              "1px solid rgba(255,255,255,.09)",
            background:
              "linear-gradient(145deg, rgba(139,92,246,.06), rgba(255,255,255,.018))",
          }}
        >
          <p className="eyebrow">
            FAQ
          </p>

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            <FaqItem
              question="What image formats does Fixora support?"
              answer="The current image compressor accepts JPG, PNG and WebP files."
            />

            <FaqItem
              question="How does image compression work?"
              answer="Fixora processes the selected image in your browser using an adjustable JPEG quality level, then creates a compressed image for download."
            />

            <FaqItem
              question="Can I choose the compression quality?"
              answer="Yes. Use the quality slider to balance smaller file size and image quality before starting the compression."
            />

            <FaqItem
              question="Why would I compress an image?"
              answer="Smaller image files are often easier to upload, share and store, especially when a website, form or service has a file-size limit."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function InfoCard({ title, text }) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "15px",
        border:
          "1px solid rgba(255,255,255,.07)",
        background:
          "rgba(255,255,255,.025)",
      }}
    >
      <strong
        style={{
          display: "block",
          color: "#e2e8f0",
          fontSize: "13px",
        }}
      >
        {title}
      </strong>

      <span
        style={{
          display: "block",
          marginTop: "7px",
          color: "#64748b",
          fontSize: "12px",
          lineHeight: "1.6",
        }}
      >
        {text}
      </span>
    </div>
  )
}

function FaqItem({ question, answer }) {
  return (
    <details
      style={{
        padding: "17px 18px",
        borderRadius: "14px",
        border:
          "1px solid rgba(255,255,255,.07)",
        background:
          "rgba(255,255,255,.025)",
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

export default ImageCompressor