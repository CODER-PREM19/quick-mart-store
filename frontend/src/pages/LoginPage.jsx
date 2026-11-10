import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Mail, Lock, ShoppingBag } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, userInfo, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag size={24} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
        <p className="text-xs text-slate-500">Sign in to access your orders and wishlist</p>
      </div>

      {error && <Message variant="danger">{error}</Message>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-98 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        New customer?{' '}
        <Link
          to={redirect ? `/register?redirect=${redirect}` : '/register'}
          className="font-bold text-indigo-600 hover:underline"
        >
          Create an account
        </Link>
      </div>

      {/* Helpful default credential tip for testing */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
        <p className="font-semibold text-slate-800 mb-1">Demo Credentials:</p>
        <p>Admin: <code className="bg-slate-200 px-1 py-0.5 rounded">admin@quickmart.com</code> / <code className="bg-slate-200 px-1 py-0.5 rounded">password123</code></p>
        <p>User: <code className="bg-slate-200 px-1 py-0.5 rounded">john@example.com</code> / <code className="bg-slate-200 px-1 py-0.5 rounded">password123</code></p>
      </div>
    </div>
  );
};

export default LoginPage;

