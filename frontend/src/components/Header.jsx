import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Header = () => {
  const { getCartCount, search, setSearch, token, logout, user } = useContext(ShopContext)
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300 whitespace-nowrap">
          Shopkart
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-300 group-focus-within:text-purple-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 md:space-x-8">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-sm md:text-base"
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-sm md:text-base"
          >
            Shop
          </Link>

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
          >
            <svg
              className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {getCartCount() > 0 && (
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {token ? (
            <div className="relative group">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base font-medium group-hover:text-white"
              >
                <span className="hidden sm:inline">{user?.name || 'User'}</span>
                <svg 
                  className={`h-4 w-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 shadow-xl rounded-lg py-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-300 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium text-sm md:text-base hover:scale-105 transform"
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </header>
  )
}

export default Header
