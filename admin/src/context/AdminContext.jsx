import { createContext, useState } from 'react'
import axios from 'axios'

export const AdminContext = createContext()

const AdminContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '')

  // Admin Login
  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      })

      if (response.data.success) {
        setAdminToken(response.data.token)
        localStorage.setItem('adminToken', response.data.token)
        return { success: true, message: 'Admin login successful' }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      }
    }
  }

  // Admin Logout
  const adminLogout = () => {
    setAdminToken('')
    localStorage.removeItem('adminToken')
  }

  const value = {
    backendUrl,
    adminToken,
    setAdminToken,
    adminLogin,
    adminLogout,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export default AdminContextProvider
