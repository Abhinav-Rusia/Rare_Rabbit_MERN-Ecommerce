import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getMyOrders,getOrderById } from "../controller/order.controller.js";

const router = express.Router();

// @ROUTE GET /api/orders/my-orders
// @desc Get logged in user's order
// @access Private

router.get("/my-orders", verifyToken, getMyOrders)

// @route GET /api/orders/:id
// @desc Get a specific order by ID
// @access Private

router.get("/:id", verifyToken, getOrderById)


export default router 
