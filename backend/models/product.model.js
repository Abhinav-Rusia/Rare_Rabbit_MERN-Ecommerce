import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    sku: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    collections: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "unisex", "kids"],
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            altText: {
                type: String,
            }
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        required: false,
    },
    numReviews: {
        type: Number,
        default: 0,
        required: false,
    },
    tags: {
        type: [String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    metaKeywords: {
        type: String,
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
