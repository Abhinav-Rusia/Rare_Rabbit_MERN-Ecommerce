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

        const { collections, collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, limit } = req.query;

        let query = {};

        // filter logic - handle both collection and collections parameters
        if (collections && collections.toLowerCase() !== 'all') {
            query.collections = { $regex: new RegExp(collections, 'i') }; // Case-insensitive match
        } else if (collection && collection.toLowerCase() !== 'all') {
            query.collections = { $regex: new RegExp(collection, 'i') }; // Case-insensitive match
        }

        if (category && category.toLowerCase() !== 'all') {
            // Map the frontend categories to database categories if needed
            let categoryRegex;

            // Handle special cases for category mapping
            switch(category) {
                case 'Top Wear':
                    // Match "Top Wear", "Topwear", "Dresses", etc.
                    categoryRegex = new RegExp('top\\s*wear|dresses|shirts?|t-shirts?|blouses?|tops?', 'i');
                    break;
                case 'Bottom Wear':
                    // Match "Bottom Wear", "Bottomwear", "Pants", etc.
                    categoryRegex = new RegExp('bottom\\s*wear|pants|jeans|trousers|shorts|skirts?', 'i');
                    break;
                case 'Sportswear':
                    categoryRegex = new RegExp('sport(s)?\\s*wear|athletic|gym|workout|active', 'i');
                    break;
                case 'Winterwear':
                    categoryRegex = new RegExp('winter\\s*wear|outerwear|jackets?|coats?|sweaters?|hoodies?', 'i');
                    break;
                case 'Footwear':
                    categoryRegex = new RegExp('foot\\s*wear|shoes|boots|sandals|sneakers', 'i');
                    break;
                case 'Accessories':
                    categoryRegex = new RegExp('accessor(y|ies)|bags?|wallets?|belts?|hats?|caps?|scarves?|jewelry', 'i');
                    break;
                default:
                    // For any other category, use exact match with case insensitivity
                    categoryRegex = new RegExp(category, 'i');
            }

            query.category = categoryRegex;
        }

        if (size) {
            // Split the size string into an array and trim each value
            const sizeArray = size.split(',').map(s => s.trim());
            // Use $in operator to match any of the sizes
            query.sizes = { $in: sizeArray };
        }

        if (color) {
            // Split the color string into an array and trim each value
            const colorArray = color.split(',').map(c => c.trim());
            // Use $in operator with case-insensitive regex for each color
            query.colors = {
                $in: colorArray.map(c => new RegExp('^' + c + '$', 'i'))
            };
        }


        if (gender && gender.toLowerCase() !== 'all') {
            // Use exact match with word boundaries for gender to prevent partial matches
            query.gender = { $regex: new RegExp(`^${gender}$`, 'i') }; // Case-insensitive exact match
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

        // For the "all" collection page, we want to return all products without random sampling
        // Only use random sampling for specific cases like homepage featured products
        const isRandomFetch = Object.keys(query).length === 0 && !sortBy && limit && Number(limit) > 0;

        if (isRandomFetch) {
            // Use MongoDB's aggregation to get random products when a limit is specified
            const randomProducts = await Product.aggregate([
                { $match: {} },
                { $sample: { size: Number(limit) } }
            ]);

            return res.status(200).json({
                success: true,
                message: "Random products fetched successfully",
                products: randomProducts,
            });
        }

        // Normal sorting for filtered queries
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

        // Execute the query with appropriate limit
        let productsQuery = Product.find(query).sort(sortOptions);

        // Only apply limit if it's explicitly provided and is a positive number
        if (limit !== undefined && limit !== null && limit !== '' && Number(limit) > 0) {
            productsQuery = productsQuery.limit(Number(limit));
        }
        // No default limit for the "all" collection page

        const products = await productsQuery;

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

        // First try to find products with same category and gender
        let similarProducts = await Product.find({
            _id: { $ne: id },
            category: new RegExp(product.category, 'i'),
            gender: product.gender, // Exact match for gender
        }).limit(4);

        // If we don't have 4 products, add more from the same category regardless of gender
        if (similarProducts.length < 4) {
            const additionalProducts = await Product.find({
                _id: { $ne: id },
                category: new RegExp(product.category, 'i'),
                _id: { $nin: similarProducts.map(p => p._id) }
            }).limit(4 - similarProducts.length);

            similarProducts = [...similarProducts, ...additionalProducts];
        }

        // If we still don't have 4 products, add random products
        if (similarProducts.length < 4) {
            const randomProducts = await Product.find({
                _id: { $ne: id },
                _id: { $nin: similarProducts.map(p => p._id) }
            }).limit(4 - similarProducts.length);

            similarProducts = [...similarProducts, ...randomProducts];
        }

        // Ensure we only return exactly 4 products (or fewer if not enough in database)
        if (similarProducts.length > 4) {
            similarProducts = similarProducts.slice(0, 4);
        }

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
            .limit(4);

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

// Get all unique categories and genders
export const getProductMetadata = async (req, res) => {
    try {
        // Get unique categories
        const categories = await Product.distinct('category');

        // Get unique genders
        const genders = await Product.distinct('gender');

        // Get a sample product for each category
        const categoryExamples = {};
        for (const category of categories) {
            const sample = await Product.findOne({ category }).lean();
            if (sample) {
                categoryExamples[category] = {
                    _id: sample._id,
                    name: sample.name,
                    gender: sample.gender,
                    category: sample.category
                };
            }
        }

        // Define our custom categories (these are the ones we want to use in the UI)
        const customCategories = [
            "All",
            "Top Wear",
            "Bottom Wear",
            "Sportswear",
            "Winterwear",
            "Footwear",
            "Accessories",
        ];

        res.status(200).json({
            success: true,
            message: "Product metadata fetched successfully",
            categories,
            genders,
            categoryExamples,
            customCategories // Include our custom categories in the response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}