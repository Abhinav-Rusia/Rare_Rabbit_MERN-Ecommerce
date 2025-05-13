import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import register from "../assets/register.webp";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your Register logic here
    console.log("Register with:", { name, email, password });
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
          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome Aboard! 🚀
          </h2>
          <p className="text-center mb-6">
            Enter your details below to create your account.
          </p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Name :
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-[#D42935] transition-all"
              placeholder="Enter your full name..."
              required
            />
          </div>

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
              placeholder="Enter your email address..."
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
              placeholder="Create a password..."
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
            Sign Up
          </button>

          {/* Link to Login */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#D42935] font-semibold underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 relative h-screen">
        <img
          src={register}
          alt="Register to get started"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 bg-opacity-40" />

        {/* Centered Quote */}
        <div className="absolute inset-0 flex items-center justify-center text-white px-6">
          <h3
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)" }}
            className="text-xl font-bold italic text-center text-indigo-900"
          >
            Start your journey with confidence.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Register;
