import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { reportWebVitals } from './vitals.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Start measuring Core Web Vitals after hydration
// In production, pass a custom reporter to send data to your analytics:
// reportWebVitals(metric => gtag('event', metric.name, { value: metric.value }))
reportWebVitals()
