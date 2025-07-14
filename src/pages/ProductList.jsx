import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";

function ProductList() {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {allProducts.map((product) => (
        <div
          key={product._id}
          className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 object-contain p-4"
          />
          <div className="px-4 pb-4">
            <h3 className="text-lg font-bold text-gray-800 h-12 overflow-hidden">
              {product.name}
            </h3>
            <p className="text-emerald-600 font-bold mt-2">
              Rs. {product.price}
            </p>
            <Link
              to={`/product/${product._id}`}
              className="text-sm text-blue-600 hover:underline mt-2 block"
            >
              View Details
            </Link>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-3 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
