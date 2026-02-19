import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Cart = () => {
  const navigate = useNavigate()
  const { 
    cartItems, 
    products, 
    currency, 
    delivery_fee, 
    getCartAmount, 
    updateQuantity, 
    token 
  } = useContext(ShopContext)

  const cartAmount = getCartAmount()

  const handleQuantityChange = (itemId, size, quantity) => {
    updateQuantity(itemId, size, quantity)
  }

  const handleCheckout = async () => {
    if (!token) {
      toast.error('Please login to checkout')
      navigate('/login')
      return
    }

    if (cartAmount === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      // Create order
      const orderData = {
        items: Object.keys(cartItems).flatMap((itemId) => 
          Object.entries(cartItems[itemId]).map(([size, quantity]) => ({
            productId: itemId,
            size,
            quantity,
            price: products.find((p) => p._id === itemId)?.price || 0
          }))
        ),
        amount: cartAmount + delivery_fee,
        address: {}, // User address should be fetched or entered
        paymentMethod: 'stripe'
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/orders/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success('Order created successfully')
        navigate('/')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating order')
    }
  }

  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0 || 
    Object.values(cartItems).every((item) => 
      Object.values(item).every((qty) => qty === 0)
    )

  if (isCartEmpty) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {Object.keys(cartItems).map((itemId) => {
            const product = products.find((p) => p._id === itemId)
            if (!product) return null

            return (
              <div
                key={itemId}
                className="flex gap-4 border-b py-4"
              >
                {/* Product Image */}
                <Link to={`/product/${itemId}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1">
                  <Link to={`/product/${itemId}`} className="font-medium hover:text-primary">
                    {product.name}
                  </Link>
                  <p className="text-gray-500">
                    {currency}{product.price}
                  </p>

                  {/* Sizes */}
                  <div className="mt-2">
                    {Object.keys(cartItems[itemId]).map((size) => {
                      const quantity = cartItems[itemId][size]
                      if (quantity === 0) return null

                      return (
                        <div key={size} className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500">Size: {size}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(itemId, size, quantity - 1)}
                              className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(itemId, size, quantity + 1)}
                              className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-medium">
                            {currency}{product.price * quantity}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{currency}{cartAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{currency}{delivery_fee}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{currency}{cartAmount + delivery_fee}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Buy
            </button>

            <Link
              to="/shop"
              className="block text-center mt-4 text-primary hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
