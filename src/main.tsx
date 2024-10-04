import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// el signo de exlamación después del root - Assertion not null o non null assertion operator