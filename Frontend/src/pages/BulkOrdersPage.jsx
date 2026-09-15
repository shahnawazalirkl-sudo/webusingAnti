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

    showToast(`Added "${itemName}" to your bespoke bulk inquiry dossier!`);
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
    showToast('Bulk Concierge Inquiry received! A dedicated manager will connect on WhatsApp within 2 hours.');
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
      <section className="w-full bg-surface-container-low px-4 sm:px-8 py-8 sm:py-space-xl">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-space-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full mb-space-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary tracking-[0.2em] font-semibold uppercase">
                  Atelier Volume Curation &amp; Event Concierge
                </span>
              </div>

              <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-headline-lg text-on-surface tracking-tight leading-tight mb-space-md font-serif">
                Curated Wedding Favors &amp; Bespoke Bulk Gifting for Grand Celebrations
              </h1>

              <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed max-w-2xl mb-space-lg">
                From 50 to 5,000+ guests, our master artisans handcraft personalized wedding favor suites, guest welcome hampers, and bridal party keepsakes. Featuring complimentary custom couple monograms, volume atelier pricing, and white-glove direct-to-venue delivery across India and worldwide.
              </p>

              <div className="flex flex-wrap items-center gap-space-md">
                <button
                  type="button"
                  onClick={() => scrollToSection(inquiryFormRef)}
                  className="px-6 py-3 bg-inverse-surface hover:bg-primary text-inverse-on-surface font-label-md text-label-md tracking-wider uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Concierge Consultation</span>
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection(volumeTiersRef)}
                  className="px-6 py-3 bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-md text-label-md tracking-wider uppercase rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 border border-outline-variant/40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>View Volume Tiers</span>
                </button>
              </div>
            </div>

            {/* Hero Embellishment Graphic */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-xl bg-surface-container overflow-hidden shadow-xl flex items-center justify-center p-space-md border border-outline-variant/40 group">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Deluxe pastel pink bridal welcome hamper wrapped in pure silk ribbon with custom gold foil ASRA crest"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_TifzVUvDu1SpnyCfu4JffHPwizrVpIyAwg8WCEy9NrS4u_ws_g8BAATVsE0hPKeXE6gkBtUxPiHOKRXSGPRVn3Zoi1pE9s5upAJqP4JZXjfuqzoJbevOgRV2YyufqZ7M527B8HRHxxKMzUaSWH83cuEAUZKgb2qVHh-3-EuFYv-MXNDa2SEUiQxy_ZBUoYe2NeTUavRe1uWpn9ODoEjfTmlJaSsVosAX78Kc7o4aLqSD-xTmcgSBXw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent flex flex-col justify-end p-space-lg">
                  <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-widest font-semibold">
                    Masterpiece Keepsake
                  </span>
                  <p className="font-headline-sm text-headline-sm text-surface-container-lowest font-serif">
                    The Imperial Heritage Guest Suite
                  </p>
                  <p className="font-body-sm text-body-sm text-surface-container-high opacity-90">
                    Delivered to The Oberoi Udaivilas, Udaipur
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Atelier 3 Value Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-lg">
            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/40 flex items-start gap-space-sm hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">inventory_2</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">50+ Minimum Units</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Flexible bespoke tiering tailored for intimate vows to 5,000+ guest royal gala evenings.
                </p>
              </div>
            </div>

            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/40 flex items-start gap-space-sm hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Complimentary Monogram Die</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Custom brass die manufactured free of charge for 3D hot-stamp debossing on every unit.
                </p>
              </div>
            </div>

            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/40 flex items-start gap-space-sm hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Direct Venue Logistics</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Temperature-controlled white-glove transit to luxury resorts in 140+ global destinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Volume Privilege Tiers */}
      <section ref={volumeTiersRef} id="volumeTiers" className="w-full px-4 sm:px-8 lg:px-margin py-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center text-center mb-space-xl">
            <span className="font-label-sm text-label-sm text-primary tracking-[0.25em] uppercase font-semibold">
              Tiered Atelier Economics
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface mt-space-xs font-serif">
              Volume Privileges &amp; Celebration Tiers
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs leading-relaxed">
              Transparent volume curation pricing structured to reward grand celebrations with bespoke customization privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {BULK_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-space-lg transition-all flex flex-col justify-between relative border ${
                  tier.popular
                    ? 'bg-surface-container-lowest shadow-md hover:shadow-xl border-primary ring-1 ring-primary'
                    : 'bg-surface-container-lowest shadow-sm hover:shadow-md border-outline-variant/40'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider font-semibold shadow-sm">
                    Most Selected
                  </div>
                )}

                <div>
                  <div className={`flex items-center justify-between mb-space-sm ${tier.popular ? 'mt-1' : ''}`}>
                    <span
                      className={`font-label-sm text-label-sm uppercase tracking-wider px-2 py-1 rounded font-semibold ${
                        tier.popular
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      {tier.tier}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      {tier.range}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-serif">
                    {tier.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                    {tier.description}
                  </p>

                  <div
                    className={`p-space-sm rounded-lg mb-space-md ${
                      tier.popular ? 'bg-primary/10' : 'bg-surface-container-low'
                    }`}
                  >
                    <span className="font-headline-md text-headline-md text-primary font-bold">
                      {tier.discount}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold ml-1">
                      {tier.privilegeLabel}
                    </span>
                  </div>

                  <ul className="space-y-2 text-on-surface-variant font-body-sm text-body-sm mb-space-lg">
                    {tier.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">
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
                  className={`w-full py-2.5 text-center font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                    tier.popular
                      ? 'bg-inverse-surface hover:bg-primary text-inverse-on-surface shadow-sm'
                      : 'bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface'
                  }`}
                >
                  Inquire {tier.tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Signature Favors & Welcome Keepsakes */}
      <section className="w-full px-4 sm:px-8 lg:px-margin py-space-xl bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary tracking-[0.25em] uppercase font-semibold">
                Masterpiece Catalogue
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface mt-space-xs font-serif">
                Signature Favors &amp; Welcome Keepsakes
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs leading-relaxed">
                Hand-assembled by master craftsmen. All units include individualized gold monogramming and bespoke ribbon tying.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Estimated Lead Time:</span>
              <span className="px-2.5 py-1 bg-surface-container-highest rounded font-label-md text-label-md text-on-surface font-semibold border border-outline-variant/40">
                5 - 14 Business Days
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {BULK_SIGNATURE_FAVORS.map((favor) => (
              <div
                key={favor.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col border border-outline-variant/40 group"
              >
                <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={favor.name}
                    src={favor.image}
                  />
                  <span className="absolute top-3 left-3 bg-inverse-surface/90 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded font-semibold tracking-wider">
                    MIN: {favor.minUnits} UNITS
                  </span>
                  <span className="absolute top-3 right-3 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-1 rounded font-bold uppercase tracking-wider">
                    {favor.tag}
                  </span>
                </div>

                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-serif">
                      {favor.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                      {favor.description}
                    </p>
                    <div className="flex items-baseline gap-2 mb-space-sm">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        ₹{favor.price.toLocaleString('en-IN')}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline line-through">
                        ₹{favor.originalPrice.toLocaleString('en-IN')} retail
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">
                        per unit
                      </span>
                    </div>
                  </div>

                  <div className="pt-space-md flex items-center justify-between border-t border-outline-variant/30">
                    <span className="font-label-sm text-label-sm text-outline">
                      Lead Time: {favor.leadTime}
                    </span>
                    <button
                      type="button"
                      onClick={() => addFavorToInquiry(favor.name)}
                      className="px-3 py-1.5 bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm uppercase tracking-wider rounded transition-colors flex items-center gap-1 cursor-pointer"
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
      <section ref={inquiryFormRef} id="inquiryForm" className="w-full px-4 sm:px-8 lg:px-margin py-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Left: Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-space-xl rounded-xl shadow-md border border-outline-variant/40">
              <div className="mb-space-lg">
                <span className="font-label-sm text-label-sm text-primary tracking-[0.2em] font-semibold uppercase">
                  Direct Atelier Request
                </span>
                <h2 className="font-headline-md text-2xl sm:text-headline-md text-on-surface mt-1 font-serif">
                  Book Bespoke Bulk Curation
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Submit your celebration dates and preferences. An Atelier Senior Concierge Stylist will share digital renders &amp; volume quotation within 4 hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-space-lg bg-secondary-container/25 text-on-surface rounded-xl border border-primary/30 flex flex-col items-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[32px]">check_circle</span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-semibold text-on-surface font-serif">
                    Bulk Concierge Dossier Registered
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-md leading-relaxed">
                    Thank you! Our lead bridal stylist will connect via WhatsApp to <strong className="text-on-surface">{formData.phone || '+91 registered contact'}</strong> within 2 hours with tailored catalogs and physical sample timelines.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="mt-6 px-6 py-2.5 bg-inverse-surface hover:bg-primary text-inverse-on-surface rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-space-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        Wedding Occasion / Milestone *
                      </label>
                      <select
                        value={formData.milestone}
                        onChange={(e) => setFormData({ ...formData, milestone: e.target.value })}
                        required
                        className="w-full bg-surface-container-low text-on-surface text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      >
                        <option value="">Select Milestone</option>
                        <option value="welcome-kit">Destination Welcome Kit</option>
                        <option value="mehendi-haldi">Haldi &amp; Mehendi Favors</option>
                        <option value="sangeet-cocktail">Sangeet &amp; Cocktail Favors</option>
                        <option value="varmala-ceremony">Wedding Day Varmala Keepsake</option>
                        <option value="reception">Grand Reception Trousseau</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        Estimated Quantity *
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                        className="w-full bg-surface-container-low text-on-surface text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        Target Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-surface-container-low text-on-surface text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        Destination City / Resort *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="e.g. Udaipur, Goa, Jaipur, Dubai"
                        className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        Couple's Names &amp; Hashtag
                      </label>
                      <input
                        type="text"
                        value={formData.coupleNames}
                        onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                        placeholder="e.g. Asra &amp; Shahnawaz (#AsraShahnawaz2026)"
                        className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        Budget Per Unit (INR)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-surface-container-low text-on-surface text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      >
                        <option value="under-1000">₹600 - ₹1,000 per unit</option>
                        <option value="1000-2000">₹1,000 - ₹2,000 per unit</option>
                        <option value="2000-3500">₹2,000 - ₹3,500 per unit</option>
                        <option value="3500+">₹3,500+ Luxury Masterpiece</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        Contact Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 96926 68263"
                        className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="shahnawazalirkl@gmail.com"
                      className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm px-3 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                      Favor Selections / Monogram Notes
                    </label>
                    <textarea
                      ref={notesRef}
                      id="inquiryNotes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Specify preferred favor items, monogram theme, theme color palettes, or room hamper items..."
                      className={`w-full text-on-surface placeholder:text-outline text-body-sm font-body-sm p-3 rounded-lg border transition-all ${
                        notesPulse
                          ? 'bg-secondary-container/40 border-primary ring-2 ring-primary/40'
                          : 'bg-surface-container-low border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none'
                      }`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-inverse-surface hover:bg-primary text-inverse-on-surface font-label-md text-label-md tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Curated Bulk Proposal &amp; Samples</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: White-Glove Atelier Assurance */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              {/* Sample Box Card */}
              <div className="bg-surface-container-low p-6 sm:p-space-xl rounded-xl shadow-sm border border-outline-variant/40">
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center mb-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">mark_email_read</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-serif">
                  Complimentary Physical Sample Box
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                  We dispatch an unboxing curation box directly to your residence within 48 hours for verified orders above 50 units. Feel the heavy silk textures, smell the artisanal scents, and approve the 3D metal crest stamping in person before production starts.
                </p>
                <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_police</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
                    100% Satisfaction &amp; Color Match Guarantee
                  </span>
                </div>
              </div>

              {/* Immediate Stylist Advice WhatsApp Card */}
              <div className="bg-surface-container-lowest p-6 sm:p-space-xl rounded-xl shadow-sm border border-outline-variant/40">
                <h4 className="font-title-sm text-title-sm text-on-surface mb-2 font-semibold">
                  Need Immediate Stylist Advice?
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                  Direct line to our senior destination bridal concierge for urgent requirements and rush deliveries.
                </p>
                <a
                  href="https://wa.me/919692668263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-surface-container-high hover:bg-primary-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors border border-outline-variant/40"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">chat</span>
                  <span>Connect on WhatsApp Atelier</span>
                </a>
              </div>

              {/* Luxury Hamper Photo Highlight */}
              <div className="rounded-xl overflow-hidden shadow-sm bg-surface-container border border-outline-variant/40 relative">
                <img
                  className="w-full h-48 object-cover"
                  alt="Close up of exquisite gold foiled ASRA Wedding Canvas monogram emblem stamped in warm gold"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkauoht2wHdvnYajDQhY36np9SvqW9VYs0SiNnJaxfOD5ehyddslDFyUvIcIIFXXtZupxDe6NLEEGZEN8tDACVoNNYAuiNMXpI3f9Yx67SSVsthgD-n5upugtDleO3MhXzLifMdoAH1qE9nZxgefPJZZcxLOzrsxlucdoFjOZaPwWf7qxF63qJmwzhgH0E7IWUj1wJZJWmAraL8UpaYYBeyDbdb4QkFbihZjFYBNy5LuPCrOBDfWyeOA"
                />
                <div className="p-space-md bg-surface-container-lowest flex items-center justify-between">
                  <div>
                    <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                      Bespoke Die Craft
                    </p>
                    <p className="font-title-sm text-title-sm text-on-surface font-serif">
                      3D Metal Crest Embossing Included
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Destination Wedding Case Studies & Testimonials */}
      <section className="w-full px-4 sm:px-8 lg:px-margin py-space-xl bg-surface-container-low">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center text-center mb-space-xl">
            <span className="font-label-sm text-label-sm text-primary tracking-[0.25em] uppercase font-semibold">
              Real Celebrations
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface mt-space-xs font-serif">
              Destination Wedding Case Studies
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs leading-relaxed">
              Discover how ASRA Wedding Canvas crafted memory-making favor suites across India's most prestigious palatial destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {BULK_CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                className="bg-surface-container-lowest p-6 sm:p-space-xl rounded-xl shadow-sm border border-outline-variant/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md flex-wrap gap-2">
                    <span className="px-3 py-1 bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded uppercase tracking-wider font-semibold">
                      {study.locationTag}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      {study.unitsBadge}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-serif">
                    {study.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md leading-relaxed">
                    "{study.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-space-md border-t border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                    {study.initials}
                  </div>
                  <div>
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold">{study.couple}</p>
                    <p className="font-body-sm text-body-sm text-outline">{study.subInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Trust & Process Ribbons */}
      <section className="w-full px-4 sm:px-8 lg:px-margin py-space-xl bg-surface border-t border-outline-variant/20">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg text-center">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[32px] mb-2">fingerprint</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">100% Bespoke Craft</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                No prefabricated stock. Each suite is designed and personalized from scratch.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[32px] mb-2">flight_takeoff</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Insured Global Transit</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Safe air delivery to 140+ countries and domestic luxury wedding hubs.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[32px] mb-2">verified_user</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Wax-Sealed Signature</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Official ASRA hallmark verification and gold-embossed authentication.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[32px] mb-2">support_agent</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Dedicated Concierge</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
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
