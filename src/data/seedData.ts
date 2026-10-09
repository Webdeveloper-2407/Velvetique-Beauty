import { Product, Category, Coupon, BlogPost, Order, Collection } from '../types/index.ts';
import { FULL_CATALOG, CATALOG_CATEGORIES, CATALOG_COLLECTIONS } from './productsCatalog.ts';

export const HERO_IMAGE = '/images/hero_showcase.jpg';
export const PROMO_IMAGE = '/images/promo_flatlay.jpg';
export const SKINCARE_CATEGORY_IMG = '/images/category_skincare.jpg';
export const MAKEUP_CATEGORY_IMG = '/images/category_makeup.jpg';
export const HAIRCARE_CATEGORY_IMG = '/images/category_haircare.jpg';
export const BODYCARE_CATEGORY_IMG = '/images/category_bodycare.jpg';
export const SUNCARE_CATEGORY_IMG = '/images/category_suncare.jpg';
export const TOOLS_CATEGORY_IMG = '/images/category_tools.jpg';
export const GIFTSETS_CATEGORY_IMG = '/images/category_giftsets.jpg';

export const SEED_CATEGORIES: Category[] = CATALOG_CATEGORIES;
export const SEED_COLLECTIONS: Collection[] = CATALOG_COLLECTIONS;
export const SEED_PRODUCTS: Product[] = FULL_CATALOG;

export const SEED_COUPONS: Coupon[] = [
  {
    code: 'GLOW15',
    discountPercent: 15,
    minOrderAmount: 0,
    description: '15% OFF site-wide on all orders',
    isActive: true,
  },
  {
    code: 'FIRSTBUY',
    discountAmount: 200,
    minOrderAmount: 999,
    description: '₹200 OFF on orders above ₹999 for first time buyers',
    isActive: true,
  },
  {
    code: 'BEAUTY30',
    discountPercent: 30,
    minOrderAmount: 1499,
    description: 'Up to 30% OFF on orders above ₹1499',
    isActive: true,
  },
];

export const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'the-art-of-layering-clean-skincare',
    title: 'The Art of Layering: Clean Skincare Routine for Glass-Like Radiance',
    excerpt: 'Discover the exact dermatologist-approved order to apply your toner, serum, moisturizer, and facial oil for maximum absorption and all-day dewiness.',
    content: `
      Skincare is not just a daily task—it is a grounding morning and evening ritual. Knowing how to layer active clean ingredients is the key to achieving real luminosity without causing irritation or clogging pores.

      ### 1. Start with a Gentle, pH-Balanced Cleanse
      Never use harsh sulfates that strip your skin barrier. A balanced cleanser like our Rose Rejuvenating Gentle Cleanser prepares the skin by dissolving impurities while retaining vital moisture lipids.

      ### 2. Hydrating Toner on Damp Skin
      Always apply your toner or floral hydrosol while skin is still slightly damp. This acts as a moisture magnet for subsequent serums.

      ### 3. Lightweight Water-Based Serums
      Apply active serums such as 10% Niacinamide or Hyaluronic Acid next. Serums have smaller molecular weights and need direct skin contact to penetrate deeply.

      ### 4. Seal with Gel or Cream Moisturizer
      Lock in the hydration with our Hydra Intense Gel Moisturizer. The ceramides in this formula seal the moisture matrix.

      ### 5. Daytime Sunscreen / Nighttime Botanical Oil
      In the morning, finish without exception with an invisible broad-spectrum SPF 50+. At night, press 2-3 drops of botanical facial oil over your cream to nourish through the slumber hours.
    `,
    author: 'Dr. Aarohi Sharma, Dermatological Chemist',
    readTime: '4 min read',
    date: 'Oct 02, 2026',
    category: 'Skincare Science',
    image: HERO_IMAGE,
  },
  {
    id: 'blog-2',
    slug: 'demystifying-niacinamide-for-every-skin-type',
    title: 'Demystifying Niacinamide: Benefits for Indian Skin & Humidity',
    excerpt: 'Why Vitamin B3 is the undisputed hero active for reducing enlarged pores, calming acne flare-ups, and brightening stubborn post-blemish pigmentation.',
    content: `
      Niacinamide (Vitamin B3) has become one of the most celebrated ingredients in modern clean cosmetic science, and for good reason. Unlike harsh acids, Niacinamide is gentle, non-photosensitizing, and suits practically every skin type—from sensitive to hyper-reactive.

      ### Key Clinical Benefits:
      - **Sebum Regulation:** Balances oil glands to prevent midday shine without parching the skin.
      - **Pore Refinement:** Restores epidermal elasticity around follicular openings, making pores look remarkably tighter.
      - **Even Complexion:** Inhibits the transfer of melanosomes to keratinocytes, fading post-acne dark marks safely.

      Pair our 10% Niacinamide Serum with Hyaluronic Acid for maximum plumping benefits.
    `,
    author: 'Mira Sen, Clean Beauty Formulator',
    readTime: '3 min read',
    date: 'Sep 24, 2026',
    category: 'Ingredient Spotlight',
    image: SKINCARE_CATEGORY_IMG,
  },
  {
    id: 'blog-3',
    slug: 'botanical-haircare-secrets-for-glossy-strands',
    title: 'Botanical Haircare Secrets for Frizz-Free Gloss and Scalp Health',
    excerpt: 'Explore the Ayurvedic botanical extracts like Eucalyptus, Rosemary, and Argan that breathe new life into dry, humidity-stressed tresses.',
    content: `
      Healthy, reflective hair begins at the scalp root. When hair follicles are congested with synthetic styling buildup or stressed by extreme weather, hair becomes brittle and prone to split ends.

      Integrating cold-pressed botanical hair oils enriched with Rosemary and Eucalyptus stimulates microcirculation in the scalp. Massaging your roots for 5 minutes twice weekly, followed by a sulfate-free botanical shampoo, restores natural strength and vibrant bounce.
    `,
    author: 'Ananya Kapoor, Holistic Hair Stylist',
    readTime: '5 min read',
    date: 'Sep 18, 2026',
    category: 'Hair Wellness',
    image: HAIRCARE_CATEGORY_IMG,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: 'VB-98241',
    createdAt: '2026-10-06T14:32:00.000Z',
    items: [
      { product: SEED_PRODUCTS[1], quantity: 1, price: 799 },
      { product: SEED_PRODUCTS[2], quantity: 1, price: 649 },
    ],
    shippingAddress: {
      fullName: 'Rana Ahmed',
      email: 'ranaahmaed2407@gmail.com',
      phone: '+91 98765 43210',
      address: '42 Lotus Boulevard, Tower 4, Flat 1202',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    paymentMethod: 'upi',
    subtotal: 1448,
    discount: 217,
    shippingFee: 0,
    total: 1231,
    couponCode: 'GLOW15',
    status: 'Shipped',
    trackingSteps: [
      { status: 'Confirmed', label: 'Order Confirmed', description: 'Order verified & payment successful', timestamp: 'Oct 06, 02:32 PM', completed: true },
      { status: 'Processing', label: 'Processing & Packed', description: 'Packed at Mumbai Central Hub with eco-packaging', timestamp: 'Oct 06, 06:15 PM', completed: true },
      { status: 'Shipped', label: 'Handed to Courier', description: 'In transit with BlueDart Express (AWB: BLU982144)', timestamp: 'Oct 07, 10:45 AM', completed: true },
      { status: 'Out for Delivery', label: 'Out for Delivery', description: 'Courier partner is on the way to your doorstep', timestamp: 'Expected Oct 09', completed: false },
      { status: 'Delivered', label: 'Delivered', description: 'Package safely delivered with OTP verification', timestamp: 'Expected Oct 09', completed: false },
    ],
  },
];
