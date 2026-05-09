import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position="bottom-right" toastOptions={{
      style: {
        background: '#1e293b',
        color: '#fff',
        border: '1px solid #334155'
      }
    }}/>
    <App />
  </React.StrictMode>,
)
