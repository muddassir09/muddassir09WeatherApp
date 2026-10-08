import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import theme from "./Theme/Theme.jsx"
import './index.css'
import App from './App.jsx'

const hour = new Date().getHours();

if (hour <= 8 || hour > 19) {
  document.body.classList.add("night")
}

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
)
