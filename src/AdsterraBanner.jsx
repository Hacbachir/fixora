import { useEffect, useRef } from "react"
export default function AdsterraBanner() {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container || container.dataset.loaded === "true") return
    container.dataset.loaded = "true"
    const script = document.createElement("script")
    script.type = "text/javascript"
    const options = document.createElement("script")
    options.textContent = `
      atOptions = {
        'key' : '7adb460b4b4cff57acdac91e93a441b5',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `
    const invoke = document.createElement("script")
    invoke.src =
      "https://www.highrevenueformat.com/7adb460b4b4cff57acdac91e93a441b5/invoke.js"
    container.appendChild(options)
    container.appendChild(invoke)
    return () => {
      container.innerHTML = ""
      container.dataset.loaded = "false"
    }
  }, [])
  return (
    <div
      ref={containerRef}
      style={{
        width: "300px",
        minHeight: "250px",
        margin: "35px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  )
}
