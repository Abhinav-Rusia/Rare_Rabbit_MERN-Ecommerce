import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js"


export const registerUser = async (req, res) => {

    const { email, password, name } = req.body

    try {

        if (!email || !password || !name) {
            throw new Error("All fields are required")
        }

        const userAlreadyExists = await User.findOne({ email })

        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }


        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password,
            name,
            verificationToken,
            verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
        })

        await user.save()

        // JWT

        const token = generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token: token,
            user: {
                ...user.toObject(),
                password: undefined
            }
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}

export const verifyEmail = async (req, res) => {

    const { code } = req.body

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            })
        }

        user.isVerified = true
        user.__v = 1
        user.verificationToken = undefined
        user.verificationExpiresAt = undefined

        await user.save()

        await sendWelcomeEmail(user.email, user.name)

        // Generate token for the user
        const token = generateTokenAndSetCookie(res, user._id)

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            token: token,
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export const login = async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email || !password) {
            throw new Error("All fields are required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User is not verified. Please verify your email first"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date()

        await user.save()

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token,
            user: {
                ...user.toObject(),
                password: undefined
            }
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}

export const getUserProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user: req.user.toObject({ getters: true, virtuals: false })
    });
};


