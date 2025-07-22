// Homepage.jsx
import Layout from '@/components/layout/Layout'
import Hero from '@/components/layout/Hero'
import Categories from '@/components/home/Categories'
import ForYou from '@/components/home/ForYou';
const Homepage = () => (
  <Layout>
    <Hero />
    <Categories />
    <div className=" bg-[#E3E6E6]">

      <ForYou/>
    </div>
    {/* Add other components like FeaturedProducts, Testimonials, etc. here */}
  </Layout>
);

export default Homepage;