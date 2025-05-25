import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Helper to get cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) return await Cart.findOne({ user: userId });
    if (guestId) return await Cart.findOne({ guestId });
    return null;
};

export const createCart = async (req, res) => {
    const { productId, quantity = 1, size, color, guestId, userId } = req.body;

    try {
        // 1. Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // 2. Find existing cart (by user or guest)
        let cart = await getCart(userId, guestId);

        // 3. If cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                // If same item exists, increase quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Else, push new item
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    quantity,
                    size,
                    color,
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                cart,
            });
        }

        // 4. If no cart, create a new one
        cart = new Cart({
            user: userId || undefined,
            guestId: guestId ? guestId : "guest_" + new Date().getTime(),
            products: [
                {
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    quantity,
                    size,
                    color,
                },
            ],
            totalPrice: product.price * quantity,
        });

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart created successfully",
            cart,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

export const updateCart = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {

        let cart = await getCart(userId, guestId);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            // update
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            }
            else {
                cart.products.splice(productIndex, 1); // remove item
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                cart,
            });

        }

        return res.status(404).json({
            success: false,
            message: "Product not found in cart",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });

    }
}

export const deleteCart = async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;

    try {

        let cart = await getCart(userId, guestId);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1); // remove item

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                cart,
            });

        }

        return res.status(404).json({
            success: false,
            message: "Product not found in cart",
        })

    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}

export const displayCart = async (req, res) => {
    const { guestId, userId } = req.query;

    try {
        let cart = await getCart(userId, guestId);

        // If no cart exists, return an empty cart instead of 404
        if (!cart) {
            // Create an empty cart structure to return
            const emptyCart = {
                user: userId || undefined,
                guestId: guestId || undefined,
                products: [],
                totalPrice: 0
            };

            return res.status(200).json({
                success: true,
                message: "Empty cart returned",
                cart: emptyCart,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            cart,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}

export const mergeCart = async (req, res) => {
    const { guestId } = req.body;

    try {
        // 1. Get guest cart
        const guestCart = await Cart.findOne({ guestId });
        // 2. Get user cart
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {

            if (guestCart.products.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Guest cart is empty",
                });
            }

            if (userCart) {
                // Merge guest cart to user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) => item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color);

                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    }
                    else {
                        userCart.products.push(guestItem);
                    }
                })

                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );

                await userCart.save();

                // Remove guest cart after merging

                try {

                    await Cart.findOneAndDelete({ guestId });

                } catch (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Server error: " + error.message,
                    })
                }

                return res.status(200).json({
                    success: true,
                    message: "Guest cart merged successfully",
                    userCart,
                });

            }
            // ____-------_____
            else {
                // Create a new cart for the user with guest's products
                const newCart = new Cart({
                    user: req.user._id,
                    products: guestCart.products,
                    totalPrice: guestCart.products.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    )
                });

                await newCart.save();
                await Cart.findOneAndDelete({ guestId });

                return res.status(200).json({
                    success: true,
                    message: "Guest cart merged into new user cart successfully",
                    userCart: newCart,
                });
            }

        }

        else {
            if (userCart) {
                return res.status(200).json({
                    success: true,
                    message: "User cart fetched successfully",
                    userCart,
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "Cart not found",
                });
            }
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        })
    }
}
