import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";
import { toast } from "sonner";

const OrderManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth);
  const {orders, loading, error} = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if(!user || user.role !== "admin") {
      navigate("/")
    }
    else{
      dispatch(fetchAllOrders());
    }
  },[user, navigate, dispatch])

  const handleStatusChange = async (orderId, status) => {
    try {
      await dispatch(updateOrderStatus({id: orderId, status: status})).unwrap();
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.error("Order status update error:", error);
      const errorMessage = typeof error === 'string'
        ? error
        : error?.message || error?.error || "Failed to update order status";
      toast.error(errorMessage);
    }
  };

  if(loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center border border-gray-100">
          {/* Animated Logo/Icon */}
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>

              {/* Inner pulsing circle */}
              <div className="absolute inset-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Loading Orders
            </h3>
            <p className="text-gray-500 text-sm">
              Please wait while we fetch the latest order data...
            </p>

            {/* Animated dots */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if(error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-lg w-full text-center border border-red-100">
          {/* Error Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto relative">
              {/* Outer warning ring */}
              <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-pulse"></div>

              {/* Inner error circle */}
              <div className="absolute inset-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Error Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                We couldn't load the orders data. This might be a temporary issue.
              </p>
            </div>

            {/* Error Details */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm font-medium mb-2">Error Details:</p>
              <p className="text-red-600 text-sm font-mono bg-red-100 px-3 py-2 rounded-lg">
                {typeof error === 'string' ? error : error?.message || JSON.stringify(error) || "Failed to fetch orders"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>

              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-gray-300"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
            </div>

            {/* Help Text */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                If the problem persists, please contact support or try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                      value={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
