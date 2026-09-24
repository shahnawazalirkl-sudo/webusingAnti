import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import TermsOfServiceClientSection from '@/components/legal/TermsOfServiceClientSection';
import { PrintDocketButton } from '@/components/legal/LegalClientActions';

export const metadata: Metadata = {
  title: 'Terms of Service & Artisanal Covenant | ASRA Wedding Canvas',
  description: 'Official Terms of Service and artisanal commission charter for ASRA Wedding Canvas. Learn about our 3D digital proof sign-off, customized metallurgy production, and delivery guarantees.',
  openGraph: {
    title: 'Terms of Service & Artisanal Covenant | ASRA Wedding Canvas',
    description: 'Official Terms of Service and artisanal commission charter for ASRA Wedding Canvas. Learn about our 3D digital proof sign-off, customized metallurgy production, and delivery guarantees.',
    url: 'https://asraweddingcanvas.com/terms-of-service',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary/20 selection:text-on-surface">
      {/* ================= TOP MINIMAL UTILITY / VAULT DOCKET BAR ================= */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30 py-3.5 px-4 sm:px-6 lg:px-8 transition-all print:hidden">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          {/* Left: Back Navigation & Status */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="group flex items-center gap-2 text-xs font-semibold tracking-wider text-on-surface-variant hover:text-primary transition-colors uppercase cursor-pointer"
            >
              <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span>Back to Maison</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-6 border-l border-outline-variant/30 text-[11px] font-medium tracking-wide text-outline">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="uppercase tracking-widest text-on-surface-variant">Legal &amp; Customized Governance Protocol</span>
            </div>
          </div>

          {/* Center: Collection Seal & Brand Insignia */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant/40 flex items-center justify-center shadow-xs group-hover:border-primary transition-colors">
              <span className="font-serif text-xs font-bold text-primary tracking-tighter">AS</span>
            </div>
            <div className="text-left hidden md:block">
              <span className="block font-serif text-[11px] font-bold tracking-[0.2em] text-on-surface uppercase leading-tight">
                Maison ASRA
              </span>
              <span className="block text-[9px] font-medium tracking-widest text-primary uppercase">
                Terms of Collection Service
              </span>
            </div>
          </Link>

          {/* Right: Security Badge & Action */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-[#FAF4EB] px-3.5 py-1.5 rounded-full border border-primary/20 text-[11px] text-primary font-medium">
              <span className="material-symbols-outlined text-sm text-primary">lock</span>
              <span className="tracking-wider">256-Bit Encrypted Collection Covenant</span>
            </div>

            <PrintDocketButton />
          </div>
        </div>
      </header>

      {/* ================= HERO STATEMENT & METADATA ================= */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Editorial Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF4EB] border border-primary/20 text-[10px] sm:text-[11px] font-semibold text-primary tracking-[0.2em] uppercase mb-4">
            <span>◆</span>
            <span>Collection Client Charter &amp; Commission Terms</span>
            <span>◆</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface font-normal leading-[1.18] mb-4 tracking-tight">
            Terms of Service &amp; <br className="hidden sm:inline" />
            <span className="italic font-normal text-primary font-serif">Artisanal Covenant</span>
          </h1>
          <p className="text-on-surface-variant text-xs sm:text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Every initials casting, customized brass die, French velvet wedding essentials chest, and ceremonial gifts commission operates under the sovereign guidelines of the ASRA Collection Covenant.
          </p>

          {/* Document Metadata Strip */}
          <div className="mt-6 pt-5 border-t border-outline-variant/30 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-outline font-medium">
            <div>
              <span className="text-outline">Charter Docket:</span>{' '}
              <strong className="text-on-surface font-semibold font-mono">TOS-ASRA-2026-V5</strong>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <div>
              <span className="text-outline">Effective Date:</span>{' '}
              <strong className="text-on-surface font-semibold">January 1, 2026</strong>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <div>
              <span className="text-outline">Jurisdiction:</span>{' '}
              <strong className="text-on-surface font-semibold">Hyderabad &amp; Bengaluru Guild Benches</strong>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Certified Active Covenant</span>
            </div>
          </div>
        </div>

        {/* 3 KEY ASSURANCE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12">
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-xl text-primary">verified_user</span>
            </div>
            <h3 className="font-serif text-base font-semibold text-on-surface mb-1.5">No Production Without Digital Proof</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Zero metal is milled or leather debossed without your explicit 3D photorealistic render sign-off via our digital support docket.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-xl text-primary">layers</span>
            </div>
            <h3 className="font-serif text-base font-semibold text-on-surface mb-1.5">Archival Die Custodianship</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your CNC-milled solid brass family insignia die remains cataloged in our climate vault for 5 years for seamless anniversary re-orders.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-xl text-primary">schedule</span>
            </div>
            <h3 className="font-serif text-base font-semibold text-on-surface mb-1.5">Insured Ceremonial Handover</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              All destination consignments (Udaipur, Lake Como, Paris) are climate-sealed, crated, and 100% bonded against delivery interruption.
            </p>
          </div>
        </div>

        {/* MAIN COVENANT SECTION (Interactive Client Component) */}
        <TermsOfServiceClientSection />
      </main>

      {/* ================= BOTTOM MINIMAL DOCKET BAR ================= */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-5 px-4 sm:px-6 lg:px-8 text-xs text-outline print:hidden">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="font-serif text-xs font-bold text-on-surface tracking-wider">
              ASRA WEDDING CANVAS
            </span>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <span className="text-[11px] text-on-surface-variant">
              Collection Service Charter &amp; Sovereign Commission Covenant
            </span>
            <span className="text-outline-variant hidden md:inline">•</span>
            <span className="text-[11px] font-mono text-outline hidden md:inline">
              Docket #TOS-ASRA-2026-V5
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <span className="material-symbols-outlined text-sm text-emerald-600">verified_user</span>
              <span>Verified Legal Docket</span>
            </span>
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              Return to Collection Portal →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
