import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/slices/userSlice";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const nameRef = useRef(null);

  // Focus on first input when page loads
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // Redirect to home page after signup
  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [userInfo, navigate]);

  // Auto-clear error after 2.5s
  useEffect(() => {
    if (localError || error) {
      const timer = setTimeout(() => {
        setLocalError("");
        dispatch(clearError());
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [localError, error, dispatch]);

  const validate = () => {
    if (!name.trim() || !email.trim() || !password) {
      return "All fields are required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vErr = validate();
    if (vErr) {
      setLocalError(vErr);
      return;
    }
    try {
      await dispatch(registerUser({ name: name.trim(), email, password }));
    } catch {
      // error handled in slice
    }
  };

  const handleOAuth = (provider) => {
    if (loading) return;
    alert(`${provider} signup not implemented. Integrate Firebase/Auth0 for real auth.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-3xl" />

        <h2 className="text-3xl font-extrabold text-gray-900 mb-1 text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Sign up to <span className="font-medium text-emerald-500">Shopping HIFY</span> and start your journey.
        </p>

        {(localError || error) && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 flex items-center gap-2">
            <span className="text-sm">{localError || error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              ref={nameRef}
              id="name"
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setLocalError("");
                dispatch(clearError());
              }}
              disabled={loading}
              required
            />
            <label
              htmlFor="name"
              className="absolute left-4 -top-2 bg-white px-1 text-xs font-medium text-gray-600"
            >
              Username
            </label>
          </div>

          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLocalError("");
                dispatch(clearError());
              }}
              disabled={loading}
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-2 bg-white px-1 text-xs font-medium text-gray-600"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition pr-12"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLocalError("");
                dispatch(clearError());
              }}
              disabled={loading}
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-2 bg-white px-1 text-xs font-medium text-gray-600"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              aria-label={showPwd ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:brightness-105 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs uppercase text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuth("Google")}
            disabled={loading}
            className="flex-1 flex justify-center items-center gap-2 border border-gray-200 rounded-xl py-2 text-sm hover:shadow-md transition disabled:opacity-60"
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("GitHub")}
            disabled={loading}
            className="flex-1 flex justify-center items-center gap-2 border border-gray-200 rounded-xl py-2 text-sm hover:shadow-md transition disabled:opacity-60"
          >
            <FaGithub className="w-5 h-5" />
            Sign up with GitHub
          </button>
        </div>

        <p className="mt-1 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
