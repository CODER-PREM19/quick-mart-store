import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
import { CreditCard, Truck, ArrowRight } from 'lucide-react';

const PaymentPage = () => {
  const { shippingAddress, paymentMethod, savePaymentMethod } = useCart();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState(paymentMethod || 'Cash on Delivery');

  if (!shippingAddress.address) {
    navigate('/shipping');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    savePaymentMethod(selectedMethod);
    navigate('/placeorder');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <CheckoutSteps step1 step2 step3 />

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Payment Method</h1>
          <p className="text-xs text-slate-500 mt-1">Select your preferred payment gateway</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Option 1: Cash on Delivery */}
          <label
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'Cash on Delivery'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              checked={selectedMethod === 'Cash on Delivery'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="accent-indigo-600 w-4 h-4"
            />
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Cash on Delivery (COD)</p>
              <p className="text-xs text-slate-500">Pay safely when your package arrives at your doorstep</p>
            </div>
          </label>

          {/* Option 2: Card / Stripe Simulation */}
          <label
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'Credit / Debit Card'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="Credit / Debit Card"
              checked={selectedMethod === 'Credit / Debit Card'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="accent-indigo-600 w-4 h-4"
            />
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Credit / Debit Card</p>
              <p className="text-xs text-slate-500">Fast and secure online card payment simulation</p>
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-98 mt-2"
          >
            <span>Review Order</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;

