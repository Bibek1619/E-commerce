import React, { useState } from "react";
import { useCart } from "../../components/providers/cart-provider";
import { toast } from "react-hot-toast"; // ✅ import toast

const CartPopup = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async () => {
    try {
      await addItem(product, quantity);
      toast.success(`${product.name} added to cart!`); // ✅ show success toast
      onClose();
    } catch (err) {
      toast.error("Failed to add product to cart."); // optional error toast
    }
  };

  return (
    <div
      className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        bg-white rounded-xl shadow-xl p-6 w-[320px] max-w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        aria-label="Close cart popup"
      >
        &times;
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-cover rounded-lg"
      />

      <h2 className="text-xl font-semibold mt-4 text-center">{product.name}</h2>
      <p className="text-lg font-bold text-gray-700 mt-2">${product.price}</p>

      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="qty" className="text-sm font-medium">
          Quantity:
        </label>
        <input
          id="qty"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="border border-gray-300 rounded px-3 py-1 w-20 text-center"
        />
      </div>

      <button
        onClick={handleAdd}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartPopup;
