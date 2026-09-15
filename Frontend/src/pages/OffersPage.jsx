import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const OffersPage = () => {
  const { showToast, applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModal, setActiveModal] = useState(null); // 'hdfc' | 'cred' | null
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // first FAQ open by default

  // Copy code with clipboard fallback and cart activation
  const handleCopyCode = (code, event) => {
    if (event) event.stopPropagation();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedCode(code);
        applyCoupon(code);
        showToast(`Coupon "${code}" copied & applied to your shopping bag!`);
        setTimeout(() => setCopiedCode(null), 2500);
      }).catch(() => {
        fallbackCopy(code);
      });
    } else {
      fallbackCopy(code);
    }
  };

  const fallbackCopy = (code) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedCode(code);
      applyCoupon(code);
      showToast(`Coupon "${code}" copied & applied to your shopping bag!`);
      setTimeout(() => setCopiedCode(null), 2500);
    } catch (err) {
      prompt("Copy coupon code:", code);
    }
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Bank & Card Privileges Data
  const bankOffers = [
    {
      id: 'icici',
      code: 'ICICIASRA',
      partner: 'ICICI Bank',
      badge: 'Trending',
      badgeStyle: 'bg-secondary-container text-on-secondary-container',
      title: '10% Instant Discount up to ₹1,000',
      description: 'Applicable on all ICICI Bank Credit Card full swipe and EMI transactions. Minimum cart value ₹3,999.',
      applicable: 'All Wedding Kits & Hampers',
      applicableIcon: 'verified',
      category: 'card'
    },
    {
      id: 'sbi',
      code: 'SBIFESTIVE',
      partner: 'SBI Card',
      badge: 'No Cost EMI',
      badgeStyle: 'bg-primary-fixed text-on-primary-fixed',
      title: 'Flat ₹750 OFF on Credit Card EMI',
      description: 'Avail 3 and 6 months No Cost EMI tenures on customized trousseau orders. Minimum cart value ₹5,000.',
      applicable: '3M & 6M Tenures',
      applicableIcon: 'calendar_month',
      category: 'emi',
      alsoCard: true
    },
    {
      id: 'axis',
      code: 'AXISLUXE',
      partner: 'Axis Bank',
      badge: 'Burgundy',
      badgeStyle: 'bg-surface-container-highest text-on-surface',
      title: 'Flat 12% OFF up to ₹1,200',
      description: 'Exclusive to Axis Bank Neo, Magnus & Burgundy Credit Cards on luxury bridal registry suites. Min spend ₹4,499.',
      applicable: 'Monogram Keepsakes',
      applicableIcon: 'diamond',
      category: 'card'
    },
    {
      id: 'kotak',
      code: 'KOTAKGIFT',
      partner: 'Kotak Bank',
      badge: 'Debit Card',
      badgeStyle: 'bg-surface-container-highest text-on-surface',
      title: 'Flat ₹500 Instant Discount',
      description: 'Seamless instant discount applied on Kotak Debit Card purchases across curated floral and scent gifts. Min cart ₹2,999.',
      applicable: 'All Catalog Products',
      applicableIcon: 'credit_card',
      category: 'card'
    },
    {
      id: 'amex',
      code: 'AMEXROYAL',
      partner: 'AMEX',
      partnerStyle: 'bg-inverse-surface text-inverse-on-surface',
      badge: 'Luxury Exclusive',
      badgeStyle: 'bg-primary-fixed text-on-primary-fixed',
      title: '15% OFF + Complimentary Luxury Perfume',
      description: 'Reserved for Amex Platinum & Centurion Cards. Includes a 50ml bespoke oud artisan perfume. Min spend ₹9,999.',
      applicable: 'Trousseau & Silver Keepsakes',
      applicableIcon: 'featured_seasonal_and_gifts',
      category: 'card'
    },
    {
      id: 'zeroemi',
      code: 'ZEROEMI',
      partner: 'Atelier EMI',
      badge: '0% Interest',
      badgeStyle: 'bg-secondary-container text-on-secondary-container',
      title: 'Split in 3 or 6 Months No-Cost',
      description: 'Spread luxury wedding favor sets or massive bridal hampers with zero processing fee across all major domestic cards.',
      applicable: 'No documentation • Instant Approval',
      applicableIcon: 'payments',
      category: 'emi',
      isAutoApplied: true,
      learnLink: '/bulk-orders'
    }
  ];

  // UPI & Wallets Data
  const upiOffers = [
    {
      id: 'gpay',
      partner: 'GPAY / PHONEPE',
      reward: 'Flat ₹150 Cashback',
      rewardStyle: 'text-secondary',
      title: 'First UPI Payment Cashback',
      description: 'Complete your order via any verified UPI app (Google Pay, PhonePe, or BHIM) on orders above ₹1,499.',
      footerText: 'Auto-applied at Checkout',
      footerIcon: 'check_circle',
      category: 'upi'
    },
    {
      id: 'paytm',
      partner: 'PAYTM UPI',
      reward: 'Up to ₹300 Scratch Card',
      rewardStyle: 'text-primary',
      title: 'Assured Cashback Scratch Card',
      description: 'Pay with Paytm UPI handle on cart value above ₹2,000 and receive an instant cashback voucher in Paytm app.',
      footerText: 'No Code Required',
      footerIcon: 'redeem',
      category: 'upi'
    },
    {
      id: 'mobikwik',
      partner: 'MOBIKWIK ZIP',
      reward: 'Flat ₹250 Cashback',
      rewardStyle: 'text-secondary',
      title: 'Pay Later in 3 Installments',
      description: 'Split wedding orders into 3 equal monthly payments with zero added interest, or claim ₹250 wallet credit.',
      code: 'MOBIASRA',
      category: 'upi'
    }
  ];

  // Atelier Store Vouchers Data
  const atelierVouchers = [
    {
      id: 'asrafirst',
      badge: 'First Order',
      badgeStyle: 'bg-primary-fixed text-on-primary-fixed',
      discount: '15% OFF',
      discountStyle: 'text-primary',
      title: 'Welcome to ASRA Atelier',
      description: 'Flat 15% discount across all custom framed vows, personalized engraved wooden boxes, and bridesmaids gift sets.',
      subtext: 'Min Order: ₹1,499 • One-time use per guest',
      code: 'ASRAFIRST',
      category: 'atelier'
    },
    {
      id: 'wedbliss',
      badge: 'Wedding Hampers',
      badgeStyle: 'bg-secondary-container text-on-secondary-container',
      discount: '₹800 OFF',
      discountStyle: 'text-secondary',
      title: 'Bride & Groom Suite',
      description: 'Flat ₹800 instant saving on all luxury wicker hampers, matching bride-groom robes, and celebratory trousseau packages.',
      subtext: 'Min Order: ₹4,999 • Unlimited wedding orders',
      code: 'WEDBLISS',
      category: 'atelier'
    },
    {
      id: 'biglove',
      badge: 'Bulk Favors',
      badgeStyle: 'bg-surface-container-highest text-on-surface',
      discount: '20% OFF',
      discountStyle: 'text-on-surface',
      title: 'Celebratory Bulk Favor Sets',
      description: 'Flat 20% privilege when ordering 10 or more identical personalized keepsakes or return gift boxes.',
      subtext: 'Qty: 10+ Units • Includes custom monogram tooling',
      code: 'BIGLOVE',
      category: 'atelier'
    }
  ];

  // FAQs Data
  const faqs = [
    {
      q: 'Can I combine bank offers with site promo codes?',
      a: 'Only one promotional voucher code (such as ASRAFIRST or WEDBLISS) may be entered in your cart at a time. However, instantaneous bank card offers and UPI cashbacks operate at the payment gateway level and frequently combine with sitewide milestone tiers automatically.'
    },
    {
      q: 'How does instant cashback work on UPI payments?',
      a: 'When choosing CRED Pay or UPI apps (GPay, PhonePe, Paytm), eligible instant discounts are either directly deducted before final PIN entry or refunded into your originating bank account within 24 to 48 hours following transaction authorization.'
    },
    {
      q: 'Are discounts applicable on customized wooden products and engraved keepsakes?',
      a: 'Yes, entirely. All bank discounts, zero-cost EMI plans, and seasonal vouchers apply to personalized engraved items including solid wood vow tablets, brass etched frames, monogrammed jewelry cases, and bridal trousseau hampers.'
    },
    {
      q: 'What happens to the discount if an item is returned or refunded?',
      a: 'In the unlikely scenario that non-personalized merchandise is approved for return, refunds are computed strictly on the net amount paid after proportional offer deductions. Bespoke personalized keepsakes are handcrafted to order and covered under our transit damage protection guarantee.'
    }
  ];

  // Helper filter function
  const matchesSearch = (item, query) => {
    if (!query) return true;
    const q = query.toLowerCase().trim();
    const searchable = [
      item.code,
      item.partner,
      item.title,
      item.description,
      item.badge,
      item.applicable,
      item.reward,
      item.discount
    ].filter(Boolean).join(' ').toLowerCase();
    return searchable.includes(q);
  };

  // Filtered collections
  const filteredBankOffers = useMemo(() => {
    return bankOffers.filter(item => {
      const matchCat = activeFilter === 'all' || activeFilter === 'card' || (activeFilter === 'emi' && (item.category === 'emi' || item.alsoCard));
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [bankOffers, activeFilter, searchQuery]);

  const filteredUpiOffers = useMemo(() => {
    return upiOffers.filter(item => {
      const matchCat = activeFilter === 'all' || activeFilter === 'upi';
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [upiOffers, activeFilter, searchQuery]);

  const filteredAtelierOffers = useMemo(() => {
    return atelierVouchers.filter(item => {
      const matchCat = activeFilter === 'all' || activeFilter === 'atelier';
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [atelierVouchers, activeFilter, searchQuery]);

  // Grand Highlight cards matching
  const highlightHdfcMatches = useMemo(() => {
    const item = {
      code: 'HDFCWED1500',
      partner: 'HDFC Bank',
      title: 'WEDDING GRANDEUR: Flat ₹1,500 OFF',
      description: 'On personalized bridal hampers & trousseau suites above ₹7,999 with HDFC Bank Credit & Debit Cards.'
    };
    const matchCat = activeFilter === 'all' || activeFilter === 'card';
    return matchCat && matchesSearch(item, searchQuery);
  }, [activeFilter, searchQuery]);

  const highlightCredMatches = useMemo(() => {
    const item = {
      code: 'CREDCELEBRATE',
      partner: 'CRED',
      title: 'INSTANT 10% CASHBACK UP TO ₹500',
      description: 'On luxury hampers, registry contributions, and bespoke gifts above ₹1,999 via CRED UPI & CRED Pay.'
    };
    const matchCat = activeFilter === 'all' || activeFilter === 'upi';
    return matchCat && matchesSearch(item, searchQuery);
  }, [activeFilter, searchQuery]);

  const totalVisibleOffers =
    (highlightHdfcMatches ? 1 : 0) +
    (highlightCredMatches ? 1 : 0) +
    filteredBankOffers.length +
    filteredUpiOffers.length +
    filteredAtelierOffers.length;

  return (
    <div className="w-full bg-surface min-h-screen">

      <div className="flex flex-col w-full">
        {/* Editorial Header */}
        <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-8 pt-6 pb-8">
          {/* Header Content & Title */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-4">
            <div className="lg:col-span-8 flex flex-col">
              <span className="font-label-sm text-label-sm text-primary tracking-[0.25em] uppercase mb-1">
                The Atelier Privilege Suite
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
                Save More With <span className="italic font-normal text-secondary">Exclusive Offers</span>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                Unlock curated privileges across leading credit cards, verified UPI cashbacks, no-cost wedding EMIs, and bespoke atelier codes crafted to elevate every bridal keepsake and celebratory hamper.
              </p>
            </div>

            {/* Quick Privilege Stats Pill */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 w-full sm:w-auto shadow-sm border border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px]">savings</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Total Atelier Savings
                  </span>
                  <span className="font-title-md text-title-md text-on-surface font-semibold">
                    Up to ₹4,500 Per Order
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Category Bar */}
          <div className="mt-4 bg-surface-container-lowest p-2 sm:p-3 rounded-xl shadow-sm border border-outline-variant/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bank, partner, or voucher code..."
                type="text"
                className="w-full bg-surface-container-low text-on-surface text-body-sm font-body-sm pl-10 pr-9 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-surface-container-lowest placeholder:text-outline transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {[
                { key: 'all', label: 'All Offers', count: 14 },
                { key: 'card', label: 'Credit Cards', count: 5 },
                { key: 'upi', label: 'UPI & Wallets', count: 3 },
                { key: 'emi', label: 'Wedding EMI', count: 2 },
                { key: 'atelier', label: 'Atelier Codes', count: 4 }
              ].map(tab => {
                const isActive = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-on-surface text-surface-container-lowest shadow-sm'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-surface-container-lowest/20 text-surface-container-lowest' : 'bg-surface-container-high text-outline'}`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Top Luxury Highlights (2-Column Grand Banners) */}
        {(highlightHdfcMatches || highlightCredMatches) && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Highlight Card 1: HDFC Bank Grandeur */}
              {highlightHdfcMatches && (
                <div className="relative bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-6 sm:p-8 rounded-2xl shadow-md border border-outline-variant/30 flex flex-col justify-between overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-sm text-[10px] rounded uppercase font-bold tracking-widest">
                            Grand Highlight
                          </span>
                          <span className="flex items-center gap-1 text-tertiary font-label-sm text-[11px]">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            Valid till end of month
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-wide">
                          WEDDING GRANDEUR: Flat ₹1,500 OFF
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          On personalized bridal hampers &amp; trousseau suites above ₹7,999 with HDFC Bank Credit &amp; Debit Cards.
                        </p>
                      </div>

                      {/* Partner Stamp */}
                      <div className="px-3 py-2 bg-surface-container-highest rounded-lg text-center shrink-0 shadow-sm border border-outline-variant/20">
                        <span className="font-label-sm text-label-sm font-bold text-on-surface tracking-wider block">
                          HDFC BANK
                        </span>
                        <span className="font-label-sm text-[9px] text-primary uppercase tracking-widest block">
                          PREFERRED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Voucher Code Bar */}
                  <div className="mt-6 pt-4 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[20px]">local_activity</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">Coupon Code</span>
                        <span className="font-title-sm text-title-sm text-on-surface font-mono font-bold tracking-wider">
                          HDFCWED1500
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleCopyCode('HDFCWED1500', e)}
                        type="button"
                        className="px-4 py-2 bg-primary text-on-primary hover:bg-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedCode === 'HDFCWED1500' ? 'done' : 'content_copy'}
                        </span>
                        <span>{copiedCode === 'HDFCWED1500' ? 'Copied' : 'Copy Code'}</span>
                      </button>
                      <button
                        onClick={() => setActiveModal('hdfc')}
                        title="Terms & Conditions"
                        type="button"
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">info</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Highlight Card 2: CRED Instant Cashback */}
              {highlightCredMatches && (
                <div className="relative bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-6 sm:p-8 rounded-2xl shadow-md border border-outline-variant/30 flex flex-col justify-between overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary/5 blur-2xl pointer-events-none" />
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] rounded uppercase font-bold tracking-widest">
                            Instant UPI Privilege
                          </span>
                          <span className="flex items-center gap-1 text-tertiary font-label-sm text-[11px]">
                            <span className="material-symbols-outlined text-[14px]">bolt</span>
                            Instant Settled
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-wide">
                          INSTANT 10% CASHBACK UP TO ₹500
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          On luxury hampers, registry contributions, and bespoke gifts above ₹1,999 via CRED UPI &amp; CRED Pay.
                        </p>
                      </div>

                      {/* Partner Stamp */}
                      <div className="px-3 py-2 bg-inverse-surface rounded-lg text-center shrink-0 shadow-sm">
                        <span className="font-label-sm text-label-sm font-bold text-inverse-on-surface tracking-wider block">
                          CRED
                        </span>
                        <span className="font-label-sm text-[9px] text-primary-fixed uppercase tracking-widest block">
                          EXCLUSIVE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Voucher Code Bar */}
                  <div className="mt-6 pt-4 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[20px]">currency_rupee</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">Voucher Code</span>
                        <span className="font-title-sm text-title-sm text-on-surface font-mono font-bold tracking-wider">
                          CREDCELEBRATE
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleCopyCode('CREDCELEBRATE', e)}
                        type="button"
                        className="px-4 py-2 bg-on-surface text-surface-container-lowest hover:bg-primary font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedCode === 'CREDCELEBRATE' ? 'done' : 'content_copy'}
                        </span>
                        <span>{copiedCode === 'CREDCELEBRATE' ? 'Copied' : 'Copy Code'}</span>
                      </button>
                      <button
                        onClick={() => setActiveModal('cred')}
                        title="Terms & Conditions"
                        type="button"
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">info</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Visual Spend More, Save More Milestone Bar */}
        {(activeFilter === 'all' || activeFilter === 'atelier') && !searchQuery && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 pb-12">
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] font-semibold">
                    Atelier Tier Perks
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                    The Celebratory Gifting Scale
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">redeem</span>
                  <span>Automatic Tier Application at Checkout</span>
                </div>
              </div>

              {/* Progressive Track Visualization */}
              <div className="relative py-2">
                {/* Connecting Track Bar */}
                <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-surface-container-high -translate-y-1/2 z-0 rounded-full">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary w-2/3 rounded-full" />
                </div>

                {/* 3 Milestone Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                  {/* Milestone 1 */}
                  <div className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between shadow-sm border border-outline-variant/30 group hover:bg-surface-container transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface font-mono font-bold text-[11px] rounded">
                          CART ≥ ₹2,500
                        </span>
                        <span className="material-symbols-outlined text-primary text-[20px]">package_2</span>
                      </div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Complimentary Gift Box
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Handcrafted rigid box adorned with pure satin ribbon and wax seal closure.
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-outline font-label-sm text-[10px] tracking-wider uppercase">
                      <span>UNLOCKED FIRST TIER</span>
                      <span className="text-primary font-bold">WORTH ₹350</span>
                    </div>
                  </div>

                  {/* Milestone 2 */}
                  <div className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between shadow-sm border border-secondary/30 group hover:bg-surface-container transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-mono font-bold text-[11px] rounded">
                          CART ≥ ₹5,000
                        </span>
                        <span className="material-symbols-outlined text-secondary text-[20px]">celebration</span>
                      </div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Flat ₹500 Instant Cart Credit
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Direct deduction across all luxury wedding registry and trousseau hampers.
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-outline font-label-sm text-[10px] tracking-wider uppercase">
                      <span>POPULAR SELECTION</span>
                      <span className="text-secondary font-bold">10% CART SAVING</span>
                    </div>
                  </div>

                  {/* Milestone 3 */}
                  <div className="bg-surface-container-highest/60 p-5 rounded-xl flex flex-col justify-between shadow-sm border border-primary/30 group hover:bg-surface-container-highest transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-mono font-bold text-[11px] rounded">
                          CART ≥ ₹10,000
                        </span>
                        <span className="material-symbols-outlined text-primary text-[20px]">workspace_premium</span>
                      </div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                        ₹1,500 OFF + Gold Leaf Keepsake
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Includes bespoke debossed wooden trousseau box and brass-etched tag.
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-outline font-label-sm text-[10px] tracking-wider uppercase">
                      <span>ULTIMATE ATELIER TIER</span>
                      <span className="text-primary font-bold">WORTH ₹2,400+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bank & Card Partner Offers Grid (Perforated Luxury Ticket Cards) */}
        {filteredBankOffers.length > 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] font-semibold">
                  Verified Partnerships
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Bank &amp; Credit Card Privileges
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                Instantly deducted at payment gateway. Valid on all bespoke wooden keepsakes, floral hampers, and silver suites.
              </p>
            </div>

            {/* 3-Column Ticket Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBankOffers.map((card) => (
                <div
                  key={card.id}
                  className="relative bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden border border-outline-variant/40"
                >
                  {/* Top Half */}
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded uppercase font-label-sm text-[11px] font-bold tracking-wider ${card.partnerStyle || 'bg-surface-container-high text-on-surface'}`}>
                        {card.partner}
                      </span>
                      <span className={`px-2 py-0.5 rounded uppercase font-label-sm text-[10px] font-bold tracking-wider ${card.badgeStyle}`}>
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold mt-1">
                      {card.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      {card.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-on-surface-variant font-label-sm text-[11px]">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {card.applicableIcon}
                      </span>
                      <span>Applicable on: {card.applicable}</span>
                    </div>
                  </div>

                  {/* Perforated Divider with Opposing Semicircle Cutouts */}
                  <div className="relative w-full py-1">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-surface rounded-r-full shadow-inner" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-surface rounded-l-full shadow-inner" />
                    <div className="w-full h-px border-b border-dashed border-outline-variant/80 px-4" />
                  </div>

                  {/* Bottom Voucher Half */}
                  <div className="p-4 bg-surface-container-low flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[9px] text-outline uppercase tracking-wider">
                        {card.isAutoApplied ? 'Auto Applied' : 'Offer Code'}
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface font-mono font-bold tracking-wider">
                        {card.code}
                      </span>
                    </div>

                    {card.learnLink ? (
                      <Link
                        to={card.learnLink}
                        className="px-4 py-1.5 bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors"
                      >
                        Learn
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => handleCopyCode(card.code, e)}
                        type="button"
                        className="px-4 py-1.5 bg-on-surface text-surface-container-lowest hover:bg-primary font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1"
                      >
                        {copiedCode === card.code ? (
                          <>
                            <span className="material-symbols-outlined text-[14px]">done</span>
                            <span>Copied</span>
                          </>
                        ) : (
                          <span>Copy</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Editorial Inspiration Split Banner */}
        {activeFilter === 'all' && !searchQuery && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 pb-12">
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-SqfNaMTXBajaA9Ob-Ut8BjkvfhiaDPBeQiZXr_jluPT-rh9zqhkuebuLXPE4xTrXA-qW4z8TCE0Ivg-r7Dvw-FUAJR2mGbK1r-9zVpdrAGDKfHRhgun3LJost4A2a3PDg7T74jP04eZ3x34eMNw7JCqwswX2YIeMx7MM2oeg25Xtyhm_OLH-LhsqCijmH6Pg0hHkL2aKeKUvKEqxfo6f7XO87U-v85bGYyJd_vjytfwapqZbby6lgw"
                  alt="A luxurious wicker picnic wedding hamper set open on a rustic oak coffee table with champagne tea cups, gold-embossed personalized photo frame, artisan biscuits, and fragrant dried botanical roses in warm candlelit ambient cottage lighting."
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="font-label-sm text-[10px] tracking-widest uppercase bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    Featured Keepsake Hamper
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center bg-surface-container-low">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.25em]">
                  Handcrafted Heritage
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1 tracking-tight">
                  Crafting Eternal Moments with Atelier Savings
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  Every personalized memory frame, etched silver coin, and artisanal trousseau trunk is lovingly constructed in our Jubilee Hills studio. Our bank privileges allow you to gift unmatched heirloom elegance without compromise.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    to="/collections"
                    className="px-6 py-2.5 bg-on-surface text-surface-container-lowest hover:bg-primary font-label-md text-label-md uppercase tracking-widest rounded-lg transition-colors shadow-sm"
                  >
                    Explore Keepsake Collections
                  </Link>
                  <Link
                    to="/shop"
                    className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span>Start a Registry</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* UPI & Digital Wallet Cashback Section */}
        {filteredUpiOffers.length > 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] font-semibold">
                  Instant Digital Settlements
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  UPI &amp; Digital Wallets
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
                Receive guaranteed instant cashback credited directly to your connected bank account or wallet.
              </p>
            </div>

            {/* 3-Column Wallet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredUpiOffers.map((wallet) => (
                <div
                  key={wallet.id}
                  className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 bg-surface-container-high rounded font-label-sm text-[10px] font-bold tracking-wider">
                        {wallet.partner}
                      </span>
                      <span className={`font-label-sm text-label-sm font-semibold ${wallet.rewardStyle}`}>
                        {wallet.reward}
                      </span>
                    </div>
                    <h4 className="font-title-sm text-title-sm text-on-surface font-semibold mt-2">
                      {wallet.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                      {wallet.description}
                    </p>
                  </div>

                  {wallet.code ? (
                    <div className="mt-5 pt-2 flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/30">
                      <span className="font-label-sm text-[11px] text-outline font-mono font-bold tracking-wider uppercase">
                        Code: {wallet.code}
                      </span>
                      <button
                        onClick={(e) => handleCopyCode(wallet.code, e)}
                        type="button"
                        className="text-on-surface font-label-sm text-label-sm uppercase font-bold hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {copiedCode === wallet.code ? (
                          <span className="text-brand-emerald">Copied</span>
                        ) : (
                          <span>Copy</span>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-5 pt-2 flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/30">
                      <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                        {wallet.footerText}
                      </span>
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        {wallet.footerIcon}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bespoke ASRA Coupon Codes (Store Exclusive Tiers) */}
        {filteredAtelierOffers.length > 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 pb-12">
            <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/40">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] font-semibold">
                    Atelier Exclusive
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Bespoke Store Vouchers
                  </h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                  Direct atelier voucher codes crafted for bridal showers, personalized wedding invitations, and trousseau trunks.
                </p>
              </div>

              {/* 3 Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredAtelierOffers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/40 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded uppercase font-label-sm text-[10px] font-bold tracking-wider ${voucher.badgeStyle}`}>
                          {voucher.badge}
                        </span>
                        <span className={`font-title-sm text-title-sm font-bold ${voucher.discountStyle}`}>
                          {voucher.discount}
                        </span>
                      </div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">
                        {voucher.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        {voucher.description}
                      </p>
                      <div className="mt-3 text-outline font-label-sm text-[11px]">
                        {voucher.subtext}
                      </div>
                    </div>

                    <div className="mt-5 pt-2 flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/30">
                      <span className="font-title-sm text-title-sm text-on-surface font-mono font-bold tracking-wider">
                        {voucher.code}
                      </span>
                      <button
                        onClick={(e) => handleCopyCode(voucher.code, e)}
                        type="button"
                        className="px-3.5 py-1 bg-on-surface text-surface-container-lowest hover:bg-primary font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1"
                      >
                        {copiedCode === voucher.code ? (
                          <>
                            <span className="material-symbols-outlined text-[14px]">done</span>
                            <span>Copied</span>
                          </>
                        ) : (
                          <span>Copy</span>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty state if search or filter yields no results */}
        {totalVisibleOffers === 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-16 text-center">
            <div className="max-w-md mx-auto p-8 bg-surface-container-low rounded-2xl border border-outline-variant/40">
              <span className="material-symbols-outlined text-outline text-[40px] mb-2 block">
                search_off
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                No matching privileges found
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                We couldn't find any offers matching "{searchQuery}". Try searching for another bank, partner or clear your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-5 px-5 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-on-surface transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </section>
        )}

        {/* How to Redeem Your Offer (4-Step Visual Guide) */}
        <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 pb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.25em]">
              Effortless Atelier Experience
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
              How to Redeem Your Privileges
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Follow four seamless steps to apply bank partner discounts and atelier voucher codes during checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-start relative group hover:bg-surface-container-low transition-colors">
              <span className="font-headline-md text-headline-md text-outline-variant/60 font-serif mb-2">
                01
              </span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">shopping_basket</span>
              </div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">Browse Keepsakes</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Curate personalized wedding favors, artisanal hampers, or bespoke jewelry boxes into your atelier bag.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-start relative group hover:bg-surface-container-low transition-colors">
              <span className="font-headline-md text-headline-md text-outline-variant/60 font-serif mb-2">
                02
              </span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
              </div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">Review Atelier Cart</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Confirm custom personalization details, gift messaging, and delivery schedule before clicking proceed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-start relative group hover:bg-surface-container-low transition-colors">
              <span className="font-headline-md text-headline-md text-outline-variant/60 font-serif mb-2">
                03
              </span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">account_balance</span>
              </div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">Select Payment Gateway</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Choose Credit Card, Net Banking, CRED Pay, or UPI to unlock partnered discounts seamlessly.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-start relative group hover:bg-surface-container-low transition-colors">
              <span className="font-headline-md text-headline-md text-outline-variant/60 font-serif mb-2">
                04
              </span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">savings</span>
              </div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">Enter Code &amp; Save</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Paste your copied promo code in the coupon field or select from the pre-loaded bank offer list to save instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ Accordion) */}
        <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* FAQ Left Intro */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.25em] font-semibold">
                Atelier Help Desk
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                Frequently Asked Questions
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                Have inquiries regarding bank discount eligibility, multi-coupon stacking, or delivery terms for customized gifts? Our concierge is on standby.
              </p>
              <div className="mt-8 p-5 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-[32px] shrink-0">
                  support_agent
                </span>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                    Wedding Concierge Desk
                  </span>
                  <a
                    href="mailto:shahnawazalirkl@gmail.com"
                    className="font-body-sm text-body-sm text-primary hover:underline mt-0.5"
                  >
                    shahnawazalirkl@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Accordion Right */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/40 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className="w-full p-5 flex items-center justify-between text-left font-title-sm text-title-sm text-on-surface font-semibold hover:text-primary transition-colors gap-4"
                    >
                      <span>{faq.q}</span>
                      <span
                        className={`material-symbols-outlined text-outline transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-outline-variant/30 text-on-surface-variant font-body-md text-body-md leading-relaxed animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Terms Modal: HDFC */}
        {activeModal === 'hdfc' && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-hdfc-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="bg-surface-container-lowest max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
                <h4 id="modal-hdfc-title" className="font-title-sm text-title-sm text-on-surface font-bold">
                  HDFC Bank Offer Terms &amp; Conditions
                </h4>
                <button
                  onClick={() => setActiveModal(null)}
                  aria-label="Close modal"
                  className="text-on-surface-variant hover:text-primary p-1 rounded-md transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="py-4 font-body-sm text-body-sm text-on-surface-variant space-y-2.5 leading-relaxed max-h-80 overflow-y-auto pr-1">
                <p>• Offer valid on HDFC Bank Retail Credit Cards, Debit Cards, and EasyEMI transactions.</p>
                <p>• Minimum transaction value of ₹7,999 is calculated exclusive of shipping and taxes.</p>
                <p>• Offer is valid up to 1 transaction per card during the calendar month.</p>
                <p>• Cannot be clubbed with corporate discount codes or bespoke bulk invoices.</p>
                <p>• ASRAWEDDINGCANVAS and HDFC Bank hold rights to alter campaign dates without prior notice.</p>
              </div>
              <div className="pt-3 flex justify-end border-t border-outline-variant/20">
                <button
                  onClick={() => setActiveModal(null)}
                  type="button"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-wider hover:bg-on-surface transition-colors"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Terms Modal: CRED */}
        {activeModal === 'cred' && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-cred-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="bg-surface-container-lowest max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
                <h4 id="modal-cred-title" className="font-title-sm text-title-sm text-on-surface font-bold">
                  CRED Pay Offer Terms &amp; Conditions
                </h4>
                <button
                  onClick={() => setActiveModal(null)}
                  aria-label="Close modal"
                  className="text-on-surface-variant hover:text-primary p-1 rounded-md transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="py-4 font-body-sm text-body-sm text-on-surface-variant space-y-2.5 leading-relaxed max-h-80 overflow-y-auto pr-1">
                <p>• Valid exclusively for registered CRED members paying via CRED UPI or CRED Pay gateway.</p>
                <p>• Maximum cashback capped at ₹500 per approved order with minimum cart of ₹1,999.</p>
                <p>• Cashback is disbursed directly into the user's primary linked bank account in the CRED app.</p>
                <p>• Offer is limited to two redemptions per member per month.</p>
              </div>
              <div className="pt-3 flex justify-end border-t border-outline-variant/20">
                <button
                  onClick={() => setActiveModal(null)}
                  type="button"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-wider hover:bg-on-surface transition-colors"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
