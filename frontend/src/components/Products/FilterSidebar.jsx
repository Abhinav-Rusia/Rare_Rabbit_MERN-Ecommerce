import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    minPrice: 0,
    maxPrice: 9999,
  });

  const [priceRange, setPriceRange] = useState([0, 9999]);

  const categories = [
    "All",
    "Topwear",
    "Bottomwear",
    "Footwear",
    "Winterwear",
    "Accessories",
  ];
  const colors = [
    "Black",
    "Gray",
    "Navy",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Pink",
    "Beige",
    "Brown",
    "Olive",
    "Maroon",
    "Teal",
    "Purple",
    "Orange",
    "Gold",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const genders = ["All", "Men", "Women", "Kids"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 9999,
    });
    setPriceRange([params.minPrice || 0, params.maxPrice || 9999]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (
        newFilters[key] !== "" &&
        newFilters[key] !== null &&
        newFilters[key] !== undefined
      ) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange(0, newPrice);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(filters);
    updateUrlParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              checked={filters.gender === gender}
              value={gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              title={color}
              type="button"
              onClick={() => {
                const isSelected = filters.color === color;
                const newFilters = {
                  ...filters,
                  color: isSelected ? "" : color,
                };
                setFilters(newFilters);
                updateUrlParams(newFilters);
              }}
              className={`w-8 h-8 rounded-full border-2 transition transform duration-200 
               hover:scale-110 ${
                 filters.color === color
                   ? "ring-2 ring-offset-2 ring-blue-500"
                   : ""
               }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Size Filter */}

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              value={size}
              onChange={handleFilterChange}
              type="checkbox"
              checked={filters.size.includes(size)}
              name="size"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-700 font-semibold text-sm mb-3">
          Price Range
        </label>

        {/* Slider Track */}
        <input
          type="range"
          name="priceRange"
          min={0}
          max={9999}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 rounded-full appearance-none bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 cursor-pointer transition-all duration-300
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-5
    [&::-webkit-slider-thumb]:h-5
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-white
    [&::-webkit-slider-thumb]:border
    [&::-webkit-slider-thumb]:border-blue-600
    [&::-webkit-slider-thumb]:shadow-md
    [&::-webkit-slider-thumb]:transition-all
    [&::-webkit-slider-thumb]:hover:scale-110"
        />

        {/* Price Range Labels */}
        <div className="flex justify-between text-sm text-gray-500 font-medium mt-3">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
