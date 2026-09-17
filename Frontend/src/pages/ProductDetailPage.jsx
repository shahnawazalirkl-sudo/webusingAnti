import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Official Stitch Assets for The Sovereign Bridal Suite
const SOVEREIGN_ASSETS = {
  hero: "/assets/cdn/img_eafddfa4ed3e.jpg",
  gallery: [
    {
      label: "Full Suite Bouquet",
      src: "/assets/cdn/img_71f820512472.jpg"
    },
    {
      label: "Initials Gift Box",
      src: "/assets/cdn/img_a1877a3f3271.jpg"
    },
    {
      label: "Eau De Parfum Set",
      src: "/assets/cdn/img_d65b352dc440.jpg"
    },
    {
      label: "Botanical Soy Candle",
      src: "/assets/cdn/img_631d4661320f.jpg"
    },
    {
      label: "Heirloom Bear Gift",
      src: "/assets/cdn/img_ae7a8c8ff5ea.jpg"
    },
    {
      label: "Unboxing Ceremony",
      src: "/assets/cdn/img_4b1d8e16eb70.jpg",
      isVideo: true
    }
  ],
  whatsInside: [
    {
      number: "01 / ARCHIVE",
      tag: "Custom Debossed",
      title: "Hardbound Initials Hatbox",
      desc: "Custom rigid 1200 GSM cardboard cylinder lined in soft blush velvet with couple's customized 3D initials die in 24k gold leaf.",
      image: "/assets/cdn/img_e7936d117a2b.jpg"
    },
    {
      number: "02 / FRAGRANCE",
      tag: "50ml French Glass",
      title: "Signature Collection Eau De Parfum",
      desc: "An intimate ceremonial blend of Kashmiri damask rose, golden vanilla, and precious white oud bottled in bevelled heavy crystal.",
      image: "/assets/cdn/img_45e05185aa02.jpg"
    },
    {
      number: "03 / AMBIENCE",
      tag: "40 Hours Burn",
      title: "Hand-Poured Botanical Candle",
      desc: "100% natural organic soy wax poured into an etched glass tumbler with engraved polished gold brass lid and cotton wooden wick.",
      image: "/assets/cdn/img_31355173f069.jpg"
    },
    {
      number: "04 / COLLECTION TEXTILE",
      tag: "22 Momme Silk",
      title: "Pure Mulberry Silk Scrunchie",
      desc: "Gentle on bridal tresses, crafted from Grade 6A natural mulberry silk in matching blush tone, complete with gold initials ribbon.",
      image: "/assets/cdn/img_29a4dd5a6c4c.jpg"
    },
    {
      number: "05 / GIFT",
      tag: "Hand-Stitched",
      title: "Heirloom Mini Plush Bear",
      desc: "Ultra-soft ivory gift bear clasping an embroidered linen heart badge emblazoned with couple's initials and wedding crest.",
      image: "/assets/cdn/img_4ec8faf44746.jpg"
    },
    {
      number: "06 / CONFECTION",
      tag: "Italian Imported",
      title: "Ferrero Rocher Diamond Box",
      desc: "Crisp hazelnut pralines cushioned amid fresh preserved Gypsophila (Baby's Breath) and Ecuadorian long-stem blush roses.",
      image: "/assets/cdn/img_0e43f0974572.jpg"
    }
  ],
  story: {
    artisanCalligraphy: "/assets/cdn/img_216c13ecf363.jpg",
    bridalSuitePresentation: "/assets/cdn/img_931c900ef6fc.jpg"
  },
  reviews: [
    {
      stars: 5,
      location: "Udaipur Palace Wedding",
      quote: "“The moment my bridal party walked into the suite and saw this hamper bouquet waiting on the console, tears were shed. The gold debossed initials was flawless!”",
      couple: "Shagufta & Sagil",
      venue: "The Oberoi Udaivilas • Nov 2025",
      avatar: "/assets/cdn/img_d41de6fba989.jpg"
    },
    {
      stars: 5,
      location: "Goa Beachside Nuptials",
      quote: "“The candle fragrance permeated our entire bridal dressing villa for three days straight. The unboxing wax seal felt like opening a royal decree.”",
      couple: "Miss Sultana Begum",
      venue: "Taj Exotica Resort, Goa • Jan 2026",
      avatar: "/assets/cdn/img_421050e505fc.jpg"
    },
    {
      stars: 5,
      location: "Jaipur Classic Manor",
      quote: "“We ordered 12 custom editions for our bridal wedding essentials and mothers of the bride. Every single recipient commented on the sublime calligraphy and silk ribbons.”",
      couple: "Jawed & Asra",
      venue: "Rambagh Palace • Feb 2026",
      avatar: "/assets/cdn/img_6a38528f397b.jpg"
    }
  ],
  faqs: [
    {
      q: "Can I customize or swap individual items inside the hamper suite?",
      a: "Yes. Our bridal support team works directly with couples to substitute fragrances, replace confections with vegan alternatives, or incorporate custom jewelry boxes. Simply connect via the WhatsApp support button above or mention your request in your order notes."
    },
    {
      q: "How long does personalized production and gold debossing take?",
      a: "Custom initials are engraved and foil-stamped within 24 to 48 hours in our Hyderabad & Bengaluru flagships. Express delivery ensures transit within 2-3 business days across all metro cities in India."
    },
    {
      q: "Are the fresh florals and chocolate confections protected against transit heat?",
      a: "Absolutely. Each bouquet is shipped in a custom dual-chamber thermal insulating carton equipped with food-grade gel ice packs and moisture retaining hydro-capsules for every rose stem, ensuring freshness for up to 96 hours of transit."
    },
    {
      q: "Do you provide previews of the calligraphy card before it is written?",
      a: "Yes, our master calligrapher will share a digital mock-up and gold wax seal design on WhatsApp for your formal sign-off prior to final ink application."
    }
  ],
  crossSells: [
    {
      id: "deckle-vow-books",
      category: "Stationery",
      title: "Deckle Edge Vow Books (Set of 2)",
      price: 1299,
      image: "/assets/cdn/img_6678acd4af80.jpg"
    },
    {
      id: "velvet-ring-vault",
      category: "Gift",
      title: "Customized Velvet Double Ring Vault",
      price: 1899,
      image: "/assets/cdn/img_7332059f2511.jpg"
    },
    {
      id: "mulberry-silk-robes",
      category: "Bridal Wear",
      title: "Initials Mulberry Silk Robe",
      price: 2499,
      image: "/assets/cdn/img_3b4dda08e341.jpg"
    },
    {
      id: "carved-teakwood-guestbook",
      category: "Registry",
      title: "Custom Carved Teakwood Guestbook",
      price: 2799,
      image: "/assets/cdn/img_02f8097f6484.jpg"
    }
  ]
};

const PALETTE_EDITIONS = [
  {
    name: 'Classic Blush & Champagne Gold',
    label: 'Classic Blush',
    price: 7499,
    colors: ['#f4d6d6', '#c5a880'],
    galleryIndex: 0
  },
  {
    name: 'Royal Ivory & 24k Gilded Emerald',
    label: 'Royal Ivory & Emerald',
    price: 8299,
    colors: ['#faf8f5', '#1b4332'],
    galleryIndex: 1
  },
  {
    name: 'Monochrome Noir & Rose Gold',
    label: 'Monochrome Noir',
    price: 8999,
    colors: ['#1c1b1b', '#b76e79'],
    galleryIndex: 2
  }
];

const SCENT_PROFILES = [
  { id: 'kashmiri-rose', name: 'Kashmiri Rose', note: 'Bestseller • Amber Base' },
  { id: 'neroli-blossom', name: 'Neroli Blossom', note: 'Citrus • White Oud' },
  { id: 'mysore-sandalwood', name: 'Mysore Sandalwood', note: 'Wild Jasmine Accord' }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find product or fallback to Sovereign Suite (Flagship)
  const product = PRODUCTS.find(p => 
    p.id === id || 
    p.slug === id || 
    (p.aliases && p.aliases.includes(id))
  ) || PRODUCTS[0];

  const isWishlisted = isInWishlist(product.id);

  // Gallery & Presentation State
  const [activeImage, setActiveImage] = useState(SOVEREIGN_ASSETS.hero);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Customizer State
  const [selectedEdition, setSelectedEdition] = useState(PALETTE_EDITIONS[0]);
  const [brideName, setBrideName] = useState('Asra');
  const [groomName, setGroomName] = useState('Shahnawaz');
  const [weddingDate, setWeddingDate] = useState('2026-11-18');
  const [crestStyle, setCrestStyle] = useState('classic'); // 'classic', 'artdeco', 'modern'
  const [cardInscription, setCardInscription] = useState('Beautiful People Make Beautiful Memories');
  const [calligraphyHand, setCalligraphyHand] = useState('Royal Copperplate Script');
  const [selectedScent, setSelectedScent] = useState('Kashmiri Rose');
  const [pincode, setPincode] = useState('500034');
  const [pincodeStatus, setPincodeStatus] = useState({
    checked: true,
    valid: true,
    message: 'Jubilee Hills / Hyderabad: Same-day VIP white-glove chauffeur delivery available on order booking.'
  });
  const [orderQty, setOrderQty] = useState(1);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Synchronize state when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(SOVEREIGN_ASSETS.hero);
    setActiveThumbIndex(0);
  }, [id]);

  // Handle Thumbnail Selection
  const handleSelectThumbnail = (thumb, index) => {
    setActiveThumbIndex(index);
    if (thumb.isVideo) {
      setIsVideoModalOpen(true);
    } else {
      setActiveImage(thumb.src);
    }
  };

  // Handle Palette Edition Switch
  const handleSelectEdition = (edition) => {
    setSelectedEdition(edition);
    if (SOVEREIGN_ASSETS.gallery[edition.galleryIndex]) {
      setActiveImage(SOVEREIGN_ASSETS.gallery[edition.galleryIndex].src);
      setActiveThumbIndex(edition.galleryIndex);
    }
  };

  // Live Initials Display
  const brideInitial = brideName.trim() ? brideName.trim()[0].toUpperCase() : 'A';
  const groomInitial = groomName.trim() ? groomName.trim()[0].toUpperCase() : 'R';
  const initialsDisplay = `${brideInitial} & ${groomInitial}`;

  const getMonogramTypographyStyle = () => {
    switch (crestStyle) {
      case 'artdeco':
        return {
          fontClass: 'font-sans font-black tracking-tight text-secondary',
          label: 'Intertwined Geometric Die Cast in Champagne Gold'
        };
      case 'modern':
        return {
          fontClass: 'font-sans font-medium tracking-[0.25em] text-primary',
          label: 'Modern Minimalist Architectural Serif Die'
        };
      case 'classic':
      default:
        return {
          fontClass: 'font-serif font-bold tracking-wider text-primary',
          label: 'Handcrafted in 24k Gold Foil Stamp on Blush Velvet'
        };
    }
  };

  const currentMonogramStyle = getMonogramTypographyStyle();

  // Pincode Verification
  const handleCheckPincode = () => {
    const trimmed = pincode.trim();
    if (trimmed.length === 6 && /^\d+$/.test(trimmed)) {
      if (trimmed.startsWith('500')) {
        setPincodeStatus({
          checked: true,
          valid: true,
          message: `Pincode ${trimmed} (Hyderabad & Secunderabad): Same-day VIP white-glove chauffeur delivery available.`
        });
      } else if (trimmed.startsWith('560')) {
        setPincodeStatus({
          checked: true,
          valid: true,
          message: `Pincode ${trimmed} (Bengaluru Flagship Hub): Same-day VIP delivery available upon completion.`
        });
      } else {
        setPincodeStatus({
          checked: true,
          valid: true,
          message: `Pincode ${trimmed} verified: Express insured fragrance & confectionery transit arrives in 48-72 hrs.`
        });
      }
    } else {
      setPincodeStatus({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit postal code.'
      });
    }
  };

  // Add to Bag Handlers
  const handleAddToCart = () => {
    addToCart(product, {
      price: selectedEdition.price,
      quantity: orderQty,
      image: activeImage,
      edition: selectedEdition.name,
      brideName,
      groomName,
      weddingDate,
      crestStyle: crestStyle === 'classic' ? 'Classic Floral Crest' : crestStyle === 'artdeco' ? 'Art Deco Intertwined' : 'Modern Minimalist Serif',
      cardInscription,
      calligraphyScript: calligraphyHand,
      scentChoice: selectedScent,
      pincode
    });
  };

  const handleAddCrossSell = (item) => {
    const foundProduct = PRODUCTS.find(p => p.id === item.id) || {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image
    };
    addToCart(foundProduct, {
      price: item.price,
      quantity: 1,
      image: item.image,
      edition: 'Signature Companion Edition'
    });
  };

  const totalPrice = selectedEdition.price * orderQty;

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface antialiased">
      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="w-full bg-surface-container-low px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-on-surface-variant overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-outline-variant font-serif">/</span>
          <Link to="/collections" className="hover:text-primary transition-colors">Wedding</Link>
          <span className="text-outline-variant font-serif">/</span>
          <Link to="/shop?category=bridal-hampers" className="hover:text-primary transition-colors">Customized Bridal Suites</Link>
          <span className="text-outline-variant font-serif">/</span>
          <span className="text-on-surface font-semibold truncate">The Sovereign Bridal &amp; Wedding Essentials Suite</span>
        </div>
      </nav>

      {/* Main Product Section (Two Column Masterpiece Layout) */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Collection Media Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4 lg:sticky lg:top-28">
            
            {/* Main Spotlight Frame */}
            <div className="relative w-full aspect-[4/5] bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs group border border-outline-variant/30">
              <img
                id="mainProductImage"
                src={activeImage}
                alt="The Sovereign Bridal & Wedding Essentials Suite"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Collection Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                <span className="bg-inverse-surface/90 backdrop-blur-md text-secondary-fixed text-label-sm font-label-sm uppercase tracking-widest px-3 py-1.5 rounded shadow-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary-fixed">diamond</span>
                  Flagship Masterpiece
                </span>
                <span className="bg-primary-container text-on-primary-container text-label-sm font-label-sm uppercase tracking-widest px-3 py-1 rounded shadow-sm">
                  Handcrafted On Order
                </span>
              </div>

              {/* Interactive Magnifier Cue */}
              <div className="absolute bottom-4 right-4 bg-surface/85 backdrop-blur-md text-on-surface text-label-sm font-label-sm uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm pointer-events-none">
                <span className="material-symbols-outlined text-[16px] text-primary">zoom_in</span>
                <span>Hover to Inspect Craft</span>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {SOVEREIGN_ASSETS.gallery.map((thumb, idx) => {
                const isActive = activeThumbIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectThumbnail(thumb, idx)}
                    className={`gallery-thumb relative aspect-square bg-surface-container rounded-lg overflow-hidden transition-all ${
                      isActive 
                        ? 'ring-2 ring-primary opacity-100 shadow-sm' 
                        : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-primary/40'
                    }`}
                    title={thumb.label}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.label}
                      className={`w-full h-full object-cover ${thumb.isVideo ? 'brightness-75' : ''}`}
                    />
                    {thumb.isVideo && (
                      <span className="material-symbols-outlined absolute inset-0 m-auto flex items-center justify-center text-[22px] text-primary-fixed drop-shadow-md">
                        play_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Collection Trust Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 py-space-sm bg-surface-container-low rounded-xl px-space-md border border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0">storefront</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase">Flagship Stores</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Hyderabad &amp; Bengaluru</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0">ac_unit</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase">Climate Transit</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Protected Confectionery</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase">100% Assurance</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Safe Transit Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customized Customizer & Details */}
          <div className="lg:col-span-6 flex flex-col gap-space-lg">
            
            {/* Title & Identification */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary font-semibold">
                  COLLECTIONS • 2026 BRIDAL EDITION • SKU: ASRA-SOV-019
                </span>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm uppercase"
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] transition-colors ${
                      isWishlisted ? 'text-rose-600' : ''
                    }`}
                    style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface leading-[1.18] tracking-tight font-normal">
                The Sovereign Bridal &amp; Wedding Essentials Suite
              </h1>

              {/* Rating & Activity Meter */}
              <div className="flex flex-wrap items-center gap-3 pt-1 pb-2">
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-bold text-on-surface">4.9</span>
                  <span className="text-on-surface-variant font-sans text-xs">(184 Verified Couples &amp; Brides)</span>
                </div>
                <span className="text-outline-variant hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5 text-primary font-sans text-[11px] font-semibold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] animate-pulse">local_fire_department</span>
                  <span>28 Collections Inquired Today</span>
                </div>
              </div>
            </div>

            {/* Price Panel & Privileges */}
            <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-xs flex flex-col gap-2 border border-outline-variant/30">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-on-surface">
                  ₹{selectedEdition.price.toLocaleString('en-IN')}
                </span>
                <span className="font-sans text-base text-outline line-through">
                  ₹9,800
                </span>
                <span className="px-2.5 py-1 bg-[#FAF4EB] text-primary border border-primary/20 rounded-md text-[10px] font-bold tracking-wider uppercase font-sans">
                  SAVE {Math.round(((9800 - selectedEdition.price) / 9800) * 100)}% (₹{(9800 - selectedEdition.price).toLocaleString('en-IN')} OFF)
                </span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Inclusive of all taxes, complimentary 24k gold leaf calligraphy card, and custom bronze initials wax stamp.
              </p>
              <div className="mt-2 pt-2 bg-[#FAF4EB] px-3.5 py-2 rounded-lg flex items-center justify-between border border-primary/20">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px]">workspace_premium</span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-wide">
                    Earn 750 Collection Privilege Points + Free Insured Express Delivery
                  </span>
                </div>
                <span className="material-symbols-outlined text-primary text-[16px] cursor-help" title="Privilege rewards earned on every custom commission">
                  help_outline
                </span>
              </div>
            </div>

            {/* Customized Customizer Form */}
            <div className="flex flex-col gap-space-lg">
              
              {/* 1. Select Suite Palette Edition */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-title-sm text-title-sm text-on-surface font-semibold uppercase tracking-wider">
                    1. Select Hamper Suite Palette Edition
                  </label>
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    {selectedEdition.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  {PALETTE_EDITIONS.map((edition) => {
                    const isSelected = selectedEdition.name === edition.name;
                    return (
                      <button
                        key={edition.name}
                        type="button"
                        onClick={() => handleSelectEdition(edition)}
                        className={`edition-btn p-3 rounded-lg text-left shadow-sm transition-all border ${
                          isSelected
                            ? 'bg-surface-container-lowest ring-2 ring-primary border-transparent'
                            : 'bg-surface-container-low border-outline-variant/50 hover:bg-surface-container-lowest'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-4 h-4 rounded-full shadow-inner border border-black/10"
                            style={{ backgroundColor: edition.colors[0] }}
                          />
                          <span
                            className="w-4 h-4 rounded-full shadow-inner border border-black/10 -ml-2"
                            style={{ backgroundColor: edition.colors[1] }}
                          />
                        </div>
                        <div className="font-title-sm text-[13px] font-semibold text-on-surface leading-snug">
                          {edition.label}
                        </div>
                        <div className={`font-label-sm text-label-sm font-bold mt-1 ${isSelected ? 'text-primary' : 'text-outline'}`}>
                          ₹{edition.price.toLocaleString('en-IN')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Initials & Personalization Details */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/40">
                <div className="flex items-center justify-between">
                  <label className="font-title-sm text-title-sm text-on-surface font-semibold uppercase tracking-wider">
                    2. Couple's Initials &amp; Personalization
                  </label>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                    Complimentary
                  </span>
                </div>

                {/* Couple Names Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Bride's First Name
                    </span>
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      placeholder="e.g. Asra"
                      className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Groom's First Name
                    </span>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      placeholder="e.g. Shahnawaz"
                      className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                {/* Wedding Date & Crest Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md items-center">
                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Auspicious Wedding / Event Date
                    </span>
                    <input
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface border border-outline-variant/50 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Die Debossing Crest Style
                    </span>
                    <select
                      value={crestStyle}
                      onChange={(e) => setCrestStyle(e.target.value)}
                      className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface border border-outline-variant/50 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                    >
                      <option value="classic">Classic Floral Crest</option>
                      <option value="artdeco">Art Deco Intertwined</option>
                      <option value="modern">Modern Minimalist Serif</option>
                    </select>
                  </div>
                </div>

                {/* Live Initials Die Preview Box */}
                <div className="p-space-md bg-secondary-container/25 rounded-lg flex items-center justify-between border border-secondary-container/40">
                  <div className="flex items-center gap-space-md">
                    <div className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-primary text-xl tracking-wider transition-all duration-300 border border-outline-variant/40">
                      <span className={currentMonogramStyle.fontClass}>
                        {initialsDisplay}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                        Live Hatbox Deboss Preview
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {currentMonogramStyle.label}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-primary">verified</span>
                </div>
              </div>

              {/* 3. Custom Gift Card Inscription */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-title-sm text-title-sm text-on-surface font-semibold uppercase tracking-wider">
                    3. Custom Gift Card Inscription
                  </label>
                  <span className="font-label-sm text-label-sm text-outline">
                    {cardInscription.length} / 150
                  </span>
                </div>
                <textarea
                  rows={2}
                  maxLength={150}
                  value={cardInscription}
                  onChange={(e) => setCardInscription(e.target.value)}
                  placeholder="Enter custom message to be inscribed in gold calligraphy..."
                  className="w-full bg-surface-container-lowest p-space-md rounded-lg font-body-md text-body-md text-on-surface shadow-sm border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
                <div className="flex flex-wrap items-center gap-space-md pt-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Calligraphy Hand:
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer font-body-sm text-body-sm text-on-surface">
                    <input
                      type="radio"
                      name="calligraphyScript"
                      checked={calligraphyHand === 'Royal Copperplate Script'}
                      onChange={() => setCalligraphyHand('Royal Copperplate Script')}
                      className="accent-primary"
                    />
                    <span>Royal Copperplate Script</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-body-sm text-body-sm text-on-surface">
                    <input
                      type="radio"
                      name="calligraphyScript"
                      checked={calligraphyHand === 'Renaissance Cursive'}
                      onChange={() => setCalligraphyHand('Renaissance Cursive')}
                      className="accent-primary"
                    />
                    <span>Renaissance Cursive</span>
                  </label>
                </div>
              </div>

              {/* 4. Artisanal Fragrance Profile */}
              <div className="flex flex-col gap-2">
                <label className="font-title-sm text-title-sm text-on-surface font-semibold uppercase tracking-wider">
                  4. Scent Profile for Artisanal Candle &amp; Mist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SCENT_PROFILES.map((scent) => {
                    const isSelected = selectedScent === scent.name;
                    return (
                      <label
                        key={scent.id}
                        className={`p-3 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all border ${
                          isSelected
                            ? 'bg-surface-container-lowest ring-1 ring-primary border-transparent'
                            : 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container-lowest'
                        }`}
                      >
                        <input
                          type="radio"
                          name="scentChoice"
                          value={scent.name}
                          checked={isSelected}
                          onChange={() => setSelectedScent(scent.name)}
                          className="accent-primary"
                        />
                        <div className="flex flex-col">
                          <span className="font-title-sm text-[13px] font-semibold text-on-surface">
                            {scent.name}
                          </span>
                          <span className={`font-body-sm text-[11px] ${isSelected ? 'text-primary font-medium' : 'text-outline'}`}>
                            {scent.note}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 5. Delivery Pincode Checker */}
              <div className="flex flex-col gap-2">
                <label className="font-title-sm text-title-sm text-on-surface font-semibold uppercase tracking-wider">
                  5. Check Dispatch &amp; Hand-Delivery Schedule
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Delivery Pincode (e.g. 500034 / 110001)"
                    className="flex-1 bg-surface-container-lowest px-space-md py-2.5 rounded-lg shadow-sm font-body-sm text-body-sm text-on-surface border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleCheckPincode}
                    className="px-space-lg py-2.5 bg-inverse-surface text-inverse-on-surface rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-all"
                  >
                    Check
                  </button>
                </div>
                {pincodeStatus.checked && (
                  <div className={`flex items-center gap-2 font-body-sm text-body-sm pt-1 ${pincodeStatus.valid ? 'text-primary' : 'text-error'}`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {pincodeStatus.valid ? 'verified' : 'info'}
                    </span>
                    <span>{pincodeStatus.message}</span>
                  </div>
                )}
              </div>

              {/* Order Actions & CTAs */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between sm:justify-center bg-surface-container-lowest rounded-lg shadow-sm px-3 py-2 border border-outline-variant/50">
                    <button
                      type="button"
                      onClick={() => setOrderQty(Math.max(1, orderQty - 1))}
                      className="text-on-surface-variant hover:text-on-surface text-title-md font-bold px-2.5"
                    >
                      -
                    </button>
                    <span className="px-4 font-title-sm text-title-sm font-bold text-on-surface">
                      {orderQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOrderQty(orderQty + 1)}
                      className="text-on-surface-variant hover:text-on-surface text-title-md font-bold px-2.5"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary CTA */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-on-primary hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 py-3 px-5 rounded-lg shadow-xs flex items-center justify-center gap-2 group"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      shopping_bag
                    </span>
                    <span className="font-sans text-xs uppercase tracking-wider font-semibold">
                      PERSONALIZE &amp; ADD TO BAG • ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </button>
                </div>

                {/* Secondary Stylist Consultation Action */}
                <a
                  href="https://wa.me/919692668263?text=Inquiring%20about%20Sovereign%20Bridal%20Suite%20Customization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FAF4EB] hover:bg-[#f3e9da] text-primary py-2.5 px-4 rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all border border-primary/20"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                  <span className="font-sans text-xs uppercase tracking-wider font-semibold">
                    Consult Dedicated Stylist via WhatsApp
                  </span>
                </a>

                {/* Bulk Wedding Inquiry Callout */}
                <div className="text-center pt-1">
                  <Link
                    to="/bulk-orders"
                    className="font-sans text-xs text-primary hover:text-on-surface uppercase tracking-wider font-semibold transition-colors underline underline-offset-4"
                  >
                    Planning Destination Wedding Gifting? Enquire for Custom Bulk Collection →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section: What's Inside The Sovereign Suite (6-Item Visual Showcase) */}
      <section className="w-full bg-surface-container-low py-space-xl border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-margin">
          <div className="flex flex-col items-center text-center mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary font-bold">
              The Complete Wedding Essentials Ensemble
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-normal">
              What's Inside The Sovereign Suite
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-2">
              Six meticulously crafted heirloom elements harmonized into an opulent presentation, designed to be treasured for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {SOVEREIGN_ASSETS.whatsInside.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm group hover:shadow-md transition-all border border-outline-variant/30"
              >
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-surface-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary font-bold tracking-widest uppercase">
                      {item.number}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 font-medium">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: The Collection Craftsmanship Story (Split Editorial Layout) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-space-xl items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary font-bold">
              Artisanal Pedigree
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-snug font-normal">
              The Philosophy of Timeless Bridal Presentation
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              At ASRA Wedding Canvas, every Sovereign Suite is treated not merely as a gift parcel, but as a treasured ceremonial artifact. Sourced hours before dispatch, our fresh florals are bound in handmade deckle-edge paper and double-faced satin ribbons imported from Lyon.
            </p>

            <div className="flex flex-col gap-space-sm pt-2">
              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[22px] mt-0.5 shrink-0">draw</span>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                    24k Gold Foil Stamp Debossing
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Each initials die is individually cast for your ceremony, creating an enduring physical gift.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[22px] mt-0.5 shrink-0">spa</span>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                    Dawn-Harvested Floral Accents
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Premium Ecuadorian blush roses conditioned with stem hydration vials to ensure lasting vitality upon unboxing.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[22px] mt-0.5 shrink-0">local_shipping</span>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                    Chauffeured Transit Protocols
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Specially engineered shock-absorbent packaging guarantees every element arrives in flawless boutique stillness.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Story Mosaic */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-md">
              <img
                src={SOVEREIGN_ASSETS.story.artisanCalligraphy}
                alt="Artisan Calligraphy Hand"
                className="w-full aspect-[3/4] object-cover rounded-xl shadow-md border border-outline-variant/30"
                loading="lazy"
              />
              <div className="p-space-md bg-surface-container-low rounded-xl border border-outline-variant/30">
                <span className="font-headline-md text-headline-md font-bold text-primary block">
                  3,500+
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Destination weddings graced across Rajasthan, Goa, Italy, and Bali.
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-md sm:pt-space-lg">
              <div className="p-space-md bg-inverse-surface text-inverse-on-surface rounded-xl shadow-md">
                <span className="material-symbols-outlined text-primary-fixed text-[28px] mb-1">auto_awesome</span>
                <span className="font-headline-sm text-headline-sm block text-secondary-fixed">
                  Private Collection Custom Die
                </span>
                <span className="font-body-sm text-body-sm text-tertiary-fixed-dim mt-1 block">
                  Preserved and gifted to the couple in a velvet gift pouch.
                </span>
              </div>
              <img
                src={SOVEREIGN_ASSETS.story.bridalSuitePresentation}
                alt="Bridal Suite Presentation"
                className="w-full aspect-[3/4] object-cover rounded-xl shadow-md border border-outline-variant/30"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Section: Real Wedding Moments & Unboxing Reviews */}
      <section className="w-full bg-surface-container py-space-xl border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary font-bold">
                Bridal Testimonials
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-normal">
                Real Wedding Unboxing Moments
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
                Overheard from brides, bridesmaids, and wedding planners who entrusted ASRA with their most monumental milestones.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-space-md py-2 bg-surface-container-lowest rounded-full shadow-sm flex items-center gap-1.5 font-label-sm text-label-sm font-bold text-on-surface border border-outline-variant/30">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span>100% Verified Buyer Reviews</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {SOVEREIGN_ASSETS.reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/30"
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex text-secondary">
                      {[...Array(review.stars)].map((_, s) => (
                        <span key={s} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                    <span className="font-label-sm text-label-sm text-outline">{review.location}</span>
                  </div>
                  <p className="font-headline-sm text-[16px] text-on-surface italic font-normal leading-relaxed">
                    {review.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-space-md mt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg p-space-md rounded-b-xl border-t border-outline-variant/20">
                  <img
                    src={review.avatar}
                    alt={review.couple}
                    className="w-10 h-10 rounded-full object-cover border border-outline-variant/50"
                  />
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                      {review.couple}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      {review.venue}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Frequently Asked Questions (Interactive Accordion) */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-margin py-space-xl">
        <div className="flex flex-col items-center text-center mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary font-bold">
            Collection Inquiries
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-normal">
            Frequently Addressed Questions
          </h2>
        </div>

        <div className="flex flex-col gap-space-sm">
          {SOVEREIGN_ASSETS.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="faq-item bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full p-space-md flex items-center justify-between text-left font-title-sm text-title-sm font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary' : 'text-outline'
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-content px-space-md pb-space-md font-body-sm text-body-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-2 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section: Complete The Bridal Suite (Cross-Sell Collections) */}
      <section className="w-full bg-surface-container-low py-space-xl border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-margin">
          <div className="flex flex-col items-center text-center mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary font-bold">
              Curated Complements
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-normal">
              Complete The Bridal Suite
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
              Heirloom stationery and wedding essentials accents created to match your Sovereign Suite colorway.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {SOVEREIGN_ASSETS.crossSells.map((cross) => (
              <div
                key={cross.id}
                className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group border border-outline-variant/30 hover:shadow-md transition-all"
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-surface-container">
                    <img
                      src={cross.image}
                      alt={cross.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                      {cross.category}
                    </span>
                    <h4 className="font-title-sm text-title-sm font-semibold text-on-surface mt-0.5 line-clamp-1">
                      {cross.title}
                    </h4>
                    <span className="font-title-sm text-title-sm font-bold text-on-surface mt-1">
                      ₹{cross.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddCrossSell(cross)}
                  className="mt-space-md w-full bg-surface-container-high hover:bg-inverse-surface hover:text-inverse-on-surface text-on-surface font-label-sm text-label-sm uppercase tracking-wider py-2 rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                  <span>Add To Suite</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unboxing Ceremony Experience Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative bg-surface-container-lowest max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/40">
            {/* Modal Header */}
            <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">movie</span>
                <h3 className="font-serif text-base font-bold text-on-surface">
                  Unboxing Ceremony &amp; Bridal Presentation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Video Visualizer Container */}
            <div className="relative aspect-video w-full bg-inverse-surface flex items-center justify-center overflow-hidden">
              <img
                src={SOVEREIGN_ASSETS.gallery[5].src}
                alt="Unboxing preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-t from-inverse-surface via-inverse-surface/40 to-transparent">
                <div className="w-16 h-16 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-lg animate-pulse">
                  <span className="material-symbols-outlined text-[32px]">play_arrow</span>
                </div>
                <h4 className="font-serif text-lg text-inverse-on-surface font-semibold">
                  Collection Sovereign Unboxing Ritual
                </h4>
                <p className="font-body-sm text-xs text-tertiary-fixed-dim max-w-md">
                  Experience the ceremonial reveal of our custom debossed 24k gold initials hatbox, pure French fragrance mist, and preserved dawn florals.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-surface-container-low flex items-center justify-between">
              <span className="font-body-sm text-xs text-on-surface-variant">
                Every Sovereign Suite includes our signature gilded certificate &amp; wax seal envelope.
              </span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-1.5 bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
