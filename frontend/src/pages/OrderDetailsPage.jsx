import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
import { useSelector } from "react-redux";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);


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
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">
        Order Details
      </h2>

      {!orderDetails ? (
        <p className="text-gray-500 mb-4 text-lg">No order details found.</p>
      ) : (
        <div className="p-6 sm:p-8 rounded-2xl border shadow-md bg-white">
          {/* Order Info */}
          <div className="flex flex-col md:flex-row justify-between mb-10">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                Order ID :{" "}
                <span className="text-indigo-600">#{orderDetails._id}</span>
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                Placed on:{" "}
                {new Date(orderDetails.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-6 sm:mt-0 gap-2">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  orderDetails.paymentMethod === "cod"
                    ? "bg-yellow-100 text-yellow-700"
                    : orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {orderDetails.paymentMethod === "cod"
                  ? "Payment Pending"
                  : orderDetails.isPaid
                  ? "Payment Approved"
                  : "Payment Pending"}
              </span>

              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Delivery Pending"}
              </span>
            </div>
          </div>

          {/* Customer, payment, shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                Payment Info
              </h4>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Method:</span>{" "}
                {orderDetails.paymentMethod.toUpperCase()}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Status:</span>{" "}
                {orderDetails.paymentMethod === "cod"
                  ? "Pending"
                  : orderDetails.isPaid
                    ? "Paid"
                    : "Pending"}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                Shipping Info
              </h4>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Method:</span>{" "}
                {orderDetails.shippingMethod}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Address:</span>{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}, ${orderDetails.shippingAddress.postalCode}`}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto mb-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Products
            </h4>
            <table className="min-w-full text-gray-700 bg-white shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="py-3 px-5 text-left">Name</th>
                  <th className="py-3 px-5 text-left">Unit Price</th>
                  <th className="py-3 px-5 text-left">Quantity</th>
                  <th className="py-3 px-5 text-left">Total</th>
                </tr>
              </thead>

              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr
                    key={item.productId}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-5 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg shadow"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-indigo-600 font-medium hover:underline text-sm"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-4 px-5 text-sm">Rs.{item.price}</td>
                    <td className="py-4 px-5 text-sm">{item.quantity}</td>
                    <td className="py-4 px-5 text-sm font-semibold">
                      Rs.{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back to orders link */}
          <div className="text-center">
            <Link
              className="inline-block mt-6 text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition"
              to="/my-orders"
            >
              ← Back to my orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
