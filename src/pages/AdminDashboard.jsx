import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);

  const handleDelete = (id) => {
    alert(`Deleted product ID: ${id}`);
    // Redux se remove nahi kar rahe abhi kyunki dummy data hai
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {allProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        allProducts.map((product) => (
          <div key={product._id} className="border p-3 mb-2 rounded bg-white flex justify-between">
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p>Price: Rs. {product.price}</p>
              <p>{product.description}</p>
            </div>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
