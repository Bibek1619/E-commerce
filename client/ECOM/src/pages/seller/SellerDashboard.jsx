import React, { useState, useEffect } from "react";
import { useUser } from "../../components/providers/userProvider";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";

import ProductForm from "./components/ProductForm";
import AnalyticsCharts from "./components/AnalyticsChart";
import ProductList from "./components/ProductList";
import SellerHeader from "./components/SellerHeader";

export default function SellerDashboard() {
   const { user: seller, loading, clearUser } = useUser();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    monthlyRevenue: [],
    topProducts: [],
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        API_PATHS.PRODUCT.GET_MY_PRODUCTS
      );
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && seller?.role === "seller") {
      fetchProducts();
    }
  }, [loading, seller]);

 if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

if (!seller) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      No seller data found.
    </div>
  );
}


  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser(); // ✅ clear context state
    navigate("/");
  };


  // Handle Add Product
  const handleAddProduct = async (productData) => {
    try {
      setIsLoading(true);

      // Prepare FormData
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description || "");
      formData.append("price", productData.price);
      formData.append("discountedPrice", productData.discountedPrice || 0);
      formData.append("stock", productData.stock || 0);

      // Append each category separately
    if (productData.variants && productData.variants.length > 0) {
  formData.append("variants", JSON.stringify(productData.variants));
}


      // Append images if available
      if (productData.images?.length) {
        productData.images.forEach((file) => formData.append("images", file));
      }

      const { data } = await axiosInstance.post(
        API_PATHS.PRODUCT.CREATE,
        formData
      );
      setProducts((prev) => [data, ...prev]);
      setShowProductForm(false);
      setIsLoading(false);
    } catch (err) {
      console.error("Error adding product:", err);
      setIsLoading(false);
    }
  };

  // Handle Edit Product
  const handleEditProduct = async (productData) => {
    if (!editingProduct) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description || "");
      formData.append(
        "price",
        productData.price ? Number(productData.price) : 0
      );
      formData.append(
        "discountedPrice",
        productData.discountedPrice ? Number(productData.discountedPrice) : 0
      );
      formData.append(
        "stock",
        productData.stock ? Number(productData.stock) : 0
      );

      if (productData.variants && productData.variants.length > 0) {
  formData.append("variants", JSON.stringify(productData.variants));
}


      if (productData.images?.length) {
        productData.images.forEach((file) => formData.append("images", file));
      }

      const { data } = await axiosInstance.put(
        API_PATHS.PRODUCT.UPDATE(editingProduct._id),
        formData
      );

      setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
      setEditingProduct(null);
      setIsLoading(false);
    } catch (err) {
      console.error("Error updating product:", err);
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProduct) return;
    try {
      await axiosInstance.delete(API_PATHS.PRODUCT.DELETE(deleteProduct._id));
      setProducts((prev) => prev.filter((p) => p._id !== deleteProduct._id));
      setDeleteProduct(null);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Header Component */}
      <SellerHeader seller={seller} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.length}
                </p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductList
              products={products}
              onEdit={(p) => setEditingProduct(p)}
              onDelete={(p) => setDeleteProduct(p)}
              onAdd={() => setShowProductForm(true)}
            />
          </TabsContent>

          <TabsContent value="add-product">
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setShowProductForm(false)}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts salesData={salesData} />
          </TabsContent>

          <TabsContent value="profile">{/* Profile content */}</TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setShowProductForm(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editingProduct}
        onOpenChange={() => setEditingProduct(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onSubmit={handleEditProduct}
              onCancel={() => setEditingProduct(null)}
              isLoading={isLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteProduct}
        onOpenChange={() => setDeleteProduct(null)}
      >
       <AlertDialogContent className="bg-white rounded-lg shadow-lg text-gray-800">

          <AlertDialogHeader>
            <AlertDialogTitle className='font-extrabold text-2xl '>Delete Product</AlertDialogTitle>
            <AlertDialogDescription className={
              "mt-1 text-gray-700 text-[15px] font-medium"
            }>
              Are you sure you want to delete "{deleteProduct?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
