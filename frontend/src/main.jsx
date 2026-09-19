import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/header.css'
import './styles/language-switcher.css'
import './styles/accessibility-panel.css'
import './styles/progress-indicator.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
