import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {

  if(loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-900"
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
    );
  }

  if(error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // Check if products is an array before mapping
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images && product.images[0]?.url}
                alt={(product.images && product.images[0]?.altText) || product.name}
                className="w-full h-full object-cover rounded-lg "
              />
            </div>
            <h3 className="text-sm mb-2">
                {product.name}
            </h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
                Rs. {product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductGrid;
