import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Product 1",
  price: 1849.99,
  originalPrice: 2699.99,
  Description: "Description of Product 1",
  brand: "Brand 1",
  material: "Material 1",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Red", "Blue", "Green"],
  images: [
    {
      url: "https://picsum.photos/800.webp?random=1",
      altText: "Product 1",
    },
    {
      url: "https://picsum.photos/800.webp?random=2",
      altText: "Product 1.1",
    },
  ],
};
const similarProducts = [
  {
    _id: 1,
    name: "Puffer Jacket",
    price: 1349,
    images: [
      {
        url: "https://picsum.photos/800.webp?random=3",
        altText: "Black Puffer Jacket",
      },
    ],
  },
  {
    _id: 2,
    name: "Leather Jacket",
    price: 2299,
    images: [
      {
        url: "https://picsum.photos/800.webp?random=4",
        altText: "Brown Leather Jacket",
      },
    ],
  },
  {
    _id: 3,
    name: "Oversized Hoodie",
    price: 999,
    images: [
      {
        url: "https://picsum.photos/800.webp?random=5",
        altText: "Grey Oversized Hoodie",
      },
    ],
  },
  {
    _id: 4,
    name: "Denim Jacket",
    price: 1899,
    images: [
      {
        url: "https://picsum.photos/800.webp?random=6",
        altText: "Blue Denim Jacket",
      },
    ],
  },
];

const ProductDetails = () => {
  const [mainImg, setMainImg] = useState(
    selectedProduct?.images?.[0]?.url || null
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

    setTimeout(() => {
      toast.success("Product added to cart successfully.", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 3000);
  };

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

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
                alt={selectedProduct.images[0].altText}
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
            <p className="text-xl font-semibold mb-4 text-gray-900">
              Rs.{selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.Description}</p>

            <div className="flex gap-3 mt-2">
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

            <div className="mb-4">
              <p className="text-gray-700">
                <strong>Size:</strong>
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
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
            <div className="mb-6">
              <p className="text-gray-700">
                <strong>Quantity:</strong>
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded-md text-lg font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="text-lg"> {quantity} </span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded-md text-lg font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded-sm w-full cursor-pointer mb-4 ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700 active:scale-95"
              } `}
            >
              {isButtonDisabled ? "Adding to Cart..." : "Add to Cart"}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand:</td>
                    <td className="py-1">
                      {selectedProduct.brand || "Unknown"}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-1">Material:</td>
                    <td className="py-1">
                      {selectedProduct.material || "Unknown"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="relative text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            You May Also Like
            <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 h-[3px] w-24 bg-pink-500 rounded-full opacity-80"></span>
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
