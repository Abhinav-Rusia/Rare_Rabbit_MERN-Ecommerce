import express from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { getAllOrders,updateOrderStatus,deleteOrder } from '../controller/adminOrder.controller.js';

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders
// @access Private

router.get('/', verifyToken, isAdmin, getAllOrders );

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private

router.put('/:id', verifyToken, isAdmin, updateOrderStatus );

// @route DELETE /api/admin/orders/:id
// @desc Delete order
// @access Private

router.delete('/:id', verifyToken, isAdmin, deleteOrder );


export default router;