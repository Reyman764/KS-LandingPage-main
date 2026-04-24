import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/print.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Defer all non-critical work until the browser is idle.
// Frees the main thread during initial paint → lower TBT and faster TTI.
const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))

idle(() => {
  Promise.all([
    import('./vitals.js'),
    import('./lib/analytics.js'),
  ]).then(([{ reportWebVitals }, { initAnalytics, trackEvent }]) => {
    initAnalytics()
    reportWebVitals((metric) => {
      trackEvent('web_vital', {
        metric_name: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_id: metric.id,
      })
    })
  })
})
