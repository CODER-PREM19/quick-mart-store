import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Rating from './Rating';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="relative block overflow-hidden bg-slate-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
          {product.category}
        </div>
        {product.countInStock === 0 && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">
            {product.brand}
          </div>
          <Link
            to={`/product/${product._id}`}
            className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          <div className="mt-2.5">
            <Rating value={product.rating} text={`(${product.numReviews})`} />
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Price</span>
            <span className="text-xl font-extrabold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock === 0}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
              product.countInStock === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 active:scale-95'
            }`}
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

