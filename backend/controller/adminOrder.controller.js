import Order from "../models/order.model.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error("Get All Orders Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Convert frontend status to lowercase to match schema enum
        const statusMapping = {
            "Processing": "processing",
            "Shipped": "shipped",
            "Delivered": "delivered",
            "Cancelled": "cancelled"
        };

        const newStatus = req.body.status;
        const mappedStatus = statusMapping[newStatus] || newStatus.toLowerCase();

        // Update order fields
        order.status = mappedStatus;
        order.isDelivered = mappedStatus === "delivered";
        order.deliveredAt = mappedStatus === "delivered" ? Date.now() : order.deliveredAt;

        const updatedOrder = await order.save();

        // Populate user data for frontend
        await updatedOrder.populate("user", "name email");

        res.status(200).json(updatedOrder);

    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if(order){
            await order.deleteOne();
            res.status(200).json({ message: "Order deleted successfully" });
        }

        else {
            res.status(404).json({ message: "Order not found" });
        }

    } catch (error) {
        console.error("Delete Order Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}