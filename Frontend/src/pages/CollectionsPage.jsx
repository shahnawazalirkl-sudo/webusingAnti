import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const COLLECTIONS_DATA = [
  {
    id: 'royal-trousseau-vaults',
    title: 'The Royal Wedding Essentials & Ring Vaults',
    tag: 'Wedding Essentials Vaults',
    count: '14 Masterpieces',
    description: 'Rich plush velvet, hand-gilded brass filigree corners, double-tier engagement ring nests, and mangalsutra presentation vaults.',
    price: '₹2,890',
    image: '/assets/cdn/img_56d7a2ebc8ba.jpg',
    imageAlt: 'Emerald green and ivory royal velvet jewelry ring box with 24k brass accents',
    category: 'Bridal & Wedding Essentials Series',
    additionalCategories: ['Velvet & Gilded Leather', 'Royal Classic Suite'],
    link: '/product/velvet-ring-vault'
  },
  {
    id: 'archival-varmala-flora',
    title: 'Archival Varmala & Botanical Flora',
    tag: 'Floral Preservation',
    count: '9 Masterpieces',
    description: 'Preserved ceremony garland shadowboxes, crystal-clear archival resin gift blocks, and custom pressed bouquet frames.',
    price: '₹4,200',
    image: '/assets/cdn/img_ecfddff03b93.jpg',
    imageAlt: 'Preserved varmala wedding garland in solid oak glass shadowbox',
    category: 'Botanical & Floral Preservation',
    additionalCategories: [],
    link: '/product/botanical-varmala-frame'
  },
  {
    id: 'monogrammed-leather-travel',
    title: 'Initials Leather & Travel',
    tag: 'Honeymoon & Travel',
    count: '16 Masterpieces',
    description: 'Full-grain Italian saddle leather passport folios, brass-buckled luggage tags, and matching his-and-hers honeymoon vow folios.',
    price: '₹2,150',
    image: '/assets/cdn/img_68d52a0350ad.jpg',
    imageAlt: 'Italian caramel tan leather passport cases and gold debossed luggage tags',
    category: 'Velvet & Gilded Leather',
    additionalCategories: ['Bridal & Wedding Essentials Series'],
    link: '/product/leather-passport-suite'
  },
  {
    id: 'deckle-edge-stationery',
    title: 'Deckle Edge & Wax-Sealed Stationery',
    tag: 'Heirloom Paper',
    count: '21 Masterpieces',
    description: '100% Cotton rag paper crafted on historic deckles, 24k hand-applied leaf edges, and heirloom brass crest seals.',
    price: '₹1,750',
    image: '/assets/cdn/img_a9cc139c9496.jpg',
    imageAlt: 'Deckle edge cotton paper wedding invitation suite with wax seal stamp',
    category: 'Royal Classic Suite',
    additionalCategories: ['Bridal & Wedding Essentials Series'],
    link: '/product/deckle-vow-books'
  },
  {
    id: 'celestial-first-dance',
    title: 'Celestial First Dance & Acoustic Art',
    tag: 'Acoustic Gifts',
    count: '11 Masterpieces',
    description: 'Optical-grade scannable Spotify soundwave acrylic lamps, precision laser-etched beechwood LED bases, and song plaques.',
    price: '₹1,999',
    image: '/assets/cdn/img_448c691fa5fa.jpg',
    imageAlt: 'Custom engraved acrylic soundwave night lamp with beechwood base',
    category: 'Celestial Acrylic & Soundwave',
    additionalCategories: [],
    link: '/product/soundwave-acrylic-lamp'
  },
  {
    id: 'carved-teakwood-timber',
    title: 'Hand-Carved Teakwood & Timber',
    tag: 'Teakwood Classic',
    count: '15 Masterpieces',
    description: 'Sustainable plantation teak memory trunks, personalized guestbook slabs, vintage brass latches, and wooden vow folios.',
    price: '₹3,450',
    image: '/assets/cdn/img_ca45083b52f7.jpg',
    imageAlt: 'Solid teakwood wedding memory trunk with brass latch',
    category: 'The Heirloom Woodcraft',
    additionalCategories: [],
    link: '/product/carved-teakwood-guestbook'
  },
  {
    id: 'gilded-crystal-barware',
    title: 'Gilded Crystal & Barware Toasting',
    tag: 'Crystal Barware',
    count: '8 Masterpieces',
    description: 'Lead-free European crystal flutes, whiskey decanters with laser-initials heraldic crests, and polished gold stirrers.',
    price: '₹3,800',
    image: '/assets/cdn/img_9b63d57745a9.jpg',
    imageAlt: 'Lead-free European crystal champagne flutes and decanter set',
    category: 'Royal Classic Suite',
    additionalCategories: [],
    link: '/product/crystal-toasting-flutes'
  },
  {
    id: 'destination-favors',
    title: 'Destination Haldi & Mehendi Favors',
    tag: 'Celebration Favors',
    count: '24 Masterpieces',
    description: 'Customized embroidered zardozi potlis, botanical amber candle jars in volume, customized sweets boxes, and guest welcome tags.',
    price: '₹450 / unit',
    image: '/assets/cdn/img_5e389cf38222.jpg',
    imageAlt: 'Vibrant luxury Indian destination wedding favors and raw silk potlis',
    category: 'Destination Wedding Favors',
    additionalCategories: ['Bridal & Wedding Essentials Series'],
    link: '/wedding-gifts'
  }
];

const CATEGORIES = [
  'All Collections',
  'Bridal & Wedding Essentials Series',
  'The Heirloom Woodcraft',
  'Botanical & Floral Preservation',
  'Velvet & Gilded Leather',
  'Celestial Acrylic & Soundwave',
  'Destination Wedding Favors',
  'Royal Classic Suite'
];

const CATEGORY_SLUG_MAP = {
  'all': 'All Collections',
  'all-collections': 'All Collections',
  'bridal-trousseau': 'Bridal & Wedding Essentials Series',
  'bridal-trousseau-series': 'Bridal & Wedding Essentials Series',
  'bridal-wedding essentials': 'Bridal & Wedding Essentials Series',
  'bridal-wedding essentials-series': 'Bridal & Wedding Essentials Series',
  'heirloom-woodcraft': 'The Heirloom Woodcraft',
  'the-heirloom-woodcraft': 'The Heirloom Woodcraft',
  'floral-preservation': 'Botanical & Floral Preservation',
  'botanical-floral-preservation': 'Botanical & Floral Preservation',
  'velvet-leather': 'Velvet & Gilded Leather',
  'velvet-gilded-leather': 'Velvet & Gilded Leather',
  'celestial-acrylic': 'Celestial Acrylic & Soundwave',
  'celestial-acrylic-soundwave': 'Celestial Acrylic & Soundwave',
  'destination-favors': 'Destination Wedding Favors',
  'destination-wedding-favors': 'Destination Wedding Favors',
  'royal-heritage': 'Royal Classic Suite',
  'royal-heritage-suite': 'Royal Classic Suite',
  'royal-classic': 'Royal Classic Suite',
  'royal-classic-suite': 'Royal Classic Suite',
};

const resolveCategory = (param) => {
  if (!param) return 'All Collections';
  const lower = param.toLowerCase().trim();
  if (CATEGORY_SLUG_MAP[lower]) return CATEGORY_SLUG_MAP[lower];
  const matched = CATEGORIES.find(c => c.toLowerCase() === lower);
  if (matched) return matched;
  return 'All Collections';
};

const CollectionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const productsSectionRef = useRef(null);

  const initialCat = resolveCategory(searchParams.get('category') || searchParams.get('cat'));
  const [selectedCategory, setSelectedCategory] = useState(initialCat);

  // Sync category from URL params and scroll directly to products
  useEffect(() => {
    const rawParam = searchParams.get('category') || searchParams.get('cat');
    const targetCategory = resolveCategory(rawParam);
    setSelectedCategory(targetCategory);

    const hasCategoryOrAnchor = (rawParam && targetCategory !== 'All Collections') || location.hash === '#products';
    if (hasCategoryOrAnchor && productsSectionRef.current) {
      setTimeout(() => {
        if (productsSectionRef.current) {
          const headerOffset = 120;
          const elementPosition = productsSectionRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 70);
    }
  }, [searchParams, location.hash]);
  const { showToast } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Support Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    guests: '',
    eventDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Thank you! An ASRA Support Consultant will reach out within 24 hours with your custom lookbook.');
      setFormData({
        fullName: '',
        phone: '',
        guests: '',
        eventDate: ''
      });
    }, 600);
  };

  // Filter items based on selected category
  const filteredCollections = selectedCategory === 'All Collections'
    ? COLLECTIONS_DATA
    : COLLECTIONS_DATA.filter(item => 
        item.category === selectedCategory || 
        item.additionalCategories?.includes(selectedCategory)
      );

  const isSovereignBookmarked = isWishlisted('sovereign-bridal-suite');

  const handleBookmarkSovereign = () => {
    toggleWishlist('sovereign-bridal-suite');
    showToast(
      isSovereignBookmarked 
        ? 'Removed The Sovereign Suite from your Wishlist' 
        : 'Saved The Sovereign Suite to your Wishlist'
    );
  };

  return (
    <div className="w-full bg-surface min-h-screen text-on-surface">
      <div className="flex flex-col w-full">
        {/* Subtle Ambient Glow Element */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Breadcrumb & Editorial Header */}
          <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-outline mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-outline-variant">/</span>
              <span className="text-outline">Collections</span>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-semibold">Signature Collections</span>
            </nav>

            {/* Headline Block & Key Collection Metrics */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-outline-variant/30">
              <div className="max-w-2xl">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2">
                  Collection Editions 2026
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-3">
                  Curated Signature Collections
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Explore masterfully curated wedding suites, gift vaults, bridal party tributes, and commemorative luxury hampers tailored by theme and celebration.
                </p>
              </div>

              {/* Collection Metric Pills */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-xs border border-outline-variant/30">
                  <span className="font-serif text-2xl text-primary font-bold">8</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-outline leading-tight font-semibold">Curated</span>
                    <span className="text-xs text-on-surface font-semibold leading-tight">Series</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-xs border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[22px]">workspace_premium</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-outline leading-tight font-semibold">100% Handcrafted</span>
                    <span className="text-xs text-on-surface font-semibold leading-tight">Artisanal Finish</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-xs border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[22px]">auto_stories</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-outline leading-tight font-semibold">Workshop</span>
                    <span className="text-xs text-on-surface font-semibold leading-tight">Custom Studio</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Bar / Quick Category Chips */}
          <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="collections-tab-bar">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                const label = category === 'All Collections' ? `All Collections (${COLLECTIONS_DATA.length})` : category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      const slug = Object.keys(CATEGORY_SLUG_MAP).find(k => CATEGORY_SLUG_MAP[k] === category);
                      if (category === 'All Collections') {
                        setSearchParams({});
                      } else {
                        setSearchParams({ category: slug || category });
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-xs font-semibold'
                        : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Top Featured Spotlight Banner: The Sovereign Bridal & Wedding Essentials Suite */}
          <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
            <div className="relative rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs overflow-hidden flex flex-col lg:flex-row items-stretch">
              {/* Left Visual Side with Official Hamper Asset */}
              <div className="lg:w-7/12 relative min-h-[340px] sm:min-h-[400px] lg:min-h-[480px] bg-surface-container-low flex items-center justify-center overflow-hidden group">
                <img
                  src="/assets/cdn/img_eafddfa4ed3e.jpg"
                  alt="The Sovereign Bridal and Wedding Essentials Suite Luxury Hamper by ASRA Wedding Canvas"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent lg:hidden"></div>
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-[#FAF4EB] text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider rounded shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span>Featured Masterpiece</span>
                </div>
              </div>

              {/* Right Content Spec Sheet */}
              <div className="lg:w-5/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-surface-container-lowest relative z-10">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
                      Exclusive Bridal Collection
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF4EB] text-primary border border-primary/20">
                      18 Gifts Included
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mb-3">
                    The Sovereign Bridal &amp; Wedding Essentials Suite
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                    An opulent symphony of hand-embossed blush wedding essentials cases, artisanal Eau de Parfum, golden Ferrero confections, organic soy candle, silk scrunchie, and our signature ASRA golden ribbon insignia. Crafted specifically for unforgettable wedding essentials and morning-of-wedding reveals.
                  </p>

                  {/* Inclusions Bullet Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">diamond</span>
                      <span className="text-xs text-on-surface font-medium">24k Gilded Custom Initials</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">spa</span>
                      <span className="text-xs text-on-surface font-medium">Fresh Baby's Breath &amp; Roses</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">sentiment_satisfied</span>
                      <span className="text-xs text-on-surface font-medium">Handmade Heirloom Plush Bear</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">inventory_2</span>
                      <span className="text-xs text-on-surface font-medium">Debossed Hardbound Cylinder</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action & Valuation */}
                <div className="pt-4 bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-outline-variant/30">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-outline block">Curated Suite From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-lg text-on-surface">₹7,499</span>
                      <span className="line-through text-outline text-xs">₹9,800</span>
                      <span className="text-emerald-700 font-semibold text-xs">(23% OFF)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/product/sovereign-bridal-suite"
                      className="flex-1 sm:flex-initial px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Explore Collection</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleBookmarkSovereign}
                      className="w-8 h-8 rounded-full bg-white/90 border border-outline-variant/30 flex items-center justify-center shadow-xs transition-all duration-300 text-on-surface hover:text-primary cursor-pointer"
                      title={isSovereignBookmarked ? "Remove from Wishlist" : "Bookmark Suite"}
                      aria-label="Wishlist Bookmark"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] transition-colors ${
                          isSovereignBookmarked ? 'text-rose-600' : 'text-outline hover:text-primary'
                        }`}
                        style={{ fontVariationSettings: isSovereignBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8 Signature Collections Grid */}
          <section
            id="products"
            ref={productsSectionRef}
            className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 scroll-mt-32"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-1">
                  Collection Archive
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
                  Handcrafted Wedding Suites &amp; Themes
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
                Select any curated series to personalize with initial debossing, custom wax seal colors, and personalized vow typography.
              </p>
            </div>

            {/* Bento Grid / Card Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {filteredCollections.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="relative w-full aspect-[4/3] bg-surface-container-low overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-[#FAF4EB] text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider rounded shadow-xs">
                      {item.count}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface group-hover:text-primary transition-colors mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between border-t border-outline-variant/30">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-outline block">From</span>
                        <span className="font-bold text-sm text-on-surface">{item.price}</span>
                      </div>
                      <Link
                        to={item.link}
                        className="px-4 py-2 border border-outline-variant/50 text-on-surface rounded-lg text-xs font-semibold uppercase tracking-wider hover:border-primary hover:text-primary active:scale-[0.98] transition-all duration-300 flex items-center gap-1"
                      >
                        <span>Discover</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredCollections.length === 0 && (
              <div className="py-16 text-center bg-surface-container-low rounded-xl border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-4xl mb-2">search_off</span>
                <p className="font-serif text-base text-on-surface font-medium">No collections found for this category</p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All Collections')}
                  className="mt-3 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] transition-all duration-300"
                >
                  View All Collections
                </button>
              </div>
            )}
          </section>

          {/* Collection Curated Services Section: Custom Bundling & Privileges */}
          <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
            <div className="bg-surface-container-low rounded-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xs border border-outline-variant/30">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="lg:w-7/12">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2">
                    Customized Collection Privilege
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mb-3">
                    Custom Collection Bundling &amp; Private Consultation
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                    Dreaming of combining items across different collections? Whether curating 500 personalized destination welcome hampers for Udaipur or designing an exclusive customized bride-and-groom heirloom trunk, our dedicated wedding support crafts unified color suites, custom fonts, and private mockups.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-1">palette</span>
                      <h4 className="font-serif text-base font-medium text-on-surface">Hue Harmonization</h4>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Matching wax, silk ribbons, and leather to your wedding invitation palette.</p>
                    </div>

                    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-1">flight_takeoff</span>
                      <h4 className="font-serif text-base font-medium text-on-surface">Destination Dispatch</h4>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">White-glove bulk delivery coordinated straight to palace and resort suites.</p>
                    </div>

                    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-1">loyalty</span>
                      <h4 className="font-serif text-base font-medium text-on-surface">Family Seal</h4>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Vector stamp creation and customized 3D metal crest debossing plates.</p>
                    </div>
                  </div>
                </div>

                {/* Quick Consultation Form Card */}
                <div className="lg:w-5/12 w-full bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-xs border border-outline-variant/30">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface mb-1">
                    Book a Design Consultation Call
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    Receive a curated digital moodboard and wholesale pricing deck within 24 hours.
                  </p>
                  <form className="space-y-3" onSubmit={handleFormSubmit}>
                    <div>
                      <label htmlFor="support-name" className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1">
                        Your Full Name
                      </label>
                      <input
                        id="support-name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-xs px-3 py-2 rounded-lg border border-outline-variant/30 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
                        placeholder="e.g. Asra Ansari"
                        required
                        type="text"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="support-phone" className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          id="support-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-xs px-3 py-2 rounded-lg border border-outline-variant/30 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
                          placeholder="+91 96926 68263"
                          required
                          type="tel"
                        />
                      </div>
                      <div>
                        <label htmlFor="support-guests" className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1">
                          Expected Guests / Units
                        </label>
                        <input
                          id="support-guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleFormChange}
                          className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-xs px-3 py-2 rounded-lg border border-outline-variant/30 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
                          placeholder="50 - 500"
                          type="number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="support-date" className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1">
                        Target Wedding / Event Date
                      </label>
                      <input
                        id="support-date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleFormChange}
                        className="w-full bg-surface-container-low text-on-surface text-xs px-3 py-2 rounded-lg border border-outline-variant/30 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
                        type="date"
                      />
                    </div>

                    <button
                      className="w-full px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                          <span>Connecting Support...</span>
                        </>
                      ) : (
                        <span>Request Curated Proposal</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Highlights Banner */}
          <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-6 px-6 sm:px-8 bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/30 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30">
              <div className="flex items-center gap-3 pt-4 sm:pt-0">
                <div className="w-8 h-8 rounded-full bg-white/90 border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">handyman</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wider block">100% Customized Craft</span>
                  <span className="text-[11px] text-on-surface-variant">Custom dies &amp; real gold leaf</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-4">
                <div className="w-8 h-8 rounded-full bg-white/90 border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wider block">Insured Global Courier</span>
                  <span className="text-[11px] text-on-surface-variant">Doorstep transit protection</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-4">
                <div className="w-8 h-8 rounded-full bg-white/90 border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">redeem</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wider block">Wax-Sealed Luxury Box</span>
                  <span className="text-[11px] text-on-surface-variant">Complimentary presentation</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-4">
                <div className="w-8 h-8 rounded-full bg-white/90 border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wider block">Privilege Concierge</span>
                  <span className="text-[11px] text-on-surface-variant">Personal bridal stylist 24/7</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
