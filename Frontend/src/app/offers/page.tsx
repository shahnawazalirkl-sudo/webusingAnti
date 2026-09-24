import React from 'react';
import type { Metadata } from 'next';
import {
  FEATURED_OFFERS,
  BANK_OFFERS,
  UPI_OFFERS,
  STORE_VOUCHERS,
  MILESTONE_TIERS,
  OFFER_FAQS,
} from '@/data/offersData';
import { OffersFaq } from '@/components/offers/OffersFaq';
import OffersClientExplorer from '@/components/offers/OffersClientExplorer';

export const metadata: Metadata = {
  title: 'Exclusive Wedding Offers & Privileges | ASRA Wedding Canvas',
  description: 'Unlock curated privileges across leading credit cards, verified UPI cashbacks, no-cost wedding EMIs, and customized collection codes.',
  openGraph: {
    title: 'Exclusive Wedding Offers & Privileges | ASRA Wedding Canvas',
    description: 'Unlock curated privileges across leading credit cards, verified UPI cashbacks, no-cost wedding EMIs, and customized collection codes.',
    url: 'https://asraweddingcanvas.com/offers',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function OffersPage() {
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
        </section>

        {/* Interactive Explorer (Filter Pills, Search, Countdown Timer, Cards, Dialogs) */}
        <OffersClientExplorer
          featuredOffers={FEATURED_OFFERS}
          bankOffers={BANK_OFFERS}
          upiOffers={UPI_OFFERS}
          storeVouchers={STORE_VOUCHERS}
          milestoneTiers={MILESTONE_TIERS}
        />

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
      </div>
    </div>
  );
}
