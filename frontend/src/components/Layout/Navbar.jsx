import { Link } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "../Common/SearchBar";
import CartDrawer from "./CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* --- LOGO -- Left */}

        <div className="">
          <Link
            id="logo"
            to={"/"}
            className="text-2xl text-[#DF2935] font-medium"
          >
            Rare Rabbit
          </Link>
        </div>

        {/* --- Center -- Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            ALL
          </Link>

          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            MEN
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Kids
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Accessories
          </Link>
        </div>

        {/* --- Right -- Icons */}

        <div className="flex items-center space-x-4">
          <Link
            className="block bg-black px-2 rounded-md text-white font-medium hover:bg-gray-800 transition duration-300 ease-in-out"
            to={"/admin"}
          >
            {" "}
            Admin{" "}
          </Link>
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative cursor-pointer hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -bottom-1 -right-2.5 bg-red-500 text-xs text-white px-2 py-0.5 rounded-full">
              4
            </span>
          </button>
          {/* <SearchBar /> */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 cursor-pointer w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform  duration-300 ease-in-out flex flex-col z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-8 cursor-pointer w-8 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl text-[#EA2E0E] font-semibold mb-4">MENU</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text-black"
            >
              All
            </Link>

            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text-black"
            >
              MEN
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text-black"
            >
              WOMEN
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text-black"
            >
              KIDS
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text-black"
            >
              ACCESSORIES
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Navbar;
