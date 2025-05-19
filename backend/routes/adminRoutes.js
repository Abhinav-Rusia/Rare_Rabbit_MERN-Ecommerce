import express from 'express';
import { verifyToken } from "../middleware/verifyToken.js"
import { isAdmin } from '../middleware/isAdmin.js';
import { getAllUsers, createUser, updateUser,deleteUser } from '../controller/admin.controller.js';

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users
// @access Private/Admin

router.get("/", verifyToken, isAdmin,getAllUsers)

// @route POST /api/admin/users
// @desc Create a new user
// @access Private/Admin

 router.post("/", verifyToken, isAdmin, createUser)

//  @route PUT /api/admin/users/:id
// @desc Update a user
// @access Private/Admin

 router.patch("/:id", verifyToken, isAdmin, updateUser)

//  @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private/Admin

router.delete("/:id", verifyToken, isAdmin, deleteUser)


export default router;