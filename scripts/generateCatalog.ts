import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verified working Unsplash image URLs (all tested HTTP 200)
const IMAGES = {
  serum: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    '/images/category_skincare.jpg',
  ],
  cleanser: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    '/images/hero_showcase.jpg',
  ],
  toner: [
    'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
    '/images/category_skincare.jpg',
  ],
  moisturizer: [
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    '/images/promo_flatlay.jpg',
  ],
  eyeCare: [
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=600&q=80',
    '/images/category_skincare.jpg',
  ],
  mask: [
    'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80',
    '/images/promo_flatlay.jpg',
  ],
  facialOil: [
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    '/images/promo_flatlay.jpg',
  ],
  makeupFace: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    '/images/category_makeup.jpg',
  ],
  makeupLip: [
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=600&q=80',
    '/images/category_makeup.jpg',
  ],
  makeupEye: [
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=600&q=80',
    '/images/category_makeup.jpg',
  ],
  makeupTools: [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    '/images/category_tools.jpg',
  ],
  haircare: [
    'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1607602132700-068258431c6c?auto=format&fit=crop&w=600&q=80',
    '/images/category_haircare.jpg',
  ],
  bodycare: [
    'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    '/images/category_bodycare.jpg',
  ],
  suncare: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    '/images/category_suncare.jpg',
  ],
  giftsets: [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    '/images/hero_showcase.jpg',
    '/images/category_giftsets.jpg',
  ],
  tools: [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=600&q=80',
    '/images/category_tools.jpg',
  ],
};

const BRANDS = [
  'Velvetique Beauty',
  'Velvetique Botanicals',
  'Velvetique Atelier',
  'Velvetique Pure',
  'Velvetique Rituals',
];

interface Spec {
  category: string;
  subcategory: string;
  prefixNames: string[];
  descriptors: string[];
  subtitles: string[];
  ingredientsList: string[][];
  benefitsList: string[][];
  volumes: string[];
  priceRange: [number, number];
  imageType: keyof typeof IMAGES;
  skinTypes?: string[];
  hairTypes?: string[];
  hasShadeVariants?: boolean;
}

const SPECS: Spec[] = [
  // 1. SKINCARE: Cleansers (50 items)
  {
    category: 'skincare',
    subcategory: 'cleansers',
    prefixNames: [
      'Gentle Velvet Foam Cleanser',
      'Purifying Salicylic Gel Cleanser',
      'Botanical Melting Cleansing Balm',
      'Hydrating Rose Petal Cleansing Oil',
      'Clarifying Tea Tree Face Wash',
      'Soothing Oat Milk Cleanser',
      'Brightening Vitamin C Gel Wash',
      'Centella Calming Foam Wash',
      'AHA Fruit Enzyme Cleanser',
      'Probiotic Barrier Cleansing Lotion',
    ],
    descriptors: ['Radiance', 'Clarifying', 'Soothing', 'Hydra-Boost', 'Balancing', 'Renewing', 'Infusion', 'Microbiome', 'Deep-Pore', 'Velvet Dew'],
    subtitles: [
      'with Damask Rose Hydrosol & Aloe Vera',
      'with 2% Salicylic Acid & Zinc',
      'with Moringa Seed & Jojoba Oil',
      'with Wild Chamomile & Panthenol',
      'with Kakadu Plum & Papaya Enzyme',
      'with Green Tea & Witch Hazel',
      'with Centella Asiatica & Ceramide',
      'with Fermented Rice Water & Squalane',
    ],
    ingredientsList: [
      ['Damask Rose Distillate', 'Aloe Barbadensis Leaf', 'Glycerin', 'Pro-Vitamin B5'],
      ['Salicylic Acid 2%', 'Zinc PCA', 'Tea Tree Leaf Oil', 'Centella Extract'],
      ['Moringa Oleifera Seed Oil', 'Organic Jojoba Oil', 'Sweet Almond Oil', 'Vitamin E'],
      ['Colloidal Oatmeal', 'Centella Asiatica', 'Chamomile Extract', 'Hyaluronic Acid'],
    ],
    benefitsList: [
      ['Dissolves makeup and pollution without stripping', 'Maintains skin natural pH 5.5 balance', 'Soothes redness and surface irritation'],
      ['Unclogs congested pores and reduces blemishes', 'Regulates excess sebum production', 'Leaves fresh velvet-matte finish'],
      ['Melt-away balm texture transforms into silky milk', 'Nourishes dry, stressed skin barrier', 'Rinses completely clean without residue'],
    ],
    volumes: ['100 ml / 3.4 fl. oz', '150 ml / 5.1 fl. oz', '200 ml / 6.8 fl. oz'],
    priceRange: [349, 899],
    imageType: 'cleanser',
    skinTypes: ['All Skin Types', 'Oily & Blemish-Prone', 'Sensitive & Reactive', 'Dry & Dehydrated'],
  },

  // 2. SKINCARE: Toners & Essences (45 items)
  {
    category: 'skincare',
    subcategory: 'toners-essences',
    prefixNames: [
      'Damask Rose Hydrating Facial Toner',
      'Rice Water Radiance Ferment Essence',
      'Cica Calming Soothing Face Mist',
      'Exfoliating AHA BHA Clarifying Tonic',
      'Glow Boost Kombucha Treatment Essence',
      'Hyaluronic Moisture Magnet Toner',
      'Matcha Green Tea Pore-Refining Tonic',
      'White Lotus Brightening Facial Essence',
      'Niacinamide Pore-Tightening Toner',
    ],
    descriptors: ['Replenishing', 'Hydra-Lock', 'Luminosity', 'Barrier-Nourish', 'Pore-Clarify', 'Dewy Essence', 'Revitalizing', 'Micro-Essence'],
    subtitles: [
      'with 90% Pure Rose Floral Water',
      'with Fermented Galactomyces & Rice',
      'with Centella Asiatica & Peptides',
      'with 5% Glycolic Acid & Witch Hazel',
      'with 4D Hyaluronic Acid Matrix',
      'with Botanical Prebiotics & Willow Bark',
    ],
    ingredientsList: [
      ['Pure Rose Hydrosol', 'Hyaluronic Acid', 'Panthenol', 'Aloe Juice'],
      ['Galactomyces Ferment Filtrate', 'Rice Bran Extract', 'Niacinamide 3%', 'Allantoin'],
      ['Glycolic Acid', 'Lactic Acid', 'Salicylic Acid', 'Witch Hazel Water'],
    ],
    benefitsList: [
      ['Instantly restores hydration balance after cleansing', 'Primes skin for maximum serum absorption', 'Leaves plump petal-soft dewiness'],
      ['Improves skin luminosity and clarity', 'Diminishes rough texture and flakiness', 'Alcohol-free and barrier-friendly'],
    ],
    volumes: ['120 ml / 4.0 fl. oz', '150 ml / 5.1 fl. oz', '200 ml / 6.8 fl. oz'],
    priceRange: [449, 1099],
    imageType: 'toner',
    skinTypes: ['All Skin Types', 'Dull & Tired Skin', 'Dry Skin', 'Combination Skin'],
  },

  // 3. SKINCARE: Face Serums (75 items)
  {
    category: 'skincare',
    subcategory: 'face-serums',
    prefixNames: [
      '10% Niacinamide Clarifying Face Serum',
      '20% Vitamin C Radiance Brightening Serum',
      'Multi-Weight Hyaluronic Acid Hydrating Serum',
      '0.3% Pure Retinol Youth Renewal Serum',
      'Multi-Peptide Collagen Firming Elixir',
      'Alpha Arbutin Dark Spot Correcting Serum',
      'Centella Cica Barrier Repair Ampoule',
      '2% Salicylic Acid Blackhead Clearing Serum',
      'Squalane & Bakuchiol Natural Youth Serum',
      'Coenzyme Q10 + Vitamin E Antioxidant Serum',
    ],
    descriptors: ['Concentrate', 'Active Drops', 'Power Elixir', 'Booster', 'Skin Perfector', 'Intense Ampoule', 'Cellular Complex', 'Recovery Dew'],
    subtitles: [
      'with Zinc PCA & Hyaluronic Acid',
      'with Kakadu Plum & Ferulic Acid',
      'with Triple Molecular Weight Matrix',
      'with Squalane & Night Botanical Complex',
      'with Copper Tripeptide-1 & Marine Peptides',
      'with Kojic Acid & Licorice Root',
      'with Madecassoside & Panthenol 5%',
    ],
    ingredientsList: [
      ['Niacinamide 10%', 'Zinc PCA 1%', 'Hyaluronic Acid', 'Allantoin'],
      ['Ethyl Ascorbic Acid 20%', 'Ferulic Acid', 'Kakadu Plum Extract', 'Vitamin E'],
      ['Sodium Hyaluronate Multi-Weight', 'Polyglutamic Acid', 'Panthenol', 'Centella'],
      ['Encapsulated Retinol 0.3%', 'Squalane', 'Bakuchiol', 'Ceramide NP'],
    ],
    benefitsList: [
      ['Clinically proven to fade post-acne dark marks', 'Tightens enlarged pore appearance', 'Restores natural velvet luminance'],
      ['Delivers 72 hours of cellular hydration', 'Visibly smooths fine dehydration lines', 'Absorbs instantly with zero stickiness'],
      ['Boosts dermal collagen and firming resilience', 'Refines rough texture overnight', 'Dermatologist tested hypoallergenic'],
    ],
    volumes: ['30 ml / 1.0 fl. oz', '50 ml / 1.7 fl. oz'],
    priceRange: [599, 1799],
    imageType: 'serum',
    skinTypes: ['All Skin Types', 'Blemish-Prone', 'Aging & Fine Lines', 'Hyper-pigmented', 'Dry & Parched'],
  },

  // 4. SKINCARE: Moisturizers & Creams (65 items)
  {
    category: 'skincare',
    subcategory: 'moisturizers',
    prefixNames: [
      'Hydra Intense Dew Boost Gel Moisturizer',
      'Lumière Whipped Botanical Moisture Cream',
      'Ceramide Barrier Repair Comfort Cream',
      'Rose Petal Cloud Water Gel',
      'Overnight Cellular Recovery Night Cream',
      'Peptide Firming Velvet Moisturizer',
      'Green Tea Mattifying Oil-Free Gel',
      'Marula & Shea Ultra-Nourishing Balm',
      'Squalane Daily Barrier Defense Cream',
    ],
    descriptors: ['Hydration Melt', 'Silk Cloud', 'Rich Velvet', 'Water Drop', 'Deep Nourish', 'Barrier Shield', 'Dew Replenish', 'Youth Sculpt'],
    subtitles: [
      'with Sea Kelp Ferment & Ceramide NP',
      'with Jasmine & Camellia Seed Oil',
      'with 5 Essential Ceramides & Fatty Acids',
      'with Organic Bulgarian Rose Distillate',
      'with Melatonin & Botanical Retinol Alternative',
      'with Matrixyl 3000 & Marine Collagen',
    ],
    ingredientsList: [
      ['Ceramide NP', 'Sea Kelp Ferment', 'Hyaluronic Acid', 'Rose Floral Water'],
      ['Camellia Japonica Seed Oil', 'Jasmine Flower Water', 'Squalane', 'Shea Butter'],
      ['5 Ceramides (EOP, NS, NP, AS, AP)', 'Cholesterol', 'Fatty Acids', 'Centella'],
    ],
    benefitsList: [
      ['Weightless bouncy water-gel locks in 72-hour moisture', 'Restores impaired lipid barrier within 48 hours', 'Non-comedogenic and makeup friendly'],
      ['Deeply softens dry, flaky patches', 'Leaves radiant petal-soft finish', 'Soothes weather-stressed skin'],
    ],
    volumes: ['50 g / 1.76 oz', '100 g / 3.5 oz'],
    priceRange: [549, 1499],
    imageType: 'moisturizer',
    skinTypes: ['All Skin Types', 'Dehydrated', 'Very Dry', 'Sensitive', 'Normal to Combination'],
  },

  // 5. SKINCARE: Eye Care (40 items)
  {
    category: 'skincare',
    subcategory: 'eye-care',
    prefixNames: [
      'Caffeine & Peptide Awakening Eye Gel',
      'Retinol Youth Smoothing Eye Cream',
      'Rosewater Depuffing Cooling Eye Serum',
      'Ceramide Barrier Hydrating Eye Balm',
      'Vitamin C Brightening Dark Circle Eye Cream',
      'Marine Collagen Firming Eye Treatment',
    ],
    descriptors: ['Depuffing', 'Awakening', 'Luminous', 'Smooth Velvet', 'Eye Sculpt', 'Radiant Eye', 'Youth Lift'],
    subtitles: [
      'with Green Tea Extract & Matrixyl',
      'with Encapsulated Retinol & Squalane',
      'with Triple Cooling Metal Applicator',
      'with Niacinamide & Persian Silk Tree Extract',
    ],
    ingredientsList: [
      ['Caffeine 5%', 'EGCG Green Tea', 'Palmitoyl Tripeptide-38', 'Hyaluronic Acid'],
      ['Micro-Retinol 0.1%', 'Ceramide NP', 'Squalane', 'Vitamin E'],
    ],
    benefitsList: [
      ['Visibly diminishes morning eye puffiness in 10 minutes', 'Fades hereditary and fatigue-induced dark circles', 'Smooths crow’s feet and fine expression lines'],
    ],
    volumes: ['15 ml / 0.5 fl. oz', '20 ml / 0.7 fl. oz'],
    priceRange: [499, 1299],
    imageType: 'eyeCare',
    skinTypes: ['All Skin Types', 'Tired & Puffy Eyes', 'Dark Circles'],
  },

  // 6. SKINCARE: Face Masks & Scrubs (45 items)
  {
    category: 'skincare',
    subcategory: 'face-masks',
    prefixNames: [
      'Pink French Clay Pore Clarifying Mask',
      'Rose Water Glow Hydration Sheet Mask Box',
      'Honey & Enzyme Gentle Resurfacing Polish',
      'Overnight Water Sleeping Mask',
      'Matcha Green Tea Detoxifying Clay Mask',
      'Volcanic Ash Deep Pore Purifying Mask',
      'Centella Soothing Emergency Relief Sheet Mask',
    ],
    descriptors: ['Ritual', 'Detox Glow', 'Overnight Recovery', 'Velvet Purify', 'Radiance Peel', 'Infusion Spa'],
    subtitles: [
      'with Calamine & Rosehip Seed Powder',
      'Box of 5 Biodegradable Bamboo Masks',
      'with Raw Organic Honey & Papain',
      'with Hyaluronic Acid & White Lotus Extract',
    ],
    ingredientsList: [
      ['French Pink Clay', 'Kaolin', 'Rosehip Seed Oil', 'Calamine Powder'],
      ['Bamboo Sheet Fiber', 'Centella Asiatica', 'Hyaluronic Acid', 'Panthenol'],
    ],
    benefitsList: [
      ['Draws out micro-pollutants and sebum without cracking skin', 'Refines congested pores in 15 minutes', 'Leaves silky smooth spa radiance'],
    ],
    volumes: ['100 g / 3.5 oz', 'Box of 5 Masks', '75 ml / 2.5 fl. oz'],
    priceRange: [399, 999],
    imageType: 'mask',
  },

  // 7. MAKEUP: Lips (70 items)
  {
    category: 'makeup',
    subcategory: 'lip-color',
    prefixNames: [
      'Velvet Matte Luxury Lipstick',
      'Featherlight Lip Cloud Tint',
      'Nourishing Hydrating Lip Oil',
      'Lustrous Glaze Hydrating Lip Gloss',
      'Ultra-Precision Longwear Lip Liner',
      'Tinted Lip & Cheek Dew Balm',
      'Plumping Peptide Lip Treatment Balm',
    ],
    descriptors: ['Dusky Rose', 'Velvet Plum', 'Warm Nude', 'Berry Royale', 'Terracotta', 'Petal Pink', 'Mocha Velvet', 'Wine Charm', 'Spiced Honey'],
    subtitles: [
      'Non-Drying Comfort Formula with Shea & Jojoba',
      'Water-Light Cushion Finish 12-Hour Wear',
      'High-Shine Glassy Finish with Camellia Oil',
      'Creamy Waterproof Contour Formula',
      'Multi-Use Botanical Pot for Lips & Cheeks',
    ],
    ingredientsList: [
      ['Organic Jojoba Oil', 'Shea Butter', 'Vitamin E', 'Natural Mineral Pigments'],
      ['Camellia Japonica Seed Oil', 'Rosehip Fruit Oil', 'Squalane', 'Peptides'],
    ],
    benefitsList: [
      ['Ultra-pigmented single-swipe coverage', '10-hour comfortable transfer-resistant wear', 'Formulated with organic plant oils to prevent chapping'],
    ],
    volumes: ['3.8 g / 0.13 oz', '5 ml / 0.17 fl. oz'],
    priceRange: [349, 899],
    imageType: 'makeupLip',
    hasShadeVariants: true,
  },

  // 8. MAKEUP: Face Base & Cheeks (65 items)
  {
    category: 'makeup',
    subcategory: 'face-base',
    prefixNames: [
      'Featherlight Serum Foundation SPF 20',
      'Hydra-Glow Radiance Primer',
      'Velvet Matte Mineral Setting Powder',
      'Weightless Clean Cream Concealer',
      'Luminous Silk Compact Powder',
      'Dewy Rose Petal Liquid Blush',
      'Baked Mineral Sun-Kissed Bronzer',
      'Chroma Glow Liquid Highlighter',
    ],
    descriptors: ['Luminous', 'Flawless', 'Skin-Match', 'Velvet Veil', 'Glow Drops', 'Soft Focus', 'Radiant Base'],
    subtitles: [
      'Light-to-Medium Breathable Buildable Coverage',
      'Pore-Blurring Hydrating Barrier Formula',
      'Micro-Milled Translucent Shine Control',
      'Infused with Hyaluronic Acid & Niacinamide',
    ],
    ingredientsList: [
      ['Micro-Dispersed Mineral Pigments', 'Squalane', 'Hyaluronic Acid', 'Vitamin E'],
      ['Silica', 'Zinc Oxide', 'Mica', 'Jojoba Esters'],
    ],
    benefitsList: [
      ['Seamlessly evens skin tone without settling into fine lines', '16-hour sweat-resistant breathable wear', 'Formulated without talc or pore-clogging silicones'],
    ],
    volumes: ['30 ml / 1.0 fl. oz', '10 g / 0.35 oz', '8 g / 0.28 oz'],
    priceRange: [499, 1499],
    imageType: 'makeupFace',
    hasShadeVariants: true,
  },

  // 9. MAKEUP: Eyes & Tools (60 items)
  {
    category: 'makeup',
    subcategory: 'eye-makeup',
    prefixNames: [
      'Rose Gold Mineral Eyeshadow Palette',
      'Earth & Sunset 12-Pan Eyeshadow Palette',
      'Precision Waterproof Liquid Eyeliner',
      'Lash Lift Clean Botanical Mascara',
      'Micro-Blade Precision Eyebrow Pencil',
      'Tinted Brow Sculpt Gel',
      'Smudge-Proof Gel Kohl Eyeliner',
    ],
    descriptors: ['Midnight Plum', 'Rose Foil', 'Deep Carbon', 'Golden Bronze', 'Rich Espresso', 'Smoky Mauve', 'Champagne Shimmer'],
    subtitles: [
      '12 Buttery Mattes, Satins & Molten Foils',
      'Ultra-Black Smudge-Proof Clean Formula',
      'Tubing Technology Volumizing Mascara',
      'Waterproof 24-Hour Stay with Castor Oil',
    ],
    ingredientsList: [
      ['Mica', 'Zinc Stearate', 'Squalane', 'Tocopherol'],
      ['Beeswax', 'Castor Seed Oil', 'Iron Oxides', 'Argan Oil'],
    ],
    benefitsList: [
      ['Zero fallout micro-fine mineral pigment formulation', 'Ophthalmologist tested safe for sensitive contact lens wearers', 'Sweat and humidity proof all day'],
    ],
    volumes: ['12 x 1.2 g', '1.2 ml', '8 ml / 0.27 fl. oz'],
    priceRange: [399, 1299],
    imageType: 'makeupEye',
  },

  // 10. HAIRCARE: Shampoos & Conditioners (75 items)
  {
    category: 'haircare',
    subcategory: 'shampoos',
    prefixNames: [
      'Botanical Scalp Clarifying Shampoo',
      'Rosemary & Biotin Hair Fall Defense Shampoo',
      'Intensive Moisture Repair Conditioner',
      'Volumizing Eucalyptus & Aloe Shampoo',
      'Argan & Keratin Anti-Frizz Conditioner',
      'Color Radiance Protecting Gentle Cleanser',
      'Tea Tree & Salicylic Scalp Treatment Shampoo',
    ],
    descriptors: ['Nourishing', 'Strengthening', 'Restorative', 'Silkening', 'Volumizing', 'Scalp Refresh', 'Moisture Infusion'],
    subtitles: [
      'with Eucalyptus, Rosemary & Pea Peptides',
      'with Pure Cold-Pressed Rosemary Essential Oil',
      'with Moroccan Argan Oil & Shea Butter',
      'Sulfate-Free pH 5.5 Color-Safe Formula',
    ],
    ingredientsList: [
      ['Rosemary Leaf Oil', 'Eucalyptus Oil', 'Pea Sprout Peptide', 'Organic Aloe Juice'],
      ['Cold-Pressed Argan Oil', 'Hydrolyzed Wheat Protein', 'Panthenol', 'Keratin Peptides'],
    ],
    benefitsList: [
      ['Strengthens hair roots and reduces seasonal hair fall', 'Clears stubborn product residue without drying strands', 'Leaves bouncy volume and luminous mirror shine'],
    ],
    volumes: ['250 ml / 8.5 fl. oz', '500 ml / 16.9 fl. oz'],
    priceRange: [499, 1199],
    imageType: 'haircare',
    hairTypes: ['All Hair Types', 'Dry & Damaged Hair', 'Oily Scalp & Thinning Hair', 'Frizzy & Curly Hair'],
  },

  // 11. HAIRCARE: Hair Oils & Masks (75 items)
  {
    category: 'haircare',
    subcategory: 'hair-oils-serums',
    prefixNames: [
      'Organic Rosemary & Argan Scalp Strengthening Oil',
      'Intensive Moisture Repair Butter Hair Mask',
      'Golden Jojoba & Bhringraj Hair Growth Elixir',
      'Heat Defense Glossing Hair Serum',
      'Keratin Bond Repair Leave-In Cream',
      'Overnight Scalp Revitalizing Drops',
    ],
    descriptors: ['Root Therapy', 'Gloss Elixir', 'Deep Fortify', 'Split-End Seal', 'Silk Infusion', 'Scalp Tonic'],
    subtitles: [
      '100% Cold-Pressed Ayurvedic Botanical Blend',
      'Deep Conditioning Treatment for Chemically Treated Strands',
      'Protects against heat styling up to 230°C',
    ],
    ingredientsList: [
      ['Cold-Pressed Argan Oil', 'Golden Jojoba Oil', 'Bhringraj Extract', 'Rosemary Oil'],
      ['Shea Butter', 'Murumuru Butter', 'Amino Acid Complex', 'Tocopherol'],
    ],
    benefitsList: [
      ['Stimulates scalp microcirculation and encourages thicker growth', 'Seals open hair cuticles and prevents split ends', 'Tames humidity frizz for 72 hours'],
    ],
    volumes: ['100 ml / 3.4 fl. oz', '200 g / 7.0 oz'],
    priceRange: [599, 1399],
    imageType: 'haircare',
  },

  // 12. BODYCARE: Lotions, Washes & Scrubs (140 items)
  {
    category: 'bodycare',
    subcategory: 'lotions-butters',
    prefixNames: [
      'Brightening Body Lotion with Vitamin C & Shea',
      'Whipped Jasmine & Camellia Body Soufflé',
      'Exfoliating Arabica Coffee Body Polish',
      'Aromatic Rose Damascena Shower Gel',
      'Ultra-Rich Cocoa Butter Hand & Nail Cream',
      'Soothing Lavender & Vanilla Body Elixir Oil',
      'Smoothing 10% AHA BHA Body Exfoliating Wash',
      'Intense Heel Repair Butter with Peppermint',
    ],
    descriptors: ['Velvet Touch', 'Silk Drench', 'Sublime Glow', 'Radiance Polish', 'Sensual Floral', 'Comfort Balm', 'Spa Infusion'],
    subtitles: [
      'with Kakadu Plum & Raw African Shea Butter',
      'Melts Instantly with 48-Hour Nourishing Moisture',
      'with Brown Sugar & Sweet Orange Essential Oil',
      'Sulfates-Free Gentle Cleansing with Botanical Aromas',
    ],
    ingredientsList: [
      ['Kakadu Plum Vitamin C', 'Unrefined Shea Butter', 'Sweet Almond Oil', 'Jasmine Flower Extract'],
      ['Arabica Coffee Powder', 'Brown Sugar', 'Cold-Pressed Coconut Oil', 'Vitamin E'],
    ],
    benefitsList: [
      ['Fades body tan and unifies skin tone on arms and legs', 'Absorbs within seconds with zero sticky finish', 'Envelops skin in lingering French floral aroma'],
    ],
    volumes: ['200 ml / 6.8 fl. oz', '250 g / 8.8 oz', '75 ml / 2.5 fl. oz'],
    priceRange: [399, 999],
    imageType: 'bodycare',
  },

  // 13. SUN CARE: SPF Protection (70 items)
  {
    category: 'suncare',
    subcategory: 'face-sunscreen',
    prefixNames: [
      'Invisible Dew Broad Spectrum Sunscreen SPF 50+ PA++++',
      'Cooling Aloe & Cica Sun Gel SPF 50',
      'Ultra-Light Matte Fluid Sunscreen SPF 50+ PA++++',
      'Tinted Mineral Glow Sunscreen SPF 50',
      'On-The-Go Water-Resistant Sunscreen Stick SPF 50+',
      'After-Sun Soothing Aloe Vera Repair Gel',
    ],
    descriptors: ['Zero-Whitecast', 'Water-Light', 'Sweat-Proof', 'Cica Shield', 'Antioxidant Defense', 'Hydra-Sun'],
    subtitles: [
      'Ultra-Lightweight Hybrid Formula with Aloe & Cica',
      'Instant -3°C Cooling Sensation for Humid Climates',
      'Reef-Safe Formula with Zinc Oxide & Vitamin E',
      'Glides Effortlessly Over Makeup with Zero Greasiness',
    ],
    ingredientsList: [
      ['Micro-Dispersed Zinc Oxide', 'Centella Asiatica', 'Aloe Leaf Juice', 'Hyaluronic Acid'],
      ['Aloe Vera Gel 99%', 'Cucumber Extract', 'Panthenol', 'Allantoin'],
    ],
    benefitsList: [
      ['100% invisible finish on all Indian skin tones', 'Guards against UVA, UVB, Blue Light & Pollution', 'Zero eye-stinging and non-comedogenic'],
    ],
    volumes: ['50 ml / 1.7 fl. oz', '75 ml / 2.5 fl. oz', '20 g / 0.7 oz'],
    priceRange: [499, 999],
    imageType: 'suncare',
  },

  // 14. BEAUTY TOOLS: Rollers, Gua Sha & Brushes (50 items)
  {
    category: 'tools',
    subcategory: 'facial-tools',
    prefixNames: [
      'Natural Rose Quartz Gua Sha Sculpting Tool',
      'Dual-Ended Authentic Jade Facial Roller',
      'Precision Kabuki Foundation Blending Brush',
      'Pro 8-Piece Rose Gold Makeup Brush Set',
      'Sonic Silicone Facial Cleansing Device',
      'Cryo Ice Globes Facial Massager Duo',
      'Velvet Cloud Beauty Blender Sponge Duo',
    ],
    descriptors: ['Handcrafted', 'Ergonomic', 'Vanity Luxe', 'Luxe Rose Gold', 'Lymphatic Sculpt', 'Radiance Tool'],
    subtitles: [
      '100% Grade A Natural Brazilian Rose Quartz',
      'Calms Puffiness and Promotes Lymphatic Drainage',
      'Ultra-Soft Vegan Synthetic Bristles with Keepsake Pouch',
    ],
    ingredientsList: [
      ['Grade-A Rose Quartz Stone', 'Protective Velvet Pouch'],
      ['High-Density Antimicrobial Micro-Bristles', 'Rose Gold Ferrule', 'Sustainable Wood Handle'],
    ],
    benefitsList: [
      ['Sculpts jawline and lifts facial contours naturally', 'Relieves facial muscle tension and stress', 'Enhances serum and oil absorption by 300%'],
    ],
    volumes: ['1 Piece with Keepsake Case', '8-Piece Professional Set', 'Duo Pack'],
    priceRange: [399, 1999],
    imageType: 'tools',
  },

  // 15. GIFT SETS & HAMPERS (50 items)
  {
    category: 'giftsets',
    subcategory: 'luxury-hampers',
    prefixNames: [
      'Radiance Glow Essentials 4-Piece Luxury Box',
      'The Royal Velvetique Bridal Radiance Hamper',
      'Daily Cleanse & Hydrate 2-Piece Duo',
      'The Ultimate Velvet Matte Lipstick Vault',
      'Scalp & Hair Wellness 3-Piece Revival Kit',
      'Botanical Spa Bath & Body Indulgence Box',
      'Jetset Beauty Travel Discovery Set',
    ],
    descriptors: ['Signature Box', 'Royal Keepsake', 'Festive Edition', 'Luxury Hamper', 'Bridal Suite', 'Self-Care Ritual'],
    subtitles: [
      'Full Sizes of Bestselling Serum, Moisturizer & Cleanser',
      'Includes Rose Quartz Gua Sha + Scented Soy Candle',
      'Packaged in Velvet Embossed Keepsake Magnetic Box',
      'Curated TSA-Approved Essentials in Vegan Leather Pouch',
    ],
    ingredientsList: [
      ['Full Skincare Suite', 'Natural Stone Gua Sha', 'Keepsake Box'],
      ['Curated 4-Piece Signature Line', 'Satin Sleep Mask Gift'],
    ],
    benefitsList: [
      ['The ultimate gifting experience for loved ones or brides', 'Saves up to 35% compared to individual items', 'Includes greeting card and luxury ribbon wrap'],
    ],
    volumes: ['Full Deluxe Set', '3 Full Sizes + 1 Tool', '4 Travel Sizes'],
    priceRange: [999, 4499],
    imageType: 'giftsets',
  },
];

console.log('Generating 1,020 rich, unique products across all categories...');

interface GeneratedProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  subtitle: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages: string[];
  imageAlt: string;
  description: string;
  shortDescription: string;
  ingredients: string[];
  howToUse: string;
  benefits: string[];
  volume: string;
  isBestSeller: boolean;
  isNew: boolean;
  isFeatured: boolean;
  isLimitedOffer: boolean;
  inStock: boolean;
  stock: number;
  skinType?: string;
  hairType?: string;
  tags: string[];
  collections: string[];
  variants?: any[];
}

const products: GeneratedProduct[] = [];
let idCounter = 1;

// Keep existing first 4 bestsellers untouched so homepage matches exact video/image!
const SEED_ORIGINALS = [
  {
    name: 'Oil Control Face Wash',
    subtitle: 'with Salicylic Acid & Tea Tree',
    category: 'skincare',
    subcategory: 'cleansers',
    price: 499,
    originalPrice: 599,
    rating: 5.0,
    reviewCount: 125,
    image: '/images/category_skincare.jpg',
    description: 'A gentle purifying gel cleanser formulated with 2% encapsulated Salicylic Acid and botanical Tea Tree to clarify pores without stripping natural moisture.',
    volume: '100 ml / 3.38 fl. oz',
    isBestSeller: true,
    isNew: false,
    stock: 45,
    skinType: 'Oily & Combination Skin',
  },
  {
    name: '10% Niacinamide Face Serum',
    subtitle: 'with Hyaluronic Acid & Zinc',
    category: 'skincare',
    subcategory: 'face-serums',
    price: 799,
    originalPrice: 999,
    rating: 5.0,
    reviewCount: 200,
    image: '/images/hero_showcase.jpg',
    description: 'High-potency multi-action daily serum infused with 10% pure Niacinamide and triple-weight Hyaluronic Acid to diminish dark spots, tighten enlarged pores, and boost luminosity.',
    volume: '30 ml / 1.0 fl. oz',
    isBestSeller: true,
    isNew: false,
    stock: 60,
    skinType: 'All Skin Types',
  },
  {
    name: 'Hydra Intense Gel Moisturizer',
    subtitle: 'Dew Boost with Sea Kelp & Ceramide',
    category: 'skincare',
    subcategory: 'moisturizers',
    price: 649,
    originalPrice: 799,
    rating: 5.0,
    reviewCount: 185,
    image: '/images/hero_showcase.jpg',
    description: 'An ultra-refreshing water-gel moisturizer that delivers 72 hours of weightless hydration. Enriched with fermented Sea Kelp and Ceramide NP for plump, glass-like radiance.',
    volume: '50 g / 1.76 oz',
    isBestSeller: true,
    isNew: false,
    stock: 38,
    skinType: 'Dry, Dehydrated & Normal Skin',
  },
  {
    name: 'Velvet Matte Lipstick',
    subtitle: 'Shade: Dusky Plum Rose',
    category: 'makeup',
    subcategory: 'lip-color',
    price: 349,
    originalPrice: 449,
    rating: 5.0,
    reviewCount: 98,
    image: '/images/category_makeup.jpg',
    description: 'A cloud-soft, non-drying matte lipstick that cloaks lips in pigmented dusty plum elegance with an ultra-comfortable wear time of up to 10 hours.',
    volume: '3.8 g / 0.13 oz',
    isBestSeller: true,
    isNew: true,
    stock: 52,
  },
];

for (const orig of SEED_ORIGINALS) {
  const padId = String(idCounter).padStart(4, '0');
  const slug = orig.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + padId;
  const sku = `VB-${orig.category.slice(0, 3).toUpperCase()}-${orig.subcategory.slice(0, 3).toUpperCase()}-${padId}`;

  products.push({
    id: `vb-prod-${padId}`,
    slug,
    sku,
    name: orig.name,
    subtitle: orig.subtitle,
    brand: 'Velvetique Beauty',
    category: orig.category,
    subcategory: orig.subcategory,
    price: orig.price,
    originalPrice: orig.originalPrice,
    currency: 'INR',
    rating: orig.rating,
    reviewCount: orig.reviewCount,
    image: orig.image,
    additionalImages: [
      orig.image,
      '/images/promo_flatlay.jpg',
    ],
    imageAlt: `${orig.name} - Velvetique Beauty`,
    description: orig.description,
    shortDescription: orig.description.split('.')[0] + '.',
    ingredients: ['Active Botanicals', 'Hyaluronic Acid Complex', 'Organic Aloe Vera', 'Panthenol'],
    howToUse: 'Smooth gently over clean face and neck in upward circular motions.',
    benefits: ['Supports skin lipid moisture barrier', 'Leaves soft petal finish', 'Clean dermatological formula'],
    volume: orig.volume,
    isBestSeller: orig.isBestSeller,
    isNew: orig.isNew,
    isFeatured: true,
    isLimitedOffer: false,
    inStock: true,
    stock: orig.stock,
    skinType: orig.skinType || 'All Skin Types',
    tags: ['bestseller', orig.category, orig.subcategory, 'clean-beauty'],
    collections: ['bestsellers', 'radiant-skin', 'under-999'],
    variants: [
      { id: `var-${padId}-1`, name: 'Standard Edition', sku: `${sku}-STD`, price: orig.price, stock: orig.stock },
      { id: `var-${padId}-2`, name: 'Deluxe Edition', sku: `${sku}-DLX`, price: orig.price + 250, originalPrice: orig.price + 350, stock: 20 },
    ],
  });
  idCounter++;
}

// Generate remaining products to reach at least 1,020 unique items
const TARGET_TOTAL = 1024;
const needed = TARGET_TOTAL - products.length;
const perSpec = Math.ceil(needed / SPECS.length);

for (const spec of SPECS) {
  const imgList = IMAGES[spec.imageType] || IMAGES.serum;

  for (let i = 0; i < perSpec; i++) {
    if (products.length >= TARGET_TOTAL) break;

    const padId = String(idCounter).padStart(4, '0');
    const prefix = spec.prefixNames[i % spec.prefixNames.length];
    const desc = spec.descriptors[Math.floor(i / spec.prefixNames.length) % spec.descriptors.length];
    const name = `${prefix} — ${desc}`;

    const subtitle = spec.subtitles[i % spec.subtitles.length];
    const brand = BRANDS[i % BRANDS.length];
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '-' + padId;
    const sku = `VB-${spec.category.slice(0, 3).toUpperCase()}-${spec.subcategory.slice(0, 3).toUpperCase()}-${padId}`;

    // Price calculation with realistic spread
    const [minP, maxP] = spec.priceRange;
    const priceSpread = maxP - minP;
    const priceRaw = minP + Math.round(((i * 73 + idCounter * 29) % priceSpread) / 50) * 50;
    const price = Math.max(minP, Math.min(maxP, priceRaw));
    const hasDiscount = (idCounter % 3 === 0);
    const originalPrice = hasDiscount ? Math.round(price * 1.25 / 50) * 50 : undefined;

    const rating = Number((4.5 + ((idCounter * 17) % 5) * 0.1).toFixed(1));
    const reviewCount = 15 + ((idCounter * 31) % 280);

    const primaryImage = imgList[i % imgList.length];
    const additionalImages = [
      imgList[(i + 1) % imgList.length],
      imgList[(i + 2) % imgList.length],
    ];

    const volume = spec.volumes[i % spec.volumes.length];
    const skinType = spec.skinTypes ? spec.skinTypes[i % spec.skinTypes.length] : undefined;
    const hairType = spec.hairTypes ? spec.hairTypes[i % spec.hairTypes.length] : undefined;

    const isBestSeller = (idCounter % 7 === 0);
    const isNew = (idCounter % 5 === 0);
    const isFeatured = (idCounter % 9 === 0);
    const isLimitedOffer = (idCounter % 11 === 0);
    const inStock = (idCounter % 23 !== 0); // 95%+ in stock
    const stock = inStock ? 12 + ((idCounter * 13) % 65) : 0;

    const ingredients = spec.ingredientsList[i % spec.ingredientsList.length];
    const benefits = spec.benefitsList[i % spec.benefitsList.length];

    const description = `Indulge in Velvetique's masterfully crafted ${name}. Formulated with pure ${ingredients[0]} and ${ingredients[1]} to gently support natural balance and replenish radiant vitality. Clinically tested for all-day comfort.`;
    const shortDescription = `Luxurious ${spec.subcategory.replace('-', ' ')} enriched with ${ingredients[0]}.`;
    const howToUse = spec.category === 'makeup'
      ? 'Apply evenly using fingertip, precision applicator, or blending sponge. Layer for desired intensity.'
      : spec.category === 'haircare'
      ? 'Massage thoroughly into wet scalp or strands. Leave for 2 minutes before rinsing with cool water.'
      : 'Apply a pea-to-coin sized amount to cleansed skin in gentle upward sweeping motions morning and evening.';

    const collections: string[] = [];
    if (isBestSeller) collections.push('bestsellers');
    if (isNew) collections.push('new-arrivals');
    if (hasDiscount) collections.push('sale');
    if (price <= 999) collections.push('under-999');
    if (spec.category === 'skincare') collections.push('radiant-skin');
    if (spec.subcategory.includes('serum') || spec.subcategory.includes('moisturizer')) collections.push('hydration-heroes');
    if (spec.category === 'giftsets') collections.push('bridal-luxury');

    const variants = spec.hasShadeVariants
      ? [
          { id: `var-${padId}-1`, name: 'Dusky Plum', sku: `${sku}-DP`, price, stock: Math.floor(stock / 2) },
          { id: `var-${padId}-2`, name: 'Rose Petal', sku: `${sku}-RP`, price, stock: Math.ceil(stock / 2) },
          { id: `var-${padId}-3`, name: 'Nude Velvet', sku: `${sku}-NV`, price, stock: 15 },
        ]
      : [
          { id: `var-${padId}-1`, name: volume.split('/')[0].trim(), sku: `${sku}-STD`, price, stock },
          { id: `var-${padId}-2`, name: 'Travel Size', sku: `${sku}-TRV`, price: Math.max(199, Math.round(price * 0.55)), stock: 25 },
        ];

    products.push({
      id: `vb-prod-${padId}`,
      slug,
      sku,
      name,
      subtitle,
      brand,
      category: spec.category,
      subcategory: spec.subcategory,
      price,
      originalPrice,
      currency: 'INR',
      rating,
      reviewCount,
      image: primaryImage,
      additionalImages,
      imageAlt: `${name} - ${brand}`,
      description,
      shortDescription,
      ingredients,
      howToUse,
      benefits,
      volume,
      isBestSeller,
      isNew,
      isFeatured,
      isLimitedOffer,
      inStock,
      stock,
      skinType,
      hairType,
      tags: [spec.category, spec.subcategory, brand.toLowerCase().replace(/\s+/g, '-')],
      collections,
      variants,
    });

    idCounter++;
  }
}

console.log(`Generated ${products.length} distinct products.`);

// Generate categories list with updated item counts
const categoryMap = new Map<string, number>();
products.forEach(p => {
  categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
});

const CATEGORIES = [
  {
    id: 'skincare',
    name: 'Skincare',
    slug: 'skincare',
    description: 'Gentle, potent botanical serums, cleansers and hydrators.',
    image: '/images/category_skincare.jpg',
    itemCount: categoryMap.get('skincare') || 0,
    subcategories: ['cleansers', 'toners-essences', 'face-serums', 'moisturizers', 'eye-care', 'face-masks', 'facial-oils'],
  },
  {
    id: 'makeup',
    name: 'Makeup',
    slug: 'makeup',
    description: 'Clean, breathable tints, plush lipsticks, and warm mineral palettes.',
    image: '/images/category_makeup.jpg',
    itemCount: categoryMap.get('makeup') || 0,
    subcategories: ['face-base', 'lip-color', 'eye-makeup', 'cheeks-blush', 'makeup-tools'],
  },
  {
    id: 'haircare',
    name: 'Haircare',
    slug: 'haircare',
    description: 'Scalp-revitalizing botanical shampoos, oils, and restorative masks.',
    image: '/images/category_haircare.jpg',
    itemCount: categoryMap.get('haircare') || 0,
    subcategories: ['shampoos', 'conditioners', 'hair-masks', 'hair-oils-serums'],
  },
  {
    id: 'bodycare',
    name: 'Bodycare',
    slug: 'bodycare',
    description: 'Whipped body soufflés, brightening lotions, and nourishing scrubs.',
    image: '/images/category_bodycare.jpg',
    itemCount: categoryMap.get('bodycare') || 0,
    subcategories: ['lotions-butters', 'body-wash', 'body-scrubs', 'hand-foot'],
  },
  {
    id: 'suncare',
    name: 'Sun Care',
    slug: 'suncare',
    description: 'Broad-spectrum PA++++ invisible finishes with calming aloe & cica.',
    image: '/images/category_suncare.jpg',
    itemCount: categoryMap.get('suncare') || 0,
    subcategories: ['face-sunscreen', 'body-sunscreen', 'after-sun'],
  },
  {
    id: 'tools',
    name: 'Beauty Tools',
    slug: 'tools',
    description: 'Authentic rose quartz gua sha, jade rollers, and artisan brushes.',
    image: '/images/category_tools.jpg',
    itemCount: categoryMap.get('tools') || 0,
    subcategories: ['facial-tools', 'applicators'],
  },
  {
    id: 'giftsets',
    name: 'Gift Sets',
    slug: 'giftsets',
    description: 'Curated beauty hampers and everyday luxury rituals in keepsake boxes.',
    image: '/images/category_giftsets.jpg',
    itemCount: categoryMap.get('giftsets') || 0,
    subcategories: ['luxury-hampers', 'routine-kits', 'travel-edits'],
  },
];

const COLLECTIONS = [
  {
    id: 'bestsellers',
    slug: 'bestsellers',
    title: 'Best Sellers',
    subtitle: 'Our Most Coveted Formulations',
    description: 'Customer-cherished essentials that define the Velvetique clean radiance philosophy.',
    image: '/images/hero_showcase.jpg',
    productCount: products.filter(p => p.isBestSeller).length,
    filterTag: 'bestseller',
  },
  {
    id: 'new-arrivals',
    slug: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'Fresh Botanical Discoveries',
    description: 'The latest innovations in clean dermal biotechnology and luxury botanicals.',
    image: '/images/promo_flatlay.jpg',
    productCount: products.filter(p => p.isNew).length,
    filterTag: 'new',
  },
  {
    id: 'sale',
    slug: 'sale',
    title: 'Limited Offers & Sale',
    subtitle: 'Up to 30% Off on Selected Icons',
    description: 'Indulge in special promotional pricing across our signature luxury beauty edits.',
    image: '/images/promo_flatlay.jpg',
    productCount: products.filter(p => p.originalPrice && p.originalPrice > p.price).length,
    filterTag: 'sale',
  },
  {
    id: 'radiant-skin',
    slug: 'radiant-skin',
    title: 'Glass Skin & Radiance Ritual',
    subtitle: 'Triple-Hydration Botanical Care',
    description: 'Layered botanical skincare that locks in 72-hour moisture and glass-like dewiness.',
    image: '/images/category_skincare.jpg',
    productCount: products.filter(p => p.collections.includes('radiant-skin')).length,
    filterTag: 'radiant-skin',
  },
  {
    id: 'under-999',
    slug: 'under-999',
    title: 'Bestsellers Under ₹999',
    subtitle: 'Accessible Everyday Luxury',
    description: 'Pocket-friendly botanical luxuries formulated without compromise.',
    image: '/images/category_makeup.jpg',
    productCount: products.filter(p => p.price <= 999).length,
    filterTag: 'under-999',
  },
  {
    id: 'bridal-luxury',
    slug: 'bridal-luxury',
    title: 'The Royal Bridal & Festive Suite',
    subtitle: 'Heirloom Beauty Hampers',
    description: 'Opulent multi-piece gift hampers packaged in keepsake magnetic boxes with satin touches.',
    image: '/images/category_giftsets.jpg',
    productCount: products.filter(p => p.collections.includes('bridal-luxury') || p.category === 'giftsets').length,
    filterTag: 'bridal',
  },
];

// Write to src/data/productsCatalog.ts
const fileContent = `// AUTOGENERATED VELVETIQUE BEAUTY EXPANDED CATALOG
// Contains ${products.length} unique, distinct beauty products
import { Product, Category, Collection } from '../types/index.ts';

export const FULL_CATALOG: Product[] = ${JSON.stringify(products, null, 2)};

export const CATALOG_CATEGORIES: Category[] = ${JSON.stringify(CATEGORIES, null, 2)};

export const CATALOG_COLLECTIONS: Collection[] = ${JSON.stringify(COLLECTIONS, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/productsCatalog.ts'), fileContent, 'utf-8');
console.log(`Successfully wrote ${products.length} products to src/data/productsCatalog.ts`);
