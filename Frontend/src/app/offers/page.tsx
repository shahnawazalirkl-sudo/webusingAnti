"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  FEATURED_OFFERS,
  BANK_OFFERS,
  UPI_OFFERS,
  STORE_VOUCHERS,
  MILESTONE_TIERS,
  OFFER_FAQS,
} from '@/data/offersData';
import { OfferCard } from '@/components/offers/OfferCard';
import { OfferTermsDialog } from '@/components/offers/OfferTermsDialog';
import { MilestoneTracker } from '@/components/offers/MilestoneTracker';
import { OffersFaq } from '@/components/offers/OffersFaq';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const OffersPage = () => {
  const { showToast, applyCoupon, appliedCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOfferForTerms, setSelectedOfferForTerms] = useState(null);

  // 1-Click Copy Code with Clipboard and Cart Synchronization
  const handleCopyCode = async (code, event) => {
    if (event) event.stopPropagation();
    if (!code) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedCode(code);
      applyCoupon(code);
      showToast(`Coupon "${code}" copied & applied to your shopping cart!`);
      setTimeout(() => setCopiedCode(null), 2500);
    } catch (err) {
      console.error('Failed to copy code', err);
      showToast(`Coupon code is: ${code}`);
    }
  };

  // Helper search predicate
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
      item.discount,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return searchable.includes(q);
  };

  // Filtered Collections
  const filteredFeatured = useMemo(() => {
    return FEATURED_OFFERS.filter((item) => {
      const matchCat =
        activeFilter === 'all' ||
        (activeFilter === 'card' && item.category === 'card') ||
        (activeFilter === 'upi' && item.category === 'upi');
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [activeFilter, searchQuery]);

  const filteredBankOffers = useMemo(() => {
    return BANK_OFFERS.filter((item) => {
      const matchCat =
        activeFilter === 'all' ||
        activeFilter === 'card' ||
        (activeFilter === 'emi' && (item.category === 'emi' || item.alsoCard));
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [activeFilter, searchQuery]);

  const filteredUpiOffers = useMemo(() => {
    return UPI_OFFERS.filter((item) => {
      const matchCat = activeFilter === 'all' || activeFilter === 'upi';
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [activeFilter, searchQuery]);

  const filteredStoreVouchers = useMemo(() => {
    return STORE_VOUCHERS.filter((item) => {
      const matchCat = activeFilter === 'all' || activeFilter === 'collection';
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [activeFilter, searchQuery]);

  // Live Dynamic Counts
  const dynamicCounts = useMemo(() => {
    const allTotal =
      FEATURED_OFFERS.length +
      BANK_OFFERS.length +
      UPI_OFFERS.length +
      STORE_VOUCHERS.length;
    const cardTotal =
      FEATURED_OFFERS.filter((o) => o.category === 'card').length +
      BANK_OFFERS.filter((o) => o.category === 'card').length;
    const upiTotal =
      FEATURED_OFFERS.filter((o) => o.category === 'upi').length +
      UPI_OFFERS.length;
    const emiTotal = BANK_OFFERS.filter((o) => o.category === 'emi' || o.alsoCard).length;
    const collectionTotal = STORE_VOUCHERS.length;

    return {
      all: allTotal,
      card: cardTotal,
      upi: upiTotal,
      emi: emiTotal,
      collection: collectionTotal,
    };
  }, []);

  const totalVisibleOffers =
    filteredFeatured.length +
    filteredBankOffers.length +
    filteredUpiOffers.length +
    filteredStoreVouchers.length;

  const categories = [
    { key: 'all', label: 'All Offers', count: dynamicCounts.all },
    { key: 'card', label: 'Credit Cards', count: dynamicCounts.card },
    { key: 'upi', label: 'UPI & Wallets', count: dynamicCounts.upi },
    { key: 'emi', label: 'Wedding EMI', count: dynamicCounts.emi },
    { key: 'collection', label: 'Collection Codes', count: dynamicCounts.collection },
  ];

  return (
    <div className="w-full bg-surface min-h-screen text-on-surface">
      <div className="flex flex-col w-full">
        {/* Editorial Header */}
        <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-4">
            <div className="lg:col-span-8 flex flex-col">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-1">
                The Collection Privilege Suite
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface">
                Save More With <span className="italic font-normal text-secondary">Exclusive Offers</span>
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                Unlock curated privileges across leading credit cards, verified UPI cashbacks, no-cost wedding EMIs, and customized collection codes crafted to elevate every bridal gift and celebratory hamper.
              </p>
            </div>

            {/* Quick Privilege Stats Pill */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 w-full sm:w-auto shadow-sm border border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px]">savings</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-outline">
                    Total Collection Savings
                  </span>
                  <span className="font-serif text-base sm:text-lg font-medium text-on-surface">
                    Up to ₹4,500 Per Order
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Applied Coupon Banner (If User Has Active Coupon in Cart) */}
          {appliedCoupon && appliedCoupon.code && (
            <div className="mb-4 bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                <span className="text-xs text-on-surface">
                  Active Cart Coupon: <strong className="font-mono text-primary">{appliedCoupon.code}</strong> (
                  {appliedCoupon.title || appliedCoupon.description})
                </span>
              </div>
              <Link href="/cart">
                <Button size="sm" variant="outline" className="text-xs h-7 px-2.5">
                  View Cart
                </Button>
              </Link>
            </div>
          )}

          {/* Search & Filter Category Bar */}
          <div className="mt-4 bg-surface-container-lowest p-2 sm:p-3 rounded-xl shadow-sm border border-outline-variant/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input with Shadcn styling */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bank, partner, or voucher code..."
                className="pl-10 pr-9 py-2 bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary/50 text-xs sm:text-sm"
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

            {/* Filter Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {categories.map((tab) => {
                const isActive = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-xs uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-on-surface text-surface-container-lowest shadow-sm'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-surface-container-lowest/20 text-surface-container-lowest'
                          : 'bg-surface-container-high text-outline'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Grand Banners (2-Column Highlights) */}
        {filteredFeatured.length > 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFeatured.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  variant="featured"
                  copiedCode={copiedCode}
                  onCopy={handleCopyCode}
                  onOpenTerms={setSelectedOfferForTerms}
                />
              ))}
            </div>
          </section>
        )}

        {/* Celebratory Spend More, Save More Milestone Tracker */}
        {(activeFilter === 'all' || activeFilter === 'collection') && !searchQuery && (
          <MilestoneTracker milestones={MILESTONE_TIERS} />
        )}

        {/* Bank & Card Privileges Grid */}
        {filteredBankOffers.length > 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] font-semibold">
                  Verified Partnerships
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface tracking-tight">
                  Bank &amp; Credit Card Privileges
                </h2>
              </div>
              <p className="text-xs text-on-surface-variant max-w-sm">
                Instantly deducted at payment gateway. Valid on all customized wooden gifts, floral hampers, and silver suites.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBankOffers.map((card) => (
                <OfferCard
                  key={card.id}
                  offer={card}
                  variant="bank"
                  copiedCode={copiedCode}
                  onCopy={handleCopyCode}
                  onOpenTerms={setSelectedOfferForTerms}
                />
              ))}
            </div>
          </section>
        )}

        {/* UPI & Digital Wallet Cashback Section */}
        {filteredUpiOffers.length > 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] font-semibold">
                  Instant Digital Settlements
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface tracking-tight">
                  UPI &amp; Digital Wallets
                </h2>
              </div>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Receive guaranteed instant cashback credited directly to your connected bank account or wallet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredUpiOffers.map((wallet) => (
                <OfferCard
                  key={wallet.id}
                  offer={wallet}
                  variant="upi"
                  copiedCode={copiedCode}
                  onCopy={handleCopyCode}
                  onOpenTerms={setSelectedOfferForTerms}
                />
              ))}
            </div>
          </section>
        )}

        {/* Store Exclusive Voucher Codes */}
        {filteredStoreVouchers.length > 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
            <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/40">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] font-semibold">
                    Collection Exclusive
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface tracking-tight">
                    Customized Store Vouchers
                  </h2>
                </div>
                <p className="text-xs text-on-surface-variant max-w-sm">
                  Direct collection voucher codes crafted for bridal showers, personalized wedding invitations, and wedding essentials trunks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredStoreVouchers.map((voucher) => (
                  <OfferCard
                    key={voucher.id}
                    offer={voucher}
                    variant="voucher"
                    copiedCode={copiedCode}
                    onCopy={handleCopyCode}
                    onOpenTerms={setSelectedOfferForTerms}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State when filter yields 0 results */}
        {totalVisibleOffers === 0 && (
          <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-16 text-center">
            <div className="max-w-md mx-auto p-8 bg-surface-container-low rounded-2xl border border-outline-variant/40">
              <span className="material-symbols-outlined text-outline text-[40px] mb-2 block">
                search_off
              </span>
              <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-semibold">
                No matching privileges found
              </h3>
              <p className="text-xs text-on-surface-variant mt-2">
                We couldn't find any offers matching "{searchQuery}". Try searching for another bank, partner, or reset your filters.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                variant="default"
                size="sm"
                className="mt-5 uppercase tracking-wider text-xs font-semibold"
              >
                Reset Filters
              </Button>
            </div>
          </section>
        )}

        {/* How to Redeem Your Offer (4-Step Visual Guide) */}
        <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="font-label-sm text-xs text-primary uppercase tracking-[0.25em]">
              Effortless Collection Experience
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface tracking-tight mt-1">
              How to Redeem Your Privileges
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2">
              Follow four seamless steps to apply bank partner discounts and collection voucher codes during checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-start group hover:bg-surface-container-low transition-colors">
              <span className="font-serif text-2xl text-outline-variant/60 mb-2">01</span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">shopping_basket</span>
              </div>
              <h3 className="font-serif text-base font-medium leading-snug text-on-surface">Browse Gifts</h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Curate personalized wedding favors, artisanal hampers, or customized jewelry boxes into your collection cart.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-start group hover:bg-surface-container-low transition-colors">
              <span className="font-serif text-2xl text-outline-variant/60 mb-2">02</span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
              </div>
              <h3 className="font-serif text-base font-medium leading-snug text-on-surface">Review Collection Cart</h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Confirm custom personalization details, gift messaging, and delivery schedule before clicking proceed.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-start group hover:bg-surface-container-low transition-colors">
              <span className="font-serif text-2xl text-outline-variant/60 mb-2">03</span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">account_balance</span>
              </div>
              <h3 className="font-serif text-base font-medium leading-snug text-on-surface">Select Payment Gateway</h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Choose Credit Card, Net Banking, CRED Pay, or UPI to unlock partnered discounts seamlessly.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-start group hover:bg-surface-container-low transition-colors">
              <span className="font-serif text-2xl text-outline-variant/60 mb-2">04</span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">savings</span>
              </div>
              <h3 className="font-serif text-base font-medium leading-snug text-on-surface">Enter Code &amp; Save</h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Paste your copied promo code in the coupon field or select from the pre-loaded bank offer list to save instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Accessible FAQ Accordion */}
        <OffersFaq faqs={OFFER_FAQS} />

        {/* Centralized Dynamic Terms & Conditions Dialog */}
        <OfferTermsDialog
          isOpen={Boolean(selectedOfferForTerms)}
          onClose={() => setSelectedOfferForTerms(null)}
          offer={selectedOfferForTerms}
        />
      </div>
    </div>
  );
};

export default OffersPage;
