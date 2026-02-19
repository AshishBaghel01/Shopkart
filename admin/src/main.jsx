import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './AdminApp.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminContextProvider from './context/AdminContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <ToastContainer />
        <AdminApp />
      </AdminContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
