import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters, fetchProductsByFilters } from "../../redux/slices/productsSlices";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: search }));
    dispatch(fetchProductsByFilters({ search: search }));
    navigate(`/collections/all?search=${search}`);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-[20%] z-50" : "w-auto"
      } `}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border outline-none w-full border-gray-300 rounded-md px-4 py-2 pl-2 pr-12 placeholder:text-gray-700 placeholder:text-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6 cursor-pointer " />
            </button>
          </div>
          {/* Close Button */}
          <button
            onClick={handleSearchToggle}
            type="button"
            className="ml-5 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-8 w-8 cursor-pointer" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6 cursor-pointer " />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
