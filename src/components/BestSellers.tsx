import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface BestSellersProps {
  onQuickView?: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onQuickView }) => {
  const { products, setActivePage } = useShop();

  // Find best sellers or fallback to first 4 products
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const displayItems = bestSellers.length === 4 ? bestSellers : products.slice(0, 4);

  return (
    <section className="w-full bg-[#FAF6F4] py-14 sm:py-20 border-b border-[#F0E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and "VIEW ALL" */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#3F1722] font-semibold tracking-wider uppercase">
              Best Sellers
            </h2>
            <div className="w-12 h-0.5 bg-[#8C384E] mt-2 rounded-full opacity-60" />
          </div>

          <button
            onClick={() => setActivePage('shop')}
            className="text-xs sm:text-sm font-semibold text-[#8C384E] hover:text-[#3F1722] tracking-wider uppercase flex items-center gap-1.5 transition-colors pb-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {displayItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
