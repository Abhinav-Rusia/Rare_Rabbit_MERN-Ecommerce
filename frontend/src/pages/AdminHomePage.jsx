import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: "da7rt5da5",
      user: { name: "Jane Doe" },
      totalPrice: 1599,
      status: "Processing",
    },
    {
      _id: "bg9qp3fa2",
      user: { name: "John Smith" },
      totalPrice: 2499,
      status: "Shipped",
    },
    {
      _id: "xt8ml2kd7",
      user: { name: "Alice Johnson" },
      totalPrice: 3499,
      status: "Delivered",
    },
    {
      _id: "ze3vn8bp4",
      user: { name: "Michael Brown" },
      totalPrice: 1299,
      status: "Cancelled",
    },
    {
      _id: "kp7wf5tc9",
      user: { name: "Emily Davis" },
      totalPrice: 1899,
      status: "Processing",
    },
    {
      _id: "rn5cy7xv0",
      user: { name: "Chris Wilson" },
      totalPrice: 2799,
      status: "Delivered",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue */}
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-medium text-gray-600">Revenue</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹58,668</p>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">289</p>
          </div>
          <Link
            to="/admin/orders"
            className="mt-4 text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            Manage Orders →
          </Link>
        </div>

        {/* Total Products */}
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-600">
              Total Products
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">106</p>
          </div>
          <Link
            to="/admin/products"
            className="mt-4 text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            Manage Products →
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-100 text-gray-700 uppercase tracking-wider">
                <th className="text-left p-4">Order ID</th>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Total Price</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="p-4 font-mono text-gray-600">
                      #{order._id}
                    </td>
                    <td className="p-4 text-gray-600">{order.user.name}</td>
                    <td className="p-4 font-semibold text-gray-700">
                      ₹{order.totalPrice}
                    </td>
                    <td
                      className={`p-4 font-medium ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Cancelled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-gray-500">
                    No Recent Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
