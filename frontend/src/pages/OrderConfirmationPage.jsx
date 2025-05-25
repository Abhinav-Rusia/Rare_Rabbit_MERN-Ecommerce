import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../redux/slices/cartSlice";
import PriceDisplay from "../components/Common/PriceDisplay";

const OrderConfirmationPage = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  // Get order data from location state
  const orderData = location.state?.checkoutData || location.state?.order;
  const checkoutData = location.state?.checkoutData;

  // Clear the cart after order confirmation
  useEffect(() => {
    if(orderData){
      dispatch(clearCart())
      localStorage.removeItem("cart")
    }
    else{
      navigate("/my-orders")
    }
  }, [navigate, dispatch, orderData]);


  const calculateEstimatedDeliveryDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 7);
    return date;
  };

  // Show loading or redirect if no order data
  if (!orderData) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-center">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <div className="text-center mb-10">
        <FaCheckCircle className="text-emerald-600 mx-auto text-5xl mb-4" />
        <h1 className="text-3xl font-bold text-emerald-700">
          Thank You! Your Order Has Been Placed 🎉
        </h1>
        <p className="text-gray-600 mt-2">
          A confirmation email has been sent. Estimated delivery within 7 days.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Info */}
        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🧾 Order Details</h2>
          <p className="text-gray-700 mb-1"><strong>Order ID:</strong> {orderData._id}</p>
          <p className="text-gray-700 mb-1">
            <strong>Placed On:</strong>{" "}
            {new Date(orderData.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Estimated Delivery:</strong>{" "}
            {calculateEstimatedDeliveryDate(orderData.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-700"><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
        </div>

        {/* Shipping Info */}
        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📦 Shipping Address</h2>
          <p className="text-gray-700 mb-1"><strong>Name:</strong> {orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}</p>
          <p className="text-gray-700 mb-1"><strong>Address:</strong> {orderData.shippingAddress.address}</p>
          <p className="text-gray-700 mb-1"><strong>City:</strong> {orderData.shippingAddress.city}</p>
          <p className="text-gray-700 mb-1"><strong>State:</strong> {orderData.shippingAddress.state}</p>
          <p className="text-gray-700 mb-1"><strong>Country:</strong> {orderData.shippingAddress.country}</p>
          <p className="text-gray-700 mb-1"><strong>Postal Code:</strong> {orderData.shippingAddress.postalCode}</p>
          <p className="text-gray-700"><strong>Phone:</strong> {orderData.shippingAddress.phone}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Items in Your Order</h2>
        <div className="space-y-6">
          {orderData.checkoutItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                </p>
              </div>
              <div className="text-right whitespace-nowrap">
                <PriceDisplay
                  price={(item.originalPrice || item.price) * item.quantity}
                  discountPrice={item.discountPrice ? item.discountPrice * item.quantity : null}
                  size="small"
                  showBadge={false}
                  showSavings={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mt-8 text-right">
        <h2 className="text-xl font-bold text-gray-800">Total: ₹{orderData.totalPrice}</h2>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
