import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import Orders from './pages/Orders'
import AdminNav from './components/AdminNav'

function AdminApp() {
  const { adminToken } = useContext(AdminContext)

  return (
    <div className="min-h-screen bg-gray-100">
      {adminToken && <AdminNav />}
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        
        {adminToken ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/admin/login" />} />
        )}
      </Routes>
    </div>
  )
}

export default AdminApp
