import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PRODUCTS } from '@/data/productsData';
import {
  Palette,
  Award,
  Zap,
  Sparkles,
  ShieldCheck,
  Package,
  Headphones,
  ArrowRight,
} from 'lucide-react';

import WeddingKeepsakesClient from '@/components/wedding/WeddingKeepsakesClient';

export const metadata: Metadata = {
  title: 'Customized Wedding Gifts & Bridal Luxuries | ASRA Wedding Canvas',
  description: 'Celebrate timeless unions with handcrafted vow books, personalized bridal hampers, initials wedding essentials boxes, and heirloom gifts crafted to cherish forever.',
  openGraph: {
    title: 'Customized Wedding Gifts & Bridal Luxuries | ASRA Wedding Canvas',
    description: 'Celebrate timeless unions with handcrafted vow books, personalized bridal hampers, initials wedding essentials boxes, and heirloom gifts crafted to cherish forever.',
    url: 'https://asraweddingcanvas.com/wedding-keepsakes',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function WeddingKeepsakesPage() {
  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* Top Ambient Glow & Hero Banner */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-gradient-to-b from-primary-fixed/25 via-secondary-container/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-outline mb-4"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/collections" className="hover:text-primary transition-colors">
              Wedding Collection
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Luxury Gifts &amp; Bridal Suites</span>
          </nav>

          {/* Editorial Banner */}
          <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden mb-8 border border-outline-variant/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2">
                  The Collection Wedding Suite
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-3">
                  Customized Wedding Gifts &amp; Bridal Luxuries
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Celebrate timeless unions with handcrafted vow books, personalized bridal hampers, initials wedding essentials boxes, and heirloom gifts crafted to cherish forever.
                </p>
              </div>

              {/* Key Metrics Badges */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 mt-4 lg:mt-0">
                <div className="bg-surface-container-low px-4 py-2.5 rounded-xl flex items-center gap-2.5 border border-outline-variant/30 shadow-xs">
                  <Palette className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface leading-tight font-bold font-serif">
                      140+
                    </span>
                    <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Wedding Creations
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low px-4 py-2.5 rounded-xl flex items-center gap-2.5 border border-outline-variant/30 shadow-xs">
                  <Award className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface leading-tight font-bold font-serif">
                      100%
                    </span>
                    <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Handcrafted Quality
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low px-4 py-2.5 rounded-xl flex items-center gap-2.5 border border-outline-variant/30 shadow-xs">
                  <Zap className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface leading-tight font-bold font-serif">
                      48H
                    </span>
                    <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Priority Shipping
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content: Interactive Catalog Client Section */}
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs text-outline uppercase tracking-wider">Loading Wedding Catalog...</div>}>
        <WeddingKeepsakesClient products={PRODUCTS} />
      </Suspense>

      {/* Specialist Wedding Services Privileges */}
      <section className="w-full bg-surface-container-low py-8 sm:py-10 lg:py-12 border-t border-outline-variant/20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2 font-sans">
              Specialist Wedding Services
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
              Curated Wedding Collection Privileges
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
              From personalized custom initials to complete destination wedding favor suites, let our master craftsmen bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {/* Privilege 1 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs flex flex-col justify-between group hover:shadow-md transition-all duration-300 p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2 group-hover:text-primary transition-colors">
                  Complimentary Bridal Initials
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  Every couple receives a customized digital and wax-stamp wedding initials crafted by our resident calligrapher on orders exceeding ₹5,000.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  href="/bespoke"
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>Claim Initials Consult</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Privilege 2 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs flex flex-col justify-between group hover:shadow-md transition-all duration-300 p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xs">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2 group-hover:text-primary transition-colors">
                  Bulk Favors &amp; Gifting Support
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  Planning Mehendi or destination wedding welcome hampers? Enjoy tiered bridal party discounts, custom wax packaging, and direct venue shipping.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  href="/bulk-orders"
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>View Bulk Privilege Tiers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Privilege 3 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs flex flex-col justify-between group hover:shadow-md transition-all duration-300 p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xs">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2 group-hover:text-primary transition-colors">
                  Archival Varmala Floral Preservation
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  Ship your sacred ceremony varmalas and bouquets to our master lab in Hyderabad. We freeze dry and encase them forever in crystal UV resin frames.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  href="/bespoke"
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>Book Flower Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Trust Banners */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <Sparkles className="w-7 h-7 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              100% Customized Craft
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal font-sans">
              Individualized couple names, dates &amp; vows
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <ShieldCheck className="w-7 h-7 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Insured Global Courier
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal font-sans">
              Zero damage guarantee across 140+ cities
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <Package className="w-7 h-7 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Wax-Sealed Luxury Box
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal font-sans">
              Unboxing worthy of wedding celebrations
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <Headphones className="w-7 h-7 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Collection Privilege Desk
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal font-sans">
              Dedicated bridal coordinator via WhatsApp
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
