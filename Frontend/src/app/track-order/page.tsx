import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TrackOrderClient from '@/components/track/TrackOrderClient';

export const metadata: Metadata = {
  title: 'Live White-Glove Order Tracking & Telemetry | ASRA Wedding Canvas',
  description: 'Real-time surveillance, climate telemetry, and white-glove delivery logs for your custom initials bridal and wedding essentials ensembles.',
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface font-sans antialiased text-[13px] leading-relaxed selection:bg-[#E8DFD3] selection:text-black">
      {/* ==================== MINIMAL UTILITY HEADER (NO GLOBAL NAVBAR) ==================== */}
      <header className="bg-white border-b border-outline-variant/30 py-3 px-4 sm:px-6 md:px-12 sticky top-0 z-40 shadow-sm no-print">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          {/* Left: Return Navigation Link */}
          <Link
            href="/order-confirmation"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors group"
          >
            <span className="material-symbols-outlined w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span>Return to Orders</span>
          </Link>

          {/* Center: Collection Brand Emblem */}
          <div className="flex items-center justify-center">
            <Link href="/" className="relative block h-9 sm:h-10 w-28">
              <Image
                alt="ASRA Wedding Canvas Crest"
                className="object-contain"
                src="/assets/cdn/img_016731a0c986.png"
                fill
                priority
                sizes="(max-width: 768px) 120px, 150px"
              />
            </Link>
          </div>

          {/* Right: Security & Live Delivery Status Badges */}
          <div className="flex items-center gap-2 sm:gap-4 text-[11px]">
            <Link
              href="/client-portal"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface text-primary hover:bg-[#F4ECE0] font-medium text-[10px] sm:text-[11px] rounded-full border border-[#E7D5BF] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B7443]"></span>
              <span>Sovereign My Account Vault →</span>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#E8F3EE] text-[#0F3828] font-medium rounded-full border border-[#D3E5DC]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Live White-Glove GPS Delivery</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">shield</span>
              <span className="tracking-tight">256-Bit Encrypted Collection Docket</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN TRACKER CONTENT ==================== */}
      <main className="flex-grow max-w-[1360px] mx-auto w-full px-4 sm:px-6 md:px-12 py-8 md:py-10">
        <Suspense
          fallback={
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">Acquiring Satellite Telemetry...</p>
            </div>
          }
        >
          <TrackOrderClient />
        </Suspense>
      </main>

      {/* ==================== MINIMAL LEGAL FOOTER ==================== */}
      <footer className="mt-12 py-5 border-t border-outline-variant/30 bg-white text-center text-[10px] text-on-surface-variant tracking-normal no-print">
        <div className="max-w-[1360px] mx-auto px-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="font-bold text-on-surface uppercase tracking-wider">ASRA Wedding Canvas</span>
          <span>•</span>
          <span>Private Collection &amp; Wedding Essentials Vaults</span>
          <span>•</span>
          <span>Support Protocols</span>
          <span>•</span>
          <span>Hallmark Verification</span>
          <span>•</span>
          <span>Delivery Insurance Policy</span>
          <span>•</span>
          <span>Confidentiality Guarantee</span>
          <span>•</span>
          <span>© 2026 ASRA Collection. All royal rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
