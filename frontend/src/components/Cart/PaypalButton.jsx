import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log("Payment approved:", details);
            onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
