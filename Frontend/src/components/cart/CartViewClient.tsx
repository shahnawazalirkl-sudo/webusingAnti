"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartViewClient() {
  const cartContext = useCart();
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
  } = (cartContext || {}) as NonNullable<typeof cartContext>;

  const navigate = useRouter();

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Countdown timer for 3D deboss slot (14:48 min = 888 seconds)
  const [timeLeft, setTimeLeft] = useState(888);

  // Customization modal state
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({
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

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
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

  const openEditModal = (item: Record<string, any>) => {
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

  const saveEditModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const updatedFields = {
      ...editForm,
      cardInscription: editForm.cardInscription ? `"${editForm.cardInscription}"` : '',
      monogramDie: editForm.brideName && editForm.groomName 
        ? `"${editForm.brideName[0]} & ${editForm.groomName[0]}" • Classic Floral Crest` 
        : (editingItem.monogramDie as string)
    };
    updateCustomizations(editingItem.cartId as string, updatedFields);
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
      dispatchTimeline: 'Shipped together with Masterpiece Suite'
    });
  };

  const handleAddFlutes = () => {
    addToCart({
      id: 'toasting-flutes',
      sku: 'ASRA-FLT-008',
      title: 'Etched Crystal Toasting Flutes (Set of 2)',
      categoryLabel: 'Barware Gift',
      badge: 'Bohemian Crystal',
      price: 2199,
      originalPrice: 2999,
      edition: 'Lead-free Bohemian Crystal'
    }, {
      footerNote: 'Features laser-etched couple crest & satin padded wooden vault',
      dispatchTimeline: 'Shipped together with Masterpiece Suite'
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs my-12">
        <div className="w-16 h-16 bg-[#FAF4EB] text-primary rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-serif">
          ✦
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-on-surface mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed mb-6 font-sans">
          Begin your custom celebration journey with our handcrafted wedding essentials suites, personalized wax-sealed vow books, and engraved velvet vaults.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#5f4b2d] active:scale-[0.98] transition-all shadow-xs font-sans"
        >
          Explore Shop Catalog
        </Link>
      </div>
    );
  }

  return (
    <>
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
              1. Review Cart ({itemCount})
            </span>
          </div>

          {/* Step 2: Next (Clickable) */}
          <div
            onClick={() => navigate.push('/checkout')}
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
              3. White-Glove Shipping
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
            Collection Shopping Cart & Customizations
          </h1>
        </div>
        <div className="inline-flex items-center bg-[#FFF8EE] border border-[#F3DFC1] px-4 py-2.5 rounded-lg text-xs text-[#8A5814] shadow-xs">
          <svg className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Customized 3D Deboss Brass Die slot held for:{' '}
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
                  Complimentary Hand-Poured Wax Seal & Initials Deboss Die
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
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-white border border-brand-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md p-4"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  
                  {/* Product Image Thumbnail */}
                  <div className="relative w-full sm:w-28 sm:h-28 h-48 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 border border-brand-border/60">
                    {item.isVelvetVaultThumbnail ? (
                      <div className="w-full h-full flex items-center justify-center bg-[#1A3328] text-[#E8DCB9] p-2 text-center">
                        <div className="space-y-0.5">
                          <span className="text-xl font-serif">{item.monogramInitials || 'A & R'}</span>
                          <p className="text-[8px] uppercase tracking-widest text-[#E8DCB9]/80 leading-tight">
                            {item.vaultTag || 'Emerald Velvet Vault'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={item.image || '/assets/cdn/img_8222cd4f9dd5.png'}
                        alt={item.title || 'Cart item'}
                        className="w-full h-full object-cover" fill loading="lazy" sizes="(max-width: 640px) 100vw, 112px"
                      />
                    )}
                  </div>

                  {/* Product Info - Basic Details */}
                  <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-goldDark">
                        SKU: {item.sku || 'ASRA-SOV-019'}
                      </span>
                      <h3 className="font-cormorant text-xl font-semibold text-brand-charcoal leading-tight mt-0.5 mb-1">
                        {item.title}
                      </h3>
                      {item.edition && (
                        <div className="text-[11px] text-brand-slate font-medium flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full inline-block border border-black/10"
                            style={{ backgroundColor: item.colorDot || '#E8C2B3' }}
                          />
                          {item.edition}
                        </div>
                      )}
                    </div>

                    {/* Controls: Quantity, Price, Remove */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-brand-border/60">
                      
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-brand-border rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="w-8 h-8 flex items-center justify-center text-brand-slate hover:bg-brand-sand hover:text-brand-charcoal transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-brand-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="w-8 h-8 flex items-center justify-center text-brand-slate hover:bg-brand-sand hover:text-brand-charcoal transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Price Calculation */}
                      <div className="text-right min-w-[80px]">
                        <div className="flex items-baseline gap-2 justify-end">
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-[10px] text-brand-slate line-through hidden sm:inline-block">
                              ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="text-lg font-bold font-sans text-brand-charcoal">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Remove Item */}
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-brand-slate hover:text-rose-600 transition-colors p-1.5 rounded-md hover:bg-rose-50"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Curated Gift Add-ons / Upsell Section */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-serif text-lg sm:text-xl font-medium text-on-surface">
                  Complete The Bridal Wedding Essentials
                </h4>
                <p className="text-xs text-on-surface-variant font-sans">
                  Add complementary heirlooms crafted in the exact same blush &amp; gold colorway.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-[#FAF4EB] border border-primary/20 px-2 py-0.5 rounded font-sans">
                Special Privilege
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Upsell Card 1: Vow Books */}
              <div className="border border-outline-variant/30 rounded-lg p-3 flex items-center justify-between hover:border-primary/40 transition-colors bg-[#FAF4EB]/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-surface-container border border-outline-variant/30 flex items-center justify-center text-xs font-serif font-bold text-primary">
                    Vows
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-on-surface font-sans">Deckle Edge Vow Books</h5>
                    <p className="text-[11px] text-on-surface-variant font-sans">100% Cotton Rag + Gold Leaf</p>
                    <span className="text-xs font-bold text-on-surface font-sans">₹1,299</span>
                  </div>
                </div>
                <button
                  onClick={handleAddVowBooks}
                  className="px-3 py-1.5 bg-surface-container-lowest border border-outline-variant/50 text-on-surface hover:border-primary hover:text-primary active:scale-[0.98] rounded-md text-xs font-semibold uppercase tracking-wider transition-all shadow-xs font-sans"
                >
                  + Add
                </button>
              </div>

              {/* Upsell Card 2: Toasting Flutes */}
              <div className="border border-outline-variant/30 rounded-lg p-3 flex items-center justify-between hover:border-primary/40 transition-colors bg-[#FAF4EB]/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-surface-container border border-outline-variant/30 flex items-center justify-center text-xs font-serif font-bold text-primary">
                    Flutes
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-on-surface font-sans">Etched Crystal Toasting Flutes</h5>
                    <p className="text-[11px] text-on-surface-variant font-sans">Lead-free Bohemian Crystal</p>
                    <span className="text-xs font-bold text-on-surface font-sans">₹2,199</span>
                  </div>
                </div>
                <button
                  onClick={handleAddFlutes}
                  className="px-3 py-1.5 bg-surface-container-lowest border border-outline-variant/50 text-on-surface hover:border-primary hover:text-primary active:scale-[0.98] rounded-md text-xs font-semibold uppercase tracking-wider transition-all shadow-xs font-sans"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Support Assistance Strip */}
          <div className="bg-[#FAF4EB] border border-primary/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface font-sans">
                  Need Calligraphy or Initials Verification?
                </div>
                <div className="text-[11px] text-on-surface-variant font-sans">
                  Our Senior Design Stylist can review your wedding crest proof before shipping.
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/919692668263?text=Hello%20ASRA%20Team%2C%20I%20would%20like%20to%20verify%20my%20wedding%20monogram%20proof%20for%20my%20cart%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-surface-container-lowest hover:bg-white border border-primary/30 text-primary rounded-lg whitespace-nowrap transition-colors shadow-xs inline-block font-sans"
            >
              Chat with Stylist
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Order Summary & Checkout Action (4 cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Summary Card (Sticky) */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 sm:p-6 shadow-xs sticky top-6">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-4 pb-3 border-b border-outline-variant/30">
              Order &amp; Privileges Summary
            </h2>

            {/* Promo Code Form */}
            <div className="mb-5">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-2 font-sans">
                Apply Exclusive Promo Code
              </label>
              {appliedCoupon ? (
                <div className="p-3 bg-[#FAF4EB] rounded-lg border border-primary/30 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-primary tracking-wider">{appliedCoupon.code}</span>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 hover:underline text-[11px] font-semibold font-sans"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium font-sans">
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
                      className="flex-1 bg-surface-container-low border border-outline-variant/50 px-3 py-2 text-xs uppercase font-mono font-bold text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="ENTER COUPON CODE"
                    />
                    <button
                      type="submit"
                      className="bg-primary text-on-primary text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#5f4b2d] active:scale-[0.98] transition-all uppercase tracking-wider font-sans shadow-xs"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-600 font-medium font-sans">{promoError}</p>
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
                <span className="block font-serif text-2xl font-normal text-on-surface">Total Amount</span>
                <span className="text-[10px] text-on-surface-variant font-sans">Inclusive of all duties, custom craft &amp; insurance</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-on-surface font-sans">
                  ₹{total.toLocaleString('en-IN')}
                </div>
                {totalSavings > 0 && (
                  <span className="text-[11px] text-emerald-700 font-semibold block font-sans">
                    Total Savings: ₹{totalSavings.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Loyalty Points Callout */}
            <div className="bg-[#FAF4EB] border border-primary/25 rounded-lg p-3 mb-6 flex items-center gap-2.5">
              <span className="text-primary text-base font-serif">✦</span>
              <p className="text-[11px] text-on-surface-variant leading-snug font-sans">
                You will earn <strong className="font-bold text-on-surface">{loyaltyPoints} ASRA Privilege Points</strong> with this order for future celebration milestones.
              </p>
            </div>

            {/* Primary Checkout Button */}
            <button
              onClick={() => navigate.push('/checkout')}
              className="w-full py-3.5 bg-primary hover:bg-[#5f4b2d] active:scale-[0.98] text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs group font-sans"
            >
              <span>Proceed to Ceremony &amp; Address</span>
              <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            {/* Secondary One-Click Payment Options */}
            <div className="mt-4 pt-4 border-t border-brand-border/60">
              <div className="text-center text-[10px] uppercase font-bold text-brand-slate tracking-widest mb-3">
                Instant Express Options
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate.push('/checkout')}
                  className="py-2.5 px-3 border border-brand-border hover:border-brand-charcoal bg-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="text-[#097939] font-bold">UPI</span>
                  <span className="text-[11px] text-brand-slate">Fast Pay</span>
                </button>
                <button
                  onClick={() => navigate.push('/checkout')}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Damage-Proof Climate Delivery Guarantee</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-goldDark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Digital Proof Sent via WhatsApp Before Metal Casting</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-goldDark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
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
              If this order is part of a 25+ unit destination wedding favor suite, you qualify for our tiered collection support pricing.
            </p>
            <Link
              href="/bulk-orders"
              className="text-xs font-semibold text-brand-goldDark hover:text-brand-charcoal uppercase tracking-wider inline-flex items-center gap-1"
            >
              Explore Bulk Favors &rarr;
            </Link>
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
                  Customized Personalization
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                <label className="block text-brand-slate font-medium mb-1">Gift Card Inscription</label>
                <textarea
                  rows={2}
                  value={editForm.cardInscription}
                  onChange={(e) => setEditForm(prev => ({ ...prev, cardInscription: e.target.value }))}
                  className="w-full bg-brand-sand border border-brand-border rounded-lg px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-goldDark"
                  placeholder="e.g. Beautiful People Make Beautiful Memories"
                />
              </div>

              {Boolean(editingItem.scentChoice) && (
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

              {Boolean(editingItem.fabricShade) && (
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
    </>
  );
}
