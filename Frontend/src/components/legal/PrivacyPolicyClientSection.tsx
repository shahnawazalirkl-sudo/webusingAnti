"use client";

import React, { useState, useEffect } from 'react';

const CLAUSES = [
  {
    id: 'clause-1',
    articleNum: 'ARTICLE 01',
    category: 'Context & Legal Framework',
    title: 'Genesis, Custodianship & Scope of Collection',
    summary: 'Data custodianship for matrimonial milestones, heraldic initials, and ceremony coordinates.',
    content: (
      <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3.5">
        <p>
          ASRA Wedding Canvas Private Limited (&quot;Maison ASRA&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) acts as the sovereign data custodian for all couples, wedding planners, royal patronages, and gift recipients engaging our customized services. We operate under the paramount tenet that matrimonial milestones, genealogical family crests, and personal ceremonial details belong exclusively to the commissioning couple.
        </p>
        <p>
          When commissioning customized bridal wedding essentials, custom debossed leather suites, laser-engraved optical crystals, or destination gift boxes, we collect only the precision metadata strictly required to fulfill master craftsmanship:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
          <li>
            <strong className="text-on-surface">Couple &amp; Patron Coordinates:</strong> Full names, honorary titles, marital dates, private residence and collection delivery addresses, phone/WhatsApp contact tokens.
          </li>
          <li>
            <strong className="text-on-surface">Typographical &amp; Heraldic Assets:</strong> Vector initials, family initials sketches, Latin and devanagari calligraphic charters, and customized wedding vows.
          </li>
          <li>
            <strong className="text-on-surface">Ceremony Specifics:</strong> Venue coordinates (e.g. Villa Balbiano, Udaipur Lake Palace), banquet dates, and guest welcome hamper distribution registries.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'clause-2',
    articleNum: 'ARTICLE 02',
    category: 'Intellectual Property & Heraldry',
    title: 'Customized Heraldry, Family Crests & Design Assets',
    summary: 'Exclusive intellectual property rights and strict social media embargo policies.',
    content: (
      <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3.5">
        <p>
          The artistic collaboration between the client and our Master Typographers entails the generation of proprietary vector files, 3D debossing relief proofs, and solid brass engraving toolpaths.
        </p>
        <div className="p-4 rounded-xl bg-[#FAF4EB] border-l-4 border-primary space-y-2">
          <h4 className="font-bold text-on-surface text-xs uppercase tracking-wide flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">workspace_premium</span>
            Client Sole Ownership Guarantee
          </h4>
          <p className="text-xs text-on-surface-variant">
            All customized initials insignias and heraldic crests designed specifically for the couple remain the exclusive intellectual and aesthetic property of the couple. Maison ASRA will never re-use, resell, or license your commissioned family crest for any other patron.
          </p>
        </div>
        <p>
          <strong className="text-on-surface">Photography &amp; Social Media Embargo:</strong> Maison ASRA strictly respects the ceremonial calendar. We will never post, publish, exhibit, or share photographic reproductions of your wedding hampers, vow books, or bridal trunks on social media, press features, or our website catalog prior to your official ceremony conclusion without prior written authorization.
        </p>
      </div>
    )
  },
  {
    id: 'clause-3',
    articleNum: 'ARTICLE 03',
    category: 'Guest Protection',
    title: 'Guest Registry & Destination Welcome Lists',
    summary: 'Air-gapped manifest isolation with automated 60-day post-ceremony data purging.',
    content: (
      <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3.5">
        <p>
          For bulk wedding commissions requiring individualized name personalization (e.g. customized leather luggage tags, initials silk sleepwear, or individual welcome hampers for destination attendees), clients may provide attendee manifests.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
          <div className="p-3.5 rounded-xl bg-[#FAF4EB] border border-primary/20">
            <span className="font-bold text-xs text-on-surface block mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
              Strict Isolation
            </span>
            <span className="text-xs text-on-surface-variant">
              Guest manifests are partitioned in cryptographically isolated folders, accessible solely by the assigned lead production artisan.
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAF4EB] border border-primary/20">
            <span className="font-bold text-xs text-on-surface block mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              Automated Purging
            </span>
            <span className="text-xs text-on-surface-variant">
              Guest lists uploaded for laser engraving or calligraphy shipping are permanently scrubbed 60 days following ceremonial delivery.
            </span>
          </div>
        </div>
        <p>
          Under no circumstances are guest telephone numbers or personal emails utilized for marketing, newsletter subscriptions, or ancillary promotions.
        </p>
      </div>
    )
  },
  {
    id: 'clause-4',
    articleNum: 'ARTICLE 04',
    category: 'Financial & Vault Privacy',
    title: 'Payment Vault & Financial Confidentiality',
    summary: 'PCI-DSS Level 1 processing, invoice discretion, and offline 24K gold registry.',
    content: (
      <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3.5">
        <p>
          Financial transactions for customized bridal commissions are handled with sovereign-level banking protocols:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
          <li>
            <strong className="text-on-surface">Zero Card Storage:</strong> Payment details (credit cards, UPI tokens, wire transfer origins) are processed directly via PCI-DSS Level 1 certified payment gateways. ASRA systems never store raw card numbers, CVVs, or bank security PINs.
          </li>
          <li>
            <strong className="text-on-surface">Invoice Discretion:</strong> High-value wire transfers, corporate gifting dockets, and private royal commissions can be billed under non-descriptive luxury collection nomenclatures upon request to preserve discretion.
          </li>
          <li>
            <strong className="text-on-surface">24K Gold Leaf Authenticity Records:</strong> Serial numbers associated with your 24K gold certificates of authenticity are recorded in an encrypted offline register to safeguard your heirloom warranty.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'clause-5',
    articleNum: 'ARTICLE 05',
    category: 'Physical Master Die Storage',
    title: 'Physical Initials Archival (5-Year Brass Die Vault)',
    summary: 'Climate-controlled foundry storage in Hyderabad with anonymous alphanumeric docketing.',
    content: (
      <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3.5">
        <p>
          As a complimentary privilege of commissioning customized leather goods, your CNC-milled solid brass initials debossing die (85mm × 85mm × 2.2mm relief) is archived in our climate-controlled Hyderabad foundry vault for five (5) complimentary years.
        </p>
        <div className="p-4 rounded-xl bg-[#FAF4EB] border border-primary/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-on-surface uppercase tracking-wide">Archival Security Protocol</span>
            <span className="text-[10px] font-mono text-primary bg-white px-2 py-0.5 rounded border border-primary/20">VAULT-HYD-SEC-22</span>
          </div>
          <p className="text-xs text-on-surface-variant">
            Physical master dies are cataloged under anonymous alphanumeric docket codes (e.g. #HYD-2026-ET). Only your verified Collection Support can link the physical metal stamp to your client profile during milestone re-orders (anniversary gift books, holiday wedding essentials, baby gifts).
          </p>
        </div>
        <p>
          Clients may at any time request the physical handover of their master brass die, shipped directly to their residence via climate-insured courier in an artisanal Indian Rosewood gift box.
        </p>
      </div>
    )
  },
  {
    id: 'clause-6',
    articleNum: 'ARTICLE 06',
    category: 'International Logistics',
    title: 'White-Glove Delivery & International Customs',
    summary: 'Bonded air courier data exchange restricted purely to export compliance.',
    content: (
      <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3.5">
        <p>
          For destination wedding consignments shipped across Europe, the GCC, the United Kingdom, or the United States, we share requisite declarations with international customs authorities and our bonded air courier partners (DHL Luxury Express / FedEx Custom Critical).
        </p>
        <p>
          Such data sharing is limited exclusively to export compliance, customs clearance tariff codes, recipient destination addresses, and consignee tax IDs where legally mandated. We require all global courier partners to maintain strict confidentiality and zero retention beyond successful delivery confirmation.
        </p>
      </div>
    )
  },
  {
    id: 'clause-7',
    articleNum: 'ARTICLE 07',
    category: 'Your Entitlements',
    title: "The Couple's Sovereign Rights & Redaction",
    summary: 'Complete redaction, vector asset export, and die surrender guarantees.',
    content: (
      <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3.5">
        <p>
          Under the Digital Personal Data Protection (DPDP) Act 2023 and the General Data Protection Regulation (GDPR), couples commissioning ASRA retain indelible rights regarding their personal and matrimonial metadata:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <div className="border border-outline-variant/30 p-3.5 rounded-xl bg-surface-container-lowest shadow-xs hover:border-primary/40 transition-colors">
            <span className="text-xs font-bold text-on-surface block mb-1">Right to Complete Redaction</span>
            <span className="text-xs text-on-surface-variant">
              Request the total permanent purging of digital CAD proofs, wedding dates, and contact logs from our systems.
            </span>
          </div>
          <div className="border border-outline-variant/30 p-3.5 rounded-xl bg-surface-container-lowest shadow-xs hover:border-primary/40 transition-colors">
            <span className="text-xs font-bold text-on-surface block mb-1">Right to Vector Portability</span>
            <span className="text-xs text-on-surface-variant">
              Download complete high-resolution AI/EPS/SVG vector assets of your commissioned family heraldry at any time.
            </span>
          </div>
          <div className="border border-outline-variant/30 p-3.5 rounded-xl bg-surface-container-lowest shadow-xs hover:border-primary/40 transition-colors">
            <span className="text-xs font-bold text-on-surface block mb-1">Right to Revoke Marketing</span>
            <span className="text-xs text-on-surface-variant">
              Opt out of milestone anniversary notices or private collection salon invitations with a single tap.
            </span>
          </div>
          <div className="border border-outline-variant/30 p-3.5 rounded-xl bg-surface-container-lowest shadow-xs hover:border-primary/40 transition-colors">
            <span className="text-xs font-bold text-on-surface block mb-1">Right to Die Surrender</span>
            <span className="text-xs text-on-surface-variant">
              Request the decommissioning or physical shipping of your custom brass stamping die at any milestone.
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'clause-8',
    articleNum: 'ARTICLE 08',
    category: 'Direct Contact & Oversight',
    title: 'Data Protection Officer & Salon Inquiries',
    summary: 'Designated legal officer contact, physical foundry address, and docket triggers.',
    content: (
      <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-4">
        <p>
          To exercise your privacy prerogatives, register an NDA covenant for a destination royal celebration, or inquire regarding brass die vault status, contact our designated Data Protection Officer:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl bg-[#FAF4EB] border border-primary/20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
              Data Governance Officer
            </span>
            <h4 className="font-serif text-base font-bold text-on-surface">Taofique Alkhair Khan</h4>
            <p className="text-xs text-on-surface-variant mt-0.5">Head of Legal, Archival &amp; Client Confidentiality</p>
            <div className="mt-3 text-xs space-y-1 text-on-surface-variant">
              <div>
                <span className="font-medium text-on-surface">Email:</span>{' '}
                <a href="mailto:shahnawazalirkl@gmail.com" className="text-primary hover:underline font-medium">
                  shahnawazalirkl@gmail.com
                </a>
              </div>
              <div>
                <span className="font-medium text-on-surface">Support Desk:</span>{' '}
                <a href="tel:+919692668263" className="hover:text-primary transition-colors">
                  +91 96926 68263
                </a>
              </div>
            </div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-outline-variant/30 pt-4 md:pt-0 md:pl-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
              Physical Foundry &amp; Registered Office
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              ASRA Wedding Canvas Private Limited<br />
              Plot No. 36, Road No. 36, Jubilee Hills<br />
              Hyderabad, Telangana 500033, India<br />
              <span className="text-outline">Attn: Data Protection Registry</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
];

export default function PrivacyPolicyClientSection() {
  const [activeClauseId, setActiveClauseId] = useState('clause-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNdaModalOpen, setIsNdaModalOpen] = useState(false);
  const [ndaForm, setNdaForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Couple / Patron',
    ceremonyDate: '',
    venue: '',
    requirements: ''
  });
  const [ndaSubmitted, setNdaSubmitted] = useState(false);

  // ScrollSpy using IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveClauseId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    CLAUSES.forEach((clause) => {
      const el = document.getElementById(clause.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [searchQuery]);

  // Filter clauses by search query
  const filteredClauses = CLAUSES.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.articleNum.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q)
    );
  });

  const handleNdaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNdaSubmitted(true);
    setTimeout(() => {
      const subject = encodeURIComponent(`Custom NDA Request: ${ndaForm.name} (${ndaForm.ceremonyDate || '2026'})`);
      const body = encodeURIComponent(
        `Dear Maison ASRA Support Legal Desk,\n\n` +
        `Client / Patron: ${ndaForm.name}\n` +
        `Role: ${ndaForm.role}\n` +
        `Phone: ${ndaForm.phone}\n` +
        `Ceremony Date: ${ndaForm.ceremonyDate}\n` +
        `Venue / Destination: ${ndaForm.venue}\n\n` +
        `Embargo & Discretion Requirements:\n${ndaForm.requirements}\n\n` +
        `Request Docket Generated via ASRA My Account.\n`
      );
      window.location.href = `mailto:shahnawazalirkl@gmail.com?subject=${subject}&body=${body}`;
      setIsNdaModalOpen(false);
      setNdaSubmitted(false);
    }, 1200);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT SIDEBAR: STICKY CLAUSE INDEX & QUICK CONTACT */}
        <aside className="lg:col-span-4 space-y-6 print:hidden">
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/30">
              <h4 className="font-serif text-base sm:text-lg font-medium text-on-surface">Covenant Clauses</h4>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-[#FAF4EB] px-2.5 py-0.5 rounded border border-primary/20">
                8 Articles
              </span>
            </div>

            {/* Clause Search */}
            <div className="relative mb-3">
              <span className="material-symbols-outlined text-[18px] text-outline absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter clauses (e.g. brass, NDA, DPDP)..."
                className="w-full pl-9 pr-7 py-2 text-xs bg-surface border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Navigation Menu with dynamic active scrollspy state */}
            <nav className="space-y-1 text-xs max-h-[50vh] overflow-y-auto pr-1">
              {filteredClauses.map((clause) => {
                const isActive = activeClauseId === clause.id;
                return (
                  <a
                    key={clause.id}
                    href={`#${clause.id}`}
                    onClick={() => setActiveClauseId(clause.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all group ${
                      isActive
                        ? 'bg-[#FAF4EB] text-primary font-bold border-l-2 border-primary'
                        : 'text-on-surface-variant hover:bg-[#FAF4EB] hover:text-primary'
                    }`}
                  >
                    <span className="truncate pr-2">
                      {clause.articleNum.replace('ARTICLE ', '')}. {clause.title}
                    </span>
                    <span
                      className={`text-primary transition-opacity shrink-0 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      →
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Confidentiality Officer Callout Box */}
            <div className="mt-6 p-5 rounded-xl bg-[#1c1b1b] text-[#fcf9f8] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary-fixed"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed">
                  Private Support Counsel
                </span>
              </div>
              <p className="text-xs text-outline-variant leading-relaxed">
                Require an executive Non-Disclosure Agreement (NDA) or custom data segregation protocol for your high-profile commission?
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setIsNdaModalOpen(true)}
                  className="px-4 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 text-center cursor-pointer"
                >
                  Request Custom NDA Execution
                </button>
                <a
                  href="tel:+919692668263"
                  className="text-[11px] text-outline-variant text-center hover:text-primary-fixed transition-colors font-mono"
                >
                  Direct line: +91 96926 68263
                </a>
              </div>
            </div>

            {/* Document Verification Stamp */}
            <div className="mt-6 p-4 rounded-xl border border-dashed border-primary/40 bg-[#FAF4EB] text-center">
              <div className="text-[9px] uppercase tracking-widest text-outline">
                Cryptographic Seal of Authenticity
              </div>
              <div className="font-serif text-sm font-semibold text-on-surface mt-0.5">
                ASRA Provenance Certified
              </div>
              <div className="text-[10px] font-mono text-primary mt-1 flex items-center justify-center gap-1">
                <span>SHA-256: 7f8a92b1...d408c</span>
                <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: FULL LEGAL CLAUSES & ARTICLES */}
        <article className="lg:col-span-8 space-y-6">
          {filteredClauses.map((clause) => (
            <section
              key={clause.id}
              id={clause.id}
              className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 shadow-xs scroll-mt-24 transition-all hover:border-primary/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 bg-[#FAF4EB] rounded border border-primary/20">
                  {clause.articleNum}
                </span>
                <span className="text-xs uppercase tracking-wider text-outline">
                  {clause.category}
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface mb-4">
                {clause.title}
              </h2>

              {clause.content}

              {/* Article 8 Action Buttons */}
              {clause.id === 'clause-8' && (
                <div className="pt-5 flex flex-wrap items-center gap-3 print:hidden">
                  <a
                    href="mailto:shahnawazalirkl@gmail.com?subject=Privacy%20Data%20Request%20Docket%20-%20ASRA"
                    className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span>Initiate Privacy Request</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-5 py-2.5 border border-outline-variant/50 text-on-surface rounded-lg text-xs font-semibold uppercase tracking-wider hover:border-primary hover:text-primary active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">print</span>
                    <span>Download PDF Covenant</span>
                  </button>
                </div>
              )}
            </section>
          ))}

          {filteredClauses.length === 0 && (
            <div className="bg-surface-container-lowest p-12 rounded-xl border border-outline-variant/30 text-center space-y-3">
              <span className="material-symbols-outlined text-[32px] text-outline mx-auto">search</span>
              <h3 className="font-serif text-base sm:text-lg font-medium text-on-surface">No matching clauses found</h3>
              <p className="text-xs text-on-surface-variant">
                We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try searching for terms like &ldquo;die&rdquo;, &ldquo;NDA&rdquo;, &ldquo;embargo&rdquo;, or &ldquo;GDPR&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center text-xs font-semibold text-primary hover:underline pt-2 cursor-pointer"
              >
                Clear search query
              </button>
            </div>
          )}
        </article>
      </div>

      {/* INTERACTIVE NDA EXECUTION MODAL */}
      {isNdaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn print:hidden">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl border border-outline-variant/30 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsNdaModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/90 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF4EB] border border-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] text-primary">lock</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                  Private Salon Counsel
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-medium text-on-surface">
                  Request Customized NDA Execution
                </h3>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed mb-5">
              For high-profile, celebrity, or diplomatic matrimonial celebrations, we enter into bilateral non-disclosure agreements prior to reviewing wedding itineraries or master heraldic crests.
            </p>

            <form onSubmit={handleNdaSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Commissioning Patron or Lead Planner Name *
                </label>
                <input
                  type="text"
                  required
                  value={ndaForm.name}
                  onChange={(e) => setNdaForm({ ...ndaForm, name: e.target.value })}
                  placeholder="e.g. Asra Ansari / Mr. Sk Shahnawaz Ali"
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Direct Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={ndaForm.email}
                    onChange={(e) => setNdaForm({ ...ndaForm, email: e.target.value })}
                    placeholder="shahnawazalirkl@gmail.com"
                    className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Private Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={ndaForm.phone}
                    onChange={(e) => setNdaForm({ ...ndaForm, phone: e.target.value })}
                    placeholder="+91 96926 68263"
                    className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Ceremony Muhurat / Date
                  </label>
                  <input
                    type="text"
                    value={ndaForm.ceremonyDate}
                    onChange={(e) => setNdaForm({ ...ndaForm, ceremonyDate: e.target.value })}
                    placeholder="e.g. November 24, 2026"
                    className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Destination Venue
                  </label>
                  <input
                    type="text"
                    value={ndaForm.venue}
                    onChange={(e) => setNdaForm({ ...ndaForm, venue: e.target.value })}
                    placeholder="e.g. Lake Como / Udaipur / St. Moritz"
                    className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Special Embargo &amp; Secrecy Instructions
                </label>
                <textarea
                  rows={2}
                  value={ndaForm.requirements}
                  onChange={(e) => setNdaForm({ ...ndaForm, requirements: e.target.value })}
                  placeholder="e.g. Total social media embargo, custom packaging without exterior logos, or strict delivery to private airport terminal..."
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary"
                ></textarea>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF4EB] border border-primary/20 flex items-center gap-2 text-[11px] text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">verified_user</span>
                <span>
                  Our in-house legal counsel will counter-sign and return your bilateral NDA within 4 business hours.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNdaModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={ndaSubmitted}
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {ndaSubmitted ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                      <span>Generating Docket...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      <span>Dispatch NDA Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
