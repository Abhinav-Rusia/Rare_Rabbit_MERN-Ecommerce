import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// Fetch products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/products`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching products"
      );
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/products`,
        productData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while creating product"
      );
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/products/${id}`,
        productData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while updating product"
      );
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/products/${productId}`,
        {
          withCredentials: true,
        }
      );
      // Return the productId for local state removal
      return { _id: productId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while deleting product"
      );
    }
  }
);

// Fetch product details
export const fetchAdminProductDetails = createAsyncThunk(
  "adminProducts/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/products/${productId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while fetching product details"
      );
    }
  }
);

// Upload product images
export const uploadProductImages = createAsyncThunk(
  "adminProducts/uploadImages",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while uploading images"
      );
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    productDetails: null,
    uploadedImages: [],
    loading: false,
    uploadLoading: false,
    error: null,
  },
  reducers: {
    clearUploadedImages: (state) => {
      state.uploadedImages = [];
    },
    removeUploadedImage: (state, action) => {
      const index = action.payload;
      state.uploadedImages.splice(index, 1);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })

      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        const newProduct = action.payload.product || action.payload.data || action.payload;
        if (newProduct) {
          state.products.push(newProduct);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || "Failed to create product";
      })

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        const updatedProduct = action.payload.product || action.payload.data || action.payload;
        if (updatedProduct && updatedProduct._id) {
          const index = state.products.findIndex(
            (product) => product._id === updatedProduct._id
          );
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
          // Also update productDetails if it's the same product
          if (state.productDetails && state.productDetails._id === updatedProduct._id) {
            state.productDetails = updatedProduct;
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || "Failed to update product";
      })

      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload._id;
        if (deletedId) {
          state.products = state.products.filter(product => product._id !== deletedId);
          // Clear productDetails if it's the deleted product
          if (state.productDetails && state.productDetails._id === deletedId) {
            state.productDetails = null;
          }
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || "Failed to delete product";
      })

      // Product details
      .addCase(fetchAdminProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        const productDetails = action.payload.product || action.payload.data || action.payload;
        state.productDetails = productDetails;
      })
      .addCase(fetchAdminProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || "Failed to fetch product details";
      })

      // Upload images
      .addCase(uploadProductImages.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadProductImages.fulfilled, (state, action) => {
        state.uploadLoading = false;
        // Backend returns { imageUrl: "url" } for single image upload
        const imageUrl = action.payload.imageUrl || action.payload.url || action.payload;
        if (imageUrl) {
          // Add the new image to the uploaded images array
          state.uploadedImages.push({ url: imageUrl, altText: "" });
        }
      })
      .addCase(uploadProductImages.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || "Failed to upload images";
      });
  },
});

export const { clearUploadedImages, removeUploadedImage, clearError } = adminProductSlice.actions;
export default adminProductSlice.reducer;
