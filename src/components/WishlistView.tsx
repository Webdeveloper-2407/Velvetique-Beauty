import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistViewProps {
  onQuickView: (product: Product) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({ onQuickView }) => {
  const { wishlist, products, setActivePage } = useShop();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-full bg-[#FAF2F4] text-[#8C384E] flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1722]">
            My Saved Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Keep track of your favorite clean formulas and easily transfer them into your bag.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F0E5E0] p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF2F4] text-[#8C384E] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#3F1722] mb-1">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Click the heart icon on any product to save it for later.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-2.5 bg-[#8C384E] text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#772A3E] transition-colors"
            >
              Discover Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
