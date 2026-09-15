import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Share2, 
  Lock, 
  Sparkles, 
  Check, 
  Copy, 
  ShieldCheck, 
  MessageCircle, 
  X, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

const RECOMMENDATIONS = [
  {
    id: 'crystal-toasting-flutes',
    slug: 'personalized',
    title: 'Etched Crystal Toasting Flutes',
    category: 'bridal-trousseau',
    categoryName: 'Bridal Trousseau',
    tag: 'Flutes',
    material: 'Crystal',
    price: 2199,
    originalPrice: 2899,
    description: 'Bohemian lead-free crystal with couple monogram.',
    customizations: [
      { label: 'Crystal', value: 'Lead-Free Bohemian' },
      { label: 'Etching', value: '"A & S" Laser Monogram' }
    ]
  },
  {
    id: 'pure-silk-robe',
    slug: 'wedding-keepsakes',
    title: 'Monogrammed Pure Silk Robe',
    category: 'bridal-trousseau',
    categoryName: 'Bridal Trousseau',
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
  const navigate = useNavigate();

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
        categoryLabel: item.categoryName || 'Bespoke Keepsake',
        badge: item.badge || 'Ceremony Heirloom',
        brideName: 'Asra Ansari',
        groomName: 'Sk Shahnawaz Ali',
        weddingDate: '18th November 2026',
        monogramDie: '"A & S" • Heritage Crest'
      });
    });

    showToast(`Transferred ${filteredItems.length} heirlooms into your Atelier Bag!`);
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
      categoryLabel: item.categoryName || 'Bespoke Keepsake',
      badge: item.badge || 'Ceremony Heirloom',
      brideName: 'Asra Ansari',
      groomName: 'Sk Shahnawaz Ali',
      weddingDate: '18th November 2026',
      monogramDie: item.customizations?.find(c => c.label === 'Monogram')?.value || '"A & S" • Heritage Crest'
    });
    showToast(`"${item.title}" moved to your Atelier Bag!`);
  };

  // Remove single item with feedback
  const handleRemoveItem = (item) => {
    removeFromWishlist(item.id);
    showToast(`"${item.title}" removed from your Wishlist.`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] text-[#2D2825] selection:bg-[#C5A059]/20 selection:text-[#2D2825] font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* TOP MINIMAL ATELIER UTILITY BAR (STRICTLY NO GLOBAL HEADER)               */}
      {/* ========================================================================= */}
      <header className="w-full bg-[#FAF7F2] border-b border-[#E8E1D7] sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          
          {/* Return Link */}
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7E766D] hover:text-[#1A1817] transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C5A059]" />
            <span className="hidden sm:inline">Return to Atelier Collections</span>
            <span className="sm:hidden">Collections</span>
          </Link>

          {/* Centered Official ASRA Logo */}
          <Link to="/" className="flex flex-col items-center">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9hYgo8EKCHyiF4KUZ-NtMMTvrMi_AdYFg0C-RWq_dHrCDlO8GunL1Vh71GwiDLAKTj8DxaI1G3K-FBBzKR9kcuSEeYypgcxf0nGkdiPbn679zalowRLmhuDiQzoPBPP5b9Dd_YHq7cCh2-UcSFc7CVyB_JkfsNKCh50dpUV-OK0ksCD9d4fJyf-WWZsDcKsS6birIDrhuShe75sZyM7WVXTa3OxGAmn2mFTiNCQmJoSiu0vE9zme-Mtwf0z9OCkE4W8E" 
              alt="ASRA Wedding Canvas Logo" 
              className="h-9 sm:h-11 md:h-12 w-auto object-contain drop-shadow-sm hover:opacity-95 transition-opacity" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden font-serif text-xl tracking-[0.2em] font-semibold text-[#1A1817]">
              ASRA <span className="font-light italic text-[#C5A059]">Canvas</span>
            </span>
          </Link>

          {/* Trust Badges & Sharing Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs tracking-wider">
            <div className="hidden md:flex items-center gap-2 bg-white/80 border border-[#E8E1D7] px-3 py-1.5 rounded-full text-[#2D2825] font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[11px] uppercase text-[#7E766D]">Bespoke Vault Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#7E766D] bg-white/60 sm:bg-transparent px-2.5 sm:px-0 py-1 sm:py-0 rounded-full border sm:border-0 border-[#E8E1D7]">
              <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] uppercase tracking-wider">Private Registry</span>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN WISHLIST CONTENT                                                     */}
      {/* ========================================================================= */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        
        {/* PAGE TITLE & CEREMONY BANNER */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#997332] text-xs uppercase tracking-widest font-medium mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span>Curated Ceremony Registry & Keepsakes</span>
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
          </div>
          <h1 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A1817] tracking-tight mb-3">
            Saved Keepsakes & <span className="italic font-light">Trousseau Wishlist</span>
          </h1>
          <p className="text-xs sm:text-base text-[#7E766D] leading-relaxed font-light max-w-2xl mx-auto px-2">
            Your hand-selected ceremonial heirlooms, custom brass monogram dies, and bridal keepsakes securely vaulted for <span className="text-[#1A1817] font-medium">Asra & Shahnawaz’s Wedding Registry</span>.
          </p>

          {/* Registry Metadata Quick Pill Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-white/90 border border-[#E8E1D7] px-4 sm:px-6 py-3 rounded-2xl shadow-sm text-xs text-[#7E766D]">
            <div>
              <span className="uppercase tracking-wider text-[10px] text-[#997332] font-semibold block">Registry ID</span>
              <span className="font-mono text-[#1A1817] font-medium">ASRA-REG-2026-9921</span>
            </div>
            <div className="h-6 w-px bg-[#E8E1D7] hidden sm:block"></div>
            <div>
              <span className="uppercase tracking-wider text-[10px] text-[#997332] font-semibold block">Curated Items</span>
              <span className="text-[#1A1817] font-medium">{wishlistCount} Heirlooms Vaulted</span>
            </div>
            <div className="h-6 w-px bg-[#E8E1D7] hidden sm:block"></div>
            <div>
              <span className="uppercase tracking-wider text-[10px] text-[#997332] font-semibold block">Estimated Value</span>
              <span className="text-[#1A1817] font-semibold">₹{totalWishlistValue.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-6 w-px bg-[#E8E1D7] hidden sm:block"></div>
            <div>
              <span className="uppercase tracking-wider text-[10px] text-[#997332] font-semibold block">Brass Die Status</span>
              <span className="text-emerald-700 font-medium">"A & S" Ready to Mill</span>
            </div>
          </div>
        </div>

        {/* ACTION CONTROLS & FILTER BAR */}
        <div className="bg-white rounded-2xl border border-[#E8E1D7] p-3 sm:p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          
          {/* Tabs / Categories */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-medium uppercase tracking-wider">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-[#1A1817] text-white shadow-sm'
                  : 'bg-transparent hover:bg-[#FAF7F2] text-[#7E766D] hover:text-[#1A1817]'
              }`}
            >
              All Saved ({categoryCounts.all})
            </button>
            <button 
              onClick={() => setActiveTab('bridal-trousseau')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeTab === 'bridal-trousseau'
                  ? 'bg-[#1A1817] text-white shadow-sm'
                  : 'bg-transparent hover:bg-[#FAF7F2] text-[#7E766D] hover:text-[#1A1817]'
              }`}
            >
              Bridal Trousseau ({categoryCounts['bridal-trousseau']})
            </button>
            <button 
              onClick={() => setActiveTab('heirloom-vaults')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeTab === 'heirloom-vaults'
                  ? 'bg-[#1A1817] text-white shadow-sm'
                  : 'bg-transparent hover:bg-[#FAF7F2] text-[#7E766D] hover:text-[#1A1817]'
              }`}
            >
              Heirloom Vaults ({categoryCounts['heirloom-vaults']})
            </button>
            <button 
              onClick={() => setActiveTab('guest-favors')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeTab === 'guest-favors'
                  ? 'bg-[#1A1817] text-white shadow-sm'
                  : 'bg-transparent hover:bg-[#FAF7F2] text-[#7E766D] hover:text-[#1A1817]'
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
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-[#E8E1D7] hover:border-[#C5A059] bg-[#FAF7F2]/70 hover:bg-[#FAF7F2] text-xs text-[#2D2825] font-medium tracking-wide transition"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Share with Planner</span>
            </button>

            {/* Move All to Bag CTA */}
            <button 
              onClick={handleTransferAllToBag}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#1A1817] hover:bg-black text-white text-xs font-semibold tracking-wider uppercase shadow hover:shadow-md transition active:scale-98"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Transfer All to Bag</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* WISHLIST CARDS GRID                                                       */}
        {/* ========================================================================= */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E1D7] p-8 sm:p-12 text-center max-w-xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8E1D7] flex items-center justify-center mx-auto mb-4 text-[#C5A059]">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-cormorant text-2xl font-semibold text-[#1A1817]">No Saved Heirlooms In This Category</h3>
            <p className="text-xs text-[#7E766D] mt-2 mb-6 max-w-md mx-auto leading-relaxed">
              {activeTab !== 'all' 
                ? 'There are no heirlooms under this specific ceremonial category right now. View all items or discover our atelier suites.'
                : 'Your private registry vault is empty. Browse our wedding keepsakes and trousseau collections to curate your sacred pieces.'
              }
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {activeTab !== 'all' && (
                <button
                  onClick={() => setActiveTab('all')}
                  className="px-5 py-2.5 bg-[#FAF7F2] border border-[#E8E1D7] rounded-xl text-xs font-semibold text-[#1A1817] hover:border-[#C5A059] transition"
                >
                  View All Saved ({wishlistCount})
                </button>
              )}
              <Link
                to="/shop"
                className="px-6 py-2.5 bg-[#1A1817] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition shadow-sm inline-block"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-[#E8E1D7] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group relative"
              >
                {/* Remove / Unheart Button */}
                <button 
                  onClick={() => handleRemoveItem(item)}
                  title="Remove from Wishlist" 
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 border border-[#E8E1D7] flex items-center justify-center text-red-500 hover:bg-red-50 transition shadow-sm group-hover:border-red-200"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                <div>
                  {/* Visual Display: Image or Specialized Graphic */}
                  {item.isEmeraldVaultVisual ? (
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#133E2B] text-white flex flex-col items-center justify-center p-6 text-center mb-4 shadow-inner">
                      <div className="border border-[#C5A059]/50 p-6 rounded-lg w-full h-full flex flex-col items-center justify-center">
                        <span className="font-cormorant text-2xl tracking-widest text-[#E8D5B5]">A & S</span>
                        <span className="text-[9px] uppercase tracking-widest text-[#C5A059]/80 mt-1">EMERALD SILK VAULT</span>
                        <div className="w-6 h-px bg-[#C5A059]/40 my-2"></div>
                        <span className="text-[10px] text-white/70">Solid Brass Latch</span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm border border-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-semibold text-white">
                        {item.badge}
                      </div>
                    </div>
                  ) : item.isVowBookVisual ? (
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5EFE6] flex flex-col items-center justify-center p-6 text-center mb-4 border border-[#E8E1D7]">
                      <div className="w-3/4 h-5/6 bg-[#FAF7F2] border border-[#DDD3C4] shadow-md rounded p-4 flex flex-col justify-between">
                        <span className="text-[9px] uppercase tracking-widest text-[#7E766D]">His & Her Vows</span>
                        <div className="font-cormorant italic text-lg text-[#2D2825]">"Our Sacred Covenant"</div>
                        <span className="text-[8px] text-[#997332] font-semibold">100% Hand-Poured Cotton</span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white/90 border border-[#E8E1D7] px-2 py-0.5 rounded text-[10px] uppercase font-semibold text-[#1A1817]">
                        {item.badge}
                      </div>
                    </div>
                  ) : item.isHamperVisual ? (
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#2D2825] text-white flex flex-col items-center justify-center p-6 text-center mb-4">
                      <div className="w-full h-full border border-[#C5A059]/40 rounded-lg flex flex-col items-center justify-center p-4">
                        <span className="text-[#C5A059] text-2xl font-serif">✦ ✦ ✦</span>
                        <span className="font-cormorant text-xl text-[#E8D5B5] mt-2">Palatial Room Favors</span>
                        <span className="text-[9px] uppercase tracking-wider text-white/70 mt-1">Tiered Concierge Gifting</span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-[#C5A059]/90 text-white px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                        {item.badge}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] mb-4">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border border-[#E8E1D7]/80 px-2.5 py-1 rounded-md text-[10px] uppercase font-semibold tracking-wider text-[#1A1817]">
                        {item.badge}
                      </div>
                      {item.subBadge && (
                        <div className="absolute top-3 left-3 bg-[#C5A059]/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                          {item.subBadge}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#997332] font-semibold">
                      {item.editionBadge}
                    </span>
                    <Link to={item.slug ? `/product/${item.slug}` : '/shop'}>
                      <h3 className="font-cormorant text-xl font-bold text-[#1A1817] leading-tight mt-1 hover:text-[#997332] transition">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#7E766D] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Customization Tags */}
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="bg-[#FAF7F2]/80 rounded-xl p-3 border border-[#E8E1D7]/60 text-xs mb-4 space-y-1.5">
                      {item.customizations.map((c, i) => (
                        <div key={i} className="flex justify-between items-center text-[11px]">
                          <span className="text-[#7E766D]">{c.label}:</span>
                          <span className={`font-medium ${c.highlight ? 'text-emerald-700' : 'text-[#1A1817]'} flex items-center gap-1.5`}>
                            {c.colorDot && (
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block" 
                                style={{ backgroundColor: c.colorDot }}
                              />
                            )}
                            <span>{c.value}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing & Action Button */}
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-[#1A1817]">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </span>
                      {item.unitNote && (
                        <span className="text-xs text-[#7E766D] ml-1 font-normal">{item.unitNote}</span>
                      )}
                      {item.originalPrice && (
                        <span className="text-xs text-[#7E766D] line-through ml-1.5">
                          ₹{item.originalPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {item.savings ? (
                      <span className="text-[11px] text-emerald-700 font-medium">Save ₹{item.savings.toLocaleString('en-IN')}</span>
                    ) : item.priceSubtitle ? (
                      <span className="text-[11px] text-[#997332] font-medium">{item.priceSubtitle}</span>
                    ) : null}
                  </div>

                  <button 
                    onClick={() => handleMoveToBag(item)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1A1817] hover:bg-black text-white text-xs uppercase font-semibold tracking-wider transition shadow-sm hover:shadow active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
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
          <div className="bg-white rounded-2xl border border-[#E8E1D7] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-2xl font-bold text-[#1A1817] mb-1">Collaborative Registry Link</h4>
              <p className="text-xs text-[#7E766D] leading-relaxed mb-4 font-light">
                Share this private URL directly with your bridal party, parents, or wedding architect to coordinate bespoke gifts and avoid duplicates.
              </p>
              <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-xl p-2 border border-[#E8E1D7]">
                <input 
                  type="text" 
                  readOnly 
                  value={registryUrl} 
                  className="bg-transparent text-xs text-[#1A1817] flex-grow px-2 outline-none font-mono selection:bg-[#C5A059]/20" 
                />
                <button 
                  onClick={handleCopyLink}
                  className="bg-white px-3 py-1.5 rounded-lg border border-[#E8E1D7] text-[11px] font-semibold text-[#2D2825] hover:text-[#997332] shadow-2xs transition flex items-center gap-1"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#7E766D]" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#E8E1D7]/60 flex items-center justify-between text-[11px] text-[#7E766D]">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#C5A059]" />
                Protected with 256-Bit Vaulting
              </span>
              <span className="text-emerald-700 font-medium">PIN Protection On</span>
            </div>
          </div>

          {/* Box 2: Brass Die & Archival Guarantee */}
          <div className="bg-white rounded-2xl border border-[#E8E1D7] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-2xl font-bold text-[#1A1817] mb-1">Bespoke Metallurgy Vault</h4>
              <p className="text-xs text-[#7E766D] leading-relaxed mb-4 font-light">
                All wishlisted bespoke items automatically link your custom couple monogram die code <span className="font-semibold text-[#1A1817]">"A & R"</span> so single casting applies across all pieces with zero re-casting charges.
              </p>
              <ul className="text-xs space-y-2 text-[#2D2825]">
                <li className="flex items-center gap-2">
                  <span className="text-[#C5A059] font-bold">✔</span>
                  <span>5-Year Complimentary Archival in Hyderabad Atelier</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C5A059] font-bold">✔</span>
                  <span>Unlimited Digital WhatsApp Vector Calibration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C5A059] font-bold">✔</span>
                  <span>Save ₹1,500 on all future anniversary keepsakes</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-[#E8E1D7]/60">
              <button 
                onClick={() => setIsDieProtocolModalOpen(true)}
                className="text-[11px] text-[#997332] font-semibold uppercase tracking-wider hover:underline flex items-center gap-1"
              >
                <span>Read Die Vaulting Protocol</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Box 3: WhatsApp Senior Stylist Hotline */}
          <div className="bg-[#2D2825] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl"></div>
            <div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#E8D5B5] mb-4">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">Concierge Support</span>
              <h4 className="font-cormorant text-2xl font-bold text-white mb-2">Need Guidance from a Stylist?</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6 font-light">
                Reviewing trousseau pairings, urgent delivery timelines, or bulk favor quantities for Udaipur? Our lead bridal stylist is on call.
              </p>
            </div>

            <div>
              <a 
                href="https://wa.me/919692668263?text=Hi%20ASRA%20Atelier%2C%20I%20would%20like%20guidance%20on%20my%20Wedding%20Registry%20(ASRA-REG-2026-9921)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider transition shadow active:scale-98"
              >
                <span>Chat with Lead Stylist on WhatsApp</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-between text-[11px] text-white/50 mt-3">
                <span>Direct Line: +91 96926 68263</span>
                <span>Avg Reply: &lt; 5 mins</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RECOMMENDED TO COMPLEMENT YOUR WISHLIST (ATELIER PICKS)                   */}
        {/* ========================================================================= */}
        <div className="border-t border-[#E8E1D7] pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#997332] font-semibold">Atelier Recommendations</span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1A1817]">
                Complete the Bridal Suite
              </h3>
            </div>
            <Link 
              to="/collections" 
              className="text-xs font-semibold uppercase tracking-wider text-[#1A1817] hover:text-[#997332] flex items-center gap-1 transition"
            >
              <span>Explore All Collections</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECOMMENDATIONS.map((rec) => {
              const alreadyInWishlist = isInWishlist(rec.id);
              return (
                <div 
                  key={rec.id}
                  className="bg-white rounded-2xl border border-[#E8E1D7] p-4 flex items-center gap-4 hover:border-[#C5A059] transition group shadow-2xs"
                >
                  <div className="w-20 h-20 rounded-xl bg-[#FAF7F2] border border-[#E8E1D7] flex flex-col items-center justify-center text-center p-2 flex-shrink-0">
                    <span className="text-[10px] uppercase font-serif text-[#997332] font-bold">{rec.tag}</span>
                    <span className="text-[9px] text-[#7E766D] mt-1">{rec.material}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-cormorant text-lg font-bold text-[#1A1817] group-hover:text-[#997332] transition leading-tight truncate">
                      {rec.title}
                    </h4>
                    <p className="text-[11px] text-[#7E766D] line-clamp-1">{rec.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-[#1A1817]">₹{rec.price.toLocaleString('en-IN')}</span>
                      <button 
                        onClick={() => {
                          if (alreadyInWishlist) {
                            showToast(`"${rec.title}" is already in your ceremony wishlist.`);
                          } else {
                            addToWishlist(rec);
                            showToast(`"${rec.title}" added to your Wishlist!`);
                          }
                        }}
                        className={`text-[11px] font-semibold uppercase tracking-wider transition ${
                          alreadyInWishlist
                            ? 'text-emerald-700 hover:text-emerald-800'
                            : 'text-[#997332] hover:text-[#1A1817]'
                        }`}
                      >
                        {alreadyInWishlist ? '✓ In Wishlist' : '+ Add to Wishlist'}
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
      <footer className="w-full bg-[#FAF7F2] border-t border-[#E8E1D7] py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7E766D] gap-3">
          <div className="flex items-center gap-2 font-medium text-center sm:text-left">
            <span className="text-[#1A1817] uppercase tracking-wider">ASRA Wedding Canvas</span>
            <span>•</span>
            <span>Private Bridal Registry & Heirloom Vaults</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-[#1A1817] transition hover:underline"
            >
              Registry Privacy Protocol
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsDieProtocolModalOpen(true)}
              className="hover:text-[#1A1817] transition hover:underline"
            >
              Bespoke Monogram Guarantee
            </button>
            <span>•</span>
            <span className="text-[#1A1817]">© 2026 ASRA Private Limited</span>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL 1: SHARE REGISTRY MODAL                                             */}
      {/* ========================================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E8E1D7] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8E1D7] flex items-center justify-center text-[#7E766D] hover:text-[#1A1817] transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
              <Share2 className="w-6 h-6" />
            </div>

            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1A1817] mb-1">
              Share Ceremony Registry
            </h3>
            <p className="text-xs text-[#7E766D] mb-6 leading-relaxed">
              Enable your wedding architect, parents, or bridal party to review your curated heirlooms with custom monogram code <strong className="text-[#1A1817]">"A & S"</strong>.
            </p>

            {/* Direct Copy Section */}
            <div className="mb-6">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#7E766D] block mb-2">
                Private Vault URL
              </label>
              <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-xl p-2.5 border border-[#E8E1D7]">
                <input 
                  type="text" 
                  readOnly 
                  value={registryUrl} 
                  className="bg-transparent text-xs text-[#1A1817] flex-grow px-2 outline-none font-mono" 
                />
                <button 
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-[#1A1817] text-white rounded-lg text-xs font-semibold hover:bg-black transition flex items-center gap-1"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3 mb-6">
              <a 
                href={`https://wa.me/919692668263?text=${encodeURIComponent(`Review our curated ASRA Wedding Registry & Keepsakes for Asra & Shahnawaz: ${registryUrl}`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#E8E1D7] hover:border-[#C5A059] hover:bg-[#FAF7F2]/60 transition text-xs text-[#1A1817] font-medium"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Share on WhatsApp with Bridal Party</span>
                </span>
                <ExternalLink className="w-4 h-4 text-[#7E766D]" />
              </a>

              <a 
                href={`mailto:?subject=${encodeURIComponent("Asra & Shahnawaz's Wedding Registry — ASRA Atelier")}&body=${encodeURIComponent(`Dear Planner,\n\nPlease review our hand-selected ceremonial keepsakes and custom brass monogram die code for our upcoming wedding:\n\n${registryUrl}\n\nWarmly,\nAsra & Shahnawaz`)}`}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#E8E1D7] hover:border-[#C5A059] hover:bg-[#FAF7F2]/60 transition text-xs text-[#1A1817] font-medium"
              >
                <span className="flex items-center gap-3">
                  <Share2 className="w-4 h-4 text-[#C5A059]" />
                  <span>Send Docket to Wedding Planner via Email</span>
                </span>
                <ExternalLink className="w-4 h-4 text-[#7E766D]" />
              </a>
            </div>

            <div className="pt-4 border-t border-[#E8E1D7] flex items-center justify-between text-[11px] text-[#7E766D]">
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
          <div className="bg-white rounded-3xl border border-[#E8E1D7] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsDieProtocolModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8E1D7] flex items-center justify-center text-[#7E766D] hover:text-[#1A1817] transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1A1817] mb-1">
              Bespoke Metallurgy Vault Protocol
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-[#997332] font-semibold block mb-4">
              Protocol Ref: ASRA-METALLURGY-2026-AS
            </span>

            <div className="space-y-4 text-xs text-[#2D2825] leading-relaxed">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E1D7]">
                <h5 className="font-semibold text-[#1A1817] mb-1">1. Custom 3D CNC Metallurgy Die Casting</h5>
                <p className="text-[#7E766D]">
                  Every bespoke order featuring the "A & S" couple crest is machined from solid marine-grade brass using high-precision 5-axis CNC cutters. This die creates high-relief hot foil and blind debossing impressions across hatboxes, vow booklets, and leather folios.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E1D7]">
                <h5 className="font-semibold text-[#1A1817] mb-1">2. 5-Year Climate-Controlled Archival</h5>
                <p className="text-[#7E766D]">
                  Your physical brass die is catalogued with barcode <strong className="text-[#1A1817]">ASRA-REG-2026-9921</strong> and preserved in our Hyderabad atelier’s climate-controlled metallurgy vault. Any subsequent order (anniversary invitations, baby announcements, bespoke stationery) bypasses all die casting fees.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E1D7]">
                <h5 className="font-semibold text-[#1A1817] mb-1">3. Optional Physical Release</h5>
                <p className="text-[#7E766D]">
                  Following wedding fulfillment, patrons may request physical dispatch of their custom brass die presented in a hand-crafted Sheesham wood presentation casket.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E1D7] flex items-center justify-end">
              <button 
                onClick={() => setIsDieProtocolModalOpen(false)}
                className="px-6 py-2.5 bg-[#1A1817] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition"
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
          <div className="bg-white rounded-3xl border border-[#E8E1D7] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8E1D7] flex items-center justify-center text-[#7E766D] hover:text-[#1A1817] transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1A1817] mb-1">
              Registry Privacy & Confidentiality
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-[#997332] font-semibold block mb-4">
              ASRA High-Net-Worth Bridal NDA Covenant
            </span>

            <div className="space-y-4 text-xs text-[#2D2825] leading-relaxed">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E1D7]">
                <h5 className="font-semibold text-[#1A1817] mb-1">1. Pre-Event Embargo Guarantee</h5>
                <p className="text-[#7E766D]">
                  No photographs, proofs, or calligraphy layouts of your trousseau or gifts will be published across ASRA social channels, editorial lookbooks, or digital media prior to your wedding day completion.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E1D7]">
                <h5 className="font-semibold text-[#1A1817] mb-1">2. 256-Bit Vaulting</h5>
                <p className="text-[#7E766D]">
                  All vector monograms, family crest designs, and personal vows are secured behind 256-bit encrypted data dockets, accessible solely by the assigned master engraver and atelier manager.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E1D7]">
                <h5 className="font-semibold text-[#1A1817] mb-1">3. Direct Courier Verification</h5>
                <p className="text-[#7E766D]">
                  Deliveries to palace destinations (Udaipur, Jaipur, Mussoorie) require dual pin authorization and signature verification by your nominated wedding architect.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E1D7] flex items-center justify-end">
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="px-6 py-2.5 bg-[#1A1817] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition"
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

