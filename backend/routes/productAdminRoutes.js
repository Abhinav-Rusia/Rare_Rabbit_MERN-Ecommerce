import express from "express";
import {isAdmin} from "../middleware/isAdmin.js"
import {verifyToken} from "../middleware/verifyToken.js"
import { getAllProducts } from "../controller/productAdmin.controller.js";

const router = express.Router();


// @route GET /api/admin/products
// @desc Get all products
// @access Private

router.get("/", verifyToken, isAdmin, getAllProducts);

export default router;