import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 Uncharted Heirloom — ASRA Wedding Canvas Client Sanctuary';
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Check if client entered a docket or order reference number
    if (query.startsWith('#') || query.toUpperCase().includes('ASRA-') || /^\d{4,}$/.test(query)) {
      navigate(`/track-order?id=${encodeURIComponent(query)}`);
    } else {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestedClick = (text, customPath = null) => {
    if (customPath) {
      navigate(customPath);
    } else {
      navigate(`/shop?search=${encodeURIComponent(text)}`);
    }
  };

  return (
    <div className="atelier-pattern font-montserrat text-asra-charcoal antialiased min-h-screen flex flex-col justify-between selection:bg-asra-gold selection:text-white">
      {/* ========================================================================= */}
      {/* BEGIN: MinimalSanctuaryTopBar                                             */}
      {/* Strict minimal top bar mimicking ASRA client docket protocols            */}
      {/* ========================================================================= */}
      <header className="w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-asra-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Left: Protocol Links */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-[11px] tracking-wider uppercase font-medium">
            <Link
              to="/"
              className="flex items-center space-x-1.5 text-asra-charcoal hover:text-asra-gold transition-colors duration-200"
              aria-label="Return to Maison Homepage"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Return to Maison</span>
            </Link>
            <span className="text-asra-border hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center space-x-1.5 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold tracking-widest text-[10px]">Atelier Navigation Protocol</span>
            </div>
          </div>

          {/* Center: Atelier Brand Seal */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center gap-2 group" aria-label="Maison ASRA Home">
              {!imageError ? (
                <img
                  alt="Maison ASRA - Wedding Canvas"
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJvvKhPsL5Xpo4JraNGwfHl6tJwOssDE3rVYAn4vR6WN23qQuR14m2sSzmqwO6y2o0W92TvWku7FS7vH-f7ps9KkDbeu_6PYi3-Ex232Q-K5rdQ1J288WNi9bAg0tA-ZfbrlWTvCWq1PTxUBB6zp_oQ3qLfxpv0IQe6WMAXYBUW1wDV8fhCPfs2IVPWTzJjevCWBg_xretfBxs2xQ0yq9s1fYamwNLltNWukIQgJN43KUluJAWttN11BmfPGe6unNAy6E"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-10 h-10 rounded-full border border-asra-gold/60 flex items-center justify-center bg-asra-cream shadow-xs">
                  <span className="font-cormorant font-bold text-base text-asra-gold">AS</span>
                </div>
              )}
              <div className="text-left hidden sm:block border-l border-asra-border pl-2.5">
                <span className="block font-cormorant text-sm font-semibold tracking-wider text-asra-noir uppercase leading-none">
                  Maison Asra
                </span>
                <span className="block text-[8px] tracking-[0.25em] text-asra-gold font-medium uppercase mt-0.5">
                  Sovereign Vault
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Security Credentials & Concierge */}
          <div className="flex items-center space-x-3 text-[11px] tracking-wider uppercase font-medium">
            <div className="hidden md:flex items-center space-x-1 px-2.5 py-1 bg-asra-tagBg border border-asra-border rounded text-asra-muted">
              <svg className="w-3 h-3 text-asra-gold" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  fillRule="evenodd"
                />
              </svg>
              <span>256-Bit SSL Encrypted Vault</span>
            </div>
            <Link
              to="/contact"
              className="text-asra-noir hover:text-asra-gold flex items-center space-x-1 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-asra-gold"></span>
              <span>Live Concierge Desk</span>
            </Link>
          </div>
        </div>
      </header>
      {/* END: MinimalSanctuaryTopBar */}

      {/* ========================================================================= */}
      {/* BEGIN: MainContent                                                        */}
      {/* ========================================================================= */}
      <main className="flex-grow flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero 404 Narrative Box */}
        <div className="text-center max-w-3xl mx-auto mt-2 mb-10">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 border border-asra-border bg-asra-cream rounded-full text-[10px] tracking-[0.25em] font-semibold text-asra-muted uppercase shadow-sm">
            <span className="text-asra-gold">✦</span>
            <span>Atelier Archive · Error 404 · Heirloom Uncharted</span>
            <span className="text-asra-gold">✦</span>
          </div>

          {/* Main Headline with Golden 404 Display */}
          <div className="relative flex items-center justify-center my-2 select-none">
            <span className="font-cormorant text-8xl md:text-9xl font-extralight tracking-tight text-asra-gold/25 select-none absolute gold-foil-num pointer-events-none">
              404
            </span>
            <h1 className="relative font-cormorant text-4xl sm:text-5xl md:text-6xl text-asra-noir font-normal leading-tight z-10">
              Uncharted <span className="italic font-normal text-gold-gradient">Docket Pathway</span>
            </h1>
          </div>

          {/* Narrative Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-asra-muted font-light leading-relaxed max-w-2xl mx-auto">
            This commissioned folio or matrimonial keepsake does not exist within our current registry. Perhaps the
            docket has been safely archived, the ceremonial link was transcribed with an alteration, or the bespoke suite
            is sealed inside a private client sanctuary.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 text-xs font-medium tracking-wider uppercase">
            {/* Return Home Button */}
            <Link
              to="/"
              className="px-6 py-3 bg-asra-gold hover:bg-asra-goldDark text-white shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 border border-asra-goldDark/50 w-full sm:w-auto"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>Return to Grand Homepage</span>
            </Link>

            {/* Explore Keepsake Suites */}
            <Link
              to="/wedding-keepsakes"
              className="px-6 py-3 bg-asra-noir hover:bg-asra-charcoal text-[#FAF8F5] transition-all duration-200 flex items-center justify-center space-x-2 border border-black shadow-sm w-full sm:w-auto"
            >
              <span>Explore Keepsake Suites</span>
              <svg className="w-3.5 h-3.5 text-asra-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </Link>

            {/* WhatsApp Bridal Stylist Button */}
            <a
              href="https://wa.me/919121445889?text=Hello%20ASRA%20Concierge%2C%20I%20need%20assistance%20locating%20a%20commissioned%20folio."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-asra-cream hover:bg-white text-asra-charcoal border border-asra-border transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm w-full sm:w-auto"
            >
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              </svg>
              <span>Consult Lead Bridal Stylist</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BEGIN: CuratedAlternativePathwaysGrid                                     */}
        {/* 4-Card Atelier Routing Section                                            */}
        {/* ========================================================================= */}
        <div className="w-full mt-4 mb-10">
          <div className="flex items-center justify-between border-b border-asra-border pb-2.5 mb-5">
            <h2 className="font-cormorant text-lg tracking-wide text-asra-noir flex items-center space-x-2">
              <span>Alternative Atelier Folios &amp; Portals</span>
            </h2>
            <span className="text-[11px] tracking-widest text-asra-muted uppercase font-medium">
              Vault Archive Directive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-asra-cream border border-asra-border p-5 flex flex-col justify-between hover:border-asra-gold/70 transition-all duration-200 shadow-sm group">
              <div>
                <div className="w-7 h-7 rounded-full bg-asra-tagBg border border-asra-border flex items-center justify-center text-asra-gold text-xs font-cormorant font-semibold mb-3.5 group-hover:bg-asra-gold group-hover:text-white transition-colors">
                  I
                </div>
                <h3 className="font-cormorant text-base font-semibold text-asra-noir mb-1.5 group-hover:text-asra-gold transition-colors">
                  Trending Bridal Keepsakes
                </h3>
                <p className="text-xs text-asra-muted leading-relaxed font-light">
                  Debossed Italian leather passport suites, optical acrylic audio plaques, and hand-turned trousseau boxes.
                </p>
              </div>
              <Link
                to="/wedding-keepsakes"
                className="mt-4 inline-flex items-center text-[11px] tracking-wider uppercase font-semibold text-asra-gold hover:text-asra-goldDark pt-3 border-t border-asra-border/60"
              >
                <span>View Bestsellers</span>
                <span className="ml-1 text-xs transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-asra-cream border border-asra-border p-5 flex flex-col justify-between hover:border-asra-gold/70 transition-all duration-200 shadow-sm group">
              <div>
                <div className="w-7 h-7 rounded-full bg-asra-tagBg border border-asra-border flex items-center justify-center text-asra-gold text-xs font-cormorant font-semibold mb-3.5 group-hover:bg-asra-gold group-hover:text-white transition-colors">
                  II
                </div>
                <h3 className="font-cormorant text-base font-semibold text-asra-noir mb-1.5 group-hover:text-asra-gold transition-colors">
                  Track an Existing Commission
                </h3>
                <p className="text-xs text-asra-muted leading-relaxed font-light">
                  Access live foundry debossing status, 3D brass die proofs, and insured temperature-controlled transit.
                </p>
              </div>
              <Link
                to="/track-order"
                className="mt-4 inline-flex items-center text-[11px] tracking-wider uppercase font-semibold text-asra-gold hover:text-asra-goldDark pt-3 border-t border-asra-border/60"
              >
                <span>Access Track Docket</span>
                <span className="ml-1 text-xs transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-asra-cream border border-asra-border p-5 flex flex-col justify-between hover:border-asra-gold/70 transition-all duration-200 shadow-sm group">
              <div>
                <div className="w-7 h-7 rounded-full bg-asra-tagBg border border-asra-border flex items-center justify-center text-asra-gold text-xs font-cormorant font-semibold mb-3.5 group-hover:bg-asra-gold group-hover:text-white transition-colors">
                  III
                </div>
                <h3 className="font-cormorant text-base font-semibold text-asra-noir mb-1.5 group-hover:text-asra-gold transition-colors">
                  Your Idea → We Handcraft
                </h3>
                <p className="text-xs text-asra-muted leading-relaxed font-light">
                  Upload your custom wedding monogram crest or ceremonial moodboard for 6-hour photorealistic 3D proofing.
                </p>
              </div>
              <Link
                to="/bespoke"
                className="mt-4 inline-flex items-center text-[11px] tracking-wider uppercase font-semibold text-asra-gold hover:text-asra-goldDark pt-3 border-t border-asra-border/60"
              >
                <span>Submit Custom Brief</span>
                <span className="ml-1 text-xs transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Card 4 */}
            <div className="bg-asra-cream border border-asra-border p-5 flex flex-col justify-between hover:border-asra-gold/70 transition-all duration-200 shadow-sm group">
              <div>
                <div className="w-7 h-7 rounded-full bg-asra-tagBg border border-asra-border flex items-center justify-center text-asra-gold text-xs font-cormorant font-semibold mb-3.5 group-hover:bg-asra-gold group-hover:text-white transition-colors">
                  IV
                </div>
                <h3 className="font-cormorant text-base font-semibold text-asra-noir mb-1.5 group-hover:text-asra-gold transition-colors">
                  Client Sanctuary &amp; Portal
                </h3>
                <p className="text-xs text-asra-muted leading-relaxed font-light">
                  Sign into your private couple suite to review NDA protocols, download certificates, or approve metal milling.
                </p>
              </div>
              <Link
                to="/client-portal"
                className="mt-4 inline-flex items-center text-[11px] tracking-wider uppercase font-semibold text-asra-gold hover:text-asra-goldDark pt-3 border-t border-asra-border/60"
              >
                <span>Enter Sanctuary</span>
                <span className="ml-1 text-xs transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
        {/* END: CuratedAlternativePathwaysGrid */}

        {/* ========================================================================= */}
        {/* BEGIN: SearchAndDirectConciergePanel                                      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-4">
          {/* Quick Archive Search Tool */}
          <div className="lg:col-span-2 bg-asra-cream border border-asra-border p-6 shadow-sm flex flex-col justify-center">
            <label className="block font-cormorant text-base font-medium text-asra-noir mb-2" htmlFor="archive-search">
              Search the Atelier Archives &amp; Commission Folios
            </label>
            <p className="text-xs text-asra-muted mb-4 font-light">
              Search by product collection, heirloom category, order reference ID, or artisanal registry keyword.
            </p>
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-asra-muted">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <input
                  id="archive-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search curated collections, trousseau suites, docket IDs (e.g. #ASRA-2026)..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs text-asra-charcoal bg-white border border-asra-border focus:border-asra-gold focus:ring-1 focus:ring-asra-gold placeholder-asra-muted/70 transition-colors outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer"
              >
                Search Archive
              </button>
            </form>
            <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-asra-muted">
              <span className="font-medium text-asra-charcoal">Suggested:</span>
              <button
                type="button"
                onClick={() => handleSuggestedClick('Lake Como Hamper')}
                className="hover:text-asra-gold underline decoration-asra-border transition-colors cursor-pointer"
              >
                Lake Como Hamper
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedClick('Brass Monogram Die')}
                className="hover:text-asra-gold underline decoration-asra-border transition-colors cursor-pointer"
              >
                Brass Monogram Die
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedClick('Velvet Trousseau Box')}
                className="hover:text-asra-gold underline decoration-asra-border transition-colors cursor-pointer"
              >
                Velvet Trousseau Box
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedClick('', '/client-portal')}
                className="hover:text-asra-gold underline decoration-asra-border transition-colors cursor-pointer"
              >
                Client Vault Login
              </button>
            </div>
          </div>

          {/* Atelier Concierge Direct Support Card */}
          <div className="bg-asra-noir text-white p-6 border border-asra-charcoal shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-asra-gold">
                  Direct Concierge Protocol
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h3 className="font-cormorant text-lg font-normal text-[#FDFBF7] mb-1.5">
                Require Immediate Assistance?
              </h3>
              <p className="text-xs text-[#EAE5DC]/80 font-light leading-relaxed">
                Need urgent assistance coordinating ceremonial delivery coordinates, customs clearance, or locating an
                unlisted commission?
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between text-asra-gold">
                <span className="font-medium uppercase tracking-wider text-[10px]">Atelier Hotline:</span>
                <a className="hover:underline font-mono" href="tel:+919692668263">
                  +91 96926 68263
                </a>
              </div>
              <div className="text-[10px] text-white/50 tracking-wider uppercase mt-0.5">
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
      {/* Strict single-line docket resolution bottom bar (NO standard footer)      */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#FAF8F5] border-t border-asra-border py-3 px-4 sm:px-6 text-[11px] text-asra-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left: Atelier Docket Reference */}
          <div className="flex items-center space-x-2 flex-wrap justify-center sm:justify-start">
            <span className="font-cormorant font-semibold text-asra-charcoal tracking-wide uppercase">
              Asra Wedding Canvas
            </span>
            <span className="text-asra-border">•</span>
            <span>Bespoke Atelier Sanctuary</span>
            <span className="text-asra-border">•</span>
            <span className="text-amber-800/80 font-mono">Docket Resolution Error #404-UNC</span>
          </div>

          {/* Right: Security Protocol & Maison Return */}
          <div className="flex items-center space-x-4 tracking-wider uppercase text-[10px] font-medium">
            <span className="flex items-center space-x-1 text-emerald-800">
              <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>
              <span>Security &amp; NDA Protocol Verified</span>
            </span>
            <span className="text-asra-border">|</span>
            <Link to="/" className="text-asra-noir hover:text-asra-gold transition-colors">
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

