import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, ChevronDown, ChevronUp, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE } from '../data/seedData';

interface AboutContactViewProps {
  initialView?: 'about' | 'contact';
}

const FAQS = [
  {
    q: 'Are Velvetique Beauty products suitable for sensitive skin?',
    a: 'Yes, absolutely. Every formulation is dermatologically tested, hypoallergenic, and formulated at the physiological pH of healthy skin (pH 5.0 - 5.5). We avoid synthetic fragrance, artificial colorants, sulfates, and parabens.',
  },
  {
    q: 'How long does shipping take within India?',
    a: 'Orders are processed within 24 hours. Metro deliveries arrive in 2–3 business days via Express Air courier (BlueDart / Delhivery). Tier 2 & 3 cities typically take 4–5 business days.',
  },
  {
    q: 'What is your return & exchange policy?',
    a: 'We offer an easy 15-day return window. If you experience an adverse skin reaction or received a damaged product, our customer care team will arrange an instant replacement or full refund.',
  },
  {
    q: 'Is Cash on Delivery (COD) available?',
    a: 'Yes! COD is supported on all orders up to ₹5,000 across 19,000+ Indian pincodes. Free shipping applies on all orders above ₹999.',
  },
];

export const AboutContactView: React.FC<AboutContactViewProps> = ({ initialView = 'about' }) => {
  const { showToast } = useShop();
  const [view, setView] = useState<'about' | 'contact'>(initialView);

  // Contact Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Recommendation Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion open index
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Your message has been received! Our concierge will reply within 24 hours.');
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-[#FAF6F4] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle between About & Contact */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1 rounded-full border border-[#F0E5E0] shadow-2xs flex">
            <button
              onClick={() => setView('about')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                view === 'about'
                  ? 'bg-[#8C384E] text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Our Story & Philosophy
            </button>
            <button
              onClick={() => setView('contact')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                view === 'contact'
                  ? 'bg-[#8C384E] text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Contact Concierge & FAQs
            </button>
          </div>
        </div>

        {view === 'about' ? (
          /* About Us View */
          <div className="space-y-16">
            {/* Story Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-2xl border border-[#F0E5E0] shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C384E]">
                  Our Essence
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1722] mt-1 mb-4 leading-tight">
                  Thoughtful beauty for every skin, every day.
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-4">
                  Velvetique Beauty was born from a singular conviction: luxury skincare should be uncompromisingly clean, clinically efficacious, and deeply sensorial. We harmonize time-tested botanical wisdom with modern dermal biotechnology.
                </p>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-6">
                  Every serum, cream, and pigment is crafted to nourish the delicate skin barrier, never overburdening it with unnecessary fillers or harsh chemicals.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#F5EAE6] text-center">
                  <div>
                    <span className="font-serif text-2xl font-bold text-[#8C384E]">100%</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">Cruelty-Free</p>
                  </div>
                  <div>
                    <span className="font-serif text-2xl font-bold text-[#8C384E]">0%</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">Toxins & Sulfates</p>
                  </div>
                  <div>
                    <span className="font-serif text-2xl font-bold text-[#8C384E]">72-Hr</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">Barrier Moisture</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-sm aspect-4/3 bg-[#F2EAE7]">
                <img
                  src={HERO_IMAGE}
                  alt="Velvetique Beauty Story"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-[#F0E5E0] shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-[#FAF2F4] text-[#8C384E] flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3F1722] mb-2">
                  Conscious Botanicals
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  We sustainably source organic rose damascena, centella asiatica, and cold-pressed botanical oils from ethical cooperatives.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#F0E5E0] shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-[#FAF2F4] text-[#8C384E] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3F1722] mb-2">
                  Clinical Rigor
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Formulated under dermatological supervision. Each formula passes rigorous patch testing and stability verification.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#F0E5E0] shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-[#FAF2F4] text-[#8C384E] flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3F1722] mb-2">
                  Earth Kind
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Recyclable glass containers, soy ink printing, and plastic-neutral fulfillment partnerships for a lighter environmental footprint.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Contact Us View + FAQ */
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Form */}
              <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#F0E5E0] shadow-xs">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C384E]">
                  Customer Care
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#3F1722] mt-1 mb-2">
                  Get In Touch
                </h2>
                <p className="text-xs text-stone-500 mb-6 font-light">
                  Have a question about a product or need personalized skincare advice? Fill out the form below.
                </p>

                <form onSubmit={handleSubmitContact} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full p-2.5 border border-[#E0D5D0] rounded focus:border-[#8C384E] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ananya@example.com"
                        className="w-full p-2.5 border border-[#E0D5D0] rounded focus:border-[#8C384E] outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2.5 border border-[#E0D5D0] rounded bg-white focus:border-[#8C384E] outline-none"
                    >
                      <option>Product Recommendation Inquiry</option>
                      <option>Order Status & Tracking</option>
                      <option>Returns & Exchanges</option>
                      <option>Wholesale & Corporate Gifting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your questions, skin type, or order number..."
                      className="w-full p-2.5 border border-[#E0D5D0] rounded focus:border-[#8C384E] outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8C384E] hover:bg-[#772A3E] text-white font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Message Sent</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#F0E5E0] shadow-xs space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#3F1722]">
                    Concierge Channels
                  </h3>

                  <div className="flex items-start gap-3 text-xs text-stone-600">
                    <Mail className="w-4 h-4 text-[#8C384E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#3F1722]">Email Support</strong>
                      <a href="mailto:care@velvetiquebeauty.com" className="hover:underline">
                        care@velvetiquebeauty.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-stone-600">
                    <Phone className="w-4 h-4 text-[#8C384E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#3F1722]">Customer Care Line</strong>
                      <span>+91 (022) 4892-8000</span>
                      <p className="text-[10px] text-stone-400">Mon–Sat: 9:00 AM – 7:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-stone-600">
                    <MapPin className="w-4 h-4 text-[#8C384E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#3F1722]">Studio & Head Office</strong>
                      <span>42 Lotus Boulevard, Nariman Point, Mumbai 400021, India</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF2F4] p-6 rounded-2xl border border-[#F2CFD6] text-xs">
                  <h4 className="font-bold text-[#8C384E] uppercase tracking-wider mb-1">
                    Free Beauty Consultations
                  </h4>
                  <p className="text-stone-600 font-light">
                    Not sure which serum or moisturizer fits your skin concerns? Connect directly with our certified dermal experts for a customized routine.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white p-8 rounded-2xl border border-[#F0E5E0] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#3F1722] mb-6 text-center">
                Frequently Asked Questions
              </h3>
              <div className="divide-y divide-[#F0E5E0]">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#3F1722] hover:text-[#8C384E] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-[#8C384E]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <p className="mt-2.5 text-xs text-stone-600 font-light leading-relaxed pr-6 animate-fadeIn">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
