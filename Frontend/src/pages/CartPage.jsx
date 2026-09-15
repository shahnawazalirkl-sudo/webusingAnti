import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    updateCustomizations,
    addToCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    originalTotal,
    subtotal,
    catalogueSavings,
    discountAmount,
    shipping,
    total,
    totalSavings,
    loyaltyPoints,
    gstIncluded,
    itemCount
  } = useCart();

  const navigate = useNavigate();

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Countdown timer for 3D deboss slot (14:48 min = 888 seconds)
  const [timeLeft, setTimeLeft] = useState(888);

  // Customization modal state
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    cardInscription: '',
    scentChoice: '',
    fabricShade: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditForm({
      brideName: item.brideName || '',
      groomName: item.groomName || '',
      weddingDate: item.weddingDate || '',
      cardInscription: (item.cardInscription || '').replace(/^"|"$/g, ''),
      scentChoice: item.scentChoice || '',
      fabricShade: item.fabricShade || ''
    });
  };

  const saveEditModal = (e) => {
    e.preventDefault();
    if (!editingItem) return;
    const updatedFields = {
      ...editForm,
      cardInscription: editForm.cardInscription ? `"${editForm.cardInscription}"` : '',
      monogramDie: editForm.brideName && editForm.groomName 
        ? `"${editForm.brideName[0]} & ${editForm.groomName[0]}" • Heritage Floral Crest` 
        : editingItem.monogramDie
    };
    updateCustomizations(editingItem.cartId, updatedFields);
    setEditingItem(null);
  };

  // Upsell quick-add handlers
  const handleAddVowBooks = () => {
    addToCart({
      id: 'deckle-vow-books',
      sku: 'ASRA-VOW-002',
      title: 'Deckle Edge Vow Books (Set of 2)',
      categoryLabel: 'Vow Stationery',
      badge: 'Handmade Paper',
      price: 1299,
      originalPrice: 1699,
      edition: '100% Cotton Rag + Gold Leaf'
    }, {
      footerNote: 'Includes hand-torn deckled edges and gold leaf lettering',
      dispatchTimeline: 'Dispatched together with Masterpiece Suite'
    });
  };

  const handleAddFlutes = () => {
    addToCart({
      id: 'toasting-flutes',
      sku: 'ASRA-FLT-008',
      title: 'Etched Crystal Toasting Flutes (Set of 2)',
      categoryLabel: 'Barware Keepsake',
      badge: 'Bohemian Crystal',
      price: 2199,
      originalPrice: 2999,
      edition: 'Lead-free Bohemian Crystal'
    }, {
      footerNote: 'Features laser-etched couple crest & satin padded wooden vault',
      dispatchTimeline: 'Dispatched together with Masterpiece Suite'
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto">
          {/* Top Minimal Brand Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-brand-border">
            <Link
              to="/shop"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-brand-slate hover:text-brand-goldDark transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Atelier Collections
            </Link>
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdlUQEHkdxueJu_flGNUpu-XxaW21rUIF4dVPxguL2Y_YEfhYmdC6qJM6tZKWt5BKGwwiOtlh3E1w8jcNMYHwB6j4yrqw-JvrkP_jD0uungJ02qnf6uUZpMho85f0t3AWM_v6JxJcgRKwVj3XKpSZ-U-Z8sVSoAJLnvEWZe-hub91O3fzkAMk7U3UyWMowQugsUN4MDeLnMUb2rMmtA7LS1UbuZ0Ox8ueP-z-DLxHfw9bktQVv_5_Oj5537ga5eK5NM3s"
                alt="ASRA Wedding Canvas"
                className="h-10 object-contain"
              />
              <div className="hidden sm:block text-left border-l border-brand-border pl-3">
                <div className="text-[10px] uppercase font-bold tracking-widest text-brand-goldDark">Keepsake Bag</div>
                <div className="text-[11px] text-brand-slate font-medium">Bespoke Atelier Checkout</div>
              </div>
            </div>
            <div className="flex items-center text-xs text-brand-slate font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-2 animate-pulse" />
              <span>256-Bit Encrypted & Insured Transit</span>
            </div>
          </div>

          {/* Empty State Card */}
          <div className="bg-white border border-brand-border rounded-2xl p-12 text-center max-w-xl mx-auto shadow-sm my-16">
            <div className="w-20 h-20 bg-brand-sand rounded-full flex items-center justify-center mx-auto mb-6 text-brand-goldDark text-3xl font-serif">
              ✦
            </div>
            <h2 className="font-cormorant text-3xl font-semibold text-brand-charcoal mb-3">
              Your Atelier Bag is Empty
            </h2>
            <p className="text-xs text-brand-slate max-w-md mx-auto leading-relaxed mb-8">
              Begin your bespoke celebration journey with our handcrafted trousseau suites, personalized wax-sealed vow books, and engraved velvet vaults.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-charcoal text-[#FAF7F2] rounded-lg text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#2C2927] transition-all shadow-md"
            >
              Explore Atelier Collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
      {/* Main Cart Container (Strictly No Global Site Header or Footer) */}
      <div className="w-full max-w-7xl mx-auto">

        {/* Top Minimal Brand Bar & Back Link (Cart Context Only) */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-brand-border">
          <Link
            to="/shop"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-brand-slate hover:text-brand-goldDark transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Atelier Collections
          </Link>

          {/* Minimal Subtle Logo Mark for Trust */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdlUQEHkdxueJu_flGNUpu-XxaW21rUIF4dVPxguL2Y_YEfhYmdC6qJM6tZKWt5BKGwwiOtlh3E1w8jcNMYHwB6j4yrqw-JvrkP_jD0uungJ02qnf6uUZpMho85f0t3AWM_v6JxJcgRKwVj3XKpSZ-U-Z8sVSoAJLnvEWZe-hub91O3fzkAMk7U3UyWMowQugsUN4MDeLnMUb2rMmtA7LS1UbuZ0Ox8ueP-z-DLxHfw9bktQVv_5_Oj5537ga5eK5NM3s"
                alt="ASRA Wedding Canvas"
                className="h-10 object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
            <div className="hidden sm:block text-left border-l border-brand-border pl-3">
              <div className="text-[10px] uppercase font-bold tracking-widest text-brand-goldDark">Keepsake Bag</div>
              <div className="text-[11px] text-brand-slate font-medium">Bespoke Atelier Checkout</div>
            </div>
          </div>

          {/* Secure Trust Indicator */}
          <div className="flex items-center text-xs text-brand-slate font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-2 animate-pulse" />
            <span className="hidden md:inline">256-Bit Encrypted & Insured Transit</span>
            <span className="md:hidden">Secure Bag</span>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-brand-border -z-0" />
            
            {/* Step 1: Active */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-brand-charcoal text-white text-xs font-bold flex items-center justify-center shadow-md">
                1
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-charcoal mt-2">
                1. Review Bag ({itemCount})
              </span>
            </div>

            {/* Step 2: Next (Clickable) */}
            <div
              onClick={() => navigate('/checkout')}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-brand-border group-hover:border-brand-charcoal text-brand-slate text-xs font-semibold flex items-center justify-center shadow-sm transition-colors">
                2
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-brand-slate group-hover:text-brand-charcoal transition-colors mt-2">
                2. Ceremony Details
              </span>
            </div>

            {/* Step 3: Inactive */}
            <div className="relative z-10 flex flex-col items-center opacity-70">
              <div className="w-8 h-8 rounded-full bg-white border border-brand-border text-brand-slate text-xs font-semibold flex items-center justify-center shadow-sm">
                3
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-brand-slate mt-2">
                3. White-Glove Dispatch
              </span>
            </div>
          </div>
        </div>

        {/* Page Title & Urgency Notification */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-brand-goldDark block mb-1">
              Your Curated Ensemble
            </span>
            <h1 className="font-cormorant text-4xl lg:text-5xl font-normal text-brand-charcoal">
              Atelier Shopping Bag & Customizations
            </h1>
          </div>
          <div className="inline-flex items-center bg-[#FFF8EE] border border-[#F3DFC1] px-4 py-2.5 rounded-lg text-xs text-[#8A5814] shadow-xs">
            <svg className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Bespoke 3D Deboss Brass Die slot held for:{' '}
              <strong className="font-semibold text-brand-charcoal font-mono">{formatTimer(timeLeft)} min</strong>
            </span>
          </div>
        </div>

        {/* Cart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Cart Items (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Announcement Banner Inside Cart */}
            <div className="bg-white border border-brand-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 text-brand-goldDark flex items-center justify-center font-serif text-lg font-bold flex-shrink-0">
                  ✦
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-charcoal">
                    Complimentary Hand-Poured Wax Seal & Monogram Deboss Die
                  </p>
                  <p className="text-[11px] text-brand-slate">
                    Applied automatically on orders exceeding ₹5,000 for verified destination weddings.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded border border-emerald-200 shrink-0">
                Active Privilege
              </span>
            </div>

            {/* Render Cart Items dynamically */}
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-white border border-brand-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    
                    {/* Product Image Thumbnail */}
                    <div className="relative w-full sm:w-44 h-48 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 border border-brand-border/60">
                      {item.isVelvetVaultThumbnail ? (
                        <div className="w-full h-full flex items-center justify-center bg-[#1A3328] text-[#E8DCB9] p-4 text-center">
                          <div className="space-y-1">
                            <span className="text-3xl font-serif">{item.monogramInitials || 'A & R'}</span>
                            <p className="text-[10px] uppercase tracking-widest text-[#E8DCB9]/80">
                              {item.vaultTag || 'Emerald Velvet Vault'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.image || 'https://lh3.googleusercontent.com/aida/AEtjO1WWF5xvSFhZfraQNuZ5QJPkPkwOA7moevDQMXbk6g5GfhQjfg2Z83P-u6zYCC1yMFsxUjfoBWemmareJbeeghnEjxPCCk8pU17Sp5a4j5ZUtKFR3Mb8kBYNW_VepfRLyIG4QLzjwzT5HUgJlvRaNv386XaXDH3zn3Rp2kRX9TFbJIZ9uC8cdio9LJ4Iza1YgNb1vCk3YwY3PGfkJ8oLQahxRtWzdx5ToPRumfXGiwW7-rRqwpKhA2pAZGhJmH6ePGDmvWpp0TJucIM'}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <span className="absolute top-2 left-2 bg-brand-charcoal/90 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded">
                        {item.badge || 'Keepsake Edition'}
                      </span>
                    </div>

                    {/* Product Info & Bespoke Customizations Breakdown */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-goldDark">
                              {item.subtitle || `2026 BRIDAL EDITION • SKU: ${item.sku || 'ASRA-SOV-019'}`}
                            </span>
                            <h3 className="font-cormorant text-2xl font-semibold text-brand-charcoal leading-tight">
                              {item.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-brand-slate hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        {/* Configured Specifications Badge Box */}
                        <div className="mt-3 bg-[#FAF8F5] border border-brand-border/80 rounded-lg p-3 text-xs space-y-1.5">
                          {item.edition && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-brand-slate font-medium">Hamper Palette Edition:</span>
                              <span className="font-semibold text-brand-charcoal flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                                  style={{ backgroundColor: item.colorDot || '#E8C2B3' }}
                                />
                                {item.edition}
                              </span>
                            </div>
                          )}

                          {item.fabricShade && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-brand-slate font-medium">Fabric & Shade:</span>
                              <span className="font-semibold text-brand-charcoal">{item.fabricShade}</span>
                            </div>
                          )}

                          {item.metalHardware && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-brand-slate font-medium">Metal Hardware:</span>
                              <span className="font-medium text-brand-charcoal">{item.metalHardware}</span>
                            </div>
                          )}

                          {item.monogramDie && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-brand-slate font-medium">Debossed Monogram:</span>
                              <span className="font-semibold text-brand-goldDark bg-brand-sand px-2 py-0.5 rounded border border-brand-border">
                                {item.monogramDie}
                              </span>
                            </div>
                          )}

                          {item.brideName && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-brand-slate font-medium">Couple Names:</span>
                              <span className="font-medium text-brand-charcoal">
                                {item.brideName} {item.groomName ? `& ${item.groomName}` : ''}
                              </span>
                            </div>
                          )}

                          {item.weddingDate && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-brand-slate font-medium">Wedding Date:</span>
                              <span className="font-medium text-brand-charcoal">{item.weddingDate}</span>
                            </div>
                          )}

                          {item.cardInscription && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-brand-slate font-medium">Keepsake Inscription:</span>
                              <span className="font-serif italic text-brand-charcoal">{item.cardInscription}</span>
                            </div>
                          )}

                          {item.scentChoice && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-brand-slate font-medium">Artisanal Fragrance:</span>
                              <span className="font-medium text-brand-charcoal">{item.scentChoice}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity, Edit Link & Pricing Row */}
                      <div className="mt-5 pt-4 border-t border-brand-border/60 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-brand-border rounded-lg bg-white overflow-hidden shadow-xs">
                            <button
                              onClick={() => updateQuantity(item.cartId, -1)}
                              className="w-8 h-8 flex items-center justify-center text-brand-slate hover:bg-brand-sand hover:text-brand-charcoal transition-colors"
                            >
                              −
                            </button>
                            <span className="w-9 text-center text-xs font-semibold text-brand-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="w-8 h-8 flex items-center justify-center text-brand-slate hover:bg-brand-sand hover:text-brand-charcoal transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Edit Inscriptions link */}
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-xs text-brand-goldDark hover:underline font-medium flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit Customizations</span>
                          </button>
                        </div>

                        {/* Price Calculation */}
                        <div className="text-right">
                          <div className="flex items-baseline gap-2 justify-end">
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-xs text-brand-slate line-through">
                                ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                              </span>
                            )}
                            <span className="text-xl font-bold font-sans text-brand-charcoal">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-[10px] text-emerald-600 font-semibold block">
                              {item.savingsNote || `Saved ₹${((item.originalPrice - item.price) * item.quantity).toLocaleString('en-IN')}`}
                            </span>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
                
                {/* Item Footer Note */}
                <div className="bg-[#FAF7F2] px-6 py-2.5 border-t border-brand-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-brand-slate gap-1">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-brand-goldDark flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>{item.footerNote || 'Includes 24k Gold Calligraphy Card & Climate-Controlled Packaging'}</span>
                  </span>
                  <span className="text-brand-charcoal font-medium">
                    {item.dispatchTimeline || 'Estimated Dispatch: Within 48 Hours'}
                  </span>
                </div>
              </div>
            ))}

            {/* Curated Keepsake Add-ons / Upsell Section */}
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-cormorant text-xl font-semibold text-brand-charcoal">
                    Complete The Bridal Trousseau
                  </h4>
                  <p className="text-xs text-brand-slate">
                    Add complementary heirlooms crafted in the exact same blush & gold colorway.
                  </p>
                </div>
                <span className="text-xs font-semibold text-brand-goldDark">
                  Special Cart Privilege
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upsell Card 1: Vow Books */}
                <div className="border border-brand-border rounded-lg p-3 flex items-center justify-between hover:border-brand-gold transition-colors bg-brand-sand/30">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded bg-stone-200 border border-brand-border flex items-center justify-center text-xs font-serif font-bold text-brand-slate">
                      Vows
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-brand-charcoal">Deckle Edge Vow Books (Set of 2)</h5>
                      <p className="text-[11px] text-brand-slate">100% Cotton Rag + Gold Leaf</p>
                      <span className="text-xs font-bold text-brand-charcoal">₹1,299</span>
                    </div>
                  </div>
                  <button
                    onClick={handleAddVowBooks}
                    className="px-3 py-1.5 bg-white border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white rounded text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    + Add
                  </button>
                </div>

                {/* Upsell Card 2: Toasting Flutes */}
                <div className="border border-brand-border rounded-lg p-3 flex items-center justify-between hover:border-brand-gold transition-colors bg-brand-sand/30">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded bg-stone-200 border border-brand-border flex items-center justify-center text-xs font-serif font-bold text-brand-slate">
                      Flutes
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-brand-charcoal">Etched Crystal Toasting Flutes</h5>
                      <p className="text-[11px] text-brand-slate">Lead-free Bohemian Crystal</p>
                      <span className="text-xs font-bold text-brand-charcoal">₹2,199</span>
                    </div>
                  </div>
                  <button
                    onClick={handleAddFlutes}
                    className="px-3 py-1.5 bg-white border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white rounded text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Assistance Strip */}
            <div className="bg-[#F3EFEA] border border-brand-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.879.824 2.8.825 3.183 0 5.77-2.587 5.77-5.768 0-3.181-2.587-5.768-5.774-5.768zm0 10.426c-.84 0-1.637-.234-2.348-.654l-.168-.1-1.579.414.421-1.54-.11-.175c-.456-.724-.716-1.564-.715-2.433 0-2.483 2.02-4.502 4.503-4.502 2.484 0 4.503 2.019 4.503 4.502 0 2.483-2.02 4.503-4.503 4.503zm6.347-10.426c-1.695-1.696-3.949-2.63-6.347-2.63-4.945 0-8.966 4.021-8.968 8.967 0 1.58.411 3.123 1.192 4.477l-1.267 4.633 4.743-1.244c1.306.713 2.775 1.089 4.298 1.09h.004c4.945 0 8.967-4.022 8.968-8.968 0-2.398-.934-4.652-2.623-6.325z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-charcoal">
                    Need Calligraphy or Monogram Verification?
                  </div>
                  <div className="text-[11px] text-brand-slate">
                    Our Senior Atelier Stylist can review your wedding crest proof before dispatch.
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/919692668263?text=Hello%20ASRA%20Atelier%2C%20I%20would%20like%20to%20verify%20my%20wedding%20monogram%20proof%20for%20my%20cart%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-4 py-2 bg-white hover:bg-stone-50 border border-emerald-600 text-emerald-800 rounded-lg whitespace-nowrap transition-colors shadow-xs inline-block"
              >
                Chat with Stylist
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary & Checkout Action (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Summary Card (Sticky) */}
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm sticky top-6">
              <h2 className="font-cormorant text-2xl font-bold text-brand-charcoal mb-4 pb-3 border-b border-brand-border">
                Order & Atelier Privileges
              </h2>

              {/* Promo Code Form */}
              <div className="mb-5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-slate mb-2">
                  Apply Exclusive Wedding Code
                </label>
                {appliedCoupon ? (
                  <div className="p-3 bg-brand-sand rounded-lg border border-brand-border space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-brand-charcoal">{appliedCoupon.code}</span>
                      <button
                        onClick={removeCoupon}
                        className="text-rose-600 hover:underline text-[11px] font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      Code '{appliedCoupon.code}' Applied: 10% Extra Welcome Off
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="flex-1 bg-brand-sand border border-brand-border px-3 py-2 text-xs uppercase font-bold text-brand-charcoal rounded-lg focus:outline-none focus:border-brand-goldDark"
                        placeholder="Enter promo code"
                      />
                      <button
                        type="submit"
                        className="bg-brand-charcoal text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-slate transition-colors uppercase tracking-wider"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-3 text-xs border-b border-brand-border pb-4 mb-4">
                <div className="flex justify-between text-brand-slate">
                  <span>Items Total ({itemCount} Heirlooms)</span>
                  <span className="font-semibold text-brand-charcoal">
                    ₹{originalTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {catalogueSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Catalogue Privilege Savings</span>
                    <span>− ₹{catalogueSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Promo Privilege ({appliedCoupon?.code || 'ASRAFIRST'})</span>
                    <span>− ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-brand-slate">
                  <span>Custom Brass Deboss Die & Wax Seals</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                    Complimentary
                  </span>
                </div>

                <div className="flex justify-between text-brand-slate">
                  <span>Insured White-Glove Courier</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-brand-slate">
                  <span>Estimated GST (Included)</span>
                  <span>18% (₹{gstIncluded.toLocaleString('en-IN')} Incl.)</span>
                </div>
              </div>

              {/* Final Payable Row */}
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="block font-cormorant text-2xl font-bold text-brand-charcoal">Total Amount</span>
                  <span className="text-[10px] text-brand-slate">Inclusive of all duties, bespoke craft & insurance</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-charcoal font-sans">
                    ₹{total.toLocaleString('en-IN')}
                  </div>
                  {totalSavings > 0 && (
                    <span className="text-[11px] text-emerald-700 font-semibold block">
                      Total Savings: ₹{totalSavings.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              {/* Loyalty Points Callout */}
              <div className="bg-brand-sand border border-brand-border/70 rounded-lg p-3 mb-6 flex items-center gap-2.5">
                <span className="text-brand-goldDark text-base font-serif">✦</span>
                <p className="text-[11px] text-brand-slate leading-snug">
                  You will earn <strong className="font-bold text-brand-charcoal">{loyaltyPoints} ASRA Privilege Points</strong> with this order for future celebration milestones.
                </p>
              </div>

              {/* Primary Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-brand-charcoal hover:bg-[#2C2927] text-[#FAF7F2] rounded-lg text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
              >
                <span>Proceed to Ceremony & Address</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              {/* Secondary One-Click Payment Options */}
              <div className="mt-4 pt-4 border-t border-brand-border/60">
                <div className="text-center text-[10px] uppercase font-bold text-brand-slate tracking-widest mb-3">
                  Instant Express Options
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="py-2.5 px-3 border border-brand-border hover:border-brand-charcoal bg-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="text-[#097939] font-bold">UPI</span>
                    <span className="text-[11px] text-brand-slate">Fast Pay</span>
                  </button>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="py-2.5 px-3 border border-brand-border hover:border-brand-charcoal bg-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="text-[#1A1F71] font-bold">EMI</span>
                    <span className="text-[11px] text-brand-slate">from ₹705/mo</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges & Safety Grid inside Summary */}
              <div className="mt-6 pt-5 border-t border-brand-border/60 space-y-2.5 text-[11px] text-brand-slate">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-goldDark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>100% Damage-Proof Climate Transit Guarantee</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-goldDark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Digital Proof Sent via WhatsApp Before Metal Casting</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-goldDark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>All Major Cards, Net Banking & No-Cost EMIs Accepted</span>
                </div>
              </div>

            </div>

            {/* Destination Wedding Consultation Card */}
            <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm text-center">
              <div className="w-8 h-8 rounded-full bg-brand-sand text-brand-goldDark mx-auto flex items-center justify-center mb-2 font-serif text-sm">
                ⚜
              </div>
              <h4 className="font-cormorant text-lg font-bold text-brand-charcoal">
                Planning Multiple Event Rooms?
              </h4>
              <p className="text-xs text-brand-slate mt-1 mb-3">
                If this order is part of a 25+ unit destination wedding favor suite, you qualify for our tiered atelier concierge pricing.
              </p>
              <Link
                to="/bulk-orders"
                className="text-xs font-semibold text-brand-goldDark hover:text-brand-charcoal uppercase tracking-wider inline-flex items-center gap-1"
              >
                Explore Bulk Favors &rarr;
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Customization Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-brand-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-sand px-6 py-4 border-b border-brand-border flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-goldDark block">
                  Bespoke Personalization
                </span>
                <h3 className="font-cormorant text-xl font-semibold text-brand-charcoal">
                  Edit Customizations & Inscriptions
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-brand-slate hover:text-brand-charcoal p-1 rounded-full hover:bg-black/5 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={saveEditModal} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-slate font-medium mb-1">Bride's Name</label>
                  <input
                    type="text"
                    value={editForm.brideName}
                    onChange={(e) => setEditForm(prev => ({ ...prev, brideName: e.target.value }))}
                    className="w-full bg-brand-sand border border-brand-border rounded-lg px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-goldDark"
                    placeholder="e.g. Asra"
                  />
                </div>
                <div>
                  <label className="block text-brand-slate font-medium mb-1">Groom's Name</label>
                  <input
                    type="text"
                    value={editForm.groomName}
                    onChange={(e) => setEditForm(prev => ({ ...prev, groomName: e.target.value }))}
                    className="w-full bg-brand-sand border border-brand-border rounded-lg px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-goldDark"
                    placeholder="e.g. Shahnawaz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-brand-slate font-medium mb-1">Ceremony / Wedding Date</label>
                <input
                  type="text"
                  value={editForm.weddingDate}
                  onChange={(e) => setEditForm(prev => ({ ...prev, weddingDate: e.target.value }))}
                  className="w-full bg-brand-sand border border-brand-border rounded-lg px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-goldDark"
                  placeholder="e.g. 18th November 2026"
                />
              </div>

              <div>
                <label className="block text-brand-slate font-medium mb-1">Keepsake Card Inscription</label>
                <textarea
                  rows={2}
                  value={editForm.cardInscription}
                  onChange={(e) => setEditForm(prev => ({ ...prev, cardInscription: e.target.value }))}
                  className="w-full bg-brand-sand border border-brand-border rounded-lg px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-goldDark"
                  placeholder="e.g. Beautiful People Make Beautiful Memories"
                />
              </div>

              {editingItem.scentChoice && (
                <div>
                  <label className="block text-brand-slate font-medium mb-1">Artisanal Fragrance Edition</label>
                  <select
                    value={editForm.scentChoice}
                    onChange={(e) => setEditForm(prev => ({ ...prev, scentChoice: e.target.value }))}
                    className="w-full bg-brand-sand border border-brand-border rounded-lg px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-goldDark"
                  >
                    <option value="Kashmiri Rose (French Amber Base)">Kashmiri Rose (French Amber Base)</option>
                    <option value="Royal Mogra & Night Jasmine">Royal Mogra & Night Jasmine</option>
                    <option value="Mysore Sandalwood & White Oud">Mysore Sandalwood & White Oud</option>
                  </select>
                </div>
              )}

              {editingItem.fabricShade && (
                <div>
                  <label className="block text-brand-slate font-medium mb-1">Velvet Fabric Shade</label>
                  <select
                    value={editForm.fabricShade}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fabricShade: e.target.value }))}
                    className="w-full bg-brand-sand border border-brand-border rounded-lg px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-goldDark"
                  >
                    <option value="Royal Emerald Silk Velvet">Royal Emerald Silk Velvet</option>
                    <option value="Midnight Sapphire Silk Velvet">Midnight Sapphire Silk Velvet</option>
                    <option value="Burgundy Bordeaux Velvet">Burgundy Bordeaux Velvet</option>
                    <option value="Blush Rose Quartz Velvet">Blush Rose Quartz Velvet</option>
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-brand-border hover:bg-stone-50 rounded-lg text-brand-slate transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-charcoal hover:bg-black text-white font-semibold rounded-lg shadow-sm transition-colors uppercase tracking-wider text-[11px]"
                >
                  Save Customizations
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CartPage;
