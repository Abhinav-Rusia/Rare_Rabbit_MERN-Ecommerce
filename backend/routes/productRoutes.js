import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  getSimilarProducts,
  bestSellerProducts,
  newArrivals,
} from "../controller/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// ✅ Admin-only routes
router.post("/", verifyToken, isAdmin, createProduct);
router.patch("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

// ✅ Public routes (ordered properly!)
router.get("/best-sellers", bestSellerProducts);
router.get("/new-arrivals", newArrivals);
router.get("/similar/:id", getSimilarProducts);
router.get("/", getProducts);         // List all products (generic)
router.get("/:id", getSingleProduct); // Must be last — catches dynamic :id

export default router;
