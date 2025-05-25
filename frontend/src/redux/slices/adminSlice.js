import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while fetching users"
      );
    }
  }
);

// Add user
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while adding user"
      );
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { name, email, role },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while updating user"
      );
    }
  }
);

// Update user role only
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, role, name, email }, { rejectWithValue }) => {
    try {
      // Use the existing admin user update endpoint with all user data
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { name, email, role },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while updating user role"
      );
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while deleting user"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        const users = action.payload.users || action.payload.data || action.payload;
        state.users = Array.isArray(users) ? users : [];
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        const newUser = action.payload.user || action.payload.data || action.payload;
        if (newUser && (newUser._id || newUser.id)) {
          state.users.push(newUser);
        }
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add user";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        const updatedUser = action.payload.user || action.payload.data || action.payload;
        if (updatedUser && (updatedUser._id || updatedUser.id)) {
          const userIndex = state.users.findIndex(
            (user) => (user._id || user.id) === (updatedUser._id || updatedUser.id)
          );
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user";
      })
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        const updatedUser = action.payload.user || action.payload.data || action.payload;
        if (updatedUser && (updatedUser._id || updatedUser.id)) {
          const userIndex = state.users.findIndex(
            (user) => (user._id || user.id) === (updatedUser._id || updatedUser.id)
          );
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user role";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats for delete
        const response = action.payload;
        let deletedUserId;

        if (response.user && (response.user._id || response.user.id)) {
          // Response contains user object: { user: { _id: "123", ... } }
          deletedUserId = response.user._id || response.user.id;
        } else if (response.data && (response.data._id || response.data.id)) {
          // Response contains data object: { data: { _id: "123", ... } }
          deletedUserId = response.data._id || response.data.id;
        } else if (response._id || response.id) {
          // Response is the user object: { _id: "123", ... }
          deletedUserId = response._id || response.id;
        } else if (response.deletedId || response.userId) {
          // Response contains just the ID: { deletedId: "123" } or { userId: "123" }
          deletedUserId = response.deletedId || response.userId;
        } else if (typeof response === 'string') {
          // Response is just the ID string: "123"
          deletedUserId = response;
        }

        if (deletedUserId) {
          state.users = state.users.filter(
            (user) => (user._id || user.id) !== deletedUserId
          );
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user";
      });
  },
});

export default adminSlice.reducer;
