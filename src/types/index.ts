export type ProductCategory = 'skincare' | 'makeup' | 'haircare' | 'bodycare' | 'suncare' | 'giftsets';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  ingredients: string[];
  howToUse: string;
  benefits: string[];
  volume: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  isLimitedOffer?: boolean;
  inStock: boolean;
  stock: number;
  skinType?: string;
}

export interface Category {
  id: ProductCategory;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderAmount: number;
  description: string;
  isActive: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  trackingSteps: {
    status: OrderStatus;
    label: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  image: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  savedAddresses?: ShippingAddress[];
}
