import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

import {
  Star, Heart, Share2, ShoppingCart, Truck,
  Shield, RotateCcw, MapPin, Store, Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Layout from "@/components/layout/Layout";
import { useCart } from "@/components/providers/cart-provider";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addItem, buyNowItem } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_PATHS.PRODUCT.GET_BY_ID(id));
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Could not load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-6">Loading product...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;
  if (!product) return <p className="text-center py-6">Product not found.</p>;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    if (product.variants?.length > 0 && !selectedSize) {
      toast.error("Please select a size first");
      return;
    }

    const itemId = selectedSize ? `${product._id}-${selectedSize}` : product._id;
    const itemName = selectedSize ? `${product.name} (${selectedSize})` : product.name;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: itemId,
        name: itemName,
        price: product.price,
        image: product.images?.[0],
        seller: product.seller?.name,
        size: selectedSize,
      });
    }

    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (product.variants?.length > 0 && !selectedSize) {
      toast.error("Please select a size first");
      return;
    }

    const itemId = selectedSize ? `${product._id}-${selectedSize}` : product._id;
    const itemName = selectedSize ? `${product.name} (${selectedSize})` : product.name;

    buyNowItem({
      id: itemId,
      name: itemName,
      price: product.price,
      image: product.images?.[0],
      seller: product.seller?.name,
      size: selectedSize,
    });

    navigate("/checkout?buyNow=true");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
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
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-blue-600">{product.rating || 0}</span>
                <span className="text-sm text-gray-600">({product.reviewCount || 0} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-red-600">Rs. {product.price}</span>
              <span className="text-lg text-gray-500 line-through">Rs. {product.originalPrice}</span>
              <Badge className="bg-red-500">{discount}% OFF</Badge>
            </div>

            {/* Seller */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Store className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-semibold">{product.seller?.name || "Unknown"}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.seller?.rating || "4.5"}</span>
                        <span>•</span>
                        <MapPin className="h-3 w-3" />
                        <span>{product.seller?.location || "Nepal"}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Visit Store</Button>
                </div>
              </CardContent>
            </Card>

            {/* Size selection */}
            {product.variants?.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Size</label>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map(v => (
                    <Button
                      key={v.size}
                      variant={selectedSize === v.size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(v.size)}
                      disabled={!v.available}
                    >
                      {v.size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <Select value={quantity.toString()} onValueChange={(val) => setQuantity(parseInt(val))}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(Math.min(10, product.stockCount || 5))].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600">
                {product.stockCount > 10 ? "10+ available" : `Only ${product.stockCount} left`}
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-orange-400 hover:bg-orange-500" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleBuyNow}>
                <Zap className="h-4 w-4 mr-2" /> Buy Now
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1"><Heart className="h-4 w-4 mr-2" /> Wishlist</Button>
                <Button variant="outline" className="flex-1"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
              </div>
            </div>

            {/* Shipping */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">{product.shipping?.freeShipping ? "Free Delivery" : "Paid Delivery"}</p>
                    <p className="text-sm text-gray-600">{product.shipping?.estimatedDays}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-gray-600">{product.shipping?.returnPolicy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Secure Payment</p>
                    <p className="text-sm text-gray-600">Your payment is encrypted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
       <div className="mt-12">
  <Tabs defaultValue="description" className="w-full">
    <TabsList className="grid grid-cols-3 w-full">
      <TabsTrigger
        value="description"
        className="cursor-pointer data-[state=active]:bg-orange-400 data-[state=active]:text-white"
      >
        Description
      </TabsTrigger>

      <TabsTrigger
        value="specs"
        className="cursor-pointer data-[state=active]:bg-orange-400 data-[state=active]:text-white"
      >
        Specifications
      </TabsTrigger>

      <TabsTrigger
        value="shipping"
        className="cursor-pointer data-[state=active]:bg-orange-400 data-[state=active]:text-white"
      >
        Shipping
      </TabsTrigger>
    </TabsList>

    {/* Description */}
    <TabsContent value="description" className="mt-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <p className="text-gray-700">
            {product.description || "This is a high quality product with excellent durability and design."}
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            {(product.features || ["Durable", "Lightweight", "Modern design"]).map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Specifications */}
    <TabsContent value="specs" className="mt-6">
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(
            product.specifications || {
              Material: "Cotton",
              Color: "Black",
              Weight: "500g",
              Warranty: "1 Year",
            }
          ).map(([k, v]) => (
            <div key={k} className="flex justify-between border-b pb-2">
              <span className="text-gray-600">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </TabsContent>

    {/* Shipping */}
    <TabsContent value="shipping" className="mt-6">
      <Card>
        <CardContent className="p-6 space-y-3">
          <p>{product.shipping?.estimatedDays || "Delivered within 3–5 business days"}</p>
          <p>{product.shipping?.returnPolicy || "7-day easy return policy available"}</p>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>

        </div>
      
    </Layout>
  );
}
