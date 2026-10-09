import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CollectionsViewProps {
  onQuickView: (product: Product) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({ onQuickView }) => {
  const { products, setActivePage } = useShop();

  const hydrationHeroes = products.filter((p) => p.category === 'skincare').slice(0, 3);
  const bestsellersUnder999 = products.filter((p) => p.price <= 999).slice(0, 4);

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C384E]">
            Curated Beauty Edits
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1722] mt-1">
            Exclusive Collections
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 font-light">
            Expertly paired regimens and themed edits designed to simplify your everyday botanical beauty ritual.
          </p>
        </div>

        {/* Collection 1: Hydration Heroes */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#F0E5E0] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C384E]">
                Featured Routine
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#3F1722] mt-0.5">
                Glass Skin & Hydration Ritual
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Formulated with triple-weight Hyaluronic Acid and Sea Kelp ceramides.
              </p>
            </div>
            <button
              onClick={() => setActivePage('shop')}
              className="text-xs font-bold text-[#8C384E] hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {hydrationHeroes.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>

        {/* Collection 2: Under 999 */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#F0E5E0] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C384E]">
                Accessible Luxury
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#3F1722] mt-0.5">
                Bestsellers Under ₹999
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Pocket-friendly everyday luxury without compromising on organic purity.
              </p>
            </div>
            <button
              onClick={() => setActivePage('shop')}
              className="text-xs font-bold text-[#8C384E] hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellersUnder999.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
