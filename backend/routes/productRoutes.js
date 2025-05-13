import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createProduct, updateProduct, deleteProduct, getProducts, getSingleProduct,getSimilarProducts,bestSellerProducts,newArrivals } from "../controller/product.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// @route POST /api/products
// @desc Create a product
// @access Private/admin

router.post("/", verifyToken, isAdmin, createProduct)

// @route PATCH /api/products/:id
// @desc Update a product by its ID
// @access Private/admin

router.patch("/:id", verifyToken, isAdmin, updateProduct)

// @route DELETE /api/products/:id
// @desc DELETE a product by its ID
// @access Private/admin

router.delete("/:id", verifyToken, isAdmin, deleteProduct)

// @route GET /api/products
// @desc Get all products with optional filters
// @access Public

router.get("/", getProducts)


// @route GET /api/products/best-seller
// @desc Get best selling products with highest rating
// @access Public

router.get("/best-seller", bestSellerProducts)

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products 
// @access Public

router.get("/new-arrivals", newArrivals)

// @route GET /api/products/:id
// @desc Get a single product by its ID
// @access Public

router.get("/:id", getSingleProduct)

// @route GET /api/products/similar/:id
// @desc Retrive similar products by product's gender and category 
// @access Public

router.get("/similar/:id", getSimilarProducts)




export default router