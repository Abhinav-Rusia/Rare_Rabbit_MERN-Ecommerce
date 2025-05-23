import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected: ", connect.connection.host);
        return connect;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

