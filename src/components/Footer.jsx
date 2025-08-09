import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-700/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 border-b border-gray-800 pb-12 relative z-10">
        {/* BRAND + DESCRIPTION */}
        <div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 mb-5 drop-shadow-lg">
            Shopping HIFY
          </h2>
          <p className="text-gray-400 mb-5 leading-relaxed max-w-sm">
            Owned and operated by <span className="font-semibold text-emerald-400">Ahsan Khan</span>.  
            Bringing you a seamless shopping experience with amazing deals, quality products,  
            and lightning-fast delivery.
          </p>
          <div className="space-y-1 text-sm text-gray-500">
            <p>📍 123 Mall Road, Lahore, Pakistan</p>
            <p>📞 0344-0217023</p>
            <p>✉ support@shoppinghify.com</p>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-emerald-500 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", link: "/" },
              { name: "Cart", link: "/cart" },
              { name: "Login", link: "/login" },
              { name: "Register", link: "/register" },
              { name: "Orders", link: "/orders" },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.link}
                  className="relative inline-block hover:text-emerald-400 transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex flex-col items-start md:items-end">
          <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-emerald-500 inline-block pb-1">
            Follow Us
          </h3>
          <div className="flex gap-5">
            <a
              href="https://www.facebook.com/ahsan.khan.857681"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 text-3xl transition-transform transform hover:scale-125 hover:rotate-6"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/ahsankhan___23/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 text-3xl transition-transform transform hover:scale-125 hover:-rotate-6"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@ahsankhan_236"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-3xl transition-transform transform hover:scale-125 hover:rotate-3"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <p className="text-center text-gray-500 mt-10 text-sm relative z-10">
        © {new Date().getFullYear()}{" "}
        <span className="text-emerald-400 font-semibold">Shopping HIFY</span>.  
        Powered by <span className="font-semibold text-white">Ahsan Khan</span>.
      </p>
    </footer>
  );
};

export default Footer;
