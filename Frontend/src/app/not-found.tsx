"use client";
import Image from "next/image";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import Link from 'next/link';

const NotFoundPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageError, setImageError] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    document.title = '404 Uncharted Heirloom — ASRA Wedding Canvas Client Vault';
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Check if client entered a docket or order reference number
    if (query.startsWith('#') || query.toUpperCase().includes('ASRA-') || /^\d{4,}$/.test(query)) {
      navigate.push(`/track-order?id=${encodeURIComponent(query)}`);
    } else {
      navigate.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestedClick = (text: string, customPath: string | null = null) => {
    if (customPath) {
      navigate.push(customPath);
    } else {
      navigate.push(`/shop?search=${encodeURIComponent(text)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface font-sans antialiased selection:bg-primary/20 selection:text-on-surface">
      {/* ========================================================================= */}
      {/* BEGIN: MinimalSanctuaryTopBar                                             */}
      {/* ========================================================================= */}
      <header className="w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Left: Protocol Links */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-xs tracking-wider uppercase font-semibold">
            <Link
              href="/"
              className="group flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors duration-200"
              aria-label="Return to Maison Homepage"
            >
              <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span>Back to Maison</span>
            </Link>
            <span className="text-outline-variant/50 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold tracking-widest text-[10px] text-on-surface-variant uppercase">Collection Navigation Protocol</span>
            </div>
          </div>

          {/* Center: Collection Brand Seal */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Maison ASRA Home">
              {!imageError ? (
                <Image
                  alt="Maison ASRA - Wedding Canvas"
                  className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  src="/assets/cdn/img_0c66544d9d27.png"
                  onError={() => setImageError(true)} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center bg-surface shadow-xs">
                  <span className="font-serif font-bold text-sm text-primary">AS</span>
                </div>
              )}
              <div className="text-left hidden sm:block border-l border-outline-variant/30 pl-2.5">
                <span className="block font-serif text-sm font-semibold tracking-wider text-on-surface uppercase leading-none">
                  Maison Asra
                </span>
                <span className="block text-[8px] tracking-[0.25em] text-primary font-medium uppercase mt-0.5">
                  Sovereign Vault
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Security Credentials & Support */}
          <div className="flex items-center space-x-3 text-xs tracking-wider uppercase font-medium">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF4EB] border border-primary/20 rounded text-[11px] text-primary">
              <span className="material-symbols-outlined text-sm text-primary">lock</span>
              <span>256-Bit SSL Encrypted Vault</span>
            </div>
            <Link
              href="/contact"
              className="text-on-surface hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span>Live Support Desk</span>
            </Link>
          </div>
        </div>
      </header>
      {/* END: MinimalSanctuaryTopBar */}

      {/* ========================================================================= */}
      {/* BEGIN: MainContent                                                        */}
      {/* ========================================================================= */}
      <main className="flex-grow flex flex-col justify-center py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto w-full">
        {/* Hero 404 Narrative Box */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-5 border border-primary/20 bg-[#FAF4EB] rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] font-semibold text-primary uppercase shadow-2xs">
            <span>◆</span>
            <span>Collection Archive · Error 404 · Heirloom Uncharted</span>
            <span>◆</span>
          </div>

          {/* Main Headline with Foil 404 Display */}
          <div className="relative flex items-center justify-center my-3 select-none">
            <span className="font-serif text-8xl sm:text-9xl font-light tracking-tight text-primary/15 select-none absolute pointer-events-none">
              404
            </span>
            <h1 className="relative font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface font-normal leading-[1.18] z-10 tracking-tight">
              Uncharted <span className="italic font-normal text-primary font-serif">Docket Pathway</span>
            </h1>
          </div>

          {/* Narrative Subtitle */}
          <p className="mt-4 text-xs sm:text-sm sm:text-base text-on-surface-variant font-light leading-relaxed max-w-2xl mx-auto">
            This commissioned folio or matrimonial gift does not exist within our current registry. Perhaps the
            docket has been safely archived, the ceremonial link was transcribed with an alteration, or the customized suite
            is sealed inside a private client vault.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {/* Return Home Button */}
            <Link
              href="/"
              className="px-5 py-2.5 bg-primary hover:bg-[#5f4b2d] text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-base">home</span>
              <span>Return to Grand Homepage</span>
            </Link>

            {/* Explore Gift Suites */}
            <Link
              href="/wedding-keepsakes"
              className="px-5 py-2.5 bg-surface-container-lowest hover:bg-surface border border-outline-variant/50 text-on-surface rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Explore Gift Suites</span>
              <span className="material-symbols-outlined text-base text-primary">arrow_forward</span>
            </Link>

            {/* WhatsApp Bridal Stylist Button */}
            <a
              href="https://wa.me/919121445889?text=Hello%20ASRA%20Concierge%2C%20I%20need%20assistance%20locating%20a%20commissioned%20folio."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#FAF4EB] hover:bg-[#f0e3d0] text-primary border border-primary/20 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-base text-emerald-600">chat</span>
              <span>Consult Lead Bridal Stylist</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BEGIN: CuratedAlternativePathwaysGrid                                     */}
        {/* 4-Card Collection Routing Section                                         */}
        {/* ========================================================================= */}
        <div className="w-full mb-10">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-5">
            <h2 className="font-serif text-lg tracking-wide text-on-surface flex items-center gap-2">
              <span>Alternative Collection Folios &amp; Portals</span>
            </h2>
            <span className="text-[10px] sm:text-[11px] tracking-widest text-outline uppercase font-semibold">
              Vault Archive Directive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300 shadow-xs group">
              <div>
                <div className="w-7 h-7 rounded-full bg-surface border border-outline-variant/40 flex items-center justify-center text-primary text-xs font-serif font-bold mb-3.5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  I
                </div>
                <h3 className="font-serif text-base font-semibold text-on-surface mb-1.5 group-hover:text-primary transition-colors">
                  Trending Bridal Gifts
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Debossed Italian leather passport suites, optical acrylic audio plaques, and hand-turned wedding essentials boxes.
                </p>
              </div>
              <Link
                href="/wedding-keepsakes"
                className="mt-4 inline-flex items-center text-[11px] tracking-wider uppercase font-semibold text-primary hover:text-[#5f4b2d] pt-3 border-t border-outline-variant/30"
              >
                <span>View Bestsellers</span>
                <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300 shadow-xs group">
              <div>
                <div className="w-7 h-7 rounded-full bg-surface border border-outline-variant/40 flex items-center justify-center text-primary text-xs font-serif font-bold mb-3.5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  II
                </div>
                <h3 className="font-serif text-base font-semibold text-on-surface mb-1.5 group-hover:text-primary transition-colors">
                  Track an Existing Commission
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Access live foundry debossing status, 3D brass die proofs, and insured temperature-controlled transit.
                </p>
              </div>
              <Link
                href="/track-order"
                className="mt-4 inline-flex items-center text-[11px] tracking-wider uppercase font-semibold text-primary hover:text-[#5f4b2d] pt-3 border-t border-outline-variant/30"
              >
                <span>Access Track Docket</span>
                <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300 shadow-xs group">
              <div>
                <div className="w-7 h-7 rounded-full bg-surface border border-outline-variant/40 flex items-center justify-center text-primary text-xs font-serif font-bold mb-3.5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  III
                </div>
                <h3 className="font-serif text-base font-semibold text-on-surface mb-1.5 group-hover:text-primary transition-colors">
                  Your Idea → We Handcraft
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Upload your custom wedding initials crest or ceremonial moodboard for 6-hour photorealistic 3D proofing.
                </p>
              </div>
              <Link
                href="/bespoke"
                className="mt-4 inline-flex items-center text-[11px] tracking-wider uppercase font-semibold text-primary hover:text-[#5f4b2d] pt-3 border-t border-outline-variant/30"
              >
                <span>Submit Custom Brief</span>
                <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300 shadow-xs group">
              <div>
                <div className="w-7 h-7 rounded-full bg-surface border border-outline-variant/40 flex items-center justify-center text-primary text-xs font-serif font-bold mb-3.5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  IV
                </div>
                <h3 className="font-serif text-base font-semibold text-on-surface mb-1.5 group-hover:text-primary transition-colors">
                  Client Vault &amp; Portal
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Sign into your private couple suite to review NDA protocols, download certificates, or approve metal milling.
                </p>
              </div>
              <Link
                href="/client-portal"
                className="mt-4 inline-flex items-center text-[11px] tracking-wider uppercase font-semibold text-primary hover:text-[#5f4b2d] pt-3 border-t border-outline-variant/30"
              >
                <span>Enter Client Vault</span>
                <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
        {/* END: CuratedAlternativePathwaysGrid */}

        {/* ========================================================================= */}
        {/* BEGIN: SearchAndDirectConciergePanel                                      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch mb-4">
          {/* Quick Archive Search Tool */}
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-xs flex flex-col justify-center">
            <label className="block font-serif text-base font-medium text-on-surface mb-1.5" htmlFor="archive-search">
              Search the Collection Archives &amp; Commission Folios
            </label>
            <p className="text-xs text-on-surface-variant mb-4 font-light">
              Search by product collection, heirloom category, order reference ID, or artisanal registry keyword.
            </p>
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-base">search</span>
                </div>
                <input
                  id="archive-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search curated collections, wedding essentials suites, docket IDs (e.g. #ASRA-2026)..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs text-on-surface bg-surface border border-outline-variant/40 rounded-lg focus:border-primary focus:outline-none placeholder-outline transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-[#5f4b2d] text-on-primary rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Search Archive
              </button>
            </form>
            <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-outline">
              <span className="font-semibold text-on-surface">Suggested:</span>
              <button
                type="button"
                onClick={() => handleSuggestedClick('Lake Como Hamper')}
                className="hover:text-primary underline decoration-outline-variant transition-colors cursor-pointer"
              >
                Lake Como Hamper
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedClick('Brass Initials Die')}
                className="hover:text-primary underline decoration-outline-variant transition-colors cursor-pointer"
              >
                Brass Initials Die
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedClick('Velvet Wedding Essentials Box')}
                className="hover:text-primary underline decoration-outline-variant transition-colors cursor-pointer"
              >
                Velvet Wedding Essentials Box
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedClick('', '/client-portal')}
                className="hover:text-primary underline decoration-outline-variant transition-colors cursor-pointer"
              >
                Client Vault Login
              </button>
            </div>
          </div>

          {/* Collection Support Direct Support Card */}
          <div className="bg-[#141414] text-white p-6 rounded-xl border border-[#2B2B2B] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-primary">
                  Direct Support Protocol
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h3 className="font-serif text-lg font-medium text-neutral-100 mb-1.5">
                Require Immediate Assistance?
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Need urgent assistance coordinating ceremonial delivery coordinates, customs clearance, or locating an
                unlisted commission?
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between text-primary">
                <span className="font-medium uppercase tracking-wider text-[10px]">Collection Hotline:</span>
                <a className="hover:underline font-mono text-neutral-200" href="tel:+919692668263">
                  +91 96926 68263
                </a>
              </div>
              <div className="text-[10px] text-neutral-400 tracking-wider uppercase mt-0.5">
                Stylist Desk Active 24/7 · Hyderabad Foundry &amp; Salon
              </div>
            </div>
          </div>
        </div>
        {/* END: SearchAndDirectConciergePanel */}
      </main>
      {/* END: MainContent */}

      {/* ========================================================================= */}
      {/* BEGIN: MinimalSanctuaryDocketBar                                          */}
      {/* ========================================================================= */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-outline">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left: Collection Docket Reference */}
          <div className="flex items-center space-x-2 flex-wrap justify-center sm:justify-start">
            <span className="font-serif font-semibold text-on-surface tracking-wide uppercase">
              Asra Wedding Canvas
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-on-surface-variant">Customized Collection Client Vault</span>
            <span className="text-outline-variant">•</span>
            <span className="text-primary font-mono">Docket Resolution Error #404-UNC</span>
          </div>

          {/* Right: Security Protocol & Maison Return */}
          <div className="flex items-center space-x-4 tracking-wider uppercase text-[10px] font-medium">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="material-symbols-outlined text-sm text-emerald-600">verified_user</span>
              <span>Security &amp; NDA Protocol Verified</span>
            </span>
            <span className="text-outline-variant">|</span>
            <Link href="/" className="text-on-surface hover:text-primary transition-colors">
              Return to Maison
            </Link>
          </div>
        </div>
      </footer>
      {/* END: MinimalSanctuaryDocketBar */}
    </div>
  );
};

export default NotFoundPage;

