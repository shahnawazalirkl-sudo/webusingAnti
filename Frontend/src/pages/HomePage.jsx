import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeGiftBox from '../components/common/ThreeGiftBox';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const HomePage = () => {
  const { showToast } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const carouselRef = useRef(null);
  const [heroMode, setHeroMode] = useState('photo'); // 'photo' | '3d'

  const handleCopyCoupon = (code) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    showToast(`Coupon ${code} copied to clipboard!`);
  };

  const scrollCarousel = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Editorial Hero Section */}
      <section className="w-full pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 px-4 sm:px-margin relative overflow-hidden bg-gradient-to-b from-surface via-surface-container-low/30 to-surface">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-space-xl items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6 xl:pr-space-xl">
            <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 bg-surface-container-high/80 backdrop-blur-xs rounded-full mb-4 sm:mb-space-md border border-outline-variant/40">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-[11px] sm:text-label-sm tracking-widest uppercase text-on-surface-variant font-medium">
                The 2025 Bridal &amp; Gift Collection
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-on-surface font-normal tracking-tight mb-4 sm:mb-space-md leading-[1.14]">
              Crafting Timeless <span className="italic font-normal text-primary">Gifts</span> for Life's Most Cherished Moments.
            </h1>

            <p className="font-body-md sm:font-body-lg text-body-md sm:text-body-lg text-on-surface-variant max-w-xl mb-6 sm:mb-space-lg leading-relaxed font-light">
              From custom debossed leather passport suites to glowing acrylic melodies and curated wedding essentials hampers, we immortalize love stories with meticulous artisanal craft.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-space-md w-full sm:w-auto mb-8 sm:mb-space-xl">
              <Link
                to="/collections"
                className="px-7 sm:px-8 py-3.5 bg-on-surface text-surface rounded-lg hover:bg-primary transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-label-md text-label-md tracking-wider uppercase font-semibold group"
              >
                <span>Explore All Collections</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>

              <Link
                to="/bespoke"
                className="px-6 sm:px-7 py-3.5 bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/80 hover:border-primary hover:bg-surface-container-low transition-all duration-300 shadow-xs flex items-center justify-center gap-2 font-label-md text-label-md tracking-wider uppercase font-semibold"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">edit_note</span>
                <span>Create Your Own</span>
              </Link>
            </div>

            {/* Metric Callout Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-space-md pt-5 sm:pt-space-md border-t border-outline-variant/30 w-full max-w-lg">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold block leading-tight">18,000+</span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase tracking-wider block mt-0.5">Heirlooms Delivered</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold block leading-tight">99.8%</span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase tracking-wider block mt-0.5">Satisfaction Rate</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold block leading-tight">24–48h</span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase tracking-wider block mt-0.5">Priority Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition Hero (Interactive Luxury 3D & Photography Showcase) */}
          <div className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-[440px] sm:max-w-[460px]">
              {/* Ambient Glow Background */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-secondary-container/40 rounded-full blur-3xl pointer-events-none"></div>

              {/* View Switcher Pill */}
              <div className="absolute top-4 right-4 z-30 flex items-center bg-surface-container-lowest/90 backdrop-blur-md rounded-full p-1 border border-outline-variant/50 shadow-sm text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setHeroMode('photo')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    heroMode === 'photo'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMode('3d')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                    heroMode === '3d'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">view_in_ar</span>
                  3D View
                </button>
              </div>

              {/* Primary Hero Card with Embedded 3D Canvas / Photograph */}
              <div className="relative bg-surface-container-lowest p-2 sm:p-space-sm rounded-2xl shadow-xl overflow-hidden group border border-outline-variant/40">
                <div className="aspect-[4/5] min-h-[380px] sm:min-h-[440px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-surface-container-lowest via-surface-container-low/50 to-surface-container relative flex items-center justify-center">
                  {heroMode === 'photo' ? (
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="ASRA Wedding Canvas Luxury Gift Gift Bouquet Hamper"
                      src="/assets/cdn/img_ea7b421bfaad.png"
                    />
                  ) : (
                    <div className="w-full h-full">
                      <ThreeGiftBox />
                    </div>
                  )}
                </div>

                <div className="p-3.5 sm:p-space-md flex items-center justify-between bg-surface-container-lowest relative z-20">
                  <div>
                    <span className="font-label-sm text-[10px] sm:text-label-sm text-primary uppercase tracking-widest font-semibold block">
                      Artisan Spotlight
                    </span>
                    <h3 className="font-title-md text-sm sm:text-title-md text-on-surface font-semibold">
                      Wedding Essentials Travel Suite
                    </h3>
                  </div>
                  <span className="font-title-md text-sm sm:text-title-md text-primary font-bold">₹1,699</span>
                </div>
              </div>

              {/* Overlapping Floating Badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-3 sm:-left-6 bg-surface-container-lowest/95 backdrop-blur-md p-3 sm:p-space-md rounded-xl shadow-lg border border-outline-variant/40 flex items-center gap-3 sm:gap-space-md max-w-[240px] sm:max-w-[260px] z-30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary-container/60 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">verified_user</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] sm:text-label-sm text-primary uppercase tracking-wider font-semibold">
                    Collection Certified
                  </span>
                  <span className="font-body-sm text-[11px] sm:text-body-sm text-on-surface font-medium leading-tight">
                    Debossed initials with real brass plates
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Offers & Privileges Quick Bar */}
      <section className="w-full bg-secondary-container/30 border-y border-outline-variant/40 py-space-md px-margin">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[24px] text-primary">card_giftcard</span>
            <div>
              <span className="font-title-sm text-title-sm text-on-surface font-semibold block">
                Exclusive Privileges &amp; Bank Offers
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Save up to ₹1,500 on collections today with certified wedding codes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            {/* Coupon Code Chips */}
            <button
              type="button"
              onClick={() => handleCopyCoupon('ASRAFIRST')}
              className="flex items-center gap-space-xs px-3 py-1.5 bg-surface-container-lowest rounded border border-primary/30 hover:border-primary transition-all text-on-surface group cursor-pointer"
            >
              <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">Code:</span>
              <span className="font-mono text-label-md font-bold text-primary">ASRAFIRST</span>
              <span className="material-symbols-outlined text-[14px] text-outline group-hover:text-primary transition-colors">
                content_copy
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleCopyCoupon('HDFCWED1500')}
              className="flex items-center gap-space-xs px-3 py-1.5 bg-surface-container-lowest rounded border border-primary/30 hover:border-primary transition-all text-on-surface group cursor-pointer"
            >
              <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">HDFC:</span>
              <span className="font-mono text-label-md font-bold text-primary">HDFCWED1500</span>
              <span className="material-symbols-outlined text-[14px] text-outline group-hover:text-primary transition-colors">
                content_copy
              </span>
            </button>

            <Link
              to="/offers"
              className="text-primary font-label-md text-label-md font-semibold hover:underline flex items-center gap-1 ml-2"
            >
              <span>View All (6) Offers</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending & New Arrivals with Peek Affordance */}
      <section className="w-full py-space-xl px-margin bg-surface">
        <div className="max-w-[1360px] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold block mb-1">
                Handpicked Daily
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-medium tracking-tight">
                Trending Gifts &amp; Favors
              </h2>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center gap-1 border border-outline-variant/60 rounded p-1">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => scrollCarousel(-320)}
                  className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => scrollCarousel(320)}
                  className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
              <Link
                to="/collections"
                className="font-label-md text-label-md text-on-surface font-semibold hover:text-primary transition-colors flex items-center gap-1 px-3 py-2"
              >
                <span>View All (48)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Horizontal Scroll Track with Peek Affordance */}
          <div
            ref={carouselRef}
            className="flex gap-space-lg overflow-x-auto pb-space-lg scrollbar-none snap-x snap-mandatory"
          >
            {/* Card 1: Customized Leather Travel Set */}
            <div className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Custom Initials Leather Travel Set"
                  src="/assets/cdn/img_48ec5e0e21c9.jpg"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-on-primary font-label-sm text-[10px] tracking-widest uppercase rounded">
                  BESTSELLER
                </span>
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist({ id: 'leather-travel-set', title: 'Custom Initials Leather Travel Set', price: 1699 })}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                    isWishlisted('leather-travel-set') ? 'text-rose-600' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface-variant font-label-sm text-[10px] tracking-wider uppercase rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-primary">bolt</span> 24h Dispatch
                </span>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 text-primary mb-1">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">4.9</span>
                  <span className="text-outline text-[12px]">(284)</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-1">
                  Custom Initials Leather Travel Set
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-space-sm">
                  Tan Italian Leather • Free Debossed Initials
                </p>
                <div className="mt-auto pt-space-xs flex items-center justify-between border-t border-outline-variant/30">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title-md text-title-md font-bold text-on-surface">₹1,699</span>
                    <span className="font-body-sm text-body-sm text-outline line-through">₹2,499</span>
                  </div>
                  <Link
                    to="/product/sovereign-bridal-suite"
                    className="px-3 py-1.5 bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary rounded font-label-sm text-label-sm tracking-wider uppercase transition-colors"
                  >
                    Personalize
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Personalized Acrylic Song Plaque */}
            <div className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Acoustic First Dance Acrylic Lamp"
                  src="/assets/cdn/img_679ede3f1033.jpg"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-sm text-[10px] tracking-widest uppercase rounded">
                  TRENDING
                </span>
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist({ id: 'acrylic-first-dance', title: 'Acoustic First Dance Acrylic Lamp', price: 1499 })}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                    isWishlisted('acrylic-first-dance') ? 'text-rose-600' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface-variant font-label-sm text-[10px] tracking-wider uppercase rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-primary">qr_code</span> Scannable Song
                </span>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 text-primary mb-1">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">5.0</span>
                  <span className="text-outline text-[12px]">(612)</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-1">
                  Acoustic First Dance Acrylic Lamp
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-space-sm">
                  Solid Beechwood LED Base • Scannable Audio
                </p>
                <div className="mt-auto pt-space-xs flex items-center justify-between border-t border-outline-variant/30">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title-md text-title-md font-bold text-on-surface">₹1,499</span>
                    <span className="font-body-sm text-body-sm text-outline line-through">₹2,199</span>
                  </div>
                  <Link
                    to="/product/aura-acrylic-melody"
                    className="px-3 py-1.5 bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary rounded font-label-sm text-label-sm tracking-wider uppercase transition-colors"
                  >
                    Personalize
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Initials Velvet Jewelry Box */}
            <div className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Initials Velvet Jewel Box &amp; Pendant"
                  src="/assets/cdn/img_677956d05c8e.jpg"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-tertiary text-on-tertiary font-label-sm text-[10px] tracking-widest uppercase rounded">
                  BRIDAL FAVORITE
                </span>
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist({ id: 'velvet-jewel-box', title: 'Initials Velvet Jewel Box & Pendant', price: 1899 })}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                    isWishlisted('velvet-jewel-box') ? 'text-rose-600' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface-variant font-label-sm text-[10px] tracking-wider uppercase rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-primary">auto_fix_high</span> Foil Stamped
                </span>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 text-primary mb-1">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">4.9</span>
                  <span className="text-outline text-[12px]">(195)</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-1">
                  Initials Velvet Jewel Box &amp; Pendant
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-space-sm">
                  Blush Velvet • 18K Gold Plated Pendant
                </p>
                <div className="mt-auto pt-space-xs flex items-center justify-between border-t border-outline-variant/30">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title-md text-title-md font-bold text-on-surface">₹1,899</span>
                    <span className="font-body-sm text-body-sm text-outline line-through">₹2,899</span>
                  </div>
                  <Link
                    to="/product/velvet-ring-vault"
                    className="px-3 py-1.5 bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary rounded font-label-sm text-label-sm tracking-wider uppercase transition-colors"
                  >
                    Personalize
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4: Gentleman's Timepiece & Leather Set */}
            <div className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Groom's Heirloom Timepiece &amp; Wallet"
                  src="/assets/cdn/img_acd95c6f65de.jpg"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-on-surface text-surface font-label-sm text-[10px] tracking-widest uppercase rounded">
                  GROOM'S SUITE
                </span>
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist({ id: 'grooms-timepiece', title: "Groom's Heirloom Timepiece & Wallet", price: 2799 })}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                    isWishlisted('grooms-timepiece') ? 'text-rose-600' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface-variant font-label-sm text-[10px] tracking-wider uppercase rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-primary">workspace_premium</span> Premium Box
                </span>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 text-primary mb-1">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">4.8</span>
                  <span className="text-outline text-[12px]">(142)</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-1">
                  Groom's Heirloom Timepiece &amp; Wallet
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-space-sm">
                  Engraved Caseback • Full-Grain Leather
                </p>
                <div className="mt-auto pt-space-xs flex items-center justify-between border-t border-outline-variant/30">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title-md text-title-md font-bold text-on-surface">₹2,799</span>
                    <span className="font-body-sm text-body-sm text-outline line-through">₹3,999</span>
                  </div>
                  <Link
                    to="/product/sovereign-bridal-suite"
                    className="px-3 py-1.5 bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary rounded font-label-sm text-label-sm tracking-wider uppercase transition-colors"
                  >
                    Personalize
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 5: Handcrafted Gift Wooden Hamper (Peek Card) */}
            <div className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
                <img
                  alt="Luxury wedding hamper"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/assets/cdn/img_56d7a2ebc8ba.jpg"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-on-primary font-label-sm text-[10px] tracking-widest uppercase rounded">
                  LUXURY WEDDING ESSENTIALS
                </span>
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist({ id: 'heritage-wooden-hamper', title: 'Grand Classic Wooden Hamper', price: 4999 })}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                    isWishlisted('classic-wooden-hamper') ? 'text-rose-600' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 text-primary mb-1">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">5.0</span>
                  <span className="text-outline text-[12px]">(89)</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-1">
                  Grand Classic Wooden Hamper
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-space-sm">
                  Engraved Gift Box • Gourmet &amp; Tea
                </p>
                <div className="mt-auto pt-space-xs flex items-center justify-between border-t border-outline-variant/30">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title-md text-title-md font-bold text-on-surface">₹4,999</span>
                    <span className="font-body-sm text-body-sm text-outline line-through">₹6,499</span>
                  </div>
                  <Link
                    to="/product/grand-heritage-trousseau-trunk"
                    className="px-3 py-1.5 bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary rounded font-label-sm text-label-sm tracking-wider uppercase transition-colors"
                  >
                    Personalize
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Curated Recipient Showcase ("Gifts for Everyone") */}
      <section className="w-full py-space-xl px-margin bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary font-semibold block mb-1">
              Customized Collection by Recipient
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-medium">
              Thoughtfully Made for Every Bond
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Tailored gifts crafted with personal initials, customized messages, and heirloom packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {/* 1. For Her */}
            <Link
              to="/collections"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-surface-container relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="For Her Bridal Gifts"
                  src="/assets/cdn/img_c9193e0400dc.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-space-md text-surface flex flex-col justify-end">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim mb-1">
                    Collection Suite
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest font-medium mb-1">
                    For Her: Grace &amp; Sentiments
                  </h3>
                  <p className="font-body-sm text-body-sm text-surface-container-high/90 mb-space-sm line-clamp-2">
                    Velvet jewelry boxes, personalized pendants &amp; scented candles.
                  </p>
                  <div className="flex items-center gap-1 font-label-md text-label-md text-primary-fixed group-hover:translate-x-1 transition-transform">
                    <span>Explore For Her</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 2. For Him */}
            <Link
              to="/collections"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-surface-container relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="For Him Gentleman's Edition"
                  src="/assets/cdn/img_8a5a665d4d2e.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-space-md text-surface flex flex-col justify-end">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim mb-1">
                    Gentleman's Edition
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest font-medium mb-1">
                    For Him: Refined &amp; Timeless
                  </h3>
                  <p className="font-body-sm text-body-sm text-surface-container-high/90 mb-space-sm line-clamp-2">
                    Engraved watches, hand-stitched wallets &amp; luxury cufflink cases.
                  </p>
                  <div className="flex items-center gap-1 font-label-md text-label-md text-primary-fixed group-hover:translate-x-1 transition-transform">
                    <span>Explore For Him</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 3. For Couples & Anniversaries */}
            <Link
              to="/collections"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-surface-container relative">
                <img
                  alt="Luxury wedding hamper for couples"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="/assets/cdn/img_ecfddff03b93.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-space-md text-surface flex flex-col justify-end">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim mb-1">
                    Cherished Duos
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest font-medium mb-1">
                    Couples &amp; Anniversaries
                  </h3>
                  <p className="font-body-sm text-body-sm text-surface-container-high/90 mb-space-sm line-clamp-2">
                    Heirloom wooden boxes, matching travel sets &amp; song plaques.
                  </p>
                  <div className="flex items-center gap-1 font-label-md text-label-md text-primary-fixed group-hover:translate-x-1 transition-transform">
                    <span>Explore Couples</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 4. For Gifts & Little Ones */}
            <Link
              to="/collections"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-surface-container relative">
                <img
                  alt="Personalized kids gift gifts"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="/assets/cdn/img_448c691fa5fa.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-space-md text-surface flex flex-col justify-end">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim mb-1">
                    Nursery &amp; Early Years
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest font-medium mb-1">
                    Playful Memories
                  </h3>
                  <p className="font-body-sm text-body-sm text-surface-container-high/90 mb-space-sm line-clamp-2">
                    Carved wooden name puzzles, birth plaques &amp; soft night lights.
                  </p>
                  <div className="flex items-center gap-1 font-label-md text-label-md text-primary-fixed group-hover:translate-x-1 transition-transform">
                    <span>Explore Gifts</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* "Your Idea → We Create" Collection Customized Studio Experience */}
      <section className="w-full py-space-xl lg:py-20 px-margin bg-surface">
        <div className="max-w-[1360px] mx-auto bg-surface-container-lowest rounded-2xl p-space-lg lg:p-space-xl shadow-md border border-outline-variant/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            
            {/* Left Explainer Text */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container text-on-secondary-container rounded font-label-sm text-[11px] tracking-wider uppercase font-semibold mb-space-sm">
                <span className="material-symbols-outlined text-[14px]">brush</span>
                <span>Collection Customized Service</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-normal mb-space-sm">
                Your Idea → We Handcraft into Reality.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                Can't find the exact initials design or packaging dimension? Send us your wedding logo, customized sketches, or moodboard. Our lead master-craftsmen render a 3D digital proof within 6 hours.
              </p>

              {/* 3-Step Process */}
              <div className="flex flex-col gap-space-md w-full mb-space-lg">
                <div className="flex items-start gap-space-sm">
                  <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-label-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Share Your Vision / Upload Logo
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Send vector crests, dates, calligraphy font names or rough sketch photos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm">
                  <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-label-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Digital 3D Collection Render &amp; Approval
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Review lifelike foil-embossed or laser-cut previews before metal dies are cast.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm">
                  <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-label-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Hand-finished &amp; Wax-Sealed Delivery
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Individual inspection, luxury velvet ribboning, and insured express dispatch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md w-full sm:w-auto">
                <a
                  className="px-6 py-3 bg-[#25D366] text-white rounded font-label-md text-label-md font-semibold tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  href="https://wa.me/919692668263"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>WhatsApp Collection Support</span>
                </a>

                <Link
                  to="/bespoke"
                  className="px-6 py-3 bg-surface-container text-on-surface hover:bg-surface-container-high rounded font-label-md text-label-md font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Submit Custom Brief Form</span>
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Showcase / Mockup Area */}
            <div className="lg:col-span-6 bg-surface-container-low rounded-xl p-space-lg flex flex-col items-center justify-center relative">
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden relative shadow-md bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Artisan hands applying gold foil stamp"
                  src="/assets/cdn/img_9e12f2d44ec6.jpg"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-full shadow font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span>Collection Live Workbench</span>
                </div>
              </div>

              <div className="mt-space-md w-full flex items-center justify-between px-space-xs text-on-surface-variant">
                <div className="flex items-center gap-2 font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                  <span>No Minimum Order for Couples</span>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">design_services</span>
                  <span>Free 3D Proof Included</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Verified Couples & Bride Stories */}
      <section className="w-full py-space-xl px-margin bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary font-semibold block mb-1">
              Loved by 3,500+ Couples
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-medium">
              Stories from the Wedding Canvas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Review 1 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-primary mb-space-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md">
                  "The custom initials leather passport and luggage sets were the highlight of our bridal party gifts! The gold foil quality was immaculate, and the team accommodated our quick deadline of 3 days."
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center text-label-sm">
                  SS
                </div>
                <div>
                  <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                    Sagil &amp; Shagufta
                  </h4>
                  <span className="font-label-sm text-label-sm text-outline">
                    Destination Wedding • Udaipur
                  </span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-primary mb-space-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md">
                  "We ordered the acrylic first dance plaque with our Spotify song. It now glows on our bedside every night. The wooden base engraving is so delicate and deeply meaningful. Truly unforgettable."
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-label-sm">
                  JA
                </div>
                <div>
                  <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                    Jawed &amp; Asra
                  </h4>
                  <span className="font-label-sm text-label-sm text-outline">
                    1st Anniversary • Bengaluru
                  </span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-primary mb-space-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md">
                  "The customized bridal party velvet jewelry boxes were packaged like luxury Parisian heirloom gifts. The wax seals and handwritten calligraphy cards made my bridesmaids cry happy tears!"
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container font-bold flex items-center justify-center text-label-sm">
                  SB
                </div>
                <div>
                  <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                    Miss Sultana Begum
                  </h4>
                  <span className="font-label-sm text-label-sm text-outline">
                    Bride • Mumbai
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Pillars Assurance Bar */}
      <section className="w-full py-space-xl px-margin bg-surface border-t border-outline-variant/40">
        <div className="max-w-[1360px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-space-lg">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">handshake</span>
            </div>
            <div>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                100% Customized Craft
              </h4>
              <p className="font-body-sm text-body-sm text-outline">Every item personalized with care</p>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">local_shipping</span>
            </div>
            <div>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                Insured Express Delivery
              </h4>
              <p className="font-body-sm text-body-sm text-outline">Across India &amp; 40+ countries</p>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">inventory_2</span>
            </div>
            <div>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                Wax-Sealed Gift Wrap
              </h4>
              <p className="font-body-sm text-body-sm text-outline">Complimentary unboxing grace</p>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">support_agent</span>
            </div>
            <div>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                Collection Support
              </h4>
              <p className="font-body-sm text-body-sm text-outline">Dedicated wedding gift stylists</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
