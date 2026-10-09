import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product, Collection } from '../types';
import { Sparkles, ArrowRight, Tag, Star, Gift } from 'lucide-react';
import { SEED_COLLECTIONS } from '../data/seedData';

interface CollectionsViewProps {
  onQuickView: (product: Product) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({ onQuickView }) => {
  const { products, setActivePage } = useShop();
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('all');

  // Filter products by collection
  const getProductsForCollection = (colId: string) => {
    switch (colId) {
      case 'bestsellers':
        return products.filter((p) => p.isBestSeller).slice(0, 12);
      case 'new-arrivals':
        return products.filter((p) => p.isNew).slice(0, 12);
      case 'sale':
        return products.filter((p) => p.originalPrice && p.originalPrice > p.price).slice(0, 12);
      case 'radiant-skin':
        return products.filter((p) => p.collections?.includes('radiant-skin')).slice(0, 12);
      case 'under-999':
        return products.filter((p) => p.price <= 999).slice(0, 12);
      case 'bridal-luxury':
        return products.filter((p) => p.category === 'giftsets' || p.collections?.includes('bridal-luxury')).slice(0, 12);
      default:
        return products.slice(0, 12);
    }
  };

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C384E]">
            Curated Beauty Edits & Rituals
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1722] mt-1">
            Exclusive Collections
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 font-light">
            Thoughtfully assembled regimens and limited editions designed to elevate your everyday vanity ritual.
          </p>
        </div>

        {/* Collection Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCollectionId('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              selectedCollectionId === 'all'
                ? 'bg-[#8C384E] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-[#E0D5D0] hover:border-[#8C384E]'
            }`}
          >
            All Collections ({SEED_COLLECTIONS.length})
          </button>
          {SEED_COLLECTIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCollectionId(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedCollectionId === c.id
                  ? 'bg-[#8C384E] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-[#E0D5D0] hover:border-[#8C384E]'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Collections Display */}
        {SEED_COLLECTIONS.filter(
          (c) => selectedCollectionId === 'all' || selectedCollectionId === c.id
        ).map((collection) => {
          const colProducts = getProductsForCollection(collection.id);

          return (
            <div
              key={collection.id}
              className="bg-white rounded-2xl border border-[#F0E5E0] shadow-xs overflow-hidden"
            >
              {/* Collection Banner Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#F0E5E0]">
                <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C384E] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{collection.subtitle}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1722] mb-3">
                    {collection.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-xl mb-6">
                    {collection.description}
                  </p>
                  <div>
                    <button
                      onClick={() => setActivePage('shop')}
                      className="px-5 py-2.5 bg-[#8C384E] text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#772A3E] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Shop Full Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#F5EBE6] min-h-[220px] max-h-[300px] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_showcase.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Products in Collection */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {colProducts.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={onQuickView}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
