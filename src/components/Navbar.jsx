import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";

const Navbar = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg backdrop-blur-sm">
      
      {/* Left Placeholder (future links) */}
      <div className="flex items-center gap-6">
        {/* left links if needed */}
      </div>

      {/* Center Logo + Name */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition duration-300">
          <img
            src="/logo.png"
            alt="Shopping HIFY Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-extrabold tracking-wide text-emerald-400">
            Shopping HIFY
          </span>
        </Link>
      </div>

      {/* Right Side Links */}
      <div className="flex gap-8 items-center text-sm font-medium">
        <Link
          to="/cart"
          className="relative group hover:text-emerald-300 transition duration-300"
        >
          Cart
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              {totalQty}
            </span>
          )}
          <span className="block h-0.5 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </Link>

        {userInfo ? (
          <>
            <span className="hover:text-emerald-300 transition duration-300">
              Hello, {userInfo.name}
            </span>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  dispatch(logoutUser());
                }
              }}
              className="hover:text-red-400 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-emerald-300 transition duration-300 relative group"
            >
              Login
              <span className="block h-0.5 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
            <Link
              to="/register"
              className="hover:text-emerald-300 transition duration-300 relative group"
            >
              Register
              <span className="block h-0.5 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
