import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const AdminNav = () => {
  const { adminLogout } = useContext(AdminContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login')
  }

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="text-2xl font-bold">
              FOREVER ADMIN
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/admin/dashboard"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              to="/admin/add-product"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Add Product
            </Link>
            <Link
              to="/admin/orders"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Orders
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNav
