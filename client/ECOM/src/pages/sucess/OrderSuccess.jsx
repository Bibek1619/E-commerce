import { useParams, Link } from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Order Placed Successfully!</h1>
      <p className="mt-2">Your order ID is <span className="font-mono">{id}</span>.</p>
      <Link to="/my-orders" className="mt-4 text-orange-500 underline">
        View My Orders
      </Link>
    </div>
  );
}

export default OrderSuccess;
