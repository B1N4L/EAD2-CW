import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Built pages arrive already rendered (see scripts/prerender.mjs), so React takes over that HTML;
// the dev server sends an empty page and React renders it from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
