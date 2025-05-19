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

        if(order){
            order.status = req.body.status || order.status; ;
            order.isDelivered = req.body.status === "Delivered" ? true : false;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        }

        else {
            res.status(404).json({ message: "Order not found" });
        }
        
    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({ message: "Server error" });   
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