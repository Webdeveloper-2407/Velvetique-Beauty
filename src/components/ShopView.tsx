import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product, ProductCategory } from '../types';
import { Filter, SlidersHorizontal, Search, RotateCcw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SEED_CATEGORIES } from '../data/seedData';

interface ShopViewProps {
  onQuickView: (product: Product) => void;
  initialCategory?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({ onQuickView, initialCategory }) => {
  const { products, searchQuery, setSearchQuery } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(4500);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [onlyBestsellers, setOnlyBestsellers] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(24);

  // When initialCategory changes from props
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setSelectedSubcategory('all');
      setCurrentPage(1);
    }
  }, [initialCategory]);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedSort,
    maxPrice,
    minPrice,
    minRating,
    inStockOnly,
    onlySale,
    onlyBestsellers,
    selectedBrand,
    searchQuery,
  ]);

  // Extract available subcategories for selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const cat = SEED_CATEGORIES.find((c) => c.id === selectedCategory);
    return cat?.subcategories || [];
  }, [selectedCategory]);

  // Extract unique brands
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet);
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Subcategory
    if (selectedSubcategory && selectedSubcategory !== 'all') {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Brand
    if (selectedBrand && selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.ingredients && p.ingredients.some((i) => i.toLowerCase().includes(q))) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Price range
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Rating
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // In Stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Only Sale
    if (onlySale) {
      result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }

    // Only Bestsellers
    if (onlyBestsellers) {
      result = result.filter((p) => p.isBestSeller);
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
    } else if (selectedSort === 'discount') {
      result.sort((a, b) => {
        const discA = a.originalPrice ? a.originalPrice - a.price : 0;
        const discB = b.originalPrice ? b.originalPrice - b.price : 0;
        return discB - discA;
      });
    }

    return result;
  }, [
    products,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    searchQuery,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    onlySale,
    onlyBestsellers,
    selectedSort,
  ]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedBrand('all');
    setSelectedSort('featured');
    setMinPrice(0);
    setMaxPrice(4500);
    setMinRating(0);
    setInStockOnly(false);
    setOnlySale(false);
    setOnlyBestsellers(false);
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C384E]">
            Botanical Formulations & Atelier
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3F1722] mt-1">
            Shop All Beauty & Skincare
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light mt-2 max-w-lg mx-auto">
            Discover {products.length}+ certified clean formulas, botanical pigments, and luxury rituals crafted with clinical precision.
          </p>
        </div>

        {/* Category Pills Bar (Horizontal quick nav) */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#8C384E] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-[#E0D5D0] hover:border-[#8C384E]'
            }`}
          >
            All Products ({products.length})
          </button>
          {SEED_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedSubcategory('all');
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#8C384E] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-[#E0D5D0] hover:border-[#8C384E]'
              }`}
            >
              {cat.name} ({cat.itemCount})
            </button>
          ))}
        </div>

        {/* Subcategories Bar if category is selected */}
        {availableSubcategories.length > 0 && (
          <div className="mb-6 p-3 bg-white rounded-xl border border-[#F0E5E0] flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 shrink-0 mr-1">
              Subcategory:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSubcategory('all')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-[#FAF2F4] text-[#8C384E] font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All {selectedCategory}
            </button>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${
                  selectedSubcategory === sub
                    ? 'bg-[#FAF2F4] text-[#8C384E] font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {sub.replace('-', ' ')}
              </button>
            ))}
          </div>
        )}

        {/* Main Grid Layout: Filter Sidebar + Products Grid */}
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
                className="text-[11px] text-[#8C384E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Quick Badges Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                Quick Filters
              </h4>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                  <input
                    type="checkbox"
                    checked={onlyBestsellers}
                    onChange={(e) => setOnlyBestsellers(e.target.checked)}
                    className="accent-[#8C384E] rounded"
                  />
                  <span>Best Sellers Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                  <input
                    type="checkbox"
                    checked={onlySale}
                    onChange={(e) => setOnlySale(e.target.checked)}
                    className="accent-[#8C384E] rounded"
                  />
                  <span>On Sale / Discounted</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-stone-700">
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

            {/* Price Range Slider */}
            <div className="pt-4 border-t border-[#F0E5E0]">
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                <span>Price Ceiling</span>
                <span className="text-[#8C384E] tabular-nums font-bold">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="300"
                max="4500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8C384E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>₹300</span>
                <span>₹2,400</span>
                <span>₹4,500</span>
              </div>
            </div>

            {/* Minimum Star Rating */}
            <div className="pt-4 border-t border-[#F0E5E0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Customer Rating
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

            {/* Brand Filter */}
            {availableBrands.length > 1 && (
              <div className="pt-4 border-t border-[#F0E5E0]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Atelier / Brand
                </h4>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs p-2 border border-[#E0D5D0] rounded bg-white text-stone-700 focus:outline-none focus:border-[#8C384E]"
                >
                  <option value="all">All Brands ({products.length})</option>
                  {availableBrands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Right: Products Listing & Pagination */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Search + Count + Sort + Page Size */}
            <div className="bg-white p-4 rounded-xl border border-[#F0E5E0] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search 1,000+ beauty formulas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#E0D5D0] rounded-sm focus:outline-none focus:border-[#8C384E]"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <span className="text-xs text-stone-500 whitespace-nowrap">
                  Showing <strong>{totalItems > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + pageSize, totalItems)}</strong> of <strong>{totalItems}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="text-xs p-1.5 border border-[#E0D5D0] rounded-sm bg-white text-stone-700 focus:outline-none focus:border-[#8C384E]"
                  >
                    <option value="featured">Featured Order</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Biggest Savings</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">New Arrivals</option>
                  </select>

                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="text-xs p-1.5 border border-[#E0D5D0] rounded-sm bg-white text-stone-500 focus:outline-none"
                    title="Items per page"
                  >
                    <option value={12}>12 / page</option>
                    <option value={24}>24 / page</option>
                    <option value={48}>48 / page</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {totalItems === 0 ? (
              <div className="bg-white rounded-xl border border-[#F0E5E0] p-12 text-center">
                <p className="font-serif text-lg font-bold text-[#3F1722] mb-1">
                  No products matched your criteria
                </p>
                <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
                  We could not find items matching your active filters. Try expanding the price ceiling or resetting filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#8C384E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#772A3E]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-white p-4 rounded-xl border border-[#F0E5E0] flex items-center justify-between shadow-2xs">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                    currentPage === 1
                      ? 'text-stone-300 cursor-not-allowed'
                      : 'text-stone-700 hover:bg-[#FAF2F4] hover:text-[#8C384E]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(7, totalPages) }, (_, idx) => {
                    let pageNum = idx + 1;
                    if (totalPages > 7) {
                      if (currentPage > 4) {
                        pageNum = currentPage - 3 + idx;
                        if (pageNum > totalPages) pageNum = totalPages - (6 - idx);
                      }
                    }
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded text-xs font-semibold transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-[#8C384E] text-white shadow-xs'
                            : 'text-stone-600 hover:bg-[#FAF4F0] hover:text-[#8C384E]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 7 && currentPage < totalPages - 3 && (
                    <span className="text-xs text-stone-400 px-1">... {totalPages}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                    currentPage === totalPages
                      ? 'text-stone-300 cursor-not-allowed'
                      : 'text-stone-700 hover:bg-[#FAF2F4] hover:text-[#8C384E]'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
