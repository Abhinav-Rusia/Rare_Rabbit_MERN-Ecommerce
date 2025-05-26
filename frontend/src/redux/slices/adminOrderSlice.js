import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosConfig";

// ✅ Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/admin/orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while fetching orders"
      );
    }
  }
);

// ✅ Update order delivery status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/admin/orders/${id}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while updating order status"
      );
    }
  }
);

// ✅ Delete an order
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/admin/orders/${id}`);
      return id; // Return the deleted order ID for local state removal
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while deleting the order"
      );
    }
  }
);

// ✅ Admin Order Slice
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 Fetch All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        // 🧮 Calculate total sales
        state.totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || action.payload?.error || "Failed to fetch orders";
      })

      // ✅ Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        const updatedOrder = action.payload.order || action.payload.data || action.payload;
        if (updatedOrder && updatedOrder._id) {
          const index = state.orders.findIndex(
            (order) => order._id === updatedOrder._id
          );
          if (index !== -1) {
            state.orders[index] = updatedOrder;
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || action.payload?.error || "Failed to update order status";
      })

      // 🗑️ Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const deletedOrderId = action.payload;

        // Remove the order
        state.orders = state.orders.filter((order) => order._id !== deletedOrderId);

        // 🧮 Recalculate totals
        state.totalOrders = state.orders.length;
        state.totalSales = state.orders.reduce((acc, order) => acc + order.totalPrice, 0);

        state.loading = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || action.payload?.error || "Failed to delete order";
      });
  },
});

export default adminOrderSlice.reducer;
