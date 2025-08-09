import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [orderItems, setOrderItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const receiptRef = useRef();

  useEffect(() => {
    setOrderItems(cartItems);
  }, [cartItems]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxRate = 0.05;
  const taxAmount = total * taxRate;
  const grandTotal = total + taxAmount;

  const handlePlaceOrder = () => {
    if (!paymentMethod || !deliveryMethod) {
      alert("Please select both payment and delivery methods.");
      return;
    }
    setIsPaid(true);
    setOrderPlaced(true);
  };

  const handleClearCartAfterDownload = () => {
    dispatch(clearCart());
  };

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const handleDownloadPDF = () => {
    const input = receiptRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("receipt.pdf");
      handleClearCartAfterDownload();
    });
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty 🛒</h2>
        <Link
          to="/products"
          className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-4 py-10">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6">
        <h1 className="text-4xl font-extrabold text-center text-emerald-500 mb-8">
          {orderPlaced ? "✅ Order Placed!" : "Checkout"}
        </h1>

        {orderPlaced ? (
          <>
            {/* Receipt */}
            <motion.div
              ref={receiptRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-emerald-700">
                    Shopping HIFY
                  </h1>
                  <p className="text-xs text-gray-500">Owned by Ahsan Khan</p>
                  <p className="text-xs text-gray-500">123 Mall Road, Lahore</p>
                  <p className="text-xs text-gray-500">Phone: 0344-0217023</p>
                  <p className="text-xs text-gray-500">
                    Email: support@shoppinghify.com
                  </p>
                </div>
                <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
              </div>

              {/* Invoice Info */}
              <div className="flex justify-between mb-4 text-sm">
                <div>
                  <p><strong>Invoice No:</strong> INV-{Date.now()}</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Customer:</p>
                  <p>Guest User</p>
                </div>
              </div>

              {/* Items */}
              <div className="grid grid-cols-4 gap-2 font-semibold border-t border-b py-2 text-sm">
                <p>Item</p>
                <p className="text-center">Qty</p>
                <p className="text-center">Price</p>
                <p className="text-right">Subtotal</p>
              </div>
              {orderItems.map((item) => (
                <div key={item._id} className="grid grid-cols-4 gap-2 py-2 text-sm border-b last:border-b-0">
                  <p>{item.name}</p>
                  <p className="text-center">{item.qty}</p>
                  <p className="text-center">Rs. {item.price}</p>
                  <p className="text-right">Rs. {item.price * item.qty}</p>
                </div>
              ))}

              {/* Totals */}
              <div className="mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">Subtotal:</span>
                  <span>Rs. {total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Tax (5%):</span>
                  <span>Rs. {taxAmount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2 text-lg font-bold text-emerald-700">
                  <span>{isPaid ? "Total Paid:" : "Total Due:"}</span>
                  <span>Rs. {grandTotal.toFixed(0)}</span>
                </div>
                {isPaid && (
                  <p className="text-green-700 text-center font-semibold mt-2">
                    ✅ Payment Received. Thank you!
                  </p>
                )}
              </div>

              {/* Payment & Delivery */}
              <div className="mt-4 text-sm">
                <p><strong>Payment Method:</strong> {paymentMethod}</p>
                <p><strong>Delivery Method:</strong> {deliveryMethod}</p>
              </div>
              <p className="text-center text-xs text-gray-500 mt-6 italic">
                Thank you for shopping with Shopping HIFY!
              </p>
            </motion.div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 justify-center">
              <button onClick={handlePrint} className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition-transform duration-300 hover:scale-105">
                Print Receipt
              </button>
              <button onClick={handleDownloadPDF} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105">
                Download PDF
              </button>
            </div>
          </>
        ) : (
          /* Checkout Form */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {cartItems.map((item) => (
              <div key={item._id} className="border-b py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain rounded-lg border" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="text-emerald-600 font-bold">
                  Rs. {item.price * item.qty}
                </p>
              </div>
            ))}

            <label className="block text-gray-700 font-medium mt-4 mb-1">Select Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border w-full p-2 rounded mb-4">
              <option value="">-- Select Payment --</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Card">Debit/Credit Card</option>
              <option value="JazzCash / EasyPaisa">JazzCash / EasyPaisa</option>
            </select>

            <label className="block text-gray-700 font-medium mb-1">Select Delivery Method:</label>
            <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} className="border w-full p-2 rounded mb-4">
              <option value="">-- Select Delivery --</option>
              <option value="Standard (3-5 Days)">Standard (3-5 Days)</option>
              <option value="Express (1-2 Days)">Express (1-2 Days)</option>
            </select>

            <h2 className="text-xl font-bold mt-4 text-gray-800">
              Total (incl. Tax): Rs. {grandTotal.toFixed(0)}
            </h2>

            <button onClick={handlePlaceOrder} className="mt-4 w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-transform duration-300 hover:scale-105">
              Place Order
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
