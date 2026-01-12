import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiDownload, FiPrinter, FiCpu, FiCreditCard, FiTruck } from "react-icons/fi";

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
      alert("Please initialize all transmission protocols (Select methods).");
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
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ShopNova_Invoice_${Date.now()}.pdf`);
      handleClearCartAfterDownload();
    });
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-4">
        <h2 className="text-3xl font-black mb-6 tracking-tighter">Transmission Interrupted (Empty Cart)</h2>
        <Link
          to="/products"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-lg transition-all"
        >
          RETURN TO CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        
        {orderPlaced ? (
          <div className="space-y-8">
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <FiCheckCircle className="text-white text-4xl" />
              </motion.div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Transmission Successful</h1>
              <p className="text-slate-500 font-medium">Your order has been logged into the Nova Neural Grid.</p>
            </div>

            {/* HIGH-TECH RECEIPT */}
            <motion.div
              ref={receiptRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-10 max-w-2xl mx-auto overflow-hidden relative"
            >
              {/* Receipt Background Branding */}
              <div className="absolute top-[-50px] right-[-50px] text-slate-50 opacity-[0.03] rotate-12">
                <FiCpu size={300} />
              </div>

              <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-2">
                    <FiCpu className="text-emerald-500" /> SHOP<span className="text-emerald-500">NOVA</span> AI
                  </h2>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 space-y-1">
                    <p>Operator: Ahsan Khan</p>
                    <p>Node: 123 Mall Road, Lahore</p>
                    <p>Protocol: support@shopnovaai.com</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    Official Invoice
                  </span>
                  <p className="text-xs text-slate-400 mt-4">ID: #{Date.now().toString().slice(-8)}</p>
                </div>
              </div>

              {/* Invoice Meta */}
              <div className="grid grid-cols-2 gap-8 mb-8 text-sm relative z-10">
                <div>
                  <h4 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">Billing To</h4>
                  <p className="font-black text-slate-900">Guest User (Neural Guest)</p>
                </div>
                <div className="text-right">
                  <h4 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">Timestamp</h4>
                  <p className="font-black text-slate-900">{new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-4 relative z-10">
                <div className="grid grid-cols-4 text-[10px] font-black uppercase tracking-widest text-slate-400 pb-2 border-b border-slate-50">
                  <p className="col-span-2">Module</p>
                  <p className="text-center">Qty</p>
                  <p className="text-right">Subtotal</p>
                </div>
                {orderItems.map((item) => (
                  <div key={item._id} className="grid grid-cols-4 py-2 text-sm border-b border-slate-50 last:border-0">
                    <p className="col-span-2 font-bold text-slate-900">{item.name}</p>
                    <p className="text-center text-slate-500">x{item.qty}</p>
                    <p className="text-right font-black text-slate-900">Rs. {item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Net Total</span>
                  <span className="font-bold text-slate-900">Rs. {total}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">AI Governance Tax (5%)</span>
                  <span className="font-bold text-slate-900">Rs. {taxAmount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-2xl">
                  <span className="font-black uppercase tracking-widest text-xs">Final Settlement</span>
                  <span className="text-2xl font-black text-emerald-400">Rs. {grandTotal.toFixed(0)}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                <p>Payment: {paymentMethod}</p>
                <p>Logistics: {deliveryMethod}</p>
              </div>
            </motion.div>

            {/* Post-Order Actions */}
            <div className="flex gap-4 justify-center">
              <button onClick={handlePrint} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
                <FiPrinter /> Print Invoice
              </button>
              <button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-black hover:bg-emerald-400 transition-all">
                <FiDownload /> Download Data
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT INTERFACE */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden"
          >
            <div className="bg-slate-900 p-8 text-white">
              <h1 className="text-3xl font-black tracking-tighter">Checkout Protocol</h1>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Finalize your neural shopping session</p>
            </div>

            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-emerald-500"></div> Order Modules
                </h3>
                <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-contain bg-slate-50 rounded-lg" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase">Qty: {item.qty}</p>
                      </div>
                      <p className="font-black text-slate-900 text-sm">Rs. {item.price * item.qty}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-2 block">Payment Gateway</label>
                  <div className="relative">
                    <select 
                      value={paymentMethod} 
                      onChange={(e) => setPaymentMethod(e.target.value)} 
                      className="w-full bg-slate-50 border-0 p-4 rounded-xl font-bold text-slate-900 appearance-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="">Select Protocol</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="Card">Direct Card Transfer</option>
                      <option value="JazzCash / EasyPaisa">JazzCash / EasyPaisa</option>
                    </select>
                    <FiCreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-2 block">Logistics Speed</label>
                  <div className="relative">
                    <select 
                      value={deliveryMethod} 
                      onChange={(e) => setDeliveryMethod(e.target.value)} 
                      className="w-full bg-slate-50 border-0 p-4 rounded-xl font-bold text-slate-900 appearance-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="">Select Speed</option>
                      <option value="Standard (3-5 Days)">Standard Transit</option>
                      <option value="Express (1-2 Days)">Nova Express (High Speed)</option>
                    </select>
                    <FiTruck className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-widest">Total Settlement</span>
                    <span className="text-3xl font-black text-emerald-600">Rs. {grandTotal.toFixed(0)}</span>
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder} 
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-emerald-500 hover:text-slate-950 transition-all duration-500 group"
                >
                  INITIALIZE ORDER
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Checkout;