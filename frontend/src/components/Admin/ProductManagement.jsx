import { Link } from "react-router-dom";

const ProductManagement = () => {
  const products = [
    { _id: 64655, name: "Formal Shirt", price: 1849.99, sku: "FRM123" },
    { _id: 64656, name: "Casual T-Shirt", price: 999.49, sku: "CSL456" },
    { _id: 64657, name: "Denim Jeans", price: 2299.0, sku: "DNM789" },
    { _id: 64658, name: "Leather Jacket", price: 4999.99, sku: "LTH321" },
    { _id: 64659, name: "Sneakers", price: 3499.0, sku: "SNK654" },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Product deleted with ID:", id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        Product Management
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-4 px-6">Name</th>
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
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    ₹{product.price}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {product.sku}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
                      >
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
                  className="py-10 px-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No products available.
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
