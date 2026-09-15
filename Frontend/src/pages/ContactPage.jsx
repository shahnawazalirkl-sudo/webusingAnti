import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Send,
  Upload,
  Copy,
  Check,
  Printer,
  Compass
} from 'lucide-react';

const ContactPage = () => {
  // Form State
  const [formData, setFormData] = useState({
    experienceType: 'hyderabad', // 'hyderabad' | 'bengaluru' | 'virtual'
    fullName: '',
    partnerName: '',
    whatsappNumber: '',
    email: '',
    weddingDate: '',
    guestCount: '',
    preferredDate: '',
    timeSlot: '11:30 AM – Morning Session',
    collections: ['Sovereign Bridal Trunks', 'Optical Crystal Plaques'],
    bespokeNotes: '',
    attachedFileName: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Swatch Modal State
  const [isSwatchModalOpen, setIsSwatchModalOpen] = useState(false);
  const [swatchSubmitted, setSwatchSubmitted] = useState(false);
  const [swatchAddress, setSwatchAddress] = useState({ name: '', phone: '', address: '', pin: '' });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle Collections Checkbox
  const handleCurationToggle = (collection) => {
    setFormData((prev) => {
      const exists = prev.collections.includes(collection);
      if (exists) {
        return { ...prev, collections: prev.collections.filter((item) => item !== collection) };
      } else {
        return { ...prev, collections: [...prev.collections, collection] };
      }
    });
  };

  // Quick Select Salon
  const handleSelectSalon = (type) => {
    setFormData((prev) => ({ ...prev, experienceType: type }));
    const docket = document.getElementById('reservation-docket');
    if (docket) {
      docket.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Copy phone helper
  const handleCopyPhone = (number, key) => {
    navigator.clipboard.writeText(number);
    setCopiedPhone(key);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  // Validate and Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.whatsappNumber.trim()) errors.whatsappNumber = 'WhatsApp number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.preferredDate) errors.preferredDate = 'Please select a preferred date';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate booking API call
    setTimeout(() => {
      const refCode = `ASRA-COLLECTION-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingReference(refCode);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const getExperienceLabel = (type) => {
    switch (type) {
      case 'bengaluru':
        return 'Indiranagar Studio, Bengaluru (Laboratory)';
      case 'virtual':
        return 'Virtual 1-on-1 (Global Video Desk)';
      case 'hyderabad':
      default:
        return 'Jubilee Hills Salon, Hyderabad (Foundry & Guild)';
    }
  };

  // FAQ List
  const faqs = [
    {
      q: 'Do I need an appointment for a physical visit?',
      a: 'Our Jubilee Hills (Hyderabad) Foundry is strictly reserved for private 1-on-1 appointments to maintain the focus of our master craftsmen. The Indiranagar (Bengaluru) Studio warmly welcomes walk-ins during open hours, though pre-booked guests receive priority access to our dedicated bridal tasting suites.'
    },
    {
      q: 'Can we customize physical brass dies during the consultation?',
      a: 'Yes. During your appointment, our typographic heraldry team can sketch and vectorize custom family initials on the spot, allowing you to preview how your die will deboss into French velvet and aged teakwood.'
    },
    {
      q: 'How does the international virtual support consultation work?',
      a: 'We conduct live HD video walkthroughs where a Senior Bridal Stylist presents actual fabric folios under studio lighting. Following the call, photorealistic 3D renders and physical swatch folios can be dispatched worldwide via express courier.'
    },
    {
      q: 'What is the lead time for customized wedding orders?',
      a: 'Standard customized creations require 12–18 business days for casting, debossing, and assembly. For urgent ceremonies, our Collection Express Foundry can accommodate accelerated turnarounds in as little as 3 to 5 business days upon request.'
    },
    {
      q: 'Is there any consultation fee for tasting & design sessions?',
      a: 'Collection consultations, fabric swatch tastings, and heraldic initials sketching sessions are completely complimentary. Our priority is understanding your vision and curating an unforgettable heirloom suite.'
    }
  ];

  return (
    <div className="bg-asra-cream text-asra-charcoal selection:bg-asra-gold selection:text-white min-h-screen">
      
      {/* 1. Top Trust Strip */}
      <section className="bg-white border-b border-asra-border py-2.5 px-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]" data-purpose="trust-badges">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-asra-charcoal">
            <span className="text-base text-asra-gold">⚡</span>
            <span className="tracking-wider">Dispatch within 24–48 Hours</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-asra-charcoal">
            <span className="text-base text-asra-gold">✨</span>
            <span className="tracking-wider">100% Customized Engraved Gifts</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-asra-charcoal">
            <span className="text-base text-asra-gold">★</span>
            <span className="tracking-wider">4.9/5 Rating from 3,500+ Couples</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-asra-charcoal">
            <span className="text-base text-asra-gold">🎁</span>
            <span className="tracking-wider">Wax-Sealed Luxury Packaging</span>
          </div>
        </div>
      </section>

      {/* 2. Breadcrumbs Navigation */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 pb-2 text-[11px] uppercase tracking-widest text-asra-muted" data-purpose="breadcrumbs">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link to="/" className="hover:text-asra-gold transition-colors">Home</Link>
          </li>
          <li className="text-asra-gold/50">/</li>
          <li>
            <Link to="/about" className="hover:text-asra-gold transition-colors">Support &amp; Salons</Link>
          </li>
          <li className="text-asra-gold/50">/</li>
          <li className="text-asra-charcoal font-semibold">Contact &amp; Private Appointments</li>
        </ol>
      </nav>

      {/* 3. Hero Editorial Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-asra-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center max-w-4xl mx-auto mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-[0.35em] text-asra-gold uppercase px-4 py-1.5 border border-asra-gold/40 bg-asra-sand/30 rounded-full mb-4">
            PRIVATE BRIDAL SALONS &amp; COLLECTION SUPPORT
          </span>
          <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl text-asra-charcoal font-bold tracking-tight leading-[1.1] mb-5">
            Schedule a Private Tasting &amp; Customized Consultation
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-asra-gold to-transparent mx-auto mb-6"></div>
          <p className="font-serif italic text-lg sm:text-xl text-asra-muted leading-relaxed max-w-2xl mx-auto font-light">
            Step into our sanctuaries in Jubilee Hills &amp; Indiranagar, or connect directly with our Master Support worldwide to curate your wedding heirlooms, wedding essentials casing, and heraldic crests.
          </p>
        </div>

        {/* Direct Channels (3 Luxury Cards) */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: WhatsApp Support */}
            <div className="luxury-card bg-white p-8 border border-asra-border flex flex-col justify-between relative shadow-sm hover:border-asra-gold transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs text-asra-goldDark font-bold tracking-widest">DIRECT CHANNEL · I</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-bold uppercase rounded-sm">24/7 Global</span>
                </div>
                <h3 className="font-display text-xl font-bold text-asra-charcoal">Instant WhatsApp Support</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Dedicated bridal support on WhatsApp for instant digital proofs, live swatch photos &amp; immediate quote assistance. Active 24/7 across IST, GST, GMT &amp; EST.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-asra-border/60 space-y-2">
                <a
                  href="https://wa.me/919692668263?text=Hello%20ASRA%20Concierge,%20I%20would%20like%20to%20inquire%20about%20bespoke%20wedding%20keepsakes%20and%20private%20salon%20appointments."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-xs uppercase font-semibold tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                  </svg>
                  <span>Start WhatsApp Chat</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyPhone('+919692668263', 'wa')}
                  className="w-full text-[11px] text-gray-500 hover:text-asra-charcoal py-1 flex items-center justify-center gap-1 transition-colors"
                >
                  {copiedPhone === 'wa' ? (
                    <span className="text-emerald-700 flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3" /> Number Copied (+91 96926 68263)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Copy WhatsApp Number
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Card 2: Private Flagship Salons */}
            <div className="luxury-card bg-white p-8 border border-asra-border flex flex-col justify-between relative shadow-sm hover:border-asra-gold transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs text-asra-goldDark font-bold tracking-widest">DIRECT CHANNEL · II</span>
                  <span className="px-2 py-0.5 bg-asra-sand text-asra-charcoal border border-asra-border text-[9px] font-bold uppercase rounded-sm">Salons</span>
                </div>
                <h3 className="font-display text-xl font-bold text-asra-charcoal">Private Flagship Salons</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Hand-feel loomed French velvets, 24K gold foil stamp proofs, and live brass debossing vault viewings. Hyderabad &amp; Bengaluru studios.<br />
                  <span className="text-asra-goldDark font-medium mt-1 inline-block">Tuesday – Sunday, 11:00 AM – 7:30 PM</span>
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-asra-border/60">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('reservation-docket');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="inline-flex items-center justify-center w-full py-2.5 text-xs uppercase font-semibold tracking-wider border border-asra-charcoal text-asra-charcoal hover:bg-asra-charcoal hover:text-white transition-colors cursor-pointer"
                >
                  Select Collection Location
                </button>
              </div>
            </div>

            {/* Card 3: Royal Gifting Desk */}
            <div className="luxury-card bg-white p-8 border border-asra-border flex flex-col justify-between relative shadow-sm hover:border-asra-gold transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs text-asra-goldDark font-bold tracking-widest">DIRECT CHANNEL · III</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-asra-goldDark border border-asra-gold/30 text-[9px] font-bold uppercase rounded-sm">Customized VIP</span>
                </div>
                <h3 className="font-display text-xl font-bold text-asra-charcoal">Corporate &amp; Royal Gifting Desk</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Specialized desks for destination weddings (Udaipur, Lake Como, Bali), bulk gifts, VIP diplomatic registries, and non-disclosure custom suites.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-asra-border/60">
                <a
                  href="mailto:shahnawazalirkl@gmail.com?subject=Private%20Bridal%20Consultation%20Inquiry"
                  className="inline-flex items-center justify-center w-full py-2.5 text-xs uppercase font-semibold tracking-wider bg-asra-gold hover:bg-asra-goldDark text-white transition-colors"
                >
                  shahnawazalirkl@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Master Reservation Docket & Collection Showrooms */}
      <section className="py-16 lg:py-24 bg-white border-y border-asra-border" id="reservation-docket">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column (7 cols): The Reservation Form */}
            <div className="lg:col-span-7 bg-asra-ivory p-8 sm:p-10 border border-asra-gold/40 ornate-border relative shadow-lg">
              
              {!isSubmitted ? (
                <>
                  <div className="border-b border-asra-border pb-6 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-asra-goldDark block mb-1">
                      MASTER RESERVATION DOCKET
                    </span>
                    <h2 className="font-cormorant text-3xl sm:text-4xl text-asra-charcoal font-bold">
                      Reserve Your Private Collection Session
                    </h2>
                    <p className="text-xs text-asra-muted mt-2 font-light">
                      Choose your preferred sensory tasting salon or international digital support review.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    
                    {/* 1. Experience Type Selection */}
                    <div>
                      <label className="block font-cinzel text-xs tracking-wider uppercase font-bold text-asra-charcoal mb-3">
                        1. Select Experience Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label
                          className={`p-3.5 flex flex-col cursor-pointer text-center transition-all border ${
                            formData.experienceType === 'hyderabad'
                              ? 'border-asra-gold bg-asra-sand/30 ring-1 ring-asra-gold'
                              : 'border-asra-border bg-white hover:border-asra-gold/60'
                          }`}
                        >
                          <input
                            type="radio"
                            name="experienceType"
                            value="hyderabad"
                            checked={formData.experienceType === 'hyderabad'}
                            onChange={handleInputChange}
                            className="text-asra-gold focus:ring-asra-gold mx-auto mb-2"
                          />
                          <span className="text-xs font-semibold text-asra-charcoal leading-tight">Hyderabad Salon</span>
                          <span className="text-[10px] text-asra-muted mt-1 font-light">Jubilee Hills Foundry</span>
                        </label>

                        <label
                          className={`p-3.5 flex flex-col cursor-pointer text-center transition-all border ${
                            formData.experienceType === 'bengaluru'
                              ? 'border-asra-gold bg-asra-sand/30 ring-1 ring-asra-gold'
                              : 'border-asra-border bg-white hover:border-asra-gold/60'
                          }`}
                        >
                          <input
                            type="radio"
                            name="experienceType"
                            value="bengaluru"
                            checked={formData.experienceType === 'bengaluru'}
                            onChange={handleInputChange}
                            className="text-asra-gold focus:ring-asra-gold mx-auto mb-2"
                          />
                          <span className="text-xs font-semibold text-asra-charcoal leading-tight">Bengaluru Studio</span>
                          <span className="text-[10px] text-asra-muted mt-1 font-light">Indiranagar Laboratory</span>
                        </label>

                        <label
                          className={`p-3.5 flex flex-col cursor-pointer text-center transition-all border ${
                            formData.experienceType === 'virtual'
                              ? 'border-asra-gold bg-asra-sand/30 ring-1 ring-asra-gold'
                              : 'border-asra-border bg-white hover:border-asra-gold/60'
                          }`}
                        >
                          <input
                            type="radio"
                            name="experienceType"
                            value="virtual"
                            checked={formData.experienceType === 'virtual'}
                            onChange={handleInputChange}
                            className="text-asra-gold focus:ring-asra-gold mx-auto mb-2"
                          />
                          <span className="text-xs font-semibold text-asra-charcoal leading-tight">Virtual 1-on-1</span>
                          <span className="text-[10px] text-asra-muted mt-1 font-light">Global Video Desk</span>
                        </label>
                      </div>
                    </div>

                    {/* 2. Names */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full bg-white border text-xs px-3.5 py-2.5 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light ${
                            formErrors.fullName ? 'border-red-400 bg-red-50/20' : 'border-asra-border'
                          }`}
                          placeholder="Asra Ansari"
                        />
                        {formErrors.fullName && (
                          <p className="text-[10px] text-red-600 mt-1">{formErrors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                          Partner's Name / Wedding Title
                        </label>
                        <input
                          type="text"
                          name="partnerName"
                          value={formData.partnerName}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-asra-border text-xs px-3.5 py-2.5 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light"
                          placeholder="Asra &amp; Shahnawaz 2026"
                        />
                      </div>
                    </div>

                    {/* 3. Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="whatsappNumber"
                          value={formData.whatsappNumber}
                          onChange={handleInputChange}
                          className={`w-full bg-white border text-xs px-3.5 py-2.5 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light ${
                            formErrors.whatsappNumber ? 'border-red-400 bg-red-50/20' : 'border-asra-border'
                          }`}
                          placeholder="+91 96926 68263"
                        />
                        {formErrors.whatsappNumber && (
                          <p className="text-[10px] text-red-600 mt-1">{formErrors.whatsappNumber}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full bg-white border text-xs px-3.5 py-2.5 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light ${
                            formErrors.email ? 'border-red-400 bg-red-50/20' : 'border-asra-border'
                          }`}
                          placeholder="shahnawazalirkl@gmail.com"
                        />
                        {formErrors.email && (
                          <p className="text-[10px] text-red-600 mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* 4. Dates & Estimates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                          Wedding / Milestone Date
                        </label>
                        <input
                          type="date"
                          name="weddingDate"
                          value={formData.weddingDate}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-asra-border text-xs px-3.5 py-2.5 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                          Estimated Guest / Favor Count
                        </label>
                        <input
                          type="text"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-asra-border text-xs px-3.5 py-2.5 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light"
                          placeholder="e.g. 250 gifts"
                        />
                      </div>
                    </div>

                    {/* 5. Appointment Timing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                          Preferred Appointment Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={handleInputChange}
                          className={`w-full bg-white border text-xs px-3.5 py-2.5 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light text-gray-700 ${
                            formErrors.preferredDate ? 'border-red-400 bg-red-50/20' : 'border-asra-border'
                          }`}
                        />
                        {formErrors.preferredDate && (
                          <p className="text-[10px] text-red-600 mt-1">{formErrors.preferredDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                          Preferred Time Slot
                        </label>
                        <select
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-asra-border text-xs px-3.5 py-2.5 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light text-gray-700"
                        >
                          <option>11:30 AM – Morning Session</option>
                          <option>02:00 PM – Afternoon Tasting</option>
                          <option>04:30 PM – Sunset Session</option>
                          <option>06:00 PM – Evening Salon</option>
                        </select>
                      </div>
                    </div>

                    {/* 6. Collections of Interest */}
                    <div>
                      <label className="block font-cinzel text-xs tracking-wider uppercase font-bold text-asra-charcoal mb-2">
                        Specific Collections of Interest
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                        {[
                          'Sovereign Bridal Trunks',
                          'Optical Crystal Plaques',
                          'Debossed Leather Gifts',
                          'Wax-Sealed Favors',
                          'Custom Crest Initials Die Casting'
                        ].map((item, idx) => (
                          <label
                            key={item}
                            className={`flex items-center gap-2 p-2.5 border transition-all cursor-pointer select-none ${
                              idx === 4 ? 'sm:col-span-2' : ''
                            } ${
                              formData.collections.includes(item)
                                ? 'border-asra-gold bg-asra-sand/20'
                                : 'border-asra-border bg-white hover:border-asra-gold/50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.collections.includes(item)}
                              onChange={() => handleCurationToggle(item)}
                              className="rounded border-asra-border text-asra-gold focus:ring-asra-gold"
                            />
                            <span className="font-light">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* 7. Customized Notes / Initials Concept */}
                    <div>
                      <label className="block text-xs font-medium text-asra-charcoal uppercase tracking-wider mb-1">
                        Customized Notes / Initials Concept Upload
                      </label>
                      <textarea
                        rows="3"
                        name="bespokeNotes"
                        value={formData.bespokeNotes}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-asra-border text-xs p-3 focus:outline-none focus:border-asra-gold focus:ring-1 focus:ring-asra-gold font-light"
                        placeholder="Share any family crest references, color palette inspirations, or destination nuances..."
                      ></textarea>
                      
                      {/* Optional File Attachment Simulator */}
                      <div className="mt-2 flex items-center justify-between text-[11px] text-asra-muted border border-dashed border-asra-border p-2 bg-white/60 rounded">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-asra-gold transition-colors">
                          <Upload className="w-3.5 h-3.5 text-asra-gold" />
                          <span>{formData.attachedFileName ? formData.attachedFileName : 'Attach Moodboard / Initials Vector (PDF, JPG, PNG)'}</span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFormData((prev) => ({ ...prev, attachedFileName: e.target.files[0].name }));
                              }
                            }}
                          />
                        </label>
                        {formData.attachedFileName && (
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, attachedFileName: '' }))}
                            className="text-red-500 hover:text-red-700 text-[10px] font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold uppercase tracking-[0.25em] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Reserving Collection Docket...</span>
                        </>
                      ) : (
                        <span>Confirm Appointment Request</span>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-asra-muted uppercase tracking-wider">
                      <span className="text-asra-gold">✦</span>
                      <span>No consultation fee. Confirmed within 2 hours by dedicated bridal lead stylist.</span>
                    </div>

                  </form>
                </>
              ) : (
                /* Success Docket State */
                <div className="space-y-6 text-center py-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto text-2xl shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-asra-gold font-bold block mb-1">
                      COLLECTION RESERVATION CONFIRMED
                    </span>
                    <h2 className="font-cormorant text-3xl font-bold text-asra-charcoal">
                      We Await Your Presence
                    </h2>
                    <div className="w-16 h-[1px] bg-asra-gold mx-auto my-3"></div>
                    <p className="font-serif italic text-sm text-asra-muted max-w-md mx-auto">
                      Dear {formData.fullName || 'Patron'}, your appointment request has been etched into our master collection docket.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-white border border-asra-border p-6 text-left max-w-md mx-auto space-y-3 shadow-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-asra-border text-xs">
                      <span className="text-asra-muted">Docket Reference:</span>
                      <span className="font-mono font-bold text-asra-goldDark">{bookingReference}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-asra-border text-xs">
                      <span className="text-asra-muted">Experience / Venue:</span>
                      <span className="font-semibold text-asra-charcoal text-right text-[11px]">
                        {getExperienceLabel(formData.experienceType)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-asra-border text-xs">
                      <span className="text-asra-muted">Date &amp; Slot:</span>
                      <span className="font-medium text-asra-charcoal">
                        {formData.preferredDate} ({formData.timeSlot.split('–')[0]})
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-asra-muted">Lead Stylist Dispatch:</span>
                      <span className="text-emerald-700 font-medium">Within 2 Hours via WhatsApp</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                    <a
                      href={`https://wa.me/919692668263?text=Hello%20ASRA%20Concierge,%20I%20have%20submitted%20my%20appointment%20request%20under%20Docket%20${bookingReference}%20for%20${formData.preferredDate}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Ping on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full sm:w-auto px-4 py-2.5 border border-asra-charcoal text-asra-charcoal hover:bg-asra-charcoal hover:text-white text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Docket</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData((prev) => ({
                          ...prev,
                          fullName: '',
                          partnerName: '',
                          preferredDate: '',
                          bespokeNotes: ''
                        }));
                      }}
                      className="w-full sm:w-auto text-xs text-asra-gold hover:underline py-2"
                    >
                      Book Another
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Right Column (5 cols): Collection Locations & Protocol */}
            <div className="lg:col-span-5 space-y-8" id="salons">
              
              {/* Jubilee Hills Card */}
              <div className="bg-asra-sand/20 border border-asra-gold/30 p-8 relative shadow-sm hover:border-asra-gold transition-colors">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-asra-goldDark font-semibold mb-2">
                  <span>FOUNDRY &amp; GUILD</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-asra-goldDark border border-asra-gold/30 text-[9px] font-bold">
                    Open Today · By Prior Appointment
                  </span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-asra-charcoal mb-2">Jubilee Hills Salon</h3>
                <p className="text-xs text-asra-muted mb-4 font-light leading-relaxed">
                  Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                </p>
                <div className="space-y-2 text-xs text-gray-700 py-3 border-y border-asra-border/70 font-light">
                  <div className="flex items-center justify-between">
                    <span>Direct Collection Phone:</span>
                    <a href="tel:+919692668263" className="font-medium text-asra-charcoal hover:text-asra-gold transition-colors">
                      +91 96926 68263
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Private Email:</span>
                    <a href="mailto:shahnawazalirkl@gmail.com" className="font-medium text-asra-charcoal hover:text-asra-gold transition-colors">
                      shahnawazalirkl@gmail.com
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-3 italic">
                  Live brass engraving vault, private velvet swatch room, valet parking available.
                </p>
                
                <div className="mt-4 pt-3 flex items-center gap-3">
                  <a
                    href="https://maps.google.com/?q=Jubilee+Hills+Road+36+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-asra-gold hover:text-asra-goldDark transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                  <span className="text-asra-border">•</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSalon('hyderabad')}
                    className="text-xs font-semibold text-asra-charcoal hover:text-asra-gold transition-colors"
                  >
                    Select in Docket
                  </button>
                </div>
              </div>

              {/* Indiranagar Studio Card */}
              <div className="bg-asra-sand/20 border border-asra-gold/30 p-8 relative shadow-sm hover:border-asra-gold transition-colors">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-asra-goldDark font-semibold mb-2">
                  <span>DESIGN LABORATORY</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-bold">
                    Open Today · Walk-ins Welcome
                  </span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-asra-charcoal mb-2">Indiranagar Studio</h3>
                <p className="text-xs text-asra-muted mb-4 font-light leading-relaxed">
                  12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
                </p>
                <div className="space-y-2 text-xs text-gray-700 py-3 border-y border-asra-border/70 font-light">
                  <div className="flex items-center justify-between">
                    <span>Direct Collection Phone:</span>
                    <a href="tel:+919692668263" className="font-medium text-asra-charcoal hover:text-asra-gold transition-colors">
                      +91 96926 68263
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Private Email:</span>
                    <a href="mailto:shahnawazalirkl@gmail.com" className="font-medium text-asra-charcoal hover:text-asra-gold transition-colors">
                      shahnawazalirkl@gmail.com
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-3 italic">
                  Contemporary acrylic gallery, bridal wedding essentials styling suites, walk-ins accommodated.
                </p>

                <div className="mt-4 pt-3 flex items-center gap-3">
                  <a
                    href="https://maps.google.com/?q=12th+Main+Road+Indiranagar+Bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-asra-gold hover:text-asra-goldDark transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                  <span className="text-asra-border">•</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSalon('bengaluru')}
                    className="text-xs font-semibold text-asra-charcoal hover:text-asra-gold transition-colors"
                  >
                    Select in Docket
                  </button>
                </div>
              </div>

              {/* Private Hospitality Protocol */}
              <div className="bg-asra-ivory border border-asra-border p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-asra-sand flex items-center justify-center text-asra-gold text-lg shrink-0 border border-asra-gold/30">
                  🥂
                </div>
                <div>
                  <h4 className="font-cinzel text-xs uppercase tracking-widest text-asra-charcoal font-bold">
                    Private Hospitality Protocol
                  </h4>
                  <p className="text-xs text-asra-muted mt-1 font-light leading-relaxed">
                    Complimentary iced champagne &amp; artisan dark chocolate tasting served throughout your one-on-one design appointment.
                  </p>
                </div>
              </div>

              {/* Swatch Sample Dispatch Box */}
              <div className="bg-white border border-dashed border-asra-gold/50 p-6 shadow-sm rounded">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📫</span>
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-xs uppercase tracking-wider text-asra-charcoal font-bold">
                      Can't Visit in Person?
                    </h4>
                    <p className="text-xs text-asra-muted leading-relaxed font-light">
                      Request an official Velvet &amp; Metallic Foil Swatch Folio delivered express to your doorstep before placing your wedding essentials commission.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSwatchModalOpen(true)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-asra-gold hover:text-asra-goldDark transition-colors pt-2 uppercase tracking-wider"
                    >
                      <span>Request Swatch Folio Box</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ Section (Collection Visiting Protocol) */}
      <section className="py-16 bg-asra-cream/80 border-b border-asra-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-asra-gold uppercase block mb-2">
              COLLECTION VISITING PROTOCOL
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl text-asra-charcoal font-bold">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-0.5 bg-asra-gold mx-auto mt-4"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-asra-border shadow-sm transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-asra-charcoal">
                      {faq.q}
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-asra-gold shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-xs text-gray-600 font-light leading-relaxed border-t border-asra-border/40 mt-1 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Swatch Request Modal */}
      {isSwatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-asra-ivory border border-asra-gold max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              type="button"
              onClick={() => {
                setIsSwatchModalOpen(false);
                setSwatchSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-asra-charcoal text-sm"
            >
              ✕
            </button>

            {!swatchSubmitted ? (
              <>
                <span className="text-[10px] uppercase tracking-[0.25em] text-asra-goldDark font-bold block mb-1">
                  EXPRESS DISPATCH
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-asra-charcoal mb-2">
                  Request Physical Swatch Folio
                </h3>
                <p className="text-xs text-asra-muted font-light mb-5">
                  Receive actual French velvet swatches, genuine Italian leather cuts, and stamped 24K gold foil samples via courier.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!swatchAddress.name || !swatchAddress.phone || !swatchAddress.address) return;
                    setSwatchSubmitted(true);
                  }}
                >
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-asra-charcoal mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={swatchAddress.name}
                      onChange={(e) => setSwatchAddress({ ...swatchAddress, name: e.target.value })}
                      placeholder="Asra Ansari"
                      className="w-full bg-white border border-asra-border text-xs px-3 py-2 focus:outline-none focus:border-asra-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-asra-charcoal mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={swatchAddress.phone}
                      onChange={(e) => setSwatchAddress({ ...swatchAddress, phone: e.target.value })}
                      placeholder="+91 96926 68263"
                      className="w-full bg-white border border-asra-border text-xs px-3 py-2 focus:outline-none focus:border-asra-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-asra-charcoal mb-1">
                      Delivery Address &amp; Pincode *
                    </label>
                    <textarea
                      required
                      rows="3"
                      value={swatchAddress.address}
                      onChange={(e) => setSwatchAddress({ ...swatchAddress, address: e.target.value })}
                      placeholder="Street, Landmark, City, State, Pincode"
                      className="w-full bg-white border border-asra-border text-xs p-3 focus:outline-none focus:border-asra-gold"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
                  >
                    Dispatch Complimentary Swatches
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">
                    Complimentary for prospective couples with upcoming celebrations.
                  </p>
                </form>
              </>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-asra-charcoal">
                  Swatch Folio Dispatched
                </h3>
                <p className="text-xs text-asra-muted">
                  Your luxury tactile preview kit is queued for dispatch to {swatchAddress.name}. Tracking telemetry will arrive via SMS shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSwatchModalOpen(false);
                    setSwatchSubmitted(false);
                  }}
                  className="px-6 py-2 bg-asra-charcoal text-white text-xs uppercase tracking-wider mt-4"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ContactPage;
