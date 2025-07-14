  import { useSelector, useDispatch } from "react-redux";
  import {
    removeFromCart,
    clearCart,
    incrementQty,
    decrementQty,
  } from "../redux/slices/cartSlice";
  import { Link } from "react-router-dom";

  function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    if (cartItems.length === 0)
      return <p className="p-4">Your cart is empty.</p>;

    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Cart</h1>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="border p-4 mb-3 rounded bg-white flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-contain rounded border"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">Price: Rs. {item.price}</p>
                <p className="text-gray-600">Quantity: {item.qty}</p>
                <p className="text-emerald-600 font-bold">
                  Subtotal: Rs. {item.price * item.qty}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => dispatch(decrementQty(item._id))}
                disabled={item.qty === 1}
                className={`px-3 py-1 rounded ${
                  item.qty === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                -
              </button>
              <button
                onClick={() => dispatch(incrementQty(item._id))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <h2 className="text-xl font-bold mt-4 text-gray-800">
          Total: Rs. {total}
        </h2>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Clear Cart
          </button>

          <Link
            to="/checkout"
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    );
  }

  export default Cart;
