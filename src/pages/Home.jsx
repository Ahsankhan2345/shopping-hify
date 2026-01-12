import { motion, useScroll, useSpring } from "framer-motion";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import MissionSection from "../components/MissionSection";

const Home = () => {
  // 1. Scroll Progress Logic (The "Neural Link" line at the top)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-x-hidden bg-[#020617]">
      {/* 2. Top Progress Bar (Emerald Sync) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100] shadow-[0_0_15px_rgba(16,185,129,0.8)]"
        style={{ scaleX }}
      />

      {/* 3. Floating System Status (Visual Detail) */}
      <div className="fixed bottom-10 left-10 z-[50] hidden lg:flex items-center gap-3 bg-slate-900/50 backdrop-blur-md border border-emerald-500/20 px-4 py-2 rounded-full">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
          ShopNova Core: Stable
        </span>
      </div>

      {/* 4. Page Sections */}
      <main>
        {/* Entry Point */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Narrative Section */}
        <section id="about" className="relative">
          {/* Subtle transition gradient between sections */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-transparent z-10" />
          <AboutUsSection />
        </section>

        {/* Vision Section */}
        <section id="mission">
          <MissionSection />
        </section>
      </main>

      {/* 5. Bottom Decorative Glow */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default Home;