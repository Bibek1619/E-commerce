import { useCart } from ".././components/providers/cart-provider";

const CartPage = () => {
  const { items, loading, updateQuantity, removeItem, getTotalPrice } = useCart();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="mb-4 border-b pb-2">
              <div>{item.name}</div>
              <div>Rs. {item.price}</div>
              <div>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="w-16 ml-2"
                />
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <h3 className="mt-4 font-bold">
            Total: Rs. {getTotalPrice().toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
};
export default CartPage;
