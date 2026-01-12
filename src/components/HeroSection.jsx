import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiCpu } from "react-icons/fi";

const TECH_DEMO_VIDEOS = [
  "https://www.youtube.com/watch?v=xbvkdPhfzwU",
  "https://www.youtube.com/watch?v=8s4rMKP_K84",
  "https://www.youtube.com/watch?v=XalhKVHFLSU",
  "https://www.youtube.com/watch?v=GCH7IzkPsj0",
  "https://www.youtube.com/watch?v=ALYtpS8x9YM"
];

function HeroSection() {
  const videoRef = useRef(null);
  const [randomDemoUrl, setRandomDemoUrl] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * TECH_DEMO_VIDEOS.length);
    setRandomDemoUrl(TECH_DEMO_VIDEOS[randomIndex]);

    const vid = videoRef.current;
    if (vid) {
      vid.play().catch(() => console.warn("Background stream optimized."));
    }
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-slate-950">
      
      {/* 1. Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-[1.05] opacity-50 md:opacity-60 transition-opacity duration-1000"
          autoPlay muted loop playsInline preload="auto"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlays for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay" />
      </div>

      {/* 2. Content Interface */}
      <section className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 md:px-6">
        
        {/* AI Badge - Smaller on Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4 md:mb-6 flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md"
        >
          <FiCpu className="text-emerald-400 animate-pulse text-sm md:text-base" />
          <span className="text-[8px] md:text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">
            Neural Engine Online
          </span>
        </motion.div>

        {/* Main Title - Responsive sizing from 4xl to 8xl */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter max-w-[95%] md:max-w-6xl leading-[1.1] md:leading-[0.95]"
        >
          Shop at the <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-100 to-emerald-500">
            Speed of Future.
          </span>
        </motion.h1>

        {/* Subtext - Max width controlled for readability */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-400 text-sm md:text-lg lg:text-xl font-medium max-w-[320px] sm:max-w-lg md:max-w-2xl mb-8 md:mb-10 leading-relaxed"
        >
          Experience ShopNova AI — the world's most advanced retail interface. 
          Your style, analyzed and delivered in real-time.
        </motion.p>

        {/* Action Controls - Stacked on Mobile, Row on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0"
        >
          <Link
            to="/products"
            className="group relative flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] active:scale-95 text-sm md:text-base"
          >
            <FiZap className="group-hover:animate-bounce" />
            ENTER THE NOVA ZONE
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
          
          <a 
            href={randomDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center text-sm md:text-base"
          >
            WATCH TECH DEMO
          </a>
        </motion.div>

        {/* Dynamic Data Counters - Hidden on small Mobile screens */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 md:bottom-12 left-0 right-0 hidden sm:flex justify-center gap-6 md:gap-16 px-4"
        >
          {[
            { label: "Processing Speed", val: "0.04ms" },
            { label: "Active Nodes", val: "1,204" },
            { label: "Catalog Sync", val: "99.9%" }
          ].map((stat, i) => (
            <div key={i} className="text-left border-l border-emerald-500/30 pl-3 md:pl-4">
              <div className="text-[8px] md:text-[10px] text-slate-500 uppercase font-bold tracking-widest">{stat.label}</div>
              <div className="text-emerald-400 font-mono font-bold text-xs md:text-base">{stat.val}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. Scan-line Effect */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="w-full h-[1px] bg-emerald-500/10 absolute animate-scanline" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scanline {
          animation: scanline 10s linear infinite;
        }
      `}} />
    </div>
  );
}

export default HeroSection;