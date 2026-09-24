"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { OfferCard } from '@/components/offers/OfferCard';
import { OfferTermsDialog } from '@/components/offers/OfferTermsDialog';
import { MilestoneTracker } from '@/components/offers/MilestoneTracker';
import OfferCountdownTimer from '@/components/offers/OfferCountdownTimer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface OfferItem {
  id: string;
  code?: string;
  partner?: string;
  partnerType?: string;
  badge?: string;
  badgeVariant?: string;
  title: string;
  description: string;
  validity?: string;
  validityIcon?: string;
  category: string;
  alsoCard?: boolean;
  minSpend?: number;
  discountAmount?: number;
  discountPercent?: number;
  maxDiscount?: number;
  applicable?: string;
  reward?: string;
  discount?: string;
  terms?: string[];
  [key: string]: unknown;
}

interface OffersClientExplorerProps {
  featuredOffers: OfferItem[];
  bankOffers: OfferItem[];
  upiOffers: OfferItem[];
  storeVouchers: OfferItem[];
  milestoneTiers: any[];
}

export default function OffersClientExplorer({
  featuredOffers,
  bankOffers,
  upiOffers,
  storeVouchers,
  milestoneTiers,
}: OffersClientExplorerProps) {
  const { showToast, applyCoupon, appliedCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOfferForTerms, setSelectedOfferForTerms] = useState<OfferItem | null>(null);

  // 1-Click Copy Code with Clipboard and Cart Synchronization
  const handleCopyCode = async (code: string, event?: React.MouseEvent) => {
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
  const matchesSearch = (item: OfferItem, query: string) => {
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
    return featuredOffers.filter((item) => {
      const matchCat =
        activeFilter === 'all' ||
        (activeFilter === 'card' && item.category === 'card') ||
        (activeFilter === 'upi' && item.category === 'upi');
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [featuredOffers, activeFilter, searchQuery]);

  const filteredBankOffers = useMemo(() => {
    return bankOffers.filter((item) => {
      const matchCat =
        activeFilter === 'all' ||
        activeFilter === 'card' ||
        (activeFilter === 'emi' && (item.category === 'emi' || item.alsoCard));
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [bankOffers, activeFilter, searchQuery]);

  const filteredUpiOffers = useMemo(() => {
    return upiOffers.filter((item) => {
      const matchCat = activeFilter === 'all' || activeFilter === 'upi';
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [upiOffers, activeFilter, searchQuery]);

  const filteredStoreVouchers = useMemo(() => {
    return storeVouchers.filter((item) => {
      const matchCat = activeFilter === 'all' || activeFilter === 'collection';
      return matchCat && matchesSearch(item, searchQuery);
    });
  }, [storeVouchers, activeFilter, searchQuery]);

  // Live Dynamic Counts
  const dynamicCounts = useMemo(() => {
    const allTotal =
      featuredOffers.length +
      bankOffers.length +
      upiOffers.length +
      storeVouchers.length;
    const cardTotal =
      featuredOffers.filter((o) => o.category === 'card').length +
      bankOffers.filter((o) => o.category === 'card').length;
    const upiTotal =
      featuredOffers.filter((o) => o.category === 'upi').length +
      upiOffers.length;
    const emiTotal = bankOffers.filter((o) => o.category === 'emi' || o.alsoCard).length;
    const collectionTotal = storeVouchers.length;

    return {
      all: allTotal,
      card: cardTotal,
      upi: upiTotal,
      emi: emiTotal,
      collection: collectionTotal,
    };
  }, [featuredOffers, bankOffers, upiOffers, storeVouchers]);

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
    <>
      {/* Active Applied Coupon Banner */}
      {appliedCoupon && appliedCoupon.code && (
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center justify-between gap-3">
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
        </div>
      )}

      {/* Search & Filter Category Bar with Countdown Timer */}
      <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <OfferCountdownTimer />
        </div>

        <div className="bg-surface-container-lowest p-2 sm:p-3 rounded-xl shadow-sm border border-outline-variant/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
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
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer"
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
                  className={`px-3 py-1.5 rounded-lg font-label-md text-xs uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
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

      {/* Featured Grand Banners */}
      {filteredFeatured.length > 0 && (
        <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFeatured.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer as any}
                variant="featured"
                copiedCode={copiedCode}
                onCopy={handleCopyCode}
                onOpenTerms={setSelectedOfferForTerms as any}
              />
            ))}
          </div>
        </section>
      )}

      {/* Celebratory Spend More, Save More Milestone Tracker */}
      {(activeFilter === 'all' || activeFilter === 'collection') && !searchQuery && (
        <MilestoneTracker milestones={milestoneTiers as any} />
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
                offer={card as any}
                variant="bank"
                copiedCode={copiedCode}
                onCopy={handleCopyCode}
                onOpenTerms={setSelectedOfferForTerms as any}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpiOffers.map((wallet) => (
              <OfferCard
                key={wallet.id}
                offer={wallet as any}
                variant="upi"
                copiedCode={copiedCode}
                onCopy={handleCopyCode}
                onOpenTerms={setSelectedOfferForTerms as any}
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
                  offer={voucher as any}
                  variant="voucher"
                  copiedCode={copiedCode}
                  onCopy={handleCopyCode}
                  onOpenTerms={setSelectedOfferForTerms as any}
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
              className="mt-5 uppercase tracking-wider text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </Button>
          </div>
        </section>
      )}

      {/* Centralized Dynamic Terms & Conditions Dialog */}
      <OfferTermsDialog
        isOpen={Boolean(selectedOfferForTerms)}
        onClose={() => setSelectedOfferForTerms(null)}
        offer={selectedOfferForTerms as any}
      />
    </>
  );
}
