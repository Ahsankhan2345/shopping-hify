import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowLeft, FiCpu, FiShield, 
  FiTrendingUp, FiShoppingBag, FiStar, FiHeart, FiTruck, FiCheckCircle
} from "react-icons/fi";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = allProducts.find((p) => (p._id === id || p.id?.toString() === id));

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(fetchProducts());
    }
    window.scrollTo(0, 0);
  }, [dispatch, allProducts.length]);

  if (loading || !product) {
    return <LoadingTerminal />;
  }

  // Pakistani Rupees Logic (Assuming base price is in USD or small units)
  const pkrPrice = product.price * 280; 

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-emerald-500 selection:text-white pb-10">
      
      {/* 1. TOP NAVIGATION (Sticky & Responsive) */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-10 py-3 md:py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-all group"
          >
            <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back
          </button>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">
               Live Inventory
             </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 md:pt-32 lg:pt-40 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
        
        {/* 2. PRODUCT VISUAL MODULE (Responsive Aspect Ratio) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-2xl mx-auto lg:max-w-none"
        >
          <div className="absolute -inset-4 bg-emerald-500/5 rounded-[2rem] md:rounded-[4rem] blur-3xl" />
          
          <div className="relative bg-white rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 lg:p-20 aspect-square flex items-center justify-center border border-white/5 shadow-2xl overflow-hidden">
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              src={product.imageUrl || product.image}
              alt={product.title}
              className="w-full h-full object-contain drop-shadow-2xl z-10"
            />
            
            <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <div className="bg-emerald-50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-emerald-100 shadow-sm">
                    <FiCheckCircle className="text-emerald-600" size={10}/>
                    <span className="text-[8px] font-black text-emerald-900 uppercase tracking-widest">Genuine</span>
                </div>
            </div>
          </div>
        </motion.div>

        {/* 3. PRODUCT INFO PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          {/* Category & Stars */}
          <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[9px] font-black text-emerald-500 uppercase tracking-widest">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 text-amber-400">
              <FiStar fill="currentColor" size={12}/>
              <span className="text-[10px] font-black text-slate-400">4.9 / 5.0</span>
            </div>
          </div>

          {/* Responsive Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-[1.1] md:leading-[0.95] tracking-tighter uppercase italic">
            {product.name || product.title}<span className="text-emerald-500 not-italic">.</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-10 font-medium opacity-80">
            {product.description}
          </p>

          {/* Features Grid (2 columns on small mobile too) */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <FiTruck className="text-emerald-500 mb-2" size={18}/>
              <p className="text-[8px] md:text-[9px] text-slate-500 font-black uppercase mb-0.5">Shipping</p>
              <h4 className="text-white font-bold text-[10px] md:text-xs uppercase">Free in PK</h4>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <FiShield className="text-emerald-500 mb-2" size={18}/>
              <p className="text-[8px] md:text-[9px] text-slate-500 font-black uppercase mb-0.5">Warranty</p>
              <h4 className="text-white font-bold text-[10px] md:text-xs uppercase">12 Months</h4>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Market Valuation</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic">
                    Rs. {pkrPrice.toLocaleString()}
                </span>
                <span className="text-slate-600 line-through text-xs md:text-lg font-bold">
                    Rs. {(pkrPrice * 1.2).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <button
                onClick={() => dispatch(addToCart(product))}
                className="flex-[4] bg-emerald-500 text-slate-950 py-4 md:py-6 rounded-xl md:rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <FiShoppingBag size={18}/> Add to Cart
              </button>
              
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex-1 py-4 md:py-6 rounded-xl md:rounded-2xl border transition-all flex items-center justify-center ${
                    isFavorite 
                    ? 'bg-red-500/10 border-red-500 text-red-500' 
                    : 'bg-white/5 border-white/10 text-white active:bg-white/10'
                }`}
              >
                <FiHeart fill={isFavorite ? "currentColor" : "none"} size={20} />
              </button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center gap-3 opacity-40">
              <FiTrendingUp className="text-emerald-500" size={14}/>
              <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
                Trusted by 5,000+ customers this month
              </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Loading Terminal remains mostly the same, adjusted for mobile size
const LoadingTerminal = () => (
  <div className="h-screen bg-[#020617] flex flex-col items-center justify-center px-6">
    <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="w-16 h-16 md:w-24 md:h-24 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full"
        />
        <FiCpu className="absolute inset-0 m-auto text-emerald-500 animate-pulse" size={24} />
    </div>
    <p className="mt-8 text-emerald-500 font-bold tracking-[0.3em] uppercase text-[8px] md:text-[10px]">
        Syncing Neural Data...
    </p>
  </div>
);

export default ProductDetails;