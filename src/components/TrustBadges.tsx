import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const TRUST_BADGES = [
  {
    icon: Truck,
    title: 'Free Shipping',
    subtitle: 'On orders over ₹999',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    subtitle: '15 days return policy',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    subtitle: '100% secure checkout',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: "We're here to help",
  },
];

export const TrustBadges: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF2F4] border-t border-b border-[#F0DFE3] py-7 sm:py-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-white text-[#8C384E] flex items-center justify-center shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#3F1722] tracking-wide uppercase">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-600 font-light">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
