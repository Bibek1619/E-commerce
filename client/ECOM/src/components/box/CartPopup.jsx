// components/CartPopup.jsx
import React, { useState } from "react";
import { useCart } from "../../components/providers/cart-provider"; // Adjust path based on your setup

const CartPopup = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async () => {
    await addItem(product, quantity);
    onClose(); // Close popup after adding
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          ✕
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded"
        />
        <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
        <p className="text-lg font-bold text-gray-700 mt-2">${product.price}</p>

        <div className="mt-4 flex items-center gap-2">
          <label htmlFor="qty" className="text-sm">Quantity:</label>
          <input
            id="qty"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border px-2 py-1 w-20 rounded"
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
