import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import { Package, MapPin, User, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { INITIAL_ORDERS } from '../data/seedData';

interface AccountViewProps {
  onInspectOrder: (order: Order) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({ onInspectOrder }) => {
  const { user, setActivePage, setIsAuthOpen } = useShop();
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        }
      })
      .catch(() => {
        // Fallback to local
      });
  }, []);

  if (!user) {
    return (
      <div className="w-full bg-[#FAF6F4] min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <User className="w-12 h-12 text-[#8C384E] mb-3" />
        <h2 className="font-serif text-2xl font-bold text-[#3F1722] mb-2">Please Sign In</h2>
        <p className="text-xs text-stone-500 mb-6 max-w-sm">
          Sign in to view your past orders, active shipments, and saved delivery addresses.
        </p>
        <button
          onClick={() => setIsAuthOpen(true)}
          className="px-6 py-2.5 bg-[#8C384E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
        >
          Sign In / Demo Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F0E5E0] shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF2F4] text-[#8C384E] flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#3F1722]">{user.fullName}</h1>
                {user.role === 'admin' && (
                  <span className="text-[10px] bg-[#FAF2F4] text-[#8C384E] font-bold px-2 py-0.5 rounded-full border border-[#F2CFD6]">
                    Administrator
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">{user.email}</p>
              {user.phone && <p className="text-xs text-stone-500">{user.phone}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <button
                onClick={() => setActivePage('admin')}
                className="px-4 py-2 bg-[#FAF2F4] text-[#8C384E] border border-[#F2CFD6] rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-[#F5DEE3] transition-colors"
              >
                Go to Admin Panel
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-[#F0E5E0] mb-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'orders' ? 'text-[#8C384E]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Past Orders ({orders.length})
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'profile' ? 'text-[#8C384E]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Saved Addresses
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E]" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' ? (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white p-8 rounded-xl border border-[#F0E5E0] text-center">
                <Package className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-stone-700">No orders placed yet</p>
                <p className="text-xs text-stone-400 mt-1 mb-4">Start discovering our clean luxury beauty catalog.</p>
                <button
                  onClick={() => setActivePage('shop')}
                  className="px-5 py-2 bg-[#8C384E] text-white text-xs font-bold uppercase tracking-wider rounded-xs"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-5 sm:p-6 rounded-xl border border-[#F0E5E0] shadow-2xs hover:border-[#E8CAD2] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5EAE6] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#3F1722]">
                          Order #{order.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#3F1722] tabular-nums">
                        Total: ₹{order.total}
                      </span>
                      <button
                        onClick={() => onInspectOrder(order)}
                        className="px-3.5 py-1.5 bg-[#FAF2F4] text-[#8C384E] hover:bg-[#8C384E] hover:text-white rounded-xs text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Live Tracking</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="pt-4 flex flex-wrap gap-4 items-center">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                        <div className="w-10 h-10 rounded bg-[#FAF6F4] p-1 border border-[#F0E5E0] shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-[#3F1722] truncate max-w-[150px]">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-stone-400">
                            Qty: {item.quantity} · ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl border border-[#F0E5E0] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#3F1722]">Default Delivery Address</h3>
            {user.savedAddresses && user.savedAddresses.length > 0 ? (
              user.savedAddresses.map((addr, idx) => (
                <div key={idx} className="p-4 bg-[#FAF6F4] rounded-lg border border-[#EDE2DC] text-xs space-y-1">
                  <p className="font-bold text-[#3F1722]">{addr.fullName}</p>
                  <p className="text-stone-600">{addr.address}</p>
                  <p className="text-stone-600">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-stone-500 pt-1">Phone: {addr.phone}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-500">No saved addresses found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
