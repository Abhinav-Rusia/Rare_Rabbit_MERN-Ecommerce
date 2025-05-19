import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlices";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImg, setMainImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productFetchId]);

  // Fetch product details and similar products
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [productFetchId, dispatch]);

  // Update main image when product changes
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-900 mr-3">Loading...</p>
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

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // No product found
  if (!selectedProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-900">Loading product details...</p>
      </div>
    );
  }

  // No images available
  if (!selectedProduct.images || !Array.isArray(selectedProduct.images) || selectedProduct.images.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Product images not available</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Product Images */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                onClick={() => setMainImg(image.url)}
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                ${mainImg === image.url ? "border-black" : "border-gray-300"}
                transition-all duration-300`}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImg}
                alt={selectedProduct.images[0].altText || "Product image"}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Mobile thumbnails */}
          <div className="md:hidden mb-4 flex space-x-4 overflow-x-scroll">
            {selectedProduct.images.map((image, index) => (
              <img
                onClick={() => setMainImg(image.url)}
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                ${mainImg === image.url ? "border-black" : "border-gray-300"}
                transition-all duration-300`}
              />
            ))}
          </div>

          {/* Right side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg mb-1 line-through text-gray-600">
              {selectedProduct.originalPrice &&
                `Rs.${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl font-semibold mb-3 text-gray-900">
              Rs.{selectedProduct.price}
            </p>

            {selectedProduct.description || selectedProduct.Description ? (
              <p className="text-gray-600 mb-4">
                {selectedProduct.description || selectedProduct.Description}
              </p>
            ) : null}

            {selectedProduct.colors && selectedProduct.colors.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-700 font-medium mb-2">
                  Color:
                </p>
                <div className="flex gap-3">
                  {selectedProduct.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border-2 cursor-pointer transition-all duration-300
                      shadow-sm ring-offset-2
                      ${
                        selectedColor === color
                          ? "ring-2 ring-black"
                          : "hover:ring-2 hover:ring-gray-400"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-700 font-medium mb-2">
                  Size:
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm md:text-base font-medium
                      border transition-all duration-300 cursor-pointer shadow-sm
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-5">
              <p className="text-gray-700 font-medium mb-2">
                Quantity:
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1 bg-gray-200 rounded-md text-lg font-bold cursor-pointer hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-medium"> {quantity} </span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1 bg-gray-200 rounded-md text-lg font-bold cursor-pointer hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-3 px-6 rounded-sm w-full cursor-pointer ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700 active:scale-95"
              } `}
            >
              {isButtonDisabled ? "Adding to Cart..." : "Add to Cart"}
            </button>
          </div>
        </div>

        {similarProducts && similarProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="relative text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
              You May Also Like
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 h-[3px] w-24 bg-pink-500 rounded-full opacity-80"></span>
            </h2>
            <ProductGrid products={similarProducts} loading={loading} error={error} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
