import React, { useState, useEffect } from "react";
import { 
  Package, DollarSign, Image, Truck, Tag, Settings, Plus, X, Upload,
  Star, Eye, EyeOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Mock UI components (as in your original code)
const Button = ({ children, variant = "default", size = "default", type = "button", onClick, disabled, className = "" }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
  };
  const sizes = { default: "h-10 py-2 px-4", sm: "h-9 px-3", lg: "h-11 px-8" };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};
const Input = ({ type = "text", value, onChange, placeholder, required, className = "" }) => (
  <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
    className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} />
);
const Textarea = ({ value, onChange, placeholder, className = "" }) => (
  <textarea value={value} onChange={onChange} placeholder={placeholder}
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} />
);
const Label = ({ children, className = "" }) => <label className={`text-sm font-medium ${className}`}>{children}</label>;
const Checkbox = ({ checked, onChange }) => <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />;
const Card = ({ children, className = "" }) => <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="flex flex-col space-y-1.5 p-6 pb-4">{children}</div>;
const CardTitle = ({ children, icon: Icon }) => <div className="flex items-center gap-2 text-lg font-semibold">{Icon && <Icon className="h-5 w-5 text-blue-600" />}{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Badge = ({ children, className = "" }) => <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 ${className}`}>{children}</span>;

export default function ProductForm({ product = null, onSubmit, onCancel, isLoading }) {
  const navigate = useNavigate();

  // Basic info
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category?.join(",") || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [tags, setTags] = useState(product?.tags?.join(",") || "");

  // Pricing & stock
  const [price, setPrice] = useState(product?.price || "");
  const [discountedPrice, setDiscountedPrice] = useState(product?.discountedPrice || "");
  const [stock, setStock] = useState(product?.stock || "");

  // Features & specifications
  const [features, setFeatures] = useState(product?.features || [""]);
  const [specifications, setSpecifications] = useState(
    product?.specifications ? Object.entries(product.specifications).map(([name, value]) => ({ name, value })) : [{ name: "", value: "" }]
  );

  // Variants
  const [variants, setVariants] = useState(product?.variants || []);

  // Shipping
  const [freeShipping, setFreeShipping] = useState(product?.shipping?.freeShipping || false);
  const [estimatedDays, setEstimatedDays] = useState(product?.shipping?.estimatedDays || "");
  const [returnPolicy, setReturnPolicy] = useState(product?.shipping?.returnPolicy || "");

  // Images
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(product?.images || []);

  // UI
  const [showPreview, setShowPreview] = useState(false);
  const sections = [
    { id: "basic", label: "Basic Info", icon: Package },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "features", label: "Features", icon: Star },
    { id: "variants", label: "Variants", icon: Settings },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "images", label: "Images", icon: Image },
  ];
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const activeSection = sections[activeSectionIdx];

  // Handlers
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter(file => !images.some(img => img.name === file.name));
    if (newFiles.length + images.length + existingImages.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }
    setImages(prev => [...prev, ...newFiles]);
  };
  const removeSelectedImage = (idx) => setImages(images.filter((_, i) => i !== idx));
  const removeExistingImage = (idx) => setExistingImages(existingImages.filter((_, i) => i !== idx));
  const handleFeatureChange = (idx, value) => setFeatures(features.map((f, i) => i === idx ? value : f));
  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (idx) => setFeatures(features.filter((_, i) => i !== idx));
  const handleSpecChange = (idx, field, val) => setSpecifications(specifications.map((s, i) => i === idx ? { ...s, [field]: val } : s));
  const addSpec = () => setSpecifications([...specifications, { name: "", value: "" }]);
  const removeSpec = (idx) => setSpecifications(specifications.filter((_, i) => i !== idx));
  const handleVariantChange = (idx, field, value) => setVariants(variants.map((v, i) => i === idx ? { ...v, [field]: value } : v));
  const addVariant = () => setVariants([...variants, { size: "", color: "", price: "", stock: "" }]);
  const removeVariant = (idx) => setVariants(variants.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !category) { alert("Please fill Name, Price, Category"); return; }
    const data = {
      name,
      description,
      price: Number(price),
      discountedPrice: Number(discountedPrice) || 0,
      stock: Number(stock) || 0,
      category: category.split(",").map(c => c.trim()).filter(Boolean),
      brand,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      features: features.filter(Boolean),
      specifications: Object.fromEntries(specifications.filter(s => s.name).map(s => [s.name, s.value])),
      variants: variants.filter(v => v.size || v.color),
      images,
      existingImages,
      shipping: { freeShipping, estimatedDays, returnPolicy },
    };
    onSubmit(data);
    navigate("/seller/dashboard"); // Redirect to ProductList after adding
  };

  const nextSection = () => { if (activeSectionIdx < sections.length - 1) setActiveSectionIdx(prev => prev + 1); };
  const prevSection = () => { if (activeSectionIdx > 0) setActiveSectionIdx(prev => prev - 1); };

  const totalImages = images.length + existingImages.length;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{product ? "Update Product" : "Add New Product"}</h1>
        <p className="text-gray-600">Fill the details to {product ? "update" : "create"} a product</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2 flex md:flex-col overflow-x-auto md:overflow-visible">
          {sections.map((sec, idx) => (
            <button key={sec.id} onClick={() => setActiveSectionIdx(idx)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left whitespace-nowrap ${activeSectionIdx === idx ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600" : "bg-white hover:bg-gray-50 text-gray-700"}`}>
              <sec.icon className="h-5 w-5" />
              {sec.label}
            </button>
          ))}
          <button onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-left bg-green-50 hover:bg-green-100 text-green-700">
            {showPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            {showPreview ? "Hide Preview" : "Preview"}
          </button>
        </div>

        {/* Main Form */}
        <div className="flex-1 space-y-6">
          {activeSection.id === "basic" && (
            <Card>
              <CardHeader><CardTitle icon={Package}>Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Product Name *</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" required />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe product" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category *</Label>
                    <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Clothes, Furniture" required />
                  </div>
                  <div>
                    <Label>Brand</Label>
                    <Input value={brand} onChange={e => setBrand(e.target.value)} placeholder="Brand name" />
                  </div>
                </div>
                <div>
                  <Label>Tags</Label>
                  <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="Comma separated" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pricing Section */}
          {activeSection.id === "pricing" && (
            <Card>
              <CardHeader><CardTitle icon={DollarSign}>Pricing & Stock</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <div><Label>Price *</Label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" required /></div>
                <div><Label>Discounted Price</Label><Input type="number" value={discountedPrice} onChange={e => setDiscountedPrice(e.target.value)} placeholder="0.00" /></div>
                <div><Label>Stock</Label><Input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="0" /></div>
              </CardContent>
            </Card>
          )}

          {/* Features Section */}
          {activeSection.id === "features" && (
            <Card>
              <CardHeader><CardTitle icon={Star}>Features & Specifications</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  {features.map((f, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <Input value={f} onChange={e => handleFeatureChange(idx, e.target.value)} placeholder="Feature" />
                      <Button type="button" variant="ghost" onClick={() => removeFeature(idx)}><X className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addFeature}><Plus className="h-4 w-4 mr-2" />Add Feature</Button>
                </div>
                <div>
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <Input value={spec.name} onChange={e => handleSpecChange(idx, "name", e.target.value)} placeholder="Spec Name" />
                      <Input value={spec.value} onChange={e => handleSpecChange(idx, "value", e.target.value)} placeholder="Value" />
                      <Button type="button" variant="ghost" onClick={() => removeSpec(idx)}><X className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addSpec}><Plus className="h-4 w-4 mr-2" />Add Spec</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Variants Section */}
          {activeSection.id === "variants" && (
            <Card>
              <CardHeader><CardTitle icon={Settings}>Variants</CardTitle></CardHeader>
              <CardContent>
                {variants.map((v, idx) => (
                  <div key={idx} className="p-4 border rounded-lg mb-4 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div><Label>Size</Label><Input value={v.size} onChange={e => handleVariantChange(idx, "size", e.target.value)} /></div>
                      <div><Label>Color</Label><Input value={v.color} onChange={e => handleVariantChange(idx, "color", e.target.value)} /></div>
                      <div><Label>Price</Label><Input type="number" value={v.price} onChange={e => handleVariantChange(idx, "price", e.target.value)} /></div>
                      <div><Label>Stock</Label><Input type="number" value={v.stock} onChange={e => handleVariantChange(idx, "stock", e.target.value)} /></div>
                    </div>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeVariant(idx)} className="mt-2"><X className="h-4 w-4 mr-2" />Remove</Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addVariant}><Plus className="h-4 w-4 mr-2" />Add Variant</Button>
              </CardContent>
            </Card>
          )}

          {/* Shipping Section */}
          {activeSection.id === "shipping" && (
            <Card>
              <CardHeader><CardTitle icon={Truck}>Shipping & Returns</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <Checkbox checked={freeShipping} onChange={e => setFreeShipping(e.target.checked)} />
                  <Label>Free Shipping</Label>
                </div>
                <div>
                  <Label>Estimated Days</Label>
                  <Input value={estimatedDays} onChange={e => setEstimatedDays(e.target.value)} placeholder="3-5 business days" />
                </div>
                <div>
                  <Label>Return Policy</Label>
                  <Textarea value={returnPolicy} onChange={e => setReturnPolicy(e.target.value)} placeholder="Describe return policy" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Images Section */}
          {activeSection.id === "images" && (
            <Card>
              <CardHeader><CardTitle icon={Image}>Images</CardTitle></CardHeader>
              <CardContent>
                <div className="text-center border-2 border-dashed rounded-lg p-8 mb-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <Label className="cursor-pointer">
                    <span className="text-blue-600 font-medium hover:text-blue-500">Click to upload</span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <Input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                  </Label>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB each, max 10 images</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative border rounded overflow-hidden">
                      <img src={img} alt="" className="w-full h-24 object-cover" />
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1"><X className="h-3 w-3" /></Button>
                    </div>
                  ))}
                  {images.map((img, idx) => (
                    <div key={idx} className="relative border rounded overflow-hidden">
                      <img src={URL.createObjectURL(img)} alt="" className="w-full h-24 object-cover" />
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeSelectedImage(idx)} className="absolute top-1 right-1"><X className="h-3 w-3" /></Button>
                    </div>
                  ))}
                </div>

                <p className="mt-2 text-sm text-gray-500">{totalImages}/10 images added</p>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={prevSection} disabled={activeSectionIdx === 0}>Previous</Button>
            {activeSectionIdx < sections.length - 1 ? (
              <Button type="button" onClick={nextSection}>Next</Button>
            ) : (
              <Button type="submit" onClick={handleSubmit} disabled={isLoading}>{product ? "Update Product" : "Add Product"}</Button>
            )}
          </div>

          {/* Preview */}
          {showPreview && (
            <Card className="mt-6 bg-gray-100">
              <CardHeader><CardTitle icon={Eye}>Preview</CardTitle></CardHeader>
              <CardContent>
                <h2 className="font-semibold text-xl">{name || "Product Name"}</h2>
                <p className="text-gray-700">{description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.split(",").map((t, i) => t && <Badge key={i}>{t}</Badge>)}
                </div>
                <p className="mt-2 font-medium">Price: Rs{discountedPrice || price}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {existingImages.concat(images.map(img => URL.createObjectURL(img))).map((img, i) => (
                    <img key={i} src={img} alt="" className="w-full h-24 object-cover rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
