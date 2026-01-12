import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiCpu, FiShield } from "react-icons/fi";

const Footer = () => {
  // Unified Palette: Midnight (#020617) and Emerald (#10b981)
  
  return (
    <footer className="bg-[#020617] text-slate-400 pt-20 pb-10 relative overflow-hidden border-t border-white/5">
      {/* AI Neural Background Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* 1. BRAND INTELLIGENCE (4 Columns) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <FiCpu className="text-slate-900" size={24} />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter">
                SHOP<span className="text-emerald-400">NOVA</span> AI
              </h2>
            </div>
            
            <p className="text-slate-400 leading-relaxed max-w-md">
              Owned and operated by <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Ahsan Khan</span>. 
              Architecting the future of retail through neural product curation and frictionless global logistics.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 hover:text-emerald-400 transition-colors cursor-default group">
                <div className="p-2 rounded-md bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                  <FiMapPin size={16} className="text-emerald-500" />
                </div>
                <span className="text-sm">123 Mall Road, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 hover:text-emerald-400 transition-colors cursor-default group">
                <div className="p-2 rounded-md bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                  <FiPhone size={16} className="text-emerald-500" />
                </div>
                <span className="text-sm">0344-0217023</span>
              </div>
              <div className="flex items-center gap-3 hover:text-emerald-400 transition-colors cursor-default group">
                <div className="p-2 rounded-md bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                  <FiMail size={16} className="text-emerald-500" />
                </div>
                <span className="text-sm font-mono">support@shopnovaai.com</span>
              </div>
            </div>
          </div>

          {/* 2. NAVIGATION NODES (3 Columns) */}
          <div className="md:col-span-3">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500"></div> System Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Intelligence Center", link: "/" },
                { name: "Your Catalog", link: "/cart" },
                { name: "Secure Login", link: "/login" },
                { name: "Initialize Account", link: "/register" },
                { name: "Order History", link: "/orders" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.link}
                    className="text-sm hover:text-emerald-400 transition-all flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. SOCIAL SYNC (4 Columns) */}
          <div className="md:col-span-4 md:text-right flex flex-col md:items-end">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
               Connect Nodes <div className="w-1 h-4 bg-emerald-500"></div>
            </h3>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebook />, url: "https://www.facebook.com/ahsan.khan.857681", color: "hover:bg-blue-600" },
                { icon: <FaInstagram />, url: "https://www.instagram.com/ahsankhan___23/?hl=en", color: "hover:bg-pink-600" },
                { icon: <FaTiktok />, url: "https://www.tiktok.com/@ahsankhan_236", color: "hover:bg-slate-200 hover:text-black" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-white transition-all duration-300 ${social.color} hover:-translate-y-2 shadow-lg`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl md:max-w-[240px]">
               <div className="flex items-center gap-2 text-emerald-400 mb-1">
                 <FiShield size={14} />
                 <span className="text-[10px] font-black uppercase tracking-tighter">Encryption Active</span>
               </div>
               <p className="text-[10px] text-slate-500 leading-tight">
                 All transactions and data nodes are secured with ShopNova's 256-bit AI encryption.
               </p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT BOTTOM */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em]">
          <p className="text-slate-500">
            © {new Date().getFullYear()} <span className="text-emerald-400">ShopNova AI</span>. All Rights Reserved.
          </p>
          <p className="text-slate-500">
            Architected by <span className="text-white">Ahsan Khan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;