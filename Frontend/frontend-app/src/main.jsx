import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DEMO_MODE } from './demo/mode.js'
import { installDemoApi } from './demo/demoApi.js'
import DemoBanner from './demo/DemoBanner.jsx'

if (DEMO_MODE) installDemoApi()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {DEMO_MODE && <DemoBanner />}
    <App />
  </StrictMode>,
)
