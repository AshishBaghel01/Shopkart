const Features = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'On orders over $100. Fast and reliable delivery to your doorstep.',
    },
    {
      icon: '💯',
      title: 'Premium Quality',
      description: 'Handpicked products sourced from trusted brands worldwide.',
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: '30-day return policy. No questions asked, hassle-free returns.',
    },
    {
      icon: '🛡️',
      title: 'Secure Payment',
      description: 'SSL encrypted transactions. Your payment information is always safe.',
    },
    {
      icon: '⭐',
      title: '24/7 Support',
      description: 'Our customer service team is always ready to help you anytime.',
    },
    {
      icon: '🎁',
      title: 'Gift Wrapping',
      description: 'Free gift wrapping service for all your special occasions.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg">
            Experience shopping like never before with our premium services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
