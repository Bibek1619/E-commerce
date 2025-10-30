// src/pages/product/productDetails/ProductMain.jsx
import React from "react";
import {
  Star, Heart, ShoppingCart, Zap, Store, MapPin, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

export default function ProductMain({
  product, selectedImage, setSelectedImage, isWishlisted, setIsWishlisted,
  selectedSize, setSelectedSize, selectedColor, setSelectedColor,
  quantity, setQuantity, discount, handleAddToCart, handleBuyNow
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* LEFT: Images */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
          <img
            src={product.images?.[selectedImage] || "/images/default-product.png"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
          <Button
            size="sm"
            variant="outline"
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {product.images?.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                selectedImage === idx ? "border-orange-500" : "border-gray-200"
              }`}
            >
              <img src={img} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Details */}
      <div className="space-y-6">

        {/* Name, Brand, Rating, Tags */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">Brand: <span className="font-medium">{product.brand || "N/A"}</span></p>
          <div className="flex items-center gap-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-1 text-sm text-blue-600">{product.rating || 0}</span>
            <span className="text-sm text-gray-600">({product.reviewCount || 0} reviews)</span>
          </div>

          {product.tags?.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {product.tags.map((tag, i) => (
                <Badge key={i} className="bg-blue-100 text-blue-800">{tag}</Badge>
              ))}
            </div>
          )}
        </div>

        {/* Price & Discount */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-red-600">Rs. {product.price}</span>
          {product.originalPrice && <span className="text-lg text-gray-500 line-through">Rs. {product.originalPrice}</span>}
          {discount > 0 && <Badge className="bg-red-500">{discount}% OFF</Badge>}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2">
          {product.stock > 0 ? (
            <span className="flex items-center text-green-600"><CheckCircle className="h-4 w-4 mr-1" /> In stock ({product.stock})</span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </div>

        {/* Seller Info */}
        {product.seller && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">{product.seller?.name || "Unknown"}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{product.seller?.location || "Nepal"}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Visit Store</Button>
              </div>
            </CardContent>
          </Card>
        )}

{/* Variants: Size & Color */}
{product.variants?.length > 0 && (
  <div className="space-y-5">
    {/* Select Size */}
    <div>
      <label className="text-sm font-medium text-gray-900">Select Size</label>
      <div className="flex gap-2 flex-wrap mt-2">
        {[...new Set(product.variants.map(v => v.size))].map(size => {
          const available = product.variants.some(v => v.size === size && v.stock > 0);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setSelectedColor("");
              }}
              disabled={!available}
              className={`px-4 py-2 text-sm rounded-md border transition-all duration-150
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:text-blue-600"
                }
                ${!available ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>

    {/* Select Color */}
    {selectedSize && (
      <div>
        <label className="text-sm font-medium text-gray-900">Select Color</label>
        <div className="flex gap-2 flex-wrap mt-2">
          {product.variants
            .filter(v => v.size === selectedSize)
            .map(v => {
              const isSelected = selectedColor === v.color;
              return (
                <button
                  key={v.color}
                  onClick={() => setSelectedColor(v.color)}
                  disabled={v.stock === 0}
                  className={`px-4 py-2 text-sm rounded-md border transition-all duration-150
                    ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:text-blue-600"
                    }
                    ${v.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {v.color}{" "}
                  <span className="text-xs text-gray-500 ml-1">
                    ({v.stock})
                  </span>
                </button>
              );
            })}
        </div>

        {selectedColor && (
          <p className="text-sm text-green-600 mt-2">
            {
              product.variants.find(
                v => v.size === selectedSize && v.color === selectedColor
              )?.stock
            }{" "}
            item(s) available in this size and color
          </p>
        )}
      </div>
    )}
  </div>
)}


<div className="space-y-2">
  <label className="text-sm font-medium text-gray-900">Quantity</label>
  <Select
    value={quantity.toString()}
    onValueChange={(val) => setQuantity(parseInt(val))}
  >
    <SelectTrigger
      className="w-24 rounded-md border border-gray-300 bg-white text-gray-800
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 hover:border-blue-500 transition-all duration-150"
    >
      <SelectValue placeholder="1" />
    </SelectTrigger>

    <SelectContent
      className="rounded-md border border-gray-200 bg-white shadow-md"
    >
      {[...Array(Math.min(10, product.stock || 5))].map((_, i) => (
        <SelectItem
          key={i + 1}
          value={(i + 1).toString()}
          className="text-gray-800 hover:bg-blue-50 hover:text-blue-600 
                     cursor-pointer transition-colors duration-150"
        >
          {i + 1}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>



        {/* Buttons */}
        <div className="space-y-3 pt-2">
          <Button className="w-full bg-orange-400 hover:bg-orange-500" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleBuyNow}>
            <Zap className="h-4 w-4 mr-2" /> Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
