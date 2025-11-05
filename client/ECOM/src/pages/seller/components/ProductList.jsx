// src/pages/seller/components/ProductList.jsx
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

export default function ProductList({ products, onEdit, onDelete, onAdd }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // show 10 products per page

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Slice products for current page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
          {currentProducts.map((product) => (
            <div key={product._id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img
                src={
                  Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0]
                    : "/placeholder.svg"
                }
                alt={product.name || "Product"}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 break-words max-w-[250px] overflow-y-auto max-h-20 whitespace-pre-line">
                  {product.description}
                </p>
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
