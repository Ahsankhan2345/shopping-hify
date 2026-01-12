import { useEffect, useState, useMemo, useRef } from "react"; // Added useRef
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, FiShoppingBag, FiMessageSquare, FiX, 
  FiTrendingUp, FiHeart, FiFilter, FiPercent, FiArrowRight 
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const DEPARTMENTS = ["All", "Tech", "Fashion", "Wellness", "Home"];

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts = [] } = useSelector((state) => state.products);
  
  // Ref to store references to all product DOM elements
  const productRefs = useRef({});

  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState("All");
  const [sort, setSort] = useState("newest");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { role: 'nova', content: "Hi! Try typing 'Show me a shirt' or 'Find shoes' and I'll take you right to them!" }
  ]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // --- AUTO SCROLL LOGIC ---
  const handleChatCommand = (input) => {
    const text = input.toLowerCase();
    
    // Find a product whose name is mentioned in the chat
    const foundProduct = allProducts.find(p => 
      text.includes(p.name.toLowerCase()) || 
      text.includes(p.category.toLowerCase())
    );

    if (foundProduct && productRefs.current[foundProduct._id]) {
      // Scroll to the specific product card
      productRefs.current[foundProduct._id].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      
      // Add a visual highlight effect (optional)
      productRefs.current[foundProduct._id].classList.add("ring-4", "ring-emerald-500", "ring-offset-4", "ring-offset-[#020617]");
      setTimeout(() => {
        productRefs.current[foundProduct._id].classList.remove("ring-4", "ring-emerald-500");
      }, 3000);

      return `Right away! I've scrolled to the ${foundProduct.name} for you.`;
    }
    return null;
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    const scrollResponse = handleChatCommand(text);
    
    const novaMsg = { 
      role: 'nova', 
      content: scrollResponse || "I'm looking into that for you! Anything else?" 
    };

    setChatHistory(prev => [...prev, userMsg, novaMsg]);
  };

  const filtered = useMemo(() => {
    return allProducts
      .filter((p) => {
        const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
        const matchesDept = activeDept === "All" || p.category === activeDept;
        return matchesSearch && matchesDept;
      })
      .sort((a, b) => {
        if (sort === "price_asc") return a.price - b.price;
        if (sort === "price_desc") return b.price - a.price;
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [allProducts, search, sort, activeDept]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* 1. ANNOUNCEMENT TICKER */}
      <div className="bg-emerald-500/5 border-b border-white/5 py-2 sm:py-3 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-10 sm:gap-20 items-center text-[10px] font-bold uppercase tracking-widest text-emerald-500/80"
        >
          <span><FiTrendingUp className="inline mr-2"/> New Arrivals Just Added</span>
          <span><FiPercent className="inline mr-2"/> Free Shipping on Orders over Rs. 5000</span>
          <span><FiHeart className="inline mr-2"/> Most Loved Products Updated</span>
          <span><FiTrendingUp className="inline mr-2"/> Shop the Latest Trends</span>
        </motion.div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* 2. SEARCH & HERO SECTION */}
        <section className="mb-12 flex flex-col lg:flex-row gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-2/5 bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 relative overflow-hidden"
          >
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FiShoppingBag className="text-black text-xl" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-xl">Nova Store</h2>
                  <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Premium Shopping</p>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6 leading-tight">
                Find exactly what <br /> <span className="text-emerald-400">you're looking for.</span>
              </h3>

              <div className="relative group mb-6">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 text-xl" />
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:border-emerald-500 outline-none transition-all text-white placeholder:text-slate-500 shadow-xl" 
                  placeholder="Search products..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} 
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setIsChatOpen(true)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Ask Assistant</button>
                <button className="flex-1 bg-emerald-500 text-black py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Join Club</button>
              </div>
            </div>
          </motion.div>

          {/* 3. TRENDING SLIDER */}
          <div className="lg:w-3/5 bg-white/5 border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 overflow-hidden relative group">
            <div className="flex justify-between items-center mb-8">
              <span className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <FiTrendingUp className="text-emerald-500"/> Trending Now
              </span>
            </div>

            <div className="flex overflow-hidden relative">
              <motion.div 
                className="flex gap-6 sm:gap-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                whileHover={{ animationPlayState: "paused" }}
              >
                {[...allProducts.slice(0, 6), ...allProducts.slice(0, 6)].map((product, index) => (
                  <motion.div 
                    key={`${product._id}-${index}`}
                    onClick={() => setSelectedProduct(product)}
                    className="min-w-[160px] sm:min-w-[200px] cursor-pointer group"
                  >
                    <div className="bg-white rounded-2xl p-4 sm:p-6 mb-3 aspect-square flex items-center justify-center relative shadow-lg">
                       <img src={product.imageUrl} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-white font-medium text-xs truncate mb-1">{product.name}</p>
                    <p className="text-emerald-400 font-bold text-sm">Rs. {product.price}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. FILTERS */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pt-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0">
            {DEPARTMENTS.map(dept => (
              <button 
                key={dept} 
                onClick={() => setActiveDept(dept)} 
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${activeDept === dept ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-500 border border-white/10'}`}
              >
                {dept}
              </button>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3 w-full md:w-auto">
            <FiFilter className="text-emerald-500" />
            <select onChange={(e) => setSort(e.target.value)} className="bg-transparent text-xs font-bold uppercase outline-none text-white cursor-pointer w-full">
              <option value="newest" className="bg-[#020617]">Newest First</option>
              <option value="price_asc" className="bg-[#020617]">Price: Low to High</option>
              <option value="price_desc" className="bg-[#020617]">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 5. PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filtered.map(product => (
                <motion.div 
                  key={product._id} 
                  layout
                  // Assigning the ref to each product card
                  ref={el => productRefs.current[product._id] = el}
                  onClick={() => setSelectedProduct(product)} 
                  className="group cursor-pointer bg-white/5 border border-white/10 p-5 rounded-[2rem] hover:border-emerald-500/40 transition-all flex flex-col relative"
                >
                    <div className="bg-white rounded-[1.5rem] p-6 mb-4 aspect-square flex items-center justify-center relative overflow-hidden">
                        <img src={product.imageUrl} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                        <button onClick={(e) => toggleFavorite(e, product._id)} className={`absolute top-3 right-3 p-2.5 rounded-xl transition-all ${favorites.includes(product._id) ? 'bg-red-500 text-white' : 'bg-black/5 text-slate-900 hover:bg-emerald-500'}`}>
                            <FiHeart fill={favorites.includes(product._id) ? "currentColor" : "none"} size={16} />
                        </button>
                    </div>
                    <div className="px-1">
                        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-emerald-400 transition-colors line-clamp-1">{product.name}</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">{product.category}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                            <p className="text-xl font-bold text-white">Rs. {product.price}</p>
                            <button 
                              onClick={(e) => { e.stopPropagation(); dispatch(addToCart(product)); }} 
                              className="bg-emerald-500 text-black p-3 rounded-xl hover:scale-105 active:scale-95 transition-all"
                            >
                                <FiShoppingBag size={18}/>
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </main>

      {/* 6. PRODUCT DETAIL DRAWER */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[500] flex items-center justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full sm:max-w-xl h-full bg-[#020617] border-l border-white/10 flex flex-col"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 left-6 z-10 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all">
                <FiX size={20} />
              </button>
              
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 no-scrollbar pt-20">
                <div className="bg-white rounded-3xl p-8 mb-8 flex items-center justify-center">
                   <img src={selectedProduct.imageUrl} className="max-h-64 object-contain" alt="" />
                </div>
                <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">{selectedProduct.category}</span>
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProduct.name}</h2>
                <p className="text-2xl font-bold text-emerald-400 mb-6">Rs. {selectedProduct.price}</p>
                <p className="text-slate-400 leading-relaxed mb-8">
                  {selectedProduct.description || "High quality product designed for durability and style."}
                </p>
              </div>

              <div className="p-6 sm:p-10 bg-white/5 border-t border-white/5">
                <button 
                  onClick={() => { dispatch(addToCart(selectedProduct)); setSelectedProduct(null); }}
                  className="w-full bg-emerald-500 text-black py-4 rounded-2xl font-bold uppercase text-sm flex items-center justify-center gap-3 hover:shadow-lg transition-all"
                >
                  <FiShoppingBag /> Add to My Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. CHAT ASSISTANT */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} 
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 h-[100dvh] sm:h-[500px] bg-[#020617] border-t sm:border border-white/10 sm:rounded-[2rem] shadow-2xl z-[600] flex flex-col"
          >
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-white text-sm">Nova Assistant</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 text-slate-400 hover:text-white"><FiX /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-emerald-500 text-black font-semibold' : 'bg-white/5 text-slate-300'}`}>{msg.content}</div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-black/40">
              <input 
                placeholder="Find 'shirt' or 'shoes'..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-emerald-500 text-white" 
                onKeyDown={(e) => { 
                  if(e.key === 'Enter' && e.target.value) { 
                    sendMessage(e.target.value);
                    e.target.value = ''; 
                  }
                }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)} 
          className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl z-[400] text-black hover:scale-110 active:scale-95 transition-all"
        >
          <FiMessageSquare size={22} />
        </button>
      )}
    </div>
  );
};

export default ProductList;