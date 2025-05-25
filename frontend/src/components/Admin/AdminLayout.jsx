import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Mobile toggle button */}
      <div className="flex md:hidden items-center z-30 p-4 backdrop-blur-lg bg-gray-900/30 shadow-md">
        <button onClick={toggleSidebar} className="focus:outline-none cursor-pointer">
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">Admin Dashboard</h1>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`w-64 min-h-screen absolute md:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static z-30 bg-white/10 backdrop-blur-md border-r border-white/20 shadow-lg rounded-r-xl`}
      >
        <AdminSidebar onLinkClick={toggleSidebar} />
      </div>

      {/* Main content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
