import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductPricing from "./ProductPricing";
import ProductFeatures from "./ProductFeatures";
import ProductVariants from "./ProductVarients";
import ProductShipping from "./ProductShipping";
import ProductImages from "./ProductImages";
import ProductPreview from "./ProductPreview";

export default function ProductForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    discountedPrice: "",
    stock: "",
    features: [""],
    specifications: [{ name: "", value: "" }],
    variants: [],
    shipping: { freeShipping: false, estimatedDays: "", returnPolicy: "" },
    images: [],
    existingImages: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex gap-6 max-w-7xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="flex-1 space-y-6 bg-gray-50 rounded-lg p-6"
      >
        <ProductBasicInfo formData={formData} setFormData={setFormData} />
        <ProductPricing formData={formData} setFormData={setFormData} />
        <ProductFeatures formData={formData} setFormData={setFormData} />
        <ProductVariants formData={formData} setFormData={setFormData} />
        <ProductShipping formData={formData} setFormData={setFormData} />
        <ProductImages formData={formData} setFormData={setFormData} />

        <div className="flex justify-end gap-3">
          <Button type="reset" variant="outline">Cancel</Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>

      {/* Preview Panel */}
      <ProductPreview formData={formData} />
    </div>
  );
}
