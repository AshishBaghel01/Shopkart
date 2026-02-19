import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link to={`/product/${id}`} className="group h-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-square shadow-md hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 filter group-hover:brightness-110"
        />
        
        {/* New Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          NEW
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 bg-white text-slate-900 px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-gray-100">
            View Details
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-xs text-gray-500">(128)</span>
        </div>

        <p className="text-lg font-bold text-gray-900">
          {currency}{price}
        </p>

        <div className="pt-2 hidden group-hover:block animate-in fade-in duration-300">
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300">
            + Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
