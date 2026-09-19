"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';


const RECOMMENDATIONS = [
  {
    id: 'crystal-toasting-flutes',
    slug: 'personalized',
    title: 'Etched Crystal Toasting Flutes',
    category: 'bridal-trousseau',
    categoryName: 'Bridal Wedding Essentials',
    tag: 'Flutes',
    material: 'Crystal',
    price: 2199,
    originalPrice: 2899,
    description: 'Bohemian lead-free crystal with couple initials.',
    customizations: [
      { label: 'Crystal', value: 'Lead-Free Bohemian' },
      { label: 'Etching', value: '"A & S" Laser Initials' }
    ]
  },
  {
    id: 'pure-silk-robe',
    slug: 'wedding-keepsakes',
    title: 'Initials Pure Silk Robe',
    category: 'bridal-trousseau',
    categoryName: 'Bridal Wedding Essentials',
    tag: 'Silk Robe',
    material: 'Champagne',
    price: 3499,
    originalPrice: 4299,
    description: '22 Momme French silk with metallic gold thread embroidery.',
    customizations: [
      { label: 'Silk Grade', value: '6A 22 Momme French Silk' },
      { label: 'Thread', value: '24k Metallic Gold Embroidery' }
    ]
  },
  {
    id: 'carved-teakwood-registry',
    slug: 'bespoke',
    title: 'Carved Teakwood Guest Registry',
    category: 'heirloom-vaults',
    categoryName: 'Heirloom Vaults',
    tag: 'Guest Book',
    material: 'Teakwood',
    price: 2899,
    originalPrice: 3599,
    description: 'Solid seasoned wood cover with laser-etched floral crest.',
    customizations: [
      { label: 'Wood', value: 'Solid Seasoned Indian Teakwood' },
      { label: 'Binding', value: 'Genuine Full-Grain Leather' }
    ]
  }
];

const WishlistPage = () => {
  const { 
    wishlistItems, 
    wishlistCount, 
    totalWishlistValue, 
    categoryCounts, 
    removeFromWishlist, 
    addToWishlist, 
    isInWishlist 
  } = useWishlist();
  
  const { addToCart, showToast, setIsCartDrawerOpen } = useCart();
  const navigate = useRouter();

  // Category filter tab state
  const [activeTab, setActiveTab] = useState('all');

  // Copy state for Registry Link
  const [copiedLink, setCopiedLink] = useState(false);

  // Modal states
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDieProtocolModalOpen, setIsDieProtocolModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const registryUrl = 'https://asraweddingcanvas.com/registry/asra-shahnawaz-2026';

  // Copy handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(registryUrl);
    setCopiedLink(true);
    showToast('Ceremony Registry link copied to clipboard!');
    setTimeout(() => {
      setCopiedLink(false);
    }, 2500);
  };

  // Filter items by category
  const filteredItems = wishlistItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  // Transfer all current items to cart
  const handleTransferAllToBag = () => {
    if (filteredItems.length === 0) {
      showToast('No heirlooms to transfer in this view.');
      return;
    }

    filteredItems.forEach(item => {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        categoryLabel: item.categoryName || 'Customized Gift',
        badge: item.badge || 'Ceremony Heirloom',
        brideName: 'Asra Ansari',
        groomName: 'Sk Shahnawaz Ali',
        weddingDate: '18th November 2026',
        monogramDie: '"A & S" • Classic Crest'
      });
    });

    showToast(`Transferred ${filteredItems.length} heirlooms into your Collection Bag!`);
    setIsCartDrawerOpen(true);
  };

  // Move single item to bag
  const handleMoveToBag = (item) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      categoryLabel: item.categoryName || 'Customized Gift',
      badge: item.badge || 'Ceremony Heirloom',
      brideName: 'Asra Ansari',
      groomName: 'Sk Shahnawaz Ali',
      weddingDate: '18th November 2026',
      monogramDie: item.customizations?.find(c => c.label === 'Initials')?.value || '"A & S" • Classic Crest'
    });
    showToast(`"${item.title}" moved to your Collection Bag!`);
  };

  // Remove single item with feedback
  const handleRemoveItem = (item) => {
    removeFromWishlist(item.id);
    showToast(`"${item.title}" removed from your Wishlist.`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface selection:bg-primary/20 selection:text-on-surface font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* TOP MINIMAL COLLECTION UTILITY BAR (STRICTLY NO GLOBAL HEADER)               */}
      {/* ========================================================================= */}
      <header className="w-full bg-surface border-b border-outline-variant/30 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Return Link */}
          <Link 
            href="/collections" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors font-medium group"
          >
            <span className="material-symbols-outlined w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary">arrow_back</span>
            <span className="hidden sm:inline">Return to Collection Collections</span>
            <span className="sm:hidden">Collections</span>
          </Link>

          {/* Centered Official ASRA Logo */}
          <Link href="/" className="flex flex-col items-center">
            <img 
              src="/assets/cdn/img_0e64e51cb5ac.png" 
              alt="ASRA Wedding Canvas Logo" 
              className="h-9 sm:h-11 md:h-12 w-auto object-contain drop-shadow-sm hover:opacity-95 transition-opacity" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.nextSibling) (target.nextSibling as HTMLElement).style.display = 'block';
              }}
            />
            <span className="hidden font-serif text-xl tracking-[0.2em] font-semibold text-on-surface">
              ASRA <span className="font-light italic text-primary">Canvas</span>
            </span>
          </Link>

          {/* Trust Badges & Sharing Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs tracking-wider">
            <div className="hidden md:flex items-center gap-2 bg-white/80 border border-outline-variant/30 px-3 py-1.5 rounded-full text-on-surface font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[11px] uppercase text-on-surface-variant">Customized Vault Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant bg-white/60 sm:bg-transparent px-2.5 sm:px-0 py-1 sm:py-0 rounded-full border sm:border-0 border-outline-variant/30">
              <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">lock</span>
              <span className="text-[11px] uppercase tracking-wider">Private Registry</span>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN WISHLIST CONTENT                                                     */}
      {/* ========================================================================= */}
      <main className="flex-grow max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        
        {/* PAGE TITLE & CEREMONY BANNER */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold mb-3 sm:mb-4">
            <span className="material-symbols-outlined w-3 h-3 text-primary">sparkles</span>
            <span>Curated Ceremony Registry & Gifts</span>
            <span className="material-symbols-outlined w-3 h-3 text-primary">sparkles</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-3">
            Saved Gifts & <span className="italic font-light">Wedding Essentials Wishlist</span>
          </h1>
          <p className="text-xs sm:text-base text-on-surface-variant leading-relaxed font-light max-w-2xl mx-auto px-2">
            Your hand-selected ceremonial heirlooms, custom brass initials dies, and bridal gifts securely vaulted for <span className="text-on-surface font-medium">Asra & Shahnawaz’s Wedding Registry</span>.
          </p>

          {/* Registry Metadata Quick Pill Bar */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-6 bg-white/90 border border-outline-variant/30 p-3 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl shadow-xs text-xs text-on-surface-variant text-left sm:text-center">
            <div>
              <span className="uppercase tracking-wider text-[9px] sm:text-[10px] text-primary font-semibold block">Registry ID</span>
              <span className="font-mono text-on-surface font-medium text-[11px] sm:text-xs">ASRA-REG-2026-9921</span>
            </div>
            <div className="h-6 w-px bg-[#E8E1D7] hidden sm:block"></div>
            <div>
              <span className="uppercase tracking-wider text-[9px] sm:text-[10px] text-primary font-semibold block">Curated Items</span>
              <span className="text-on-surface font-medium text-[11px] sm:text-xs">{wishlistCount} Heirlooms</span>
            </div>
            <div className="h-6 w-px bg-[#E8E1D7] hidden sm:block"></div>
            <div>
              <span className="uppercase tracking-wider text-[9px] sm:text-[10px] text-primary font-semibold block">Estimated Value</span>
              <span className="text-on-surface font-semibold text-[11px] sm:text-xs">₹{totalWishlistValue.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-6 w-px bg-[#E8E1D7] hidden sm:block"></div>
            <div>
              <span className="uppercase tracking-wider text-[9px] sm:text-[10px] text-primary font-semibold block">Brass Die Status</span>
              <span className="text-emerald-700 font-medium text-[11px] sm:text-xs">"A & S" Ready to Mill</span>
            </div>
          </div>
        </div>

        {/* ACTION CONTROLS & FILTER BAR */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-outline-variant/30 p-2.5 sm:p-4 mb-6 sm:mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 shadow-xs">
          
          {/* Tabs / Categories */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 text-xs font-medium uppercase tracking-wider no-scrollbar">
            <button 
              onClick={() => setActiveTab('all')}
              className={`min-h-[40px] px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl whitespace-nowrap transition-all duration-200 active:scale-95 text-[11px] sm:text-xs ${
                activeTab === 'all'
                  ? 'bg-[#1A1817] text-white shadow-xs'
                  : 'bg-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Saved ({categoryCounts.all})
            </button>
            <button 
              onClick={() => setActiveTab('bridal-wedding essentials')}
              className={`min-h-[40px] px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl whitespace-nowrap transition-all duration-200 active:scale-95 text-[11px] sm:text-xs ${
                activeTab === 'bridal-wedding essentials'
                  ? 'bg-[#1A1817] text-white shadow-xs'
                  : 'bg-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Bridal Essentials ({categoryCounts['bridal-wedding essentials']})
            </button>
            <button 
              onClick={() => setActiveTab('heirloom-vaults')}
              className={`min-h-[40px] px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl whitespace-nowrap transition-all duration-200 active:scale-95 text-[11px] sm:text-xs ${
                activeTab === 'heirloom-vaults'
                  ? 'bg-[#1A1817] text-white shadow-xs'
                  : 'bg-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Heirloom Vaults ({categoryCounts['heirloom-vaults']})
            </button>
            <button 
              onClick={() => setActiveTab('guest-favors')}
              className={`min-h-[40px] px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl whitespace-nowrap transition-all duration-200 active:scale-95 text-[11px] sm:text-xs ${
                activeTab === 'guest-favors'
                  ? 'bg-[#1A1817] text-white shadow-xs'
                  : 'bg-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Guest Favors ({categoryCounts['guest-favors']})
            </button>
          </div>

          {/* Right Bulk Actions */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
            
            {/* Share Wishlist with Planner or WhatsApp */}
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 md:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-outline-variant/30 hover:border-primary bg-surface/70 hover:bg-surface text-xs text-on-surface font-medium tracking-wide transition active:scale-95"
            >
              <span className="material-symbols-outlined w-4 h-4 text-primary">share</span>
              <span className="truncate">Share with Planner</span>
            </button>

            {/* Move All to Bag CTA */}
            <button 
              onClick={handleTransferAllToBag}
              className="flex-1 md:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 rounded-lg sm:rounded-xl bg-[#1A1817] hover:bg-black text-white text-xs font-semibold tracking-wider uppercase shadow-xs hover:shadow transition active:scale-95"
            >
              <span className="material-symbols-outlined w-4 h-4 text-primary">shopping_bag</span>
              <span className="truncate">Transfer All</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* WISHLIST CARDS GRID (2-column on mobile, 4-column on desktop)            */}
        {/* ========================================================================= */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-outline-variant/30 p-8 sm:p-12 text-center max-w-xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center mx-auto mb-4 text-primary">
              <span className="material-symbols-outlined w-8 h-8 stroke-[1.5]">favorite</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface">No Saved Heirlooms In This Category</h3>
            <p className="text-xs text-on-surface-variant mt-2 mb-6 max-w-md mx-auto leading-relaxed">
              {activeTab !== 'all' 
                ? 'There are no heirlooms under this specific ceremonial category right now. View all items or discover our collection suites.'
                : 'Your private registry vault is empty. Browse our wedding gifts and wedding essentials collections to curate your sacred pieces.'
              }
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {activeTab !== 'all' && (
                <button
                  onClick={() => setActiveTab('all')}
                  className="min-h-[44px] px-5 py-2.5 bg-surface border border-outline-variant/30 rounded-xl text-xs font-semibold text-on-surface hover:border-primary transition active:scale-95"
                >
                  View All Saved ({wishlistCount})
                </button>
              )}
              <Link
                href="/shop"
                className="min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 bg-[#1A1817] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition shadow-sm active:scale-95"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 mb-12">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-outline-variant/30 p-2.5 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group relative"
              >
                {/* Remove / Unheart Button */}
                <button 
                  onClick={() => handleRemoveItem(item)}
                  title="Remove from Wishlist" 
                  aria-label="Remove from Wishlist"
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-9 h-9 min-w-[36px] min-h-[36px] sm:w-8 sm:h-8 rounded-full bg-white/95 border border-outline-variant/30 flex items-center justify-center text-red-500 hover:bg-red-50 active:scale-90 transition shadow-xs group-hover:border-red-200"
                >
                  <span className="material-symbols-outlined w-4 h-4 fill-current">favorite</span>
                </button>

                <div>
                  {/* Visual Display: Image or Specialized Graphic */}
                  {item.isEmeraldVaultVisual ? (
                    <div className="relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#133E2B] text-white flex flex-col items-center justify-center p-3 sm:p-6 text-center mb-2.5 sm:mb-4 shadow-inner">
                      <div className="border border-primary/50 p-3 sm:p-6 rounded-lg w-full h-full flex flex-col items-center justify-center">
                        <span className="font-serif text-lg sm:text-2xl tracking-widest text-[#E8D5B5]">A & S</span>
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-primary/80 mt-0.5 sm:mt-1">EMERALD SILK VAULT</span>
                        <div className="w-5 sm:w-6 h-px bg-primary/40 my-1.5 sm:my-2"></div>
                        <span className="text-[9px] sm:text-[10px] text-white/70">Solid Brass Latch</span>
                      </div>
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm border border-white/20 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] uppercase font-semibold text-white">
                        {item.badge}
                      </div>
                    </div>
                  ) : item.isVowBookVisual ? (
                    <div className="relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#F5EFE6] flex flex-col items-center justify-center p-3 sm:p-6 text-center mb-2.5 sm:mb-4 border border-outline-variant/30">
                      <div className="w-3/4 h-5/6 bg-surface border border-[#DDD3C4] shadow-md rounded p-2 sm:p-4 flex flex-col justify-between">
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-on-surface-variant">His & Her Vows</span>
                        <div className="font-serif italic text-xs sm:text-lg text-on-surface">"Our Sacred Covenant"</div>
                        <span className="text-[7px] sm:text-[8px] text-primary font-semibold">Hand-Poured Cotton</span>
                      </div>
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-white/90 border border-outline-variant/30 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] uppercase font-semibold text-on-surface">
                        {item.badge}
                      </div>
                    </div>
                  ) : item.isHamperVisual ? (
                    <div className="relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#2D2825] text-white flex flex-col items-center justify-center p-3 sm:p-6 text-center mb-2.5 sm:mb-4">
                      <div className="w-full h-full border border-primary/40 rounded-lg flex flex-col items-center justify-center p-2 sm:p-4">
                        <span className="text-primary text-xl sm:text-2xl font-serif">✦ ✦ ✦</span>
                        <span className="font-serif text-sm sm:text-xl text-[#E8D5B5] mt-1 sm:mt-2 text-center">Palatial Room Favors</span>
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/70 mt-0.5 sm:mt-1">Tiered Support</span>
                      </div>
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-primary/90 text-white px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] uppercase font-semibold">
                        {item.badge}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-surface mb-2.5 sm:mb-4">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-white/90 backdrop-blur-sm border border-outline-variant/30/80 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded text-[8px] sm:text-[10px] uppercase font-semibold tracking-wider text-on-surface truncate max-w-[85%]">
                        {item.badge}
                      </div>
                      {item.subBadge && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary/90 text-white px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">
                          {item.subBadge}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="mb-2 sm:mb-4">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-primary font-semibold block truncate">
                      {item.editionBadge}
                    </span>
                    <Link href={item.slug ? `/product/${item.slug}` : '/shop'}>
                      <h3 className="font-serif text-xs sm:text-base font-medium leading-snug text-on-surface mt-0.5 sm:mt-1 hover:text-primary transition line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="hidden sm:block text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Customization Tags */}
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="bg-surface/80 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-outline-variant/30/60 text-[10px] sm:text-xs mb-2.5 sm:mb-4 space-y-1 sm:space-y-1.5">
                      {item.customizations.map((c, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] sm:text-[11px] gap-1">
                          <span className="text-on-surface-variant shrink-0">{c.label}:</span>
                          <span className={`font-medium ${c.highlight ? 'text-emerald-700' : 'text-on-surface'} flex items-center gap-1 truncate text-right`}>
                            {c.colorDot && (
                              <span 
                                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black/10 inline-block shrink-0" 
                                style={{ backgroundColor: c.colorDot }}
                              />
                            )}
                            <span className="truncate">{c.value}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing & Action Button */}
                <div className="pt-2 border-t border-outline-variant/20 sm:border-t-0 sm:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 sm:mb-3 gap-0.5">
                    <div className="flex items-baseline flex-wrap gap-1">
                      <span className="text-sm sm:text-lg font-bold text-on-surface">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] sm:text-xs text-on-surface-variant line-through">
                          ₹{item.originalPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {item.savings ? (
                      <span className="text-[9px] sm:text-[11px] text-emerald-700 font-medium whitespace-nowrap">Save ₹{item.savings.toLocaleString('en-IN')}</span>
                    ) : item.priceSubtitle ? (
                      <span className="text-[9px] sm:text-[11px] text-primary font-medium truncate">{item.priceSubtitle}</span>
                    ) : null}
                  </div>

                  <button 
                    onClick={() => handleMoveToBag(item)}
                    className="w-full min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-lg sm:rounded-xl bg-[#1A1817] hover:bg-black text-white text-[11px] sm:text-xs uppercase font-semibold tracking-wider transition shadow-2xs hover:shadow active:scale-95"
                  >
                    <span className="material-symbols-outlined w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary">shopping_bag</span>
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* LOWER REGISTRY COLLABORATION & STYLIST HOTLINE SECTION (3 COLUMNS)        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Box 1: Registry Share with Wedding Guests or Architect */}
          <div className="bg-white rounded-2xl border border-outline-variant/30 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined w-5 h-5">share</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface mb-1">Collaborative Registry Link</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4 font-light">
                Share this private URL directly with your bridal party, parents, or wedding architect to coordinate customized gifts and avoid duplicates.
              </p>
              <div className="flex items-center gap-2 bg-surface rounded-xl p-2 border border-outline-variant/30">
                <input 
                  type="text" 
                  readOnly 
                  value={registryUrl} 
                  className="bg-transparent text-xs text-on-surface flex-grow px-2 outline-none font-mono selection:bg-primary/20 min-h-[40px]" 
                />
                <button 
                  onClick={handleCopyLink}
                  className="bg-white min-h-[40px] px-3.5 py-2 rounded-lg border border-outline-variant/30 text-xs font-semibold text-on-surface hover:text-primary shadow-2xs transition active:scale-95 flex items-center gap-1.5"
                >
                  {copiedLink ? (
                    <>
                      <span className="material-symbols-outlined w-4 h-4 text-emerald-600">check</span>
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined w-4 h-4 text-on-surface-variant">content_copy</span>
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/30/60 flex items-center justify-between text-[11px] text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">lock</span>
                Protected with 256-Bit Vaulting
              </span>
              <span className="text-emerald-700 font-medium">PIN Protection On</span>
            </div>
          </div>

          {/* Box 2: Brass Die & Archival Guarantee */}
          <div className="bg-white rounded-2xl border border-outline-variant/30 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined w-5 h-5">verified_user</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface mb-1">Customized Metallurgy Vault</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4 font-light">
                All wishlisted customized items automatically link your custom couple initials die code <span className="font-semibold text-on-surface">"A & R"</span> so single casting applies across all pieces with zero re-casting charges.
              </p>
              <ul className="text-xs space-y-2 text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✔</span>
                  <span>5-Year Complimentary Archival in Hyderabad Collection</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✔</span>
                  <span>Unlimited Digital WhatsApp Vector Calibration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✔</span>
                  <span>Save ₹1,500 on all future anniversary gifts</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/30/60">
              <button 
                onClick={() => setIsDieProtocolModalOpen(true)}
                className="min-h-[44px] inline-flex items-center text-xs text-primary font-semibold uppercase tracking-wider hover:underline gap-1 active:scale-95"
              >
                <span>Read Die Vaulting Protocol</span>
                <span className="material-symbols-outlined w-4 h-4">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Box 3: WhatsApp Senior Stylist Hotline */}
          <div className="bg-[#2D2825] text-white rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#E8D5B5] mb-4">
                <span className="material-symbols-outlined w-5 h-5 text-emerald-400">chat</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">Support Support</span>
              <h4 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-white mb-2">Need Guidance from a Stylist?</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6 font-light">
                Reviewing wedding essentials pairings, urgent delivery timelines, or bulk favor quantities for Udaipur? Our lead bridal stylist is on call.
              </p>
            </div>

            <div>
              <a 
                href="https://wa.me/919692668263?text=Hi%20ASRA%20Team%2C%20I%20would%20like%20guidance%20on%20my%20Wedding%20Registry%20(ASRA-REG-2026-9921)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold tracking-wider transition shadow active:scale-95"
              >
                <span>Chat with Lead Stylist on WhatsApp</span>
                <span className="material-symbols-outlined w-4 h-4">chevron_right</span>
              </a>
              <div className="flex items-center justify-between text-[11px] text-white/50 mt-3">
                <span>Direct Line: +91 96926 68263</span>
                <span>Avg Reply: &lt; 5 mins</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RECOMMENDED TO COMPLEMENT YOUR WISHLIST (COLLECTION PICKS)                   */}
        {/* ========================================================================= */}
        <div className="border-t border-outline-variant/30 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">Collection Recommendations</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
                Complete the Bridal Suite
              </h3>
            </div>
            <Link 
              href="/collections" 
              className="min-h-[36px] inline-flex items-center text-xs font-semibold uppercase tracking-wider text-on-surface hover:text-primary gap-1 transition active:scale-95"
            >
              <span>Explore All Collections</span>
              <span className="material-symbols-outlined w-4 h-4">chevron_right</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {RECOMMENDATIONS.map((rec) => {
              const alreadyInWishlist = isInWishlist(rec.id);
              return (
                <div 
                  key={rec.id}
                  className="bg-white rounded-2xl border border-outline-variant/30 p-4 flex items-center gap-4 hover:border-primary transition group shadow-2xs"
                >
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center text-center p-2 flex-shrink-0">
                    <span className="text-[10px] uppercase font-serif text-primary font-bold">{rec.tag}</span>
                    <span className="text-[9px] text-on-surface-variant mt-1">{rec.material}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-serif text-sm sm:text-base font-medium text-on-surface group-hover:text-primary transition leading-tight truncate">
                      {rec.title}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant line-clamp-1">{rec.description}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className="text-xs font-bold text-on-surface whitespace-nowrap">₹{rec.price.toLocaleString('en-IN')}</span>
                      <button 
                        onClick={() => {
                          if (alreadyInWishlist) {
                            showToast(`"${rec.title}" is already in your ceremony wishlist.`);
                          } else {
                            addToWishlist(rec);
                            showToast(`"${rec.title}" added to your Wishlist!`);
                          }
                        }}
                        className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition active:scale-95 ${
                          alreadyInWishlist
                            ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                            : 'text-primary bg-primary/10 hover:bg-primary/20'
                        }`}
                      >
                        {alreadyInWishlist ? '✓ In Wishlist' : '+ Add'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* MINIMAL CONFIDENTIALITY & LEGAL BAR (STRICTLY NO GLOBAL FOOTER)           */}
      {/* ========================================================================= */}
      <footer className="w-full bg-surface border-t border-outline-variant/30 py-4 mt-8">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-on-surface-variant gap-3">
          <div className="flex items-center gap-2 font-medium text-center sm:text-left">
            <span className="text-on-surface uppercase tracking-wider">ASRA Wedding Canvas</span>
            <span>•</span>
            <span>Private Bridal Registry & Heirloom Vaults</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="min-h-[36px] inline-flex items-center hover:text-on-surface transition hover:underline"
            >
              Registry Privacy Protocol
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsDieProtocolModalOpen(true)}
              className="min-h-[36px] inline-flex items-center hover:text-on-surface transition hover:underline"
            >
              Customized Initials Guarantee
            </button>
            <span>•</span>
            <span className="text-on-surface">© 2026 ASRA Private Limited</span>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL 1: SHARE REGISTRY MODAL                                             */}
      {/* ========================================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-outline-variant/30 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 transition"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined w-5 h-5">close</span>
            </button>

            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined w-6 h-6">share</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mb-1">
              Share Ceremony Registry
            </h3>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              Enable your wedding architect, parents, or bridal party to review your curated heirlooms with custom initials code <strong className="text-on-surface">"A & S"</strong>.
            </p>

            {/* Direct Copy Section */}
            <div className="mb-6">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant block mb-2">
                Private Vault URL
              </label>
              <div className="flex items-center gap-2 bg-surface rounded-xl p-2.5 border border-outline-variant/30">
                <input 
                  type="text" 
                  readOnly 
                  value={registryUrl} 
                  className="bg-transparent text-xs text-on-surface flex-grow px-2 outline-none font-mono min-h-[40px]" 
                />
                <button 
                  onClick={handleCopyLink}
                  className="min-h-[44px] px-4 py-2 bg-[#1A1817] text-white rounded-lg text-xs font-semibold hover:bg-black active:scale-95 transition flex items-center gap-1.5"
                >
                  {copiedLink ? (
                    <>
                      <span className="material-symbols-outlined w-3.5 h-3.5 text-emerald-400">check</span>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined w-3.5 h-3.5">content_copy</span>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3 mb-6">
              <a 
                href={`https://wa.me/919692668263?text=${encodeURIComponent(`Review our curated ASRA Wedding Registry & Gifts for Asra & Shahnawaz: ${registryUrl}`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full min-h-[48px] flex items-center justify-between p-3.5 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-surface/60 active:scale-98 transition text-xs text-on-surface font-medium"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined w-5 h-5 text-emerald-600">chat</span>
                  <span>Share on WhatsApp with Bridal Party</span>
                </span>
                <span className="material-symbols-outlined w-4 h-4 text-on-surface-variant">open_in_new</span>
              </a>

              <a 
                href={`mailto:?subject=${encodeURIComponent("Asra & Shahnawaz's Wedding Registry — ASRA Collection")}&body=${encodeURIComponent(`Dear Planner,\n\nPlease review our hand-selected ceremonial gifts and custom brass initials die code for our upcoming wedding:\n\n${registryUrl}\n\nWarmly,\nAsra & Shahnawaz`)}`}
                className="w-full min-h-[48px] flex items-center justify-between p-3.5 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-surface/60 active:scale-98 transition text-xs text-on-surface font-medium"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined w-5 h-5 text-primary">share</span>
                  <span>Send Docket to Wedding Planner via Email</span>
                </span>
                <span className="material-symbols-outlined w-4 h-4 text-on-surface-variant">open_in_new</span>
              </a>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between text-[11px] text-on-surface-variant">
              <span>PIN Protection: Enabled</span>
              <span className="text-emerald-700 font-medium">Auto-Syncing Active</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DIE VAULTING PROTOCOL MODAL                                      */}
      {/* ========================================================================= */}
      {isDieProtocolModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-outline-variant/30 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsDieProtocolModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 transition"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined w-5 h-5">close</span>
            </button>

            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined w-6 h-6">verified_user</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mb-1">
              Customized Metallurgy Vault Protocol
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-primary font-semibold block mb-4">
              Protocol Ref: ASRA-METALLURGY-2026-AS
            </span>

            <div className="space-y-4 text-xs text-on-surface leading-relaxed">
              <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                <h5 className="font-semibold text-on-surface mb-1">1. Custom 3D CNC Metallurgy Die Casting</h5>
                <p className="text-on-surface-variant">
                  Every customized order featuring the "A & S" couple crest is machined from solid marine-grade brass using high-precision 5-axis CNC cutters. This die creates high-relief hot foil and blind debossing impressions across hatboxes, vow booklets, and leather folios.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                <h5 className="font-semibold text-on-surface mb-1">2. 5-Year Climate-Controlled Archival</h5>
                <p className="text-on-surface-variant">
                  Your physical brass die is catalogued with barcode <strong className="text-on-surface">ASRA-REG-2026-9921</strong> and preserved in our Hyderabad collection’s climate-controlled metallurgy vault. Any subsequent order (anniversary invitations, baby announcements, customized stationery) bypasses all die casting fees.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                <h5 className="font-semibold text-on-surface mb-1">3. Optional Physical Release</h5>
                <p className="text-on-surface-variant">
                  Following wedding fulfillment, patrons may request physical dispatch of their custom brass die presented in a hand-crafted Sheesham wood presentation casket.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-end">
              <button 
                onClick={() => setIsDieProtocolModalOpen(false)}
                className="min-h-[44px] px-6 py-2.5 bg-[#1A1817] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black active:scale-95 transition"
              >
                Close Protocol Docket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: REGISTRY PRIVACY & NDA PROTOCOL MODAL                            */}
      {/* ========================================================================= */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-outline-variant/30 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 transition"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined w-5 h-5">close</span>
            </button>

            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined w-6 h-6">lock</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mb-1">
              Registry Privacy & Confidentiality
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-primary font-semibold block mb-4">
              ASRA High-Net-Worth Bridal NDA Covenant
            </span>

            <div className="space-y-4 text-xs text-on-surface leading-relaxed">
              <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                <h5 className="font-semibold text-on-surface mb-1">1. Pre-Event Embargo Guarantee</h5>
                <p className="text-on-surface-variant">
                  No photographs, proofs, or calligraphy layouts of your wedding essentials or gifts will be published across ASRA social channels, editorial lookbooks, or digital media prior to your wedding day completion.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                <h5 className="font-semibold text-on-surface mb-1">2. 256-Bit Vaulting</h5>
                <p className="text-on-surface-variant">
                  All vector initials, family crest designs, and personal vows are secured behind 256-bit encrypted data dockets, accessible solely by the assigned master engraver and collection manager.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                <h5 className="font-semibold text-on-surface mb-1">3. Direct Courier Verification</h5>
                <p className="text-on-surface-variant">
                  Deliveries to palace destinations (Udaipur, Jaipur, Mussoorie) require dual pin authorization and signature verification by your nominated wedding architect.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-end">
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="min-h-[44px] px-6 py-2.5 bg-[#1A1817] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black active:scale-95 transition"
              >
                Acknowledge Privacy Terms
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WishlistPage;

