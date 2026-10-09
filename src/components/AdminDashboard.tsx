import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, Order, Coupon, OrderStatus } from '../types';
import {
  Package,
  ShoppingBag,
  Tag,
  Plus,
  Trash2,
  Edit2,
  Check,
  ShieldCheck,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';
import { SEED_CATEGORIES, INITIAL_ORDERS, SEED_COUPONS } from '../data/seedData';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    updateProductInList,
    deleteProductFromList,
    addProductToList,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons'>('products');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [coupons, setCoupons] = useState<Coupon[]>(SEED_COUPONS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [newProductName, setNewProductName] = useState('');
  const [newProductSubtitle, setNewProductSubtitle] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<'skincare' | 'makeup' | 'haircare' | 'bodycare' | 'suncare' | 'giftsets'>('skincare');
  const [newProductPrice, setNewProductPrice] = useState(599);
  const [newProductStock, setNewProductStock] = useState(40);
  const [newProductImage, setNewProductImage] = useState('/src/assets/images/category_skincare_bottles_1791463066934.jpg');

  // New coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(20);
  const [newCouponMin, setNewCouponMin] = useState(999);

  // Load orders from API
  const fetchAdminOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.orders) setOrders(data.orders);
      }
    } catch {
      // offline
    }
  };

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
          showToast(`Order status updated to ${newStatus}`);
          return;
        }
      }
    } catch {
      // local fallback
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              trackingSteps: o.trackingSteps.map((s, idx) => ({
                ...s,
                completed:
                  idx <=
                  ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(
                    newStatus
                  ),
              })),
            }
          : o
      )
    );
    showToast(`Order status updated to ${newStatus}`);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProductName,
      subtitle: newProductSubtitle || 'Botanical Formula',
      category: newProductCategory,
      price: Number(newProductPrice),
      rating: 5.0,
      reviewCount: 1,
      image: newProductImage,
      description: 'Exclusive clean botanical beauty remedy formulated with pure organic extracts.',
      ingredients: ['Organic Floral Water', 'Botanical Glycerin', 'Active Herbal Extracts'],
      howToUse: 'Apply gently onto skin in upward circular motions.',
      benefits: ['Supports lipid moisture barrier', 'Leaves velvet radiant glow'],
      volume: '100 ml',
      inStock: true,
      stock: Number(newProductStock),
      isBestSeller: false,
      isNew: true,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd),
      });
      const data = await res.json();
      if (data.product) {
        addProductToList(data.product);
      } else {
        addProductToList(newProd);
      }
    } catch {
      addProductToList(newProd);
    }

    showToast(`Product "${newProductName}" added successfully!`);
    setIsAddModalOpen(false);
    setNewProductName('');
    setNewProductSubtitle('');
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
      } catch {
        // local
      }
      deleteProductFromList(id);
      showToast(`Deleted "${name}"`);
    }
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const newC: Coupon = {
      code: newCouponCode.toUpperCase().trim(),
      discountPercent: Number(newCouponDiscount),
      minOrderAmount: Number(newCouponMin),
      description: `${newCouponDiscount}% off on orders above ₹${newCouponMin}`,
      isActive: true,
    };
    setCoupons([newC, ...coupons]);
    showToast(`Coupon ${newC.code} activated!`);
    setNewCouponCode('');
  };

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8C384E]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C384E]">
                Store Administration
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#3F1722] mt-1">
              Velvetique Admin Dashboard
            </h1>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-[#8C384E] hover:bg-[#772A3E] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[#F0E5E0] shadow-2xs">
            <span className="text-stone-400 text-xs uppercase font-medium">Catalog Items</span>
            <p className="text-2xl font-bold text-[#3F1722] mt-1 tabular-nums">{products.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#F0E5E0] shadow-2xs">
            <span className="text-stone-400 text-xs uppercase font-medium">Customer Orders</span>
            <p className="text-2xl font-bold text-[#3F1722] mt-1 tabular-nums">{orders.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#F0E5E0] shadow-2xs">
            <span className="text-stone-400 text-xs uppercase font-medium">Active Coupons</span>
            <p className="text-2xl font-bold text-[#3F1722] mt-1 tabular-nums">{coupons.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#F0E5E0] shadow-2xs">
            <span className="text-stone-400 text-xs uppercase font-medium">Avg Product Rating</span>
            <p className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">4.9 ★</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-4 border-b border-[#F0E5E0] mb-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'products' ? 'text-[#8C384E]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Manage Products ({products.length})
            {activeTab === 'products' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'orders' ? 'text-[#8C384E]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Manage Orders ({orders.length})
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'coupons' ? 'text-[#8C384E]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Manage Coupons ({coupons.length})
            {activeTab === 'coupons' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E]" />
            )}
          </button>
        </div>

        {/* Tab 1: Products */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl border border-[#F0E5E0] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF6F4] text-stone-600 font-bold uppercase tracking-wider border-b border-[#F0E5E0]">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EAE6]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF4F0]/60 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded bg-[#FAF6F4] border border-[#F0E5E0]"
                        />
                        <div>
                          <p className="font-semibold text-[#3F1722]">{p.name}</p>
                          <p className="text-[11px] text-stone-400">{p.subtitle}</p>
                        </div>
                      </td>
                      <td className="p-4 capitalize text-stone-600 font-medium">{p.category}</td>
                      <td className="p-4 font-bold text-[#3F1722] tabular-nums">₹{p.price}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.stock > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-stone-700 tabular-nums">{p.rating} ★</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-white p-5 rounded-xl border border-[#F0E5E0] shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0E5E0] pb-3 mb-3">
                  <div>
                    <span className="font-bold text-sm text-[#3F1722]">Order #{o.orderNumber}</span>
                    <span className="text-xs text-stone-400 ml-3">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Customer: <strong>{o.shippingAddress.fullName}</strong> ({o.shippingAddress.email})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-stone-600">Update Status:</span>
                    <select
                      value={o.status}
                      onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                      className="text-xs p-1.5 border border-[#E0D5D0] rounded-sm bg-white font-semibold text-[#8C384E]"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Items: {o.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}</span>
                  <span className="font-bold text-[#3F1722] text-sm tabular-nums">Total: ₹{o.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Coupons */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white p-5 rounded-xl border border-[#F0E5E0] shadow-2xs">
              <h3 className="font-serif text-lg font-bold text-[#3F1722] mb-3">Create New Coupon</h3>
              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    placeholder="e.g. SUMMER25"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full p-2 border border-[#E0D5D0] rounded uppercase focus:border-[#8C384E] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full p-2 border border-[#E0D5D0] rounded focus:border-[#8C384E] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Min Order Amount (₹)</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full p-2 border border-[#E0D5D0] rounded focus:border-[#8C384E] outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#8C384E] text-white font-bold uppercase tracking-wider rounded transition-colors hover:bg-[#772A3E]"
                >
                  Activate Coupon
                </button>
              </form>
            </div>

            <div className="md:col-span-2 space-y-3">
              {coupons.map((c, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-[#F0E5E0] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#8C384E]" />
                      <span className="font-bold text-sm text-[#3F1722]">{c.code}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">{c.description}</p>
                  </div>
                  <span className="text-xs font-semibold text-stone-600">
                    Min Order: ₹{c.minOrderAmount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Add New Product */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#F0E5E0] shadow-2xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#3F1722]">Add New Catalog Product</h3>
              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. Rose Hydrating Facial Toner"
                    className="w-full p-2 border border-[#E0D5D0] rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Subtitle / Active Ingredient</label>
                  <input
                    type="text"
                    value={newProductSubtitle}
                    onChange={(e) => setNewProductSubtitle(e.target.value)}
                    placeholder="e.g. with Damask Rose & Aloe Vera"
                    className="w-full p-2 border border-[#E0D5D0] rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Category</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value as any)}
                      className="w-full p-2 border border-[#E0D5D0] rounded bg-white"
                    >
                      <option value="skincare">Skincare</option>
                      <option value="makeup">Makeup</option>
                      <option value="haircare">Haircare</option>
                      <option value="bodycare">Bodycare</option>
                      <option value="suncare">Sun Care</option>
                      <option value="giftsets">Gift Sets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(Number(e.target.value))}
                      className="w-full p-2 border border-[#E0D5D0] rounded"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(Number(e.target.value))}
                    className="w-full p-2 border border-[#E0D5D0] rounded"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-[#F0E5E0]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 rounded text-stone-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#8C384E] text-white rounded font-bold uppercase tracking-wider"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
