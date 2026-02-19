import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart, currency, token } = useContext(ShopContext)
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const productData = products.find((p) => p._id === id)
    if (productData) {
      setProduct(productData)
      if (productData.sizes && productData.sizes.length > 0) {
        setSelectedSize(productData.sizes[0])
      } else {
        // If product doesn't have sizes, set a default 'One Size' option
        setSelectedSize('One Size')
      }
    }
    setLoading(false)
  }, [id, products])

  const handleAddToCart = async () => {
    // Require login before adding to cart
    if (!token) {
      toast.info('Please login to add items to your cart')
      navigate('/login', { state: { from: `/product/${id}` } })
      return
    }

    if (!selectedSize) {
      toast.error('Please select a size before adding to cart')
      return
    }

    if (!product) {
      toast.error('Product not found')
      return
    }

    const result = await addToCart(product._id, selectedSize)
    if (result.success) {
      toast.success('Product added to cart successfully!')
    } else {
      toast.error(result.message || 'Failed to add product to cart')
    }
  }

  const handleBuy = async () => {
    // Require login before buying
    if (!token) {
      toast.info('Please login to continue')
      navigate('/login', { state: { from: `/product/${id}` } })
      return
    }

    if (!selectedSize) {
      toast.error('Please select a size before buying')
      return
    }

    if (!product) {
      toast.error('Product not found')
      return
    }

    const result = await addToCart(product._id, selectedSize)
    if (result.success) {
      toast.success('Added to cart — proceed to buy')
      navigate('/cart')
    } else {
      toast.error(result.message || 'Failed to add product to cart')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">
            {currency}{product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart + Buy Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuy}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-colors"
            >
              Buy
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6 mt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-2 font-medium">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-500">Subcategory:</span>
                <span className="ml-2 font-medium">{product.subCategory}</span>
              </div>
              {product.bestSeller && (
                <div>
                  <span className="text-green-600 font-medium">Best Seller</span>
                </div>
              )}
              <div>
                <span className="text-gray-500">Availability:</span>
                <span className={`ml-2 font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
