import {
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineCreditCard,
  HiOutlineGlobe,
  HiOutlineHeart,
  HiOutlineChatAlt,
  HiOutlineSparkles,
  HiOutlineDeviceMobile
} from "react-icons/hi";

const Features = () => {
  const mainFeatures = [
    {
      icon: HiOutlineShieldCheck,
      title: "Quality Guarantee",
      description: "Every product is carefully inspected and comes with our quality guarantee. If you're not satisfied, we'll make it right.",
      benefits: ["Premium materials", "Quality control", "Satisfaction guarantee", "Durable construction"]
    },
    {
      icon: HiOutlineTruck,
      title: "Fast & Free Shipping",
      description: "Free shipping on orders above ₹999. Express delivery available. Track your order in real-time from dispatch to delivery.",
      benefits: ["Free shipping ₹999+", "Express delivery", "Real-time tracking", "Secure packaging"]
    },
    {
      icon: HiOutlineRefresh,
      title: "Easy Returns",
      description: "30-day hassle-free returns. Don't like it? Return it for free. We'll arrange pickup from your doorstep.",
      benefits: ["30-day returns", "Free pickup", "Quick refunds", "Size exchanges"]
    },
    {
      icon: HiOutlineCreditCard,
      title: "Secure Payments",
      description: "Multiple payment options with bank-level security. Your payment information is always protected and encrypted.",
      benefits: ["Multiple payment methods", "SSL encryption", "Secure checkout", "COD available"]
    }
  ];

  const additionalFeatures = [
    {
      icon: HiOutlineGlobe,
      title: "Global Shipping",
      description: "We ship worldwide with reliable international courier partners."
    },
    {
      icon: HiOutlineHeart,
      title: "Wishlist & Favorites",
      description: "Save your favorite items and get notified when they go on sale."
    },
    {
      icon: HiOutlineChatAlt,
      title: "24/7 Customer Support",
      description: "Our support team is always ready to help via chat, email, or phone."
    },
    {
      icon: HiOutlineSparkles,
      title: "Exclusive Collections",
      description: "Access to limited edition collections and early bird offers."
    },
    {
      icon: HiOutlineDeviceMobile,
      title: "Mobile Optimized",
      description: "Seamless shopping experience across all devices and platforms."
    }
  ];

  const shoppingExperience = [
    {
      step: "01",
      title: "Browse & Discover",
      description: "Explore our curated collections with advanced filters and search options."
    },
    {
      step: "02",
      title: "Try & Choose",
      description: "Use our size guide and customer reviews to make the perfect choice."
    },
    {
      step: "03",
      title: "Secure Checkout",
      description: "Quick and secure checkout with multiple payment options."
    },
    {
      step: "04",
      title: "Fast Delivery",
      description: "Track your order and receive it at your doorstep quickly and safely."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Why Choose Rare Rabbit?
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Discover the features that make shopping with us a delightful experience.
                From quality products to exceptional service, we've got you covered.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Premium shopping experience"
                className="rounded-lg shadow-lg w-full max-w-md h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for a perfect shopping experience, all in one place.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Additional features that enhance your shopping experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shopping Experience */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Shopping Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From discovery to delivery, every step is designed for your convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {shoppingExperience.map((step, index) => {
            const stepImages = [
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            ];
            return (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={stepImages[index]}
                    alt={step.title}
                    className="w-full h-32 object-cover rounded-lg shadow-md mb-4"
                  />
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full text-lg font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology & Innovation */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology & Innovation</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Our platform is built with cutting-edge technology to provide you with the
                  fastest, most secure, and user-friendly shopping experience possible.
                </p>
                <p>
                  From AI-powered recommendations to advanced search filters, we use technology
                  to help you find exactly what you're looking for quickly and easily.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">&lt;2s</div>
                    <div className="text-sm text-gray-600">Load Time</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Technology and innovation"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gray-900 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Rare Rabbit for their fashion needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/collections/all"
              className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Start Shopping
            </a>
            <a
              href="/about"
              className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
