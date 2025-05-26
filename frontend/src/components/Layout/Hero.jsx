import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";

const Hero = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[550px] lg:h-[700px] overflow-hidden">
      <img
        src={heroImg}
        alt="rabbit"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10 flex items-center justify-center">
        <div className="text-center text-white p-6 z-20">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-4 drop-shadow-xl">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tight md:text-lg mb-6 max-w-xl mx-auto drop-shadow-lg">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="/collections/all"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
