import React from 'react';
import { useShop } from '../context/ShopContext';
import { PROMO_IMAGE } from '../data/seedData';
import { Sparkles, ArrowRight } from 'lucide-react';

export const LimitedOfferBanner: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="w-full bg-[#FAF6F4] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden shadow-sm border border-[#F0E5E0]">
          {/* Left Promo Callout Column */}
          <div className="lg:col-span-5 bg-[#8C384E] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/90">
                Limited Time Offer
              </span>
              <Sparkles className="w-3.5 h-3.5 text-white/90" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-[1.15] mb-4 text-balance">
              Up to 30% Off <br className="hidden sm:inline" />on Best Sellers
            </h2>

            <p className="text-sm sm:text-base text-white/85 font-light mb-8 max-w-sm leading-relaxed">
              Glow more, spend less. Treat your skin to organic extracts and clinically proven barrier nourishment!
            </p>

            <div>
              <button
                onClick={() => setActivePage('shop')}
                className="px-7 py-3 bg-white text-[#8C384E] hover:bg-[#FAF4F0] text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm hover:shadow inline-flex items-center gap-2 cursor-pointer rounded-xs"
              >
                <span>Shop The Sale</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Product Flatlay Column */}
          <div className="lg:col-span-7 relative bg-[#EFE4DF] min-h-[300px] sm:min-h-[400px]">
            <img
              src={PROMO_IMAGE}
              alt="Velvetique Beauty Best Sellers Flatlay"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
