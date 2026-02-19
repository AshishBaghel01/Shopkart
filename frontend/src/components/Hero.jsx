import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-block mb-6 px-4 py-2 bg-purple-500 bg-opacity-20 border border-purple-400 rounded-full">
              <p className="text-purple-300 text-sm font-semibold">✨ New Collection Available</p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Your 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Unique Style</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Explore our curated collection of premium fashion. From timeless classics to trendy pieces, 
              find everything you need to express your personal style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Shop Collection
              </Link>
              <Link
                to="/shop"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold text-purple-400">500+</p>
                <p className="text-gray-400">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-400">10k+</p>
                <p className="text-gray-400">Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">24/7</p>
                <p className="text-gray-400">Support</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Hero"
                className="relative rounded-2xl shadow-2xl w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default Hero
