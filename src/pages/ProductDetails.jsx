import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  if (!selectedProduct) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <img
          src={selectedProduct.imageUrl}
          alt={selectedProduct.name}
          className="w-full h-96 object-contain rounded border"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {selectedProduct.name}
        </h1>
        <p className="text-emerald-600 text-xl font-bold mb-2">
          Rs. {selectedProduct.price}
        </p>
        <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
        <button
          onClick={() => dispatch(addToCart(selectedProduct))}
          className="bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
