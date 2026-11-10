import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/apiClient';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ArrowLeft, Check, Shield, Truck, RotateCcw, ShoppingCart } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  // Review states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const { addToCart } = useCart();
  const { userInfo } = useAuth();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/api/products/${id}`);
      setProduct(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      setReviewLoading(true);
      setReviewError(null);
      await api.post(`/api/products/${id}/reviews`, { rating, comment });
      setReviewSuccess(true);
      setComment('');
      fetchProduct(); // Refresh reviews
    } catch (err) {
      setReviewError(err.response?.data?.message || err.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <Loader size="lg" />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!product) return null;

  return (
    <div className="space-y-10">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center aspect-square border border-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Info & Purchase Form */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <Rating value={product.rating} text={`${product.rating.toFixed(1)} / 5`} size={18} />
              <span className="text-xs text-slate-400">({product.numReviews} customer reviews)</span>
            </div>

            <div className="text-3xl font-black text-slate-900 pt-2">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <p className="text-slate-600 text-sm leading-relaxed border-t border-b border-slate-100 py-4">
              {product.description}
            </p>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-indigo-600 shrink-0" />
                <span>Fast Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-indigo-600 shrink-0" />
                <span>1-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-indigo-600 shrink-0" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-600">Availability:</span>
              {product.countInStock > 0 ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Check size={16} /> In Stock ({product.countInStock} available)
                </span>
              ) : (
                <span className="text-rose-500 font-bold">Out of Stock</span>
              )}
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-600">Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-white border border-slate-300 rounded-xl px-4 py-2 font-semibold text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className={`w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                product.countInStock === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 active:scale-98'
              }`}
            >
              <ShoppingCart size={18} />
              <span>{product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Customer Reviews & Ratings
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real feedback from verified purchasers
          </p>
        </div>

        {/* Existing Reviews */}
        {product.reviews.length === 0 ? (
          <Message variant="info">No reviews yet. Be the first to review this product!</Message>
        ) : (
          <div className="divide-y divide-slate-100">
            {product.reviews.map((rev) => (
              <div key={rev._id} className="py-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">{rev.name}</span>
                  <span className="text-xs text-slate-400">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Rating value={rev.rating} size={14} />
                <p className="text-sm text-slate-600 mt-1">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Write a Review */}
        <div className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Write a Review</h3>

          {reviewSuccess && (
            <Message variant="success" className="mb-4">
              Thank you! Your review was submitted successfully.
            </Message>
          )}

          {reviewError && (
            <Message variant="danger" className="mb-4">
              {reviewError}
            </Message>
          )}

          {userInfo ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Comment
                </label>
                <textarea
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Share your experience with this product..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={reviewLoading}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {reviewLoading ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          ) : (
            <Message variant="info">
              Please{' '}
              <Link to="/login" className="underline font-bold text-indigo-600">
                sign in
              </Link>{' '}
              to write a review.
            </Message>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

