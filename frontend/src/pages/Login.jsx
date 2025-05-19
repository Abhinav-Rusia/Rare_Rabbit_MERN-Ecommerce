import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import login from "../assets/login.webp";

import { loginUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
  };

  return (
    <div className="flex">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-6">
            <h2 id="logo" className="text-xl tracking-widest text-[#D42935]">
              Rare Rabbit
            </h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey There! 👋🏻</h2>
          <p className="text-center mb-6">
            Enter your email address and password to sign in.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email :
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-[#D42935] transition-all"
              placeholder="Enter your email..."
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password :
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-[#D42935] transition-all"
              placeholder="Enter your password..."
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-gray-600 hover:text-[#D42935]"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition mt-4"
          >
            Sign In
          </button>

          {/* Link to Register */}
          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#D42935] font-semibold underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 relative h-screen">
        <img
          src={login}
          alt="Register to get started"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 bg-opacity-40" />

        {/* Centered Quote */}
        <div className="absolute inset-0 flex items-center justify-center text-white px-6">
          <h3
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            className="text-xl text-[#fca5a5] font-bold italic text-center"
          >
            Your space. Your vibe. Your Rare Rabbit.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
