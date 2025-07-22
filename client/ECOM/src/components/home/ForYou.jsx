import React from "react"
import { Link } from "react-router-dom"
import { Star, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { featuredProducts } from "@/data/data"

const ForYou = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">More Featured Products</h2>
          <p className="text-gray-950 max-w-2xl mx-auto text-xl ">
            Discover our handpicked selection of authentic Nepali products, crafted with tradition and quality
          </p>
        </div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
  {featuredProducts.map((item) => (
    <Card key={item.id} className="hover:shadow-lg group bg-white cursor-pointer p-1 border-none">
      <CardContent className="p-0 h-[35vh] flex flex-col">
        
        {/* Image */}
        <div className="relative h-1/2">
          <Link to={`/products/${item.id}`}>
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Wishlist */}
          <div className="absolute top-2 right-2">
            <button className="p-1 rounded-full bg-white hover:bg-gray-100 shadow">
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Badge */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge className="bg-red-500 text-white">
              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 h-1/2 flex flex-col justify-between">
          <div>
            {/* Name */}
            <Link to={`/products/${item.id}`}>
              <h3 className="font-semibold text-sm md:text-base mb-1 hover:text-orange-500 line-clamp-2 min-h-[3.5rem]">
                {item.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(item.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">({item.reviews})</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-orange-500">
              Rs. {item.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 line-through">
              Rs. {item.originalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>



        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="hover:bg-orange-50 hover:border-orange-300">
            <Link to="/products" className="flex items-center">
              View All Products
              <span className="ml-2 animate-bounce">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ForYou
