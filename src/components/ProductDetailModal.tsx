import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Plus, Minus, Check, ShoppingBag, ShieldCheck, Leaf, Sparkles, ArrowRight } from 'lucide-react';
import { Product, Review, ProductVariant } from '../types';
import { useShop } from '../context/ShopContext';
import { getCategoryFallbackImage } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow?: (product: Product, quantity: number, variant?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onBuyNow }) => {
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'howToUse' | 'reviews'>('details');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedImage(product.image || getCategoryFallbackImage(product.category));
      setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : null);

      // Fetch reviews
      fetch(`/api/reviews/${product.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          } else {
            setReviews([
              {
                id: 'rev-def-1',
                productId: product.id,
                userName: 'Ananya Sharma',
                rating: 5,
                title: 'Sensational texture & visible radiance',
                comment: `I have been using this ${product.name} for 2 weeks. It absorbs seamlessly and leaves skin luminous, hydrated and calm without any greasiness!`,
                date: '2026-10-04',
                verifiedBuyer: true,
              },
              {
                id: 'rev-def-2',
                productId: product.id,
                userName: 'Pooja Iyer',
                rating: 5,
                title: 'Luxurious formulation',
                comment: 'The scent is delicately natural and calming. Sits beautifully under daily sunscreen.',
                date: '2026-09-28',
                verifiedBuyer: true,
              },
            ]);
          }
        })
        .catch(() => {
          // offline
        });
    }
  }, [product]);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const currentSku = selectedVariant?.sku || product.sku;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
  const isAvailable = product.inStock && currentStock > 0;

  const galleryImages = [
    product.image,
    ...(product.additionalImages || []),
    getCategoryFallbackImage(product.category),
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant?.name);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNowClick = () => {
    if (onBuyNow) {
      onBuyNow(product, quantity, selectedVariant?.name);
    } else {
      addToCart(product, quantity, selectedVariant?.name);
      onClose();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const fallback = getCategoryFallbackImage(product.category);
    if (!target.src.includes(fallback)) {
      target.src = fallback;
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    setReviewSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userName: newReviewAuthor,
          rating: newReviewRating,
          title: 'Verified Customer Review',
          comment: newReviewComment,
        }),
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setNewReviewAuthor('');
        setNewReviewComment('');
        showToast('Thank you for sharing your review!');
      }
    } catch {
      const fallbackReview: Review = {
        id: `rev-${Date.now()}`,
        productId: product.id,
        userName: newReviewAuthor,
        rating: newReviewRating,
        title: 'Verified Customer Review',
        comment: newReviewComment,
        date: new Date().toISOString().split('T')[0],
        verifiedBuyer: true,
      };
      setReviews([fallbackReview, ...reviews]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      showToast('Thank you for sharing your review!');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const discountPercent =
    currentOriginalPrice && currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden z-10 border border-[#F0E5E0] my-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 text-stone-500 hover:text-[#3F1722] hover:bg-white shadow-md flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Imagery Showcase & Thumbnails */}
          <div className="bg-[#FAF6F4] p-6 sm:p-8 flex flex-col items-center justify-between relative border-b md:border-b-0 md:border-r border-[#F0E5E0]">
            <div className="w-full aspect-square max-w-xs relative flex items-center justify-center bg-white rounded-xl p-3 shadow-xs">
              <img
                src={selectedImage || getCategoryFallbackImage(product.category)}
                alt={product.name}
                onError={handleImageError}
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto p-1 max-w-full justify-center">
                {galleryImages.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all p-0.5 bg-white shrink-0 cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#8C384E] ring-1 ring-[#8C384E]'
                        : 'border-[#EAE0DC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} gallery ${idx + 1}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-[#8C384E]" />
                100% Clean Actives
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C384E]" />
                Dermatologically Tested
              </span>
            </div>
          </div>

          {/* Right: Product Details, Stepper, and Tabs */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category, Brand & SKU */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C384E]">
                    {product.brand || 'Velvetique Beauty'}
                  </span>
                  <span className="text-stone-300">/</span>
                  <span className="text-[11px] text-stone-500 capitalize">
                    {product.category}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  {currentSku}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl font-serif font-bold text-[#3F1722] leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center text-[#E5A855]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current text-[#E5A855]'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#3F1722]">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price with Discount */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#3F1722] tabular-nums">
                  ₹{currentPrice}
                </span>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ₹{currentOriginalPrice}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs text-[#8C384E] font-bold bg-[#FAF2F4] px-2 py-0.5 rounded border border-[#F2CFD6]">
                    {discountPercent}% OFF
                  </span>
                )}
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ml-auto ${
                    isAvailable
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-rose-700 bg-rose-50'
                  }`}
                >
                  {isAvailable ? `In Stock (${currentStock} left)` : 'Sold Out'}
                </span>
              </div>

              {/* Variant Selector (Sizes or Shades) */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#F0E5E0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                    Select Option / Size:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'bg-[#8C384E] text-white border-[#8C384E] shadow-2xs'
                            : 'bg-white text-stone-700 border-[#E0D5D0] hover:border-[#8C384E]'
                        }`}
                      >
                        {v.name} · ₹{v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="mt-6 border-b border-[#F0E5E0] flex gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'details' ? 'text-[#8C384E]' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Description
                  {activeTab === 'details' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E] rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'ingredients' ? 'text-[#8C384E]' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Ingredients
                  {activeTab === 'ingredients' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E] rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('howToUse')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'howToUse' ? 'text-[#8C384E]' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  How to Use
                  {activeTab === 'howToUse' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E] rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'reviews' ? 'text-[#8C384E]' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Reviews ({reviews.length})
                  {activeTab === 'reviews' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C384E] rounded-full" />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-4 text-xs text-stone-600 leading-relaxed min-h-[130px]">
                {activeTab === 'details' && (
                  <div>
                    <p className="mb-3 font-light text-stone-700">{product.description}</p>
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="space-y-1 mt-2">
                        <strong className="text-[#3F1722] block font-semibold">Key Benefits:</strong>
                        <ul className="list-disc pl-4 space-y-1 text-stone-600">
                          {product.benefits.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.skinType && (
                      <p className="mt-3 text-[11px] text-stone-500">
                        <strong>Recommended Skin Profile:</strong> {product.skinType}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <p className="mb-2 text-stone-500 font-light">
                      Ethically sourced, toxin-free botanical actives:
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {product.ingredients?.map((ing, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-[#FAF2F4] text-[#8C384E] rounded-md font-medium text-[11px]"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'howToUse' && (
                  <div>
                    <p className="text-stone-700 leading-relaxed">{product.howToUse}</p>
                    <div className="mt-3 p-3 bg-[#FAF4F0] rounded-lg border border-[#EDE1DA] text-[11px] text-stone-600">
                      <strong>Ritual Tip:</strong> Gently warm between palms before application to activate the cold-pressed botanical essences.
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="max-h-44 overflow-y-auto space-y-3 pr-2">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-[#FAF6F4] rounded-lg border border-[#F2E5E0]">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#3F1722]">{rev.userName}</span>
                            <div className="flex text-[#E5A855]">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-stone-700 mt-1 font-light">{rev.comment}</p>
                          <span className="text-[10px] text-stone-400 mt-1 block">
                            Verified Buyer · {rev.date}
                          </span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleReviewSubmit} className="pt-3 border-t border-[#F0E5E0] space-y-2">
                      <h4 className="font-semibold text-[#3F1722] text-xs">Write a Review</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-1/2 p-2 border border-[#E0D5D0] rounded text-xs focus:outline-none focus:border-[#8C384E]"
                          required
                        />
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-1/2 p-2 border border-[#E0D5D0] rounded text-xs focus:outline-none focus:border-[#8C384E]"
                        >
                          <option value={5}>5 Stars - Outstanding</option>
                          <option value={4}>4 Stars - Very Good</option>
                          <option value={3}>3 Stars - Good</option>
                        </select>
                      </div>
                      <textarea
                        placeholder="Write your honest review..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full p-2 border border-[#E0D5D0] rounded text-xs focus:outline-none focus:border-[#8C384E]"
                        rows={2}
                        required
                      />
                      <button
                        type="submit"
                        disabled={reviewSubmitting}
                        className="px-4 py-1.5 bg-[#8C384E] text-white rounded text-xs font-semibold hover:bg-[#722B3E] transition-colors"
                      >
                        {reviewSubmitting ? 'Posting...' : 'Post Review'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity, Add to Cart, Buy Now, Wishlist */}
            <div className="pt-4 border-t border-[#F0E5E0] flex flex-wrap sm:flex-nowrap items-center gap-3">
              <div className="flex items-center border border-[#E2D5D0] rounded-sm bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-[#FAF4F0] text-stone-600 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold tabular-nums text-[#3F1722]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-[#FAF4F0] text-stone-600 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-widest rounded-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  !isAvailable
                    ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                    : addedAnimation
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#8C384E] hover:bg-[#772A3E] text-white shadow-md hover:shadow-lg'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{currentPrice * quantity}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNowClick}
                disabled={!isAvailable}
                className="px-5 py-3 text-xs font-bold uppercase tracking-widest rounded-xs border border-[#8C384E] text-[#8C384E] hover:bg-[#8C384E] hover:text-white transition-colors cursor-pointer"
              >
                Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xs border transition-colors cursor-pointer ${
                  wishlisted
                    ? 'bg-[#FAF2F4] border-[#F2CFD6] text-[#8C384E]'
                    : 'border-[#E2D5D0] text-stone-400 hover:text-[#8C384E]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-[#8C384E]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
