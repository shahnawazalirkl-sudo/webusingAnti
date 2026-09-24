import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OrderConfirmationClient from '@/components/order/OrderConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmation & Royal Docket | ASRA Wedding Canvas',
  description: 'Artisanal collection and white-glove delivery confirmation docket for your customized ceremony wedding suites.',
};

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between antialiased selection:bg-primary/20 selection:text-on-surface font-sans">
      {/* ==================== MINIMAL UTILITY HEADER ==================== */}
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant/30 sticky top-0 z-50 no-print">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-on-surface-variant hover:text-primary transition-colors group font-sans"
          >
            <span className="material-symbols-outlined text-[16px] transform group-hover:-translate-x-1 transition-transform text-primary">
              arrow_back
            </span>
            <span className="hidden sm:inline">Return to Homepage</span>
            <span className="sm:hidden">Home</span>
          </Link>

          {/* Central Logo */}
          <div className="flex flex-col items-center">
            <Link href="/" className="relative block h-9 sm:h-10 w-28">
              <Image
                src="/assets/cdn/img_f404984f128a.png"
                alt="ASRA Wedding Canvas Logo"
                className="object-contain drop-shadow-xs"
                fill
                priority
                sizes="(max-width: 768px) 120px, 150px"
              />
            </Link>
          </div>

          {/* Security & Support Status */}
          <div className="flex items-center gap-4 text-xs font-sans">
            <div className="hidden md:flex items-center gap-2 text-on-surface-variant bg-[#FAF4EB] px-3 py-1.5 rounded-full border border-primary/20">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-semibold text-on-surface text-[11px]">Order Booked &amp; Vaulted</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
              <span className="hidden sm:inline font-medium">256-Bit Secured Order Docket</span>
            </div>
          </div>
        </div>

        {/* Stepper Strip */}
        <div className="bg-[#FAF4EB]/60 border-t border-outline-variant/30 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-xs font-sans">
            {/* Step 1 Completed */}
            <Link href="/cart" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="w-5 h-5 rounded-full bg-on-surface text-surface flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span className="hidden sm:inline font-semibold tracking-wider text-[11px]">1. REVIEW CART</span>
              <span className="sm:hidden text-[10px] font-semibold">1. Cart</span>
            </Link>
            <div className="w-8 sm:w-16 md:w-24 h-[1px] bg-primary/40"></div>

            {/* Step 2 Completed */}
            <Link href="/checkout" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="w-5 h-5 rounded-full bg-on-surface text-surface flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span className="hidden sm:inline font-semibold tracking-wider text-[11px]">2. CEREMONY &amp; ADDRESS</span>
              <span className="sm:hidden text-[10px] font-semibold">2. Address</span>
            </Link>
            <div className="w-8 sm:w-16 md:w-24 h-[1px] bg-primary/40"></div>

            {/* Step 3 Active / Completed */}
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold ring-2 ring-primary/30">
                ✓
              </span>
              <span className="tracking-wider uppercase text-[11px] hidden sm:inline">3. SHIPPING CONFIRMED</span>
              <span className="sm:hidden text-[10px]">3. Confirmed</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN ORDER CONFIRMATION CONTENT ==================== */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full flex-grow font-sans">
        <Suspense
          fallback={
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">Loading Confirmation Docket...</p>
            </div>
          }
        >
          <OrderConfirmationClient />
        </Suspense>
      </main>

      {/* ==================== MINIMAL CONFIDENTIALITY & LEGAL BAR (NO MULTI-COLUMN FOOTER) ==================== */}
      <footer className="w-full bg-brand-cream border-t border-brand-border/70 py-5 px-4 sm:px-6 mt-8 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-brand-muted">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-brand-dark tracking-wider">ASRA WEDDING CANVAS</span>
            <span>• Private Collection &amp; Wedding Essentials Vaults</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px]">
            <Link href="/bespoke" className="hover:text-brand-dark transition-colors">Support Protocols</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-brand-dark transition-colors">Hallmark Verification</Link>
            <span>•</span>
            <Link href="/return-policy" className="hover:text-brand-dark transition-colors">Delivery Insurance Policy</Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-brand-dark transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-brand-dark transition-colors">Confidentiality Guarantee</Link>
          </div>
          <div>
            <span>© 2026 ASRA Collection. All royal rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
