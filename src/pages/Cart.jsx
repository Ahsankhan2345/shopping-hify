import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  incrementQty,
  decrementQty,
} from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiTruck, FiCpu } from "react-icons/fi";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Unified Emerald Accent & Midnight Background
  const accentColor = "emerald-500";
  const midnightSlate = "slate-900";

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 text-center backdrop-blur-xl"
        >
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-emerald-500 text-4xl" />
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tighter">Your Catalog is Empty</h2>
          <p className="text-slate-400 mb-8 max-w-xs">Nova AI is ready to analyze your style. Add some items to begin.</p>
          <Link
            to="/products"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            INITIALIZE SHOPPING
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            Your <span className="text-emerald-500">Nova Cart</span>
            <span className="text-xs bg-slate-900 text-white px-3 py-1 rounded-full">{cartItems.length} Items</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* 1. Item Feed */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
                >
                  <div className="flex items-center gap-6 w-full">
                    <div className="relative w-28 h-28 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 p-2 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-slate-900 text-lg leading-tight mb-1">{item.name}</h3>
                      <p className="text-slate-400 text-sm font-medium mb-2">Ref ID: {item._id.slice(-6).toUpperCase()}</p>
                      <p className="text-emerald-600 font-black text-xl">Rs. {item.price}</p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between w-full md:w-auto gap-8">
                    <div className="flex items-center bg-slate-100 rounded-2xl p-1">
                      <button
                        onClick={() => dispatch(decrementQty(item._id))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-slate-900 transition-all disabled:opacity-30"
                        disabled={item.qty === 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="w-12 text-center font-bold text-slate-900">{item.qty}</span>
                      <button
                        onClick={() => dispatch(incrementQty(item._id))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-slate-900 transition-all"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2"
                    >
                      <FiTrash2 size={24} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 2. Intelligence Summary */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/20 sticky top-28"
            >
              <h2 className="text-xl font-black mb-6 uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <FiCpu /> Intelligence Brief
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-white">Rs. {total}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>AI Logistics</span>
                  <span className="text-emerald-400 underline decoration-dotted underline-offset-4">FREE</span>
                </div>
                <div className="h-[1px] bg-white/10 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-sm uppercase font-black tracking-widest text-slate-500">Total Bill</span>
                  <span className="text-3xl font-black text-emerald-500 leading-none">Rs. {total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-5 rounded-2xl font-black transition-all group"
                >
                  INITIALIZE CHECKOUT <FiTruck className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full text-slate-500 hover:text-white py-2 text-sm font-bold uppercase tracking-widest transition-colors"
                >
                  Reset Feed
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-8 flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="text-emerald-500"><FiCpu size={20}/></div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter leading-tight">
                  Nova AI has optimized your routes for lightning-fast delivery to Lahore.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;