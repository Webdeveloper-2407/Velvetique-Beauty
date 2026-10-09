import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ValueProps } from './components/ValueProps';
import { CategoryCircles } from './components/CategoryCircles';
import { LimitedOfferBanner } from './components/LimitedOfferBanner';
import { BestSellers } from './components/BestSellers';
import { TrustBadges } from './components/TrustBadges';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AuthModal } from './components/AuthModal';
import { ToastNotification } from './components/ToastNotification';
import { ShopView } from './components/ShopView';
import { AccountView } from './components/AccountView';
import { WishlistView } from './components/WishlistView';
import { CollectionsView } from './components/CollectionsView';
import { BlogView } from './components/BlogView';
import { AboutContactView } from './components/AboutContactView';
import { AdminDashboard } from './components/AdminDashboard';
import { Product, Order } from './types';

const MainLayout: React.FC = () => {
  const { activePage, pageParam } = useShop();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
  };

  const handleInspectOrder = (order: Order) => {
    setConfirmedOrder(order);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F4] text-[#2D2A2A]">
      {/* Top Header */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroBanner />
            <ValueProps />
            <CategoryCircles />
            <LimitedOfferBanner />
            <BestSellers onQuickView={handleQuickView} />
            <TrustBadges />
          </>
        )}

        {activePage === 'shop' && (
          <ShopView onQuickView={handleQuickView} />
        )}

        {activePage === 'category' && (
          <ShopView onQuickView={handleQuickView} initialCategory={pageParam} />
        )}

        {activePage === 'account' && (
          <AccountView onInspectOrder={handleInspectOrder} />
        )}

        {activePage === 'wishlist' && (
          <WishlistView onQuickView={handleQuickView} />
        )}

        {activePage === 'collections' && (
          <CollectionsView onQuickView={handleQuickView} />
        )}

        {activePage === 'blog' && (
          <BlogView />
        )}

        {activePage === 'about' && (
          <AboutContactView initialView="about" />
        )}

        {activePage === 'contact' && (
          <AboutContactView initialView="contact" />
        )}

        {activePage === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Luxury 4-Column Footer */}
      <Footer />

      {/* Global Overlays & Modals */}
      <CartDrawer onProceedCheckout={() => setIsCheckoutOpen(true)} />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderSuccess}
      />
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />
      <AuthModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
