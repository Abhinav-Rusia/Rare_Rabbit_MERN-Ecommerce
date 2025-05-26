import { useEffect, useState } from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { TbBrandMeta } from "react-icons/tb";
import { IoChevronUpOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-white border-t py-16 text-gray-800 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">📬 Stay in the Loop</h3>
              <p className="text-gray-600">
                Get updates on new arrivals, trends, and exclusive offers.
              </p>
              <p className="text-sm text-gray-500">
                Sign up now & get <strong className="italic">10% off</strong>{" "}
                your first order.
              </p>
              <form className="flex items-center justify-center md:justify-start">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full max-w-[200px] px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black transition"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 text-sm rounded-r-md hover:brightness-110 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Shop */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">🛍️ Shop</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="hover:underline hover:text-black"><Link to="/collections/all?gender=male">Men</Link></li>
                <li className="hover:underline hover:text-black"><Link to="/collections/all?gender=female">Women</Link></li>
                <li className="hover:underline hover:text-black"><Link to="/collections/all?gender=kids">Kids</Link></li>
                <li className="hover:underline hover:text-black"><Link to="/collections/all?category=Accessories">Accessories</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">🧾 Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-black transition-colors hover:underline underline-offset-4"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-black transition-colors hover:underline underline-offset-4"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="hover:text-black transition-colors hover:underline underline-offset-4"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/features"
                    className="hover:text-black transition-colors hover:underline underline-offset-4"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">🔗 Connect</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://meta.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition transform hover:scale-110"
                >
                  <TbBrandMeta className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition transform hover:scale-110"
                >
                  <IoLogoInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition transform hover:scale-110"
                >
                  <RiTwitterXLine className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-gray-500">Need Help?</p>
              <p className="flex justify-center md:justify-start items-center text-sm text-gray-700 font-medium">
                <FiPhoneCall className="mr-2" /> +012-345-6789
              </p>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold text-black">Abhinav Rusia</span>.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
          aria-label="Back to top"
        >
          <IoChevronUpOutline className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;
