import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiLock, FiUser, FiEye, FiEyeOff, FiCpu, FiAlertTriangle } from "react-icons/fi";

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

  useEffect(() => {
    identifierRef.current?.focus();
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (localError || errorFromSlice) {
      const timer = setTimeout(() => {
        setLocalError("");
        dispatch(clearError());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [localError, errorFromSlice, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setLocalError("Identification required for access.");
      return;
    }
    const resultAction = await dispatch(
      loginUser({ identifier: identifier.trim(), password, remember })
    );
    if (loginUser.rejected.match(resultAction)) {
      setLocalError(resultAction.payload || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 py-8">
      {/* Responsive Neural Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-emerald-500/10 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-emerald-500/5 blur-[80px] md:blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[450px] bg-white/5 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl p-6 sm:p-8 md:p-10 relative z-10"
      >
        {/* Header - Scalable Text */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/20">
            <FiCpu className="text-2xl md:text-3xl" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
            System <span className="text-emerald-500">Access</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium">
            Initialize your ShopNova AI session
          </p>
        </div>

        <AnimatePresence mode="wait">
          {(localError || errorFromSlice) && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-wider"
            >
              <FiAlertTriangle className="flex-shrink-0 text-base" />
              <span className="truncate">{localError || errorFromSlice}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Inputs - Touch friendly heights for mobile */}
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Neural ID / Email
            </label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                ref={identifierRef}
                type="text"
                placeholder="Enter identifier"
                className="w-full pl-11 pr-4 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5 md:space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Security Key
              </label>
              <Link to="/forgot-password" size="sm" className="text-[9px] md:text-[10px] font-black uppercase text-emerald-500 hover:text-emerald-400 tracking-wider">
                Recover?
              </Link>
            </div>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-1"
              >
                {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Checkbox - Improved touch target */}
          <label className="flex items-center gap-3 cursor-pointer group w-fit py-1">
            <div className="relative flex items-center">
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="peer hidden" />
              <div className="w-5 h-5 border-2 border-white/10 rounded-md peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all" />
              <FiCheckCircle className="absolute text-slate-950 opacity-0 peer-checked:opacity-100 left-[2px] w-4 h-4" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-widest">
              Maintain Session
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] text-xs md:text-sm"
          >
            {loading ? "Decrypting..." : "Initialize Access"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 md:my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[8px] md:text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] whitespace-nowrap">External Nodes</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* OAuth Buttons - Stacked on tiny screens, side-by-side on mobile+ */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button className="flex-1 flex justify-center items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl py-3 text-[10px] md:text-xs font-bold text-white transition-all">
            <FcGoogle size={18} /> GOOGLE
          </button>
          <button className="flex-1 flex justify-center items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl py-3 text-[10px] md:text-xs font-bold text-white transition-all">
            <FaGithub size={18} /> GITHUB
          </button>
        </div>

        <p className="mt-8 text-center text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">
          New to the Grid?{" "}
          <Link to="/register" className="text-emerald-500 hover:text-emerald-400 underline decoration-emerald-500/30 underline-offset-4">
            Register Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

const FiCheckCircle = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default Login;