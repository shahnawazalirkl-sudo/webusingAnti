import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BULK_TIERS, BULK_SIGNATURE_FAVORS, BULK_CASE_STUDIES } from '../data/productsData';
import { useCart } from '../context/CartContext';

const BulkOrdersPage = () => {
  const { showToast } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notesPulse, setNotesPulse] = useState(false);

  const [formData, setFormData] = useState({
    milestone: '',
    quantity: '',
    eventDate: '',
    destination: '',
    coupleNames: '',
    budget: '1000-2000',
    contactName: '',
    phone: '',
    email: '',
    notes: ''
  });

  const notesRef = useRef(null);
  const inquiryFormRef = useRef(null);
  const volumeTiersRef = useRef(null);

  // Smooth scroll helper
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add signature favor to inquiry notes and scroll to form
  const addFavorToInquiry = (itemName) => {
    setFormData((prev) => {
      const alreadyIncluded = prev.notes.toLowerCase().includes(itemName.toLowerCase());
      const updatedNotes = alreadyIncluded
        ? prev.notes
        : prev.notes
        ? `${prev.notes}, ${itemName}`
        : itemName;
      return { ...prev, notes: updatedNotes };
    });

    if (notesRef.current) {
      notesRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setNotesPulse(true);
      setTimeout(() => setNotesPulse(false), 1400);
    }

    showToast(`Added "${itemName}" to your customized bulk inquiry dossier!`);
  };

  // Select a tier from the volume privileges cards
  const handleSelectTier = (tierValue, tierRange) => {
    setFormData((prev) => ({ ...prev, quantity: tierValue }));
    if (inquiryFormRef.current) {
      inquiryFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showToast(`Selected ${tierRange} tier pricing for your celebration inquiry.`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast('Bulk Support Inquiry received! A dedicated manager will connect on WhatsApp within 2 hours.');
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setFormData({
      milestone: '',
      quantity: '',
      eventDate: '',
      destination: '',
      coupleNames: '',
      budget: '1000-2000',
      contactName: '',
      phone: '',
      email: '',
      notes: ''
    });
  };

  return (
    <div className="w-full bg-surface text-on-surface flex flex-col antialiased">

      {/* 1. Editorial Hero Section */}
      <section className="w-full bg-surface-container-low py-8 sm:py-10 lg:py-12 border-b border-outline-variant/30">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF4EB] border border-primary/20 rounded-full mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
                  Collection Volume &amp; Event Concierge
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-4">
                Curated Wedding Favors &amp; Customized Bulk Gifting for Grand Celebrations
              </h1>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl mb-6">
                From 50 to 5,000+ guests, our master artisans handcraft personalized wedding favor suites, guest welcome hampers, and bridal party gifts. Featuring complimentary custom couple initials, volume collection pricing, and white-glove direct-to-venue delivery across India and worldwide.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection(inquiryFormRef)}
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Concierge Consultation</span>
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection(volumeTiersRef)}
                  className="px-5 py-2.5 border border-outline-variant/50 text-on-surface rounded-lg text-xs font-semibold uppercase tracking-wider hover:border-primary hover:text-primary active:scale-[0.98] transition-all duration-300 flex items-center gap-2 bg-surface-container-lowest shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                  <span>View Volume Tiers</span>
                </button>
              </div>
            </div>

            {/* Hero Embellishment Graphic */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-xl bg-surface-container-lowest overflow-hidden shadow-xs hover:shadow-md border border-outline-variant/30 group transition-all duration-300">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  alt="Deluxe pastel pink bridal welcome hamper wrapped in pure silk ribbon with custom gold foil ASRA crest"
                  src="/assets/cdn/img_ce96f997d2cf.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 sm:p-6">
                  <span className="text-[10px] sm:text-[11px] text-[#FAF4EB] uppercase tracking-[0.2em] font-semibold">
                    Masterpiece Gift
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-medium text-white leading-snug">
                    The Imperial Classic Guest Suite
                  </p>
                  <p className="text-xs text-stone-300 mt-1">
                    Delivered to The Oberoi Udaivilas, Udaipur
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Collection 3 Value Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 pt-4">
            <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">50+ Minimum Units</h4>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Flexible customized tiering tailored for intimate vows to 5,000+ guest royal gala evenings.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Complimentary Initials Die</h4>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Custom brass die manufactured free of charge for 3D hot-stamp debossing on every unit.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Direct Venue Logistics</h4>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Temperature-controlled white-glove transit to luxury resorts in 140+ global destinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Volume Privilege Tiers */}
      <section ref={volumeTiersRef} id="volumeTiers" className="w-full py-8 sm:py-10 lg:py-12 bg-surface">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
              Tiered Collection Economics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mt-1.5">
              Volume Privileges &amp; Celebration Tiers
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
              Transparent volume collection pricing structured to reward grand celebrations with bespoke customization privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {BULK_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between relative border ${
                  tier.popular
                    ? 'bg-surface-container-lowest shadow-md hover:shadow-xl border-primary ring-1 ring-primary/40'
                    : 'rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    Most Selected
                  </div>
                )}

                <div>
                  <div className={`flex items-center justify-between mb-3 ${tier.popular ? 'mt-1' : ''}`}>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                        tier.popular
                          ? 'bg-[#FAF4EB] text-primary border border-primary/20'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      {tier.tier}
                    </span>
                    <span className="font-mono text-xs font-bold text-primary">
                      {tier.range}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1.5">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    {tier.description}
                  </p>

                  <div
                    className={`p-3 rounded-lg mb-4 ${
                      tier.popular ? 'bg-[#FAF4EB] border border-primary/20' : 'bg-surface-container-low'
                    }`}
                  >
                    <span className="font-serif text-xl sm:text-2xl text-primary font-bold">
                      {tier.discount}
                    </span>
                    <span className="text-xs font-semibold text-on-surface ml-1.5">
                      {tier.privilegeLabel}
                    </span>
                  </div>

                  <ul className="space-y-2 text-on-surface-variant text-xs mb-6">
                    {tier.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[16px]">
                          check_circle
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectTier(tier.value, tier.range)}
                  className={`w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer ${
                    tier.popular
                      ? 'bg-primary text-on-primary hover:bg-[#5f4b2d] shadow-xs active:scale-[0.98]'
                      : 'border border-outline-variant/50 text-on-surface hover:border-primary hover:text-primary active:scale-[0.98]'
                  }`}
                >
                  Inquire {tier.tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Signature Favors & Welcome Gifts */}
      <section className="w-full py-8 sm:py-10 lg:py-12 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
                Masterpiece Catalogue
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mt-1.5">
                Signature Favors &amp; Welcome Gifts
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
                Hand-assembled by master craftsmen. All units include individualized gold monogramming and bespoke ribbon tying.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-on-surface-variant font-medium">Estimated Lead Time:</span>
              <span className="px-2.5 py-1 bg-surface-container-lowest rounded-md text-xs text-on-surface font-semibold border border-outline-variant/30 shadow-xs">
                5 - 14 Business Days
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {BULK_SIGNATURE_FAVORS.map((favor) => (
              <div
                key={favor.id}
                className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <div className="relative aspect-[4/3] bg-surface-container-low overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    alt={favor.name}
                    src={favor.image}
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-[#FAF4EB] text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider rounded shadow-xs">
                    MIN: {favor.minUnits} UNITS
                  </span>
                  <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface border border-outline-variant/30 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow-xs">
                    {favor.tag}
                  </span>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1.5">
                      {favor.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                      {favor.description}
                    </p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-bold text-sm sm:text-base text-primary">
                        ₹{favor.price.toLocaleString('en-IN')}
                      </span>
                      <span className="line-through text-outline text-xs">
                        ₹{favor.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-medium">
                        per unit
                      </span>
                    </div>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between border-t border-outline-variant/30">
                    <span className="text-[11px] text-outline font-mono">
                      Lead: {favor.leadTime}
                    </span>
                    <button
                      type="button"
                      onClick={() => addFavorToInquiry(favor.name)}
                      className="px-3.5 py-1.5 bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface text-xs font-semibold uppercase tracking-wider rounded-lg border border-outline-variant/30 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>Add to Inquiry</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Concierge Form & White Glove Card */}
      <section ref={inquiryFormRef} id="inquiryForm" className="w-full py-8 sm:py-10 lg:py-12 bg-surface">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-7 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
              <div className="mb-6">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
                  Direct Collection Request
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mt-1.5">
                  Book Bespoke Bulk Consultation
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                  Submit your celebration dates and preferences. A Senior Bridal Concierge Stylist will share digital renders &amp; volume quotation within 4 hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-[#FAF4EB] text-on-surface rounded-xl border border-primary/30 flex flex-col items-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center mb-3 shadow-xs">
                    <span className="material-symbols-outlined text-[28px]">check_circle</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface">
                    Bulk Concierge Dossier Registered
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-md leading-relaxed">
                    Thank you! Our lead bridal stylist will connect via WhatsApp to <strong className="text-on-surface">{formData.phone || '+91 registered contact'}</strong> within 2 hours with tailored catalogs and physical sample timelines.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="mt-6 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                        Wedding Occasion / Milestone *
                      </label>
                      <select
                        value={formData.milestone}
                        onChange={(e) => setFormData({ ...formData, milestone: e.target.value })}
                        required
                        className="w-full bg-surface text-on-surface text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                      >
                        <option value="">Select Milestone</option>
                        <option value="welcome-kit">Destination Welcome Kit</option>
                        <option value="mehendi-haldi">Haldi &amp; Mehendi Favors</option>
                        <option value="sangeet-cocktail">Sangeet &amp; Cocktail Favors</option>
                        <option value="varmala-ceremony">Wedding Day Varmala Gift</option>
                        <option value="reception">Grand Reception Wedding Favors</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                        Estimated Quantity *
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                        className="w-full bg-surface text-on-surface text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                      >
                        <option value="">Select Quantity Range</option>
                        <option value="25-75">25 - 75 Units (Tier 1 • 15% Off)</option>
                        <option value="76-200">76 - 200 Units (Tier 2 • 22% Off)</option>
                        <option value="201-500">201 - 500 Units (Tier 3 • 30% Off)</option>
                        <option value="500+">500+ Units (Tier 4 • 35% Off)</option>
                        <option value="1000+">1,000+ Units (Grand Royal Affair)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                        Target Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-surface text-on-surface text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                        Destination City / Resort *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="e.g. Udaipur, Goa, Jaipur, Dubai"
                        className="w-full bg-surface text-on-surface placeholder:text-outline text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                        Couple's Names &amp; Hashtag
                      </label>
                      <input
                        type="text"
                        value={formData.coupleNames}
                        onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                        placeholder="e.g. Asra &amp; Shahnawaz (#AsraShahnawaz2026)"
                        className="w-full bg-surface text-on-surface placeholder:text-outline text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                        Budget Per Unit (INR)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-surface text-on-surface text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                      >
                        <option value="under-1000">₹600 - ₹1,000 per unit</option>
                        <option value="1000-2000">₹1,000 - ₹2,000 per unit</option>
                        <option value="2000-3500">₹2,000 - ₹3,500 per unit</option>
                        <option value="3500+">₹3,500+ Luxury Masterpiece</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                        Contact Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-surface text-on-surface placeholder:text-outline text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 96926 68263"
                        className="w-full bg-surface text-on-surface placeholder:text-outline text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="shahnawazalirkl@gmail.com"
                      className="w-full bg-surface text-on-surface placeholder:text-outline text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                      Favor Selections / Monogram Notes
                    </label>
                    <textarea
                      ref={notesRef}
                      id="inquiryNotes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Specify preferred favor items, monogram theme, theme color palettes, or room hamper items..."
                      className={`w-full text-on-surface placeholder:text-outline text-xs sm:text-sm p-3.5 rounded-lg border transition-all ${
                        notesPulse
                          ? 'bg-[#FAF4EB] border-primary ring-2 ring-primary/40'
                          : 'bg-surface border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none'
                      }`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-5 py-3 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Curated Bulk Proposal &amp; Samples</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: White-Glove Collection Assurance */}
            <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
              {/* Sample Box Card */}
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2">
                  Complimentary Physical Sample Box
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  We dispatch an unboxing sample box directly to your residence within 48 hours for verified orders above 50 units. Feel the heavy silk textures, smell the artisanal scents, and approve the 3D metal crest stamping in person before production starts.
                </p>
                <div className="flex items-center gap-3 p-3 bg-[#FAF4EB] rounded-lg border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span className="text-[10px] sm:text-[11px] text-on-surface font-semibold uppercase tracking-wider">
                    100% Satisfaction &amp; Color Match Guarantee
                  </span>
                </div>
              </div>

              {/* Immediate Stylist Advice WhatsApp Card */}
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
                <h4 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2">
                  Need Immediate Stylist Advice?
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Direct line to our senior destination bridal concierge for urgent requirements and rush deliveries.
                </p>
                <a
                  href="https://wa.me/919692668263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#25D366] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#20bd5a] active:scale-[0.98] transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Connect on WhatsApp Concierge</span>
                </a>
              </div>

              {/* Luxury Hamper Photo Highlight */}
              <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 relative group">
                <img
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  alt="Close up of exquisite gold foiled ASRA Wedding Canvas monogram emblem stamped in warm gold"
                  src="/assets/cdn/img_be70ca7356d1.jpg"
                />
                <div className="p-4 bg-surface-container-lowest flex items-center justify-between border-t border-outline-variant/30">
                  <div>
                    <p className="text-[10px] sm:text-[11px] text-primary font-bold uppercase tracking-[0.2em]">
                      Custom Die Craft
                    </p>
                    <p className="font-serif text-sm sm:text-base font-semibold text-on-surface">
                      3D Metal Crest Embossing Included
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Destination Wedding Case Studies & Testimonials */}
      <section className="w-full py-8 sm:py-10 lg:py-12 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
              Real Celebrations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mt-1.5">
              Destination Wedding Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
              Discover how ASRA Wedding Canvas crafted memory-making favor suites across India's most prestigious palatial destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {BULK_CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-surface-container-low text-on-surface-variant text-[10px] sm:text-[11px] rounded uppercase tracking-wider font-semibold border border-outline-variant/30">
                      {study.locationTag}
                    </span>
                    <span className="font-mono text-xs text-primary font-bold">
                      {study.unitsBadge}
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2">
                    {study.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant italic mb-4 leading-relaxed">
                    "{study.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                  <div className="w-9 h-9 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                    {study.initials}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-on-surface font-semibold">{study.couple}</p>
                    <p className="text-[11px] text-outline">{study.subInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Trust & Process Ribbons */}
      <section className="w-full py-8 sm:py-10 lg:py-12 bg-surface">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 text-center">
            <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[28px] mb-2">fingerprint</span>
              <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">100% Bespoke Craft</h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                No prefabricated stock. Each suite is designed and personalized from scratch.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[28px] mb-2">flight_takeoff</span>
              <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Insured Global Transit</h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Safe air delivery to 140+ countries and domestic luxury wedding hubs.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[28px] mb-2">verified_user</span>
              <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Wax-Sealed Signature</h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Official ASRA hallmark verification and gold-embossed authentication.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[28px] mb-2">support_agent</span>
              <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Dedicated Concierge</h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Direct 1-on-1 WhatsApp wedding planner support from start to final toast.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BulkOrdersPage;
