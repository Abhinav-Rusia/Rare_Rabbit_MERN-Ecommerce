import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
      );

      let data;
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && response.data.products) {
        data = response.data.products;
      } else if (response.data && response.data.newArrivals) {
        data = response.data.newArrivals;
      } else {
        data = [];
      }

      setNewArrivals(data);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };
  fetchNewArrivals();
}, []);


  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();

      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 text-gray-900 tracking-tight">
          Explore New Arrivals
        </h2>
        <p className="text-base md:text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover the latest styles straight off the runway — freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-4 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black shadow-md"
                : "bg-gray-200 text-gray-300 cursor-not-allowed"
            } `}
          >
            <FiChevronLeft className="text-2xl cursor-pointer" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black shadow-md"
                : "bg-gray-200 text-gray-300 cursor-not-allowed"
            } `}
          >
            <FiChevronRight className="text-2xl cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative  ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } `}
      >
        <div className="flex space-x-6 pb-4">
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[280px] sm:min-w-[250px] lg:min-w-[220px] bg-white rounded-xl shadow-md overflow-hidden relative transition hover:scale-[1.02]"
            >
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-[350px] object-cover"
                draggable="false"
              />
              <div className="bg-black/50 text-white px-4 py-3 absolute bottom-0 w-full backdrop-blur-sm">
                <Link to={`/product/${product._id}`}>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm">₹{product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
