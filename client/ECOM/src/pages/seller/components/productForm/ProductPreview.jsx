import React from "react";
import { Star } from "lucide-react";

export default function ProductPreview({ formData }) {
  const { name, description, brand, price, discountedPrice, features, images } = formData;

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-6 sticky top-6 h-fit">
      <h3 className="font-semibold mb-4 text-lg">Preview</h3>
      
      <div className="space-y-3">
        <h4 className="font-medium text-lg">{name || "Product Name"}</h4>
        {brand && <p className="text-sm text-gray-600">{brand}</p>}

        {(price || discountedPrice) && (
          <div className="flex items-center gap-2">
            {discountedPrice && <span className="font-bold text-green-600">${discountedPrice}</span>}
            <span className={discountedPrice ? "line-through text-gray-500" : "font-bold"}>${price}</span>
          </div>
        )}

        {description && <p className="text-sm text-gray-700 line-clamp-3">{description}</p>}

        {features.filter(Boolean).length > 0 && (
          <div>
            <h5 className="font-medium text-sm mb-2">Features:</h5>
            <ul className="text-xs space-y-1">
              {features.filter(Boolean).slice(0, 3).map((f, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" /> {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {images.slice(0, 4).map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
