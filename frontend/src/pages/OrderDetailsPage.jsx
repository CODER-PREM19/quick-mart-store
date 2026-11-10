import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CheckCircle2, Clock, MapPin, CreditCard, ShoppingBag, Truck } from 'lucide-react';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payLoading, setPayLoading] = useState(false);
  const [deliverLoading, setDeliverLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/api/orders/${id}`);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Order not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handlePayOrder = async () => {
    try {
      setPayLoading(true);
      await api.put(`/api/orders/${id}/pay`, {
        id: 'PAY_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: userInfo.email,
      });
      fetchOrder();
    } catch (err) {
      alert(err.response?.data?.message || 'Payment simulation failed');
    } finally {
      setPayLoading(false);
    }
  };

  const handleDeliverOrder = async () => {
    try {
      setDeliverLoading(true);
      await api.put(`/api/orders/${id}/deliver`);
      fetchOrder();
    } catch (err) {
      alert(err.response?.data?.message || 'Deliver update failed');
    } finally {
      setDeliverLoading(false);
    }
  };

  if (loading) return <Loader size="lg" />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!order) return null;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <span>Order Confirmation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Order #{order._id}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Order Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping & Delivery Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin size={20} className="text-indigo-600" />
              Shipping Information
            </h2>
            <div className="text-sm text-slate-600 space-y-1">
              <p>
                <strong className="text-slate-800">Customer:</strong> {order.user?.name} (
                {order.user?.email})
              </p>
              <p>
                <strong className="text-slate-800">Address:</strong>{' '}
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
            </div>

            {order.isDelivered ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="p-3 bg-amber-50 text-amber-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Clock size={16} className="text-amber-600" />
                Delivery in progress
              </div>
            )}
          </div>

          {/* Payment Status Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard size={20} className="text-indigo-600" />
              Payment Details
            </h2>
            <p className="text-sm text-slate-600">
              <strong className="text-slate-800">Method:</strong> {order.paymentMethod}
            </p>

            {order.isPaid ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Paid on {new Date(order.paidAt).toLocaleDateString()} (Ref: {order.paymentResult?.id})
              </div>
            ) : (
              <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Clock size={16} className="text-rose-600" />
                Payment Pending
              </div>
            )}
          </div>

          {/* Ordered Items */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag size={20} className="text-indigo-600" />
              Items Ordered
            </h2>

            <div className="divide-y divide-slate-100">
              {order.orderItems.map((item, index) => (
                <div key={index} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl bg-slate-50 border border-slate-100"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="font-medium text-slate-800 hover:text-indigo-600 truncate max-w-xs"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="font-semibold text-slate-900">
                    {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financial Summary & Actions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm h-fit space-y-6">
          <h2 className="text-xl font-black text-slate-900">Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items Total:</span>
              <span className="font-semibold text-slate-900">₹{order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-slate-900">
                ₹{order.shippingPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST (5%):</span>
              <span className="font-semibold text-slate-900">₹{order.taxPrice.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Order Total:</span>
              <span className="text-2xl font-black text-indigo-600">
                ₹{order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Pay Button for Unpaid Orders */}
          {!order.isPaid && (
            <button
              onClick={handlePayOrder}
              disabled={payLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <CreditCard size={18} />
              <span>{payLoading ? 'Processing...' : 'Simulate Payment (Pay Now)'}</span>
            </button>
          )}

          {/* Admin Mark Delivered Button */}
          {userInfo && userInfo.isAdmin && !order.isDelivered && (
            <button
              onClick={handleDeliverOrder}
              disabled={deliverLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 text-sm"
            >
              <Truck size={18} />
              <span>{deliverLoading ? 'Updating...' : 'Mark As Delivered'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

