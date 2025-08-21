import React, { useState, useEffect } from "react";
import { useUser } from "../../components/providers/userProvider";
import axios from "axios";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
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
import {
  BarChart3,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  TrendingUp,
  Edit,
  Eye,
  LogOut,
  Trash2,
} from "lucide-react";
import ProductForm from "./components/ProductForm";
import AnalyticsCharts from "./components/AnalyticsChart";
import { useNavigate } from "react-router-dom";
import { BASE_URL, API_PATHS } from "../../utils/apiPaths";

export default function SellerDashboard() {
  const { user: seller, loading } = useUser();
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

  // Fetch seller's products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BASE_URL}${API_PATHS.PRODUCT.GET_MY_PRODUCTS}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!seller || seller.role !== "seller") return <div className="flex items-center justify-center min-h-screen">Access Denied</div>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddProduct = async (productData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      for (const key in productData) {
        if (key === "images") {
          productData.images.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, productData[key]);
        }
      }
      const { data } = await axios.post(`${BASE_URL}${API_PATHS.PRODUCT.CREATE}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts((prev) => [data, ...prev]);
      setShowProductForm(false);
      setIsLoading(false);
    } catch (err) {
      console.error("Error adding product:", err);
      setIsLoading(false);
    }
  };

  const handleEditProduct = async (productData) => {
    if (!editingProduct) return;
    try {
      setIsLoading(true);
      const formData = new FormData();
      for (const key in productData) {
        if (key === "images") {
          productData.images.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, productData[key]);
        }
      }
      const { data } = await axios.put(`${BASE_URL}${API_PATHS.PRODUCT.UPDATE(editingProduct._id)}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
      await axios.delete(`${BASE_URL}${API_PATHS.PRODUCT.DELETE(deleteProduct._id)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== deleteProduct._id));
      setDeleteProduct(null);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const openEditForm = (product) => setEditingProduct(product);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">NepalBazar</span>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <span className="text-gray-600">Seller Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={seller.shopPhoto || "/placeholder.svg"} />
                <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{seller.name}</p>
                <p className="text-gray-500">{seller.shopName}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </CardContent>
          </Card>
          {/* Add more stats if needed */}
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
            <Card>
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>Manage your product listings</CardDescription>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setShowProductForm(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product._id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-medium text-gray-900">Rs. {product.price}</span>
                          {product.discountedPrice && (
                            <span className="text-sm text-gray-500 line-through">Rs. {product.discountedPrice}</span>
                          )}
                          <span className="text-sm text-gray-500">• Stock: {product.stock}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditForm(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteProduct(product)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-product">
            <ProductForm onSubmit={handleAddProduct} onCancel={() => setShowProductForm(false)} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts salesData={salesData} />
          </TabsContent>

          <TabsContent value="profile">
            {/* Profile content */}
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={handleAddProduct} onCancel={() => setShowProductForm(false)} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
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

      <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteProduct?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
