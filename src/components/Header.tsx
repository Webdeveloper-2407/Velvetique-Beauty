import React, { useState } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Facebook,
  Instagram,
  Youtube,
  ShieldCheck,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SEED_CATEGORIES } from '../data/seedData';

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    user,
    activePage,
    setActivePage,
    setIsCartOpen,
    setIsAuthOpen,
    logout,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF6F4] shadow-xs">
      {/* 1. Top Pink Announcement Bar */}
      <div className="bg-[#D27986] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-white/80">✨ Pure Botanical Luxury</span>
          </div>

          <div className="flex-1 text-center font-medium tracking-wide">
            <span>Free Shipping on orders over ₹999 | Use code: </span>
            <span className="font-bold underline decoration-white/60 underline-offset-2">GLOW15</span>
            <span> for 15% OFF</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-[#F0E5E0]">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A1825] hover:text-[#B85D72]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo Brand */}
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            {/* Elegant Lotus Logo Icon */}
            <div className="w-9 h-9 rounded-full bg-[#F5DEE3] flex items-center justify-center text-[#8C384E] transition-transform group-hover:scale-105">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C12 2 8 8 8 13C8 16.5 10 19 12 19C14 19 16 16.5 16 13C16 8 12 2 12 2Z" opacity="0.9" />
                <path d="M5.5 14C5.5 14 3 10 7 7C8 10 7.5 14 5.5 14Z" opacity="0.6" />
                <path d="M18.5 14C18.5 14 21 10 17 7C16 10 16.5 14 18.5 14Z" opacity="0.6" />
                <path d="M12 21C6 21 3 18 3 18C5 17 9 17 12 18C15 17 19 17 21 18C21 18 18 21 12 21Z" opacity="0.7" />
              </svg>
            </div>
            <div>
              <span className="font-serif tracking-[0.2em] text-xl sm:text-2xl font-bold uppercase text-[#3F1722] block leading-none">
                Velvetique
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#8C384E] uppercase font-semibold block mt-0.5">
                Beauty
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-xs font-semibold tracking-wider uppercase text-[#4A3E3D]">
            <button
              onClick={() => setActivePage('home')}
              className={`transition-colors py-1 relative ${
                activePage === 'home' ? 'text-[#8C384E] font-bold' : 'hover:text-[#8C384E]'
              }`}
            >
              Home
              {activePage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E] rounded-full" />
              )}
            </button>

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => setActivePage('shop')}
                className={`flex items-center gap-1 transition-colors py-1 ${
                  activePage === 'shop' || activePage === 'category'
                    ? 'text-[#8C384E] font-bold'
                    : 'hover:text-[#8C384E]'
                }`}
              >
                Shop
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl py-3 border border-[#EFE5E0] animate-fadeIn z-50">
                  <div className="px-4 py-2 border-b border-[#F7EFEB] flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C384E]">
                      All Categories
                    </span>
                    <button
                      onClick={() => {
                        setActivePage('shop');
                        setShopDropdownOpen(false);
                      }}
                      className="text-[10px] text-stone-500 hover:text-[#8C384E] underline"
                    >
                      View All
                    </button>
                  </div>
                  {SEED_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActivePage('category', cat.id);
                        setShopDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#3E3434] hover:bg-[#FAF4F0] hover:text-[#8C384E] flex items-center justify-between transition-colors"
                    >
                      <span className="font-medium normal-case tracking-normal">{cat.name}</span>
                      <span className="text-[10px] text-stone-400">({cat.itemCount})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setActivePage('collections')}
              className={`transition-colors py-1 ${
                activePage === 'collections' ? 'text-[#8C384E] font-bold' : 'hover:text-[#8C384E]'
              }`}
            >
              Collections
            </button>

            <button
              onClick={() => setActivePage('about')}
              className={`transition-colors py-1 ${
                activePage === 'about' ? 'text-[#8C384E] font-bold' : 'hover:text-[#8C384E]'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => setActivePage('blog')}
              className={`transition-colors py-1 ${
                activePage === 'blog' ? 'text-[#8C384E] font-bold' : 'hover:text-[#8C384E]'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => setActivePage('contact')}
              className={`transition-colors py-1 ${
                activePage === 'contact' ? 'text-[#8C384E] font-bold' : 'hover:text-[#8C384E]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#3E3434]">
            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-[#8C384E] transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white p-3 rounded-xl shadow-xl border border-[#F0E5E0] z-50 animate-fadeIn">
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search serums, lipsticks, cleansers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-[#E0D5D0] rounded-lg focus:outline-none focus:border-[#8C384E]"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#8C384E] text-white text-xs rounded-lg hover:bg-[#772A3E] transition-colors whitespace-nowrap"
                    >
                      Find
                    </button>
                  </form>
                  <div className="mt-2 pt-2 border-t border-stone-100 flex flex-wrap gap-1.5 text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-600">Popular:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('Niacinamide');
                        setActivePage('shop');
                        setSearchOpen(false);
                      }}
                      className="hover:text-[#8C384E] underline"
                    >
                      Niacinamide
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('Salicylic');
                        setActivePage('shop');
                        setSearchOpen(false);
                      }}
                      className="hover:text-[#8C384E] underline"
                    >
                      Salicylic Acid
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('Lipstick');
                        setActivePage('shop');
                        setSearchOpen(false);
                      }}
                      className="hover:text-[#8C384E] underline"
                    >
                      Matte Lipstick
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Account / Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  if (user) {
                    setAccountMenuOpen(!accountMenuOpen);
                  } else {
                    setIsAuthOpen(true);
                  }
                }}
                className="p-2 hover:text-[#8C384E] transition-colors flex items-center gap-1"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                {user && (
                  <span className="hidden lg:inline text-xs font-medium text-[#4A3E3D] max-w-[80px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                )}
              </button>

              {user && accountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-[#F0E5E0] z-50">
                  <div className="px-4 py-2 border-b border-[#F7EFEB]">
                    <p className="text-xs font-semibold text-[#3E3434] truncate">{user.fullName}</p>
                    <p className="text-[10px] text-stone-500 truncate">{user.email}</p>
                    {user.role === 'admin' && (
                      <span className="inline-block mt-1 text-[10px] bg-[#F5DEE3] text-[#8C384E] font-bold px-1.5 py-0.5 rounded">
                        Admin Mode
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setActivePage('account');
                      setAccountMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#3E3434] hover:bg-[#FAF4F0] flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-[#8C384E]" />
                    My Account & Orders
                  </button>

                  <button
                    onClick={() => {
                      setActivePage('admin');
                      setAccountMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#3E3434] hover:bg-[#FAF4F0] flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#8C384E]" />
                    Admin Dashboard
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setAccountMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-[#F7EFEB]"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setActivePage('wishlist')}
              className="p-2 hover:text-[#8C384E] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D27986] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-[#8C384E] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8C384E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#F0E5E0] px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-3 text-sm font-medium text-[#4A3E3D]">
            <button
              onClick={() => {
                setActivePage('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setActivePage('shop');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Shop All Products</span>
            </button>

            <div className="pl-3 py-1 flex flex-col gap-2 text-xs text-stone-600">
              {SEED_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActivePage('category', cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-[#8C384E]"
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setActivePage('collections');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Collections
            </button>

            <button
              onClick={() => {
                setActivePage('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              About Us
            </button>

            <button
              onClick={() => {
                setActivePage('blog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Beauty Blog
            </button>

            <button
              onClick={() => {
                setActivePage('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-stone-100"
            >
              Contact Us
            </button>

            <button
              onClick={() => {
                setActivePage('admin');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#8C384E] font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Admin Portal
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
