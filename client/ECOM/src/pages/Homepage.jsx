// Homepage.jsx
import Layout from '@/components/layout/Layout'
import Hero from '@/components/layout/Hero'
import Categories from '@/components/home/Categories'

import Special from './../components/home/Special';
import Recommend from './../components/home/Recommend';
const Homepage = () => (
  <Layout>
    <Hero />
    <Categories />
    <div className=" bg-[#E3E6E6] -mt-6">

      <Recommend/>
      <div className=" bg-[#E3E6E6] -mt-6"></div>

    
    <Special/>
    </div>
   
  </Layout>
);

export default Homepage;