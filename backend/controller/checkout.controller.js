import Checkout from "../models/checkout.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createCheckoutSession = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ success: false, message: "No products in cart" });
    }

    if (!shippingAddress || !paymentMethod) {
        return res.status(400).json({ success: false, message: "Missing shipping address or payment method" });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
            createdAt: new Date()
        });

        res.status(200).json({
            success: true,
            message: "Checkout session created successfully",
            checkoutId: newCheckout._id,
            newCheckout
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });
    }
};



export const updateCheckoutSession = async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {

        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ success: false, message: "Checkout session not found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = new Date();
            await checkout.save();

            return res.status(200).json({ success: true, message: "Checkout session updated successfully", checkout });
        }
        else {
            res.status(400).json({ success: false, message: "Invalid payment status" });
        }

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });

    }

}

export const createStripePaymentIntent = async (req, res) => {
    try {
        const { checkoutId } = req.params;

        const checkout = await Checkout.findById(checkoutId);

        if (!checkout) {
            return res.status(404).json({ success: false, message: "Checkout session not found" });
        }

        // Create payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(checkout.totalPrice * 100), // Convert to cents
            currency: 'inr', // Indian Rupees
            metadata: {
                checkoutId: checkout._id.toString(),
                userId: checkout.user.toString()
            }
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });
    }
}

export const finalizeSession = async (req, res) => {
    try {

        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ success: false, message: "Checkout session not found" });
        }

        if (!checkout.isFinalized) {
            // Create final order based on checkout details
            // For COD, we create the order even if not paid yet
            const isPaidOrder = checkout.isPaid || checkout.paymentMethod === "cod";
            const paymentStatusOrder = checkout.isPaid ? "paid" : (checkout.paymentMethod === "cod" ? "pending" : "pending");

            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: isPaidOrder,
                paidAt: checkout.paidAt || (checkout.paymentMethod === "cod" ? new Date() : undefined),
                isDelivered: false,
                paymentStatus: paymentStatusOrder,
                paymentDetails: checkout.paymentDetails,
            })

            // mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // delete cart items
            await Cart.deleteMany({ user: checkout.user });

            return res.status(200).json({ success: true, message: "Order created successfully", order: finalOrder });
        }
        else {
            return res.status(400).json({ success: false, message: "Order already finalized" });
        }

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });

    }
}
