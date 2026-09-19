"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import ThreeGiftBox from '@/components/common/ThreeGiftBox';
import ProductCard from '@/components/common/ProductCard';
import MonogramPreviewStudio from '@/components/common/MonogramPreviewStudio';
import { PRODUCTS } from '@/data/productsData';
import { useCart } from '@/context/CartContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const HomePage = () => {
  const { showToast } = useCart();
  const [heroMode, setHeroMode] = useState('photo'); // 'photo' | '3d'

  const handleCopyCoupon = (code) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    showToast(`Coupon ${code} copied to clipboard!`);
  };

  // Trending products selected from real shared catalog
  const trendingProductIds = [
    'bespoke-leather-travel-set',
    'led-acrylic-song-plaque',
    'custom-velvet-jewelry-box',
    'gentleman-timepiece-set',
    'velvet-ring-vault',
    'grand-anniversary-hamper'
  ];

  const trendingProducts = trendingProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Wedding Ceremony Categories
  const weddingCeremonies = [
    {
      title: 'Roka & Engagement',
      subtitle: 'Ring vaults & luxury hampers',
      tag: 'Step 1',
      link: '/shop?cat=favors-trousseau',
      img: '/assets/cdn/img_5ca8bace4375.jpg'
    },
    {
      title: 'Mehendi & Sangeet',
      subtitle: 'Custom favors & acoustic plaques',
      tag: 'Step 2',
      link: '/shop?cat=keepsakes',
      img: '/assets/cdn/img_679ede3f1033.jpg'
    },
    {
      title: 'The Wedding Day',
      subtitle: 'Heirloom vow books & bridal suites',
      tag: 'Step 3',
      link: '/shop?cat=favors-trousseau',
      img: '/assets/cdn/img_8222cd4f9dd5.png'
    },
    {
      title: 'Bridal Luggage & Honeymoon',
      subtitle: 'Debossed leather luggage suites',
      tag: 'Step 4',
      link: '/shop?cat=favors-trousseau',
      img: '/assets/cdn/img_48ec5e0e21c9.jpg'
    },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'How long does custom monogramming and debossing take?',
      a: 'Standard personalized pieces take 24–48 hours for dispatch. Custom bridal trunks and large volume wedding favors take 3–7 business days. Express overnight dispatch is also available upon request.'
    },
    {
      q: 'Will I see a 3D digital proof before my items are crafted?',
      a: 'Yes! For every customized order or custom bridal favor request, our design team sends a lifelike digital proof or render via WhatsApp/Email for your final sign-off before stamping.'
    },
    {
      q: 'Can you handle bulk wedding favors for guests with custom guest names?',
      a: 'Absolutely. We specialize in wedding favors from 25 to 2,000+ units, with tiered volume pricing, individual guest name debossing, custom wax seals, and direct dispatch to your wedding destination.'
    },
    {
      q: 'Are your items packaged ready for gifting?',
      a: 'Every single ASRA keepsake arrives inside a rigid heirloom gift box, complete with handwritten personalized calligraphy note, wax seal stamp, and satin ribbon wrap at no additional cost.'
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Editorial Hero Section - Streamlined & Balanced Height */}
      <section className="w-full pt-4 pb-8 sm:pt-8 sm:pb-12 md:pt-10 md:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-surface via-surface-container-low/20 to-surface">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-4">
            <Badge variant="outline" className="gap-1.5 px-3 py-1 mb-3 rounded-full border-outline-variant/40 bg-surface-container-high/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
                The 2025 Bridal &amp; Wedding Gift Studio
              </span>
            </Badge>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-on-surface font-normal tracking-tight mb-3 leading-[1.12] sm:leading-[1.15]">
              Crafting Timeless <span className="italic font-normal text-primary">Gifts</span> for Life's Most Cherished Moments.
            </h1>

            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-lg mb-5 leading-relaxed font-normal">
              From custom debossed leather passport suites to glowing acrylic melodies, heirloom ring vaults, and curated wedding hampers, we immortalize your love story with meticulous artisanal craft.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-5">
              <Link
                href="/shop"
                className="h-12 px-6 bg-primary text-on-primary rounded-xl hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 font-sans text-sm font-medium uppercase tracking-wider group w-full sm:w-auto cursor-pointer"
              >
                <span>Explore Shop Catalog</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>

              <Link
                href="/bespoke"
                className="h-12 px-6 bg-surface-container-lowest text-on-surface rounded-xl border border-outline-variant/50 hover:border-primary hover:text-primary active:scale-[0.98] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 font-sans text-sm font-medium uppercase tracking-wider w-full sm:w-auto cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">edit_note</span>
                <span>Custom Design Studio</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-outline-variant/30 w-full max-w-md">
              <div className="flex items-start gap-1 sm:gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0 mt-0.5">verified</span>
                <div>
                  <span className="font-serif text-sm sm:text-base md:text-lg text-on-surface font-semibold block leading-tight">18,000+</span>
                  <span className="font-label-sm text-[9px] sm:text-[10px] text-outline uppercase tracking-wider block">Weddings Gifted</span>
                </div>
              </div>
              <div className="flex items-start gap-1 sm:gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0 mt-0.5">star</span>
                <div>
                  <span className="font-serif text-sm sm:text-base md:text-lg text-on-surface font-semibold block leading-tight">4.9 / 5</span>
                  <span className="font-label-sm text-[9px] sm:text-[10px] text-outline uppercase tracking-wider block">Couples Rated</span>
                </div>
              </div>
              <div className="flex items-start gap-1 sm:gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0 mt-0.5">bolt</span>
                <div>
                  <span className="font-serif text-sm sm:text-base md:text-lg text-on-surface font-semibold block leading-tight">24–48h</span>
                  <span className="font-label-sm text-[9px] sm:text-[10px] text-outline uppercase tracking-wider block">Express Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase (3D & High-Res Photography) */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0 w-full max-w-full">
            <div className="relative w-full max-w-[380px] sm:max-w-[400px] overflow-hidden">
              {/* Ambient Glow */}
              <div className="absolute -top-8 -right-8 w-60 h-60 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none"></div>

              {/* View Switcher */}
              <Tabs
                value={heroMode}
                onValueChange={setHeroMode}
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30"
              >
                <TabsList className="text-[10px] sm:text-xs font-semibold bg-surface-container-lowest/90 backdrop-blur-md p-0.5 rounded-lg border border-outline-variant/40 shadow-xs">
                  <TabsTrigger
                    value="photo"
                    className="px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-md data-[state=active]:bg-primary data-[state=active]:text-on-primary transition-all active:scale-95 touch-manipulation cursor-pointer"
                  >
                    Photo
                  </TabsTrigger>
                  <TabsTrigger
                    value="3d"
                    className="px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-md data-[state=active]:bg-primary data-[state=active]:text-on-primary flex items-center gap-1 transition-all active:scale-95 touch-manipulation cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">view_in_ar</span>
                    <span>3D View</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Primary Showcase Card */}
              <div className="relative bg-surface-container-lowest p-2 rounded-2xl shadow-lg overflow-hidden group border border-outline-variant/40">
                <div className="aspect-[4/5] h-[280px] sm:h-[340px] md:h-[360px] w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-b from-surface-container-lowest via-surface-container-low/50 to-surface-container relative flex items-center justify-center">
                  {heroMode === 'photo' ? (
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="ASRA Wedding Canvas Luxury Gift Hamper"
                      src="/assets/cdn/img_ea7b421bfaad.png"
                    />
                  ) : (
                    <div className="w-full h-full max-w-full overflow-hidden">
                      <ThreeGiftBox />
                    </div>
                  )}
                </div>

                <div className="p-2.5 sm:p-3 flex items-center justify-between bg-surface-container-lowest relative z-20">
                  <div>
                    <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest font-semibold block">
                      Artisan Spotlight
                    </span>
                    <h3 className="font-title-sm text-xs sm:text-sm text-on-surface font-semibold">
                      Wedding Essentials Travel Suite
                    </h3>
                  </div>
                  <span className="font-title-sm text-xs sm:text-sm text-primary font-bold">₹1,699</span>
                </div>
              </div>

              {/* Overlapping Certified Badge */}
              <div className="absolute -bottom-2 sm:-bottom-4 left-2 sm:-left-2 bg-surface-container-lowest/95 backdrop-blur-md p-2 sm:p-2.5 rounded-xl shadow-md border border-outline-variant/40 flex items-center gap-2 max-w-[210px] sm:max-w-[230px] z-20">
                <div className="w-8 h-8 rounded-full bg-secondary-container/60 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                </div>
                <div className="flex flex-col items-start">
                  <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-semibold tracking-wider uppercase text-primary bg-secondary-container/50 border-0">
                    Studio Certified
                  </Badge>
                  <span className="font-body-sm text-[11px] text-on-surface font-medium leading-tight mt-0.5">
                    Custom debossed with brass dies
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Meaningful Privilege & Code Bar - Standardized #FAF4EB Container */}
      <section className="w-full bg-[#FAF4EB] border-y border-outline-variant/30 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <span className="material-symbols-outlined text-[22px] text-primary shrink-0">redeem</span>
            <div>
              <span className="font-sans text-xs text-on-surface font-semibold block">
                Complimentary Luxury Wax-Sealed Packaging
              </span>
              <p className="font-sans text-[11px] text-on-surface-variant">
                Enjoy free custom couple initials debossing &amp; insured delivery on orders over ₹2,499.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => handleCopyCoupon('ASRAFIRST')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-primary/30 hover:border-primary transition-all text-on-surface group cursor-pointer shadow-xs"
                  >
                    <span className="font-sans text-[10px] text-outline uppercase font-semibold">Welcome Code:</span>
                    <code className="font-mono text-xs font-bold text-primary tracking-wider">ASRAFIRST</code>
                    <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">
                      content_copy
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Click to copy code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Link
              href="/offers"
              className="text-primary font-sans text-xs font-semibold hover:underline flex items-center gap-1 ml-1 uppercase tracking-wider"
            >
              <span>View All Privileges</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Wedding Journey Stage Finder */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface-container-low/40 overflow-hidden">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary font-semibold block mb-1">
                Shop By Celebration Stage
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal leading-tight">
                Curated for Every Wedding Milestone
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-sans text-xs text-on-surface font-semibold hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider w-fit"
            >
              <span>Browse All Milestones</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* Swipeable snap strip on mobile (< md), responsive grid on desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-5">
            {weddingCeremonies.map((stage, idx) => (
              <Link
                key={idx}
                href={stage.link}
                className="shrink-0 w-[240px] sm:w-[260px] md:w-auto snap-start group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 border border-outline-variant/30 flex flex-col"
              >
                <div className="aspect-[4/3] max-h-[160px] sm:max-h-[180px] w-full overflow-hidden bg-surface-container-low relative">
                  <img
                    src={stage.img}
                    alt={stage.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <Badge variant="outline" className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 bg-surface-container-lowest/90 backdrop-blur-md rounded border-0 font-mono text-[9px] tracking-widest uppercase font-bold text-on-surface shadow-xs">
                    {stage.tag}
                  </Badge>
                </div>
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-medium text-on-surface group-hover:text-primary transition-colors mb-0.5">
                      {stage.title}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs text-on-surface-variant line-clamp-1">
                      {stage.subtitle}
                    </p>
                  </div>
                  <div className="mt-2.5 sm:mt-3 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-primary font-sans font-semibold text-[10px] sm:text-[11px] group-hover:translate-x-0.5 transition-transform uppercase tracking-wider">
                    <span>Explore Stage Gifts</span>
                    <span className="material-symbols-outlined text-[14px] sm:text-[15px]">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Trending & Curated Products Grid */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1360px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary font-semibold block mb-1">
                Handpicked Favorites
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal leading-tight">
                Trending Wedding Keepsakes &amp; Favors
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-sans text-xs text-on-surface font-semibold hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider w-fit"
            >
              <span>View All ({PRODUCTS.length})</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </Link>
          </div>

          {/* Modern e-commerce standard 2-column layout on mobile, 3-column on tablet/desktop */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 w-full">
            {trendingProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} aspectRatio="square" />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Live Monogram Preview Studio (NEW USP FEATURE) */}
      <MonogramPreviewStudio />

      {/* Targeted Recipient Showcase */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary font-semibold block mb-1">
              Curated by Wedding Recipient
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal leading-tight">
              Thoughtfully Handcrafted for Every Sacred Bond
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
              From the blushing bride and stylish groom to bridal parties and parents, explore personalized collections created for each bond.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {/* 1. For Her */}
            <Link
              href="/shop?cat=for-her"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[3/4] max-h-[220px] sm:max-h-[280px] w-full overflow-hidden bg-surface-container relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="For Her Bridal Gifts"
                  src="/assets/cdn/img_c9193e0400dc.jpg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 text-surface flex flex-col justify-end">
                  <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary-fixed-dim mb-0.5 font-semibold">
                    Bride &amp; Maid
                  </span>
                  <h3 className="font-serif text-xs sm:text-base text-surface font-medium mb-0.5 leading-snug">
                    For Her: Grace
                  </h3>
                  <p className="font-body-sm text-[10px] sm:text-[11px] text-surface-container-high/90 mb-1 sm:mb-2 line-clamp-1">
                    Jewelry boxes, silk robes &amp; pendants.
                  </p>
                  <div className="flex items-center gap-1 font-label-md text-[10px] sm:text-xs text-primary-fixed group-hover:translate-x-1 transition-transform font-semibold">
                    <span>Explore For Her</span>
                    <span className="material-symbols-outlined text-[13px] sm:text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 2. For Him */}
            <Link
              href="/shop?cat=for-him"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[3/4] max-h-[220px] sm:max-h-[280px] w-full overflow-hidden bg-surface-container relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="For Him Groom Gifts"
                  src="/assets/cdn/img_8a5a665d4d2e.jpg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 text-surface flex flex-col justify-end">
                  <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary-fixed-dim mb-0.5 font-semibold">
                    Groom &amp; Men
                  </span>
                  <h3 className="font-serif text-xs sm:text-base text-surface font-medium mb-0.5 leading-snug">
                    For Him: Refined
                  </h3>
                  <p className="font-body-sm text-[10px] sm:text-[11px] text-surface-container-high/90 mb-1 sm:mb-2 line-clamp-1">
                    Timepieces, wallets &amp; cufflink vaults.
                  </p>
                  <div className="flex items-center gap-1 font-label-md text-[10px] sm:text-xs text-primary-fixed group-hover:translate-x-1 transition-transform font-semibold">
                    <span>Explore For Him</span>
                    <span className="material-symbols-outlined text-[13px] sm:text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 3. For Couples & Anniversaries */}
            <Link
              href="/shop?cat=couple"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[3/4] max-h-[220px] sm:max-h-[280px] w-full overflow-hidden bg-surface-container relative">
                <img
                  alt="Luxury wedding hampers for couples"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/assets/cdn/img_ecfddff03b93.jpg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 text-surface flex flex-col justify-end">
                  <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary-fixed-dim mb-0.5 font-semibold">
                    Milestones
                  </span>
                  <h3 className="font-serif text-xs sm:text-base text-surface font-medium mb-0.5 leading-snug">
                    Couples &amp; Sets
                  </h3>
                  <p className="font-body-sm text-[10px] sm:text-[11px] text-surface-container-high/90 mb-1 sm:mb-2 line-clamp-1">
                    Passport sets, crates &amp; song plaques.
                  </p>
                  <div className="flex items-center gap-1 font-label-md text-[10px] sm:text-xs text-primary-fixed group-hover:translate-x-1 transition-transform font-semibold">
                    <span>Explore Couples</span>
                    <span className="material-symbols-outlined text-[13px] sm:text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 4. Wedding Favors & Bulk Hampers */}
            <Link
              href="/bulk-orders"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[3/4] max-h-[220px] sm:max-h-[280px] w-full overflow-hidden bg-surface-container relative">
                <img
                  alt="Bulk wedding guest favors and hampers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/assets/cdn/img_56d7a2ebc8ba.jpg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 text-surface flex flex-col justify-end">
                  <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary-fixed-dim mb-0.5 font-semibold">
                    Volume (25–2000+)
                  </span>
                  <h3 className="font-serif text-xs sm:text-base text-surface font-medium mb-0.5 leading-snug">
                    Favors &amp; Bulk
                  </h3>
                  <p className="font-body-sm text-[10px] sm:text-[11px] text-surface-container-high/90 mb-1 sm:mb-2 line-clamp-1">
                    Custom guest name debossing &amp; tiered pricing.
                  </p>
                  <div className="flex items-center gap-1 font-label-md text-[10px] sm:text-xs text-primary-fixed group-hover:translate-x-1 transition-transform font-semibold">
                    <span>Explore Favors</span>
                    <span className="material-symbols-outlined text-[13px] sm:text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* High-Impact Bulk Wedding Favors Banner */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#1C1A17] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF4EB]/10 text-[#c5a880] rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold mb-3 w-fit border border-[#c5a880]/30 font-sans">
                <span className="material-symbols-outlined text-[15px]">inventory_2</span>
                Wedding Planners &amp; Volume Privileges
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF8F5] font-normal mb-3 leading-tight">
                Planning Wedding Favors for Your <span className="italic text-[#c5a880]">Special Guests</span>?
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#d5ccc0] mb-4 max-w-xl leading-relaxed">
                Whether you need 50 personalized leather luggage tags for destination guests, or 500 hand-poured botanical hampers, we deliver tiered volume discounts, personalized guest monograms, and direct delivery to your venue.
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-3 text-center">
                  <span className="font-serif text-base sm:text-xl text-[#c5a880] font-bold block leading-tight">15% OFF</span>
                  <span className="font-sans text-[9px] sm:text-[10px] text-[#b8aea3] uppercase tracking-wider">50–99 Units</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-3 text-center">
                  <span className="font-serif text-base sm:text-xl text-[#c5a880] font-bold block leading-tight">20% OFF</span>
                  <span className="font-sans text-[9px] sm:text-[10px] text-[#b8aea3] uppercase tracking-wider">100–249 Units</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-3 text-center">
                  <span className="font-serif text-base sm:text-xl text-[#c5a880] font-bold block leading-tight">25%+ OFF</span>
                  <span className="font-sans text-[9px] sm:text-[10px] text-[#b8aea3] uppercase tracking-wider">250+ Units</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/bulk-orders"
                  className="h-12 px-6 bg-primary text-on-primary font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-[#5f4b2d] active:scale-[0.98] transition-all shadow-xs text-center flex items-center justify-center cursor-pointer"
                >
                  Request Bulk Quote Dossier
                </Link>
                <a
                  href="https://wa.me/919692668263?text=Hi%20ASRA%2C%20I%20would%20like%20to%20inquire%20about%20bulk%20wedding%20favors."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-6 bg-[#25D366] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Wedding Stylist</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center w-full max-w-full">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black/40 p-3">
                <img
                  src="/assets/cdn/img_23f7486a1ad8.jpg"
                  alt="Wedding favor sample suite"
                  className="w-full aspect-[4/3] object-cover rounded-lg mb-2.5 max-h-[220px]"
                  loading="lazy"
                />
                <div className="flex items-center justify-between text-[11px] text-[#d5ccc0]">
                  <span className="flex items-center gap-1 font-sans text-[11px]">
                    <span className="material-symbols-outlined text-[15px] text-[#c5a880]">verified</span>
                    Complimentary sample kit
                  </span>
                  <span className="font-mono text-xs text-[#c5a880] font-semibold">ASRA B2B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Your Idea → We Create" Bespoke Studio Experience */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1360px] mx-auto bg-surface-container-lowest rounded-2xl p-4 sm:p-7 lg:p-8 shadow-xs border border-outline-variant/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Explainer Text */}
            <div className="lg:col-span-6 flex flex-col items-start w-full max-w-full">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF4EB] text-primary border border-primary/20 rounded font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold mb-2">
                <span className="material-symbols-outlined text-[14px]">brush</span>
                <span>Custom Design Service</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal mb-2 leading-tight">
                Your Idea → We Handcraft into Reality.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                Can't find the exact dimensions, monogram style, or packaging hue? Send us your wedding logo crest, sketches, or moodboard. Our master-craftsmen render a 3D digital proof within 6 hours.
              </p>

              {/* 3-Step Process */}
              <div className="flex flex-col gap-2.5 w-full mb-5">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="font-sans text-xs sm:text-sm font-semibold text-on-surface">
                      Share Your Vision / Upload Wedding Crest
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-on-surface-variant">
                      Send vector crests, dates, calligraphy font names or rough sketches.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="font-sans text-xs sm:text-sm font-semibold text-on-surface">
                      Digital 3D Proof &amp; Approval
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-on-surface-variant">
                      Review lifelike foil-embossed or laser-cut previews before dies are cast.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="font-sans text-xs sm:text-sm font-semibold text-on-surface">
                      Hand-finished &amp; Wax-Sealed Delivery
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-on-surface-variant">
                      Individual inspection, luxury velvet ribboning, and insured express dispatch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <a
                  className="h-12 px-6 bg-[#25D366] text-white rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
                  href="https://wa.me/919692668263"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Design Support</span>
                </a>

                <Link
                  href="/bespoke"
                  className="h-12 px-6 bg-surface-container-lowest border border-outline-variant/50 text-on-surface hover:border-primary hover:text-primary active:scale-[0.98] rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <span>Submit Custom Brief</span>
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-6 bg-surface-container-low rounded-xl p-3.5 sm:p-5 flex flex-col items-center justify-center relative w-full max-w-full overflow-hidden mt-4 lg:mt-0">
              <div className="w-full aspect-[4/3] max-h-[260px] rounded-lg overflow-hidden relative shadow-sm bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Artisan hands applying gold foil stamp"
                  src="/assets/cdn/img_9e12f2d44ec6.jpg"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-surface-container-lowest/90 backdrop-blur-md rounded-full shadow font-label-sm text-[10px] text-on-surface font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  <span>Workshop Live Studio</span>
                </div>
              </div>

              <div className="mt-3 w-full flex items-center justify-between px-1 text-on-surface-variant text-xs">
                <div className="flex items-center gap-1.5 font-label-sm text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  <span>No Minimum Order</span>
                </div>
                <div className="flex items-center gap-1.5 font-label-sm text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-primary">design_services</span>
                  <span>Free 3D Proof</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Verified Couples & Bride Stories - Swipeable on mobile */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface-container-low overflow-hidden">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-lg mx-auto mb-6">
            <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary font-semibold block mb-0.5">
              Loved by 3,500+ Couples
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal">
              Stories from the Wedding Canvas
            </h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-4">
            {/* Review 1 */}
            <div className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-start bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-xs border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-0.5 text-primary mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-xs sm:text-[13px] text-on-surface-variant italic mb-3 leading-relaxed font-normal">
                  "The custom initials leather passport and luggage sets were the highlight of our bridal party gifts! The gold foil quality was immaculate, and the team accommodated our quick deadline of 3 days."
                </p>
              </div>
              <div className="flex items-center gap-2.5 pt-2.5 border-t border-outline-variant/30">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-secondary-container text-on-secondary-container font-bold text-xs">
                    SS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-title-sm text-xs font-semibold leading-tight text-on-surface">
                    Sagil &amp; Shagufta
                  </h4>
                  <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block">
                    Destination Wedding • Udaipur
                  </span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-start bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-xs border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-0.5 text-primary mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-xs sm:text-[13px] text-on-surface-variant italic mb-3 leading-relaxed font-normal">
                  "We ordered the acrylic first dance plaque with our Spotify song. It now glows on our bedside every night. The wooden base engraving is so delicate and deeply meaningful. Truly unforgettable."
                </p>
              </div>
              <div className="flex items-center gap-2.5 pt-2.5 border-t border-outline-variant/30">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary-container text-on-primary-container font-bold text-xs">
                    JA
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-title-sm text-xs font-semibold leading-tight text-on-surface">
                    Jawed &amp; Asra
                  </h4>
                  <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block">
                    1st Anniversary • Bengaluru
                  </span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-start bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-xs border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-0.5 text-primary mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]">star</span>
                  ))}
                </div>
                <p className="font-body-md text-xs sm:text-[13px] text-on-surface-variant italic mb-3 leading-relaxed font-normal">
                  "The customized bridal party velvet jewelry boxes were packaged like luxury Parisian heirloom gifts. The wax seals and handwritten calligraphy cards made my bridesmaids cry happy tears!"
                </p>
              </div>
              <div className="flex items-center gap-2.5 pt-2.5 border-t border-outline-variant/30">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-tertiary-container text-on-tertiary-container font-bold text-xs">
                    SB
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-title-sm text-xs font-semibold leading-tight text-on-surface">
                    Miss Sultana Begum
                  </h4>
                  <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block">
                    Bride • Mumbai
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Buyer FAQ Accordion - Compact */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-5">
            <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary font-semibold block mb-0.5">
              Need Clarity?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p>{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-5">
            <Link
              href="/faq"
              className="text-primary font-label-md text-xs font-semibold hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Have more questions? Read Full FAQ Center</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Pillars Assurance Bar - Compact */}
      <section className="w-full py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-surface-container-low/50 border-t border-outline-variant/40">
        <div className="max-w-[1360px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-surface-container-lowest shadow-xs flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">handshake</span>
            </div>
            <div>
              <h4 className="font-title-sm text-xs font-semibold text-on-surface leading-tight">
                100% Customized Craft
              </h4>
              <p className="font-body-sm text-[10px] sm:text-[11px] text-outline">Every piece personalized with brass dies</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-surface-container-lowest shadow-xs flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">local_shipping</span>
            </div>
            <div>
              <h4 className="font-title-sm text-xs font-semibold text-on-surface leading-tight">
                Insured Express Delivery
              </h4>
              <p className="font-body-sm text-[10px] sm:text-[11px] text-outline">Across India &amp; 40+ countries</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-surface-container-lowest shadow-xs flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">inventory_2</span>
            </div>
            <div>
              <h4 className="font-title-sm text-xs font-semibold text-on-surface leading-tight">
                Wax-Sealed Gift Wrap
              </h4>
              <p className="font-body-sm text-[10px] sm:text-[11px] text-outline">Complimentary unboxing grace</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-surface-container-lowest shadow-xs flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">support_agent</span>
            </div>
            <div>
              <h4 className="font-title-sm text-xs font-semibold text-on-surface leading-tight">
                Dedicated Personal Stylist
              </h4>
              <p className="font-body-sm text-[10px] sm:text-[11px] text-outline">Live 1-on-1 assistance via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
