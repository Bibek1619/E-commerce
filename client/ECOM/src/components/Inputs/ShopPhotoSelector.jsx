// components/Inputs/ShopPhotoSelector.jsx
import React from "react";

export default function ShopPhotoSelector({ image, setImage }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Shop"
          className="w-28 h-28 object-cover rounded-md border mb-2"
        />
      ) : (
        <div className="w-28 h-28 flex items-center justify-center border-2 border-dashed rounded-md mb-2 text-gray-400">
          No shop image
        </div>
      )}

      <label className="cursor-pointer bg-amber-500 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-600">
        Upload Shop Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
