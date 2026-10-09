import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  SEED_PRODUCTS,
  SEED_CATEGORIES,
  SEED_COUPONS,
  SEED_BLOG_POSTS,
  INITIAL_ORDERS
} from './src/data/seedData.ts';
import { Product, Coupon, Order, Review, UserProfile, OrderStatus } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database Store
let products: Product[] = [...SEED_PRODUCTS];
let categories = [...SEED_CATEGORIES];
let coupons: Coupon[] = [...SEED_COUPONS];
let blogPosts = [...SEED_BLOG_POSTS];
let orders: Order[] = [...INITIAL_ORDERS];
let reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Kavita Iyer',
    rating: 5,
    title: 'Cleared my stubborn blackheads in 2 weeks!',
    comment: 'I have oily T-zone and very sensitive skin. This face wash foams delicately without that squeaky tight feel. My skin feels fresh, hydrated, and noticeably cleaner.',
    date: '2026-09-28',
    verifiedBuyer: true,
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Sneha Patel',
    rating: 5,
    title: 'HG cleanser for humid weather',
    comment: 'The tea tree note is refreshing and not overpowering. Helped dramatically with post-workout breakouts.',
    date: '2026-10-01',
    verifiedBuyer: true,
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    userName: 'Pooja Verma',
    rating: 5,
    title: 'Visible glow & smaller pores!',
    comment: 'The texture is like liquid silk. It absorbs in 10 seconds without tackiness. After using for 3 weeks my acne scars have faded significantly.',
    date: '2026-09-30',
    verifiedBuyer: true,
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    userName: 'Ananya Sharma',
    rating: 5,
    title: 'The best lightweight moisturizer ever',
    comment: 'Dewy finish without looking oily. Sits so well under makeup. My skin feels bouncy all day long.',
    date: '2026-10-04',
    verifiedBuyer: true,
  },
  {
    id: 'rev-5',
    productId: 'prod-4',
    userName: 'Rhea Sen',
    rating: 5,
    title: 'Most comfortable matte lipstick I own',
    comment: 'The Dusky Plum shade is universally flattering. Rich pigment in one swipe and does not dry out my lips.',
    date: '2026-09-15',
    verifiedBuyer: true,
  },
];

let users: UserProfile[] = [
  {
    id: 'usr-admin',
    fullName: 'Velvetique Store Admin',
    email: 'admin@velvetique.com',
    phone: '+91 99887 76655',
    role: 'admin',
  },
  {
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
  },
];

// --- API ROUTES ---

// 1. Products API
app.get('/api/products', (req: Request, res: Response) => {
  let filtered = [...products];
  const { category, search, minPrice, maxPrice, rating, sort, isBestSeller, isLimitedOffer } = req.query;

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }

  if (rating) {
    filtered = filtered.filter((p) => p.rating >= Number(rating));
  }

  if (isBestSeller === 'true') {
    filtered = filtered.filter((p) => p.isBestSeller);
  }

  if (isLimitedOffer === 'true') {
    filtered = filtered.filter((p) => p.isLimitedOffer);
  }

  if (sort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  } else if (sort === 'newest') {
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  res.json({ success: true, count: filtered.length, products: filtered });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ success: false, message: 'Product not found' });
    return;
  }
  res.json({ success: true, product });
});

app.post('/api/products', (req: Request, res: Response) => {
  const newProduct: Product = {
    ...req.body,
    id: `prod-${Date.now()}`,
    rating: req.body.rating || 5.0,
    reviewCount: req.body.reviewCount || 1,
    inStock: req.body.inStock ?? true,
    stock: req.body.stock ?? 25,
  };
  products.unshift(newProduct);
  res.status(201).json({ success: true, product: newProduct });
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'Product not found' });
    return;
  }
  products[index] = { ...products[index], ...req.body };
  res.json({ success: true, product: products[index] });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'Product not found' });
    return;
  }
  const deleted = products.splice(index, 1)[0];
  res.json({ success: true, message: 'Product deleted successfully', product: deleted });
});

// 2. Categories API
app.get('/api/categories', (_req: Request, res: Response) => {
  // Update item counts dynamically based on current products catalog
  const enrichedCategories = categories.map((cat) => ({
    ...cat,
    itemCount: products.filter((p) => p.category === cat.id).length,
  }));
  res.json({ success: true, categories: enrichedCategories });
});

// 3. Coupons API
app.get('/api/coupons', (_req: Request, res: Response) => {
  res.json({ success: true, coupons });
});

app.post('/api/coupons/validate', (req: Request, res: Response) => {
  const { code, orderAmount } = req.body;
  if (!code) {
    res.status(400).json({ success: false, message: 'Coupon code is required' });
    return;
  }
  const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
  if (!coupon) {
    res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    return;
  }
  if (orderAmount < coupon.minOrderAmount) {
    res.status(400).json({
      success: false,
      message: `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon`,
    });
    return;
  }

  let discount = 0;
  if (coupon.discountPercent) {
    discount = Math.round((orderAmount * coupon.discountPercent) / 100);
  } else if (coupon.discountAmount) {
    discount = Math.min(orderAmount, coupon.discountAmount);
  }

  res.json({
    success: true,
    coupon,
    discount,
    finalAmount: Math.max(0, orderAmount - discount),
    message: `Coupon ${coupon.code} applied successfully!`,
  });
});

app.post('/api/coupons', (req: Request, res: Response) => {
  const newCoupon: Coupon = {
    ...req.body,
    code: req.body.code.toUpperCase(),
    isActive: true,
  };
  coupons.push(newCoupon);
  res.status(201).json({ success: true, coupon: newCoupon });
});

// 4. Reviews API
app.get('/api/reviews/:productId', (req: Request, res: Response) => {
  const productReviews = reviews.filter((r) => r.productId === req.params.productId);
  res.json({ success: true, reviews: productReviews });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { productId, userName, rating, title, comment } = req.body;
  if (!productId || !userName || !rating || !comment) {
    res.status(400).json({ success: false, message: 'Missing required review fields' });
    return;
  }
  const newReview: Review = {
    id: `rev-${Date.now()}`,
    productId,
    userName,
    rating: Number(rating),
    title: title || 'Honest Review',
    comment,
    date: new Date().toISOString().split('T')[0],
    verifiedBuyer: true,
  };
  reviews.unshift(newReview);

  // Recalculate product rating
  const pReviews = reviews.filter((r) => r.productId === productId);
  const avg = pReviews.reduce((sum, r) => sum + r.rating, 0) / pReviews.length;
  const pIndex = products.findIndex((p) => p.id === productId);
  if (pIndex !== -1) {
    products[pIndex].rating = Number(avg.toFixed(1));
    products[pIndex].reviewCount = pReviews.length;
  }

  res.status(201).json({ success: true, review: newReview });
});

// 5. Orders API
app.get('/api/orders', (req: Request, res: Response) => {
  const { email } = req.query;
  if (email && typeof email === 'string') {
    const userOrders = orders.filter((o) => o.shippingAddress.email.toLowerCase() === email.toLowerCase());
    res.json({ success: true, orders: userOrders });
    return;
  }
  res.json({ success: true, orders });
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = orders.find((o) => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) {
    res.status(404).json({ success: false, message: 'Order not found' });
    return;
  }
  res.json({ success: true, order });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { items, shippingAddress, paymentMethod, subtotal, discount, shippingFee, total, couponCode } = req.body;
  if (!items || items.length === 0 || !shippingAddress) {
    res.status(400).json({ success: false, message: 'Order items and shipping address are required' });
    return;
  }

  const orderNum = `VB-${Math.floor(10000 + Math.random() * 90000)}`;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) + ', ' +
    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: orderNum,
    createdAt: now.toISOString(),
    items,
    shippingAddress,
    paymentMethod: paymentMethod || 'upi',
    subtotal: subtotal || items.reduce((s: number, i: any) => s + i.price * i.quantity, 0),
    discount: discount || 0,
    shippingFee: shippingFee || 0,
    total: total || subtotal,
    couponCode,
    status: 'Confirmed',
    trackingSteps: [
      { status: 'Confirmed', label: 'Order Confirmed', description: 'Order placed & verification successful', timestamp: dateFormatted, completed: true },
      { status: 'Processing', label: 'Processing & Packed', description: 'Under preparation with clean velvet pouch packaging', timestamp: 'Pending', completed: false },
      { status: 'Shipped', label: 'Handed to Courier', description: 'Dispatched via express air delivery', timestamp: 'Pending', completed: false },
      { status: 'Out for Delivery', label: 'Out for Delivery', description: 'Delivery agent assigned in your city', timestamp: 'Pending', completed: false },
      { status: 'Delivered', label: 'Delivered', description: 'Package safely delivered with OTP verification', timestamp: 'Pending', completed: false },
    ],
  };

  // Decrement inventory stock
  items.forEach((item: any) => {
    const prod = products.find((p) => p.id === item.product?.id || p.id === item.productId);
    if (prod && prod.stock >= item.quantity) {
      prod.stock -= item.quantity;
      if (prod.stock <= 0) prod.inStock = false;
    }
  });

  orders.unshift(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.put('/api/orders/:id/status', (req: Request, res: Response) => {
  const { status } = req.body as { status: OrderStatus };
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    res.status(404).json({ success: false, message: 'Order not found' });
    return;
  }

  order.status = status;
  const statusRank: Record<OrderStatus, number> = {
    Confirmed: 0,
    Processing: 1,
    Shipped: 2,
    'Out for Delivery': 3,
    Delivered: 4,
  };
  const currentRank = statusRank[status] ?? 0;

  order.trackingSteps.forEach((step, idx) => {
    if (idx <= currentRank) {
      step.completed = true;
      if (step.timestamp === 'Pending') {
        step.timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      }
    } else {
      step.completed = false;
    }
  });

  res.json({ success: true, order });
});

// 6. Blog API
app.get('/api/blog', (_req: Request, res: Response) => {
  res.json({ success: true, posts: blogPosts });
});

app.get('/api/blog/:slug', (req: Request, res: Response) => {
  const post = blogPosts.find((p) => p.slug === req.params.slug);
  if (!post) {
    res.status(404).json({ success: false, message: 'Article not found' });
    return;
  }
  res.json({ success: true, post });
});

// 7. Auth API
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ success: false, message: 'Email is required' });
    return;
  }
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    res.json({ success: true, user: existing, token: 'mock-jwt-token-velvetique' });
    return;
  }
  // Default login or auto-register customer
  const newUser: UserProfile = {
    id: `usr-${Date.now()}`,
    fullName: email.split('@')[0].replace(/[._]/g, ' '),
    email,
    role: email.includes('admin') ? 'admin' : 'customer',
  };
  users.push(newUser);
  res.json({ success: true, user: newUser, token: 'mock-jwt-token-velvetique' });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { fullName, email, phone } = req.body;
  if (!email || !fullName) {
    res.status(400).json({ success: false, message: 'Full name and email are required' });
    return;
  }
  const newUser: UserProfile = {
    id: `usr-${Date.now()}`,
    fullName,
    email,
    phone,
    role: email.includes('admin') ? 'admin' : 'customer',
  };
  users.push(newUser);
  res.status(201).json({ success: true, user: newUser, token: 'mock-jwt-token-velvetique' });
});

// Start Express and Vite Middlewares
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Velvetique Beauty server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
