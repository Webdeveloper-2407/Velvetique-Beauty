import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Order, UserProfile } from '../types';
import { SEED_PRODUCTS, SEED_COUPONS } from '../data/seedData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // product IDs
  user: UserProfile | null;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  isCartOpen: boolean;
  isAuthOpen: boolean;
  authMode: 'login' | 'register';
  activePage: string;
  pageParam: string;
  searchQuery: string;
  toasts: Toast[];
  // Actions
  setActivePage: (page: string, param?: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean, mode?: 'login' | 'register') => void;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  login: (email: string, fullName?: string) => void;
  logout: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  cartSubtotal: number;
  shippingFee: number;
  cartTotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  refreshProducts: () => Promise<void>;
  updateProductInList: (product: Product) => void;
  deleteProductFromList: (id: string) => void;
  addProductToList: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('velvetique_cart');
    return saved ? JSON.parse(saved) : [
      { productId: 'prod-2', product: SEED_PRODUCTS[1], quantity: 1 },
      { productId: 'prod-3', product: SEED_PRODUCTS[2], quantity: 1 },
    ];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('velvetique_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('velvetique_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-customer',
      fullName: 'Rana Ahmed',
      email: 'ranaahmaed2407@gmail.com',
      phone: '+91 98765 43210',
      role: 'customer',
      savedAddresses: [
        {
          fullName: 'Rana Ahmed',
          email: 'ranaahmaed2407@gmail.com',
          phone: '+91 98765 43210',
          address: '42 Lotus Boulevard, Tower 4, Flat 1202',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
      ],
    };
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(SEED_COUPONS[0]); // default GLOW15
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activePage, setActivePageInternal] = useState('home');
  const [pageParam, setPageParam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Fetch initial products from server if reachable, fallback to seed
  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      }
    } catch {
      // Offline fallback: keep seed products
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('velvetique_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('velvetique_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('velvetique_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('velvetique_user');
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const setActivePage = (page: string, param: string = '') => {
    setActivePageInternal(page);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId: product.id, product, quantity, selectedVariant: variant }];
    });
    showToast(`Added "${product.name}" to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.productId === productId);
    setCart((prev) => prev.filter((i) => i.productId !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}" from bag`, 'info');
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from your wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${product?.name || 'Item'}" to your wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 99;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  let couponDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountPercent) {
      couponDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      couponDiscount = Math.min(cartSubtotal, appliedCoupon.discountAmount);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const cleanCode = code.trim().toUpperCase();
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode, orderAmount: cartSubtotal }),
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setAppliedCoupon(data.coupon);
        showToast(data.message || `Code ${cleanCode} applied!`);
        return { success: true, message: data.message };
      } else {
        // Fallback local check
        const localCoupon = SEED_COUPONS.find((c) => c.code === cleanCode);
        if (localCoupon) {
          if (cartSubtotal < localCoupon.minOrderAmount) {
            return {
              success: false,
              message: `Minimum order amount of ₹${localCoupon.minOrderAmount} required for ${cleanCode}`,
            };
          }
          setAppliedCoupon(localCoupon);
          showToast(`Coupon ${cleanCode} applied!`);
          return { success: true, message: `Coupon ${cleanCode} applied!` };
        }
        return { success: false, message: data.message || 'Invalid or expired promo code.' };
      }
    } catch {
      // Local fallback
      const localCoupon = SEED_COUPONS.find((c) => c.code === cleanCode);
      if (localCoupon) {
        setAppliedCoupon(localCoupon);
        showToast(`Coupon ${cleanCode} applied!`);
        return { success: true, message: `Coupon ${cleanCode} applied!` };
      }
      return { success: false, message: 'Invalid or expired promo code.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  const login = (email: string, fullName?: string) => {
    const isAdmin = email.toLowerCase().includes('admin');
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: fullName || (isAdmin ? 'Velvetique Store Admin' : email.split('@')[0]),
      email,
      role: isAdmin ? 'admin' : 'customer',
      savedAddresses: [
        {
          fullName: fullName || email.split('@')[0],
          email,
          phone: '+91 98765 43210',
          address: '42 Lotus Boulevard, Tower 4, Flat 1202',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
      ],
    };
    setUser(newUser);
    setIsAuthOpen(false);
    showToast(`Welcome back, ${newUser.fullName}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  const updateProductInList = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  const deleteProductFromList = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addProductToList = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        user,
        appliedCoupon,
        couponDiscount,
        isCartOpen,
        isAuthOpen,
        authMode,
        activePage,
        pageParam,
        searchQuery,
        toasts,
        setActivePage,
        setIsCartOpen,
        setIsAuthOpen: (open, mode = 'login') => {
          setAuthMode(mode);
          setIsAuthOpen(open);
        },
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        applyCoupon,
        removeCoupon,
        login,
        logout,
        showToast,
        cartSubtotal,
        shippingFee,
        cartTotal,
        freeShippingThreshold,
        freeShippingProgress,
        refreshProducts,
        updateProductInList,
        deleteProductFromList,
        addProductToList,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
