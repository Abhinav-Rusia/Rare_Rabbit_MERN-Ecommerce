import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

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
  const [dbCategories, setDbCategories] = useState([]);
  const [dbGenders, setDbGenders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default categories and genders (will be replaced with data from API)
  const defaultCategories = [
    "All",
    "Top Wear",
    "Bottom Wear",
    "Sportswear",
    "Winterwear",
    "Footwear",
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

  // Fetch categories and genders from the database
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);

        // Fetch metadata from API
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/metadata`
        );

        if (response.data && response.data.success) {
          // Use custom categories from the API if available
          if (response.data.customCategories && Array.isArray(response.data.customCategories)) {
            setDbCategories(response.data.customCategories);
          } else {
            // Fall back to our default categories
            setDbCategories(defaultCategories);
          }

          // Make sure we have genders data before using it
          if (response.data.genders && Array.isArray(response.data.genders)) {
            // Add "All" option to the beginning of the genders array
            setDbGenders(["All", ...response.data.genders]);
          } else {
            // If no genders in response, use defaults
            setDbGenders(["All", "male", "female", "kids", "unisex"]);
          }
        } else {
          // If response is not successful, use defaults
          setDbCategories(defaultCategories);
          setDbGenders(["All", "male", "female", "kids", "unisex"]);
        }
      } catch (error) {
        // Fall back to default values if API call fails
        setDbCategories(defaultCategories);
        setDbGenders(["All", "male", "female", "kids", "unisex"]);
      } finally {
        setLoading(false);
      }
    };

    // Execute the fetch function
    fetchMetadata();

    // No dependencies - we only want to run this once when component mounts
  }, []);

  // Use the categories from the database, or fall back to defaults if not loaded yet
  const categories = dbCategories.length > 0 ? dbCategories : defaultCategories;

  // Use the genders from the database, or fall back to defaults if not loaded yet
  const genders =
    dbGenders.length > 0
      ? dbGenders
      : ["All", "male", "female", "kids", "unisex"];

  // Function to get display name for gender values
  const getGenderDisplayName = (gender) => {
    const displayNames = {
      All: "All",
      male: "Men",
      female: "Women",
      kids: "Kids",
      unisex: "Unisex",
    };

    // Return the display name if it exists, otherwise capitalize the first letter
    return (
      displayNames[gender] ||
      (gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : gender)
    );
  };

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
      // Handle "All" selections for category and gender
      if ((name === "category" || name === "gender") && value === "All") {
        // Remove the parameter completely for "All" selections
        delete newFilters[name];
      } else {
        newFilters[name] = value;
      }
    }

    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      // Handle arrays (like size)
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      }
      // Handle non-empty string values and numbers
      else if (
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
    const newPrice = parseInt(e.target.value);

    // Update the price range state for the UI
    setPriceRange([0, newPrice]);

    // Create new filters with the updated price range
    const newFilters = {
      ...filters,
      minPrice: 0,
      maxPrice: newPrice,
    };

    // Update the filters state and URL parameters
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    // Reset all filters to their default values
    const defaultFilters = {
      category: "",
      gender: "",
      color: "",
      size: [],
      minPrice: 0,
      maxPrice: 9999,
    };

    // Update the state and URL
    setFilters(defaultFilters);
    setPriceRange([0, 9999]);

    // Clear the URL parameters
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">
        Filters
      </h3>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">
          Category
        </h4>
        <div className="space-y-1.5">
          {loading ? (
            <div className="text-sm text-gray-500">Loading categories...</div>
          ) : (
            categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category}`}
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={handleFilterChange}
                  className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-gray-700 cursor-pointer text-sm"
                >
                  {category}
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">
          Gender
        </h4>
        <div className="space-y-1.5">
          {loading ? (
            <div className="text-sm text-gray-500">Loading genders...</div>
          ) : (
            genders.map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  type="radio"
                  id={`gender-${gender}`}
                  name="gender"
                  checked={filters.gender === gender}
                  value={gender}
                  onChange={handleFilterChange}
                  className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                />
                <label
                  htmlFor={`gender-${gender}`}
                  className="text-gray-700 cursor-pointer text-sm"
                >
                  {getGenderDisplayName(gender)}
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">
          Color
        </h4>
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
              className={`w-6 h-6 rounded-full border transition-all duration-200
               hover:scale-110 ${
                 filters.color === color
                   ? "ring-1 ring-offset-1 ring-blue-500 border-gray-400"
                   : "border-gray-200"
               }`}
              style={{ backgroundColor: color.toLowerCase() }}
            >
              <span className="sr-only">{color}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => (
            <label
              key={size}
              className={`px-2 py-1 border rounded-md text-xs cursor-pointer transition-colors
                ${
                  filters.size.includes(size)
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
            >
              <input
                type="checkbox"
                value={size}
                onChange={handleFilterChange}
                checked={filters.size.includes(size)}
                name="size"
                className="sr-only"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">
          Price Range
        </h4>

        {/* Price display */}
        <div className="mb-1.5 text-xs font-medium text-gray-700">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </div>

        {/* Slider Track */}
        <input
          type="range"
          name="priceRange"
          min={0}
          max={9999}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-1.5 rounded-full appearance-none bg-gradient-to-r from-blue-400 to-blue-600 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3.5
            [&::-webkit-slider-thumb]:h-3.5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-110"
        />

        {/* Price Range Labels */}
        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
          <span>₹0</span>
          <span>₹9999</span>
        </div>
      </div>

      {/* Clear All Filters Button */}
      <button
        onClick={clearAllFilters}
        className="w-full py-1.5 px-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-xs shadow-sm transition-colors mt-3 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Clear
      </button>
    </div>
  );
};

export default FilterSidebar;
