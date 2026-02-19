import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import { toast } from 'react-toastify'

const Shop = () => {
  const { products, search, setSearch, currency } = useContext(ShopContext)
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      : true
    const matchesCategory = category === 'all' ? true : product.category === category
    return matchesSearch && matchesCategory
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name-a':
        return a.name.localeCompare(b.name)
      case 'name-z':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  // Get unique categories
  const categories = ['all', ...new Set(products.map((p) => p.category))]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Search */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg ${
                category === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-a">Name: A to Z</option>
          <option value="name-z">Name: Z to A</option>
        </select>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-16">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.images[0]}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop
