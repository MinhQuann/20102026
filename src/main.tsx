import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Per-weight files carry unicode-range per subset, so only latin + vietnamese download.
// (The per-subset files like `vietnamese-500.css` have NO unicode-range and break diacritics.)
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/600-italic.css'
import '@fontsource/be-vietnam-pro/500.css'
import '@fontsource/be-vietnam-pro/600.css'
import '@fontsource/dancing-script/500.css'

import './styles/index.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
