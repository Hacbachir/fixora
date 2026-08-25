import { useEffect } from "react"
export default function AdsterraNative() {
  useEffect(() => {
    const container = document.getElementById("adsterra-native-fixora")
    if (!container || container.dataset.loaded === "true") return
    container.dataset.loaded = "true"
    const script = document.createElement("script")
    script.async = true
    script.setAttribute("data-cfasync", "false")
    script.src =
      "https://pl31025526.profitableratecpmnetwork.com/6e21f1825c39566be0ea2fb6adb674bb/invoke.js"
    container.appendChild(script)
    return () => {
      container.innerHTML = ""
      container.dataset.loaded = "false"
    }
  }, [])
  return (
    <div
      id="adsterra-native-fixora"
      style={{
        width: "100%",
        maxWidth: "900px",
        minHeight: "100px",
        margin: "35px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  )
}
