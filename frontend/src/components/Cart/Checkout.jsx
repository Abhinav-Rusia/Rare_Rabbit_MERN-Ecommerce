import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaypalButton from "./PaypalButton";
import StripePayment from "./StripePayment";
import PriceDisplay from "../Common/PriceDisplay";
import api from "../../utils/axiosConfig";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { toast } from "sonner";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { checkout, loading: checkoutLoading, error: checkoutError } = useSelector((state) => state.checkout);
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
  const [formErrors, setFormErrors] = useState({});

  // Ensure cart is not loaded before proceeding and user is authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=" + encodeURIComponent("/checkout"));
      return;
    }
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate, user]);



  const validateForm = () => {
    const errors = {};

    if (!shippingAddress.firstName.trim()) errors.firstName = "First name is required";
    if (!shippingAddress.lastName.trim()) errors.lastName = "Last name is required";
    if (!shippingAddress.address.trim()) errors.address = "Address is required";
    if (!shippingAddress.city.trim()) errors.city = "City is required";
    if (!shippingAddress.state.trim()) errors.state = "State is required";
    if (!shippingAddress.postalCode.trim()) errors.postalCode = "Postal code is required";
    if (!shippingAddress.country.trim()) errors.country = "Country is required";
    if (!shippingAddress.phone.trim()) errors.phone = "Phone number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("Please log in to continue with checkout");
      return;
    }

    if (!cart || !cart.products || cart.products.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout");
      return;
    }

    try {
      const checkoutData = {
        checkoutItems: cart.products,
        shippingAddress,
        paymentMethod: "cod", // Set default payment method for checkout creation
        totalPrice: cart.totalPrice,
      };

      const resultAction = await dispatch(createCheckout(checkoutData));

      if (createCheckout.fulfilled.match(resultAction)) {
        if (resultAction.payload && resultAction.payload.checkoutId) {
          setCheckoutId(resultAction.payload.checkoutId);

          toast.success("Checkout created successfully! Please select a payment method");
        } else {
          toast.error("Checkout created but no ID returned. Please try again");
        }
      } else if (createCheckout.rejected.match(resultAction)) {
        toast.error(resultAction.payload?.message || "Failed to create checkout. Please try again");
      } else {
        toast.error("Unexpected error occurred. Please try again");
      }
    } catch (error) {
      toast.error("Failed to create checkout. Please try again");
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const res = await api.put(`/api/checkout/${checkoutId}/pay`, {
        paymentStatus: "paid",
        paymentDetails: details,
      });
      if (res.data && res.data.success) {
        await handleFinalizeCheckout(checkoutId, "paypal");
      }
    } catch (error) {
      toast.error("Payment processing failed. Please try again");
    }
  };

  const handleFinalizeCheckout = async (checkoutId, paymentMethod = "cod") => {
    try {
      const res = await api.post(`/api/checkout/${checkoutId}/finalize`, {});
      if (res.data && res.data.success) {
        // Pass order data to order confirmation page
        navigate("/order-confirmation", {
          state: {
            order: res.data.order,
            checkoutData: {
              _id: checkoutId,
              checkoutItems: cart.products,
              shippingAddress,
              paymentMethod: paymentMethod,
              totalPrice: cart.totalPrice,
              createdAt: new Date().toISOString()
            }
          }
        });
      }
    } catch (error) {
      toast.error("Failed to finalize order. Please contact support");
    }
  };

  const handleStripePaymentSuccess = async (paymentIntent) => {
    try {
      // Update checkout with payment details
      const res = await api.put(`/api/checkout/${checkoutId}/pay`, {
        paymentStatus: "paid",
        paymentDetails: paymentIntent,
      });

      if (res.data && res.data.success) {
        await handleFinalizeCheckout(checkoutId, "stripe");
        // Navigation to order confirmation is handled by handleFinalizeCheckout
      }
    } catch (error) {
      toast.error("Payment processing failed. Please try again");
    }
  };

  const handleCodConfirm = async () => {
    if (!checkoutId) return;
    try {
      await handleFinalizeCheckout(checkoutId);
      toast.success("Order placed successfully with Cash on Delivery!");
    } catch (error) {
      toast.error("Failed to place order. Please try again");
    }
  };

  if(loading || checkoutLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-900"
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
      </div>
    );
  }

  if(error || checkoutError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error || checkoutError}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Please log in to continue with checkout</p>
      </div>
    );
  }

  if(!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Cart is empty</p>
      </div>
    );
  }



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
              value={user ? user.email : ""}
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
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  });
                  if (formErrors.firstName) {
                    setFormErrors({ ...formErrors, firstName: "" });
                  }
                }}
                type="text"
                className={`w-full p-2 border rounded-md ${
                  formErrors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                required
                value={shippingAddress.lastName}
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  });
                  if (formErrors.lastName) {
                    setFormErrors({ ...formErrors, lastName: "" });
                  }
                }}
                type="text"
                className={`w-full p-2 border rounded-md ${
                  formErrors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              required
              value={shippingAddress.address}
              onChange={(e) => {
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                });
                if (formErrors.address) {
                  setFormErrors({ ...formErrors, address: "" });
                }
              }}
              type="text"
              className={`w-full p-2 border rounded-md ${
                formErrors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.address && (
              <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
            )}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                required
                value={shippingAddress.city}
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  });
                  if (formErrors.city) {
                    setFormErrors({ ...formErrors, city: "" });
                  }
                }}
                type="text"
                className={`w-full p-2 border rounded-md ${
                  formErrors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.city && (
                <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                required
                value={shippingAddress.state}
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    state: e.target.value,
                  });
                  if (formErrors.state) {
                    setFormErrors({ ...formErrors, state: "" });
                  }
                }}
                type="text"
                className={`w-full p-2 border rounded-md ${
                  formErrors.state ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.state && (
                <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>
              )}
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
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  });
                  if (formErrors.postalCode) {
                    setFormErrors({ ...formErrors, postalCode: "" });
                  }
                }}
                type="text"
                className={`w-full p-2 border rounded-md ${
                  formErrors.postalCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.postalCode && (
                <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                required
                value={shippingAddress.country}
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  });
                  if (formErrors.country) {
                    setFormErrors({ ...formErrors, country: "" });
                  }
                }}
                type="text"
                className={`w-full p-2 border rounded-md ${
                  formErrors.country ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.country && (
                <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              required
              value={shippingAddress.phone}
              onChange={(e) => {
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                });
                if (formErrors.phone) {
                  setFormErrors({ ...formErrors, phone: "" });
                }
              }}
              type="tel"
              className={`w-full p-2 border rounded-md ${
                formErrors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
            )}
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full bg-gradient-to-br from-zinc-900 to-black text-white py-3 rounded-md border border-gray-700 hover:brightness-125 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? "Creating Checkout..." : "Continue to Payment"}
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
                      toast.error("Payment failed. Please try again");
                    }}
                  />
                )}

                {selectedPaymentMethod === "stripe" && checkoutId && (
                  <StripePayment
                    checkoutId={checkoutId}
                    amount={cart.totalPrice + (cart.shippingCharges || 40)}
                    onSuccess={handleStripePaymentSuccess}
                    onError={(err) => {
                      console.error("Stripe Payment Failed:", err);
                      toast.error("Payment failed. Please try again");
                    }}
                  />
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
