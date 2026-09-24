import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReturnPolicyClientSection from '@/components/legal/ReturnPolicyClientSection';
import { CopyDocketButton } from '@/components/legal/LegalClientActions';

export const metadata: Metadata = {
  title: 'Return & Refund Policy for Customized Goods | ASRA Wedding Canvas',
  description: 'Explore the ASRA Wedding Canvas return, refund, and replacement policy. Phased cancellation windows, 100% white-glove delivery warranty, and complimentary brass die vaulting.',
  openGraph: {
    title: 'Return & Refund Policy for Customized Goods | ASRA Wedding Canvas',
    description: 'Explore the ASRA Wedding Canvas return, refund, and replacement policy. Phased cancellation windows, 100% white-glove delivery warranty, and complimentary brass die vaulting.',
    url: 'https://asraweddingcanvas.com/return-policy',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* DISTRACTION-FREE MINIMAL TOP UTILITY BAR (No standard Header) */}
      <header className="w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50 print:hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Back / Breadcrumb Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all duration-300 group cursor-pointer focus:outline-hidden"
            aria-label="Return to Collection Portal"
          >
            <span className="material-symbols-outlined text-[18px] transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span>Return to Collection Portal</span>
          </Link>

          {/* Centered ASRA Crest Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" title="ASRA Wedding Canvas Home" className="relative block h-10 sm:h-11 w-32">
              <Image
                src="/assets/cdn/img_07137c99d96f.png"
                alt="ASRA Wedding Canvas Crest Logo"
                className="h-10 sm:h-11 w-auto object-contain drop-shadow-xs hover:opacity-90 transition-opacity"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          </div>

          {/* Live Trust & Compliance Status */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Legal Protocol Validated</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-[18px] text-primary">lock</span>
              <span className="tracking-wide hidden sm:inline">Consumer Rights Act &amp; Die Vault Policy</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN EDITORIAL CONTENT */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Hero Docket Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4EB] border border-primary/20 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-4 shadow-xs">
            <span>✦</span>
            <span>Collection Customized Covenant &amp; Gift Guarantee</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-4">
            Return &amp; Refund Policy for Customized Goods
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Due to the individual metallurgy casting, custom copperplate calligraphy, and temperature-stabilized floral infusions, every ASRA creation is uniquely commissioned. Here is our transparent protocol.
          </p>

          {/* Metadata Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs text-on-surface-variant pt-4 border-t border-outline-variant/30">
            <CopyDocketButton docketId="ASRA-POL-CUSTOMIZED-2026" label="Protocol Reference:" />

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-on-surface">Governing Jurisdiction:</span>
              <span>Customized Handcrafted Luxury Standards (India)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-on-surface">Effective Cycle:</span>
              <span>2026 / 2027 Wedding Season</span>
            </div>
          </div>
        </div>

        {/* QUICK REFERENCE EXECUTIVE MATRIX (4 Key Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12">
          {/* Pillar 1 */}
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] text-primary flex items-center justify-center mb-3 border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1">Pre-Casting Window</h3>
            <p className="text-xs font-semibold text-emerald-700 mb-2">100% Full Refund (2h)</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Cancel or modify free of charge before the 3D solid brass die metal casting begins.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] text-primary flex items-center justify-center mb-3 border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1">Digital Proof Guarantee</h3>
            <p className="text-xs font-semibold text-primary mb-2">3 Free Revisions</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Unlimited initials adjustments and 3 calligraphy script reviews on WhatsApp before deboss.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] text-primary flex items-center justify-center mb-3 border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1">Delivery Protection</h3>
            <p className="text-xs font-semibold text-emerald-700 mb-2">100% Remake &amp; Express Air</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Any breakage or floral wilting in white-glove delivery replaced within 24–48 hours at zero cost.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] text-primary flex items-center justify-center mb-3 border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1">Brass Die Vaulting</h3>
            <p className="text-xs font-semibold text-primary mb-2">Permanent Heirloom</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your custom cast metal die is preserved in our vault for 5 years for instant lifetime anniversary reorders.
            </p>
          </div>
        </div>

        {/* Interactive Client Section (Clauses, Sidebar, FAQs, Modals) */}
        <ReturnPolicyClientSection />
      </main>

      {/* MINIMAL COPYRIGHT LEGAL BAR (No full footer) */}
      <footer className="border-t border-outline-variant/30 bg-surface-container-low py-4 print:hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-[11px] text-outline flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2 tracking-widest text-on-surface font-semibold uppercase">
            <span>ASRA WEDDING CANVAS</span>
            <span>•</span>
            <span className="font-sans font-normal tracking-normal text-on-surface-variant lowercase">Customized Collection Registry &amp; Vault Services</span>
          </div>
          <div>
            © 2026 ASRA Private Limited. All customized designs, metallurgical dies, and covenants reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
