import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Plus, Minus, Check, ShoppingBag, ShieldCheck, Leaf, Sparkles } from 'lucide-react';
import { Product, Review } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'howToUse' | 'reviews'>('details');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      // Fetch reviews for product
      fetch(`/api/reviews/${product.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.reviews) {
            setReviews(data.reviews);
          }
        })
        .catch(() => {
          // offline fallback
          setReviews([
            {
              id: 'rev-default',
              productId: product.id,
              userName: 'Priya Mukherjee',
              rating: 5,
              title: 'Sensational texture & real visible results',
              comment: 'I noticed a visible improvement in my skin texture and radiance after only 10 days of consistent use. Does not cause any congestion or irritation.',
              date: '2026-10-02',
              verifiedBuyer: true,
            },
          ]);
        });
    }
  }, [product]);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
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
      // Offline fallback
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
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 text-stone-500 hover:text-[#3F1722] hover:bg-white shadow-md flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Imagery Showcase */}
          <div className="bg-[#FAF6F4] p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#F0E5E0]">
            <div className="w-full aspect-square max-w-xs relative flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

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
              {/* Category & Badges */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C384E]">
                  {product.category}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {product.volume}
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

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#3F1722] tabular-nums">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  In Stock ({product.stock} available)
                </span>
              </div>

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
                  Key Ingredients
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
              <div className="py-4 text-xs text-stone-600 leading-relaxed min-h-[140px]">
                {activeTab === 'details' && (
                  <div>
                    <p className="mb-3 font-light text-stone-700">{product.description}</p>
                    <div className="space-y-1 mt-2">
                      <strong className="text-[#3F1722] block font-semibold">Clinically Proven Benefits:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-stone-600">
                        {product.benefits?.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <p className="mb-2 text-stone-500 font-light">
                      Formulated without parabens, sulfates, synthetic dyes, or phthalates:
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
                      <strong>Beauty Ritual Tip:</strong> Pair with gentle tapping motions to stimulate lymphatic drainage and enhance active absorption.
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {/* Reviews List */}
                    <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                      {reviews.length === 0 ? (
                        <p className="text-stone-400 italic">No customer reviews yet. Be the first to review!</p>
                      ) : (
                        reviews.map((rev) => (
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
                              Verified Purchase · {rev.date}
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add Review Form */}
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
                          <option value={5}>5 Stars - Excellent</option>
                          <option value={4}>4 Stars - Very Good</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Fair</option>
                          <option value={1}>1 Star - Poor</option>
                        </select>
                      </div>
                      <textarea
                        placeholder="Write your honest thoughts about texture, aroma, and results..."
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
                        {reviewSubmitting ? 'Submitting...' : 'Post Review'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity Stepper, Add to Cart, Wishlist */}
            <div className="pt-4 border-t border-[#F0E5E0] flex items-center gap-3">
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
                className={`flex-1 py-3 px-5 text-xs font-bold uppercase tracking-widest rounded-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  addedAnimation
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
                    <span>Add to Cart · ₹{product.price * quantity}</span>
                  </>
                )}
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
