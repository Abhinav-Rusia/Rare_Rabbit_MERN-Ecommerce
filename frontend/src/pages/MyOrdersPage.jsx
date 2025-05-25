import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Classic spinner */}
        <svg
          className="animate-spin h-10 w-10 text-gray-900 hidden md:block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4.93 4.93a10 10 0 0114.14 14.14l1.41 1.41a12 12 0 00-16.97-16.97l1.41 1.41z"
          ></path>
        </svg>
        <div className="flex flex-col items-center md:hidden">
          <div className="flex space-x-2 mb-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full bg-indigo-600 animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-600 animate-pulse">
            loading your vibe...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        My Orders
      </h2>
      <div className="relative shadow-lg rounded-lg overflow-x-auto bg-white">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 uppercase text-xs text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b cursor-pointer last:border-none hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()} <br />
                    <span className="text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">{order.orderItems.length}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    ₹{order.totalPrice}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentMethod === "cod"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentMethod === "cod"
                        ? "Pending (COD)"
                        : order.isPaid
                        ? "Paid"
                        : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 px-4 text-center text-gray-500">
                  You have no orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
