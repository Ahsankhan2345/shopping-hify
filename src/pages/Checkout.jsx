import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Local copy for receipt
  const [orderItems, setOrderItems] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const receiptRef = useRef();

  useEffect(() => {
    setOrderItems(cartItems);
  }, [cartItems]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

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
    // NOTE: Don't clear cart yet - keep for receipt
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

  if (cartItems.length === 0 && !orderPlaced)
    return <p className="p-4">Your cart is empty. Nothing to checkout.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        {orderPlaced ? "✅ Order Placed!" : "Checkout"}
      </h1>

      {orderPlaced ? (
        <>
          <div
            ref={receiptRef}
            className="p-6 border rounded-md bg-white text-gray-800 font-sans"
          >
            {/* Company Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <h1 className="text-2xl font-extrabold text-emerald-700">
                  Shopping HIFY
                </h1>
                <p className="text-xs text-gray-500">
                  Owned by Ahsan Khan
                </p>
                <p className="text-xs text-gray-500">
                  123 Mall Road, Lahore
                </p>
                <p className="text-xs text-gray-500">
                  Phone: 0344-0217023
                </p>
                <p className="text-xs text-gray-500">
                  Email: support@shoppinghify.com
                </p>
              </div>
              <img
                src="/logo.png"
                alt="Logo"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Invoice Details */}
            <div className="flex justify-between mb-4 text-sm">
              <div>
                <p>
                  <span className="font-semibold">Invoice No:</span>{" "}
                  INV-{Date.now()}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date().toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Customer:</p>
                <p>Guest User</p>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-4 gap-2 font-semibold border-t border-b py-2 text-sm">
              <p>Item</p>
              <p className="text-center">Qty</p>
              <p className="text-center">Price</p>
              <p className="text-right">Subtotal</p>
            </div>

            {/* Items from local orderItems */}
            {orderItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-4 gap-2 py-2 text-sm border-b last:border-b-0"
              >
                <p>{item.name}</p>
                <p className="text-center">{item.qty}</p>
                <p className="text-center">Rs. {item.price}</p>
                <p className="text-right">
                  Rs. {item.price * item.qty}
                </p>
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
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Delivery Method:</span>{" "}
                {deliveryMethod}
              </p>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-6 italic">
              Thank you for shopping with Shopping HIFY!
            </p>
          </div>

          {/* Print & PDF Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
            >
              Print Receipt
            </button>

            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Cart Summary */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border p-3 mb-3 rounded flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-contain border rounded"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">Qty: {item.qty}</p>
                </div>
              </div>
              <p className="text-emerald-600 font-bold">
                Rs. {item.price * item.qty}
              </p>
            </div>
          ))}

          {/* Payment Method */}
          <label className="block text-gray-700 font-medium mt-4 mb-1">
            Select Payment Method:
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border w-full p-2 rounded mb-4"
          >
            <option value="">-- Select Payment --</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Card">Debit/Credit Card</option>
            <option value="JazzCash / EasyPaisa">
              JazzCash / EasyPaisa
            </option>
          </select>

          {/* Delivery Method */}
          <label className="block text-gray-700 font-medium mb-1">
            Select Delivery Method:
          </label>
          <select
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className="border w-full p-2 rounded mb-4"
          >
            <option value="">-- Select Delivery --</option>
            <option value="Standard (3-5 Days)">
              Standard (3-5 Days)
            </option>
            <option value="Express (1-2 Days)">
              Express (1-2 Days)
            </option>
          </select>

          {/* Total & Place Order */}
          <h2 className="text-xl font-bold mt-4 text-gray-800">
            Total (incl. Tax): Rs. {grandTotal.toFixed(0)}
          </h2>

          <button
            onClick={handlePlaceOrder}
            className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition-colors"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
