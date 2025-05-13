import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="p-6 flex flex-col h-full bg-gray-900 text-white">
      {/* Logo */}
      <div className="mb-8 text-center">
        <Link
          id="logo"
          to="/admin"
          className="text-3xl font-extrabold text-[#D42935] tracking-wide"
        >
          Rare Rabbit
        </Link>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-300 mb-8 text-center">
        Admin Panel
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 flex-grow">
        {[
          { to: "/admin", icon: <FaClipboardList />, label: "Dashboard" },
          { to: "/admin/users", icon: <FaUser />, label: "Users" },
          { to: "/admin/products", icon: <FaBoxOpen />, label: "Products" },
          { to: "/admin/orders", icon: <FaClipboardList />, label: "Orders" },
          { to: "/", icon: <FaStore />, label: "Shop" },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition font-medium ${
                isActive
                  ? "bg-gradient-to-r from-[#D42935] to-red-600 text-white shadow-md"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition py-3 rounded-lg font-semibold text-white shadow-md"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
