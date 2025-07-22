import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const featuredSlideProducts = [
  {
    id: '1',
    image: 'https://m.media-amazon.com/images/I/81hIlE5xocL._SX3000_.jpg',
  },
  {
    id: '2',
    image: 'https://m.media-amazon.com/images/I/619geyiQI5L._SX3000_.jpg',
  },
  {
    id: '3',
    image: 'https://m.media-amazon.com/images/I/619geyiQI5L._SX3000_.jpg',
  },
];

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
    <ChevronLeft size={30} className="cursor-pointer bg-orange-600 text-white rounded-full p-1" />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
    <ChevronRight size={30} className="cursor-pointer bg-orange-600 text-white rounded-full p-1" />
  </button>
);

const Hero = () => {
  return (
    <section className="relative bg-[#E3E6E6] overflow-hidden m-1/2vh">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-6 lg:px-12 py-12 ">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover Authentic
            <span className="block text-orange-500">Nepali Products</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-700">
            From traditional handicrafts to delicious food items, explore the best of Nepal's culture and craftsmanship.
          </p>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600" asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-100"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Content */}
        {/* Right Content */}
<div className="w-full lg:w-1/2 md:h-[70vh]flex items-center justify-center px-4 pb-3 md:mt-4">
  <Carousel
    responsive={responsive}
    infinite
    autoPlay
    autoPlaySpeed={2000}
    customLeftArrow={<CustomLeftArrow />}
    customRightArrow={<CustomRightArrow />}
    arrows
    showDots={false}
  >
    {featuredSlideProducts.map((item) => (
      <div key={item.id} className="w-full h-full flex items-center justify-center">
        <img
          src={item.image}
          alt="Slide"
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
    ))}
  </Carousel>
</div>




      </div>
    </section>
  );
};

export default Hero;
