import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const COLLECTIONS_DATA = [
  {
    id: 'royal-trousseau-vaults',
    title: 'The Royal Trousseau & Ring Vaults',
    tag: 'Trousseau Vaults',
    count: '14 Masterpieces',
    description: 'Rich plush velvet, hand-gilded brass filigree corners, double-tier engagement ring nests, and mangalsutra presentation vaults.',
    price: '₹2,890',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7vVekI7j0bO5B4sHGS-PkbJ3Vaoc1gknVrmxBviLmDJq7i8B7P9Fd6gpcRcy7nB9l89JnswYfk8hocSAYNlzJHzYDz6CPDRoTiIb5Ctt2TBEmVext_0vT54z5cAKRo9Jpmd2__xSBPWIbqVYGmAELwue5yfoeivzaFEBc2fg37qvM0I-FP5acMA_IJTZFTM3J2FF8WNrKIRD-pv3TljQvvLGlxkYsR_NcG1_STL8doR8dKiIYMo2uzg',
    imageAlt: 'Emerald green and ivory royal velvet jewelry ring box with 24k brass accents',
    category: 'Bridal & Trousseau Series',
    additionalCategories: ['Velvet & Gilded Leather', 'Royal Heritage Suite'],
    link: '/product/velvet-ring-vault'
  },
  {
    id: 'archival-varmala-flora',
    title: 'Archival Varmala & Botanical Flora',
    tag: 'Floral Preservation',
    count: '9 Masterpieces',
    description: 'Preserved ceremony garland shadowboxes, crystal-clear archival resin keepsake blocks, and custom pressed bouquet frames.',
    price: '₹4,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgsSYGkMU2Dze_u6NpUTHa4rEsgJOenA0Bc-K6-OYwzR4fHq22Of4D3XP91rciSVldzA91LqxD2BQnZfrZdzn6SFoUKSyhbnyb8fm7gpQqGvmFmYcfuwEzBNiTB_zGar9IclDJeKtu9AP8DQ8tyAh52NwleOF6hKXNjoBzJWFbQGOrxW5oCLNGfqZA7KuT-UQ_dXMpAeDGbmW1PBRSkg8ha2wxmsKrYWFeh_x6rBq7HTslRi3iGDSBYw',
    imageAlt: 'Preserved varmala wedding garland in solid oak glass shadowbox',
    category: 'Botanical & Floral Preservation',
    additionalCategories: [],
    link: '/product/botanical-varmala-frame'
  },
  {
    id: 'monogrammed-leather-travel',
    title: 'Monogrammed Leather & Travel',
    tag: 'Honeymoon & Travel',
    count: '16 Masterpieces',
    description: 'Full-grain Italian saddle leather passport folios, brass-buckled luggage tags, and matching his-and-hers honeymoon vow folios.',
    price: '₹2,150',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfXR0RijZUfh45UpgLQyhFgusPuH-wWaB0Mjuz_W9tkhs58CgNWmgWdVvgi3elUCfA-nihwKqni6rp_1jKxkfgmgWeXn4D2CsZ-8sUQT69xDY65dtb2Q59i9lDNfU0sm3fljzrJAZsY_7-W9fq2XrNsB5A0KENP_3psDLfypypk1ohovXsJgRZrtmN0uacEWva2uQ1sH9kwnhZg7AOT3LRXKjCbXaMycOlgCZRibgCLdCy1pWGFqOrcA',
    imageAlt: 'Italian caramel tan leather passport cases and gold debossed luggage tags',
    category: 'Velvet & Gilded Leather',
    additionalCategories: ['Bridal & Trousseau Series'],
    link: '/product/leather-passport-suite'
  },
  {
    id: 'deckle-edge-stationery',
    title: 'Deckle Edge & Wax-Sealed Stationery',
    tag: 'Heirloom Paper',
    count: '21 Masterpieces',
    description: '100% Cotton rag paper crafted on historic deckles, 24k hand-applied leaf edges, and heirloom brass crest seals.',
    price: '₹1,750',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAyLcg2HtHG2NG528v25qExhOCOyhqpwIQ1NKqapyBknxQu_JKVi5nhzoAi41nAndX0SZCuxZAFpOCwQa_u-MVFf9GFEGsZKveZwnEO1NlZ-2LgCpwSWBc4WWj4PMaIQnbIp4a9UE5adReV5aATv_GaMp3uwhBnf4MXf53oEyiSVMYlDpNk3NVyiacGpTRwNylQg44VGHkfonmvjbwUzVXRqVDcVR8IQvuhGpYNkxl-lAKuZJN332mTg',
    imageAlt: 'Deckle edge cotton paper wedding invitation suite with wax seal stamp',
    category: 'Royal Heritage Suite',
    additionalCategories: ['Bridal & Trousseau Series'],
    link: '/product/deckle-vow-books'
  },
  {
    id: 'celestial-first-dance',
    title: 'Celestial First Dance & Acoustic Art',
    tag: 'Acoustic Keepsakes',
    count: '11 Masterpieces',
    description: 'Optical-grade scannable Spotify soundwave acrylic lamps, precision laser-etched beechwood LED bases, and song plaques.',
    price: '₹1,999',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPrqlkBPIAkX1Xo3Sk87FeRnUXn5N9kd2E4E-wjwqGD1qpBMmpO6JyiTvjZrHcdnohIke_Q7_1M4arwF3K_y7tG2kQOH1n4Sz-vcRqLOD1R2WwKSmPBnQt-EWFqOE5IVOh_UPQgX27U8ZKJ1d5xADnBBXoBrS-xKznhrcSytZGb-kas7e18Mq30TH7x8Lljh2TnG8FzO0jJcDLq75x7kHqBMyopsDoxUw2a7Ea74P72E8dQvjHrsaKog',
    imageAlt: 'Custom engraved acrylic soundwave night lamp with beechwood base',
    category: 'Celestial Acrylic & Soundwave',
    additionalCategories: [],
    link: '/product/soundwave-acrylic-lamp'
  },
  {
    id: 'carved-teakwood-timber',
    title: 'Hand-Carved Teakwood & Timber',
    tag: 'Teakwood Heritage',
    count: '15 Masterpieces',
    description: 'Sustainable plantation teak memory trunks, personalized guestbook slabs, vintage brass latches, and wooden vow folios.',
    price: '₹3,450',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDXA14h0dgUNaVbxtnKGizuGYfLiBAkq0GL9RG0apzDyXWgI32-AuXPUU8CxRCXDLkoTNN6gghkScDo-GdRjaJ_kxam-a0WkhSdvXf6J9oiC7gI0iSQCuBMuteL5LEx55uOo0_jUDF0_A5Mgw4TPtwuffBa5lNk1V6hHuQKAktHSAQygiA0yO0oxunKn9aiAmSDauceTlKql-VNSDnI7ATVAbn5eoofHROF_0rQdJSBKDR20wD2E5nGQ',
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
    description: 'Lead-free European crystal flutes, whiskey decanters with laser-monogrammed heraldic crests, and polished gold stirrers.',
    price: '₹3,800',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByzR0SR7rOwMogMVeT6JBEHqlam5QUb3exr7abUSeci8_7G4Wjf7j1Q7xaNncd3xQAbd0hMSVpFqmlF-QBjAW6rrgssWnSJCCToy4Pl_hEFirVwdJj4Dlx-ilU2cFT0KTCtvj2t_f7jf_ueA1M88t4srBuF3Rj74CyTXLsMSLh374o2rtKYDh7_8K6nW56smWQ67vWNjqVe82wVFLjgEXWIYHrz2Z1p1x8uiwQgxvsWcYumrHEX8ARPA',
    imageAlt: 'Lead-free European crystal champagne flutes and decanter set',
    category: 'Royal Heritage Suite',
    additionalCategories: [],
    link: '/product/crystal-toasting-flutes'
  },
  {
    id: 'destination-favors',
    title: 'Destination Haldi & Mehendi Favors',
    tag: 'Celebration Favors',
    count: '24 Masterpieces',
    description: 'Bespoke embroidered zardozi potlis, botanical amber candle jars in volume, customized sweets boxes, and guest welcome tags.',
    price: '₹450 / unit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqkx9o1R5d5DWATj32MJb11ysi8o3YS9iFZSt7CE4fKiV-_Mcc26ldoUJKnc96-riOA8a1o7wGdazH0ZHPn9SGrfw-WwPFbG-IpNxb_m8yiHvO6FbVSzF_4h5RQFWwmVSt2qMSs6xRY3ZryCD-_tixgBdpG_8mlqXhczW6odVNUx4DbEGMmG-LN0V3OUz_dTnj5cEidc7cEqGYal2OFgdeWdFyeNAIvqwZ6QL402syVqDbfhfZcRRf4g',
    imageAlt: 'Vibrant luxury Indian destination wedding favors and raw silk potlis',
    category: 'Destination Wedding Favors',
    additionalCategories: ['Bridal & Trousseau Series'],
    link: '/wedding-keepsakes'
  }
];

const CATEGORIES = [
  'All Collections',
  'Bridal & Trousseau Series',
  'The Heirloom Woodcraft',
  'Botanical & Floral Preservation',
  'Velvet & Gilded Leather',
  'Celestial Acrylic & Soundwave',
  'Destination Wedding Favors',
  'Royal Heritage Suite'
];

const CollectionsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Collections');
  const { showToast } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Concierge Form State
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
      showToast('Thank you! An ASRA Concierge Consultant will reach out within 24 hours with your custom lookbook.');
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
    <div className="w-full bg-surface min-h-screen">
      <div className="flex flex-col w-full">
        {/* Subtle Ambient Glow Element */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Breadcrumb & Editorial Header */}
          <section className="max-w-[1360px] mx-auto px-margin pt-space-lg pb-space-md">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-widest text-outline mb-space-sm">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-outline-variant">/</span>
              <span className="text-outline">Collections</span>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-semibold">Signature Atelier Collections</span>
            </nav>

            {/* Headline Block & Key Atelier Metrics */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-space-xs">
                  <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    hotel_class
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary">
                    Atelier Editions 2025
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight mb-space-xs">
                  Curated Signature Collections
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light">
                  Explore masterfully curated wedding suites, keepsake vaults, bridal party tributes, and commemorative luxury hampers tailored by theme and celebration.
                </p>
              </div>

              {/* Atelier Metric Pills */}
              <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
                <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-lg shadow-sm border border-outline-variant/30">
                  <span className="font-headline-md text-headline-md text-primary font-semibold">8</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline leading-tight">Curated</span>
                    <span className="font-label-md text-label-md text-on-surface font-medium leading-tight">Series</span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-lg shadow-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[22px]">workspace_premium</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline leading-tight">100% Handcrafted</span>
                    <span className="font-label-md text-label-md text-on-surface font-medium leading-tight">Artisanal Finish</span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-lg shadow-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[22px]">auto_stories</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline leading-tight">Concierge</span>
                    <span className="font-label-md text-label-md text-on-surface font-medium leading-tight">Bespoke Curation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Bar / Quick Category Chips */}
          <section className="max-w-[1360px] mx-auto px-margin mb-space-xl">
            <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs scrollbar-none" id="collections-tab-bar">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                const label = category === 'All Collections' ? `All Collections (${COLLECTIONS_DATA.length})` : category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`tab-pill px-space-md py-space-xs rounded-full font-label-md text-label-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-sm font-semibold'
                        : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Top Featured Spotlight Banner: The Sovereign Bridal & Trousseau Suite */}
          <section className="max-w-[1360px] mx-auto px-margin mb-space-xl">
            <div className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl flex flex-col lg:flex-row items-stretch border border-outline-variant/40">
              {/* Left Visual Side with Official Hamper Asset */}
              <div className="lg:w-7/12 relative min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] bg-surface-container-low flex items-center justify-center overflow-hidden group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrYPxCrDzczhyZ-p7Ew61w-iDjrf0SYB9xcUMsWWKw19VERYs6chdoMrDSxCbWxB6FP0DPqlSA9C0gfm0A_e76hPgg3kHn_PwuaYLWv2rylJkcQJvx-RMjgkr76e43aAgClcbWocYdzM7JnURK0cckKXh1uPTwgJyWYqKEdhMs_ARV-EYILjjs2zca7jt9X7AqeY7WwO8XtHixUwaHSL-_9YJ51I7DbRGCyy27-puWWkO30dd1YCmnzw"
                  alt="The Sovereign Bridal and Trousseau Suite Luxury Hamper by ASRA Wedding Canvas"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent lg:hidden"></div>
                <div className="absolute top-space-md left-space-md flex items-center gap-space-xs bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-outline-variant/30">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Featured Atelier Masterpiece</span>
                </div>
              </div>

              {/* Right Content Spec Sheet */}
              <div className="lg:w-5/12 p-space-lg lg:p-space-xl flex flex-col justify-between bg-surface-container-lowest relative z-10">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-outline">Exclusive Bridal Curation</span>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-semibold">18 Keepsakes Included</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight mb-space-sm">
                    The Sovereign Bridal &amp; Trousseau Suite
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                    An opulent symphony of hand-embossed blush trousseau cases, artisanal Eau de Parfum, golden Ferrero confections, organic soy candle, silk scrunchie, and our signature ASRA golden ribbon insignia. Crafted specifically for unforgettable trousseau and morning-of-wedding reveals.
                  </p>

                  {/* Inclusions Bullet Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mb-space-lg">
                    <div className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">diamond</span>
                      <span className="font-body-sm text-body-sm text-on-surface">24k Gilded Custom Monograms</span>
                    </div>
                    <div className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">spa</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Fresh Baby's Breath &amp; Roses</span>
                    </div>
                    <div className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">sentiment_satisfied</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Handmade Heirloom Plush Bear</span>
                    </div>
                    <div className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">inventory_2</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Debossed Hardbound Cylinder</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action & Valuation */}
                <div className="pt-space-md bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border-t border-outline-variant/30">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline block">Curated Suite From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-md text-headline-md font-bold text-on-surface">₹7,499</span>
                      <span className="font-body-sm text-body-sm text-outline line-through">₹9,800</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <Link
                      to="/product/sovereign-bridal-suite"
                      className="flex-1 sm:flex-initial px-space-lg py-space-sm bg-inverse-surface hover:bg-primary text-inverse-on-surface font-label-md text-label-md tracking-wider uppercase rounded-lg shadow-md transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Explore Collection</span>
                      <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleBookmarkSovereign}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                        isSovereignBookmarked
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                      title={isSovereignBookmarked ? "Remove from Wishlist" : "Bookmark Suite"}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
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
          <section className="max-w-[1360px] mx-auto px-margin mb-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-3">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary block mb-1">
                  ASRAWEDDINGCANVAS ATELIER ARCHIVE
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Handcrafted Wedding Suites &amp; Keepsake Themes
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-outline max-w-sm">
                Select any curated series to personalize with initial debossing, custom wax seal colors, and personalized vow typography.
              </p>
            </div>

            {/* Bento Grid / Card Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
              {filteredCollections.map((item) => (
                <article
                  key={item.id}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-outline-variant/30"
                >
                  <div className="relative w-full aspect-[4/3] bg-surface-container-low overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-space-xs left-space-xs bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded font-label-sm text-[11px] font-semibold text-on-surface shadow-xs">
                      {item.count}
                    </div>
                    <div className="absolute bottom-space-xs right-space-xs bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface px-2 py-0.5 rounded font-label-sm text-[10px] tracking-widest uppercase">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors leading-snug mb-1">
                        {item.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-space-sm flex items-center justify-between border-t border-outline-variant/20">
                      <div>
                        <span className="font-label-sm text-[10px] uppercase text-outline block">From</span>
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">{item.price}</span>
                      </div>
                      <Link
                        to={item.link}
                        className="px-3 py-1.5 bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface rounded font-label-sm text-label-sm tracking-wider uppercase transition-colors flex items-center gap-1 group/btn"
                      >
                        <span>Discover</span>
                        <span className="material-symbols-outlined text-[14px] group-hover/btn:translate-x-0.5 transition-transform">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredCollections.length === 0 && (
              <div className="py-16 text-center bg-surface-container-low rounded-xl border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-4xl mb-2">search_off</span>
                <p className="font-title-sm text-on-surface font-medium">No collections found for this category</p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All Collections')}
                  className="mt-3 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider"
                >
                  View All Collections
                </button>
              </div>
            )}
          </section>

          {/* Atelier Curated Services Section: Custom Bundling & Privileges */}
          <section className="max-w-[1360px] mx-auto px-margin mb-space-xl">
            <div className="bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl relative overflow-hidden shadow-md border border-outline-variant/40">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-space-xl relative z-10">
                <div className="lg:w-7/12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-lowest rounded-full mb-space-xs border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[16px] text-primary">draw</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary">Bespoke Curation Privilege</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-space-xs font-semibold">
                    Custom Collection Bundling &amp; Private Atelier Consultation
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
                    Dreaming of combining items across different collections? Whether curating 500 personalized destination welcome hampers for Udaipur or designing an exclusive bespoke bride-and-groom heirloom trunk, our dedicated wedding concierge crafts unified color suites, custom fonts, and private mockups.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                    <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/30">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-1">palette</span>
                      <h4 className="font-title-sm text-title-sm font-semibold text-on-surface">Hue Harmonization</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Matching wax, silk ribbons, and leather to your wedding invitation palette.</p>
                    </div>

                    <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/30">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-1">flight_takeoff</span>
                      <h4 className="font-title-sm text-title-sm font-semibold text-on-surface">Destination Dispatch</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">White-glove bulk delivery coordinated straight to palace and resort suites.</p>
                    </div>

                    <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/30">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-1">loyalty</span>
                      <h4 className="font-title-sm text-title-sm font-semibold text-on-surface">Corporate &amp; Family Seal</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Vector stamp creation and customized 3D metal crest debossing plates.</p>
                    </div>
                  </div>
                </div>

                {/* Quick Consultation Form Card */}
                <div className="lg:w-5/12 w-full bg-surface-container-lowest p-space-lg rounded-xl shadow-lg border border-outline-variant/40">
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold mb-1">
                    Book an Atelier Concierge Call
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Receive a curated digital moodboard and wholesale pricing deck within 24 hours.
                  </p>
                  <form className="space-y-space-sm" onSubmit={handleFormSubmit}>
                    <div>
                      <label htmlFor="concierge-name" className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">
                        Your Full Name
                      </label>
                      <input
                        id="concierge-name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm px-space-sm py-2 rounded-lg border border-outline-variant/40 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
                        placeholder="e.g. Asra Ansari"
                        required
                        type="text"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                      <div>
                        <label htmlFor="concierge-phone" className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          id="concierge-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm px-space-sm py-2 rounded-lg border border-outline-variant/40 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
                          placeholder="+91 96926 68263"
                          required
                          type="tel"
                        />
                      </div>
                      <div>
                        <label htmlFor="concierge-guests" className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">
                          Expected Guests / Units
                        </label>
                        <input
                          id="concierge-guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleFormChange}
                          className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm px-space-sm py-2 rounded-lg border border-outline-variant/40 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
                          placeholder="50 - 500"
                          type="number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="concierge-date" className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">
                        Target Wedding / Event Date
                      </label>
                      <input
                        id="concierge-date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleFormChange}
                        className="w-full bg-surface-container-low text-on-surface text-body-sm font-body-sm px-space-sm py-2 rounded-lg border border-outline-variant/40 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all"
                        type="date"
                      />
                    </div>

                    <button
                      className="w-full py-space-sm bg-primary hover:bg-on-primary-container text-on-primary font-label-md text-label-md tracking-wider uppercase rounded-lg shadow-md transition-colors mt-space-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                          <span>Connecting Concierge...</span>
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
          <section className="max-w-[1360px] mx-auto px-margin mb-space-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md py-space-lg bg-surface-container-low rounded-xl px-space-lg shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[28px] shrink-0">handyman</span>
                <div>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface block">100% Bespoke Craft</span>
                  <span className="font-body-sm text-body-sm text-outline">Custom dies &amp; real gold leaf</span>
                </div>
              </div>

              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[28px] shrink-0">local_shipping</span>
                <div>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface block">Insured Global Courier</span>
                  <span className="font-body-sm text-body-sm text-outline">Doorstep transit protection</span>
                </div>
              </div>

              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[28px] shrink-0">redeem</span>
                <div>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface block">Wax-Sealed Luxury Box</span>
                  <span className="font-body-sm text-body-sm text-outline">Complimentary presentation</span>
                </div>
              </div>

              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[28px] shrink-0">support_agent</span>
                <div>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface block">Atelier Privilege Desk</span>
                  <span className="font-body-sm text-body-sm text-outline">Personal bridal stylist 24/7</span>
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
