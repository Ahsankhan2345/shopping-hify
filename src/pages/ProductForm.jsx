import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlusCircle, FiDollarSign, FiType, FiFileText, FiUploadCloud, FiCpu } from "react-icons/fi";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate Data Injection
    console.log("Injecting Data Chunk →", { name, price, desc });
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setPrice("");
      setDesc("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-8">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
      >
        {/* Decorative Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-500 border border-emerald-500/20">
            <FiPlusCircle size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Inventory <span className="text-emerald-500">Injection</span></h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Add new module to ShopNova database</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Module Identity</label>
            <div className="relative group">
              <FiType className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Ex: Quantum Processor X1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Acquisition Cost (PKR)</label>
              <div className="relative group">
                <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Placeholder for Image Upload UI */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Visual Asset</label>
              <button type="button" className="w-full bg-white/5 border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-2xl py-4 flex items-center justify-center gap-2 text-slate-500 hover:text-emerald-400 transition-all">
                <FiUploadCloud />
                <span className="text-xs font-bold uppercase">Upload Media</span>
              </button>
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Technical Specs / Description</label>
            <div className="relative group">
              <FiFileText className="absolute left-4 top-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <textarea
                placeholder="Describe the module's neural capabilities..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-medium resize-none"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
          >
            <FiPlusCircle size={20} /> Deploy Module
          </button>
        </form>

        {/* Success Overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-emerald-500 flex flex-col items-center justify-center z-50 text-slate-950"
            >
              <FiCpu size={60} className="animate-spin-slow mb-4" />
              <h2 className="text-4xl font-black uppercase tracking-tighter">Sync Successful</h2>
              <p className="font-bold opacity-80 mt-2 tracking-widest uppercase text-xs">Database updated</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductForm;