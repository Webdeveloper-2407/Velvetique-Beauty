import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product, ProductCategory } from '../types';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { SEED_CATEGORIES } from '../data/seedData';

interface ShopViewProps {
  onQuickView: (product: Product) => void;
  initialCategory?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({ onQuickView, initialCategory }) => {
  const { products, searchQuery, setSearchQuery } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // In Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    if (selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (selectedSort === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, selectedSort]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSort('featured');
    setMaxPrice(2500);
    setMinRating(0);
    setInStockOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C384E]">
            Botanical Formulations
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3F1722] mt-1">
            Shop All Beauty & Skincare
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light mt-2 max-w-lg mx-auto">
            Clean, certified botanical remedies formulated with high-potency actives for healthy, barrier-supported radiance.
          </p>
        </div>

        {/* Filter Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white p-5 rounded-xl border border-[#F0E5E0] shadow-2xs h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E5E0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F1722] flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#8C384E]" />
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#8C384E] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                Category
              </h4>
              <div className="space-y-1.5 text-xs text-stone-600">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors flex justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-[#FAF2F4] text-[#8C384E] font-bold'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <span>All Products</span>
                  <span className="text-[10px] text-stone-400">({products.length})</span>
                </button>
                {SEED_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors flex justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-[#FAF2F4] text-[#8C384E] font-bold'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-stone-400">
                      ({products.filter((p) => p.category === cat.id).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Filter */}
            <div className="pt-4 border-t border-[#F0E5E0]">
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                <span>Max Price</span>
                <span className="text-[#8C384E] tabular-nums">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="300"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8C384E]"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>₹300</span>
                <span>₹2,500</span>
              </div>
            </div>

            {/* Minimum Star Rating */}
            <div className="pt-4 border-t border-[#F0E5E0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Minimum Rating
              </h4>
              <div className="space-y-1 text-xs">
                {[0, 4.5, 4.8, 5.0].map((rate) => (
                  <label key={rate} className="flex items-center gap-2 cursor-pointer text-stone-600">
                    <input
                      type="radio"
                      name="minRating"
                      checked={minRating === rate}
                      onChange={() => setMinRating(rate)}
                      className="accent-[#8C384E]"
                    />
                    <span>{rate === 0 ? 'All Ratings' : `${rate}★ & Above`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-4 border-t border-[#F0E5E0]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#8C384E] rounded"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Right: Products Listing */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Search + Count + Sort */}
            <div className="bg-white p-4 rounded-xl border border-[#F0E5E0] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#E0D5D0] rounded-sm focus:outline-none focus:border-[#8C384E]"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <span className="text-xs text-stone-500 whitespace-nowrap">
                  Showing <strong>{filteredProducts.length}</strong> items
                </span>

                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="text-xs p-1.5 border border-[#E0D5D0] rounded-sm bg-white text-stone-700 focus:outline-none focus:border-[#8C384E]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Additions</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#F0E5E0] p-12 text-center">
                <p className="font-serif text-lg font-bold text-[#3F1722] mb-1">
                  No products matched your criteria
                </p>
                <p className="text-xs text-stone-500 mb-4">
                  Try clearing some filters or searching with a different term.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 bg-[#8C384E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
      </div>
    </div>
  );
};
