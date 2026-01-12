import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMenu, FiX, FiShoppingBag, FiLogOut, 
  FiCpu, FiActivity, FiAlertTriangle, FiHome 
} from "react-icons/fi";

const Navbar = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalQty = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = () => {
    dispatch(logoutUser());
    setMobileOpen(false);
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-3 md:py-4">
      <div className="max-w-[1600px] mx-auto grid grid-cols-3 items-center">
        
        {/* LEFT SECTION: Branding/Welcome (Desktop) & Menu (Mobile) */}
        <div className="flex items-center gap-4">
          {userInfo && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          )}
          
          {/* Welcome Text - Hidden on Mobile & Tablet, Visible on Large Screens */}
          {userInfo && (
            <div className="hidden lg:flex flex-col border-l border-white/10 pl-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-500 font-black flex items-center gap-1">
                <FiActivity className="animate-pulse" /> AI Core Active
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Welcome, {userInfo.name.split(' ')[0]}
              </span>
            </div>
          )}
        </div>

        {/* CENTER SECTION: Logo (Always Centered) */}
        <div className="flex justify-center">
          <Link to={userInfo ? "/" : "/login"} className="flex items-center gap-2 md:gap-3 group">
            <div className="relative scale-90 md:scale-100">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full"
              />
              <div className="relative bg-emerald-500 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg">
                <FiCpu className="text-slate-900" size={18} />
              </div>
            </div>
            <span className="text-lg md:text-2xl font-black tracking-tighter text-white uppercase">
              SHOP<span className="text-emerald-400 font-light">NOVA</span>
            </span>
          </Link>
        </div>

        {/* RIGHT SECTION: Cart & Logout */}
        <div className="flex items-center justify-end gap-2 md:gap-5">
          {userInfo && (
            <>
              {/* Desktop/Tablet Logout - Hidden on Mobile */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="hidden md:flex items-center gap-2 text-slate-400 hover:text-red-400 text-[10px] font-black transition-colors uppercase tracking-widest"
              >
                <FiLogOut size={16} /> Logout
              </button>

              {/* Cart Button - Universal */}
              <Link to="/cart" className="relative p-2.5 md:p-3 bg-white/5 hover:bg-emerald-500 group rounded-xl md:rounded-2xl transition-all border border-white/5 shadow-inner">
                <FiShoppingBag className="text-emerald-400 group-hover:text-black transition-colors" size={18} />
                {totalQty > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-white text-emerald-900 text-[9px] font-black h-4 w-4 md:h-5 md:w-5 rounded-full flex items-center justify-center shadow-xl border border-emerald-500"
                  >
                    {totalQty}
                  </motion.span>
                )}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 1. CUSTOM LOGOUT MODAL (Responsive Width) */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 backdrop-blur-sm bg-black/60">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1e293b] border border-white/10 w-full max-w-[320px] md:max-w-sm rounded-[2rem] p-6 md:p-10 shadow-2xl text-center"
            >
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <FiLogOut className="text-red-500 text-xl" />
              </div>
              <h3 className="text-white text-lg font-black uppercase tracking-tighter mb-2">End Session?</h3>
              <p className="text-slate-400 text-xs mb-8">Are you sure you want to disconnect from the ShopNova AI network?</p>
              
              <div className="flex flex-col gap-3">
                <button onClick={confirmLogout} className="w-full bg-red-500 text-white py-3.5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:brightness-110 transition-all">Confirm Logout</button>
                <button onClick={() => setShowLogoutConfirm(false)} className="w-full bg-white/5 text-slate-300 py-3.5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. MOBILE MENU OVERLAY (Responsive Drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/80 lg:hidden z-30"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#0f172a] border-r border-white/5 z-40 lg:hidden shadow-2xl"
            >
              <div className="p-6 flex flex-col h-full">
                {/* User Profile Header */}
                <div className="bg-emerald-500/10 p-5 rounded-[2rem] border border-emerald-500/20 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-900 font-black text-lg">
                      {userInfo?.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-bold truncate text-sm">{userInfo?.name}</h4>
                      <p className="text-[9px] text-emerald-400 uppercase font-black tracking-widest">AI Verified</p>
                    </div>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-2 flex-1">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 p-4 rounded-xl text-slate-300 hover:bg-white/5 hover:text-emerald-400 transition-all text-xs font-bold uppercase tracking-widest">
                    <FiHome size={18} /> Home
                  </Link>
                  <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 p-4 rounded-xl text-slate-300 hover:bg-white/5 hover:text-emerald-400 transition-all text-xs font-bold uppercase tracking-widest">
                    <FiShoppingBag size={18} /> Catalog
                  </Link>
                </div>

                {/* Logout at Bottom */}
                <button 
                  onClick={() => { setMobileOpen(false); setShowLogoutConfirm(true); }}
                  className="flex items-center gap-4 p-4 bg-red-500/5 rounded-xl text-red-400 font-black text-xs uppercase tracking-widest mt-auto mb-4 border border-red-500/10"
                >
                  <FiLogOut size={18} /> Terminate
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;