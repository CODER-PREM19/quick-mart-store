import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const { cartItems, updateQty, removeFromCart, itemsPrice, shippingPrice, taxPrice, totalPrice } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    } else {
      navigate('/shipping');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto space-y-5">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
        <p className="text-slate-500 text-sm">
          Looks like you haven't added anything to your cart yet. Explore our latest arrivals!
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
        <p className="text-slate-500 text-sm mt-1">Review your items before proceeding to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.product} className="p-5 sm:p-6 flex items-center gap-4 sm:gap-6">
                {/* Image */}
                <Link
                  to={`/product/${item.product}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <Link
                    to={`/product/${item.product}`}
                    className="block font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 truncate"
                  >
                    {item.name}
                  </Link>
                  <div className="text-indigo-600 font-extrabold text-base mt-1">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <select
                    value={item.qty}
                    onChange={(e) => updateQty(item.product, Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm h-fit space-y-6">
          <h2 className="text-xl font-black text-slate-900">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal:</span>
              <span className="font-semibold text-slate-900">₹{itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Delivery:</span>
              <span className="font-semibold text-slate-900">
                {shippingPrice === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `₹${shippingPrice.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated GST (5%):</span>
              <span className="font-semibold text-slate-900">₹{taxPrice.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Total Price:</span>
              <span className="text-2xl font-black text-indigo-600">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {itemsPrice > 0 && itemsPrice < 499 && (
            <div className="bg-indigo-50 text-indigo-700 text-xs font-semibold p-3 rounded-xl">
              Add ₹{(499 - itemsPrice).toFixed(2)} more to qualify for <strong>FREE Delivery</strong>!
            </div>
          )}

          <button
            onClick={handleCheckout}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

