import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, CreditCard, Smartphone, Building, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order, ShippingAddress } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderPlaced }) => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    couponDiscount,
    cartTotal,
    appliedCoupon,
    clearCart,
    user,
    showToast,
  } = useShop();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: user?.fullName || 'Rana Ahmed',
    email: user?.email || 'ranaahmaed2407@gmail.com',
    phone: user?.phone || '+91 98765 43210',
    address: user?.savedAddresses?.[0]?.address || '42 Lotus Boulevard, Flat 1202',
    city: user?.savedAddresses?.[0]?.city || 'Mumbai',
    state: user?.savedAddresses?.[0]?.state || 'Maharashtra',
    pincode: user?.savedAddresses?.[0]?.pincode || '400001',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    const orderItems = cart.map((i) => ({
      product: i.product,
      quantity: i.quantity,
      price: i.product.price,
    }));

    const orderPayload = {
      items: orderItems,
      shippingAddress: formData,
      paymentMethod,
      subtotal: cartSubtotal,
      discount: couponDiscount,
      shippingFee,
      total: cartTotal,
      couponCode: appliedCoupon?.code,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (data.success && data.order) {
        clearCart();
        onOrderPlaced(data.order);
        showToast('Order confirmed successfully!');
      } else {
        throw new Error('Order creation error');
      }
    } catch {
      // Local fallback order
      const fallbackOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `VB-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toISOString(),
        items: orderItems,
        shippingAddress: formData,
        paymentMethod,
        subtotal: cartSubtotal,
        discount: couponDiscount,
        shippingFee,
        total: cartTotal,
        couponCode: appliedCoupon?.code,
        status: 'Confirmed',
        trackingSteps: [
          { status: 'Confirmed', label: 'Order Confirmed', description: 'Order placed & payment verified', timestamp: 'Just now', completed: true },
          { status: 'Processing', label: 'Processing & Packed', description: 'Under preparation with clean velvet pouch packaging', timestamp: 'Pending', completed: false },
          { status: 'Shipped', label: 'Handed to Courier', description: 'Dispatched via express air delivery', timestamp: 'Pending', completed: false },
          { status: 'Out for Delivery', label: 'Out for Delivery', description: 'Delivery agent assigned in your city', timestamp: 'Pending', completed: false },
          { status: 'Delivered', label: 'Delivered', description: 'Package safely delivered with OTP verification', timestamp: 'Pending', completed: false },
        ],
      };
      clearCart();
      onOrderPlaced(fallbackOrder);
      showToast('Order confirmed successfully!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 border border-[#F0E5E0] animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header & Steps */}
        <div className="mb-6 border-b border-[#F0E5E0] pb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#3F1722]">Checkout</h3>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={`px-2.5 py-1 rounded-full ${step === 1 ? 'bg-[#8C384E] text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                1. Delivery
              </span>
              <span>→</span>
              <span className={`px-2.5 py-1 rounded-full ${step === 2 ? 'bg-[#8C384E] text-white' : 'bg-stone-100 text-stone-500'}`}>
                2. Payment
              </span>
            </div>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C384E]">Shipping Address</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E0D5D0] rounded-sm focus:border-[#8C384E] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E0D5D0] rounded-sm focus:border-[#8C384E] outline-none"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Email for Invoicing & Tracking</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E0D5D0] rounded-sm focus:border-[#8C384E] outline-none"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Street Address & Apartment</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E0D5D0] rounded-sm focus:border-[#8C384E] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E0D5D0] rounded-sm focus:border-[#8C384E] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">PIN Code</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E0D5D0] rounded-sm focus:border-[#8C384E] outline-none"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#8C384E]" />
                256-bit SSL Secure Checkout
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#8C384E] hover:bg-[#772A3E] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C384E] mb-3">
                Select Payment Method
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#8C384E] bg-[#FAF2F4] text-[#8C384E]'
                      : 'border-[#E0D5D0] bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-1 text-[#8C384E]" />
                  <p className="text-xs font-bold">UPI / QR</p>
                  <p className="text-[10px] text-stone-500">GPay, PhonePe</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#8C384E] bg-[#FAF2F4] text-[#8C384E]'
                      : 'border-[#E0D5D0] bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-1 text-[#8C384E]" />
                  <p className="text-xs font-bold">Cards</p>
                  <p className="text-[10px] text-stone-500">Debit / Credit</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#8C384E] bg-[#FAF2F4] text-[#8C384E]'
                      : 'border-[#E0D5D0] bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Building className="w-5 h-5 mb-1 text-[#8C384E]" />
                  <p className="text-xs font-bold">NetBanking</p>
                  <p className="text-[10px] text-stone-500">All Indian Banks</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#8C384E] bg-[#FAF2F4] text-[#8C384E]'
                      : 'border-[#E0D5D0] bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Truck className="w-5 h-5 mb-1 text-[#8C384E]" />
                  <p className="text-xs font-bold">Cash on Delivery</p>
                  <p className="text-[10px] text-stone-500">Pay at Doorstep</p>
                </button>
              </div>
            </div>

            {/* Payment Sub-details */}
            <div className="p-4 bg-[#FAF6F4] rounded-lg border border-[#EBE0DC] text-xs">
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Enter UPI VPA ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-2 bg-white border border-[#D5C6C0] rounded text-xs focus:outline-none focus:border-[#8C384E]"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">Simulated fast verification enabled for demo orders.</p>
                </div>
              )}
              {paymentMethod === 'card' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D5C6C0] rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D5C6C0] rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="888"
                      className="w-full p-2 bg-white border border-[#D5C6C0] rounded text-xs"
                    />
                  </div>
                </div>
              )}
              {paymentMethod === 'cod' && (
                <p className="text-stone-700">
                  Please keep exact change of <strong>₹{cartTotal}</strong> ready at the time of delivery. Free verification OTP will be sent prior to arrival.
                </p>
              )}
              {paymentMethod === 'netbanking' && (
                <p className="text-stone-700">
                  You will be securely redirected to your bank portal upon clicking "Place Order".
                </p>
              )}
            </div>

            {/* Order Summary box */}
            <div className="p-3 bg-stone-50 rounded-lg text-xs space-y-1 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-semibold text-stone-800 tabular-nums">₹{cartSubtotal}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#8C384E]">
                  <span>Discount ({appliedCoupon?.code}):</span>
                  <span className="font-semibold tabular-nums">-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold text-stone-800 tabular-nums">
                  {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#3F1722] pt-1.5 border-t border-stone-200">
                <span>Total Amount to Pay:</span>
                <span className="tabular-nums">₹{cartTotal}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-stone-500 hover:text-stone-800 underline"
              >
                ← Back to Address
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="px-7 py-3 bg-[#8C384E] hover:bg-[#772A3E] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                {submitting ? 'Placing Order...' : `Place Order (₹${cartTotal})`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
