import React from 'react';
import { Leaf, FlaskConical, HeartHandshake, Globe } from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    subtitle: 'Safe & toxin-free',
  },
  {
    icon: FlaskConical,
    title: 'Clinically Proven',
    subtitle: 'Dermatologically tested',
  },
  {
    icon: HeartHandshake,
    title: 'Cruelty Free',
    subtitle: 'We never test on animals',
  },
  {
    icon: Globe,
    title: 'Sustainable Beauty',
    subtitle: 'Good for you & the planet',
  },
];

export const ValueProps: React.FC = () => {
  return (
    <section className="w-full bg-white border-b border-[#F0E5E0] py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 group transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 shrink-0 rounded-full bg-[#FAF2F4] text-[#8C384E] flex items-center justify-center transition-colors group-hover:bg-[#8C384E] group-hover:text-white">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#3F1722] tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-normal">
                    {item.subtitle}
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
