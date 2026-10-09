import React from 'react';
import { useShop } from '../context/ShopContext';
import { SEED_CATEGORIES } from '../data/seedData';

export const CategoryCircles: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="w-full bg-[#FAF6F4] py-14 sm:py-20 border-b border-[#F0E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#3F1722] font-semibold tracking-wider uppercase">
            Shop By Category
          </h2>
          <div className="w-16 h-0.5 bg-[#8C384E] mx-auto mt-3 rounded-full opacity-60" />
        </div>

        {/* 6 Circular Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
          {SEED_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActivePage('category', category.id)}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
            >
              {/* Circular Image Container with Pink Aura on hover */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-[#F5E6E8] group-hover:bg-[#E8A5B2] transition-colors duration-300 shadow-sm group-hover:shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Category Label */}
              <span className="mt-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#3F1722] group-hover:text-[#8C384E] transition-colors">
                {category.name}
              </span>
              <span className="text-[11px] text-stone-400 font-normal">
                {category.itemCount} Products
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
