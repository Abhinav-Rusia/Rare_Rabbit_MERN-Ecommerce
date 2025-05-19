import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
        trim: true,
        lowercase: true,
    },
    subscribedAt : {
        type: Date,
        default: Date.now,
    },

})

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
export default Subscriber;