import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/userSlice";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);
  const errorFromSlice = useSelector((state) => state.user.error);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [localError, setLocalError] = useState("");

  const identifierRef = useRef(null);

  // focus input on mount
  useEffect(() => {
    identifierRef.current?.focus();
  }, []);

  // Redirect after login -> home page
  useEffect(() => {
    if (userInfo) {
      setIdentifier("");
      setPassword("");
      navigate("/", { replace: true });
    }
  }, [userInfo, navigate]);

  // Clear error when typing
  useEffect(() => {
    if (localError || errorFromSlice) {
      const timer = setTimeout(() => {
        setLocalError("");
        dispatch(clearError());
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [localError, errorFromSlice, dispatch]);

  const validate = () => {
    if (!identifier.trim() || !password)
      return "Both identifier and password are required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vErr = validate();
    if (vErr) {
      setLocalError(vErr);
      return;
    }
    const resultAction = await dispatch(
      loginUser({ identifier: identifier.trim(), password, remember })
    );

    if (loginUser.rejected.match(resultAction)) {
      setLocalError(resultAction.payload || "Login failed. Please try again.");
    }
  };

  // Mock Google / GitHub login
  const handleOAuth = (provider) => {
    if (loading) return;
    alert(`${provider} login not implemented. Use Firebase/Auth0 for real login.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-3xl" />

        <h2 className="text-3xl font-extrabold text-gray-900 mb-1 text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Sign in to continue to{" "}
          <span className="font-medium text-emerald-500">Shopping HIFY</span>
        </p>

        {(localError || errorFromSlice) && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 flex items-center gap-2">
            <span className="text-sm">{localError || errorFromSlice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              ref={identifierRef}
              id="identifier"
              type="text"
              placeholder="Email or username"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setLocalError("");
                dispatch(clearError());
              }}
              disabled={loading}
              required
            />
            <label
              htmlFor="identifier"
              className="absolute left-4 -top-2 bg-white px-1 text-xs font-medium text-gray-600"
            >
              Email or Username
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((r) => !r)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-emerald-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:brightness-105 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs uppercase text-gray-400">or continue with</span>
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
            Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("GitHub")}
            disabled={loading}
            className="flex-1 flex justify-center items-center gap-2 border border-gray-200 rounded-xl py-2 text-sm hover:shadow-md transition disabled:opacity-60"
          >
            <FaGithub className="w-5 h-5" />
            GitHub
          </button>
        </div>

        <p className="mt-1 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-emerald-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
