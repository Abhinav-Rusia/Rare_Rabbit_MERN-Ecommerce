import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosConfig";

// Helper function to load cart from local storage

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to local storage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/cart', {
        params: {
          userId,
          guestId,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add an item to the cart for a user or guest

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, userId, guestId },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/api/cart', {
        productId,
        quantity,
        size,
        color,
        userId,
        guestId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update the quantity of an item in the cart for a user or guest

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, size, color, userId, guestId },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put('/api/cart', {
        productId,
        quantity,
        userId,
        guestId,
        size,
        color,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove an item from the cart for a user or guest

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId, guestId, size, color }, { rejectWithValue }) => {
    try {
      const response = await api.delete('/api/cart', {
        data: {
          productId,
          userId,
          guestId,
          size,
          color,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Merge guest cart with user cart

export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/cart/merge', {
        userId,
        guestId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
    // Optimistic updates for better UX
    updateCartItemOptimistic: (state, action) => {
      const { productId, quantity, size, color } = action.payload;
      if (state.cart && state.cart.products) {
        const itemIndex = state.cart.products.findIndex(
          item => item.productId === productId && item.size === size && item.color === color
        );
        if (itemIndex !== -1) {
          state.cart.products[itemIndex].quantity = quantity;
          saveCartToStorage(state.cart);
        }
      }
    },
    removeCartItemOptimistic: (state, action) => {
      const { productId, size, color } = action.payload;
      if (state.cart && state.cart.products) {
        state.cart.products = state.cart.products.filter(
          item => !(item.productId === productId && item.size === size && item.color === color)
        );
        saveCartToStorage(state.cart);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart; // Make sure we're accessing the cart property
        saveCartToStorage(action.payload.cart);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed To Fetch Cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart; // Make sure we're accessing the cart property
        saveCartToStorage(action.payload.cart);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed To Add To Cart";
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        // Don't set global loading for individual item updates
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.cart = action.payload.cart; // Make sure we're accessing the cart property
        saveCartToStorage(action.payload.cart);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Failed To Update Item Quantity";
      })
      .addCase(removeFromCart.pending, (state) => {
        // Don't set global loading for individual item removal
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart; // Make sure we're accessing the cart property
        saveCartToStorage(action.payload.cart);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed To Remove Items";
      })
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed To Merge Cart";
      });
  },
});


export const { clearCart, updateCartItemOptimistic, removeCartItemOptimistic } = cartSlice.actions;
export default cartSlice.reducer
