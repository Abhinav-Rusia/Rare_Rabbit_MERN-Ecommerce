import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        Admin Dashboard
      </h1>

      {productsLoading || ordersLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : productsError ? (
        <p className="text-red-600 bg-red-50 p-4 rounded-lg">Error loading products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-600 bg-red-50 p-4 rounded-lg">Error loading orders: {ordersError}</p>
      ) : (
        <>
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue */}
            <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition duration-300">
              <h2 className="text-lg font-medium text-gray-600">Revenue</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalSales || 0}</p>
            </div>

            {/* Total Orders */}
            <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders || 0}</p>
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
                <p className="text-3xl font-bold text-gray-900 mt-2">{products?.length || 0}</p>
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
                  {orders && orders.length > 0 ? (
                    orders.slice(0, 5).map((order) => (
                      <tr
                        key={order._id}
                        className="border-b hover:bg-gray-50 transition cursor-pointer"
                      >
                        <td className="p-4 font-mono text-gray-600">
                          #{order._id.slice(-8)}
                        </td>
                        <td className="p-4 text-gray-600">{order.user?.name || 'N/A'}</td>
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
        </>
      )}
    </div>
  );
};

export default AdminHomePage;
