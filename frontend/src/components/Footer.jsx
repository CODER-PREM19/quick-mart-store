import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                <ShoppingBag size={18} />
              </div>
              <span className="text-xl font-black text-white">Quick Mart Store</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
              Your modern destination for premium electronics, fashion, and lifestyle essentials. Built with modern full-stack MERN technologies.
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>Crafted with</span>
              <Heart size={14} className="text-rose-500 fill-rose-500 inline" />
              <span>for MERN stack mastery</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Customer Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Free Delivery on Orders &gt; ₹499</li>
              <li>30-Day Hassle-Free Returns</li>
              <li>24/7 Dedicated Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Quick Mart Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

