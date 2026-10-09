import React, { useState } from 'react';
import { BlogPost } from '../types';
import { SEED_BLOG_POSTS } from '../data/seedData';
import { BookOpen, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BlogView: React.FC = () => {
  const { setActivePage } = useShop();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedPost ? (
          /* Single Article Reader */
          <div className="bg-white rounded-2xl border border-[#F0E5E0] p-6 sm:p-12 max-w-3xl mx-auto shadow-xs">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-xs font-bold text-[#8C384E] hover:underline flex items-center gap-1.5 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </button>

            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C384E]">
              {selectedPost.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1722] mt-2 mb-4 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-stone-400 pb-6 border-b border-[#F0E5E0] mb-8">
              <span>{selectedPost.author}</span>
              <span>·</span>
              <span>{selectedPost.date}</span>
              <span>·</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <div className="w-full aspect-16/9 rounded-xl overflow-hidden mb-8 bg-[#F5EAE6]">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-stone text-stone-700 text-sm leading-relaxed space-y-4 font-light whitespace-pre-line">
              {selectedPost.content}
            </div>

            <div className="mt-10 pt-6 border-t border-[#F0E5E0] flex justify-between items-center">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-semibold text-stone-600 hover:text-[#8C384E]"
              >
                ← Back
              </button>
              <button
                onClick={() => setActivePage('shop')}
                className="px-5 py-2.5 bg-[#8C384E] text-white text-xs font-bold uppercase tracking-wider rounded-xs"
              >
                Shop Related Products
              </button>
            </div>
          </div>
        ) : (
          /* Blog Posts Grid */
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C384E]">
                Beauty Science & Rituals
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1722] mt-1">
                The Velvetique Journal
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 font-light">
                Evidence-based skincare advice, ingredient deep-dives, and mindful rituals curated by our dermatologists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SEED_BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-xl border border-[#F0E5E0] overflow-hidden hover:border-[#E8CAD2] transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full aspect-16/10 bg-[#FAF4F0] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C384E]">
                        {post.category}
                      </span>
                      <h2 className="font-serif text-lg font-bold text-[#3F1722] mt-2 mb-2 line-clamp-2 hover:text-[#8C384E] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#F8EFEA] flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="text-[#8C384E] font-semibold flex items-center gap-1 hover:underline">
                      Read Article
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
