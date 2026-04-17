import { Link } from 'react-router-dom'

const Footer = () => {
  const socialLinks = [
    { icon: '🐦', label: 'Twitter', url: '#' },
    { icon: '📘', label: 'Facebook', url: '#' },
    { icon: '📷', label: 'Instagram', url: '#' },
    { icon: '🎵', label: 'TikTok', url: '#' },
  ]

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Shopkart
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Quality products at affordable prices.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-500 flex items-center justify-center transition-all duration-300 hover:scale-110 text-lg"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-purple-400">→</span> Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-pink-400">→</span> Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-blue-400">→</span> Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <span>📧</span>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:support@forever.com" className="hover:text-white transition-colors">
                    support@Shopkart.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <span>📞</span>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href="tel:+1234567890" className="hover:text-white transition-colors">
                    +91 8100045000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <span>📍</span>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>Chauk Bazar Mathura, 281121</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Shopkart. All rights reserved.</p>
            </div>
            
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
