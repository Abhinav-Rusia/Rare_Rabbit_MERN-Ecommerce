import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  updateUserRole,
  fetchAllUsers,
} from "../../redux/slices/adminSlice";
import { toast } from "sonner";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaPlus,
  FaTrash,
  FaUsers,
  FaSearch
} from "react-icons/fa";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllUsers());
    }
}, [user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(formData)).unwrap();
      toast.success("User added successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "customer",
      });
      setShowForm(false);
      // Refresh user list to ensure UI is updated
      dispatch(fetchAllUsers());
    } catch (error) {
      toast.error(error.message || "Failed to add user");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Find the user to get their current name and email
      const userToUpdate = users.find(user => (user._id || user.id) === userId);
      if (!userToUpdate) {
        toast.error("User not found");
        return;
      }

      await dispatch(updateUserRole({
        id: userId,
        role: newRole,
        name: userToUpdate.name,
        email: userToUpdate.email
      })).unwrap();
      toast.success("User role updated successfully!");
      // Refresh user list to ensure UI is updated
      dispatch(fetchAllUsers());
    } catch (error) {
      toast.error(error.message || "Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        toast.success("User deleted successfully!");
        // Refresh user list to ensure UI is updated
        dispatch(fetchAllUsers());
      } catch (error) {
        toast.error(error.message || "Failed to delete user");
      }
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            User Management
          </h1>
          <p className="text-white mt-2 font-medium">Manage users, roles, and permissions</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2">
            <FaUsers className="text-gray-500 mr-2" />
            <span className="text-sm font-semibold text-gray-800">
              {users.length} Total Users
            </span>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <FaPlus className="text-sm" />
            Add User
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Add New User Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaUser className="text-blue-700" />
              Add New User
            </h3>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                  <FaUser className="inline mr-2 text-gray-600" />
                  Full Name
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                  <FaEnvelope className="inline mr-2 text-gray-600" />
                  Email Address
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                  <FaLock className="inline mr-2 text-gray-600" />
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-semibold text-gray-800">
                  <FaUserShield className="inline mr-2 text-gray-600" />
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="md:col-span-2 flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <FaPlus className="inline mr-2" />
                  Add User
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User List Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaUsers className="text-gray-700" />
              User List ({filteredUsers.length})
            </h3>

            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64 text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <FaUsers className="mx-auto text-gray-400 text-4xl mb-4" />
              <p className="text-gray-700 text-lg font-medium">No users found</p>
              <p className="text-gray-600 text-sm">Try adjusting your search criteria</p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {user.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user._id?.slice(-6) || user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 min-w-[120px]"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id || user.id, e.target.value)}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteUser(user._id || user.id)}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm"
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
