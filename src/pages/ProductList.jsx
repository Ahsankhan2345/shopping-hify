import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

function ProductList() {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtering & Sorting
  const filtered = (Array.isArray(allProducts) ? allProducts : [])
    .filter((p) =>
      p.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "newest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-emerald-400 text-lg animate-pulse">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {userInfo && (
            <motion.h2
              className="text-2xl font-semibold text-emerald-300 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              👋 Welcome back, <span className="text-white">{userInfo.name}</span>!
            </motion.h2>
          )}
          <h1 className="text-5xl font-extrabold text-emerald-400 drop-shadow-lg tracking-wide">
            Explore Your Shopping
          </h1>
          <p className="mt-3 text-lg text-emerald-200 max-w-md leading-relaxed">
            Discover our latest collection. Search, filter, and start adding your favorites to the cart.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-full bg-white/95 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm w-56 transition-all hover:shadow-lg"
            />
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white/95 py-2 pl-4 pr-10 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-52 transition-all hover:shadow-lg"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
          </div>
        </motion.div>
      </div>

      {/* Product Grid */}
      <motion.div
        className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {filtered.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white/90 backdrop-blur rounded-2xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-full h-56 flex items-center justify-center overflow-hidden bg-white">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="px-5 pb-5">
              <h3 className="text-lg font-bold text-gray-800 h-12 overflow-hidden">
                {product.name}
              </h3>
              <p className="text-emerald-600 font-bold mt-2">
                Rs. {product.price}
              </p>
              <Link
                to={`/product/${product._id}`}
                className="text-sm text-emerald-600 hover:underline mt-2 block"
              >
                View Details
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(addToCart(product))}
                className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-2 rounded-lg shadow-md hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProductList;
