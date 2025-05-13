import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { registerUser, verifyEmail, login, getUserProfile,logout } from "../controller/user.controller.js";

const router = express.Router();

// @route POST /api/users/register
// @desc Register a user
// @access Public
router.post("/register", registerUser)

// @route POST /api/users/verify
// @desc Authenticate user


router.post("/verify-email", verifyEmail)

// @route POST /api/users/login
// @desc Login a user

router.post("/login", login);

// @route GET /api/users/profile
// @desc Get user profile(Protected Route)

router.get("/profile", verifyToken, getUserProfile)

// @route POST /api/users/logout
// @desc Logout a user
router.post("/logout", logout);






export default router