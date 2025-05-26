import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.token;

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remove 'Bearer ' prefix
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
