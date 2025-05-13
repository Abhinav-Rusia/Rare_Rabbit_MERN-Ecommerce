import { useState } from "react";

const UserManagement = () => {
  const users = [
    { id: 1, name: "John Doe", email: "jdoe@me.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jsmith@me.com", role: "user" },
    { id: 3, name: "Bob Johnson", email: "bjohnson@me.com", role: "user" },
    { id: 4, name: "Alice Brown", email: "abrown@me.com", role: "admin" },
    { id: 5, name: "Mike Davis", email: "mdavis@me.com", role: "user" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    console.log({ id: userId, role: newRole });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log({ "Deleting user with ID:": userId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        User Management
      </h2>

      {/* Add New User Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Add New User
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-600 font-medium mb-2"
            >
              Name
            </label>
            <input
              onChange={handleChange}
              name="name"
              value={formData.name}
              type="text"
              id="name"
              className="w-full border border-gray-300 p-3 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-2"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
              id="email"
              className="w-full border border-gray-300 p-3 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              value={formData.password}
              type="password"
              id="password"
              className="w-full border border-gray-300 p-3 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-gray-600 font-medium mb-2"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow-md transition"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">User List</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b">#</th>
                <th className="py-3 px-4 border-b text-left">Name</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Role</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4 border-b">{index + 1}</td>
                  <td className="py-4 px-4 border-b">{user.name}</td>
                  <td className="py-4 px-4 border-b">{user.email}</td>
                  <td className="py-4 px-4 border-b">
                    <select
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 border-b">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
