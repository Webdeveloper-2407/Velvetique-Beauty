import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Send, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setActivePage, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to Velvetique Beauty newsletter!');
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#3F1722] text-[#F3EBE8] pt-14 pb-8 border-t border-[#4E212D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#5B2836]">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#FAF2F4]/15 flex items-center justify-center text-[#E5A8B4]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C12 2 8 8 8 13C8 16.5 10 19 12 19C14 19 16 16.5 16 13C16 8 12 2 12 2Z" opacity="0.9" />
                  <path d="M5.5 14C5.5 14 3 10 7 7C8 10 7.5 14 5.5 14Z" opacity="0.6" />
                  <path d="M18.5 14C18.5 14 21 10 17 7C16 10 16.5 14 18.5 14Z" opacity="0.6" />
                </svg>
              </div>
              <div>
                <span className="font-serif tracking-[0.2em] text-xl font-bold uppercase text-white block leading-none">
                  Velvetique
                </span>
                <span className="text-[9px] tracking-[0.35em] text-[#E5A8B4] uppercase font-semibold block mt-0.5">
                  Beauty
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-sm mb-6 leading-relaxed">
              Thoughtful beauty for every skin, every day. Formulated with certified organic botanicals and dermatological rigor.
            </p>

            <div className="flex items-center gap-3 text-stone-300">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#52232E] hover:bg-[#D27986] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#52232E] hover:bg-[#D27986] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#52232E] hover:bg-[#D27986] text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => setActivePage('home')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('shop')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('collections')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('blog')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => setActivePage('account')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Return & Refund
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-[#E5A8B4] transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-stone-300 font-light mb-4 leading-relaxed">
              Subscribe to get special offers, beauty tips and 15% off your first luxury order.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded-sm overflow-hidden bg-white">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-3 py-2.5 text-xs text-[#3F1722] w-full focus:outline-none placeholder:text-stone-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#D27986] hover:bg-[#C26573] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2025 Velvetique Beauty. All Rights Reserved.</p>

          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 mr-1">Accepted:</span>
            {/* Payment badges */}
            <div className="px-2 py-1 bg-white text-[#1A1F71] text-[10px] font-bold rounded-xs tracking-wider">
              VISA
            </div>
            <div className="px-2 py-1 bg-white text-[#EB001B] text-[10px] font-bold rounded-xs tracking-wider">
              Mastercard
            </div>
            <div className="px-2 py-1 bg-white text-[#097939] text-[10px] font-bold rounded-xs tracking-wider">
              RuPay
            </div>
            <div className="px-2 py-1 bg-white text-[#0F723A] text-[10px] font-bold rounded-xs tracking-wider">
              UPI
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
