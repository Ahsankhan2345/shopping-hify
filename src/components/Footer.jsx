import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 border-b border-gray-700 pb-10">
        {/* BRAND + DESCRIPTION */}
        <div>
          <h2 className="text-3xl font-extrabold text-emerald-400 mb-4">
            Shopping HIFY
          </h2>
          <p className="text-gray-400 mb-4 max-w-sm">
            Owned and operated by Ahsan Khan. Bringing you a seamless shopping
            experience with great deals, quality products, and lightning-fast delivery.
          </p>
          <p className="text-sm text-gray-500">
            Address: 123 Mall Road, Lahore, Pakistan
          </p>
          <p className="text-sm text-gray-500">Phone: 0344-0217023</p>
          <p className="text-sm text-gray-500">Email: support@shoppinghify.com</p>
        </div>

        {/* QUICK LINKS (optional) */}
        <div className="flex flex-col gap-2 mt-8 md:mt-0">
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <a
            href="/"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/cart"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Cart
          </a>
          <a
            href="/login"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Login
          </a>
          <a
            href="/register"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Register
          </a>
          <a
            href="/orders"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Orders
          </a>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="mt-8 md:mt-0 flex md:justify-end items-center gap-6">
          <a
            href="#"
            className="text-gray-400 hover:text-emerald-400 text-3xl transition duration-300 transform hover:scale-110"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-emerald-400 text-3xl transition duration-300 transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-emerald-400 text-3xl transition duration-300 transform hover:scale-110"
          >
            <FaTiktok />
          </a>
        </div>
      </div>

      <p className="text-center text-gray-600 mt-8 text-sm">
        © {new Date().getFullYear()} Shopping HIFY. Powered by Ahsan Khan.
      </p>
    </footer>
  );
};

export default Footer;
