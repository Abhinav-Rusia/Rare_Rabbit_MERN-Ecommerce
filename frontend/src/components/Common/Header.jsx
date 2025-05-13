import Topbar from "../Layout/Topbar";
import Navbar from "../Layout/Navbar";

const Header = () => {
  return (
    <header className="border-b border-gray-300">
      {/* Top bar */}
      <Topbar/>
      {/* Nav bar */}
      <Navbar/>
      {/* Cart Drawer*/}
    </header>
  );
};
export default Header;
