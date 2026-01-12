import { motion } from "framer-motion";
import { FiCpu, FiTarget, FiZap, FiShield, FiTrendingUp } from "react-icons/fi";

const AboutUsSection = () => {
  return (
    <section className="relative pt-20 pb-40 md:pt-32 md:pb-52 bg-[#fcfdfe] overflow-hidden">
      
      {/* 1. Background Decorative Elements (Shades) */}
      <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-gradient-to-l from-emerald-50/60 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-emerald-100/40 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* TEXT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6 md:space-y-8"
          >
            <div className="space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] md:text-xs font-black tracking-widest uppercase">
                <FiCpu className="animate-pulse" /> The Nova Intelligence
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] lg:leading-[0.95]">
                Engineering the <br className="hidden md:block" /> 
                <span className="text-emerald-500 italic">Future of Commerce.</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Founded on the vision of <span className="text-slate-900 font-bold">Ahsan Khan</span>, Shopnova AI isn't just a marketplace—it's a smart shopping ecosystem designed to bring you exactly what you need.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-200">
                  <FiTarget size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Smart Discovery</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our system learns your preferences to show you items you'll actually love.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-4 shadow-lg shadow-slate-200">
                  <FiTrendingUp size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Market Speed</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Real-time tracking ensures you get the best prices across the globe instantly.
                </p>
              </div>
            </div>

            {/* Trust Indicator */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 text-center sm:text-left">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" />
                    </div>
                  ))}
               </div>
               <p className="text-xs md:text-sm text-slate-500 font-medium">
                  Trusted by <span className="text-slate-900 font-bold">12,000+</span> active shoppers <br className="hidden sm:block" /> powered by Nova Intelligence.
               </p>
            </div>
          </motion.div>

          {/* VISUAL CONTENT */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Main Image Frame - Optimized for Mobile Padding */}
            <div className="relative z-10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] border-[8px] md:border-[12px] border-white bg-white">
              <img
                src="/about-us.png"
                alt="AI Hub Interface"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
              />
              
              {/* Floating Tag - Compact on Mobile */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-slate-900/90 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-emerald-400 text-[8px] md:text-[10px] font-black uppercase tracking-tighter">System Status</p>
                  <p className="text-white text-xs md:text-base font-bold">Core Performance: Optimal</p>
                </div>
                <div className="flex gap-1">
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="w-1 md:w-1.5 h-4 md:h-6 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                   ))}
                </div>
              </div>
            </div>

            {/* Decorative Glows */}
            <div className="absolute -top-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-emerald-200 blur-[80px] md:blur-[100px] opacity-40 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* 2. SECTION MERGER (The "Wave" Shade) */}
      {/* Yeh part neeche wale Mission section (Dark) ke saath merge karta hai */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
        <svg 
          className="relative block w-full h-[80px] md:h-[150px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C49.1,15.17,117.58,38.16,183.19,45.92A458.06,458.06,0,0,0,321.39,56.44Z" 
            className="fill-[#020617]" // This matches your Mission Section background color
          ></path>
        </svg>
      </div>

    </section>
  );
};

export default AboutUsSection;