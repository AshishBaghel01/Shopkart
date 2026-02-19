import LatestCollection from '../components/LatestCollection'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Categories from '../components/Categories'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <LatestCollection />
      <Features />
      <Newsletter />
    </div>
  )
}

export default Home
