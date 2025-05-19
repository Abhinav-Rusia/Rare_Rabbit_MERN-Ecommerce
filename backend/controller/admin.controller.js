import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
       const users = await User.find({});
         if (!users) {
              return res.status(404).json({ message: "No users found" });
         }
            res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: role || "customer" });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Create User Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    // ✅ Validate that request body exists and is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is missing or empty." });
    }

    const { name, email, password, role } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Update name
        if (name) user.name = name;

        // ✅ Update email if it's different and not already in use
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use by another user" });
            }
            user.email = email;
        }

        // ✅ Update password (with hashing)
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // ✅ Update role
        if (role) user.role = role;

        const updatedUser = await user.save();

        // ✅ Exclude password from response
        const { password: _, ...userWithoutPassword } = updatedUser.toObject();

        return res.status(200).json({
            message: "User updated successfully",
            user: userWithoutPassword,
        });

    } catch (error) {
        console.error("Update User Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedUser = await user.deleteOne();

        return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error("Delete User Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

