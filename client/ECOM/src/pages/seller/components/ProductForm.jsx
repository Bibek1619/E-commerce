import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { BASE_URL } from "../../../utils/apiPaths";

export default function ProductForm({ product = null, onSubmit, onCancel, isLoading }) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [discountedPrice, setDiscountedPrice] = useState(product?.discountedPrice || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [category, setCategory] = useState(product?.category?.join(",") || "");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(product?.images || []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !category) return alert("Name, Price, and Category are required!");

    // send plain object instead of FormData
    onSubmit({
      name,
      description,
      price: Number(price),
      discountedPrice: Number(discountedPrice),
      stock: Number(stock),
      category: category.split(",").map((c) => c.trim()),
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name *</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price *</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : 0)}
            required
          />
        </div>
        <div>
          <Label>Discounted Price</Label>
          <Input
            type="number"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value ? Number(e.target.value) : 0)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value ? Number(e.target.value) : 0)}
          />
        </div>
        <div>
          <Label>Category *</Label>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Comma separated"
            required
          />
        </div>
      </div>

      <div>
        <Label>Images</Label>
        <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
        {existingImages.length > 0 && (
          <div className="flex gap-2 mt-2">
            {existingImages.map((img, idx) => (
              <img
                key={idx}
                src={`${BASE_URL}${img}`}
                alt="Existing"
                className="w-16 h-16 object-cover rounded-md"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
