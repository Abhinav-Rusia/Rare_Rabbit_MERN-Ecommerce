import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const {
            name, description, price, discountPrice, countInStock,
            sku, category, collections, gender, sizes, colors,
            images, isFeatured, isPublished, tags, rating, numReviews
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            collections,
            gender,
            sizes,
            colors,
            images,
            isFeatured,
            isPublished,
            tags,
            rating,
            numReviews,
            user: req.user._id
        });

        const createdProduct = await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: createdProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const {
            name, description, price, discountPrice, countInStock,
            sku, category, collections, gender, sizes, colors,
            images, isFeatured, isPublished, tags, rating, numReviews
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Use ternary operators or checks for undefined fields
        product.name = name !== undefined ? name : product.name;
        product.description = description !== undefined ? description : product.description;
        product.price = price !== undefined ? price : product.price;
        product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.sku = sku !== undefined ? sku : product.sku;
        product.category = category !== undefined ? category : product.category;
        product.collections = collections !== undefined ? collections : product.collections;
        product.gender = gender !== undefined ? gender : product.gender;
        product.sizes = sizes !== undefined ? sizes : product.sizes;
        product.colors = colors !== undefined ? colors : product.colors;
        product.images = images !== undefined ? images : product.images;
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
        product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
        product.tags = tags !== undefined ? tags : product.tags;
        product.rating = rating !== undefined ? rating : product.rating;
        product.numReviews = numReviews !== undefined ? numReviews : product.numReviews;

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

export const getProducts = async (req, res) => {
    try {

        const { collections, size, color, gender, minPrice, maxPrice, sortBy, search, category, limit } = req.query;

        let query = {};

        // filter logic
        if (collections && collections.toLocaleLowerCase() !== 'all') {
            query.collections = collections;
        }

        if (category && category.toLocaleLowerCase() !== 'all') {
            query.category = category;
        }

        if (size) {
            query.sizes = { $in: size.split(',') };
        }

        if (color) {
            query.colors = { $in: color.split(',') };
        }


        if (gender) {
            query.gender = gender;
        }


        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    tags: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ]
        }

        // sort logic

        let sortOptions = {};
        if (sortBy === 'priceAsc') {
            sortOptions = { price: 1 };
        } else if (sortBy === 'priceDesc') {
            sortOptions = { price: -1 };
        } else if (sortBy === 'popularity') {
            sortOptions = { rating: -1 };
        }
        else {
            sortOptions = { createdAt: -1 };
        }

        const products = await Product.find(query).sort(sortOptions).limit(Number(limit) || 0);

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

export const getSingleProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product,
        });



    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });

    }
}

export const getSimilarProducts = async (req, res) => {

    const { id } = req.params

    try {

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const similarProducts = await Product.find({
            _id: { $ne: id },
            category: new RegExp('^' + product.category + '$', 'i'),
            gender: new RegExp('^' + product.gender + '$', 'i'),
        }).limit(4);


        res.status(200).json({
            success: true,
            message: "Similar products fetched successfully",
            similarProducts,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });

    }
}

export const bestSellerProducts = async (req, res) => {
    try {
        const bestSellers = await Product.find()
            .sort({ rating: -1 })
            .limit(5);

        if (!bestSellers || bestSellers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No best seller products found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Best seller products fetched successfully",
            bestSellers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};


export const newArrivals = async (req, res) => {

    try {

        const products = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.status(200).json({
            success: true,
            message: "New arrivals fetched successfully",
            products,
        });
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
        
    }
    
}