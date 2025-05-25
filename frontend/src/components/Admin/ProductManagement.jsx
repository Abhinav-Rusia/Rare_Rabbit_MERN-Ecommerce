import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";
import { toast } from "sonner";
import PriceDisplay from "../Common/PriceDisplay";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success("Product deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center border border-gray-100">
          {/* Animated Logo/Icon */}
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-r-emerald-500 animate-spin"></div>

              {/* Inner pulsing circle */}
              <div className="absolute inset-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Loading Products
            </h3>
            <p className="text-gray-500 text-sm">
              Please wait while we fetch the latest product data...
            </p>

            {/* Animated dots */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1.5 rounded-full animate-pulse" style={{width: '70%'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-lg w-full text-center border border-red-100">
          {/* Error Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto relative">
              {/* Outer warning ring */}
              <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-pulse"></div>

              {/* Inner error circle */}
              <div className="absolute inset-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Error Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Failed to Load Products
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                We couldn't load the product data. This might be a temporary issue.
              </p>
            </div>

            {/* Error Details */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm font-medium mb-2">Error Details:</p>
              <p className="text-red-600 text-sm font-mono bg-red-100 px-3 py-2 rounded-lg">
                {typeof error === 'string' ? error : error?.message || JSON.stringify(error) || "Failed to fetch products"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>

              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-gray-300"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
            </div>

            {/* Help Text */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                If the problem persists, please contact support or try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 sm:mb-0">
          Product Management
        </h2>
        <Link
          to="/admin/products/add"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">SKU</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-16 h-16">
                        {(() => {
                          // Get image URL from the product data structure
                          let imageUrl = null;

                          // Check if images array exists and has items with url property
                          if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                            // Images are stored as objects with url property
                            imageUrl = product.images[0].url || product.images[0];
                          } else if (product.image) {
                            imageUrl = product.image;
                          } else if (product.imageUrl) {
                            imageUrl = product.imageUrl;
                          }

                          // Handle relative URLs by adding backend URL if needed
                          if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
                            imageUrl = `${import.meta.env.VITE_BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
                          }

                          return imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.images?.[0]?.altText || product.name}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null;
                        })()}
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center ${(() => {
                            const hasImage = (product.images && Array.isArray(product.images) && product.images.length > 0 && product.images[0].url) ||
                                            product.image || product.imageUrl;
                            return hasImage ? 'hidden' : 'flex';
                          })()}`}
                        >
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {product.category || 'No category'}
                        </p>
                        {product.brand && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                            Brand: {product.brand}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <PriceDisplay
                      price={product.price}
                      discountPrice={product.discountPrice}
                      size="small"
                      showBadge={true}
                      showSavings={false}
                    />
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {product.sku}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-16 px-6 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">No products found</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Get started by adding your first product
                      </p>
                    </div>
                    <Link
                      to="/admin/products/add"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Product
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
