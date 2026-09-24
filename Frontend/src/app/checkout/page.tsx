import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CheckoutFormClient from '@/components/checkout/CheckoutFormClient';

export const metadata: Metadata = {
  title: 'Ceremony Venue & White-Glove Handover Details | Checkout | ASRA Wedding Canvas',
  description: 'Finalize your wedding essentials order, configure bespoke monogram proofs, and select insured handover to palace or residence.',
  openGraph: {
    title: 'Ceremony Venue & White-Glove Handover Details | Checkout | ASRA Wedding Canvas',
    description: 'Finalize your wedding essentials order, configure bespoke monogram proofs, and select insured handover to palace or residence.',
    url: 'https://asraweddingcanvas.com/checkout',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col justify-between selection:bg-primary/20 selection:text-on-surface">
      {/* 1. MINIMAL DISTRACTION-FREE HEADER (Server Rendered) */}
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant/30 sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left: Return to Collection Cart */}
          <div className="flex items-center space-x-2">
            <Link
              href="/cart"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors group font-sans"
            >
              <span className="material-symbols-outlined text-[16px] mr-1.5 transform group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="hidden sm:inline">Return to Cart</span>
              <span className="sm:hidden">Cart</span>
            </Link>
          </div>

          {/* Center: Official ASRA Brand Emblem */}
          <div className="flex flex-col items-center justify-center py-2">
            <Link href="/" className="relative w-36 h-10 sm:h-12 block">
              <Image
                alt="ASRA Wedding Canvas Crest Logo"
                className="object-contain hover:opacity-90 transition-opacity"
                src="/assets/cdn/img_36917e8d2065.jpg"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          </div>

          {/* Right: Security & Insurance Guarantee Trust Badge */}
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <div className="text-right hidden sm:block">
              <div className="text-[11px] font-bold tracking-wider uppercase text-on-surface flex items-center gap-1 justify-end font-sans">
                <span>256-Bit SSL Encrypted</span>
              </div>
              <p className="text-[10px] text-on-surface-variant tracking-tight font-sans">
                White-Glove Insured Shipping
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* 2. MAIN CHECKOUT CONTENT */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full flex-grow">
        
        {/* Page Title Area (Server Rendered) */}
        <div className="mb-8">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary font-semibold block mb-1 font-sans">
            Confidential Order Placement
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface font-normal leading-tight">
            Ceremony Venue &amp; White-Glove Handover Details
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mt-1.5 leading-relaxed font-sans">
            Your customized order undergoes precision laser engraving, 24k gold die stamping, and climate-controlled packaging prior to dedicated delivery.
          </p>
        </div>

        {/* Client Interactive Checkout Flow */}
        <CheckoutFormClient />

      </main>

      {/* 3. MINIMAL DISTRACTION-FREE BOTTOM SECURITY STRIP (Server Rendered) */}
      <footer className="w-full bg-[#FDFCFA] border-t border-[#EAE5DC] py-6 mt-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1F1B18]/60 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-sm text-[#2C2520] tracking-wider font-semibold">ASRA WEDDING CANVAS</span>
            <span>• Private Collection &amp; Wedding Essentials Vaults</span>
          </div>

          <div className="flex flex-wrap items-center justify-center space-x-6 text-[11px]">
            <Link href="/bespoke" className="hover:text-[#1F1B18] transition-colors">Support Protocols</Link>
            <Link href="/about" className="hover:text-[#1F1B18] transition-colors">Hallmark Verification</Link>
            <Link href="/return-policy" className="hover:text-[#1F1B18] transition-colors">Delivery Insurance Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[#1F1B18] transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-[#1F1B18] transition-colors">Confidentiality Guarantee</Link>
          </div>

          <div className="text-[10px] text-[#1F1B18]/50">
            © 2026 ASRA Collection. All royal rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
