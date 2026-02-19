import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const currency = '₨ '
  const delivery_fee = 10
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  // Add to cart function
  const addToCart = async (itemId, size) => {
    if (!size) {
      return { success: false, message: 'Please select a size' }
    }

    const cartData = structuredClone(cartItems)
    
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    setCartItems(cartData)

    // If user is logged in, also save to backend
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    }

    return { success: true, message: 'Added to cart' }
  }

  // Get cart count
  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          console.error('Error getting cart count:', error)
        }
      }
    }
    return totalCount
  }

  // Update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setCartItems(cartData)

    if (token) {
      try {
        await axios.put(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.error('Error updating quantity:', error)
      }
    }
  }

  // Get cart total
  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            const productInfo = products.find((product) => product._id === items)
            if (productInfo) {
              totalAmount += productInfo.price * cartItems[items][item]
            }
          }
        } catch (error) {
          console.error('Error getting cart amount:', error)
        }
      }
    }
    return totalAmount
  }

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`)
      if (response.data.success) {
        setProducts(response.data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // Fetch user cart
  const fetchCart = async () => {
    if (token) {
      try {
        const response = await axios.get(`${backendUrl}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.data.success) {
          setCartItems(response.data.cartData)
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
      }
    }
  }

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/login`,
        { email, password }
      )
      if (response.data.success) {
        setToken(response.data.token)
        setUser(response.data.user)
        localStorage.setItem('token', response.data.token)
        return { success: true, message: 'Login successful' }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/signup`,
        { name, email, password }
      )
      if (response.data.success) {
        setToken(response.data.token)
        setUser(response.data.user)
        localStorage.setItem('token', response.data.token)
        return { success: true, message: 'Registration successful' }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' }
    }
  }

  // Logout function
  const logout = () => {
    setToken('')
    setUser(null)
    setCartItems({})
    localStorage.removeItem('token')
  }

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch cart when token changes
  useEffect(() => {
    if (token) {
      fetchCart()
    }
  }, [token])

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    search,
    setSearch,
    token,
    setToken,
    user,
    setUser,
    login,
    register,
    logout,
    backendUrl,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default ShopContextProvider
