import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      price: 1200,
      quantity: 2,
      image: "https://picsum.photos/200?random=1",
      color: "red",
      size: "L",
    },
    {
      name: "Rare Rabbit Sweater",
      price: 1800,
      quantity: 1,
      image: "https://picsum.photos/200?random=2",
      color: "Orange",
      size: "XXL",
    },
  ],
  totalPrice: 4200,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId("12345");
    console.log("Order Placed:", { shippingAddress, cart });
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful:", details);
    navigate("/order-confirmation");
  };

  const handleCodConfirm = () => {
    alert("Order placed with Cash on Delivery");
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase font-semibold mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded-md"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                required
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                required
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              required
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              type="text"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                required
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                required
                value={shippingAddress.state}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    state: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                required
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                required
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              required
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              type="tel"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-zinc-900 to-black text-white py-3 rounded-md border border-gray-700 hover:brightness-125 cursor-pointer transition-all duration-300"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Select Payment Method
                </h3>
                <div className="flex flex-col gap-3 mb-6">
                  {["paypal", "stripe", "cod"].map((method) => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={selectedPaymentMethod === method}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                      />
                      {method === "paypal"
                        ? "PayPal"
                        : method === "stripe"
                        ? "Stripe"
                        : "Cash on Delivery"}
                    </label>
                  ))}
                </div>

                {selectedPaymentMethod === "paypal" && checkoutId && (
                  <PaypalButton
                    amount={cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={(err) => {
                      console.error("Payment Failed:", err);
                      alert("Payment Failed. Please try again.");
                    }}
                  />
                )}

                {selectedPaymentMethod === "stripe" && (
                  <button
                    className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-all"
                    onClick={() => alert("Stripe Checkout Coming Soon")}
                    type="button"
                  >
                    Pay with Stripe
                  </button>
                )}

                {selectedPaymentMethod === "cod" && (
                  <button
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all"
                    onClick={handleCodConfirm}
                    type="button"
                  >
                    Confirm Cash on Delivery
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section - Cart Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg h-fit transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">
          🧾 Order Summary
        </h2>

        <div className="space-y-6">
          {cart.products.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-700">
                  {item.name}
                </h4>
                <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                    Qty: {item.quantity}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                    Size: {item.size}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs capitalize">
                    Color: {item.color}
                  </span>
                </div>
              </div>
              <div className="text-right font-semibold text-gray-800 whitespace-nowrap">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-8 space-y-4 text-gray-800 text-base font-medium">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{cart.totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Charges</span>
            <span className="text-sm text-gray-600">
              ₹{cart.shippingCharges || 40}
            </span>
          </div>
          <div className="border-t pt-5 flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span className="bg-black text-white px-4 py-2 rounded-lg shadow-sm">
              ₹{cart.totalPrice + (cart.shippingCharges || 40)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
