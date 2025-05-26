import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;

    // Create a new URLSearchParams object to preserve existing parameters
    const newParams = new URLSearchParams(searchParams);

    // Set the sortBy parameter
    newParams.set("sortBy", sortBy);

    // Update the URL with the new parameters
    setSearchParams(newParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <label htmlFor="sort" className="sr-only">
        Sort Options
      </label>
      <select
        id="sort"
        value={searchParams.get("sortBy") || ""}
        onChange={handleSortChange}
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        aria-label="Sort by"
      >
        <option value="" disabled>
          Sort by
        </option>
        <option value="relevance">Relevance</option>
        <option value="priceAsc">Low to High</option>
        <option value="priceDesc">High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
