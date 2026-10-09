import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CartDrawerProps {
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    shippingFee,
    cartTotal,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    freeShippingProgress,
    setActivePage,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    const result = await applyCoupon(couponInput);
    setCouponLoading(false);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onProceedCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#F0E5E0] flex items-center justify-between bg-[#FAF6F4]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C384E]" />
              <h2 className="font-serif text-lg font-bold text-[#3F1722] tracking-wide">
                Your Beauty Bag
              </h2>
              <span className="text-xs bg-[#FAF2F4] text-[#8C384E] font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-[#3F1722] hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#FAF2F4] border-b border-[#F5DEE3] text-xs">
            {cartSubtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-1.5 text-[#0A6C35] font-semibold">
                <Check className="w-4 h-4 shrink-0" />
                <span>You've unlocked Free Standard Delivery!</span>
              </div>
            ) : (
              <p className="text-stone-700">
                Add <span className="font-bold text-[#8C384E]">₹{freeShippingThreshold - cartSubtotal}</span> more to unlock <span className="font-semibold">Free Delivery</span>
              </p>
            )}
            <div className="w-full h-1.5 bg-[#E8CBD1] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#8C384E] rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F5EBE6]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#FAF2F4] flex items-center justify-center text-[#8C384E] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3F1722] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 mb-6 max-w-xs font-light">
                  Discover our clean skincare formulations and best-selling botanical beauty essentials.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-6 py-2.5 bg-[#8C384E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#772A3E] transition-colors"
                >
                  Explore Best Sellers
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.productId} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-lg bg-[#FAF6F4] p-2 shrink-0 border border-[#F0E5E0] flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#3F1722] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate mb-1">
                      {item.product.subtitle}
                    </p>
                    <div className="text-xs font-bold text-[#3F1722] tabular-nums">
                      ₹{item.product.price}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E2D5D0] rounded-sm bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-[#FAF4F0] text-stone-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums text-[#3F1722]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-[#FAF4F0] text-stone-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Coupon, Subtotal, and Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#F0E5E0] bg-[#FAF6F4] space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#FAF2F4] border border-[#F2CFD6] px-3 py-2 rounded-md text-xs">
                    <div className="flex items-center gap-1.5 text-[#8C384E] font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied (-₹{couponDiscount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-stone-700 font-bold"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. GLOW15)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 text-xs px-3 py-2 bg-white border border-[#E0D5D0] rounded-sm focus:outline-none focus:border-[#8C384E] uppercase"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading}
                        className="px-4 py-2 bg-[#4A1E29] hover:bg-[#38141E] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        {couponLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-0.5">
                      <Sparkles className="w-3 h-3 text-[#8C384E]" />
                      <span>Try code: <strong className="text-[#8C384E] cursor-pointer" onClick={() => setCouponInput('GLOW15')}>GLOW15</strong> for 15% off</span>
                    </div>
                  </form>
                )}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-[#EFE5E0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3F1722] tabular-nums">₹{cartSubtotal}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#8C384E]">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#3F1722] tabular-nums">
                    {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#3F1722] pt-2 border-t border-[#E5DAD5]">
                  <span>Total</span>
                  <span className="text-base tabular-nums">₹{cartTotal}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#8C384E] hover:bg-[#772A3E] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
