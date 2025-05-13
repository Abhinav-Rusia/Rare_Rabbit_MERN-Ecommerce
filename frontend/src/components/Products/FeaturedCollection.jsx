import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-12 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-gradient-to-br from-green-50 via-white to-green-100 rounded-3xl shadow-md overflow-hidden transition-all duration-300">
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-sm font-medium text-green-600 uppercase mb-2 tracking-widest">
            Comfort and Style
          </h2>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Effortless Fits <br /> Timeless Vibes.
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
            From laid-back mornings to late-night plans — our styles are made to
            move with you, feel great on you, and turn every outfit into a
            statement.
          </p>

          <Link
            to="/collection/all"
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 group overflow-hidden">
          <img
            src={featured}
            alt="Stylish woman in casual wear"
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
