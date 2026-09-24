import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PrivacyPolicyClientSection from '@/components/legal/PrivacyPolicyClientSection';
import { PrintDocketButton, CopyDocketButton } from '@/components/legal/LegalClientActions';

export const metadata: Metadata = {
  title: 'Client Privacy Policy & Confidentiality Covenant | ASRA Wedding Canvas',
  description: 'Read the ASRA Wedding Canvas client privacy policy and confidentiality covenant. Strict data custodianship, VIP bridal non-disclosure agreements, and 5-year brass die vault security.',
  openGraph: {
    title: 'Client Privacy Policy & Confidentiality Covenant | ASRA Wedding Canvas',
    description: 'Read the ASRA Wedding Canvas client privacy policy and confidentiality covenant. Strict data custodianship, VIP bridal non-disclosure agreements, and 5-year brass die vault security.',
    url: 'https://asraweddingcanvas.com/privacy-policy',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* ================= TOP FOCUSED COLLECTION UTILITY BAR (NO WEBSITE HEADER) ================= */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-40 transition-shadow duration-300 shadow-xs print:hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Back action & Vault context */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all duration-300 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span>Back to Maison</span>
            </Link>
            <span className="hidden sm:inline-block w-px h-4 bg-outline-variant/40"></span>
            <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-wider text-outline">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Legal &amp; Client Trust Registry</span>
            </div>
          </div>

          {/* Center: Emblem Mark */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full border border-primary/40 bg-surface-container-lowest flex items-center justify-center shadow-xs group-hover:border-primary transition-colors">
              <span className="font-serif italic font-bold text-base text-primary">AS</span>
            </div>
            <div className="text-center hidden md:block">
              <span className="font-serif tracking-widest uppercase font-semibold text-xs text-on-surface block leading-tight">
                Maison ASRA
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-medium">
                Customized Privacy Covenant
              </span>
            </div>
          </Link>

          {/* Right: Security Credentials & Direct Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded bg-[#FAF4EB] border border-primary/20 text-[10px] font-semibold tracking-wider text-primary uppercase">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>256-Bit Encrypted Vault Protocol</span>
            </div>

            <PrintDocketButton />
          </div>
        </div>
      </header>

      {/* ================= HERO EDITORIAL TITLE & COVENANT SUMMARY ================= */}
      <section className="relative pt-10 sm:pt-12 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/30 bg-surface">
        <div className="max-w-[1360px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4EB] border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
              Maison Security, NDA &amp; Personal Data Governance
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-4">
            Client Privacy Policy &amp; <br className="hidden sm:inline" />
            <span className="italic font-semibold text-primary">Confidentiality Covenant</span>
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
            Every initials die, wedding guest list, heraldic crest vector, and ceremonial date entrusted to ASRA Wedding Canvas is held under strict high-jewelry confidentiality standards. Herein lies our sovereign pledge to your privacy and metadata discretion.
          </p>

          {/* Key Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-on-surface-variant">
            <CopyDocketButton docketId="PRIV-ASRA-2026-V4" />

            <span className="text-outline-variant hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-on-surface">Effective Date:</span>
              <span>January 1, 2026</span>
            </div>

            <span className="text-outline-variant hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-on-surface">Jurisdiction:</span>
              <span>India (DPDP Act 2023) &amp; GDPR Sovereign Compliance</span>
            </div>

            <span className="text-outline-variant hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="text-emerald-800 font-medium">Active Covenant</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3 TRUST PILLARS RIBBON ================= */}
      <section className="bg-surface-container-low border-b border-outline-variant/30">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Pillar 1 */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] text-primary">verified_user</span>
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-medium text-on-surface">Zero-Sale Promise</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  We never sell, monetize, broker, or rent your bridal records, private guest addresses, or photographic assets to third-party advertisers.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] text-primary">lock</span>
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-medium text-on-surface">Physical &amp; Brass Vault Security</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Custom engraved CNC dies, wax seal crests, and vector CAD files are stored in climate-monitored, access-restricted Hyderabad vaults.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] text-primary">visibility_off</span>
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-medium text-on-surface">VIP &amp; Celebrity Non-Disclosure</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  For high-profile, diplomatic, or celebrity destination weddings, we sign customized mutual NDAs ensuring complete silence and embargoed release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN LEGAL CONTENT WITH STICKY NAVIGATION ================= */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 flex-1 w-full">
        <PrivacyPolicyClientSection />
      </main>

      {/* ================= MINIMAL COLLECTION DOCKET BAR (NO WEBSITE FOOTER) ================= */}
      <footer className="bg-surface-container-low border-t border-outline-variant/30 py-4 px-4 sm:px-6 lg:px-8 mt-auto print:hidden">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-outline">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span className="font-semibold text-on-surface uppercase tracking-wider">
              ASRA Wedding Canvas
            </span>
            <span>•</span>
            <span className="text-on-surface-variant">Customized Client Privacy &amp; NDA Covenant</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline font-mono text-outline">
              Vault Docket #PRIV-ASRA-2026-V4
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <span className="material-symbols-outlined text-[16px] text-emerald-700">verified_user</span>
              <span>256-Bit Encrypted Data Registry</span>
            </span>
            <span>•</span>
            <Link
              href="/"
              className="font-semibold text-on-surface hover:text-primary transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Return to Portal &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
