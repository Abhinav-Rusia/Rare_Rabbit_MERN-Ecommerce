const OrderManagement = () => {
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
  ];

  const handleStatusChange = (orderId, status) => {
    console.log("Order ID:", orderId);
    console.log("New Status:", status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        Order Management
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-white whitespace-nowrap">
                    {order.user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-white whitespace-nowrap">
                    ₹{order.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="w-full md:w-40 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option
                        value="Processing"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                      >
                        Processing
                      </option>
                      <option
                        value="Shipped"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                      >
                        Shipped
                      </option>
                      <option
                        value="Delivered"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                      >
                        Delivered
                      </option>
                      <option
                        value="Cancelled"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                      >
                        Cancelled
                      </option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
