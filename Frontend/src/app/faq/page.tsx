import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import FaqClientSection from '@/components/faq/FaqClientSection';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions & Help Desk | ASRA Wedding Canvas',
  description: 'Curated answers to assist your customized heirloom commissions, bridal registries, personalized metallurgy dies, and white-glove climate delivery.',
  openGraph: {
    title: 'Frequently Asked Questions & Help Desk | ASRA Wedding Canvas',
    description: 'Curated answers to assist your customized heirloom commissions, bridal registries, personalized metallurgy dies, and white-glove climate delivery.',
    url: 'https://asraweddingcanvas.com/faq',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-asra-champagne text-asra-charcoal font-sans antialiased selection:bg-asra-gold/20 selection:text-asra-dark">
      {/* ========================================================================= */}
      {/* 1. TOP UTILITY RIBBON (Standalone Minimalist Header matching SCREEN_7)    */}
      {/* ========================================================================= */}
      <nav className="border-b border-asra-border bg-asra-ivory/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-xs tracking-wider font-medium text-asra-muted">
          {/* Left: Return link */}
          <div className="flex items-center">
            <Link
              href="/"
              className="hover:text-asra-dark transition-colors flex items-center gap-1.5 uppercase font-semibold"
            >
              <ArrowLeft className="w-4 h-4 text-asra-dark" />
              <span>Return to Collection Portal</span>
            </Link>
          </div>

          {/* Center: Initials emblem */}
          <div className="flex flex-col items-center">
            <Link
              href="/"
              className="w-9 h-9 rounded-full border border-asra-gold/60 flex items-center justify-center text-asra-gold font-serif-luxury text-base font-bold shadow-xs hover:border-asra-gold hover:scale-105 transition-transform"
              title="ASRA Wedding Canvas"
            >
              AS
            </Link>
          </div>

          {/* Right: Support status and encryption badges */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 font-medium text-[11px] sm:text-xs shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Support Desk Live</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-asra-muted text-[11px]">
              <Lock className="w-3.5 h-3.5 text-asra-gold" />
              <span>256-Bit Encrypted Collection Portal</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA                                                      */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-grow w-full">
        {/* HEADER SECTION (Static) */}
        <header className="text-center max-w-4xl mx-auto mb-12">
          {/* Eyebrow Tag */}
          <p className="text-xs uppercase tracking-[0.25em] text-asra-gold font-semibold mb-3 flex items-center justify-center gap-2">
            <span>✦</span>
            <span>Collection Client Care &amp; Support Assistance</span>
            <span>✦</span>
          </p>

          {/* Main Title */}
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-asra-dark font-medium leading-tight mb-4 tracking-tight">
            Frequently Asked Questions &amp; Help Desk
          </h1>

          {/* Subtitle */}
          <p className="text-asra-muted text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            Curated answers to assist your customized heirloom commissions, bridal registries, personalized metallurgy dies, and white-glove climate delivery.
          </p>
        </header>

        {/* Interactive FAQ Search, Filter, Accordion & Help Desk Controls */}
        <FaqClientSection />
      </main>
    </div>
  );
}
