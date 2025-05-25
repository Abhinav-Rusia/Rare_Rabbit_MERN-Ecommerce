import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching products by collection and optional filters

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color)
      query.append(
        "color",
        color
          .split(",")
          .map((color) => color.trim())
          .join(",")
      );
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    // Only add limit parameter if it's defined and not null or undefined
    // Only add limit parameter if it's explicitly provided and is a positive number
    if (limit !== undefined && limit !== null && limit !== '' && Number(limit) > 0) {
      query.append("limit", limit);
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

// Async thunk for fetching a single product by ID

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductsDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

// Async thunk to update product details
export const updateProductDetails = createAsyncThunk(
  "products/updateProductDetails",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // ✅ Send cookies
      }
    );
    return response.data;
  }
);

// Async thunk to fetch Similar Products

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      limit: "",
      collection: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        limit: "",
        collection: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;

        // Check if the response has the expected structure and extract products
        if (action.payload && action.payload.products) {
          // Handle the case where products might be an array of documents from MongoDB aggregation
          const products = action.payload.products.map(product => {
            // If the product has _id as an object with id property (from aggregation), convert it
            if (product._id && typeof product._id === 'object' && product._id.id) {
              return { ...product, _id: product._id.id };
            }
            return product;
          });

          state.products = products;
        } else {
          // Fallback for unexpected response format
          const fallbackProducts = Array.isArray(action.payload) ? action.payload : [];
          state.products = fallbackProducts;
        }
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Check if the response has the expected structure and extract product
        state.selectedProduct = action.payload && action.payload.product
          ? action.payload.product
          : null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.selectedProduct = updatedProduct;
      })
      .addCase(updateProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Check if the response has the expected structure and extract similarProducts
        state.similarProducts = action.payload && action.payload.similarProducts
          ? action.payload.similarProducts
          : [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
