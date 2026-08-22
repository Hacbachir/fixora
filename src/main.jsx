```jsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./App.css"
import App from "./App.jsx"

const GA_MEASUREMENT_ID = "G-77D97DW6MP"

const script = document.createElement("script")
script.async = true
script.src =
  "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID
document.head.appendChild(script)

window.dataLayer = window.dataLayer || []

function gtag() {
  window.dataLayer.push(arguments)
}

gtag("js", new Date())
gtag("config", GA_MEASUREMENT_ID)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
