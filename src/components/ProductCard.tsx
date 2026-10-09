import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const getCategoryFallbackImage = (category: string): string => {
  switch (category) {
    case 'makeup':
      return '/images/category_makeup.jpg';
    case 'haircare':
      return '/images/category_haircare.jpg';
    case 'bodycare':
      return '/images/category_bodycare.jpg';
    case 'suncare':
      return '/images/category_suncare.jpg';
    case 'tools':
      return '/images/category_tools.jpg';
    case 'giftsets':
      return '/images/category_giftsets.jpg';
    default:
      return '/images/category_skincare.jpg';
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const fallback = getCategoryFallbackImage(product.category);
    if (!target.src.includes(fallback)) {
      target.src = fallback;
    }
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div
      onClick={() => onQuickView && onQuickView(product)}
      className="group bg-white rounded-xl overflow-hidden border border-[#F2E5E0] hover:border-[#E5CDD3] transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top action: Wishlist button & Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
        <button
          onClick={handleToggleWishlist}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            wishlisted
              ? 'bg-[#FAF2F4] text-[#8C384E]'
              : 'bg-white/90 backdrop-blur-xs text-stone-400 hover:text-[#8C384E] hover:bg-white'
          } shadow-xs`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-[#8C384E]' : ''}`} />
        </button>

        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-stone-500 hover:text-[#8C384E] hover:bg-white shadow-xs flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Quick view product"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {discountPercent && (
          <span className="bg-[#8C384E] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs">
            {discountPercent}% OFF
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#FAF2F4] text-[#8C384E] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border border-[#F2CFD6]">
            New In
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <div className="w-full aspect-square bg-[#FAF6F4] relative overflow-hidden flex items-center justify-center p-3">
        <img
          src={product.image || getCategoryFallbackImage(product.category)}
          alt={product.imageAlt || product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-400 uppercase tracking-wider font-semibold mb-1">
            <span>{product.brand || 'Velvetique'}</span>
            <span>{product.volume}</span>
          </div>

          <h3 className="font-serif text-sm sm:text-base font-semibold text-[#3F1722] group-hover:text-[#8C384E] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1 font-light">
            {product.subtitle}
          </p>

          {/* Pricing */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-[#3F1722] tabular-nums">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ₹{product.originalPrice}
              </span>
            )}
            {!product.inStock && (
              <span className="text-[10px] text-rose-600 font-bold ml-auto uppercase">
                Out of Stock
              </span>
            )}
          </div>

          {/* Star Rating & Review Count */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex items-center text-[#E5A855]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current text-[#E5A855]'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-stone-500 font-medium tabular-nums">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <div className="mt-4 pt-3 border-t border-[#F8EFEA]">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 rounded-sm cursor-pointer ${
              !product.inStock
                ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                : addedAnimation
                ? 'bg-emerald-700 text-white'
                : 'bg-[#9B455B] hover:bg-[#853247] text-white shadow-xs hover:shadow-sm'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : !product.inStock ? (
              <span>Sold Out</span>
            ) : (
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
