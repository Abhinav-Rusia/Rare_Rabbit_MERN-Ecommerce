import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createCart,updateCart,deleteCart,displayCart,mergeCart } from "../controller/cart.controller.js";

const router = express.Router();

// @route POST /api/cart
// @desc Add a product to cart for a user or guest
// @access Public

router.post("/", createCart)

// @route PUT /api/cart
// @desc Update quantity of a product in cart for a user or guest
// @access Public

router.put("/", updateCart)

// @route DELETE /api/cart
// @desc Delete a product from cart for a user or guest
// @access Public

router.delete("/", deleteCart)


// @route GET /api/cart
// @desc Get cart for a user or guest
// @access Public

router.get("/", displayCart)

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access private

router.post("/merge", verifyToken, mergeCart)





export default router