import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const featuredSlideProducts = [
  {
    id: '1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVsF_hDLhlXM-BJ2UO8VK_SXKO8uzNIeC7vf35zzCptVCAtLWWpUhvUtVGdkXjEBJDDOc&usqp=CAU',
    alt: 'Authentic Nepali Handicrafts',
  },
  {
    id: '2',
    image: 'https://www.shutterstock.com/image-photo/colorful-wooden-masks-handicrafts-on-260nw-399519232.jpg',
    alt: 'Traditional Nepali Spices and Foods',
  },
  {
    id: '3',
    image: 'https://www.shutterstock.com/image-photo/eco-organic-clothes-made-cannabis-600nw-1503818810.jpg',
    alt: 'Nepali Cultural Artifacts',
  },
];

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 border border-gray-200"
    aria-label="Previous slide"
  >
    <ChevronLeft size={24} className="text-orange-600" />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 border border-gray-200"
    aria-label="Next slide"
  >
    <ChevronRight size={24} className="text-orange-600" />
  </button>
);

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#E3E6E6] to-[#D4D8D9] overflow-hidden min-h-screen flex items-center">
      {/* Optional subtle background pattern or overlay for depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f0f0f0\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-4 py-8 lg:py-16 flex flex-col lg:flex-row items-center justify-between h-full max-w-7xl">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start space-y-6 lg:pr-8 mb-8 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 mb-4 animate-fade-in-up">
            Discover Authentic
            <span className="block text-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Nepali Products
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-md">
            Immerse yourself in the rich heritage of Nepal. From exquisite traditional handicrafts and vibrant textiles to aromatic spices and gourmet food items, explore the finest craftsmanship and cultural treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-base font-semibold rounded-xl" 
              asChild
            >
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 hover:border-orange-600 hover:text-orange-600 transition-all duration-300 px-8 py-3 text-base font-semibold rounded-xl"
            >
              Learn More
            </Button>
          </div>
          {/* Extra: Added a small trust indicator or feature highlight */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Free shipping on orders over $50 | Authentic & Sustainable
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 relative h-96 md:h-[70vh] lg:h-[80vh] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl shadow-2xl"></div>
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            arrows
            showDots={true}
            dotListClass="flex justify-center mt-4 space-x-2"
            itemClass="carousel-item"
            containerClass="carousel-container"
            className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          >
            {featuredSlideProducts.map((item) => (
              <div key={item.id} className="w-full h-full flex items-center justify-center relative">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                {/* Extra: Overlay text on image for better engagement */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-semibold mb-1 drop-shadow-lg">{item.alt}</h3>
                  <p className="text-sm opacity-90 drop-shadow-lg">Explore Nepal's finest</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Extra: Added a subtle scroll indicator for better UX */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
