import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  incrementQty,
  decrementQty,
} from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty 🛒</h2>
        <Link
          to="/products"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-5 hover:shadow-2xl transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Product Info */}
              <div className="flex items-center gap-5 w-full sm:w-auto">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-lg border bg-white shadow-sm transform transition-transform duration-300 hover:scale-105"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-gray-600">Price: Rs. {item.price}</p>
                  <p className="text-emerald-600 font-bold">
                    Subtotal: Rs. {item.price * item.qty}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrementQty(item._id))}
                  disabled={item.qty === 1}
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ${
                    item.qty === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  -
                </button>
                <span className="px-3 py-1 bg-gray-100 rounded-lg">
                  {item.qty}
                </span>
                <button
                  onClick={() => dispatch(incrementQty(item._id))}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 shadow-sm transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Order Summary Box */}
        <motion.div
          className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg h-fit sticky top-20"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between text-lg mb-4">
            <span>Total Items:</span>
            <span className="font-semibold">{cartItems.length}</span>
          </div>
          <div className="flex justify-between text-lg mb-6">
            <span>Total Price:</span>
            <span className="font-bold text-emerald-600">Rs. {total}</span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-sm hover:scale-105"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Cart;
