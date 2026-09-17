import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState('Jubilee Hills Collection (Hyderabad)');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    notes: ''
  });

  const handleOpenModal = (salonName) => {
    if (salonName) {
      setSelectedSalon(salonName);
    }
    setBookingSubmitted(false);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setIsModalOpen(false);
        setBookingSubmitted(false);
        setFormData({ name: '', phone: '', email: '', eventDate: '', notes: '' });
      }, 2500);
    }, 400);
  };

  return (
    <div className="bg-asra-cream text-asra-charcoal selection:bg-asra-gold selection:text-white min-h-screen">
      

      {/* 3. Hero Editorial Section */}
      <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden" data-purpose="classic-hero">
        {/* Subtle Decorative Background Watermark */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-[600px] select-none">
          <img
            alt="Emblem Watermark"
            className="w-full h-auto"
            src="/assets/cdn/img_875b0894aaaa.png"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Editorial Header Meta */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="inline-block text-[10px] font-semibold tracking-[0.3em] text-asra-gold uppercase px-3.5 py-1 border border-asra-gold/40 bg-asra-sand/40 rounded-full mb-3">
              Maison de Mariage • Fondée en 2021
            </span>
            <h1 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] text-asra-charcoal font-bold tracking-tight leading-[1.15] mb-3">
              Where Royal Gift Artistry Meets Life's Most Cherished Celebrations
            </h1>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-asra-gold to-transparent mx-auto mb-3"></div>
            <p className="font-serif italic text-sm sm:text-base text-asra-muted leading-relaxed max-w-2xl mx-auto font-light">
              Born in the historic artisan enclaves of Hyderabad and Bengaluru, ASRA Wedding Canvas revives the timeless traditions of royal wedding essentials casing, heavy brass intaglio debossing, and 24-karat gold leaf detailing for modern milestone ceremonies.
            </p>
          </div>

          {/* Two-Column Editorial Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Collection Narrative & Pull Quote */}
            <article className="lg:col-span-7 space-y-4">
              <div className="border-l-2 border-asra-gold pl-4 py-1">
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-asra-goldDark block mb-0.5">
                  The Genesis Narrative
                </span>
                <h2 className="font-display text-xl sm:text-2xl text-asra-charcoal font-bold leading-snug">
                  Turning fleeting digital moments into generational physical heirlooms.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                In an era dominated by transient digital files and fleeting cloud galleries, ASRA Wedding Canvas was established with a singular devotion: restoring the weight, texture, and sacred dignity of marriage milestones. Our journey began within traditional South Asian metalcraft workshops and classic bookbinderies, hand-tooling bridal gifts for discerning families across the globe.
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                Every creation leaving our salon is treated as a museum artifact. We do not mass-produce; each piece requires hours of meticulous hand-assembly, 24K gold foil stamping, bevel-cut museum mats, and precision brass insignia engraving.
              </p>

              {/* Pull Quote Box */}
              <blockquote className="bg-asra-ivory p-4 sm:p-5 border border-asra-border relative shadow-sm mt-4">
                <span className="text-4xl font-serif text-asra-gold/30 absolute top-1 left-3 leading-none select-none">“</span>
                <p className="font-serif text-sm sm:text-base text-asra-charcoal italic leading-snug relative z-10 pl-3">
                  Every union is an heirloom narrative waiting to be immortalized in gold, silk, and teakwood. We craft not merely for the wedding day, but for the anniversaries a half-century away.
                </p>
                <div className="mt-3 pl-3 pt-2.5 border-t border-asra-border/60 flex items-center justify-between">
                  <div>
                    <p className="font-display text-[11px] font-bold uppercase tracking-widest text-asra-charcoal">The Master Guild of ASRA</p>
                    <p className="text-[10px] text-asra-goldDark tracking-wider">Collection de Haute Gravure</p>
                  </div>
                  <div className="w-7 h-7 rounded-full border border-asra-gold/50 flex items-center justify-center text-[9px] text-asra-gold font-serif">
                    ⚜
                  </div>
                </div>
              </blockquote>
            </article>

            {/* Right Column: Framed Master Crest Emblem with Guild Certificate Seal */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full p-3 sm:p-4 bg-white border border-asra-gold/40 shadow-lg ornate-border">
                {/* Corner Ornaments */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-asra-gold"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-asra-gold"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-asra-gold"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-asra-gold"></div>

                {/* Inner Mat Frame */}
                <div className="bg-asra-sand/20 border border-asra-border p-5 sm:p-6 flex flex-col items-center text-center relative">
                  {/* Velvet Ribbon Tag */}
                  <div className="absolute -top-3.5 bg-asra-goldDark text-white text-[8px] uppercase tracking-[0.25em] px-3 py-0.5 font-semibold shadow-md">
                    Official Guild Emblem
                  </div>

                  {/* Gold Crest Initials Image */}
                  <div className="my-2 transform transition-transform hover:scale-105 duration-500">
                    <img
                      alt="ASRA Wedding Canvas Master Initials Crest"
                      className="w-48 sm:w-52 h-auto max-h-[190px] mx-auto object-contain filter drop-shadow-md"
                      src="/assets/cdn/img_863a6bfc47db.png"
                    />
                  </div>

                  <div className="border-t border-asra-border w-full pt-3 mt-1">
                    <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-asra-charcoal">
                      Seal of Provenance
                    </h3>
                    <p className="text-[10px] text-asra-muted font-light mt-0.5">
                      Certified Master Jewel Inlay &amp; 24K Leaf Standard
                    </p>

                    {/* Certificate Badge */}
                    <div className="mt-3 inline-flex items-center gap-1.5 bg-asra-sand/60 px-2.5 py-1 border border-asra-gold/30 rounded-sm">
                      <svg className="w-3 h-3 text-asra-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          clipRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-[9px] tracking-wider uppercase font-semibold text-asra-charcoal">
                        Registered Archive No. 892-HYD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Craft Pillars Section */}
      <section className="py-8 sm:py-10 bg-white border-y border-asra-border" data-purpose="craft-pillars">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-asra-gold uppercase block mb-1.5">
              The Four Cornerstones
            </span>
            <h2 className="font-cormorant text-2xl sm:text-3xl text-asra-charcoal font-bold tracking-tight">
              The Collection Craft Pillars
            </h2>
            <div className="w-12 h-0.5 bg-asra-gold mx-auto mt-2.5"></div>
            <p className="text-xs sm:text-sm text-asra-muted mt-3 font-light">
              Every bridal canvas, wedding essentials trunk, and anniversary gift suite is shaped around four uncompromised collection standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar I */}
            <div className="luxury-card bg-asra-ivory p-5 sm:p-6 border border-asra-border relative flex flex-col justify-between">
              <div>
                <div className="font-cinzel text-[10px] text-asra-gold font-bold tracking-widest mb-2.5">PILLAR I</div>
                <div className="w-10 h-10 mb-4 rounded-full bg-asra-sand/60 flex items-center justify-center border border-asra-gold/30">
                  <svg className="w-5 h-5 text-asra-goldDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"></path>
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-asra-charcoal mb-2">Sovereign Calligraphy &amp; Crests</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Hand-drawn customized initials, heraldic marital insignias, and custom CNC brass stamping dies drafted specifically for your family ancestry.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-asra-border/60 text-[9px] uppercase tracking-wider text-asra-goldDark font-semibold">
                Customized Heraldry Guild
              </div>
            </div>

            {/* Pillar II */}
            <div className="luxury-card bg-asra-ivory p-5 sm:p-6 border border-asra-border relative flex flex-col justify-between">
              <div>
                <div className="font-cinzel text-[10px] text-asra-gold font-bold tracking-widest mb-2.5">PILLAR II</div>
                <div className="w-10 h-10 mb-4 rounded-full bg-asra-sand/60 flex items-center justify-center border border-asra-gold/30">
                  <svg className="w-5 h-5 text-asra-goldDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"></path>
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-asra-charcoal mb-2">Noble Materials &amp; Provenance</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Full-grain Tuscan vegetable-tanned leathers, Lyon French silk velvet, solid reclaimed teakwood bases, and museum-grade optical crystal acrylics.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-asra-border/60 text-[9px] uppercase tracking-wider text-asra-goldDark font-semibold">
                100% Certified Origins
              </div>
            </div>

            {/* Pillar III */}
            <div className="luxury-card bg-asra-ivory p-5 sm:p-6 border border-asra-border relative flex flex-col justify-between">
              <div>
                <div className="font-cinzel text-[10px] text-asra-gold font-bold tracking-widest mb-2.5">PILLAR III</div>
                <div className="w-10 h-10 mb-4 rounded-full bg-asra-sand/60 flex items-center justify-center border border-asra-gold/30">
                  <svg className="w-5 h-5 text-asra-goldDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"></path>
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-asra-charcoal mb-2">1-on-1 Bridal Support</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Dedicated customized stylists, complimentary photorealistic 3D proofing within 6 hours, and zero mass warehousing. Every gift is born on demand.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-asra-border/60 text-[9px] uppercase tracking-wider text-asra-goldDark font-semibold">
                Personalized Collection Lead
              </div>
            </div>

            {/* Pillar IV */}
            <div className="luxury-card bg-asra-ivory p-5 sm:p-6 border border-asra-border relative flex flex-col justify-between">
              <div>
                <div className="font-cinzel text-[10px] text-asra-gold font-bold tracking-widest mb-2.5">PILLAR IV</div>
                <div className="w-10 h-10 mb-4 rounded-full bg-asra-sand/60 flex items-center justify-center border border-asra-gold/30">
                  <svg className="w-5 h-5 text-asra-goldDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"></path>
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-asra-charcoal mb-2">White-Glove Global Handover</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Fully insured, shock-cushioned and climate-stabilized transit across 40+ countries. Direct suite &amp; ballroom delivery for royal destination weddings.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-asra-border/60 text-[9px] uppercase tracking-wider text-asra-goldDark font-semibold">
                Global Palace Courier
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customized Gift Suite Showcase */}
      <section className="py-8 sm:py-10 lg:py-12 bg-asra-sand/30" data-purpose="gift-suite-showcase">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Image Feature with Luxury Mat Frame */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative bg-white p-3 shadow-xl border border-asra-border max-w-md mx-auto lg:max-w-none">
                <div className="overflow-hidden relative group max-h-[300px]">
                  <img
                    alt="ASRA Signature Bridal Bloom Hamper and Customized Gift Vault"
                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
                    src="/assets/cdn/img_8222cd4f9dd5.png"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-serif italic tracking-wide">
                      Featured: The ASRA Grand Registry Hamper Suite in Silk Blush &amp; Champagne Gold.
                    </span>
                  </div>
                </div>
                {/* Caption Card */}
                <div className="p-3 bg-asra-ivory border-t border-asra-border text-center">
                  <p className="font-serif italic text-xs text-asra-charcoal font-medium">
                    "The Signature Bridal Bloom &amp; Gift Vault — Hand-assembled with Ecuadorian blush roses, 24K gold foil debossed registry cylinders, and Parisian ribboning."
                  </p>
                  <div className="mt-1.5 flex items-center justify-center gap-2 text-[9px] tracking-widest uppercase text-asra-goldDark font-semibold">
                    <span>Fresh Flora Selection</span>
                    <span>•</span>
                    <span>Handmade Soy Candle</span>
                    <span>•</span>
                    <span>Sealed Gift Cylinder</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Collection Small-Batch Storytelling */}
            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <div className="inline-block border border-asra-gold/50 px-2.5 py-0.5 bg-white text-[9px] uppercase tracking-[0.25em] font-semibold text-asra-goldDark">
                The Guild Discipline
              </div>
              <h2 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-asra-charcoal font-bold leading-tight">
                Crafted in Rare Small Batches With Uncompromising Precision
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                Unlike industrial production houses, the ASRA Collection caps each day’s production run. This allows our craftmasters to preserve the centuries-old art of manual bookbinding, hot foil leaf fusion, and customized scented wax casting.
              </p>

              {/* 5 Master Techniques Checklist */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-asra-gold/20 flex items-center justify-center text-asra-goldDark text-[10px] font-bold mt-0.5 shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-display text-[11px] font-bold uppercase tracking-wider text-asra-charcoal">
                      Hand-Turned Wooden Registry Cases
                    </h4>
                    <p className="text-[11px] text-asra-muted font-light">
                      Sourced from sustainably reclaimed rosewood and aged teak, hand-rubbed with natural organic waxes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-asra-gold/20 flex items-center justify-center text-asra-goldDark text-[10px] font-bold mt-0.5 shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-display text-[11px] font-bold uppercase tracking-wider text-asra-charcoal">
                      Sub-Millimeter Optical Laser Micro-Etching
                    </h4>
                    <p className="text-[11px] text-asra-muted font-light">
                      Vows, wedding dates, and custom venue architecture rendered in high-definition crystal acrylic.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-asra-gold/20 flex items-center justify-center text-asra-goldDark text-[10px] font-bold mt-0.5 shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-display text-[11px] font-bold uppercase tracking-wider text-asra-charcoal">
                      Botanical Hand-Cast Sealing Wax
                    </h4>
                    <p className="text-[11px] text-asra-muted font-light">
                      Blended with real dried gold mica flakes and stamped with your personalized couple initials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-asra-gold/20 flex items-center justify-center text-asra-goldDark text-[10px] font-bold mt-0.5 shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-display text-[11px] font-bold uppercase tracking-wider text-asra-charcoal">
                      Zari &amp; Lyon Silk Thread Ribboning
                    </h4>
                    <p className="text-[11px] text-asra-muted font-light">
                      Loomed silk ribbons designed to never fray, framing gift boxes with tactile royalty.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-asra-gold/20 flex items-center justify-center text-asra-goldDark text-[10px] font-bold mt-0.5 shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-display text-[11px] font-bold uppercase tracking-wider text-asra-charcoal">
                      Permanent Initials Die Preservation
                    </h4>
                    <p className="text-[11px] text-asra-muted font-light">
                      Your CNC-milled brass initials matrix is vaulted for your future milestone anniversaries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-asra-charcoal hover:text-asra-gold border-b border-asra-charcoal hover:border-asra-gold pb-0.5 transition-all"
                >
                  <span>Explore The Gift Collection Catalog</span>
                  <span className="text-asra-gold">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Master Craft Milestones Bar */}
      <section className="bg-asra-charcoal text-white py-8 sm:py-10 border-y border-asra-gold/30" data-purpose="master-craft-milestones">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-asra-gold/20">
            <div className="p-2 sm:p-3">
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-asra-goldLight mb-0.5">3,500+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium">Customized Heirlooms Crafted</div>
              <div className="text-[9px] text-gray-400 mt-0.5 font-light">Cherished across 14 countries</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-asra-goldLight mb-0.5">100%</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium">Vault Made-To-Order</div>
              <div className="text-[9px] text-gray-400 mt-0.5 font-light">Zero generic mass-inventory</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-asra-goldLight mb-0.5">40+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium">Palace &amp; Destination Weddings</div>
              <div className="text-[9px] text-gray-400 mt-0.5 font-light">Udaipur, Como, Bali &amp; Dubai</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-asra-goldLight mb-0.5">
                4.98<span className="text-xl text-asra-gold">/5</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium">Connoisseur Rating</div>
              <div className="text-[9px] text-gray-400 mt-0.5 font-light">Verified couple testimonials</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Flagship Studios & Private Salons */}
      <section className="py-8 sm:py-10 lg:py-12 bg-white" data-purpose="flagship-studios" id="salons">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-asra-gold uppercase block mb-1.5">
              Private Viewing &amp; Swatch Tastings
            </span>
            <h2 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-asra-charcoal font-bold tracking-tight">
              Our Private Salons &amp; Flagship Studios
            </h2>
            <div className="w-12 h-0.5 bg-asra-gold mx-auto mt-2.5"></div>
            <p className="text-xs sm:text-sm text-asra-muted mt-2.5 font-light">
              Experience our material archives in person. Feel hand-loomed velvets, touch engraved brass dies, and review personalized typographic layouts with our creative directors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Studio 1: Hyderabad */}
            <div className="bg-asra-ivory border border-asra-border p-5 sm:p-6 flex flex-col justify-between shadow-sm relative group hover:border-asra-gold transition-colors">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-asra-goldDark font-semibold mb-2">
                  <span>Collection No. 01</span>
                  <span className="px-1.5 py-0.5 bg-asra-gold/10 border border-asra-gold/30 text-[8px]">Foundry &amp; Guild</span>
                </div>
                <h3 className="font-cinzel text-lg font-bold text-asra-charcoal mb-1.5">Jubilee Hills Collection</h3>
                <p className="text-xs text-asra-muted mb-3 font-light">Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
                <div className="space-y-1.5 text-xs text-gray-700 py-3 border-y border-asra-border font-light">
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Live Brass Debossing Foundry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Customized Wax Initials Archive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Strictly by Private Appointment Only</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenModal('Jubilee Hills Collection (Hyderabad)')}
                  className="inline-flex items-center justify-center w-full py-2 text-xs uppercase font-semibold tracking-wider border border-asra-charcoal text-asra-charcoal hover:bg-asra-charcoal hover:text-white transition-colors cursor-pointer"
                >
                  Reserve Jubilee Hills Salon
                </button>
              </div>
            </div>

            {/* Studio 2: Bengaluru */}
            <div className="bg-asra-ivory border border-asra-border p-5 sm:p-6 flex flex-col justify-between shadow-sm relative group hover:border-asra-gold transition-colors">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-asra-goldDark font-semibold mb-2">
                  <span>Collection No. 02</span>
                  <span className="px-1.5 py-0.5 bg-asra-gold/10 border border-asra-gold/30 text-[8px]">Design Laboratory</span>
                </div>
                <h3 className="font-cinzel text-lg font-bold text-asra-charcoal mb-1.5">Indiranagar Studio</h3>
                <p className="text-xs text-asra-muted mb-3 font-light">12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038</p>
                <div className="space-y-1.5 text-xs text-gray-700 py-3 border-y border-asra-border font-light">
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Modern Optical Acrylic Gallery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Contemporary Bridal Gift Suites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Walk-ins Welcome (Tue–Sun, 11am–8pm)</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenModal('Indiranagar Studio (Bengaluru)')}
                  className="inline-flex items-center justify-center w-full py-2 text-xs uppercase font-semibold tracking-wider border border-asra-charcoal text-asra-charcoal hover:bg-asra-charcoal hover:text-white transition-colors cursor-pointer"
                >
                  Reserve Bengaluru Visit
                </button>
              </div>
            </div>

            {/* Studio 3: Global WhatsApp Support */}
            <div className="bg-asra-sand/40 border border-asra-gold/40 p-5 sm:p-6 flex flex-col justify-between shadow-sm relative">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-asra-goldDark font-semibold mb-2">
                  <span>Virtual Salon</span>
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[8px] font-bold">Live Worldwide</span>
                </div>
                <h3 className="font-cinzel text-lg font-bold text-asra-charcoal mb-1.5">Private Support Desk</h3>
                <p className="text-xs text-asra-muted mb-3 font-light">Serving couples &amp; planners across UAE, UK, USA, Singapore &amp; Pan-India.</p>
                <div className="space-y-1.5 text-xs text-gray-700 py-3 border-y border-asra-border font-light">
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Direct 1-on-1 WhatsApp Senior Stylist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Complimentary 3D Photorealistic Digital Proofs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-asra-gold font-bold">•</span>
                    <span>Global Express Diplomatic Shipping</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-1">
                <a
                  className="inline-flex items-center justify-center gap-2 w-full py-2 text-xs uppercase font-semibold tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-sm"
                  href="https://wa.me/919692668263?text=Hello%20ASRA%20Team%2C%20I%20would%20like%20to%20inquire%20about%20custom%20wedding%20keepsakes"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                  </svg>
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call To Action Banner */}
      <section className="py-10 sm:py-12 bg-asra-sand/60 border-t border-asra-border" data-purpose="bridal-support-cta" id="support">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-asra-gold"></span>
            <span className="text-[10px] font-semibold tracking-[0.25em] text-asra-goldDark uppercase">
              Private Bridal Reservations
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-asra-gold"></span>
          </div>
          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-asra-charcoal font-bold mb-3 leading-tight">
            Ready to Immortalize Your Wedding Gifts?
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-asra-muted max-w-xl mx-auto mb-6">
            Schedule a customized consultation with our Master Bridal Stylist or order our physical velvet &amp; gold leaf swatch folio delivered directly to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenModal('Customized Bridal Salon')}
              className="w-full sm:w-auto px-6 py-2.5 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book Private Consultation
            </button>
            <a
              className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-asra-cream text-asra-charcoal border border-asra-border text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              href="https://wa.me/919692668263?text=Hello%20ASRA%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20bridal%20consultation"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>WhatsApp Head Support</span>
              <span className="text-xs text-asra-gold">→</span>
            </a>
          </div>
          <p className="text-[9px] text-gray-400 mt-4 tracking-wider uppercase">
            Confidentiality Guaranteed • Non-Disclosure Agreements Honored for High-Profile Unions
          </p>
        </div>
      </section>

      {/* 9. Interactive Salon Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-asra-gold/50 shadow-2xl p-6 sm:p-8 rounded-none">
            {/* Ornate corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-asra-gold"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-asra-gold"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-asra-gold"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-asra-gold"></div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-asra-muted hover:text-asra-charcoal transition-colors text-lg"
              aria-label="Close modal"
            >
              ✕
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-asra-gold/20 flex items-center justify-center text-asra-gold text-2xl">
                  ✓
                </div>
                <h3 className="font-cinzel text-xl font-bold text-asra-charcoal">
                  Appointment Requested
                </h3>
                <p className="font-serif italic text-sm text-asra-muted max-w-sm mx-auto">
                  Thank you, {formData.name || 'valued client'}. Your salon private curator will contact you via WhatsApp to confirm your customized session for <span className="font-semibold text-asra-charcoal">{selectedSalon}</span>.
                </p>
                <div className="pt-2 text-[10px] uppercase tracking-widest text-asra-goldDark font-semibold">
                  Maison ASRA Support Desk
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-asra-gold block mb-1">
                    Private Collection Reservation
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-asra-charcoal">
                    Book Your Salon Session
                  </h3>
                  <div className="w-12 h-0.5 bg-asra-gold mx-auto mt-2"></div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-asra-charcoal mb-1">
                      Select Salon / Studio
                    </label>
                    <select
                      value={selectedSalon}
                      onChange={(e) => setSelectedSalon(e.target.value)}
                      className="w-full bg-white border border-asra-border px-3.5 py-2 text-xs text-asra-charcoal focus:border-asra-gold focus:outline-none"
                    >
                      <option value="Jubilee Hills Collection (Hyderabad)">Jubilee Hills Collection (Hyderabad)</option>
                      <option value="Indiranagar Studio (Bengaluru)">Indiranagar Studio (Bengaluru)</option>
                      <option value="Virtual Video Styling Desk">Virtual Video Styling Desk (Worldwide)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-asra-charcoal mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Asra &amp; Shahnawaz"
                        className="w-full bg-white border border-asra-border px-3.5 py-2 text-xs text-asra-charcoal focus:border-asra-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-asra-charcoal mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 96926 68263"
                        className="w-full bg-white border border-asra-border px-3.5 py-2 text-xs text-asra-charcoal focus:border-asra-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-asra-charcoal mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="shahnawazalirkl@gmail.com"
                        className="w-full bg-white border border-asra-border px-3.5 py-2 text-xs text-asra-charcoal focus:border-asra-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-asra-charcoal mb-1">
                        Wedding / Event Date
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-white border border-asra-border px-3.5 py-2 text-xs text-asra-charcoal focus:border-asra-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-asra-charcoal mb-1">
                      Gift Notes or Preferences
                    </label>
                    <textarea
                      rows="2"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Wedding Essentials trunk, gold debossed guest registry, destination venue..."
                      className="w-full bg-white border border-asra-border px-3.5 py-2 text-xs text-asra-charcoal focus:border-asra-gold focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer shadow-md"
                    >
                      Confirm Appointment Request
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsPage;
