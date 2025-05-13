import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "d6f6g8i9",
          createdAt: new Date("2024-06-17T10:00:00Z"),
          shippingAddress: {
            city: "Indore",
            country: "India",
          },
          orderItems: [
            {
              name: "Product1",
              image: "https://picsum.photos/500/500?random=200",
            },
          ],
          totalPrice: 2489,
          isPaid: true,
        },
        {
          _id: "a1b2c3d4",
          createdAt: new Date("2023-10-01T10:00:00Z"),
          shippingAddress: {
            city: "Mumbai",
            country: "India",
          },
          orderItems: [
            {
              name: "Wireless Headphones",
              image: "https://picsum.photos/500/500?random=201",
            },
          ],
          totalPrice: 3499,
          isPaid: false,
        },
        {
          _id: "e5f6g7h8",
          createdAt: new Date("2023-11-15T15:30:00Z"),
          shippingAddress: {
            city: "Delhi",
            country: "India",
          },
          orderItems: [
            {
              name: "Smartwatch Pro",
              image: "https://picsum.photos/500/500?random=202",
            },
          ],
          totalPrice: 7999,
          isPaid: true,
        },
        {
          _id: "i9j0k1l2",
          createdAt: new Date("2024-01-05T09:45:00Z"),
          shippingAddress: {
            city: "Bangalore",
            country: "India",
          },
          orderItems: [
            {
              name: "Bluetooth Speaker",
              image: "https://picsum.photos/500/500?random=203",
            },
          ],
          totalPrice: 2299,
          isPaid: false,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

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
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
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
