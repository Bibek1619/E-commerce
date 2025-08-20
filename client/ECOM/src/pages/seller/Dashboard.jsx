import React, { useState } from "react";
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
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Eye,
  LogOut,
  Trash2,
} from "lucide-react";
import ProductForm from "./components/ProductForm";
import AnalyticsCharts from "./components/AnalyticsChart";
import {  useNavigate } from "react-router-dom";
import UserProvider from "@/components/providers/userProvider";


// Dummy seller data


// Mock products
const mockProducts = [
  {
    id: "1",
    sellerId: "seller1",
    name: "Traditional Nepali Dhaka Topi",
    description: "Authentic handmade Dhaka topi from Palpa",
    price: 1500,
    discountPrice: 1200,
    photos: ["/placeholder.svg"],
    tags: ["traditional", "handmade", "nepali", "topi"],
    category: "Clothing",
    stock: 25,
    approvalStatus: "approved",
  },
  {
    id: "2",
    sellerId: "seller1",
    name: "Himalayan Honey",
    description: "Pure organic honey from the Himalayas",
    price: 800,
    photos: ["/placeholder.svg"],
    tags: ["organic", "honey", "himalayan", "natural"],
    category: "Food",
    stock: 50,
    approvalStatus: "pending",
  },
  {
    id: "3",
    sellerId: "seller1",
    name: "Khukuri Knife",
    description: "Traditional Nepali khukuri knife with leather sheath",
    price: 3500,
    discountPrice: 3000,
    photos: ["/placeholder.svg"],
    tags: ["traditional", "knife", "khukuri", "handmade"],
    category: "Crafts",
    stock: 10,
    approvalStatus: "rejected",
  },
];

// Mock sales data
const mockSalesData = {
  totalSales: 156,
  totalRevenue: 234500,
  monthlyRevenue: [15000, 18000, 22000, 25000, 28000, 32000],
  topProducts: [
    { productId: "1", name: "Traditional Nepali Dhaka Topi", sales: 45, revenue: 54000 },
    { productId: "2", name: "Himalayan Honey", sales: 32, revenue: 25600 },
    { productId: "3", name: "Khukuri Knife", sales: 18, revenue: 54000 },
  ],
};

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : "N/A";
};

export default function SellerDashboard() {
 
  const { user: seller, loading } = useUser();
  

  const [products, setProducts] = useState(mockProducts);
  const [salesData] = useState(mockSalesData);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate=useNavigate()
   if (loading) {
  return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
}

// Optional: prevent dashboard rendering if not a seller
if (!seller || seller.role !== "seller") {
  return <div className="flex items-center justify-center min-h-screen">Access Denied</div>;
}

  const handleLogout = () => {
    alert("Dummy logout clicked");
    Navigate("/")
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleAddProduct = (productData) => {
    setIsLoading(true);
    setTimeout(() => {
      const newProduct = {
        id: Date.now().toString(),
        sellerId: seller.id,
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProducts((prev) => [newProduct, ...prev]);
      setShowProductForm(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleEditProduct = (productData) => {
    if (!editingProduct) return;
    setIsLoading(true);
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...productData, updatedAt: new Date() } : p))
      );
      setEditingProduct(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteProduct = () => {
    if (!deleteProduct) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
    setDeleteProduct(null);
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
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Rest of the dashboard (Products, Analytics, Profile) */}
      {/* You can copy all the remaining JSX from the previous version */}
       {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
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

          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">{salesData.totalSales}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">Rs. {salesData.totalRevenue.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter((p) => p.approvalStatus === "approved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs (Products / Add / Analytics / Profile) */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {/* Products List */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>Manage your product listings and track approval status</CardDescription>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setShowProductForm(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={product.photos[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-medium text-gray-900">Rs. {product.price}</span>
                          {product.discountPrice && (
                            <span className="text-sm text-gray-500 line-through">Rs. {product.discountPrice}</span>
                          )}
                          <span className="text-sm text-gray-500">• Stock: {product.stock}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {product.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(product.approvalStatus)}
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
            <ProductForm onSubmit={handleAddProduct} onCancel={() => {}} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts salesData={salesData} />
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Shop Profile</CardTitle>
                <CardDescription>Manage your shop information and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={seller.shopPhoto || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">{seller.shopName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{seller.shopName}</h3>
                      <p className="text-gray-600">{seller.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {seller.isApproved ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" /> Verified Seller
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Clock className="w-3 h-3 mr-1" /> Pending Verification
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Owner Name</label>
                      <p className="mt-1 text-gray-900">{seller.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900">{seller.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Member Since</label>
                      <p className="mt-1 text-gray-900">{formatDate(seller.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Updated</label>
                      <p className="mt-1 text-gray-900">{formatDate(seller.updatedAt)}</p>
                    </div>
                  </div>

                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Settings className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
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
