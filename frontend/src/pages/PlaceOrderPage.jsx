import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import api from '../api/apiClient';
import { MapPin, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';

const PlaceOrderPage = () => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      setError(null);

      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const { data } = await api.post('/api/orders', orderPayload);
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <CheckoutSteps step1 step2 step3 step4 />

      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Review & Place Order</h1>

      {error && <Message variant="danger">{error}</Message>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <MapPin size={18} />
              <span>Shipping Address</span>
            </div>
            <p className="text-slate-700 text-sm">
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{' '}
              {shippingAddress.country}
            </p>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <CreditCard size={18} />
              <span>Payment Method</span>
            </div>
            <p className="text-slate-700 text-sm font-semibold">{paymentMethod}</p>
          </div>

          {/* Items Preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <ShoppingBag size={18} />
              <span>Order Items ({cartItems.length})</span>
            </div>

            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.product} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl bg-slate-50 border border-slate-100"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="font-medium text-slate-800 hover:text-indigo-600 max-w-xs truncate"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="font-semibold text-slate-900 text-right">
                    {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm h-fit space-y-6">
          <h2 className="text-xl font-black text-slate-900">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items Total:</span>
              <span className="font-semibold text-slate-900">₹{itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-slate-900">
                {shippingPrice === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `₹${shippingPrice.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST (5%):</span>
              <span className="font-semibold text-slate-900">₹{taxPrice.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Final Total:</span>
              <span className="text-2xl font-black text-indigo-600">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrderHandler}
            disabled={cartItems.length === 0 || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            <ShieldCheck size={20} />
            <span>{loading ? 'Processing Order...' : 'Confirm & Place Order'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;

