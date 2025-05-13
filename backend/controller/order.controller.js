import Order from "../models/order.model.js";


export const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }); // sort by createdAt (most recent first)

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}