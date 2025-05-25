import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {createCheckoutSession,updateCheckoutSession,finalizeSession,createStripePaymentIntent} from "../controller/checkout.controller.js";


const router = express.Router();

// @Route POST /api/checkout
// @desc Create a checkout session
// @access Private

router.post("/", verifyToken, createCheckoutSession)

// @Route PUT /api/checkout/:id/pay
// @desc Update a checkout session by its ID
// @access Private

router.put("/:id/pay", verifyToken, updateCheckoutSession)

// @Route POST /api/checkout/:id/finalize
// @desc finalize checkout and convert to an order after payment confirmation
// @access Private

router.post("/:id/finalize", verifyToken, finalizeSession)





// @Route POST /api/checkout/:id/create-payment-intent
// @desc Create Stripe payment intent for a checkout session
// @access Private

router.post("/:checkoutId/create-payment-intent", verifyToken, createStripePaymentIntent)

export default router