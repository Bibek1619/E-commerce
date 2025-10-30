import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductTabs({
  product,
  showFullDesc,
  setShowFullDesc,
}) {
  return (
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

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <p
                  className={`text-gray-800 font-medium text-lg whitespace-pre-line break-words transition-all duration-300 ${
                    showFullDesc ? "" : "line-clamp-4"
                  }`}
                >
                  {product.description ||
                    "This is a high quality product with excellent durability and design."}
                </p>

                {product.description?.length > 150 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="text-orange-500 hover:underline text-sm font-semibold"
                  >
                    {showFullDesc ? "See Less" : "See More"}
                  </button>
                )}
              </div>

              <ul className="list-disc ml-6 text-gray-700 space-y-2 text-base font-medium">
                {(
                  product.features || [
                    "Durable",
                    "Lightweight",
                    "Modern design",
                  ]
                ).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="mt-6">
          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(
                product.specifications || { Material: "Cotton", Color: "Black" }
              ).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <p>
                {product.shipping?.estimatedDays ||
                  "Delivered within 3–5 business days"}
              </p>
              <p>
                {product.shipping?.returnPolicy ||
                  "7-day easy return policy available"}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
