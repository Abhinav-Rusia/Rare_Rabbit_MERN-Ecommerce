import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";


const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "Product 1",
      price: 19.99,
      Size: "XL",
      quantity: 2,
      color: "red",
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Product 2",
      price: 14.99,
      Size: "L",
      quantity: 2,
      color: "Purple",
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 3,
      name: "Product 3",
      price: 24.99,
      Size: "XXL",
      quantity: 3,
      color: "Fuscia",
      image: "https://picsum.photos/200?random=3",
    },
    {
      productId: 4,
      name: "Product 4",
      price: 18.49,
      Size: "S",
      quantity: 1,
      color: "Blue",
      image: "https://picsum.photos/200?random=4",
    },
  ];

  return (
    <>
      {cartProducts.map((product) => (
        <div
          key={product.productId}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              className="w-20 h-24 object-cover mr-4 rounded-md"
              src={product.image}
              alt={product.name}
            />

            <div className="">
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.Size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border border-gray-400 rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border border-gray-400 rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <p>${product.price.toLocaleString()}</p>
            <button className="">
                <RiDeleteBin6Line className="h-6 w-6 mt-2 text-red-600"/>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default CartContents;
