import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";

const placeholderProducts = [
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

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
        <span className="relative z-10">BestSeller</span>
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 h-[6px] w-28 bg-yellow-400 rounded-full"></span>
      </h2>
      <ProductDetails />

      <div className="container mx-auto">
        <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
          <span className="relative z-10">Top Wear For Women</span>

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
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};
export default Home;
