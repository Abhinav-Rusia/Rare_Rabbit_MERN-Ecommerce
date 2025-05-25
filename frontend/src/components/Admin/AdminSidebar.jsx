import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const AdminSidebar = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="p-6 flex flex-col h-full bg-gray-900 text-white">
      {/* Logo */}
      <div className="mb-8 text-center">
        <Link
          id="logo"
          to="/admin"
          onClick={onLinkClick}
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
      <nav className="flex flex-col gap-3">
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
            onClick={onLinkClick}
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

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg transition font-medium border-2 text-gray-400 hover:bg-red-600 hover:text-white mt-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
