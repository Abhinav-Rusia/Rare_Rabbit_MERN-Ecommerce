import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCheck, FaTimes } from "react-icons/fa";
import register from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Register = () => {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Validation states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  // Get redirect parameter from URL if it exists
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validate name (only letters and spaces)
  const validateName = (name) => {
    if (!name.trim()) {
      setNameError("Name is required");
      return false;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      setNameError("Name should contain only letters and spaces");
      return false;
    }

    setNameError("");
    return true;
  };

  // Validate email
  const validateEmail = (email) => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  // Check password strength and update indicators
  const checkPasswordStrength = (password) => {
    const strength = {
      hasMinLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    setPasswordStrength(strength);

    // Password must meet at least 4 of the 5 criteria
    const strengthScore = Object.values(strength).filter(Boolean).length;

    if (!password) {
      setPasswordError("Password is required");
      return false;
    }

    if (strengthScore < 4) {
      setPasswordError("Password is too weak");
      return false;
    }

    setPasswordError("");
    return true;
  };

  // Validate confirm password
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  // Validate terms agreement
  const validateTerms = (agreed) => {
    if (!agreed) {
      setTermsError("You must agree to the Terms and Conditions");
      return false;
    }

    setTermsError("");
    return true;
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);

    // If confirm password is not empty, validate it again
    if (confirmPassword) {
      validateConfirmPassword(newPassword, confirmPassword);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = checkPasswordStrength(password);
    const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
    const isTermsAgreed = validateTerms(agreeToTerms);

    // If any validation fails, stop submission
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isTermsAgreed) {
      return;
    }

    // All validations passed, proceed with registration
    try {
      const resultAction = await dispatch(registerUser({ name, email, password }));

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("Registration successful! Please verify your email.");
        // Navigate to verification page with email and redirect info in state
        navigate("/verify-email", {
          state: {
            email,
            redirect,
            isCheckoutRedirect
          }
        });
      } else if (registerUser.rejected.match(resultAction)) {
        const errorMsg = resultAction.payload?.message;

        // Handle specific error cases
        if (errorMsg?.includes("email already exists")) {
          setEmailError("This email is already registered");
        } else {
          toast.error(errorMsg || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
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
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Name :
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => validateName(name)}
              className={`w-full px-3 py-2 border ${nameError ? 'border-red-500' : 'border-gray-500'} rounded-md focus:outline-none focus:border-[#D42935] transition-all`}
              placeholder="Enter your full name..."
              aria-describedby="nameError"
              aria-invalid={!!nameError}
              required
            />
            {nameError && (
              <p id="nameError" className="text-red-500 text-xs mt-1">{nameError}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email :
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-500'} rounded-md focus:outline-none focus:border-[#D42935] transition-all`}
              placeholder="Enter your email address..."
              aria-describedby="emailError"
              aria-invalid={!!emailError}
              required
            />
            {emailError && (
              <p id="emailError" className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password :
            </label>
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-500'} rounded-md focus:outline-none focus:border-[#D42935] transition-all`}
              placeholder="Create a password..."
              aria-describedby="passwordRequirements"
              aria-invalid={!!passwordError}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-gray-600 hover:text-[#D42935]"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {passwordError && (
              <p id="passwordError" className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}

            {/* Password strength indicators */}
            <div id="passwordRequirements" className="mt-2 space-y-1 text-xs">
              <div className="flex items-center">
                <span className={`mr-2 ${passwordStrength.hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                  {passwordStrength.hasMinLength ? <FaCheck /> : <FaTimes />}
                </span>
                <span className={passwordStrength.hasMinLength ? 'text-green-500' : 'text-gray-500'}>
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center">
                <span className={`mr-2 ${passwordStrength.hasUppercase ? 'text-green-500' : 'text-gray-400'}`}>
                  {passwordStrength.hasUppercase ? <FaCheck /> : <FaTimes />}
                </span>
                <span className={passwordStrength.hasUppercase ? 'text-green-500' : 'text-gray-500'}>
                  Contains uppercase letter
                </span>
              </div>
              <div className="flex items-center">
                <span className={`mr-2 ${passwordStrength.hasLowercase ? 'text-green-500' : 'text-gray-400'}`}>
                  {passwordStrength.hasLowercase ? <FaCheck /> : <FaTimes />}
                </span>
                <span className={passwordStrength.hasLowercase ? 'text-green-500' : 'text-gray-500'}>
                  Contains lowercase letter
                </span>
              </div>
              <div className="flex items-center">
                <span className={`mr-2 ${passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                  {passwordStrength.hasNumber ? <FaCheck /> : <FaTimes />}
                </span>
                <span className={passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-500'}>
                  Contains number
                </span>
              </div>
              <div className="flex items-center">
                <span className={`mr-2 ${passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
                  {passwordStrength.hasSpecialChar ? <FaCheck /> : <FaTimes />}
                </span>
                <span className={passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-gray-500'}>
                  Contains special character
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
              Confirm Password :
            </label>
            <input
              id="confirmPassword"
              type={isConfirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(password, e.target.value);
              }}
              className={`w-full px-3 py-2 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-500'} rounded-md focus:outline-none focus:border-[#D42935] transition-all`}
              placeholder="Confirm your password..."
              aria-describedby="confirmPasswordError"
              aria-invalid={!!confirmPasswordError}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-gray-600 hover:text-[#D42935]"
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              aria-label={isConfirmPasswordVisible ? "Hide password" : "Show password"}
            >
              {isConfirmPasswordVisible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {confirmPasswordError && (
              <p id="confirmPasswordError" className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="mb-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    validateTerms(e.target.checked);
                  }}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  aria-describedby="termsError"
                  aria-invalid={!!termsError}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I agree to the <a href="#" className="font-medium text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="font-medium text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>
            {termsError && (
              <p id="termsError" className="text-red-500 text-xs mt-1">{termsError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-live="polite"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Link to Login */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-[#D42935] font-semibold underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 relative h-screen">
        <LazyLoadImage
          src={register}
          alt="Register to get started"
          effect="blur"
          wrapperClassName="w-full h-full"
          className="w-full h-full object-cover"
          placeholderSrc="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzIDIiPjwvc3ZnPg=="
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 bg-opacity-40" />

        {/* Centered Quote */}
        <div className="absolute inset-0 flex items-center justify-center text-white px-6">
          <h3
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)" }}
            className="text-xl font-bold italic text-center text-indigo-900"
            aria-live="polite"
          >
            Start your journey with confidence.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Register;
