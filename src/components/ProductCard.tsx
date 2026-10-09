import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [imageError, setImageError] = useState(false);
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

  return (
    <div
      onClick={() => onQuickView && onQuickView(product)}
      className="group bg-white rounded-xl overflow-hidden border border-[#F2E5E0] hover:border-[#E5CDD3] transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top action: Wishlist button & Badge */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleToggleWishlist}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            wishlisted
              ? 'bg-[#FAF2F4] text-[#8C384E]'
              : 'bg-white/80 backdrop-blur-xs text-stone-400 hover:text-[#8C384E] hover:bg-white'
          } shadow-xs`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-[#8C384E]' : ''}`} />
        </button>
      </div>

      {product.isNew && (
        <span className="absolute top-3 left-3 z-10 bg-[#FAF2F4] text-[#8C384E] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
          New In
        </span>
      )}

      {/* Product Image with Graceful Fallback Container */}
      <div className="w-full aspect-square bg-[#FAF6F4] relative overflow-hidden flex items-center justify-center p-4">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-[#FAF4F0] to-[#F5E6E8] rounded-lg">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8C384E] mb-2 shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <p className="text-xs font-serif font-bold text-[#3F1722]">{product.name}</p>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider mt-1">Velvetique Beauty</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
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
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ₹{product.originalPrice}
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
            className={`w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 rounded-sm cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-700 text-white'
                : 'bg-[#9B455B] hover:bg-[#853247] text-white shadow-xs hover:shadow-sm'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
