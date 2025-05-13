import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* Feature 1 */}
        <div className="group transition-all duration-300 hover:shadow-lg rounded-xl p-6 ">
          <div className="p-4 mb-4 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 text-white">
            <HiShoppingBag className="text-3xl mx-auto" />
          </div>
          <h4 className="text-lg font-semibold uppercase mb-2 tracking-wide group-hover:text-purple-700 transition">
            Free Worldwide Shipping
          </h4>
          <p className="text-gray-600 text-sm">On all orders above ₹999</p>
        </div>

        {/* Feature 2 */}
        <div className="group transition-all duration-300 hover:shadow-lg rounded-xl p-6 ">
          <div className="p-4 mb-4 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-400 text-white">
            <HiArrowPathRoundedSquare className="text-3xl mx-auto" />
          </div>
          <h4 className="text-lg font-semibold uppercase mb-2 tracking-wide group-hover:text-blue-700 transition">
            21-Day Returns
          </h4>
          <p className="text-gray-600 text-sm">
            Full Refund — No Questions Asked
          </p>
        </div>

        {/* Feature 3 */}
        <div className="group transition-all duration-300 hover:shadow-lg  rounded-xl p-6">
          <div className="p-4 mb-4 rounded-full bg-gradient-to-tr from-green-400 to-emerald-400 text-white">
            <HiOutlineCreditCard className="text-3xl mx-auto" />
          </div>
          <h4 className="text-lg font-semibold uppercase mb-2 tracking-wide group-hover:text-green-700 transition">
            Secure Checkout
          </h4>
          <p className="text-gray-600 text-sm">
            Fully Encrypted & PCI Compliant
          </p>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
