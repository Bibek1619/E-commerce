// src/pages/seller/components/ProductList.jsx
import React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

export default function ProductList({ products, onEdit, onDelete, onAdd }) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Your Products</CardTitle>
          <CardDescription>Manage your product listings</CardDescription>
        </div>
        <Button className="bg-orange-400 hover:bg-orange-500 cursor-pointer" onClick={onAdd}>
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
                <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(product)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
