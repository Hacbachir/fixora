import { useEffect } from "react"
export default function AdsterraNative() {
  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.setAttribute("data-cfasync", "false")
    script.src = "https://pl31025526.profitableratecpmnetwork.com/6e21f1825c39566be0ea2fb6adb674bb/invoke.js"
    const container = document.getElementById("container-6e21f1825c39566be0ea2fb6adb674bb")
    if (!container) return
    container.appendChild(script)
    return () => {
      script.remove()
      container.innerHTML = ""
    }
  }, [])
  return (
    <div
      id="container-6e21f1825c39566be0ea2fb6adb674bb"
      style={{
        width: "100%",
        maxWidth: "900px",
        minHeight: "100px",
        margin: "35px auto",
      }}
    />
  )
}
