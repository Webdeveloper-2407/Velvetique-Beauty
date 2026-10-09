import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE } from '../data/seedData';

const SLIDES = [
  {
    kicker: 'NEW IN',
    title: 'Radiant Skin.\nReal Confidence.',
    description: 'Clean beauty that nourishes, enhances and empowers you.',
    buttonText: 'SHOP NOW',
    image: HERO_IMAGE,
    targetCategory: 'skincare',
    accentNote: 'Rose & Niacinamide Infusion',
  },
  {
    kicker: 'SUMMER ESSENTIALS',
    title: 'Weightless Dew.\nMaximum Glow.',
    description: 'Broad-spectrum sun care and hydrating water gels designed for all-day comfort.',
    buttonText: 'EXPLORE SUN CARE',
    image: HERO_IMAGE,
    targetCategory: 'suncare',
    accentNote: 'SPF 50+ Invisible Finish',
  },
];

export const HeroBanner: React.FC = () => {
  const { setActivePage } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full bg-[#FAF6F4] overflow-hidden border-b border-[#F0E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Slide Navigation Arrows */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full border border-[#D5C2BE] flex items-center justify-center text-[#4A3E3D] hover:bg-[#8C384E] hover:text-white hover:border-[#8C384E] transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full border border-[#D5C2BE] flex items-center justify-center text-[#4A3E3D] hover:bg-[#8C384E] hover:text-white hover:border-[#8C384E] transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold tracking-wider text-stone-400">
                0{currentSlide + 1} / 0{SLIDES.length}
              </span>
            </div>

            {/* Kicker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#8C384E] uppercase">
                {slide.kicker}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#8C384E]" />
            </div>

            {/* Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#3F1722] font-semibold leading-[1.12] tracking-tight mb-5 whitespace-pre-line text-balance">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#615555] leading-relaxed mb-8 max-w-md font-light">
              {slide.description}
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActivePage('shop')}
                className="px-8 py-3.5 bg-[#8C384E] hover:bg-[#772A3E] text-white text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95 cursor-pointer rounded-xs"
              >
                {slide.buttonText}
              </button>
              <button
                onClick={() => setActivePage('category', slide.targetCategory)}
                className="text-xs sm:text-sm font-semibold text-[#8C384E] hover:text-[#3F1722] underline underline-offset-4 tracking-wider uppercase transition-colors"
              >
                View Routine
              </button>
            </div>
          </div>

          {/* Right Showcase Image Column */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-4/3 bg-[#F2EAE7]">
              <img
                src={slide.image}
                alt="Velvetique Beauty clean skincare showcase"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />

              {/* Subtle ambient lighting vignette */}
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/10 pointer-events-none" />
            </div>

            {/* Aesthetic Floating Badge */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-xs py-3 px-5 rounded-xl shadow-lg border border-[#F2E5E0] items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-[11px] font-bold text-[#3F1722] uppercase tracking-wider">
                  Dermatologist Approved
                </p>
                <p className="text-[10px] text-stone-500">100% Certified Clean Actives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
