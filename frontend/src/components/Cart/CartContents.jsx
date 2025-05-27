import React, { useState, useCallback, useMemo } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity, removeFromCart } from "../../redux/slices/cartSlice";
import PriceDisplay from "../Common/PriceDisplay";
import { toast } from "sonner";

// Memoized Cart Item Component for better performance
const CartItem = React.memo(({ product, userId, guestId, onQuantityChange, onRemove }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [optimisticQuantity, setOptimisticQuantity] = useState(product.quantity);

  const handleQuantityChange = useCallback(async (delta) => {
    const newQuantity = optimisticQuantity + delta;

    if (newQuantity < 1) return;

    // Optimistic update
    setOptimisticQuantity(newQuantity);
    setIsUpdating(true);

    try {
      await onQuantityChange(product.productId, newQuantity, product.size, product.color);
    } catch (error) {
      // Rollback on error
      setOptimisticQuantity(product.quantity);
      toast.error("Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  }, [optimisticQuantity, product.productId, product.quantity, product.size, product.color, onQuantityChange]);

  const handleRemove = useCallback(async () => {
    setIsRemoving(true);

    try {
      await onRemove(product.productId, product.size, product.color);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
      setIsRemoving(false);
    }
  }, [product.productId, product.size, product.color, onRemove]);

  // Sync optimistic quantity with actual quantity when it changes
  React.useEffect(() => {
    setOptimisticQuantity(product.quantity);
  }, [product.quantity]);

  return (
    <div className="flex items-start justify-between py-4 border-b">
      <div className="flex items-start">
        <img
          className="w-20 h-24 object-cover mr-4 rounded-md"
          src={product.image}
          alt={product.name}
        />
        <div>
          <h3>{product.name}</h3>
          <p className="text-sm text-gray-500">
            Size: {product.size} | Color: {product.color}
          </p>
          <div className="flex items-center mt-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={isUpdating || optimisticQuantity <= 1}
              className="border border-gray-400 rounded px-2 py-1 text-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 flex items-center justify-center min-w-[32px]"
            >
              {isUpdating ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
              ) : (
                "-"
              )}
            </button>
            <span className="mx-4 min-w-[20px] text-center">{optimisticQuantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={isUpdating}
              className="border border-gray-400 rounded px-2 py-1 text-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 flex items-center justify-center min-w-[32px]"
            >
              {isUpdating ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
              ) : (
                "+"
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="text-right">
        <PriceDisplay
          price={product.originalPrice || product.price}
          discountPrice={product.discountPrice || (product.originalPrice ? product.price : null)}
          size="small"
          showBadge={false}
          showSavings={false}
        />
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="cursor-pointer p-1 hover:bg-red-50 rounded transition-all duration-200 disabled:opacity-50"
        >
          {isRemoving ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
          ) : (
            <RiDeleteBin6Line className="h-6 w-6 text-red-600" />
          )}
        </button>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  const [pendingOperations, setPendingOperations] = useState(new Set());

  // Debounced API calls to prevent multiple simultaneous requests
  const debouncedOperations = useMemo(() => new Map(), []);

  const handleQuantityChange = useCallback(async (productId, newQuantity, size, color) => {
    const operationKey = `${productId}-${size}-${color}`;

    // Clear existing timeout for this item
    if (debouncedOperations.has(operationKey)) {
      clearTimeout(debouncedOperations.get(operationKey));
    }

    // Add to pending operations
    setPendingOperations(prev => new Set(prev).add(operationKey));

    // Debounce the API call
    const timeoutId = setTimeout(async () => {
      try {
        await dispatch(updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          userId,
          guestId,
        })).unwrap();
      } catch (error) {
        throw error;
      } finally {
        setPendingOperations(prev => {
          const newSet = new Set(prev);
          newSet.delete(operationKey);
          return newSet;
        });
        debouncedOperations.delete(operationKey);
      }
    }, 300); // 300ms debounce

    debouncedOperations.set(operationKey, timeoutId);
  }, [dispatch, userId, guestId, debouncedOperations]);

  const handleRemove = useCallback(async (productId, size, color) => {
    const operationKey = `remove-${productId}-${size}-${color}`;

    setPendingOperations(prev => new Set(prev).add(operationKey));

    try {
      await dispatch(removeFromCart({
        productId,
        size,
        color,
        userId,
        guestId,
      })).unwrap();
    } catch (error) {
      throw error;
    } finally {
      setPendingOperations(prev => {
        const newSet = new Set(prev);
        newSet.delete(operationKey);
        return newSet;
      });
    }
  }, [dispatch, userId, guestId]);

  // Make sure we're safely accessing cart products
  if (!cart || !cart.products || !Array.isArray(cart.products)) {
    return <p className="text-gray-500 text-center py-8">No items in cart</p>;
  }

  return (
    <div className="space-y-0">
      {cart.products.map((product) => (
        <CartItem
          key={`${product.productId}-${product.size}-${product.color}`}
          product={product}
          userId={userId}
          guestId={guestId}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};
export default CartContents;
