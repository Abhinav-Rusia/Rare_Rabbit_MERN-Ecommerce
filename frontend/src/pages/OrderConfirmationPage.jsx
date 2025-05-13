import { FaCheckCircle } from "react-icons/fa";

const checkout = {
  _id: "4166",
  createdAt: new Date(),
  paymentMethod: "COD", // or UPI, Cash on Delivery, etc.
  checkoutItems: [
    {
      productId: 1,
      name: "Product 1",
      price: 1000,
      quantity: 2,
      image: "https://picsum.photos/500?random=1",
      color: "Red",
      size: "L",
    },
    {
      productId: 2,
      name: "Product 2",
      price: 1258,
      quantity: 3,
      image: "https://picsum.photos/500?random=2",
      color: "Blue",
      size: "XL",
    },
  ],
  shippingAddress: {
    name: "John Doe",
    address: "123 Main St",
    city: "Anytown",
    country: "USA",
    postalCode: "12345",
    phone: "123-456-7890",
  },
};

const OrderConfirmationPage = () => {
  const calculateEstimatedDeliveryDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 7);
    return date;
  };

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
          <p className="text-gray-700 mb-1"><strong>Order ID:</strong> {checkout._id}</p>
          <p className="text-gray-700 mb-1">
            <strong>Placed On:</strong>{" "}
            {new Date(checkout.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Estimated Delivery:</strong>{" "}
            {calculateEstimatedDeliveryDate(checkout.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-700"><strong>Payment Method:</strong> {checkout.paymentMethod}</p>
        </div>

        {/* Shipping Info */}
        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📦 Shipping Address</h2>
          <p className="text-gray-700 mb-1"><strong>Name:</strong> {checkout.shippingAddress.name}</p>
          <p className="text-gray-700 mb-1"><strong>Address:</strong> {checkout.shippingAddress.address}</p>
          <p className="text-gray-700 mb-1"><strong>City:</strong> {checkout.shippingAddress.city}</p>
          <p className="text-gray-700 mb-1"><strong>Country:</strong> {checkout.shippingAddress.country}</p>
          <p className="text-gray-700 mb-1"><strong>Postal Code:</strong> {checkout.shippingAddress.postalCode}</p>
          <p className="text-gray-700"><strong>Phone:</strong> {checkout.shippingAddress.phone}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Items in Your Order</h2>
        <div className="space-y-6">
          {checkout.checkoutItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ₹{item.price} | Size: {item.size} | Color: {item.color}
                </p>
              </div>
              <div className="text-gray-800 font-bold whitespace-nowrap">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mt-8 text-right">
        <h2 className="text-xl font-bold text-gray-800">Total: ₹
          {checkout.checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        </h2>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
