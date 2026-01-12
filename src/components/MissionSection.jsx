import { motion } from "framer-motion";
import { FiHeart, FiGlobe, FiZap, FiTarget } from "react-icons/fi";

const MissionSection = () => {
  const midnightBg = "bg-[#020617]";

  return (
    <section className={`relative w-full min-h-screen flex items-center overflow-hidden py-24 md:py-32 ${midnightBg}`}>
      
      {/* 1. Seamless Transition Shade (Top & Bottom) */}
      {/* Yeh div Hero section aur iske darmiyan ek smooth gradient banata hai */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#020617] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#020617] to-transparent z-10" />

      {/* 2. Cinematic Background with Masking */}
      <div className="absolute inset-0 z-0">
        <video
          src="/mission-video.mp4"
          autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-20 md:opacity-40 brightness-[0.4] scale-110"
        />
        {/* Radial Overlay: Isse edges dark rahengi aur center focus mein rahega */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#020617_90%)]" />
      </div>

      {/* 3. Content Overlay */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        {/* Visual Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative group w-full max-w-[480px]">
            {/* Ambient Glow behind image */}
            <div className="absolute -inset-4 bg-emerald-500/10 blur-[80px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
              <img
                src="/mission-bg.jpg"
                alt="Premium Shopping Experience"
                className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-500/20">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" />
                 <span className="text-[10px] font-bold text-emerald-400 tracking-[0.2em] uppercase">Nova Experience</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 text-emerald-400/80 font-bold text-xs uppercase tracking-[0.4em]">
              <span className="w-8 h-[1px] bg-emerald-400/40"></span>
              Our Philosophy
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]">
              Designed for <br className="hidden sm:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-700">
                Your Lifestyle.
              </span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto md:mx-0 leading-relaxed">
              Experience a world where premium quality meets effortless discovery. We’ve reimagined shopping to be as unique as you are.
            </p>
          </motion.div>

          {/* Benefits */}
          <ul className="grid grid-cols-1 gap-8">
            {[
              { 
                icon: <FiHeart />, 
                title: "Thoughtfully Curated",
                text: "Every item in our collection is chosen to complement your personal taste." 
              },
              { 
                icon: <FiZap />, 
                title: "Seamless Journey",
                text: "From browsing to unboxing, we've removed every hurdle for your peace of mind." 
              }
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex items-start gap-6 group"
              >
                <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-500">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-xl tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {item.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Quote / Sign-off */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-6 border-t border-white/5"
          >
            <p className="text-emerald-400/60 font-medium italic text-sm md:text-base leading-relaxed">
              "We don't just follow trends; we help you find what truly resonates with your story."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Texture for Cohesion */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150" />
    </section>
  );
};

export default MissionSection;