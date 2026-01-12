import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/slices/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiLock, FiUser, FiMail, FiEye, FiEyeOff, FiUserPlus, FiAlertTriangle } from "react-icons/fi";

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

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (localError || error) {
      const timer = setTimeout(() => {
        setLocalError("");
        dispatch(clearError());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [localError, error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setLocalError("All neural fields are required for registration.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Security key must be at least 6 characters.");
      return;
    }
    dispatch(registerUser({ name: name.trim(), email, password }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 py-12">
    
      <div className="absolute top-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-emerald-500/10 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-emerald-500/5 blur-[80px] md:blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl p-6 sm:p-10 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/20">
            <FiUserPlus className="text-2xl md:text-3xl" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
            Join the <span className="text-emerald-500">Grid</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium">
            Create your ShopNova AI profile
          </p>
        </div>

        <AnimatePresence mode="wait">
          {(localError || error) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-wider"
            >
              <FiAlertTriangle className="flex-shrink-0" />
              <span>{localError || error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        
          <div className="space-y-1.5">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Username
            </label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                ref={nameRef}
                type="text"
                placeholder="Unique identifier"
                className="w-full pl-11 pr-4 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

        <div className="space-y-1.5">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Neural Mail
            </label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full pl-11 pr-4 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Security Key
            </label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] text-xs md:text-sm mt-2"
          >
            {loading ? "Syncing..." : "Create Profile"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[8px] md:text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] whitespace-nowrap">Rapid Access</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex justify-center items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl py-3 text-[10px] font-bold text-white transition-all uppercase tracking-widest">
            <FcGoogle size={18} /> Google
          </button>
          <button className="flex-1 flex justify-center items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl py-3 text-[10px] font-bold text-white transition-all uppercase tracking-widest">
            <FaGithub size={18} /> GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">
          Already synced?{" "}
          <Link to="/login" className="text-emerald-500 hover:text-emerald-400 underline decoration-emerald-500/30 underline-offset-4">
            Login Access
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;