import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'

const LatestCollection = () => {
  const { products, search } = useContext(ShopContext)

  // Filter products based on search
  const filteredProducts = search
    ? products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      )
    : products

  // Get latest 10 products
  const latestProducts = filteredProducts.slice(0, 10)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-100 border border-purple-300 rounded-full">
            <p className="text-purple-600 text-sm font-semibold">🔥 TRENDING NOW</p>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Collection
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our newest arrivals to bring you the latest trends and timeless classics.
          </p>
        </div>

        {latestProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-6">No products found.</p>
            <Link 
              to="/shop" 
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Explore All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
              {latestProducts.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  image={product.images[0]}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center">
              <Link
                to="/shop"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default LatestCollection
