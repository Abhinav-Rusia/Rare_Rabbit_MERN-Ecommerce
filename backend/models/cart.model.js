import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: {
        type: Number,
        default: 1
    },
    color: { type: String, required: true }
}, { _id: false });


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    guestId: {
        type: String
    },
    products: {
        type: [cartItemSchema],
        required: true,
        default: []
    },    
    totalPrice: {
        type: Number,
        default: 0
    }
},
{ timestamps: true }
)

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;