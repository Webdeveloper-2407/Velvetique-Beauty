import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, authMode, login } = useShop();
  const [mode, setMode] = useState<'login' | 'register'>(authMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, fullName || undefined);
  };

  const handleQuickCustomer = () => {
    login('ranaahmaed2407@gmail.com', 'Rana Ahmed');
  };

  const handleQuickAdmin = () => {
    login('admin@velvetique.com', 'Velvetique Store Admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 z-10 border border-[#F0E5E0] animate-fadeIn">
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#FAF2F4] text-[#8C384E] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <User className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#3F1722]">
            {mode === 'login' ? 'Welcome to Velvetique' : 'Join Velvetique Club'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {mode === 'login'
              ? 'Sign in to access your orders, wishlist, and exclusive discounts.'
              : 'Create an account to unlock 15% off your first luxury order.'}
          </p>
        </div>

        {/* Quick Demo Switchers */}
        <div className="mb-6 p-3 bg-[#FAF6F4] rounded-xl border border-[#EDE2DC] text-xs space-y-2">
          <p className="font-semibold text-[#8C384E] flex items-center gap-1 text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            1-Click Demo Logins:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="py-1.5 px-2 bg-white text-[#3F1722] hover:bg-[#FAF4F0] border border-[#E0D5D0] rounded-sm text-[11px] font-medium transition-colors"
            >
              👤 Customer Demo
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="py-1.5 px-2 bg-white text-[#8C384E] hover:bg-[#FAF2F4] border border-[#F2CFD6] rounded-sm text-[11px] font-medium transition-colors"
            >
              👑 Admin Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Rana Ahmed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E0D5D0] rounded-sm focus:outline-none focus:border-[#8C384E]"
                  required
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#E0D5D0] rounded-sm focus:outline-none focus:border-[#8C384E]"
                required
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#E0D5D0] rounded-sm focus:outline-none focus:border-[#8C384E]"
                required
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#8C384E] hover:bg-[#772A3E] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-stone-500">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-[#8C384E] hover:underline"
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#8C384E] hover:underline"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
