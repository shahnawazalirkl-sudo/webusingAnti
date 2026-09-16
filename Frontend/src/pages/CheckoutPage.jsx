import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { generateOrderId, saveOrder } from '../utils/orderStorage';

const CheckoutPage = () => {
  const {
    cartItems,
    originalTotal,
    subtotal,
    catalogueSavings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount: baseDiscountAmount,
    itemCount,
    showToast
  } = useCart();

  const navigate = useNavigate();

  // Reservation timer: 12 minutes 35 seconds (755 seconds)
  const [timeLeft, setTimeLeft] = useState(755);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handover venue type: 'palace' | 'residence'
  const [venueType, setVenueType] = useState('palace');

  // Transit method: 'white_glove' (₹0) | 'diplomatic' (+₹1,499)
  const [transitMethod, setTransitMethod] = useState('white_glove');
  const transitCost = transitMethod === 'diplomatic' ? 1499 : 0;

  // Form states
  const [email, setEmail] = useState('shahnawazalirkl@gmail.com');
  const [phone, setPhone] = useState('96926 68263');
  const [receiveWhatsappProofs, setReceiveWhatsappProofs] = useState(true);
  const [recipientName, setRecipientName] = useState('Asra Ansari & Sk Shahnawaz Ali');
  const [weddingPlanner, setWeddingPlanner] = useState('Shagufta Naaz (Wedding Architect)');
  const [venueName, setVenueName] = useState('The Oberoi Udaivilas, Luxury Kohinoor Suite & Villa 4');
  const [streetAddress, setStreetAddress] = useState('Badi-Gorela Canal Road, Near Lake Pichola');
  const [landmark, setLandmark] = useState('Opposite Trident Hotel');
  const [city, setCity] = useState('Udaipur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('313001');
  const [arrivalDate, setArrivalDate] = useState('2026-11-14');
  const [timingSlot, setTimingSlot] = useState('Twilight Royal Arrival (04:00 PM – 08:00 PM)');
  const [chauffeurNotes, setChauffeurNotes] = useState(
    "Handover strictly to wedding planner Miss Shagufta Naaz at the Kohinoor Suite or Bride's mother Miss Sultana Begum."
  );
  const [monogramConsent, setMonogramConsent] = useState(true);

  // Settlement / Payment mode: 'upi' | 'card'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('shahnawazalirkl@okaxis');
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    name: 'Asra Ansari',
    expiry: '11/28',
    cvv: '•••'
  });

  // Promo code in checkout
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const handleVerifyUpi = () => {
    if (!upiId.trim()) return;
    setIsUpiVerified(true);
    showToast('UPI ID verified successfully: Valid Bank Handle');
  };

  // Compute reactive financial ledger
  const effectiveSubtotal = subtotal > 0 ? subtotal : 9398;
  const effectiveCatalogueSavings = catalogueSavings > 0 ? catalogueSavings : 2901;
  const effectiveDiscount = baseDiscountAmount > 0 ? baseDiscountAmount : 939;
  const grandTotal = Math.max(0, effectiveSubtotal - effectiveDiscount + transitCost);
  const totalSaved = effectiveCatalogueSavings + effectiveDiscount;
  const calculatedLoyaltyPoints = Math.round(grandTotal * 0.1);
  const emiPerMonth = Math.round(grandTotal / 6);

  // Fallback sample items if cart was empty
  const displayItems = cartItems.length > 0 ? cartItems : [
    {
      cartId: 'fallback-sovereign',
      title: 'The Sovereign Bridal & Wedding Essentials Suite',
      edition: 'Classic Blush & Champagne Gold',
      monogramDie: '"A & R" • Classic Floral Crest',
      price: 7499,
      quantity: 1,
      image: '/assets/cdn/img_8222cd4f9dd5.png',
      calligraphy: 'Royal Copperplate',
      scent: 'Kashmiri Rose & Amber'
    },
    {
      cartId: 'fallback-vault',
      title: 'Customized Velvet Double Ring & Mangalsutra Vault',
      edition: 'Royal Emerald Silk Velvet',
      monogramDie: 'Matching A&R Couple Die',
      price: 1899,
      quantity: 1,
      hardware: 'Hand-Polished Antique Brass',
      isVelvetVaultThumbnail: true
    }
  ];

  // Payment Gateway Status Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!monogramConsent) {
      showToast('Please approve the Customized Deboss Authorization checkbox.');
      return;
    }
    // Prevent confirming the order without a payment gateway
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1B18] font-sans flex flex-col justify-between selection:bg-[#C5A880] selection:text-white">

      {/* ========================================================= */}
      {/* 1. MINIMAL DISTRACTION-FREE HEADER                        */}
      {/* ========================================================= */}
      <header className="w-full bg-[#FDFCFA]/95 backdrop-blur-md border-b border-[#EAE5DC] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Return to Collection Cart */}
          <div className="flex items-center space-x-2">
            <Link
              to="/cart"
              className="inline-flex items-center text-xs sm:text-sm font-medium tracking-wide text-[#1F1B18]/80 hover:text-[#1F1B18] transition-colors group"
            >
              <svg
                className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1 text-[#C5A880]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                Return to Collection Cart &amp; Customizations
              </span>
            </Link>
          </div>

          {/* Center: Official ASRA Brand Emblem */}
          <div className="flex flex-col items-center justify-center py-2">
            <Link to="/">
              <img
                alt="ASRA Wedding Canvas Crest Logo"
                className="h-12 sm:h-14 w-auto object-contain hover:opacity-90 transition-opacity"
                src="/assets/cdn/img_36917e8d2065.jpg"
              />
            </Link>
          </div>

          {/* Right: Security & Insurance Guarantee */}
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1E6347]" />
            </span>
            <div className="text-right hidden sm:block">
              <div className="text-[11px] font-bold tracking-wider uppercase text-[#1F1B18] flex items-center gap-1 justify-end">
                <span>256-Bit Encrypted SSL</span>
              </div>
              <p className="text-[10px] text-[#1F1B18]/60 tracking-tight">
                White-Glove Insured Dispatch
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. CHECKOUT STEPPER & RESERVATION COUNTDOWN BAR           */}
      {/* ========================================================= */}
      <div className="w-full bg-[#F4F0EA]/70 border-b border-[#EAE5DC] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Multi-Step Progress Indicator */}
            <nav aria-label="Checkout Progress" className="w-full md:w-auto">
              <ol className="flex items-center space-x-3 sm:space-x-8 text-xs font-medium tracking-wide">
                
                {/* Step 1: Completed */}
                <li>
                  <Link to="/cart" className="flex items-center space-x-2 text-[#1F1B18]/70 hover:text-[#1F1B18] transition-colors">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1F1B18] text-[#FDFCFA] text-xs font-semibold shadow-xs">
                      <svg className="w-3.5 h-3.5 text-[#C5A880]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="hidden sm:inline uppercase text-[11px] tracking-wider font-medium">1. Review Bag</span>
                    <span className="sm:hidden text-[11px]">1. Bag</span>
                  </Link>
                </li>

                <li className="text-[#D9D2C5] font-light">—</li>

                {/* Step 2: Active Step */}
                <li aria-current="step" className="flex items-center space-x-2 text-[#1F1B18] font-semibold">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C5A880] text-white text-xs font-bold ring-4 ring-[#C5A880]/20 shadow-xs">
                    2
                  </span>
                  <span className="uppercase text-[11px] tracking-wider text-[#2C2520] font-bold">
                    2. Ceremony &amp; Delivery Address
                  </span>
                </li>

                <li className="text-[#D9D2C5] font-light">—</li>

                {/* Step 3: Upcoming */}
                <li className="flex items-center space-x-2 text-[#1F1B18]/40">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border border-[#D9D2C5] text-[#1F1B18]/50 text-xs font-medium bg-[#FDFCFA]">
                    3
                  </span>
                  <span className="hidden sm:inline uppercase text-[11px] tracking-wider">
                    3. White-Glove Dispatch
                  </span>
                  <span className="sm:hidden text-[11px]">3. Settlement</span>
                </li>

              </ol>
            </nav>

            {/* Customized Timer Reservation Pill */}
            <aside aria-label="Slot Reservation" className="flex items-center space-x-2 bg-[#FDFCFA]/95 border border-[#C5A880]/40 px-3.5 py-1.5 rounded-full shadow-sm text-xs">
              <svg className="w-4 h-4 text-[#C5A880] animate-pulse flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#1F1B18]/80 font-normal">
                Customized 3D Initials Brass Die slot &amp; Chilled Transit reserved for:
                <strong className="font-mono font-bold text-[#1F1B18] ml-1.5 text-[#9A7B4F]">
                  {formatTimer(timeLeft)} min
                </strong>
              </span>
            </aside>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN TWO-COLUMN CHECKOUT CONTENT                       */}
      {/* ========================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        
        {/* Page Title Area */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-1">
            Confidential Customized Order Placement
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2C2520] font-normal tracking-tight">
            Ceremony Dispatch &amp; Collection Security
          </h1>
          <p className="text-sm text-[#1F1B18]/70 mt-1 max-w-2xl font-light leading-relaxed">
            Please specify the royal palace, luxury resort, or bridal residence where our temperature-controlled fleet will coordinate the white-glove handover.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: Checkout Forms & Details (7 cols) */}
          {/* ========================================== */}
          <section aria-label="Shipping and Recipient Details" className="lg:col-span-7 space-y-8">
            
            {/* ---------------------------------------------------- */}
            {/* SECTION I: Contact & WhatsApp Updates */}
            {/* ---------------------------------------------------- */}
            <article className="bg-[#FDFCFA] border border-[#EAE5DC] rounded-xl p-6 sm:p-7 shadow-[0_4px_20px_0_rgba(44,37,32,0.04)]">
              <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4 mb-5">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#F4F0EA] flex items-center justify-center text-xs font-serif font-bold text-[#1F1B18]">
                    I
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#2C2520] font-medium">
                    Digital Calligraphy Proof &amp; Dispatch Updates
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#C5A880] hover:underline cursor-pointer">
                  Collection Guest Checkout
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Input */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="checkout-email">
                    Primary Contact Email <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="shahnawazalirkl@gmail.com"
                    className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2.5 px-3.5 text-[#1F1B18] placeholder-[#1F1B18]/40 transition-colors"
                  />
                  <p className="text-[11px] text-[#1F1B18]/60 mt-1">
                    High-resolution vector deboss proofs and climate tracking links will be sent here.
                  </p>
                </div>

                {/* WhatsApp Number with Country Code */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="checkout-phone">
                    Support Mobile &amp; WhatsApp Number <span className="text-[#C5A880]">*</span>
                  </label>
                  <div className="flex rounded-md shadow-xs">
                    <span className="inline-flex items-center px-3.5 rounded-l-md border border-r-0 border-[#EAE5DC] bg-[#F4F0EA]/60 text-[#1F1B18]/70 text-xs font-medium">
                      🇮🇳 +91
                    </span>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="96926 68263"
                      className="flex-1 min-w-0 block w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-none rounded-r-md py-2.5 px-3.5 text-[#1F1B18] placeholder-[#1F1B18]/40"
                    />
                  </div>
                </div>
              </div>

              {/* Verified WhatsApp Status Checkbox */}
              <div className="mt-4 pt-3 border-t border-[#EAE5DC]/60">
                <label className="relative flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={receiveWhatsappProofs}
                    onChange={(e) => setReceiveWhatsappProofs(e.target.checked)}
                    className="h-4 w-4 rounded border-[#D9D2C5] text-[#1F1B18] focus:ring-[#C5A880] focus:ring-offset-0 mt-0.5 accent-[#1F1B18]"
                  />
                  <span className="ml-3 text-xs text-[#1F1B18]/85 leading-relaxed">
                    <strong className="font-semibold text-[#1F1B18]">Receive WhatsApp Visual Proofs:</strong> Get instant die casting photo previews and private GPS link of our White-Glove transit van prior to hotel delivery.
                  </span>
                </label>
              </div>
            </article>

            {/* ---------------------------------------------------- */}
            {/* SECTION II: Ceremony & Destination Address */}
            {/* ---------------------------------------------------- */}
            <article className="bg-[#FDFCFA] border border-[#EAE5DC] rounded-xl p-6 sm:p-7 shadow-[0_4px_20px_0_rgba(44,37,32,0.04)]">
              <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#F4F0EA] flex items-center justify-center text-xs font-serif font-bold text-[#1F1B18]">
                    II
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#2C2520] font-medium">
                    Ceremony &amp; Destination Address
                  </h2>
                </div>
                <span className="text-xs text-[#1F1B18]/50 uppercase tracking-widest hidden sm:inline font-medium">
                  White-Glove Route
                </span>
              </div>

              {/* Destination Venue Type Tabs */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-2">
                  Venue Handover Type
                </label>
                <div className="grid grid-cols-2 gap-3" role="tablist">
                  <button
                    type="button"
                    onClick={() => setVenueType('residence')}
                    className={`flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                      venueType === 'residence'
                        ? 'border-2 border-[#1F1B18] bg-[#1F1B18] text-[#FDFCFA] shadow-sm'
                        : 'border border-[#EAE5DC] bg-[#F4F0EA]/50 text-[#1F1B18]/70 hover:bg-[#F4F0EA]'
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 mr-2 ${venueType === 'residence' ? 'text-[#C5A880]' : 'text-[#1F1B18]/60'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Private Residence / Suite
                  </button>

                  <button
                    type="button"
                    onClick={() => setVenueType('palace')}
                    className={`flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                      venueType === 'palace'
                        ? 'border-2 border-[#1F1B18] bg-[#1F1B18] text-[#FDFCFA] shadow-sm'
                        : 'border border-[#EAE5DC] bg-[#F4F0EA]/50 text-[#1F1B18]/70 hover:bg-[#F4F0EA]'
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 mr-2 ${venueType === 'palace' ? 'text-[#C5A880]' : 'text-[#1F1B18]/60'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Palace / Resort / Support
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 text-xs">
                
                {/* Couple / Recipient Name & Wedding Planner Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="recipient-name">
                      Primary Recipient / Couple Name <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="recipient-name"
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3.5 text-[#1F1B18] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="wedding-planner">
                      Wedding Planner / Caretaker Contact
                    </label>
                    <input
                      id="wedding-planner"
                      type="text"
                      value={weddingPlanner}
                      onChange={(e) => setWeddingPlanner(e.target.value)}
                      placeholder="e.g. Shagufta Naaz (+91 96926 68263)"
                      className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3.5 text-[#1F1B18]"
                    />
                  </div>
                </div>

                {/* Palace Property Name */}
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="venue-name">
                    {venueType === 'palace' ? 'Destination Palace or Resort Property' : 'Residence Name / Suite Number'} <span className="text-[#C5A880]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="venue-name"
                      type="text"
                      required
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3.5 text-[#1F1B18] pr-20"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#1F1B18]/40 text-[10px] font-semibold uppercase">
                      {venueType === 'palace' ? 'Palace Tag' : 'Private Suite'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#1F1B18]/60 mt-1">
                    Our dispatch marshal hands over directly to the head support with formal luggage route tags.
                  </p>
                </div>

                {/* Street Address & Landmark */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="address-street">
                      Street Address / Haridas Ji Ki Magri <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="address-street"
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3.5 text-[#1F1B18]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="landmark">
                      Famous Landmark
                    </label>
                    <input
                      id="landmark"
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3.5 text-[#1F1B18]"
                    />
                  </div>
                </div>

                {/* City, State, PIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="city">
                      City <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3.5 text-[#1F1B18] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="state">
                      State <span className="text-[#C5A880]">*</span>
                    </label>
                    <select
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3.5 text-[#1F1B18]"
                    >
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Maharashtra (Mumbai/Goa)">Maharashtra (Mumbai/Goa)</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="pincode">
                      PIN Code <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full text-sm bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3.5 text-[#1F1B18] font-medium"
                    />
                  </div>
                </div>

                {/* Auspicious Delivery Date & Slot Selector */}
                <div className="pt-4 border-t border-[#EAE5DC] mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F4F0EA]/40 p-4 rounded-lg border border-[#EAE5DC]">
                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-[#1F1B18] mb-1" htmlFor="preferred-date">
                        Auspicious Arrival Date <span className="text-[#C5A880]">*</span>
                      </label>
                      <input
                        id="preferred-date"
                        type="date"
                        required
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3 text-[#1F1B18]"
                      />
                      <span className="text-[10px] text-[#1F1B18]/60 block mt-1">
                        Recommended: 4 days before ceremony (18th Nov 2026) for fresh botanical acclimation.
                      </span>
                    </div>

                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-[#1F1B18] mb-1" htmlFor="preferred-slot">
                        Direct Handover Timing Slot
                      </label>
                      <select
                        id="preferred-slot"
                        value={timingSlot}
                        onChange={(e) => setTimingSlot(e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md py-2 px-3 text-[#1F1B18]"
                      >
                        <option value="Morning Slot (09:00 AM – 01:00 PM)">Morning Slot (09:00 AM – 01:00 PM)</option>
                        <option value="Twilight Royal Arrival (04:00 PM – 08:00 PM)">Twilight Royal Arrival (04:00 PM – 08:00 PM)</option>
                        <option value="24/7 Diplomatic Support Reception Desk">24/7 Diplomatic Support Reception Desk</option>
                      </select>
                      <span className="text-[10px] text-[#1F1B18]/60 block mt-1">
                        Coordinated directly with the hotel security officer.
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </article>

            {/* ---------------------------------------------------- */}
            {/* SECTION III: White-Glove Wedding Transit Tier */}
            {/* ---------------------------------------------------- */}
            <article className="bg-[#FDFCFA] border border-[#EAE5DC] rounded-xl p-6 sm:p-7 shadow-[0_4px_20px_0_rgba(44,37,32,0.04)]">
              <div className="flex items-center space-x-3 border-b border-[#EAE5DC] pb-4 mb-5">
                <span className="w-6 h-6 rounded-full bg-[#F4F0EA] flex items-center justify-center text-xs font-serif font-bold text-[#1F1B18]">
                  III
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#2C2520] font-medium">
                  White-Glove Wedding Transit Tier
                </h2>
              </div>

              <fieldset className="space-y-3.5">
                <legend className="sr-only">Select transit preference tier</legend>

                {/* Option 1: Complimentary Climate-Controlled */}
                <label
                  onClick={() => setTransitMethod('white_glove')}
                  className={`relative flex p-4 cursor-pointer rounded-xl transition-all ${
                    transitMethod === 'white_glove'
                      ? 'border-2 border-[#1F1B18] bg-[#F4F0EA]/40'
                      : 'border border-[#EAE5DC] bg-white hover:bg-[#F4F0EA]/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="transit_method"
                    value="white_glove"
                    checked={transitMethod === 'white_glove'}
                    onChange={() => setTransitMethod('white_glove')}
                    className="h-4 w-4 text-[#1F1B18] border-[#D9D2C5] focus:ring-0 mt-0.5 accent-[#1F1B18]"
                  />
                  <div className="ml-3.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F1B18] uppercase tracking-wider flex items-center gap-2">
                        Temperature-Controlled White-Glove Transit
                        <span className="bg-[#1E6347]/10 text-[#1E6347] text-[9px] font-bold px-2 py-0.5 rounded tracking-normal">
                          Included (Free)
                        </span>
                      </span>
                      <span className="text-xs font-semibold text-[#1F1B18]">₹0</span>
                    </div>
                    <p className="text-xs text-[#1F1B18]/70 mt-1 leading-relaxed">
                      Climate-stabilized van with zero-vibration suspension. Includes fresh botanical hydration ampoules for wedding essentials florals and Tamper-Proof 24k Gold Wax seals.
                    </p>
                  </div>
                </label>

                {/* Option 2: Diplomatic Courier Hand-Carry */}
                <label
                  onClick={() => setTransitMethod('diplomatic')}
                  className={`relative flex p-4 cursor-pointer rounded-xl transition-all ${
                    transitMethod === 'diplomatic'
                      ? 'border-2 border-[#1F1B18] bg-[#F4F0EA]/40'
                      : 'border border-[#EAE5DC] bg-white hover:bg-[#F4F0EA]/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="transit_method"
                    value="diplomatic"
                    checked={transitMethod === 'diplomatic'}
                    onChange={() => setTransitMethod('diplomatic')}
                    className="h-4 w-4 text-[#1F1B18] border-[#D9D2C5] focus:ring-0 mt-0.5 accent-[#1F1B18]"
                  />
                  <div className="ml-3.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F1B18] uppercase tracking-wider flex items-center gap-2">
                        Hand-Carried Diplomatic Courier (Direct to Bridal Suite)
                        <span className="bg-[#C5A880]/20 text-[#2C2520] text-[9px] font-bold px-2 py-0.5 rounded">
                          Royal Weddings
                        </span>
                      </span>
                      <span className="text-xs font-bold text-[#1F1B18]">+ ₹1,499</span>
                    </div>
                    <p className="text-xs text-[#1F1B18]/70 mt-1 leading-relaxed">
                      A dedicated ASRA Collection custodian travels on flight/direct limousine directly into Udaipur, hand-delivering inside the Bridal suite.
                    </p>
                  </div>
                </label>
              </fieldset>

              {/* Instructions for Chauffeur/Support */}
              <div className="mt-4 pt-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1B18]/80 mb-1.5" htmlFor="chauffeur-notes">
                  Special Handling Note for Chauffeur / Resort Support
                </label>
                <textarea
                  id="chauffeur-notes"
                  rows={2}
                  value={chauffeurNotes}
                  onChange={(e) => setChauffeurNotes(e.target.value)}
                  placeholder="e.g. Handover only to wedding planner Miss Shagufta Naaz or Bride's mother Miss Sultana Begum. Do not leave unattended."
                  className="w-full text-xs bg-[#F4F0EA]/30 border border-[#EAE5DC] focus:border-[#1F1B18] focus:ring-0 rounded-md p-2.5 text-[#1F1B18]"
                />
              </div>
            </article>

            {/* ---------------------------------------------------- */}
            {/* SECTION IV: Customized Approval & Stylist Support */}
            {/* ---------------------------------------------------- */}
            <article className="bg-[#F4F0EA]/50 border border-[#EAE5DC] rounded-xl p-5 sm:p-6">
              <div className="flex items-start space-x-3.5">
                <div className="flex items-center h-5">
                  <input
                    id="initials-consent"
                    type="checkbox"
                    checked={monogramConsent}
                    onChange={(e) => setMonogramConsent(e.target.checked)}
                    className="w-4 h-4 text-[#1F1B18] rounded border-[#D9D2C5] focus:ring-0 cursor-pointer accent-[#1F1B18]"
                  />
                </div>
                <label className="text-xs text-[#1F1B18] leading-normal cursor-pointer" htmlFor="initials-consent">
                  <span className="font-bold text-[#2C2520]">Customized Deboss Authorization:</span> I officially approve the casting of the 3D Initials Brass Die for initials{' '}
                  <strong className="font-semibold text-[#2C2520] tracking-wide">"A &amp; R"</strong> with{' '}
                  <em className="font-serif italic text-[#1F1B18]">"Classic Floral Crest"</em>. (A WhatsApp final proof will be sent 2 hours before hot-stamping).
                </label>
              </div>

              {/* Stylist WhatsApp Assistance Callout */}
              <div className="mt-4 p-3.5 bg-white border border-[#EAE5DC] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#1E6347]/10 flex items-center justify-center text-[#1E6347] flex-shrink-0">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1F1B18]">Have Last-Minute Date or Initials Alterations?</h3>
                    <p className="text-[11px] text-[#1F1B18]/70">Connect with your dedicated Senior Collection Stylist before casting is finalized.</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/919692668263?text=Hello%20ASRA%20Atelier%2C%20I%20have%20an%20inquiry%20regarding%20my%20bespoke%20ceremony%20dispatch%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-3.5 py-1.5 rounded-full border border-[#1F1B18]/20 bg-[#F4F0EA]/60 hover:bg-[#1F1B18] hover:text-[#FDFCFA] transition-colors text-[11px] font-semibold text-[#1F1B18] inline-flex items-center gap-1.5"
                >
                  <span>Chat with Stylist</span>
                  <svg className="w-3 h-3 text-[#C5A880]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </article>

          </section>

          {/* =========================================== */}
          {/* RIGHT COLUMN: Order Summary & Settlement (5 cols) */}
          {/* =========================================== */}
          <aside aria-label="Order Financial Summary and Payment Selection" className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Luxury Order Summary Container */}
            <div className="bg-[#FDFCFA] border border-[#EAE5DC] rounded-xl p-6 sm:p-7 shadow-[0_10px_30px_-10px_rgba(31,27,24,0.06),0_4px_12px_-4px_rgba(31,27,24,0.04)]">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5DC]">
                <h2 className="font-serif text-2xl text-[#2C2520] font-medium">
                  Collection Order &amp; Ensembles
                </h2>
                <span className="text-[11px] bg-[#F4F0EA] font-bold uppercase tracking-wider px-2.5 py-1 rounded text-[#1F1B18]/70">
                  {itemCount || displayItems.length} Heirlooms
                </span>
              </div>

              {/* Product Item Previews */}
              <div className="py-4 space-y-3.5 border-b border-[#EAE5DC] text-xs max-h-64 overflow-y-auto pr-1">
                {displayItems.map((item, idx) => (
                  <div key={item.cartId || idx} className="flex items-start justify-between pb-2">
                    <div className="flex-1 pr-3">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-[#1F1B18]">
                          {item.quantity || 1}× {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#1F1B18]/60 mt-0.5">
                        {item.edition || 'Classic Blush & Champagne Gold'} | Initials:{' '}
                        <span className="text-[#2C2520] font-medium">{item.monogramDie || '"A & R"'}</span>
                      </p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold text-[#1E6347] bg-[#1E6347]/10 px-1.5 py-0.5 rounded">
                        Customized 3D Die Locked
                      </span>
                    </div>
                    <span className="font-serif text-base text-[#1F1B18] font-semibold whitespace-nowrap">
                      ₹{((item.price || 7499) * (item.quantity || 1)).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input / State inside Summary */}
              <div className="py-3 border-b border-[#EAE5DC]">
                {appliedCoupon ? (
                  <div className="flex justify-between items-center bg-[#F4F0EA]/50 p-2.5 rounded border border-[#EAE5DC]/60 text-xs">
                    <div className="flex items-center space-x-1.5">
                      <svg className="w-3.5 h-3.5 text-[#C5A880]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                      </svg>
                      <span className="text-[11px] font-bold text-[#2C2520] uppercase tracking-wider">
                        Promo '{appliedCoupon.code}' Applied
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#1E6347] font-bold text-xs">
                        - ₹{effectiveDiscount.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-rose-600 hover:underline text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="ENTER WEDDING CODE"
                        className="flex-1 bg-[#F4F0EA] border border-[#EAE5DC] px-2.5 py-1.5 text-xs uppercase font-mono font-bold text-[#1F1B18] rounded focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-[#1F1B18] text-white text-[10px] uppercase font-semibold px-3 py-1.5 rounded hover:bg-[#2C2520]"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-[10px] text-rose-600">{promoError}</p>}
                  </div>
                )}
              </div>

              {/* Breakdown Ledger */}
              <div className="py-4 space-y-2.5 text-xs border-b border-[#EAE5DC]">
                <div className="flex justify-between text-[#1F1B18]/80">
                  <span>Items Total ({itemCount || displayItems.length} Pieces)</span>
                  <span className="font-medium text-[#1F1B18]">₹{(originalTotal || 12299).toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#1F1B18]/80">
                  <span>Catalogue Privilege Savings</span>
                  <span className="text-[#1E6347] font-medium">- ₹{effectiveCatalogueSavings.toLocaleString('en-IN')}</span>
                </div>

                {effectiveDiscount > 0 && (
                  <div className="flex justify-between text-[#1E6347] font-medium">
                    <span>Privilege Promo Code</span>
                    <span>- ₹{effectiveDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#1F1B18]/80 pt-1">
                  <span className="flex items-center gap-1.5">
                    Custom Brass Deboss Die &amp; Wax Seals
                    <span className="text-[10px] text-[#1F1B18]/40" title="Hand-carved in brass">ℹ️</span>
                  </span>
                  <span className="text-[#1E6347] font-semibold text-[11px] uppercase tracking-wider bg-[#1E6347]/10 px-1.5 py-0.5 rounded">
                    Complimentary
                  </span>
                </div>

                <div className="flex justify-between text-[#1F1B18]/80">
                  <span>White-Glove Insured Chilled Transit</span>
                  <span className={`text-xs font-semibold uppercase ${transitCost > 0 ? 'text-[#1F1B18]' : 'text-[#1E6347]'}`}>
                    {transitCost > 0 ? `+ ₹${transitCost.toLocaleString('en-IN')}` : 'Free'}
                  </span>
                </div>

                <div className="flex justify-between text-[#1F1B18]/60 text-[11px] pt-1">
                  <span>Estimated GST (18% Included)</span>
                  <span>₹{Math.round((grandTotal * 18) / 118).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Total Amount Payable */}
              <div className="pt-4 pb-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1F1B18]">Total Amount</span>
                    <p className="text-[11px] text-[#1F1B18]/60 font-light">All-inclusive of luxury handcraft &amp; insurance</p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2520]">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-[#1E6347] font-semibold">
                      Total Savings: ₹{totalSaved.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Loyalty Privilege Points */}
              <div className="mt-3 py-2 px-3 bg-[#F4F0EA]/70 rounded-lg flex items-center space-x-2 border border-[#EAE5DC] text-xs">
                <span className="text-[#C5A880] text-sm">✦</span>
                <p className="text-[#1F1B18]/90 text-[11px]">
                  You will earn <strong className="font-bold text-[#1F1B18]">{calculatedLoyaltyPoints} ASRA Privilege Points</strong> for future royal celebration milestones.
                </p>
              </div>

              {/* ========================================= */}
              {/* PAYMENT METHOD SELECTOR                   */}
              {/* ========================================= */}
              <div className="mt-6 pt-5 border-t border-[#EAE5DC]">
                
                {/* Prominent Payment Gateway Notice Banner */}
                <div className="mb-4 p-3.5 bg-amber-50/90 border border-amber-300/80 rounded-xl text-amber-900 flex items-start gap-3 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-amber-800">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="text-xs leading-relaxed">
                    <p className="font-bold uppercase tracking-wider text-[11px] text-amber-950 flex items-center gap-1.5">
                      <span>Notice: No Payments Can Be Made</span>
                      <span className="bg-amber-200/80 text-amber-900 text-[9px] px-2 py-0.5 rounded-full font-semibold">
                        Integration In Progress
                      </span>
                    </p>
                    <p className="mt-1 text-amber-900/90">
                      We are currently working on our official payment gateway integration. Since no payment gateway is active, <strong>no payments can be made and orders cannot be confirmed online</strong> at this time.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1F1B18]">
                    Customized Settlement Mode
                  </label>
                  <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1 bg-amber-100/70 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Gateway Integration In Progress
                  </span>
                </div>

                {/* Payment Tabs */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  {/* UPI Pay Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-2 border-[#1F1B18] bg-[#F4F0EA]/50'
                        : 'border border-[#EAE5DC] bg-white hover:bg-[#F4F0EA]/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${paymentMethod === 'upi' ? 'bg-[#1F1B18]' : 'border border-[#D9D2C5]'}`} />
                      <span className="font-bold text-[#1F1B18]">UPI Instant</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">Pending Gateway</span>
                  </button>

                  {/* Card / EMI Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-2 border-[#1F1B18] bg-[#F4F0EA]/50'
                        : 'border border-[#EAE5DC] bg-white hover:bg-[#F4F0EA]/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${paymentMethod === 'card' ? 'bg-[#1F1B18]' : 'border border-[#D9D2C5]'}`} />
                      <span className="font-medium text-[#1F1B18]">Card / EMI</span>
                    </div>
                    <span className="text-[9px] font-bold bg-[#C5A880]/20 text-[#2C2520] px-1.5 py-0.5 rounded">
                      Pending Gateway
                    </span>
                  </button>
                </div>

                {/* Conditional Payment UI */}
                {paymentMethod === 'upi' ? (
                  <div className="p-3 bg-[#F4F0EA]/40 border border-[#EAE5DC] rounded-lg mb-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#1F1B18]">Direct UPI ID / VPA</span>
                      <span className="text-amber-800 text-[10px] font-medium bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Gateway not connected</span>
                    </div>
                    <div className="mt-2 flex">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setIsUpiVerified(false);
                        }}
                        placeholder="e.g. yourname@okhdfcbank"
                        className="flex-1 text-xs bg-white border border-[#EAE5DC] rounded-l-md px-3 py-2 text-[#1F1B18] font-mono focus:border-[#1F1B18] focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyUpi}
                        className={`text-[11px] font-semibold px-3.5 py-2 rounded-r-md uppercase tracking-wider transition-colors ${
                          isUpiVerified
                            ? 'bg-[#1E6347] text-white'
                            : 'bg-[#1F1B18] text-[#FDFCFA] hover:bg-[#2C2520]'
                        }`}
                      >
                        {isUpiVerified ? '✓ Verified' : 'Verify'}
                      </button>
                    </div>
                    <p className="text-[10px] text-amber-800 mt-1.5 flex items-center gap-1">
                      <span>⚠️ Note: Online transaction processing is disabled until payment gateway integration is completed.</span>
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-[#F4F0EA]/40 border border-[#EAE5DC] rounded-lg mb-5 space-y-2">
                    <div className="text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-semibold uppercase text-[#1F1B18]/70">
                          Credit / Debit Card Number
                        </label>
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Gateway not connected</span>
                      </div>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full text-xs bg-white border border-[#EAE5DC] rounded px-3 py-1.5 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-[#1F1B18]/70 mb-1">
                          Valid Thru
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full text-xs bg-white border border-[#EAE5DC] rounded px-2.5 py-1.5 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-[#1F1B18]/70 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full text-xs bg-white border border-[#EAE5DC] rounded px-2.5 py-1.5 font-mono"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-800 pt-1">
                      ⚠️ Note: Card processing is disabled pending payment gateway setup.
                    </p>
                  </div>
                )}

                {/* PRIMARY SUBMISSION BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-[#1F1B18] hover:bg-[#2C2520] text-[#FDFCFA] py-4 px-6 rounded-lg font-serif text-lg tracking-wide uppercase transition-all duration-200 shadow-md hover:shadow-xl flex items-center justify-center space-x-3 group active:scale-[0.99]"
                >
                  <span>Complete Customized Order &amp; Lock Die</span>
                  <span className="text-[#C5A880] font-sans font-semibold text-base">• ₹{grandTotal.toLocaleString('en-IN')}</span>
                  <svg className="w-4 h-4 text-[#C5A880] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <p className="text-[11px] text-center text-rose-700 font-medium mt-2.5">
                  ⚠️ Orders cannot be confirmed without payment gateway integration. No payment can be processed.
                </p>

              </div>

              {/* Trust Badges Under Payment */}
              <div className="mt-6 pt-5 border-t border-[#EAE5DC] space-y-2 text-[11px] text-[#1F1B18]/80">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-[#C5A880] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span><strong>100% Damage-Proof Transit Guarantee</strong> (Instant suite replacement)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-[#C5A880] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Direct Palace Support Protocol &amp; Hotel Luggage Integration</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-[#C5A880] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Verified Hallmark &amp; 24k Pure Gold Leaf Authenticity Certificate</span>
                </div>
              </div>

            </div>

            {/* Tiered Support Wedding Favors Banner */}
            <div className="bg-[#F4F0EA]/60 border border-[#EAE5DC] rounded-xl p-5 text-center">
              <span className="text-[#C5A880] text-xs block mb-1">✦ ✦ ✦</span>
              <h3 className="font-serif text-lg text-[#2C2520] font-medium">Curating Multiple Wedding Event Rooms?</h3>
              <p className="text-xs text-[#1F1B18]/70 mt-1 max-w-sm mx-auto font-light">
                If this ensemble is part of 25+ unit wedding essentials welcome boxes, your order qualifies for personal support assembly.
              </p>
              <Link
                to="/bulk-orders"
                className="inline-block mt-3 text-xs font-semibold text-[#1F1B18] uppercase tracking-wider hover:text-[#C5A880] transition-colors underline decoration-[#C5A880] decoration-1 underline-offset-4"
              >
                Connect With Royal Support Desk &rarr;
              </Link>
            </div>

          </aside>

        </form>

      </main>

      {/* ========================================================= */}
      {/* 4. MINIMAL DISTRACTION-FREE BOTTOM SECURITY STRIP         */}
      {/* ========================================================= */}
      <footer className="w-full bg-[#FDFCFA] border-t border-[#EAE5DC] py-6 mt-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1F1B18]/60 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-sm text-[#2C2520] tracking-wider font-semibold">ASRA WEDDING CANVAS</span>
            <span>• Private Collection &amp; Wedding Essentials Vaults</span>
          </div>

          <div className="flex flex-wrap items-center justify-center space-x-6 text-[11px]">
            <Link to="/bespoke" className="hover:text-[#1F1B18] transition-colors">Support Protocols</Link>
            <Link to="/about" className="hover:text-[#1F1B18] transition-colors">Hallmark Verification</Link>
            <Link to="/return-policy" className="hover:text-[#1F1B18] transition-colors">Transit Insurance Policy</Link>
            <Link to="/terms-of-service" className="hover:text-[#1F1B18] transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="hover:text-[#1F1B18] transition-colors">Confidentiality Guarantee</Link>
          </div>

          <div className="text-[10px] text-[#1F1B18]/50">
            © 2026 ASRA Collection. All royal rights reserved.
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 5. PAYMENT GATEWAY INTEGRATION MODAL                      */}
      {/* ========================================================= */}
      {showPaymentModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1B18]/70 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-[#FDFCFA] border border-[#EAE5DC] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative text-center">
            
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Header */}
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full inline-block mb-2">
              No Payments Can Be Made
            </span>
            <h3 id="modal-headline" className="font-serif text-2xl sm:text-3xl text-[#2C2520] font-normal mb-3">
              Order Cannot Be Confirmed
            </h3>

            {/* Message Body */}
            <div className="space-y-3 text-xs sm:text-sm text-[#1F1B18]/80 leading-relaxed bg-[#F4F0EA]/60 p-4 rounded-xl border border-[#EAE5DC] text-left">
              <p className="font-medium text-[#1F1B18]">
                <strong>No payments can be made.</strong> No money has been deducted from your account.
              </p>
              <p>
                We are currently working on our official payment gateway integration. Since there is no active payment gateway connected, <strong>no payments can be made and orders cannot be confirmed without payment gateway integration</strong>.
              </p>
              <p className="text-[11px] text-[#1F1B18]/70 border-t border-[#EAE5DC] pt-2">
                If you wish to reserve your wedding date or make a direct bespoke arrangement, our Senior Atelier Stylist is available via WhatsApp.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919692668263?text=Hello%20ASRA%20Atelier%2C%20I%20am%20at%20checkout%20and%20would%20like%20to%20inquire%20about%20payment%20and%20reserving%20my%20wedding%20ensemble."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#1E6347] hover:bg-[#164d36] text-white py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>Inquire on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-[#1F1B18] hover:bg-[#2C2520] text-[#FDFCFA] py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Back to Review
              </button>
            </div>

            {/* Dismiss Cross */}
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-[#1F1B18]/40 hover:text-[#1F1B18] p-1 rounded-full"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default CheckoutPage;
