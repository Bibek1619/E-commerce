// src/pages/product/productDetails/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { useCart } from "@/components/providers/cart-provider";
import toast from "react-hot-toast";
import Layout from "@/components/layout/Layout";
import ProductMain from "./ProductMain";
import ProductTabs from "./ProductTabs";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, buyNowItem } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_PATHS.PRODUCT.GET_BY_ID(id));
        setProduct(res.data);
      } catch {
        toast.error("Could not load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (!product) return <p className="text-center py-6">Not Found</p>;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

const handleAddToCart = () => {
  if (product.variants?.length > 0 && (!selectedSize || !selectedColor))
    return toast.error("Please select size and color");

  const variant = product.variants.find(v => v.size === selectedSize && v.color === selectedColor);
  if (!variant || variant.stock < quantity) return toast.error("Not enough stock");

  for (let i = 0; i < quantity; i++) {
    addItem({
      id: `${product._id}-${selectedSize}-${selectedColor}`,
      name: `${product.name} (${selectedSize}, ${selectedColor})`,
      price: variant.price,
      image: product.images?.[0],
    });
  }
  toast.success(`${quantity} item(s) added to cart`);
};

const handleBuyNow = () => {
  // if product has variants, user must select size + color
  if (product.variants?.length > 0 && (!selectedSize || !selectedColor)) {
    return toast.error("Please select size and color");
  }

  // find the exact variant
  const variant = product.variants?.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  // check stock
  if (variant && variant.stock < quantity) {
    return toast.error("Not enough stock");
  }

  // send to buyNow
  buyNowItem({
    id: variant ? `${product._id}-${selectedSize}-${selectedColor}` : product._id,
    name: variant
      ? `${product.name} (${selectedSize}, ${selectedColor})`
      : product.name,
    price: variant?.price || product.price,
    image: product.images?.[0],
  });

  navigate("/checkout?buyNow=true");
};


  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <ProductMain
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isWishlisted={isWishlisted}
          setIsWishlisted={setIsWishlisted}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
 setSelectedColor={setSelectedColor}
          quantity={quantity}
          setQuantity={setQuantity}
          discount={discount}
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
        />
        <ProductTabs product={product} showFullDesc={showFullDesc} setShowFullDesc={setShowFullDesc} />
      </div>
    </Layout>
  );
}
