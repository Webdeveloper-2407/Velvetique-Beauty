import React from 'react';
import { CheckCircle2, Package, MapPin, CreditCard, ArrowRight, X } from 'lucide-react';
import { Order } from '../types';
import { useShop } from '../context/ShopContext';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  const { setActivePage } = useShop();

  if (!order) return null;

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

        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1722]">
            Thank You For Your Order!
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Order <span className="font-bold text-[#8C384E]">#{order.orderNumber}</span> has been confirmed and is being prepared with clean care.
          </p>
        </div>

        {/* Live Tracking Timeline */}
        <div className="mb-6 p-4 sm:p-5 bg-[#FAF6F4] rounded-xl border border-[#F0E5E0]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F1722] mb-4">
            Live Order Timeline
          </h4>
          <div className="space-y-4">
            {order.trackingSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 relative">
                {/* Vertical line between steps */}
                {idx < order.trackingSteps.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-6 bottom-0 w-0.5 ${
                      step.completed ? 'bg-[#8C384E]' : 'bg-stone-200'
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                    step.completed
                      ? 'bg-[#8C384E] text-white shadow-xs'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {step.completed ? '✓' : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${step.completed ? 'text-[#3F1722]' : 'text-stone-400'}`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">{step.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 mb-6 pb-6 border-b border-[#F0E5E0]">
          <div className="p-3 bg-stone-50 rounded-lg">
            <div className="flex items-center gap-1.5 font-bold text-[#3F1722] mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8C384E]" />
              <span>Delivering To:</span>
            </div>
            <p className="font-semibold text-stone-800">{order.shippingAddress.fullName}</p>
            <p className="text-[11px]">{order.shippingAddress.address}</p>
            <p className="text-[11px]">
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">Phone: {order.shippingAddress.phone}</p>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg">
            <div className="flex items-center gap-1.5 font-bold text-[#3F1722] mb-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#8C384E]" />
              <span>Payment & Summary:</span>
            </div>
            <p className="text-[11px]">Method: <strong className="uppercase">{order.paymentMethod}</strong></p>
            <p className="text-[11px]">Subtotal: ₹{order.subtotal}</p>
            {order.discount > 0 && <p className="text-[11px] text-[#8C384E]">Discount: -₹{order.discount}</p>}
            <p className="text-[11px]">Shipping: {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</p>
            <p className="text-xs font-bold text-[#3F1722] mt-1 pt-1 border-t border-stone-200">
              Total Paid: ₹{order.total}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={() => {
              onClose();
              setActivePage('account');
            }}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#3F1722] text-xs font-semibold rounded-xs transition-colors text-center"
          >
            View in My Orders
          </button>
          <button
            onClick={() => {
              onClose();
              setActivePage('shop');
            }}
            className="px-6 py-2.5 bg-[#8C384E] hover:bg-[#772A3E] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
