import { Link } from 'react-router-dom'

const Categories = () => {
  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1570783830519-71bc4d53765d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      icon: '👔',
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      icon: '👗',
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1503919545889-aef636aabcc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      icon: '👶',
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      icon: '✨',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our diverse collection of styles for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/shop"
              className="group relative overflow-hidden rounded-2xl h-72 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-3xl font-bold text-white text-center mb-4">
                  {category.name}
                </h3>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  Explore
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
