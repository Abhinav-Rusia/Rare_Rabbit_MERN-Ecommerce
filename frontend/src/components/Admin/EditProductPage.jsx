import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProductDetails,
  updateProduct,
  uploadProductImages,
  clearUploadedImages,
  removeUploadedImage,
  clearError
} from "../../redux/slices/adminProductSlice";
import { toast } from "sonner";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productDetails, uploadedImages, loading, uploadLoading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    sku: "",
    category: "",
    collections: "",
    gender: "",
    countInStock: 0,
    sizes: [],
    colors: [],
    images: [],
    isFeatured: false,
    isPublished: false,
    tags: [],
  });

  const [dragActive, setDragActive] = useState(false);

  // Local state for array inputs to avoid re-render issues
  const [sizesInput, setSizesInput] = useState("");
  const [colorsInput, setColorsInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // Dropdown options
  const categoryOptions = [
    "Top Wear",
    "Bottom Wear",
    "Sportswear",
    "Winterwear",
    "Footwear",
    "Accessories"
  ];

  const collectionOptions = [
    "Summer Collection",
    "Winter Collection",
    "Spring Collection",
    "Autumn Collection",
    "Casual Wear",
    "Formal Wear",
    "Sports Collection",
    "Premium Collection",
    "Accessories Collection",

  ];

  const genderOptions = [
    "male",
    "female",
    "unisex",
    "kids"
  ];

  // Load product data on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchAdminProductDetails(id));
    }
    return () => {
      dispatch(clearError());
      dispatch(clearUploadedImages());
    };
  }, [dispatch, id]);

  // Update form data when product details are loaded
  useEffect(() => {
    if (productDetails) {
      const sizes = Array.isArray(productDetails.sizes) ? productDetails.sizes : [];
      const colors = Array.isArray(productDetails.colors) ? productDetails.colors : [];
      const tags = Array.isArray(productDetails.tags) ? productDetails.tags : [];

      setProductData({
        name: productDetails.name || "",
        description: productDetails.description || "",
        price: productDetails.price || 0,
        discountPrice: productDetails.discountPrice || 0,
        sku: productDetails.sku || "",
        category: productDetails.category || "",
        collections: productDetails.collections || "",
        gender: productDetails.gender || "",
        countInStock: productDetails.countInStock || 0,
        sizes: sizes,
        colors: colors,
        images: productDetails.images || [],
        isFeatured: productDetails.isFeatured || false,
        isPublished: productDetails.isPublished || false,
        tags: tags,
      });

      // Update local input states
      setSizesInput(sizes.join(", "));
      setColorsInput(colors.join(", "));
      setTagsInput(tags.join(", "));
    }
  }, [productDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSizesChange = (value) => {
    setSizesInput(value);
    const newArray = value.split(",").map((item) => item.trim()).filter(item => item !== "");
    setProductData((prev) => ({
      ...prev,
      sizes: newArray,
    }));
  };

  const handleColorsChange = (value) => {
    setColorsInput(value);
    const newArray = value.split(",").map((item) => item.trim()).filter(item => item !== "");
    setProductData((prev) => ({
      ...prev,
      colors: newArray,
    }));
  };

  const handleTagsChange = (value) => {
    setTagsInput(value);
    const newArray = value.split(",").map((item) => item.trim()).filter(item => item !== "");
    setProductData((prev) => ({
      ...prev,
      tags: newArray,
    }));
  };

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;

    try {
      // Upload files one by one since backend expects single file uploads
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('image', file); // Backend expects 'image' field name

        const result = await dispatch(uploadProductImages(formData)).unwrap();
        return result;
      });

      await Promise.all(uploadPromises);
      toast.success(`${files.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    }
  };

  const handleFileInputChange = (e) => {
    handleImageUpload(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (index, isUploaded = false) => {
    if (isUploaded) {
      // Remove from uploaded images using Redux action
      dispatch(removeUploadedImage(index));
    } else {
      // Remove from existing product images
      const newImages = [...productData.images];
      newImages.splice(index, 1);
      setProductData(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Combine existing images with newly uploaded ones
      const allImages = [
        ...productData.images,
        ...uploadedImages.map(img => ({
          url: img.url || img.imageUrl || img,
          altText: img.altText || ""
        }))
      ];

      const updatedProductData = {
        ...productData,
        images: allImages,
        price: Number(productData.price),
        discountPrice: Number(productData.discountPrice),
        countInStock: Number(productData.countInStock),
      };

      await dispatch(updateProduct({ id, productData: updatedProductData })).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center border border-gray-100">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
              <div className="absolute inset-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Loading Product
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we fetch the product details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Edit Product
        </h2>
        <button
          onClick={() => navigate("/admin/products")}
          className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter product description"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Discount Price */}
            <div>
              <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 mb-2">
                Discount Price (₹)
              </label>
              <input
                id="discountPrice"
                type="number"
                name="discountPrice"
                value={productData.discountPrice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            {/* SKU */}
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                SKU *
              </label>
              <input
                id="sku"
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter SKU"
                required
              />
            </div>

            {/* Count In Stock */}
            <div>
              <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                id="countInStock"
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Category & Classification Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Category & Classification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Collection Dropdown */}
            <div>
              <label htmlFor="collections" className="block text-sm font-medium text-gray-700 mb-2">
                Collection *
              </label>
              <select
                id="collections"
                name="collections"
                value={productData.collections}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                required
              >
                <option value="">Select Collection</option>
                {collectionOptions.map((collection) => (
                  <option key={collection} value={collection}>
                    {collection}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Dropdown */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={productData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                required
              >
                <option value="">Select Gender</option>
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Variants Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Product Variants
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sizes */}
            <div>
              <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-2">
                Available Sizes
              </label>
              <input
                id="sizes"
                type="text"
                name="sizes"
                value={sizesInput}
                onChange={(e) => handleSizesChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="S, M, L, XL, XXL"
              />
              <p className="text-xs text-gray-500 mt-1">Separate sizes with commas</p>
            </div>

            {/* Colors */}
            <div>
              <label htmlFor="colors" className="block text-sm font-medium text-gray-700 mb-2">
                Available Colors
              </label>
              <input
                id="colors"
                type="text"
                name="colors"
                value={colorsInput}
                onChange={(e) => handleColorsChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Red, Blue, Green, Black"
              />
              <p className="text-xs text-gray-500 mt-1">Separate colors with commas</p>
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                name="tags"
                value={tagsInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="trending, sale, new-arrival, bestseller"
              />
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Product Images
          </h3>

          {/* Drag & Drop Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drag & drop images here, or{" "}
                  <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold">
                    browse
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-sm text-gray-500">
                  Support: JPG, PNG, GIF up to 10MB each
                </p>
              </div>
              {uploadLoading && (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-blue-600">Uploading...</span>
                </div>
              )}
            </div>
          </div>

          {/* Current Images */}
          {(productData.images.length > 0 || uploadedImages.length > 0) && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Current Images</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* Existing Images */}
                {productData.images.map((img, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <img
                      src={img.url}
                      alt={img.altText || "Product"}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, false)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                      Current
                    </div>
                  </div>
                ))}

                {/* Newly Uploaded Images */}
                {uploadedImages.map((img, index) => (
                  <div key={`uploaded-${index}`} className="relative group">
                    <img
                      src={img.url || img}
                      alt="Uploaded"
                      className="w-full h-24 object-cover rounded-lg border border-green-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, true)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                      New
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Settings Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Product Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Product */}
            <div className="flex items-center space-x-3">
              <input
                id="isFeatured"
                type="checkbox"
                name="isFeatured"
                checked={productData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                Featured Product
              </label>
            </div>

            {/* Published Status */}
            <div className="flex items-center space-x-3">
              <input
                id="isPublished"
                type="checkbox"
                name="isPublished"
                checked={productData.isPublished}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                Published (Visible to customers)
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploadLoading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none"
          >
            {loading || uploadLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Updating...</span>
              </div>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
