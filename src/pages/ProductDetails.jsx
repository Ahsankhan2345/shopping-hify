import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { motion } from "framer-motion";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  const product = allProducts.find((p) => p._id === id);

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-lg">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-24">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <h1 className="text-4xl font-extrabold text-emerald-400 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-emerald-600 mb-6">
            Rs. {product.price}
          </p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:from-emerald-600 hover:to-emerald-800 transform hover:scale-105 transition-all duration-300"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetails;
