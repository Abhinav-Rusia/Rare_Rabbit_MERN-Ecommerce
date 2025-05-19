import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlices";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    // Fetch Random Products for Stylish Picks
    dispatch(
      fetchProductsByFilters({
        limit: 4,
        // No specific filters to get a random mix of products
      })
    );

    // Fetch Best Sellers
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-sellers`
        );

        // Access the bestSellers array from the response
        if (response.data && response.data.bestSellers) {
          setBestSellers(response.data.bestSellers);
        } else {
          console.error("Best sellers data structure is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };

    fetchBestSellers();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller Section */}
      <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
        <span className="relative z-10">BestSeller</span>
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 h-[6px] w-28 bg-yellow-400 rounded-full"></span>
      </h2>

      {bestSellers && bestSellers.length > 0 ? (
        <ProductDetails productId={bestSellers[0]._id} />
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-700 mr-3">Loading Bestseller Products....</p>
          <svg
            className="animate-spin h-6 w-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4.93 4.93a10 10 0 0114.14 14.14l1.41 1.41a12 12 0 00-16.97-16.97l1.41 1.41z"
            ></path>
          </svg>
        </div>
      )}

      {products && products.length > 0 && (
        <div className="container mx-auto mt-10">
          <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
            <span className="relative z-10">Stylish Picks Just for You</span>

            <svg
              viewBox="0 0 300 30"
              className="absolute left-1/2 top-full transform -translate-x-1/2 w-48 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 20 Q 40 5, 80 20 T 160 20 T 240 20 T 300 20"
                stroke="#a855f7"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw"
              />
            </svg>
          </h2>

          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      )}

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
