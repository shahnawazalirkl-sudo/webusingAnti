import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Read order data from location state, or localStorage, or use Stitch screen defaults
  const [order] = useState(() => {
    const stateOrder = location.state?.orderData;
    if (stateOrder) return stateOrder;

    try {
      const savedOrder = localStorage.getItem('asra_last_order');
      if (savedOrder) {
        return JSON.parse(savedOrder);
      }
    } catch (e) {
      console.warn('Error reading saved order', e);
    }

    return null;
  });

  // Default values matching Stitch screen specification
  const orderId = order?.orderId || 'ASRA-2026-8842X';
  const recipientName = order?.recipientName || 'Asra Ansari & Sk Shahnawaz Ali';
  const coupleNames = order?.recipientName
    ? order.recipientName.replace(/singhania|varma|sharma|patel|kapoor|ali|ansari|naaz|doza/gi, '').replace('&', ' & ').trim()
    : 'Asra & Shahnawaz';
  const weddingPlanner = order?.weddingPlanner || 'Shagufta Naaz (Wedding Architect)';
  const phone = order?.phone || '+91 96926 68263';
  const venueName = order?.venueName || 'The Oberoi Udaivilas, Udaipur';
  const suiteInfo = order?.suite || 'Luxury Kohinoor Suite & Villa 4';
  const streetAddress = order?.streetAddress || 'Badi-Gorela Canal Road, Haridas Ji Ki Magri, Opposite Trident Hotel, Udaipur, Rajasthan 313001';
  const settledAmount = order?.grandTotal ? `₹${order.grandTotal.toLocaleString('en-IN')}` : '₹8,459';
  const arrivalDateText = order?.arrivalDate ? `${order.arrivalDate} (Twilight Slot)` : 'Nov 14, 2026 (Twilight Slot)';
  const chauffeurInstructions = order?.chauffeurNotes ||
    "Handover strictly to wedding planner Miss Shagufta Naaz at the Kohinoor Suite or Bride's mother Miss Sultana Begum. Temperature to remain stabilized at 18°C during all segments of transit.";
  const paymentHandle = order?.upiId ? `Settled via UPI (${order.upiId})` : 'Settled via UPI (shahnawazalirkl@okaxis)';
  const monogramCode = order?.monogramDie || '"A & S" • Classic Floral Crest';
  const loyaltyPoints = order?.loyaltyPoints || 845;

  const handleCopyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark flex flex-col justify-between antialiased selection:bg-brand-gold/20 selection:text-brand-dark">
      
      {/* ==================== MINIMAL CUSTOMIZED UTILITY HEADER (NO GLOBAL NAVBAR) ==================== */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-brand-border/80 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-brand-muted hover:text-brand-dark transition-colors group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-brand-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Return to Homepage</span>
            <span className="sm:hidden">Home</span>
          </Link>

          {/* Collection Central Gold Logo */}
          <div className="flex flex-col items-center">
            <Link to="/">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIWip2DbJ_N80Uyztev7Egku2psGTYLx7mF2zEZEt6yvqfQR9wfb_CZAUepVVIx9uaufuxIzLFTYkjYHIsEvuCy8sjY3k_M1W_3fiNOarITjdxp_qHij1H4-M7Ig4ck2lor6ExOwndM3D5k4Z_1h_IT6bcbqFRDwnPOq91fsvbyGyUHmhh2wSHztebI_zolfsVXrOueVsVdbM7sdQmwo58JYfxJ86-BNM89cMZqFmh1ZcRO6KodBXp0JdeCiLZtv-xUD4"
                alt="ASRA Wedding Canvas Logo"
                className="h-9 sm:h-10 w-auto object-contain drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Security & Support Status */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-2 text-brand-muted bg-brand-cream/80 px-3 py-1.5 rounded-full border border-brand-border">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-medium text-brand-dark">Order Booked &amp; Vaulted</span>
            </div>
            <div className="flex items-center gap-1.5 text-brand-muted">
              <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="hidden sm:inline font-medium text-[11px]">256-Bit Secured Order Docket</span>
            </div>
          </div>
        </div>

        {/* Stepper Strip */}
        <div className="bg-brand-cream/60 border-t border-brand-border/60 py-2.5 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
            {/* Step 1 Completed */}
            <Link to="/cart" className="flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors">
              <span className="w-5 h-5 rounded-full bg-brand-dark text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span className="hidden sm:inline font-medium tracking-wide">1. REVIEW BAG</span>
              <span className="sm:hidden text-[10px] font-medium">1. Bag</span>
            </Link>
            <div className="w-8 sm:w-16 md:w-24 h-[1px] bg-brand-gold"></div>

            {/* Step 2 Completed */}
            <Link to="/checkout" className="flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors">
              <span className="w-5 h-5 rounded-full bg-brand-dark text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span className="hidden sm:inline font-medium tracking-wide">2. CEREMONY &amp; ADDRESS</span>
              <span className="sm:hidden text-[10px] font-medium">2. Ceremony</span>
            </Link>
            <div className="w-8 sm:w-16 md:w-24 h-[1px] bg-brand-gold"></div>

            {/* Step 3 Active / Completed */}
            <div className="flex items-center gap-2 text-brand-dark font-semibold">
              <span className="w-5 h-5 rounded-full bg-brand-gold text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-brand-gold/30">
                ✓
              </span>
              <span className="tracking-wide text-brand-goldDark hidden sm:inline">3. WHITE-GLOVE DISPATCH CONFIRMED</span>
              <span className="tracking-wide text-brand-goldDark sm:hidden text-[10px]">3. Confirmed</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN ORDER CONFIRMATION CONTENT ==================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full flex-grow">
        
        {/* Top Celebration & Docket Announcement */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full gold-badge text-brand-goldDark text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <svg className="w-3.5 h-3.5 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>Ceremony Order Confirmed &amp; Metal Die Locked</span>
          </div>

          <h1 className="serif-title text-3xl sm:text-5xl text-brand-dark font-normal tracking-tight mb-3">
            May Your Royal Union Be Everlasting.
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed max-w-2xl mx-auto">
            Thank you, <span className="text-brand-dark font-medium">{coupleNames}</span>. Your customized order has been formally inducted into our Collection Registry. Our Master Engravers and Senior Wedding Stylist have initiated digital crest calibration.
          </p>

          {/* Docket ID Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 bg-white px-5 sm:px-8 py-3.5 rounded-2xl border border-brand-border shadow-sm text-xs">
            <div
              onClick={handleCopyOrderId}
              className="cursor-pointer group flex flex-col items-center sm:items-start transition-opacity hover:opacity-85"
              title="Click to copy Order ID"
            >
              <div className="flex items-center gap-1">
                <span className="text-brand-muted uppercase tracking-wider block text-[10px]">Collection Order ID</span>
                <span className="text-[10px] text-brand-gold font-mono group-hover:underline">
                  {copied ? '(Copied!)' : '(Copy)'}
                </span>
              </div>
              <span className="font-bold text-brand-dark text-sm tracking-widest font-mono">{orderId}</span>
            </div>

            <div className="h-6 w-[1px] bg-brand-border hidden sm:block"></div>

            <div className="text-center sm:text-left">
              <span className="text-brand-muted uppercase tracking-wider block text-[10px]">Initials Die Code</span>
              <span className="font-bold text-brand-goldDark text-sm">{monogramCode}</span>
            </div>

            <div className="h-6 w-[1px] bg-brand-border hidden sm:block"></div>

            <div className="text-center sm:text-left">
              <span className="text-brand-muted uppercase tracking-wider block text-[10px]">Settled Amount</span>
              <span className="font-bold text-brand-dark text-sm">{settledAmount} (Fully Paid)</span>
            </div>

            <div className="h-6 w-[1px] bg-brand-border hidden sm:block"></div>

            <div className="text-center sm:text-left">
              <span className="text-brand-muted uppercase tracking-wider block text-[10px]">White-Glove Delivery</span>
              <span className="font-bold text-brand-green text-sm">{arrivalDateText}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid Layout matching Stitch Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Timeline, Protocol & Handover Specs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* 1. Artisanal Production & White-Glove Transit Timeline */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-border shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-brand-border/70">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-brand-cream border border-brand-gold text-brand-dark flex items-center justify-center font-serif text-sm font-semibold">
                    I
                  </span>
                  <h2 className="serif-title text-xl sm:text-2xl text-brand-dark">Artisanal Collection &amp; Transit Timeline</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to={`/client-portal?docket=${orderId}`}
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-dark bg-brand-cream hover:bg-brand-goldLight/50 px-3 py-1 rounded-full border border-brand-border transition-colors group"
                  >
                    <span>Sovereign My Account &rarr;</span>
                  </Link>
                  <Link
                    to="/track-order"
                    state={{ orderId }}
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-goldDark bg-brand-goldLight/70 hover:bg-brand-goldLight px-3 py-1 rounded-full border border-brand-border/50 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-goldDark animate-pulse"></span>
                    <span>Live GPS Tracking Telemetry &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Timeline Stepper Component */}
              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-border">
                
                {/* Milestone 1: Current */}
                <div className="relative group">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-0 w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px] shadow-sm ring-4 ring-white">
                    ✓
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-semibold text-brand-dark">1. Order Placed &amp; Brass Die Blueprint Staged</h3>
                    <span className="text-[11px] text-brand-muted font-mono">Today, 02:45 PM</span>
                  </div>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Order authenticated. 3D digital vector deboss proof queued for senior artisan inspection in our Hyderabad flagship collection.
                  </p>
                </div>

                {/* Milestone 2: WhatsApp Approval */}
                <div className="relative group">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-0 w-5 h-5 rounded-full bg-brand-gold text-white flex items-center justify-center text-[10px] shadow-sm ring-4 ring-white">
                    2
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-semibold text-brand-dark">2. WhatsApp Digital Calligraphy &amp; Initials Proof</h3>
                    <span className="text-[11px] text-brand-goldDark font-semibold">Within 2 Hours</span>
                  </div>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    High-resolution camera proof of hand-drawn Copperplate script &amp; die draft will be sent to{' '}
                    <span className="font-semibold text-brand-dark">{phone}</span> before hot-metal casting.
                  </p>
                </div>

                {/* Milestone 3: Handcrafting & Botanical Conditioning */}
                <div className="relative group">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-0 w-5 h-5 rounded-full bg-brand-cream border border-brand-border text-brand-muted flex items-center justify-center text-[10px] ring-4 ring-white">
                    3
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-medium text-brand-charcoal">3. Master Casting, Confectionery &amp; Floral Infusion</h3>
                    <span className="text-[11px] text-brand-muted font-mono">Nov 12, 2026</span>
                  </div>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    3D brass die hot-stamped in 24k gold foil on luxury blush cylinder; dawn-harvested fresh roses fitted with botanical micro-hydration vials.
                  </p>
                </div>

                {/* Milestone 4: Temperature-Controlled Chilled Handover */}
                <div className="relative group">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-0 w-5 h-5 rounded-full bg-brand-cream border border-brand-border text-brand-muted flex items-center justify-center text-[10px] ring-4 ring-white">
                    4
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-medium text-brand-charcoal">4. Palatial Handover at The Oberoi Udaivilas</h3>
                    <span className="text-[11px] text-brand-green font-semibold">Nov 14, 2026 (04:00 PM - 08:00 PM)</span>
                  </div>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    ASRA white-glove security van arrives at Udaipur venue with formal luggage tags addressed to Wedding Planner {weddingPlanner}.
                  </p>
                </div>

              </div>
            </div>

            {/* 2. Ceremony & Palatial Venue Details Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-border shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-brand-border/70">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-brand-cream border border-brand-gold text-brand-dark flex items-center justify-center font-serif text-sm font-semibold">
                    II
                  </span>
                  <h2 className="serif-title text-xl sm:text-2xl text-brand-dark">Palatial Handover &amp; Guest Coordinates</h2>
                </div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-brand-muted">White-Glove Route</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-border/80 space-y-1">
                  <span className="text-brand-muted uppercase text-[10px] font-semibold tracking-wider block mb-1">
                    Destination Palace Property
                  </span>
                  <p className="font-semibold text-brand-dark text-sm">{venueName}</p>
                  <p className="text-brand-muted text-xs">{suiteInfo}</p>
                  <p className="text-brand-muted text-[11px] leading-relaxed">{streetAddress}</p>
                  <span className="inline-block mt-2 text-[10px] font-semibold bg-brand-dark text-white px-2 py-0.5 rounded">
                    Palace Tag Verified
                  </span>
                </div>

                <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-border/80 space-y-2">
                  <span className="text-brand-muted uppercase text-[10px] font-semibold tracking-wider block mb-1">
                    Handover Representatives
                  </span>
                  <div>
                    <span className="text-brand-muted block text-[10px]">Couples / Honorees:</span>
                    <p className="font-semibold text-brand-dark text-xs sm:text-sm">{recipientName}</p>
                  </div>
                  <div className="pt-1 border-t border-brand-border/50">
                    <span className="text-brand-muted block text-[10px]">Designated Wedding Planner / Recipient:</span>
                    <p className="font-semibold text-brand-dark text-xs sm:text-sm">{weddingPlanner}</p>
                    <p className="text-brand-muted font-mono text-xs">{phone}</p>
                  </div>
                </div>
              </div>

              {/* Chauffeur Special Protocol Note */}
              <div className="mt-4 p-3.5 bg-brand-greenBg border border-emerald-200/80 rounded-xl flex items-start gap-3 text-xs">
                <svg className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-semibold text-emerald-900 block">Confidential Chauffeur Instructions:</span>
                  <p className="text-emerald-800 text-[11px] mt-0.5 leading-normal">
                    "{chauffeurInstructions}"
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Direct Collection Support & WhatsApp Proofing Desk */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 no-print">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.855 3.18 0 5.767-2.587 5.767-5.766.001-3.181-2.585-5.772-5.767-5.772zm3.377 8.205c-.145.408-.836.772-1.159.824-.319.05-.733.09-2.316-.566-1.905-.79-3.125-2.73-3.22-2.859-.095-.128-.773-1.03-.773-1.963 0-.934.489-1.393.663-1.583.174-.19.38-.238.506-.238.127 0 .253.002.364.007.117.006.274-.044.428.326.158.38.539 1.314.587 1.409.047.095.079.206.016.332-.064.127-.095.206-.19.317-.095.111-.2.247-.285.332-.096.095-.196.199-.084.391.111.19.495.816 1.06 1.32.729.649 1.343.85 1.533.945.19.095.301.079.412-.047.111-.127.476-.554.602-.744.127-.19.254-.158.428-.095.175.063 1.11.523 1.3.618.19.095.317.143.364.222.048.079.048.46-.097.868z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-dark">Have Last-Minute Initials or Date Alterations?</h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Connect directly with your dedicated Senior Stylist before physical hot-stamping starts.
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/919692668263?text=${encodeURIComponent(`Hello ASRA Collection, I would like to inquire about my order ${orderId} for ${recipientName}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Chat with Stylist on WhatsApp</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary, Inclusions & Certificate (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Confirmed Items & Personalized Inclusions */}
            <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-sm">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-brand-border/70">
                <h2 className="serif-title text-xl sm:text-2xl text-brand-dark">Curated Heirloom Ensemble</h2>
                <span className="text-xs font-semibold text-brand-goldDark bg-brand-cream px-2.5 py-1 rounded-full border border-brand-border">
                  2 Heirlooms Sealed
                </span>
              </div>

              {/* Item 1: Masterpiece Hamper */}
              <div className="pb-5 mb-5 border-b border-brand-border/60">
                <div className="flex gap-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WWF5xvSFhZfraQNuZ5QJPkPkwOA7moevDQMXbk6g5GfhQjfg2Z83P-u6zYCC1yMFsxUjfoBWemmareJbeeghnEjxPCCk8pU17Sp5a4j5ZUtKFR3Mb8kBYNW_VepfRLyIG4QLzjwzT5HUgJlvRaNv386XaXDH3zn3Rp2kRX9TFbJIZ9uC8cdio9LJ4Iza1YgNb1vCk3YwY3PGfkJ8oLQahxRtWzdx5ToPRumfXGiwW7-rRqwpKhA2pAZGhJmH6ePGDmvWpp0TJucIM"
                    alt="The Sovereign Bridal & Wedding Essentials Suite"
                    className="w-20 h-20 rounded-xl object-cover border border-brand-border flex-shrink-0 shadow-sm"
                  />
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-brand-dark leading-tight">
                        The Sovereign Bridal &amp; Wedding Essentials Suite
                      </h3>
                      <span className="font-bold text-sm text-brand-dark font-mono">₹7,499</span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-0.5">
                      Palette: <span className="font-medium text-brand-charcoal">Classic Blush &amp; Champagne Gold</span>
                    </p>

                    {/* Initials Badge */}
                    <div className="mt-2 p-2 bg-brand-cream rounded-lg border border-brand-border/80 text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-brand-muted">Debossed Initials:</span>
                        <span className="font-semibold text-brand-dark font-mono">"A &amp; R"</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-muted">Calligraphy Script:</span>
                        <span className="text-brand-dark italic font-serif text-xs">Royal Copperplate</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-muted">Artisanal Scent:</span>
                        <span className="text-brand-dark">Kashmiri Rose &amp; Amber</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2: Velvet Vault Add-on */}
              <div className="pb-5 mb-5 border-b border-brand-border/60">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-brand-green flex flex-col items-center justify-center p-2 text-center text-white border border-brand-border flex-shrink-0 shadow-sm">
                    <span className="serif-title text-base font-bold text-amber-200 tracking-wider">A &amp; R</span>
                    <span className="text-[8px] uppercase tracking-widest text-emerald-100 mt-1">Emerald Velvet</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-brand-dark leading-tight">
                        Customized Velvet Double Ring &amp; Mangalsutra Vault
                      </h3>
                      <span className="font-bold text-sm text-brand-dark font-mono">₹1,899</span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-0.5">
                      Fabric: <span className="font-medium text-brand-charcoal">Royal Emerald Silk Velvet</span>
                    </p>
                    <p className="text-[11px] text-brand-muted">
                      Hardware: <span className="font-medium text-brand-charcoal">Hand-Polished Antique Brass</span>
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-brand-goldDark font-semibold">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Die Matched to Suite Initials</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settlement Breakdown */}
              <div className="space-y-2 text-xs text-brand-muted pt-1">
                <div className="flex justify-between">
                  <span>Items Total (2 Curated Pieces)</span>
                  <span className="font-medium text-brand-charcoal">₹12,299</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Catalogue Privilege Savings</span>
                  <span>- ₹2,901</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Promo 'ASRAFIRST' Applied (10% Off)</span>
                  <span>- ₹939</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Brass Deboss Die &amp; 24k Wax Seals</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Temperature Chilled Transit</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                    Free (Included)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18% Included)</span>
                  <span className="font-medium text-brand-charcoal">₹1,288</span>
                </div>

                <div className="pt-3 mt-3 border-t border-brand-border flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-semibold text-brand-dark block">Total Paid Amount</span>
                    <span className="text-[10px] text-emerald-700 font-medium">Saved ₹3,840 with Collection Privilege</span>
                  </div>
                  <div className="text-right">
                    <span className="serif-title text-2xl font-bold text-brand-dark font-mono">{settledAmount}</span>
                    <span className="block text-[10px] text-brand-muted">{paymentHandle}</span>
                  </div>
                </div>
              </div>

              {/* Loyalty Points Earned */}
              <div className="mt-4 p-3 bg-brand-goldLight/70 border border-brand-border rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-brand-gold font-bold text-sm">✦</span>
                  <span className="text-brand-charcoal text-[11px]">
                    Earned <strong>{loyaltyPoints} ASRA Privilege Points</strong> for anniversary milestones
                  </span>
                </div>
                <span className="text-[10px] font-bold text-brand-goldDark uppercase">Credit Logged</span>
              </div>

              {/* Action Buttons (Print / Download Docket) */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-3 border-t border-brand-border/60 no-print">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 border border-brand-border rounded-xl text-xs font-semibold text-brand-dark hover:bg-brand-cream transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <svg className="w-4 h-4 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  <span>Print Docket</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-brand-dark text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download PDF</span>
                </button>
              </div>

            </div>

            {/* 24k Gold Authenticity & Care Guarantee Certificate */}
            <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-sm text-xs space-y-3">
              <div className="flex items-center gap-2.5 text-brand-goldDark">
                <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="font-serif text-base font-semibold text-brand-dark">Collection Authenticity Guarantee</span>
              </div>

              <p className="text-[11px] text-brand-muted leading-relaxed">
                Every ASRA gifts ensemble carries our registered hallmark. The 3D Deboss Brass Die is hand-milled, hot-pressed using certified 24k gold leaf foil, and preserved for future family crest re-orders.
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-brand-charcoal pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>100% Transit Replacement</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Palace Luggage Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Hydrated Botanical Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Artisan Signed Certificate</span>
                </div>
              </div>
            </div>

            {/* Curating Multiple Event Rooms Cross-Link */}
            <div className="bg-brand-cream/80 border border-brand-border rounded-2xl p-5 text-center text-xs no-print">
              <div className="w-2 h-2 rounded-full bg-brand-gold mx-auto mb-2"></div>
              <h3 className="serif-title text-lg sm:text-xl text-brand-dark mb-1">Planning Multiple Wedding Events or Favors?</h3>
              <p className="text-brand-muted text-[11px] mb-3">
                If you require 25+ matching welcome suites for guest rooms, connect directly with our volume collection team.
              </p>
              <Link
                to="/bulk-orders"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dark hover:text-brand-goldDark underline underline-offset-4 transition-colors"
              >
                <span>Explore Destination Bulk Privileges &rarr;</span>
              </Link>
            </div>

          </div>

        </div>

      </main>

      {/* ==================== MINIMAL CONFIDENTIALITY & LEGAL BAR (NO MULTI-COLUMN FOOTER) ==================== */}
      <footer className="w-full bg-brand-cream border-t border-brand-border/70 py-5 px-4 sm:px-6 mt-8 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-brand-muted">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-brand-dark tracking-wider">ASRA WEDDING CANVAS</span>
            <span>• Private Collection &amp; Wedding Essentials Vaults</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px]">
            <Link to="/bespoke" className="hover:text-brand-dark transition-colors">Support Protocols</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-brand-dark transition-colors">Hallmark Verification</Link>
            <span>•</span>
            <Link to="/return-policy" className="hover:text-brand-dark transition-colors">Transit Insurance Policy</Link>
            <span>•</span>
            <Link to="/terms-of-service" className="hover:text-brand-dark transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/privacy-policy" className="hover:text-brand-dark transition-colors">Confidentiality Guarantee</Link>
          </div>
          <div>
            <span>© 2026 ASRA Collection. All royal rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default OrderConfirmationPage;
