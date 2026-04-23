import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/print.css'
import App from './App.jsx'
import { reportWebVitals } from './vitals.js'
import { initAnalytics, trackEvent } from './lib/analytics.js'

// Load GA4 + Hotjar if user previously consented
initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Send Core Web Vitals to GA4 as custom events
reportWebVitals((metric) => {
  trackEvent('web_vital', {
    metric_name: metric.name,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_id: metric.id,
  })
})
