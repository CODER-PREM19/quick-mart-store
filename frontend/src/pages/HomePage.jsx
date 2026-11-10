import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/apiClient';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Zap,
  ShoppingBasket,
  Coffee,
  Sparkle,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Home Appliances',
  'Groceries',
  'Snacks & Beverages',
  'Daily Essentials',
  'Electronics',
  'Home & Kitchen',
  'Footwear',
];

const DAILY_SECTIONS = [
  {
    title: 'Home Appliances',
    subtitle: 'Kettles, blenders, air fryers & toasters',
    category: 'Home Appliances',
    color: 'from-amber-500/20 to-orange-500/10 text-amber-700 border-amber-200',
    iconColor: 'bg-amber-500 text-white',
    icon: Zap,
    tag: 'Daily Prep',
  },
  {
    title: 'Fresh Groceries',
    subtitle: 'Organic milk, sourdough & pantry staples',
    category: 'Groceries',
    color: 'from-emerald-500/20 to-teal-500/10 text-emerald-700 border-emerald-200',
    iconColor: 'bg-emerald-600 text-white',
    icon: ShoppingBasket,
    tag: 'Farm Fresh',
  },
  {
    title: 'Snacks & Beverages',
    subtitle: 'Nitro cold brews, nuts & chocolates',
    category: 'Snacks & Beverages',
    color: 'from-violet-500/20 to-purple-500/10 text-violet-700 border-violet-200',
    iconColor: 'bg-violet-600 text-white',
    icon: Coffee,
    tag: 'Quick Bites',
  },
  {
    title: 'Daily Essentials',
    subtitle: 'Laundry pods, home care & cleaning sprays',
    category: 'Daily Essentials',
    color: 'from-blue-500/20 to-cyan-500/10 text-blue-700 border-blue-200',
    iconColor: 'bg-blue-600 text-white',
    icon: Sparkle,
    tag: 'Household',
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = `/api/products?`;
        if (keyword) url += `keyword=${encodeURIComponent(keyword)}&`;
        if (selectedCategory && selectedCategory !== 'All') {
          url += `category=${encodeURIComponent(selectedCategory)}&`;
        }

        const { data } = await api.get(url);
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Hero Banner (Only show when not actively searching) */}
      {!keyword && selectedCategory === 'All' && (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              <span>Quick Mart Store 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Daily Essentials, Groceries & Smart Appliances.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your one-stop destination for daily morning groceries, delicious snacks, beverages, and fast home & kitchen appliances delivered swiftly.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#products-section"
                className="inline-flex items-center gap-2 bg-white text-indigo-900 hover:bg-slate-100 font-bold px-6 py-3 rounded-2xl shadow-lg transition-transform active:scale-95 text-sm"
              >
                <span>Shop All Daily Needs</span>
                <ArrowRight size={18} />
              </a>
              <button
                onClick={() => {
                  setSelectedCategory('Groceries');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-2xl border border-indigo-500/30 text-sm backdrop-blur-sm transition-all"
              >
                <ShoppingBasket size={18} />
                <span>Quick Groceries</span>
              </button>
            </div>
          </div>

          {/* Decorative Background Blob */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        </section>
      )}

      {/* Quick Daily Highlights Grid */}
      {!keyword && selectedCategory === 'All' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles size={22} className="text-amber-500" />
                Quick Daily Essentials
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Popular categories used every single day
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DAILY_SECTIONS.map((sec) => {
              const IconComp = sec.icon;
              return (
                <div
                  key={sec.category}
                  onClick={() => {
                    setSelectedCategory(sec.category);
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`cursor-pointer rounded-2xl p-5 border bg-gradient-to-br transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ${sec.color}`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${sec.iconColor}`}>
                      <IconComp size={22} />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-xs text-slate-700 shadow-2xs">
                      {sec.tag}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-extrabold text-slate-900 text-base">{sec.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">{sec.subtitle}</p>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:gap-2 transition-all">
                    <span>Browse items</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Categories & Filter Bar */}
      <section id="products-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Layers size={22} className="text-indigo-600" />
              {keyword
                ? `Search Results for "${keyword}"`
                : selectedCategory === 'All'
                ? 'All Products & Daily Staples'
                : `${selectedCategory}`}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing {products.length} {products.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <Loader size="lg" />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No products match this category yet.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-indigo-600 hover:underline text-sm font-semibold"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
