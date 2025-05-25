import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../redux/slices/authSlice";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState("/");
  const [isCheckoutRedirect, setIsCheckoutRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, verificationStatus, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Get email and redirect info from location state if available
    if (location.state) {
      if (location.state.email) {
        setEmail(location.state.email);
      }
      if (location.state.redirect) {
        setRedirect(location.state.redirect);
      }
      if (location.state.isCheckoutRedirect) {
        setIsCheckoutRedirect(location.state.isCheckoutRedirect);
      }
    }
  }, [location]);

  // Monitor verification status changes
  useEffect(() => {
    if (verificationStatus === 'success') {
      toast.success("Email verified successfully!");
      // Redirect based on where the user came from
      if (isCheckoutRedirect) {
        navigate("/checkout");
      } else if (redirect && redirect !== "/") {
        navigate(redirect);
      } else {
        navigate("/");
      }
    } else if (verificationStatus === 'failed' && error) {
      toast.error(error || "Failed to verify email. Please try again.");
    }
  }, [verificationStatus, error, navigate, redirect, isCheckoutRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      toast.error("Please enter the verification code");
      return;
    }

    dispatch(verifyEmail(verificationCode));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 id="logo" className="text-xl tracking-widest text-[#D42935] text-center">
            Rare Rabbit
          </h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {email ? (
              <>
                We've sent a verification code to <strong>{email}</strong>
              </>
            ) : (
              "Please enter the verification code sent to your email"
            )}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="verification-code" className="sr-only">
                Verification Code
              </label>
              <input
                id="verification-code"
                name="code"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter 6-digit verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate(`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Back to Login
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
