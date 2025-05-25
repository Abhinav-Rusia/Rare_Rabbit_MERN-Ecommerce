const PriceDisplay = ({ 
  price, 
  discountPrice, 
  size = "medium",
  showBadge = true,
  showSavings = false,
  className = "",
  currency = "₹",
  layout = "horizontal"
}) => {
  const hasValidDiscount = discountPrice > 0 && discountPrice < price;
  const discountPercentage = hasValidDiscount 
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;
  const savings = hasValidDiscount ? price - discountPrice : 0;

  const sizeClasses = {
    small: {
      originalPrice: "text-sm line-through text-gray-400",
      discountPrice: "text-lg font-bold text-emerald-600",
      badge: "text-xs px-2 py-0.5",
      savings: "text-xs text-emerald-600 font-medium"
    },
    medium: {
      originalPrice: "text-lg line-through text-gray-500",
      discountPrice: "text-2xl font-bold text-emerald-600",
      badge: "text-sm px-2.5 py-1",
      savings: "text-sm text-emerald-600 font-medium"
    },
    large: {
      originalPrice: "text-xl line-through text-gray-500",
      discountPrice: "text-3xl font-bold text-emerald-600",
      badge: "text-base px-3 py-1.5",
      savings: "text-base text-emerald-600 font-semibold"
    }
  };

  const classes = sizeClasses[size];

  if (!hasValidDiscount) {
    return (
      <div className={`flex items-center ${className}`}>
        <span className={classes.discountPrice.replace('text-emerald-600', 'text-gray-900')}>
          {currency}{price?.toLocaleString()}
        </span>
      </div>
    );
  }

  const badgeColors = {
    low: "bg-gradient-to-r from-orange-500 to-orange-600",
    medium: "bg-gradient-to-r from-red-500 to-red-600", 
    high: "bg-gradient-to-r from-purple-500 to-purple-600"
  };

  const badgeColor = discountPercentage >= 50 ? badgeColors.high 
    : discountPercentage >= 25 ? badgeColors.medium 
    : badgeColors.low;

  const containerClass = layout === "vertical" 
    ? "flex flex-col gap-2" 
    : "flex flex-col gap-1";

  const priceRowClass = layout === "vertical"
    ? "flex flex-col gap-1"
    : "flex items-center gap-3 flex-wrap";

  return (
    <div className={`${containerClass} ${className}`}>
      <div className={priceRowClass}>
        <span className={classes.originalPrice}>
          {currency}{price?.toLocaleString()}
        </span>
        
        <span className={classes.discountPrice}>
          {currency}{discountPrice?.toLocaleString()}
        </span>
        
        {showBadge && discountPercentage > 0 && (
          <span className={`
            ${classes.badge}
            ${badgeColor}
            text-white rounded-full font-semibold
            transform transition-all duration-200
            hover:scale-105 hover:shadow-lg
            animate-pulse hover:animate-none
            shadow-sm
          `}>
            {discountPercentage}% OFF
          </span>
        )}
      </div>
      
      {showSavings && savings > 0 && (
        <div className={`${classes.savings} flex items-center gap-1`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          You save {currency}{savings?.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
