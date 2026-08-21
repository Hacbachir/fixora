import { useState } from "react"

function ImageCompressor() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [compressedSize, setCompressedSize] = useState(null)
  const [quality, setQuality] = useState(0.7)
  const [loading, setLoading] = useState(false)

  const handleFile = (event) => {
    const selectedFile = event.target.files[0]

    if (!selectedFile) return

    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setCompressedImage(null)
    setCompressedSize(null)
  }

  const compressImage = () => {
    if (!file) return

    setLoading(true)

    const image = new Image()
    const reader = new FileReader()

    reader.onload = (event) => {
      image.src = event.target.result
    }

    image.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = image.width
      canvas.height = image.height

      ctx.drawImage(image, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setLoading(false)
            return
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
    <div className="compressor-page">
      <div className="compressor-header">
        <p className="eyebrow">IMAGE TOOL</p>

        <h1>Image Compressor</h1>

        <p className="compressor-description">
          Reduce your image file size while keeping
          the quality you need.
        </p>
      </div>

      <div className="upload-box">
        {!file && (
          <>
            <div className="upload-icon">
              🖼️
            </div>

            <h2>
              Upload your image
            </h2>

            <p>
              Choose an image from your computer
              to get started.
            </p>

            <label className="upload-button">
              Choose Image

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFile}
                hidden
              />
            </label>

            <p className="file-types">
              JPG, PNG or WebP
            </p>
          </>
        )}

        {file && (
          <div className="selected-file">
            {preview && (
              <div className="image-preview-container">
                <img
                  src={preview}
                  alt="Original"
                  className="image-preview"
                />
              </div>
            )}

            <div className="file-info">
              <h3>{file.name}</h3>

              <p>
                Original size:{" "}
                <strong>
                  {originalSize} MB
                </strong>
              </p>
            </div>

            <div className="quality-control">
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
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>

            <button
              className="compress-button"
              onClick={compressImage}
              disabled={loading}
            >
              {loading
                ? "Compressing..."
                : "Compress Image"}
            </button>

            {compressedImage && (
              <div className="result">
                <div className="result-success">
                  ✓ Compression Complete
                </div>

                <h2>
                  Your image is ready
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
    </div>
  )
}

export default ImageCompressor