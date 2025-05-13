import { useState } from "react";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    sku: "",
    category: "",
    collections: "",
    gender: "",
    countInStock: 0,
    sizes: [],
    colors: [],
    images: [
      {
        url: "https://picsum.photos/200.webp?random=1",
        altText: "",
      },
      {
        url: "https://picsum.photos/200.webp?random=2",
        altText: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    // Handle upload here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", productData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* SKU */}
        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
            SKU
          </label>
          <input
            id="sku"
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Collections */}
        <div>
          <label htmlFor="collections" className="block text-sm font-medium text-gray-700 mb-1">
            Collection
          </label>
          <input
            id="collections"
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <input
            id="gender"
            type="text"
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Count In Stock */}
        <div>
          <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700 mb-1">
            Count In Stock
          </label>
          <input
            id="countInStock"
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Sizes */}
        <div>
          <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-1">
            Sizes (comma separated)
          </label>
          <input
            id="sizes"
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Colors */}
        <div>
          <label htmlFor="colors" className="block text-sm font-medium text-gray-700 mb-1">
            Colors (comma separated)
          </label>
          <input
            id="colors"
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border rounded-md p-3 text-gray-900"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((img, index) => (
              <div key={index} className="w-20 h-20">
                <img
                  src={img.url}
                  alt={img.altText || "Product"}
                  className="w-full h-full object-cover rounded-md shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
