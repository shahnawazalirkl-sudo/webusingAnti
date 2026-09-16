// Central Product & Content Database for ASRA Wedding Canvas

export const PRODUCTS = [
  // 1. The Sovereign Bridal Collection Hamper (Flagship Masterpiece)
  {
    id: "sovereign-bridal-suite",
    slug: "sovereign-bridal-suite",
    aliases: ["sovereign-bridal-hamper"],
    sku: "ASRA-SOV-019",
    title: "The Sovereign Bridal Collection Hamper",
    category: "bridal-hampers",
    subCategory: "bridal-groom-gifts",
    categoryLabel: "Bridal Suite",
    price: 3499,
    originalPrice: 4499,
    rating: 4.9,
    reviewCount: 128,
    badge: "Bridal Suite",
    secondaryBadge: "Bestseller",
    craft: "Initials Raw Silk & Velvet",
    recipient: "For Bride & Groom",
    ceremony: "Wedding Day Ceremony",
    timeline: "Priority Express (48h)",
    inStock: true,
    image: "/assets/cdn/img_8222cd4f9dd5.png",
    gallery: [
      "/assets/cdn/img_8222cd4f9dd5.png",
      "/assets/cdn/img_71f820512472.jpg",
      "/assets/cdn/img_a1877a3f3271.jpg"
    ],
    shortDescription: "Artisanal presentation with French eau de parfum, eternal silk roses, soy candle, gift bear & Ferrero Rocher.",
    description: "The crown jewel of ASRA Collection. Every Sovereign Suite is handcrafted individually for the couple, featuring customized debossed initials forged with custom bronze metallurgy dies.",
    editions: [
      { name: "Classic Blush & Champagne Gold", price: 3499, dotColors: ["#f4d6d6", "#c5a880"] },
      { name: "Royal Ivory & 24k Gilded Emerald", price: 3999, dotColors: ["#faf8f5", "#1b4332"] },
      { name: "Monochrome Noir & Rose Gold", price: 4299, dotColors: ["#1c1b1b", "#b76e79"] }
    ],
    inclusions: [
      "01 / Hardbound Initials Hatbox (1200 GSM lined in soft blush velvet with couple's customized 3D initials die in 24k gold leaf)",
      "02 / Signature Collection Eau De Parfum 50ml (Kashmiri damask rose, golden vanilla & precious white oud in bevelled crystal)",
      "03 / Hand-Poured Botanical Candle (100% natural organic soy wax with polished gold brass lid)",
      "04 / Pure Mulberry Silk Scrunchie (Grade 6A 22 Momme natural mulberry silk in matching blush tone)",
      "05 / Heirloom Mini Plush Bear (Ivory gift bear clasping embroidered linen crest badge)",
      "06 / Ferrero Rocher Diamond Box (Crisp hazelnut pralines cushioned amid fresh preserved Gypsophila & blush roses)"
    ]
  },

  // 2. Heirloom Wax-Sealed Deckle Vow Books
  {
    id: "deckle-vow-books",
    slug: "deckle-vow-books",
    title: "Heirloom Wax-Sealed Deckle Vow Books",
    category: "vow-books",
    subCategory: "vow-stationery",
    categoryLabel: "Handmade Paper",
    price: 1299,
    originalPrice: 1699,
    rating: 5.0,
    reviewCount: 94,
    badge: "Handmade Paper",
    craft: "Gilded Wax Seal & Deckle Edge",
    recipient: "For Bride & Groom",
    ceremony: "Wedding Day Ceremony",
    timeline: "Priority Express (48h)",
    inStock: true,
    image: "/assets/cdn/img_11a57511dc47.jpg",
    gallery: [
      "/assets/cdn/img_11a57511dc47.jpg",
      "/assets/cdn/img_a9cc139c9496.jpg"
    ],
    shortDescription: "Handmade 150 GSM cotton rag with customized gilded calligraphy names and pure raw-silk ribbon binding.",
    description: "Set of 2 hand-torn cotton deckle paper vow booklets sealed with botanical brass wax stamps and raw silk ribbon. Each page is acid-free and designed to preserve sacred ceremonial promises.",
    editions: [
      { name: "Dusty Rose & Champagne Silk", price: 1299, dotColors: ["#f4d6d6", "#c5a880"] },
      { name: "Sage Green & Antique Gold", price: 1299, dotColors: ["#84a98c", "#d4af37"] }
    ],
    inclusions: [
      "1x 'Her Vows' Hand-Bound Deckle Rag Book",
      "1x 'His Vows' Hand-Bound Deckle Rag Book",
      "2x Botanical Wax Seals with Metallic Gold Dust",
      "2x Hand-Dyed Pure Habotai Silk Ribbon Ties"
    ]
  },

  // 3. Customized Velvet Double Ring Vault
  {
    id: "velvet-ring-vault",
    slug: "velvet-ring-vault",
    title: "Customized Velvet Double Ring & Mangalsutra Vault",
    category: "velvet-boxes",
    subCategory: "trousseau-vaults",
    categoryLabel: "Heirloom Velvet",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 76,
    badge: "Heirloom Velvet",
    craft: "Initials Raw Silk & Velvet",
    recipient: "For Bride & Groom",
    ceremony: "Wedding Day Ceremony",
    timeline: "Standard Collection (4-7 Days)",
    inStock: true,
    image: "/assets/cdn/img_5ca8bace4375.jpg",
    gallery: [
      "/assets/cdn/img_5ca8bace4375.jpg",
      "/assets/cdn/img_677956d05c8e.jpg"
    ],
    shortDescription: "Rich champagne silk interior with gold debossed couple initials and customized cushion compartments.",
    description: "Custom octagonal luxury velvet jewelry case with separate slots for couple wedding bands and bridal sacred mangalsutra. Hand-debossed with gold foil initials initials.",
    editions: [
      { name: "Champagne Beige Velvet", price: 1899, dotColors: ["#e5c193", "#FAF8F5"] },
      { name: "Imperial Emerald Velvet", price: 1999, dotColors: ["#1b4332", "#c5a880"] },
      { name: "Burgundy Wine Velvet", price: 1999, dotColors: ["#831843", "#c5a880"] }
    ],
    inclusions: [
      "1x Octagonal Plush Velvet Casket",
      "2x Ring Cushion Grooves",
      "1x Mangalsutra / Pendant Recessed Holder",
      "1x Debossed 24k Gold Foil Initials Die Lid"
    ]
  },

  // 4. Botanical Preserved Floral Varmala Gift
  {
    id: "botanical-varmala-frame",
    slug: "botanical-varmala-frame",
    title: "Botanical Preserved Floral Varmala Gift",
    category: "preserved-varmala",
    subCategory: "preserved-varmala",
    categoryLabel: "Preservation Craft",
    price: 3899,
    originalPrice: 4999,
    rating: 5.0,
    reviewCount: 62,
    badge: "Preservation Craft",
    craft: "Preserved Botanical Resin",
    recipient: "Parents of the Couple",
    ceremony: "Wedding Day Ceremony",
    timeline: "Customized Bridal Suite (10+ Days)",
    inStock: true,
    image: "/assets/cdn/img_66de0b9faae5.jpg",
    gallery: [
      "/assets/cdn/img_66de0b9faae5.jpg"
    ],
    shortDescription: "3D brass float shadowbox framing eternal varmala garland petals & customized etched wedding date plaque.",
    description: "Preserve your actual wedding varmala or jaimala florals forever. Our Hyderabad preservation lab treats the petals with archival dehydrating compounds and casts them in UV-resistant crystal glass with a brushed brass border.",
    editions: [
      { name: "10x12 Glass Float Shadowbox", price: 3899, dotColors: ["#c5a880", "#ffffff"] },
      { name: "12x16 Imperial Brass Frame", price: 4899, dotColors: ["#725b38", "#d4af37"] }
    ],
    inclusions: [
      "1x Archival UV-Filter Double Glass Shadowbox Frame",
      "Free Insured Flower Collection Kit dispatched to your wedding venue",
      "1x Custom Laser Etched Brass Date & Initials Plaque",
      "Certificate of 25-Year Flower Preservation Guarantee"
    ]
  },

  // 5. Pure Mulberry Silk Robe Suite
  {
    id: "mulberry-silk-robes",
    slug: "mulberry-silk-robes",
    title: "Pure Mulberry Silk \"Bride\" & \"Groom\" Robe Suite",
    category: "robes-silk",
    subCategory: "bridal-groom-gifts",
    categoryLabel: "100% Pure Silk",
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    reviewCount: 54,
    badge: "100% Pure Silk",
    craft: "Initials Raw Silk & Velvet",
    recipient: "Bridal Party & Bridesmaids",
    ceremony: "Proposal & Engagement",
    timeline: "Priority Express (48h)",
    inStock: true,
    image: "/assets/cdn/img_2884b072ea2d.jpg",
    gallery: [
      "/assets/cdn/img_2884b072ea2d.jpg"
    ],
    shortDescription: "Metallic gold embroidered bridal robes tailored with personalized royal wedding initials.",
    description: "22 Momme organic mulberry silk robe embroidered on the back with 'Bride' or personalized wedding initials. Hand-cut and sewn with French seams for luxurious morning prep photography.",
    editions: [
      { name: "Champagne Ivory & Metallic Gold", price: 2499, dotColors: ["#faf8f5", "#c5a880"] },
      { name: "Blush Pink & Rose Gold", price: 2499, dotColors: ["#f4d6d6", "#b76e79"] }
    ],
    inclusions: [
      "1x Pure Mulberry Silk Kimono Robe with Belt",
      "Custom Metallic Gold Embroidery on Back & Chest Crest",
      "1x Satin Initials Travel Dustbag"
    ]
  },

  // 6. Custom Carved Teakwood Guestbook Box
  {
    id: "carved-teakwood-guestbook",
    slug: "carved-teakwood-guestbook",
    title: "Custom Carved Teakwood Guestbook Box",
    category: "guestbook-wood",
    subCategory: "milestone-keepsakes",
    categoryLabel: "Heirloom Timber",
    price: 2799,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 89,
    badge: "Heirloom Timber",
    craft: "Hand-Polished Brass & Timber",
    recipient: "Wedding Guests & Favors",
    ceremony: "Reception & Honeymoon",
    timeline: "Standard Collection (4-7 Days)",
    inStock: true,
    image: "/assets/cdn/img_d620cfc22c54.jpg",
    gallery: [
      "/assets/cdn/img_d620cfc22c54.jpg"
    ],
    shortDescription: "Solid plantation teak with engraved family crest, antique brass latch & 100 gold foiled cards.",
    description: "Crafted from seasoned Nilgiri teakwood, hand-rubbed with natural organic oils and fitted with vintage brass hinges. Comes with 100 gold foil-edged guest advice cards and a matching engraved wooden ballpoint pen.",
    editions: [
      { name: "Rich Dark Teakwood", price: 2799, dotColors: ["#4a2c11", "#c5a880"] },
      { name: "Natural Honey Oak", price: 2799, dotColors: ["#a16207", "#fef08a"] }
    ],
    inclusions: [
      "1x Carved Solid Teak Gift Box with Antique Latch",
      "100x Gold Foil Edged Linen Guest Wish Cards",
      "1x Engraved Teakwood Pen",
      "Custom Engraved Names & Wedding Crest on Lid"
    ]
  },

  // 7. First Dance Soundwave Acrylic Lamp
  {
    id: "soundwave-acrylic-lamp",
    slug: "soundwave-acrylic-lamp",
    title: "First Dance Soundwave Acrylic Lamp",
    category: "acrylic-plaques",
    subCategory: "milestone-keepsakes",
    categoryLabel: "First Dance",
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 110,
    badge: "First Dance",
    secondaryBadge: "Scannable",
    craft: "Scannable Audio Acrylic",
    recipient: "For Bride & Groom",
    ceremony: "Sangeet & Cocktail Favors",
    timeline: "Priority Express (48h)",
    inStock: true,
    image: "/assets/cdn/img_bf928b3f49c8.jpg",
    gallery: [
      "/assets/cdn/img_bf928b3f49c8.jpg"
    ],
    shortDescription: "Solid warm beechwood base with illuminated custom scannable couple song code & waveform.",
    description: "Capture the melody of your first dance forever. High-grade optic cast acrylic with precision laser-etched song waveforms and a scannable Spotify code set inside a warm LED beechwood plinth.",
    editions: [
      { name: "Warm White Luminous Beechwood", price: 1499, dotColors: ["#e5c193", "#ffffff"] },
      { name: "RGB Multi-Tone Walnut Base", price: 1799, dotColors: ["#4a2c11", "#fedeb2"] }
    ],
    inclusions: [
      "1x Optical Cast Acrylic Plaque with Laser Etch",
      "1x Solid Beechwood LED Base with USB Cord & Switch",
      "1x Scannable Music Code Integration"
    ]
  },

  // 8. Personalized Crystal Toasting Flutes
  {
    id: "crystal-toasting-flutes",
    slug: "crystal-toasting-flutes",
    title: "Personalized Crystal Toasting Flutes (Set of 2)",
    category: "barware-flutes",
    subCategory: "bridal-groom-gifts",
    categoryLabel: "Lead-Free Crystal",
    price: 2199,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 68,
    badge: "Lead-Free Crystal",
    craft: "Hand-Polished Brass & Timber",
    recipient: "Groomsmen & Best Man",
    ceremony: "Reception & Honeymoon",
    timeline: "Standard Collection (4-7 Days)",
    inStock: true,
    image: "/assets/cdn/img_e8a81b7ba032.jpg",
    gallery: [
      "/assets/cdn/img_e8a81b7ba032.jpg"
    ],
    shortDescription: "Hand-blown lead-free Bohemian crystal etched with couple names & wedding reception year.",
    description: "Two exquisite Bohemian crystal flutes featuring delicate micro-diamond cuts that catch the golden candlelight. Hand-etched with couple calligraphy initials and wedding reception date.",
    editions: [
      { name: "Bohemian Diamond Flute Pair", price: 2199, dotColors: ["#ffffff", "#c5a880"] }
    ],
    inclusions: [
      "2x Hand-Blown Crystal Champagne Flutes",
      "Custom Micro-Etching of Couple Names & Date",
      "1x Satin Padded Silk Presentation Case"
    ]
  },

  // 9. Groom's Watch & Cufflink Walnut Casing
  {
    id: "groom-watch-casing",
    slug: "groom-watch-casing",
    title: "Groom's Watch & Cufflink Walnut Casing",
    category: "groom-accessories",
    subCategory: "bridal-groom-gifts",
    categoryLabel: "Groom's Casket",
    price: 2699,
    originalPrice: 3399,
    rating: 5.0,
    reviewCount: 47,
    badge: "Groom's Casket",
    craft: "Hand-Polished Brass & Timber",
    recipient: "Groomsmen & Best Man",
    ceremony: "Wedding Day Ceremony",
    timeline: "Priority Express (48h)",
    inStock: true,
    image: "/assets/cdn/img_431dcd1dae90.jpg",
    gallery: [
      "/assets/cdn/img_431dcd1dae90.jpg"
    ],
    shortDescription: "Hand-rubbed solid walnut wood with laser-etched initials brass plate & emerald velvet interior.",
    description: "A masculine heirloom casket created from dark hand-rubbed walnut timber. Features a solid brushed brass initials badge and deep emerald green velvet cushion slots for timepiece and cufflinks.",
    editions: [
      { name: "American Walnut & Emerald Velvet", price: 2699, dotColors: ["#2b1810", "#1b4332"] },
      { name: "Black Ash & Midnight Navy Velvet", price: 2699, dotColors: ["#1c1b1b", "#1e293b"] }
    ],
    inclusions: [
      "1x Solid Walnut Dual Compartment Casket",
      "1x Watch Cushion & 2x Cufflink Grooves",
      "1x Laser-Etched Solid Brass Initials Plate"
    ]
  },

  // 10. Luxury Wedding Essentials Celebration Trunk
  {
    id: "luxury-trousseau-trunk",
    slug: "luxury-trousseau-trunk",
    aliases: ["grand-heritage-trousseau-trunk"],
    title: "Luxury Wedding Essentials Celebration Trunk",
    category: "trousseau-suites",
    subCategory: "trousseau-vaults",
    categoryLabel: "Bridal Wedding Essentials",
    price: 4499,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 83,
    badge: "Bridal Wedding Essentials",
    craft: "Initials Raw Silk & Velvet",
    recipient: "For Bride & Groom",
    ceremony: "Wedding Day Ceremony",
    timeline: "Customized Bridal Suite (10+ Days)",
    inStock: true,
    image: "/assets/cdn/img_95aba8728a9a.jpg",
    gallery: [
      "/assets/cdn/img_95aba8728a9a.jpg"
    ],
    shortDescription: "Pastel blush pink & ivory handcrafted trunk with brass lock and custom embossed leather tag.",
    description: "The quintessential Indian bridal wedding essentials trunk. Hand-covered in premium textured ivory vegan leather, embellished with brushed gold corner guards, antique latches, and an embossed couple initials leather tag.",
    editions: [
      { name: "Blush Ivory & Gilded Brass", price: 4499, dotColors: ["#faf8f5", "#d4af37"] },
      { name: "Sage Mint & Antique Gold", price: 4499, dotColors: ["#84a98c", "#c5a880"] }
    ],
    inclusions: [
      "1x Large Heirloom Bridal Wedding Essentials Trunk (18x12x8 in)",
      "1x Embossed Couple Initial Leather Bag Tag",
      "1x Brass Key & Working Vintage Padlock",
      "Interior Satin Saree & Jewelry Straps"
    ]
  },

  // 11. Botanical Soy Candle Favors (Pack of 20)
  {
    id: "botanical-candle-favors",
    slug: "botanical-candle-favors",
    title: "Botanical Soy Candle Favors (Pack of 20)",
    category: "wedding-favors",
    subCategory: "wedding-favors",
    categoryLabel: "Bulk Favors",
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 142,
    badge: "Bulk Favors (20x)",
    secondaryBadge: "Sangeet / Mehendi",
    craft: "Gilded Wax Seal & Deckle Edge",
    recipient: "Wedding Guests & Favors",
    ceremony: "Haldi & Mehendi",
    timeline: "Standard Collection (4-7 Days)",
    inStock: true,
    image: "/assets/cdn/img_a561313a01f9.jpg",
    gallery: [
      "/assets/cdn/img_a561313a01f9.jpg"
    ],
    shortDescription: "Customized couple initials label, wax-sealed lid with delicate dry botanicals and amber musk scent.",
    description: "Hand-poured 100% organic soy candles in frosted glass vessels, infused with amber musk, jasmine petals, and 24k gold flakes. Sealed with customized metallic wax stamps with the couple's initials.",
    editions: [
      { name: "Pack of 20 - Amber Jasmine", price: 3999, dotColors: ["#fef08a", "#c5a880"] },
      { name: "Pack of 50 - Extended Favor Suite", price: 8999, dotColors: ["#c5a880", "#725b38"] }
    ],
    inclusions: [
      "20x Frosted Glass 60g Soy Candles",
      "Custom Couple Initials Label & Ribbon",
      "Hand-Stamped Botanical Wax Seal Lid"
    ]
  },

  // 12. Personalized Marble & Brass Platter
  {
    id: "marble-brass-platter",
    slug: "marble-brass-platter",
    title: "Personalized Marble & Brass Platter",
    category: "platters-serveware",
    subCategory: "milestone-keepsakes",
    categoryLabel: "Makrana Marble",
    price: 2899,
    originalPrice: 3799,
    rating: 4.8,
    reviewCount: 39,
    badge: "Makrana Marble",
    craft: "Hand-Polished Brass & Timber",
    recipient: "Parents of the Couple",
    ceremony: "Proposal & Engagement",
    timeline: "Standard Collection (4-7 Days)",
    inStock: true,
    image: "/assets/cdn/img_2d8aae8907bb.jpg",
    gallery: [
      "/assets/cdn/img_2d8aae8907bb.jpg"
    ],
    shortDescription: "Pure Makrana marble with brushed champagne brass handles & custom engraved initials crest.",
    description: "Sourced from pristine Makrana marble beds in Rajasthan, each heavy slab is polished to a satin sheen and flanked with solid sculptural champagne brass handles. Center engraved with the wedding crest.",
    editions: [
      { name: "Makrana White & Champagne Brass", price: 2899, dotColors: ["#ffffff", "#c5a880"] }
    ],
    inclusions: [
      "1x Pure Solid Makrana Marble Platter (14x8 in)",
      "2x Hand-Cast Champagne Brass Sculpted Handles",
      "Laser Deep Etched Royal Wedding Crest",
      "Velvet Padded Protective Base Bottom"
    ]
  },
  {
    id: "acrylic-song-plaque",
    slug: "acrylic-song-plaque",
    aliases: ["aura-acrylic-melody"],
    title: "Aura Acrylic Melody & First Dance Plaque",
    category: "acrylic-plaques",
    subCategory: "milestone-keepsakes",
    categoryLabel: "Acrylic Plaques",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 312,
    badge: "Trending",
    craft: "High-Clarify Scannable Acrylic",
    recipient: "For Bride & Groom",
    ceremony: "Sangeet & Cocktail Favors",
    timeline: "Priority Express (48h)",
    inStock: true,
    image: "/assets/cdn/img_679ede3f1033.jpg",
    shortDescription: "Ultra-clear cast acrylic with scannable Spotify/Apple Music waveform on a warm beechwood LED luminous base.",
    editions: [
      { name: "Warm White LED Wooden Base", price: 1899, dotColors: ["#e5c193", "#FAF8F5"] }
    ]
  },
  {
    id: "leather-passport-suite",
    slug: "leather-passport-suite",
    title: "Tuscan Leather Travel & Passport Suite",
    category: "leather-travel",
    subCategory: "bridal-groom-gifts",
    categoryLabel: "Leather Travel",
    price: 2299,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 96,
    badge: "Collection Certified",
    craft: "Deep Blind Debossing",
    recipient: "For Bride & Groom",
    ceremony: "Reception & Honeymoon",
    timeline: "Standard Collection (4-7 Days)",
    inStock: true,
    image: "/assets/cdn/img_48ec5e0e21c9.jpg",
    shortDescription: "Twin passport covers & engraved luggage tags debossed with the couple's new shared initials in 24k gold foil.",
    editions: [
      { name: "Caramel Tan & Gold Foil", price: 2299, dotColors: ["#c5a880", "#281800"] }
    ]
  },

  // 16. Personalized Memory Photo Frame (Stitch Card 1)
  {
    id: "personalized-memory-frame",
    slug: "personalized-memory-frame",
    title: "Personalized Memory Photo Frame",
    category: "photo-frames",
    subCategory: "milestone-keepsakes",
    categoryLabel: "Photo Frames",
    price: 999,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 104,
    badge: "BESTSELLER",
    deliveryBadge: "⚡ Dispatch in 24h",
    techniqueTag: "Custom Photo & Date",
    craft: "Precision Laser Engraved",
    recipient: "Couple",
    occasion: "Wedding & Reception",
    timeline: "⚡ Express 24-Hour Dispatch",
    inStock: true,
    image: "/assets/cdn/img_34983dcdc6ec.jpg",
    gallery: [
      "/assets/cdn/img_34983dcdc6ec.jpg"
    ],
    shortDescription: "Exquisite rustic wooden wedding photo frame with engraved couple names, wedding date, and HD archival mount print.",
    description: "Solid textured pine wood carved with couple names, wedding ceremony date, and archival matte photograph print.",
    editions: [
      { name: "Rustic Pine & Gold Engraving", price: 999, dotColors: ["#d8c3b2", "#c5a880"] }
    ],
    inclusions: [
      "1x Solid Pine Engraved Photo Frame (8x10 in)",
      "1x High-Resolution Archival Photo Print & Mount",
      "Protective Glass Face & Desktop Easel Stand"
    ]
  },

  // 17. Custom Name Velvet Jewelry Box (Stitch Card 2)
  {
    id: "custom-velvet-jewelry-box",
    slug: "custom-velvet-jewelry-box",
    title: "Custom Name Velvet Jewelry Box",
    category: "velvet-boxes",
    subCategory: "trousseau-vaults",
    categoryLabel: "Initials Velvet",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 211,
    badge: "TRENDING",
    deliveryBadge: "Free Gift Box",
    techniqueTag: "Gold Foil Initials",
    craft: "Gold Foil Stamping",
    recipient: "For Her",
    occasion: "Engagement & Roka",
    timeline: "Standard Artisanal (2–3 Days)",
    inStock: true,
    image: "/assets/cdn/img_33cf2cd4d15e.jpg",
    gallery: [
      "/assets/cdn/img_33cf2cd4d15e.jpg"
    ],
    shortDescription: "Plush velvet jewelry box with personalized golden initials on lid, multi-tier compartments, and satin lining.",
    description: "Handcrafted plush velvet jewelry box tailored with hot-stamped gold foil initials initials.",
    editions: [
      { name: "Dusty Rose Velvet & Gold Initials", price: 1899, dotColors: ["#f4d6d6", "#c5a880"] },
      { name: "Emerald Green Velvet & Brass Crest", price: 1999, dotColors: ["#1b4332", "#c5a880"] }
    ],
    inclusions: [
      "1x Initials Plush Velvet Casket",
      "Custom 24k Gold Foil Name / Initial Stamping",
      "1x Complimentary Luxury Gift Box & Ribbon"
    ]
  },

  // 18. Customized Leather Travel Set (Stitch Card 3)
  {
    id: "bespoke-leather-travel-set",
    slug: "bespoke-leather-travel-set",
    title: "Customized Leather Travel Set",
    category: "leather-travel",
    subCategory: "bridal-groom-gifts",
    categoryLabel: "Leather Travel",
    price: 1699,
    originalPrice: 2299,
    rating: 4.9,
    reviewCount: 88,
    badge: "NEW",
    deliveryBadge: "⚡ Dispatch in 24h",
    techniqueTag: "Debossed Initials",
    craft: "Blind Debossing",
    recipient: "Couple",
    occasion: "Wedding & Reception",
    timeline: "⚡ Express 24-Hour Dispatch",
    inStock: true,
    image: "/assets/cdn/img_1502db7547cc.jpg",
    gallery: [
      "/assets/cdn/img_1502db7547cc.jpg"
    ],
    shortDescription: "Customized personalized leather travel passport holder and luggage tag set with gold embossed initials.",
    description: "Premium full-grain tan Italian leather passport holder and matching luggage tag, deeply blind debossed with customized initials.",
    editions: [
      { name: "Cognac Tan & Gold Foil", price: 1699, dotColors: ["#c5a880", "#281800"] }
    ],
    inclusions: [
      "1x Full-Grain Leather Passport Sleeve",
      "1x Matching Leather Luggage Tag with Brass Buckle",
      "Complimentary Initials Hot Stamping"
    ]
  },

  // 19. Acrylic Song Plaque with LED Base (Stitch Card 4)
  {
    id: "led-acrylic-song-plaque",
    slug: "led-acrylic-song-plaque",
    title: "Acrylic Song Plaque with LED Base",
    category: "acrylic-plaques",
    subCategory: "milestone-keepsakes",
    categoryLabel: "Acrylic Plaques",
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 156,
    badge: "LOVED BY COUPLES",
    deliveryBadge: "Warm LED Light",
    techniqueTag: "Scannable Audio & Photo",
    craft: "Scannable Acrylic Waveform",
    recipient: "Couple",
    occasion: "Anniversary Milestones",
    timeline: "Standard Artisanal (2–3 Days)",
    inStock: true,
    image: "/assets/cdn/img_a1f082165df6.jpg",
    gallery: [
      "/assets/cdn/img_a1f082165df6.jpg"
    ],
    shortDescription: "Luxury personalized acrylic song plaque with warm wooden LED base on soft velvet fabric.",
    description: "Cast optic acrylic laser-etched with couple photo, anniversary song title, scannable Spotify code, and solid beechwood base with warm LED illumination.",
    editions: [
      { name: "Warm White Luminous Beechwood", price: 1499, dotColors: ["#e5c193", "#FAF8F5"] }
    ],
    inclusions: [
      "1x Optical Cast Acrylic Plaque (8x6 in)",
      "1x Solid Natural Beechwood LED Base with USB Cord",
      "Scannable Audio Code Integration"
    ]
  },

  // 20. Gentleman's Timepiece & Leather Set (Stitch Card 5)
  {
    id: "gentleman-timepiece-set",
    slug: "gentleman-timepiece-set",
    title: "Gentleman's Timepiece & Leather Set",
    category: "gift-sets",
    subCategory: "bridal-groom-gifts",
    categoryLabel: "Gifts For Him",
    price: 2799,
    originalPrice: 3600,
    rating: 4.8,
    reviewCount: 76,
    badge: "GIFT SET",
    deliveryBadge: "Custom Engraved",
    techniqueTag: "Custom Watch Back & Wallet",
    craft: "Precision Laser Engraved",
    recipient: "For Him",
    occasion: "Wedding & Reception",
    timeline: "Standard Artisanal (2–3 Days)",
    inStock: true,
    image: "/assets/cdn/img_c5db76be9930.jpg",
    gallery: [
      "/assets/cdn/img_c5db76be9930.jpg"
    ],
    shortDescription: "Minimalist elegant gift set for him with luxury leather wallet, personalized watch, and cologne in luxury box.",
    description: "The premier gift set for groom, groomsmen, or best man. Includes a classic quartz watch with laser-engraved caseback, full-grain bifold wallet with initials, and artisanal eau de parfum.",
    editions: [
      { name: "Tan Leather & Matte Black Watch", price: 2799, dotColors: ["#c5a880", "#1c1b1b"] }
    ],
    inclusions: [
      "1x Quartz Timepiece with Custom Laser-Engraved Back",
      "1x Initials Full-Grain Leather Wallet",
      "1x 30ml Artisanal Groom Eau De Parfum",
      "1x Luxury Presentation Gift Box"
    ]
  },

  // 21. Grand Anniversary Hamper (Stitch Card 6)
  {
    id: "grand-anniversary-hamper",
    slug: "grand-anniversary-hamper",
    title: "Grand Anniversary Hamper",
    category: "hampers",
    subCategory: "milestone-keepsakes",
    categoryLabel: "Luxury Hampers",
    price: 4999,
    originalPrice: 6500,
    rating: 5.0,
    reviewCount: 92,
    badge: "LUXURY COLLECTION",
    deliveryBadge: "Curated Crate",
    techniqueTag: "Handcrafted Wooden Crate",
    craft: "Gold Foil Stamping",
    recipient: "Parents",
    occasion: "Anniversary Milestones",
    timeline: "Customized Initials Suite (5–7 Days)",
    inStock: true,
    image: "/assets/cdn/img_2fad27216119.jpg",
    gallery: [
      "/assets/cdn/img_2fad27216119.jpg"
    ],
    shortDescription: "Heartfelt luxury gift hamper for parents or couple anniversary with engraved wooden frame, gourmet treats, and tea set.",
    description: "A grand wooden crate filled with celebratory heirlooms: a customized wooden picture frame, handcrafted artisanal tea selection, golden brass tea strainer, organic raw honey jar, and soy candle.",
    editions: [
      { name: "Imperial Celebration Crate", price: 4999, dotColors: ["#d8c3b2", "#c5a880"] }
    ],
    inclusions: [
      "1x Large Solid Pine Gift Crate with Sliding Lid",
      "1x Custom Engraved Wooden Couple Frame (5x7 in)",
      "1x Royal Darjeeling Whole-Leaf Artisanal Tea Tin",
      "1x Hand-Hammered Brass Tea Strainer",
      "1x Hand-Poured Botanical Amber Candle"
    ]
  },

  // 22. Handcrafted Wooden Name Puzzle (Stitch Card 7)
  {
    id: "wooden-name-puzzle",
    slug: "wooden-name-puzzle",
    title: "Handcrafted Wooden Name Puzzle",
    category: "wooden-keepsakes",
    subCategory: "milestone-keepsakes",
    categoryLabel: "Wooden Gifts",
    price: 1299,
    originalPrice: 1799,
    rating: 4.9,
    reviewCount: 115,
    badge: "GIFT",
    deliveryBadge: "Baby & Nursery",
    techniqueTag: "Personalized Carved Name",
    craft: "Precision Laser Engraved",
    recipient: "Kids & Family",
    occasion: "Birthday & Celebration",
    timeline: "Standard Artisanal (2–3 Days)",
    inStock: true,
    image: "/assets/cdn/img_aecc39f1fd60.jpg",
    gallery: [
      "/assets/cdn/img_aecc39f1fd60.jpg"
    ],
    shortDescription: "Charming personalized gift gift for kids, custom wooden name puzzle, cute plush toy, engraved night light.",
    description: "Artisanal birchwood carved child name puzzle coated in non-toxic organic baby-safe beeswax polish. A treasured nursery gift for newborns and birthdays.",
    editions: [
      { name: "Pastel Rainbow Birchwood", price: 1299, dotColors: ["#fef08a", "#bae6fd"] },
      { name: "Natural Warm Oak Finish", price: 1299, dotColors: ["#d8c3b2", "#c5a880"] }
    ],
    inclusions: [
      "1x Custom Carved Birchwood Name Puzzle Board",
      "Individual 3D Hand-Sanded Letters",
      "Custom Engraved Birthday / Date Note on Back"
    ]
  },

  // 23. Aesthetic Celebration Gift Box (Stitch Card 8)
  {
    id: "aesthetic-celebration-box",
    slug: "aesthetic-celebration-box",
    title: "Aesthetic Celebration Gift Box",
    category: "wedding-favors",
    subCategory: "wedding-favors",
    categoryLabel: "Curated Favors",
    price: 1299,
    originalPrice: 1599,
    rating: 4.7,
    reviewCount: 72,
    badge: "CURATED",
    deliveryBadge: "Wax Sealed",
    techniqueTag: "Wax-Sealed Message Card",
    craft: "Gold Foil Stamping",
    recipient: "Bridesmaids",
    occasion: "Wedding & Reception",
    timeline: "⚡ Express 24-Hour Dispatch",
    inStock: true,
    image: "/assets/cdn/img_4d35c34779cb.jpg",
    gallery: [
      "/assets/cdn/img_4d35c34779cb.jpg"
    ],
    shortDescription: "Aesthetic luxury celebration gift box with wrapped silk ribbons, wax seal stamped greeting card, champagne flutes, and treats.",
    description: "Gift presentation with pure habotai silk ribbons, botanical stamped wax seal card, dried bunny tails bouquet, and Belgian chocolate confections.",
    editions: [
      { name: "Warm Neutral Linen Edition", price: 1299, dotColors: ["#faf8f5", "#c5a880"] }
    ],
    inclusions: [
      "1x Luxury Rigid Linen Gift Box with Magnetic Clasp",
      "1x Wax-Sealed Calligraphy Note Card",
      "1x Mini Dried Pampas & Bunny Tail Boutonnière",
      "1x Gourmet Artisanal Belgian Chocolate Box"
    ]
  }
];

export const COUPONS = [
  {
    code: "ASRAFIRST",
    title: "Welcome to ASRA Collection",
    discountPercent: 15,
    minOrder: 1499,
    description: "Flat 15% discount across all custom framed vows, personalized engraved wooden boxes, and bridesmaids gift sets.",
    validity: "Min Order: ₹1,499 • One-time use per guest"
  },
  {
    code: "HDFCWED1500",
    title: "HDFC Bank Wedding Grandeur",
    discountAmount: 1500,
    minOrder: 7999,
    description: "Flat ₹1,500 off on personalized bridal hampers & wedding essentials suites above ₹7,999 with HDFC Bank Credit & Debit Cards.",
    validity: "Min cart value ₹7,999"
  },
  {
    code: "CREDCELEBRATE",
    title: "CRED Instant Cashback Privilege",
    discountPercent: 10,
    maxDiscount: 500,
    minOrder: 1999,
    description: "Instant 10% cashback up to ₹500 via CRED UPI & CRED Pay.",
    validity: "Min cart value ₹1,999"
  },
  {
    code: "ICICIASRA",
    title: "ICICI Bank Instant Discount",
    discountPercent: 10,
    maxDiscount: 1000,
    minOrder: 3999,
    description: "10% instant discount up to ₹1,000 on ICICI Credit Card swipe and EMI.",
    validity: "Min cart value ₹3,999"
  },
  {
    code: "SBIFESTIVE",
    title: "SBI Card Festive EMI Privilege",
    discountAmount: 750,
    minOrder: 5000,
    description: "Flat ₹750 off on 3M & 6M No Cost EMI tenures on customized wedding essentials orders.",
    validity: "Min cart value ₹5,000"
  },
  {
    code: "AXISLUXE",
    title: "Axis Bank Neo & Burgundy Privilege",
    discountPercent: 12,
    maxDiscount: 1200,
    minOrder: 4499,
    description: "Flat 12% off up to ₹1,200 for Axis Bank Neo, Magnus & Burgundy Credit Cards.",
    validity: "Min cart value ₹4,499"
  },
  {
    code: "KOTAKGIFT",
    title: "Kotak Mahindra Bank Instant Discount",
    discountAmount: 500,
    minOrder: 2999,
    description: "Flat ₹500 instant discount on Kotak Debit Cards across floral and scent gifts.",
    validity: "Min cart value ₹2,999"
  },
  {
    code: "AMEXROYAL",
    title: "American Express Royal Privilege",
    discountPercent: 15,
    minOrder: 9999,
    description: "15% off + complimentary 50ml customized oud perfume for Platinum & Centurion cardholders.",
    validity: "Min cart value ₹9,999"
  },
  {
    code: "ZEROEMI",
    title: "Zero-Cost Wedding EMI Support",
    discountAmount: 350,
    minOrder: 5000,
    description: "Split in 3 or 6 months no-cost EMI with zero processing fees.",
    validity: "Orders above ₹5,000"
  },
  {
    code: "MOBIASRA",
    title: "MobiKwik ZIP Pay Later",
    discountAmount: 250,
    minOrder: 1999,
    description: "Flat ₹250 wallet credit or pay in 3 interest-free installments.",
    validity: "Min cart value ₹1,999"
  },
  {
    code: "WEDBLISS",
    title: "Bride & Groom Suite Special",
    discountAmount: 800,
    minOrder: 4999,
    description: "Flat ₹800 off on luxury wicker hampers, robes, and celebratory wedding essentials packages.",
    validity: "Min cart value ₹4,999"
  },
  {
    code: "BIGLOVE",
    title: "Celebratory Bulk Favor Sets",
    discountPercent: 20,
    minOrder: 5999,
    description: "Flat 20% privilege on 10+ identical personalized gifts or return gift boxes.",
    validity: "Min cart value ₹5,999 (10+ units)"
  },
  {
    code: "UPILUXE",
    title: "Instant UPI Cashback",
    discountPercent: 5,
    minOrder: 1999,
    description: "Instant 5% discount on all pre-paid UPI checkouts.",
    validity: "All orders above ₹1,999"
  }
];

export const BULK_TIERS = [
  {
    tier: "Tier 01",
    range: "25 - 75 Units",
    title: "Intimate & Bridal Party",
    description: "Perfect for bridal entourages, rehearsal dinners, and close family wedding essentials favors.",
    discount: "15%",
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
    privilegeLabel: "Collection Privilege",
    value: "76-200",
    perks: [
      "Free 24k foil deboss dies",
      "Color palette matching",
      "Complimentary physical master sample"
    ]
  },
  {
    tier: "Tier 03",
    range: "201 - 500 Units",
    title: "Grand Wedding Welcome Kits",
    description: "Complete guest room arrival hampers and multi-day itinerary boxes.",
    discount: "30%",
    privilegeLabel: "Collection Privilege",
    popular: true,
    value: "201-500",
    perks: [
      "Dedicated logistics coordinator",
      "Custom fabric lining selection",
      "Multi-city split dispatch option"
    ]
  },
  {
    tier: "Tier 04",
    range: "500+ Units",
    title: "Royal & Destination Affairs",
    description: "Monumental celebrations requiring complete turn-key gifting logistics.",
    discount: "35%",
    privilegeLabel: "Collection Privilege",
    value: "500+",
    perks: [
      "On-site white-glove staging team",
      "Master calligrapher live room-inserts",
      "Air-cargo climate guarantee"
    ]
  }
];

export const BULK_SIGNATURE_FAVORS = [
  {
    id: "mulberry-silk-robe-suite",
    name: "Mulberry Silk Robe & Stole Suite",
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
    description: "Full-grain vegetable-tanned leather cases debossed with custom couple initials and coordinates.",
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
    description: "Hand-poured Oud, Kashmir Rose, and Neroli soy wax housed in reusable antique brass containers.",
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
    description: "Plush crushed velvet cases with compartmentalized ring cushions and gilded initials plates.",
    minUnits: 40,
    tag: "Gift",
    price: 1420,
    originalPrice: 2200,
    leadTime: "7-10 Days",
    image: "/assets/cdn/img_1c14c263eba4.jpg"
  },
  {
    id: "deckle-edge-gold-leaf-itinerary-suite",
    name: "Deckle-Edge Gold Leaf Itinerary Suite",
    description: "100% recycled cotton rag invitations, room key card envelopes, and multi-day itinerary folios.",
    minUnits: 50,
    tag: "Stationery",
    price: 480,
    originalPrice: 850,
    leadTime: "4-6 Days",
    image: "/assets/cdn/img_f55e30e798ed.jpg"
  },
  {
    id: "teakwood-brass-inlay-mithai-trunk",
    name: "Teakwood & Brass Inlay Mithai Trunk",
    description: "Hand-carved seasoned teakwood box with 24k gold leaf lining, custom seal, and airtight brass compartments.",
    minUnits: 30,
    tag: "Classic",
    price: 2450,
    originalPrice: 3800,
    leadTime: "10-14 Days",
    image: "/assets/cdn/img_221249766bc9.jpg"
  }
];

export const BULK_CASE_STUDIES = [
  {
    id: "udaipur-leela-palace",
    locationTag: "Udaipur Destination",
    unitsBadge: "350 Initials Welcome Kits",
    title: "The Leela Palace Royal Affair",
    quote: "Every single guest walked into their room at The Leela Palace to find our customized gold-embossed gift trunk filled with handcrafted botanical perfumes and silk stoles. The ASRA logistics team coordinated directly with hotel support seamlessly.",
    couple: "Sagil Doza & Shagufta Naaz",
    subInfo: "Wedding at Udaipur • November 2024",
    initials: "SS"
  },
  {
    id: "goa-w-hotel",
    locationTag: "Goa Coastal Vows",
    unitsBadge: "180 Botanical Favor Sets",
    title: "Sunset Vows at W Goa",
    quote: "We wanted something light, tactile, and coastal. The customized Italian leather tags with our personalized date and compass emblem along with the deckle-edge itineraries set the tone for the entire 3-day weekend celebration.",
    couple: "Jawed Ali & Asra Ansari",
    subInfo: "Wedding at Vagator, Goa • January 2025",
    initials: "JA"
  }
];

export const VERIFIED_REVIEWS = [
  {
    author: "Asra & Sk Shahnawaz Ali",
    location: "Udaipur Palace Wedding",
    rating: 5,
    date: "February 2026",
    text: "The Sovereign Wedding Essentials Suite exceeded every dream. The gold debossing was crisp, and unboxing our wedding vows on cotton rag was the highlight of our morning prep!",
    verified: true
  },
  {
    author: "Shagufta & Sagil D.",
    location: "Destination Goa",
    rating: 5,
    date: "January 2026",
    text: "We ordered 120 custom luggage tags for our destination guests. Every single guest complimented the leather quality and custom brass foil initials.",
    verified: true
  },
  {
    author: "Miss Sultana Begum",
    location: "Mumbai Collection Client",
    rating: 5,
    date: "March 2026",
    text: "The 3D CAD proof arrived in my WhatsApp in 4 hours, and the actual product was even more breathtaking. Truly a luxury standard in Indian bridal gifting.",
    verified: true
  }
];
