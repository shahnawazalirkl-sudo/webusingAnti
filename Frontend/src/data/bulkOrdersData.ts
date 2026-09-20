export const BULK_TIERS = [
  {
    tier: "Tier 01",
    range: "25 - 75 Units",
    title: "Intimate & Bridal Party",
    description: "Perfect for bridal entourages, rehearsal dinners, and close family wedding essentials favors.",
    discount: "15%",
    discountRate: 0.15,
    minQty: 25,
    maxQty: 75,
    privilegeLabel: "Collection Privilege",
    value: "25-75",
    perks: [
      "Complimentary custom wax seals",
      "Individual handwritten note cards",
      "Standard luxury gift casing"
    ]
  },
  {
    tier: "Tier 02",
    range: "76 - 200 Units",
    title: "Celebration & Functions",
    description: "Engineered for Mehendi, Sangeet favors, and intimate destination arrivals.",
    discount: "22%",
    discountRate: 0.22,
    minQty: 76,
    maxQty: 200,
    privilegeLabel: "Collection Privilege",
    value: "76-200",
    perks: [
      "Free 24k foil deboss brass die",
      "Color palette bespoke matching",
      "Complimentary physical master sample box"
    ]
  },
  {
    tier: "Tier 03",
    range: "201 - 500 Units",
    title: "Grand Wedding Welcome Kits",
    description: "Complete guest room arrival hampers and multi-day itinerary luxury gift boxes.",
    discount: "30%",
    discountRate: 0.30,
    minQty: 201,
    maxQty: 500,
    privilegeLabel: "Collection Privilege",
    popular: true,
    value: "201-500",
    perks: [
      "Dedicated logistics coordinator",
      "Custom fabric lining & ribbon selection",
      "Multi-resort split shipping option"
    ]
  },
  {
    tier: "Tier 04",
    range: "500+ Units",
    title: "Royal & Destination Affairs",
    description: "Monumental celebrations requiring complete turn-key gifting logistics and on-site support.",
    discount: "35%",
    discountRate: 0.35,
    minQty: 501,
    maxQty: 5000,
    privilegeLabel: "Collection Privilege",
    value: "500+",
    perks: [
      "On-site white-glove staging team",
      "Master calligrapher live room-inserts",
      "Air-cargo climate guarantee"
    ]
  }
];

export const BULK_CATALOG_ITEMS = [
  {
    id: "mulberry-silk-robe-suite",
    name: "Mulberry Silk Robe & Stole Suite",
    category: "wedding-favors",
    categoryLabel: "Wedding Favors",
    description: "Pure organic silk stoles with hand-pressed gold foil calligraphy and French lace trims.",
    minUnits: 25,
    tag: "Favors",
    price: 1850,
    originalPrice: 2800,
    leadTime: "7-10 Days",
    image: "/assets/cdn/img_8984eb48392e.jpg"
  },
  {
    id: "italian-leather-passport-favors",
    name: "Italian Saddle Leather Passport Favors",
    category: "wedding-favors",
    categoryLabel: "Wedding Favors",
    description: "Full-grain vegetable-tanned leather cases debossed with custom couple initials and destination coordinates.",
    minUnits: 50,
    tag: "Destination",
    price: 1150,
    originalPrice: 1950,
    leadTime: "5-7 Days",
    image: "/assets/cdn/img_0b209aa39e57.jpg"
  },
  {
    id: "brass-botanical-soy-candle",
    name: "Brass Jar Botanical Soy Candle",
    category: "wedding-favors",
    categoryLabel: "Wedding Favors",
    description: "Hand-poured Oud, Kashmir Rose, and Neroli soy wax housed in reusable antique etched brass containers.",
    minUnits: 50,
    tag: "Botanical",
    price: 890,
    originalPrice: 1450,
    leadTime: "5-8 Days",
    image: "/assets/cdn/img_c10642d7b8c1.jpg"
  },
  {
    id: "sovereign-velvet-trinket-vaults",
    name: "Sovereign Velvet Trinket Vaults",
    category: "wedding-favors",
    categoryLabel: "Wedding Favors",
    description: "Handcrafted heirloom velvet treasure boxes with monogrammed gold hardware and silk satin lining.",
    minUnits: 30,
    tag: "Keepsake",
    price: 1450,
    originalPrice: 2250,
    leadTime: "8-12 Days",
    image: "/assets/cdn/img_f0122d2643a6.jpg"
  },
  {
    id: "palace-room-welcome-hamper",
    name: "Imperial Palace Room Welcome Hamper",
    category: "welcome-hampers",
    categoryLabel: "Welcome Hampers",
    description: "Curated welcome suite containing gourmet confections, artisanal mist, room keys pouch, and custom itinerary booklet.",
    minUnits: 40,
    tag: "Hamper Suite",
    price: 2650,
    originalPrice: 3800,
    leadTime: "10-14 Days",
    image: "/assets/cdn/img_ce96f997d2cf.jpg"
  },
  {
    id: "mehendi-botanical-wellness-tote",
    name: "Mehendi Botanical Wellness Tote",
    category: "welcome-hampers",
    categoryLabel: "Welcome Hampers",
    description: "Jute and canvas carryall packed with organic Ayurvedic bath salts, hand creams, and custom engraved wooden comb.",
    minUnits: 35,
    tag: "Haldi & Mehendi",
    price: 1250,
    originalPrice: 1900,
    leadTime: "6-9 Days",
    image: "/assets/cdn/img_8b99834ae7ff.jpg"
  },
  {
    id: "executive-crest-leather-compendium",
    name: "Executive Crest Leather Compendium",
    category: "corporate-gifting",
    categoryLabel: "Corporate & VIP",
    description: "Hand-stitched leather portfolio with gold foil corporate branding, custom pen, and brass cardholder.",
    minUnits: 25,
    tag: "Corporate VIP",
    price: 2100,
    originalPrice: 3200,
    leadTime: "7-10 Days",
    image: "/assets/cdn/img_970d4c72834b.jpg"
  },
  {
    id: "artisanal-copper-wellness-carafe",
    name: "Artisanal Pure Copper Wellness Carafe",
    category: "corporate-gifting",
    categoryLabel: "Corporate & VIP",
    description: "Hand-hammered pure copper water carafe with two matching tumblers in bespoke velvet lined gift box.",
    minUnits: 30,
    tag: "Corporate Wellness",
    price: 1750,
    originalPrice: 2600,
    leadTime: "7-12 Days",
    image: "/assets/cdn/img_2c91834ee8a1.jpg"
  }
];

export const BULK_SIGNATURE_FAVORS = BULK_CATALOG_ITEMS.slice(0, 4);

export const BULK_ADDONS = [
  {
    id: "custom-brass-die",
    name: "Custom 3D Brass Crest Die",
    price: 0,
    includedWithTier: "Tier 02+",
    description: "Custom CNC-machined metal embossing die for deep hot-stamp crest foiling."
  },
  {
    id: "hand-pressed-wax-seal",
    name: "Artisanal Wax Seal with Gold Flecks",
    price: 35,
    includedWithTier: "All Tiers",
    description: "Hand-poured pearlescent sealing wax with custom monogram impression."
  },
  {
    id: "pure-silk-ribbon",
    name: "Double-Faced Mulberry Silk Ribbon",
    price: 50,
    includedWithTier: "Tier 03+",
    description: "Hand-dyed 25mm silk satin ribbons in customized celebration pantone."
  },
  {
    id: "calligraphy-note",
    name: "Master Calligraphy Guest Name Cards",
    price: 45,
    includedWithTier: "Tier 04",
    description: "Individually penned names on 350gsm handmade cotton deckle-edge paper."
  }
];

export const BULK_CASE_STUDIES = [
  {
    id: "udaipur-royal-affair",
    title: "The Oberoi Udaivilas, Udaipur",
    locationTag: "Palace Destination",
    unitsBadge: "450 Favor Suites",
    quote: "ASRA took care of everything from custom 3D brass die creation to delivery directly into guest rooms across three hotels in Udaipur. The guests were awestruck by the gold foil details.",
    couple: "Aanya & Kabir",
    initials: "AK",
    subInfo: "450 Units • 4-Day Royal Wedding"
  },
  {
    id: "goa-beachside-soiree",
    title: "Taj Exotica Resort & Spa, Goa",
    locationTag: "Coastal Celebration",
    unitsBadge: "280 Welcome Hampers",
    quote: "Our destination hampers were waiting inside each guest villa upon check-in. The personalized itinerary cards and silk wraps set the most exquisite luxury tone for our entire wedding weekend.",
    couple: "Rhea & Shaurya",
    initials: "RS",
    subInfo: "280 Units • 3-Day Beachside Nuptials"
  },
  {
    id: "jaipur-heritage-gala",
    title: "Rambagh Palace, Jaipur",
    locationTag: "Heritage Gala",
    unitsBadge: "620 Keepsake Vaults",
    quote: "The velvet trinket vaults with custom initials became the talk of our wedding. Impeccable craftsmanship and zero delivery damage across 600+ delicate units.",
    couple: "Meera & Dev",
    initials: "MD",
    subInfo: "620 Units • Grand Palatial Gala"
  },
  {
    id: "dubai-luxury-reception",
    title: "Bulgari Resort Dubai",
    locationTag: "International Luxury",
    unitsBadge: "350 Silk Robe Suites",
    quote: "Flawless international air delivery directly to our bridal suite in Dubai. The gold foiling matched our decor scheme flawlessly.",
    couple: "Zoya & Farhan",
    initials: "ZF",
    subInfo: "350 Units • Destination Reception"
  }
];

export const BULK_FAQS = [
  {
    id: "sample-box",
    question: "How do I receive a physical sample box before placing a bulk order?",
    answer: "For all serious celebrations and corporate inquiries of 50+ units, we ship a complimentary Master Sample Box within 48 hours. This includes material swatches, ribbon options, fragrance samples, and physical foil stamping samples so you can inspect quality in person before production begins."
  },
  {
    id: "lead-times",
    question: "What is the typical production and delivery lead time for bulk orders?",
    answer: "Standard production lead times range from 7 to 14 business days depending on quantity and monogram customization complexity. For urgent timelines, our Express Bridal Rush service can ship within 5 to 7 business days with direct courier delivery."
  },
  {
    id: "minimum-orders",
    question: "What are the minimum order quantities (MOQ)?",
    answer: "Our minimum order volume begins at just 25 to 50 units depending on the product tier. We cater to intimate 30-guest bridal party luncheons up to 5,000+ guest royal galas."
  },
  {
    id: "gst-corporate",
    question: "Do you provide official GST Invoices and Corporate Input Tax Credit (ITC)?",
    answer: "Yes. All corporate and wedding bulk orders are issued with a verified 18% GST tax invoice allowing registered businesses to claim full Input Tax Credit (ITC). Corporate PO payments, NEFT/RTGS, and international wire transfers are accepted."
  },
  {
    id: "split-delivery",
    question: "Can you ship directly to our destination hotel or split across multiple venues?",
    answer: "Absolutely. We offer white-glove direct-to-venue logistics across 140+ destinations in India and worldwide. We can split your shipment across multiple resort addresses, room numbers, or family residences with climate-controlled packaging."
  },
  {
    id: "customization-limits",
    question: "Can we provide our own custom couple crest, logo, or font typography?",
    answer: "Yes. You can upload or share your wedding monogram, vector crest (AI/PDF/PNG), or corporate vector logo with our design concierge. Our master engravers will manufacture a bespoke brass die to hot-stamp your exact artwork."
  }
];
