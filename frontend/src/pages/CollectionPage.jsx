import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Women's Puffer Jacket",
          price: 1349,
          images: [
            {
              url: "https://picsum.photos/800.webp?random=11",
              altText: "Black Women's Puffer Jacket",
            },
          ],
        },
        {
          _id: 2,
          name: "Women's Leather Jacket",
          price: 2299,
          images: [
            {
              url: "https://picsum.photos/800.webp?random=12",
              altText: "Brown Women's Leather Jacket",
            },
          ],
        },
        {
          _id: 3,
          name: "Women's Oversized Hoodie",
          price: 999,
          images: [
            {
              url: "https://picsum.photos/800.webp?random=13",
              altText: "Grey Women's Oversized Hoodie",
            },
          ],
        },
        {
          _id: 4,
          name: "Women's Denim Jacket",
          price: 1899,
          images: [
            {
              url: "https://picsum.photos/800.webp?random=14",
              altText: "Blue Women's Denim Jacket",
            },
          ],
        },
        {
          _id: 5,
          name: "Women's Crop Top",
          price: 699,
          images: [
            {
              url: "https://picsum.photos/800.webp?random=15",
              altText: "Black Women's Crop Top",
            },
          ],
        },
        {
          _id: 6,
          name: "Women's Blazer",
          price: 1999,
          images: [
            {
              url: "https://picsum.photos/800.webp?random=16",
              altText: "Beige Women's Blazer",
            },
          ],
        },
        {
          _id: 7,
          name: "Women's Flannel Shirt",
          price: 849,
          images: [
            {
              url: "https://picsum.photos/800.webp?random=17",
              altText: "Red Checked Women's Flannel Shirt",
            },
          ],
        },
        {
          _id: 8,
          name: "Women's Knitted Sweater",
          price: 1249,
          images: [
            {
              url: "https://picsum.photos/800.webp?random=18",
              altText: "Cream Women's Knitted Sweater",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Filter button for mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase font-semibold mb-4">
          All collection
        </h2>

        {/* Sort Option */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};
export default CollectionPage;
