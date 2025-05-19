import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"
import dotenv from "dotenv";

dotenv.config()
const router = express.Router();

// Cloudiary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/", upload.single("image"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        //* Upload image to Cloudinary

        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(fileBuffer).pipe(stream);
            })
        }

        // call the streamUpload function

        const result = await streamUpload(req.file.buffer);
        res.json({ imageUrl: result.secure_url });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
})

export default router