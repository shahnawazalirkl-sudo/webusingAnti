"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Shield,
  Phone,
  Printer,
  X,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Lock,
  Sparkles,
  Archive,
  Truck,
  RotateCcw,
  Calendar,
  AlertCircle
} from 'lucide-react';

// FAQ Content Structure
const FAQ_CATEGORIES = [
  {
    id: 'customization',
    roman: 'I',
    title: 'Customized Customization & Metallurgy',
    pillLabel: 'Customization & Initials',
    items: [
      {
        id: 'faq-1-1',
        question: 'How does the 3D initials brass die proofing process work?',
        answer: (
          <div className="space-y-2">
            <p>
              Upon receipt of your order, our master typographers draft your vector initials or family heraldic cipher. Within <strong>6 hours</strong>, you receive a photorealistic 3D render over WhatsApp showing exact debossing depth, bevel angle, and shadow relief.
            </p>
            <p className="text-asra-dark font-normal">
              No molten brass is milled until you review and grant explicit digital sign-off. Once produced, your custom solid brass die is archived complimentary for 5 years in our Hyderabad climate-controlled vault.
            </p>
          </div>
        ),
        keywords: ['initials proofing', '3d render', 'brass die', 'vector', 'whatsapp', 'hyderabad vault']
      },
      {
        id: 'faq-1-2',
        question: 'Can we customize physical brass stamps and heraldic family crests?',
        answer: (
          <p>
            Yes. We accommodate intricate regal insignia, historical royal crests, and contemporary initials typography. Our CNC machinery carves up to 0.15mm micro-relief detail in heavy grade alloy suitable for hot-foil debossing, wax seal impressions, and heavy leatherette wedding essentials stamping.
          </p>
        ),
        keywords: ['brass stamps', 'heraldic', 'family crest', 'cnc', 'wax seal', 'debossing', 'foil']
      },
      {
        id: 'faq-1-3',
        question: 'What if there is a spelling or date discrepancy on the final gift?',
        answer: (
          <p>
            If the finalized piece diverges in any way from the WhatsApp digital proof verified by you or your wedding planner, ASRA assumes <strong>100% comprehensive liability</strong>. We activate an immediate express 24-hour casting remake and courier it via dedicated flight hand-carry at zero charge.
          </p>
        ),
        keywords: ['spelling', 'date discrepancy', 'error', 'liability', 'remake', 'replacement', '24-hour']
      }
    ]
  },
  {
    id: 'timelines',
    roman: 'II',
    title: 'Production Turnarounds & Express Delivery',
    pillLabel: 'Timelines & Rush Orders',
    items: [
      {
        id: 'faq-2-1',
        question: 'How soon will my wedding essentials or gift suite be dispatched?',
        answer: (
          <div className="space-y-2">
            <p>
              <strong>Pre-curated in-stock items:</strong> Dispatched within 24 to 48 hours via insured priority air cargo.
            </p>
            <p>
              <strong>Custom Brass Die Debossed Suites:</strong> 7 to 10 working days to accommodate CNC metallurgy casting, hand-leather gilding, and botanic cryo-stabilization.
            </p>
            <p className="italic text-asra-dark">
              Emergency Rush Protocol: For ceremonies within 72 hours, contact your support directly for express 24h foundry fast-tracking.
            </p>
          </div>
        ),
        keywords: ['timeline', 'dispatch', 'turnaround', 'rush orders', '24-hour dispatch', 'express delivery']
      },
      {
        id: 'faq-2-2',
        question: 'How is white-glove climate transit ensured for destination weddings?',
        answer: (
          <p>
            Botanical wedding gifts and cryo-hydrated Parisian florals are housed in 18°C temperature-stabilized, sealed chambers with interior zero-vibration shock absorbers. We ship regularly directly to palace destinations in Udaipur, Jaipur, Lake Como, and Bali with pre-coordinated destination bridal concierges.
          </p>
        ),
        keywords: ['destination weddings', 'climate transit', 'white-glove', 'chilled', 'udaipur', 'jaipur', 'lake como', 'bali']
      }
    ]
  },
  {
    id: 'bulk-favors',
    roman: 'III',
    title: 'Orders, Bulk Favors & Gifting Desks',
    pillLabel: 'Bulk & Royal Destination Favors',
    items: [
      {
        id: 'faq-3-1',
        question: 'Do you offer tiered pricing for destination wedding guest hampers?',
        answer: (
          <p>
            Yes. For customized destination orders spanning 50+ to 500+ guest suites, we offer dedicated project coordinators, customized wax seal pigmentation matching your wedding floral theme, and tiered collection concessions. Furthermore, each 25+ suite booking includes 5% surplus contingency boxes free of charge.
          </p>
        ),
        keywords: ['bulk orders', 'tiered pricing', 'destination wedding favors', 'guest hampers', 'contingency']
      },
      {
        id: 'faq-3-2',
        question: 'Can we split shipments across multiple bridal suites or cities?',
        answer: (
          <p>
            Absolutely. You can furnish a manifest of multi-city bridal party addresses or split transit between your primary home residence and the palace hospitality desk 5 days ahead of auspicious ceremonies.
          </p>
        ),
        keywords: ['split shipments', 'multi-city', 'bridal party addresses', 'hospitality desk']
      }
    ]
  },
  {
    id: 'cancellations',
    roman: 'IV',
    title: 'Cancellations, Revisions & Vault Guarantees',
    pillLabel: 'Payment, GST & Vault Guarantee',
    items: [
      {
        id: 'faq-4-1',
        question: 'What is the cancellation policy for custom engraved items?',
        answer: (
          <div className="space-y-2">
            <p>
              <strong>Within 2 Hours (Pre-Milling):</strong> 100% full immediate refund to the original payment method.
            </p>
            <p>
              <strong>Between 2h to 12h (Die Created, Prior to Stamping):</strong> 80% refund (less standard ₹1,500 die casting cost). You retain physical ownership of the brass die in a rosewood box.
            </p>
            <p>
              <strong>After 12 Hours:</strong> Once hot foil debossing and floral encapsulation commence, items cannot be cancelled.
            </p>
          </div>
        ),
        keywords: ['cancellation policy', 'refund', 'engraved items', 'returns & alterations', 'vault guarantee']
      },
      {
        id: 'faq-4-2',
        question: 'How do I request a complimentary replacement if transit damage occurs?',
        answer: (
          <p>
            Share 2 clear photographs of the damage alongside the serial badge via WhatsApp at +91 96926 68263 within 24 hours of delivery. A Senior Stylist verifies the claim in under 45 minutes and issues a priority air remake.
          </p>
        ),
        keywords: ['transit damage', 'complimentary replacement', 'insurance', 'whatsapp claim', 'air remake']
      }
    ]
  }
];

// Legal Protocols Annexure
const PROTOCOLS_DATA = {
  support: {
    title: 'Collection Support Emergency Protocols',
    ref: 'ASRA-SOP-SUPPORT-2026',
    content: [
      {
        h: '1. Muhurat Date Guarantee',
        p: 'All wedding commissions linked to confirmed Muhurat schedules are tagged with continuous telemetry. In the event of transit or flight delays, express air hand-carry couriers are dispatched at zero client cost.'
      },
      {
        h: '2. Destination Palace Liaison',
        p: 'Our team contacts palace support desks (Taj Lake Palace, Oberoi Udaivilas, Rambagh Palace, Villa d’Este) 48 hours prior to handover to ensure correct climate storage.'
      }
    ]
  },
  insurance: {
    title: 'White-Glove Transit Insurance Policy',
    ref: 'ASRA-TRANS-9921 / NTU Underwritten',
    content: [
      {
        h: '1. 100% Total Value Protection',
        p: 'Every parcel shipped via ASRA is protected against loss, impact fracture, moisture, and temperature fluctuations.'
      },
      {
        h: '2. Expedited 24-Hour Casting Remake',
        p: 'If damage occurs, our metallurgical foundry creates an expedited replacement without waiting for lengthy insurance surveys.'
      }
    ]
  },
  archival: {
    title: 'Initials Brass Die Archival Terms',
    ref: 'ASRA-VAULT-HYD-5YR',
    content: [
      {
        h: '1. 5-Year Climate Archival',
        p: 'Your milled brass alloy debossing plate is stored in nitrogen-shielded, humidity-controlled vaults in Hyderabad.'
      },
      {
        h: '2. Lifetime Family Re-order Concession',
        p: 'Subsequent wedding stationery, anniversary folios, and wedding essentials boxes skip the die fabrication fee for ₹1,500 savings on future customized orders.'
      }
    ]
  },
  privacy: {
    title: 'Client NDA & High-Profile Bridal Privacy',
    ref: 'ASRA-SEC-NDA-2026',
    content: [
      {
        h: '1. Strict Embargo on Public Previews',
        p: 'No drafts, heraldic dies, or wedding photos are exhibited on ASRA portfolios or social platforms before public wedding celebrations conclude.'
      },
      {
        h: '2. 256-Bit Encrypted Data Purge',
        p: 'Clients may request permanent deletion of guest manifests, RSVP rosters, and initials CAD vectors upon delivery.'
      }
    ]
  }
};

const FaqPage = () => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Accordion open states (keyed by FAQ id)
  const [openItems, setOpenItems] = useState({
    'faq-1-1': true,
    'faq-2-1': true
  });

  // Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    orderId: '',
    phone: '',
    inquiryType: 'Initials Proofing & Die Revision',
    message: ''
  });
  const [ticketStatus, setTicketStatus] = useState<{ state: string; ticketId: string | null; error: string | null }>({ state: 'idle', ticketId: null, error: null });

  // Protocol Modal State
  const [activeProtocol, setActiveProtocol] = useState<keyof typeof PROTOCOLS_DATA | null>(null);

  // Vault Modal State
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  const [vaultSearchId, setVaultSearchId] = useState('');
  const [vaultResult, setVaultResult] = useState<{ found?: boolean; dieName?: string; status?: string; millingDate?: string; material?: string; vaultExpiry?: string; city?: string; message?: string; } | null>(null);

  // Toggle single accordion
  const toggleAccordion = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Quick lookup handler
  const handleQuickLookup = (keyword) => {
    setSearchQuery(keyword);
    setActiveCategory('all');
  };

  // Filtered FAQ Items based on search and category
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return FAQ_CATEGORIES.map((cat) => {
      // Category filter check
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }

      // Search filter check
      if (!q) {
        return cat;
      }

      const matchingItems = cat.items.filter((item) => {
        const questionMatch = item.question.toLowerCase().includes(q);
        const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(q));
        return questionMatch || keywordMatch;
      });

      if (matchingItems.length === 0) {
        return null;
      }

      return {
        ...cat,
        items: matchingItems
      };
    }).filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [searchQuery, activeCategory]);

  // Handle Support Ticket Submit
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.orderId.trim() || !ticketForm.phone.trim()) {
      setTicketStatus({
        state: 'error',
        ticketId: null,
        error: 'Please provide both your Order / Docket ID and Phone Number.'
      });
      return;
    }

    // Generate realistic ticket ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `ASRA-TKT-${new Date().getFullYear()}-${randomNum}`;

    setTicketStatus({
      state: 'success',
      ticketId: generatedId,
      error: null
    });
  };

  // Handle Brass Die Vault Lookup
  const handleVaultLookup = (e) => {
    e.preventDefault();
    if (!vaultSearchId.trim()) return;

    if (vaultSearchId.toUpperCase().includes('8842') || vaultSearchId.toUpperCase().includes('ASRA')) {
      setVaultResult({
        found: true,
        dieName: 'Imperial Floral Initials Die "A & R"',
        status: 'Preserved in Vault Chamber B-14',
        millingDate: 'October 12, 2026',
        material: 'Solid CuZn39Pb3 Heavy Brass (0.15mm Micro-Relief)',
        vaultExpiry: 'October 2031 (5-Year Preservation Guaranteed)',
        city: 'Hyderabad Metallurgy Collection Facility'
      });
    } else {
      setVaultResult({
        found: false,
        message: 'No active initials die linked to this Docket ID yet. If your order was recently placed, CAD milling begins within 12 hours of proof sign-off.'
      });
    }
  };

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
        {/* HEADER SECTION */}
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
            Curated answers to assist your customized heirloom commissions, bridal registries, personalized metallurgy dies, and white-glove climate transit.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-2xl mx-auto relative shadow-sm rounded-lg bg-white border border-asra-border p-1.5 flex items-center gap-2 focus-within:border-asra-gold focus-within:ring-1 focus-within:ring-asra-gold transition-all">
            <Search className="w-5 h-5 ml-3 text-asra-gold shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keywords, order IDs, customization queries, or transit policies..."
              className="w-full border-none focus:ring-0 text-xs sm:text-sm text-asra-dark placeholder:text-asra-muted/70 bg-transparent py-2 px-1 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-asra-muted hover:text-asra-dark p-1 rounded-full transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              className="bg-asra-gold hover:bg-asra-goldDark text-white px-5 py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 shadow-xs"
            >
              Search
            </button>
          </div>

          {/* Quick Search Keywords Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-asra-muted">
            <span className="font-medium text-asra-dark">Frequent Lookups:</span>
            {[
              { label: 'Initials Proofing', query: 'initials proofing' },
              { label: 'Brass Die Vault', query: 'brass die' },
              { label: '24-Hour Dispatch', query: '24-hour dispatch' },
              { label: 'Destination Weddings', query: 'destination weddings' },
              { label: 'Returns & Alterations', query: 'returns & alterations' }
            ].map((tag, idx, arr) => (
              <React.Fragment key={tag.label}>
                <button
                  type="button"
                  onClick={() => handleQuickLookup(tag.query)}
                  className="underline decoration-asra-border hover:decoration-asra-gold hover:text-asra-goldDark transition-colors cursor-pointer"
                >
                  {tag.label}
                </button>
                {idx < arr.length - 1 && <span>·</span>}
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* QUICK NAVIGATION PILL BAR */}
        <div className="overflow-x-auto pb-2 mb-12 scrollbar-none">
          <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max border-b border-asra-border/60 pb-3">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeCategory === 'all'
                  ? 'bg-asra-dark text-white shadow-sm'
                  : 'bg-white border border-asra-border text-asra-muted hover:text-asra-dark hover:border-asra-gold'
              }`}
            >
              All Inquiries
            </button>
            {FAQ_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-asra-dark text-white shadow-sm'
                      : 'bg-white border border-asra-border text-asra-muted hover:text-asra-dark hover:border-asra-gold'
                  }`}
                >
                  {category.pillLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: FAQ Accordions (7 cols)                                      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-10">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <section
                  key={cat.id}
                  className="bg-white border border-asra-border rounded-xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-asra-border/60">
                    <span className="w-6 h-6 rounded-full bg-asra-dark text-white text-xs flex items-center justify-center font-serif-luxury font-semibold">
                      {cat.roman}
                    </span>
                    <h2 className="font-serif-luxury text-2xl text-asra-dark font-medium">
                      {cat.title}
                    </h2>
                  </div>

                  {/* FAQ Items in this Category */}
                  <div className="space-y-4">
                    {cat.items.map((item, idx) => {
                      const isOpen = !!openItems[item.id];
                      const isLast = idx === cat.items.length - 1;

                      return (
                        <div
                          key={item.id}
                          className={`${
                            !isLast ? 'border-b border-asra-border/50 pb-4' : 'pb-1'
                          } transition-colors`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleAccordion(item.id)}
                            className="w-full flex justify-between items-center text-left cursor-pointer list-none font-serif-luxury text-lg text-asra-dark font-semibold group focus:outline-none"
                            aria-expanded={isOpen}
                          >
                            <span className="group-hover:text-asra-gold transition-colors pr-2">
                              {item.question}
                            </span>
                            <span
                              className={`transition-transform duration-300 text-asra-gold ml-2 shrink-0 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </span>
                          </button>

                          {isOpen && (
                            <div className="mt-3 text-xs sm:text-sm text-asra-muted leading-relaxed font-light animate-fadeIn">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))
            ) : (
              <div className="bg-white border border-asra-border rounded-xl p-10 text-center space-y-4 shadow-sm">
                <AlertCircle className="w-10 h-10 text-asra-gold mx-auto" />
                <h3 className="font-serif-luxury text-xl text-asra-dark font-medium">
                  No Matching Inquiries Found
                </h3>
                <p className="text-xs text-asra-muted max-w-md mx-auto">
                  We couldn't find an answer matching &ldquo;{searchQuery}&rdquo;. You can submit a customized support ticket below or connect instantly with our lead stylist.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="px-4 py-2 bg-asra-dark text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-asra-charcoal transition-colors"
                  >
                    Reset Search
                  </button>
                  <a
                    href="https://wa.me/919692668263?text=Hello%20ASRA%2C%20I%20have%20a%20question%20about%20a%20wedding%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Stylist</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Support Support & Direct Assistance (5 cols)              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* CARD 1: Instant WhatsApp Support (Dark Obsidian Luxury Aesthetic) */}
            <div className="bg-asra-dark text-white rounded-xl p-6 sm:p-7 shadow-lg border border-asra-charcoal relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-asra-gold/15 rounded-full blur-2xl pointer-events-none"></div>

              {/* Stylist Headline */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-asra-gold border border-asra-gold/30 shrink-0">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-medium tracking-wide text-white">
                    Collection Stylist Hotline
                  </h3>
                  <p className="text-[11px] text-asra-gold uppercase tracking-wider font-medium">
                    Instant Resolution for Wedding Planners
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-6 font-light">
                Need urgent alterations to names, event dates, or delivery suite coordinates before metal casting? Our stylists are available 24/7 during wedding peak seasons.
              </p>

              {/* WhatsApp CTA Button */}
              <a
                href="https://wa.me/919692668263?text=Hello%20ASRA%20Concierge%2C%20I%20need%20urgent%20assistance%20with%20my%20wedding%20commission."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-lg font-medium text-xs tracking-wider transition-all shadow-md active:scale-[0.99] uppercase"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat with Lead Stylist on WhatsApp</span>
              </a>

              {/* Details below button */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span>Average response: <strong className="text-white">&lt; 5 mins</strong></span>
                <span>Direct Line: <strong className="text-white">+91 96926 68263</strong></span>
              </div>
            </div>

            {/* CARD 2: Raise a Customized Support Ticket */}
            <div className="bg-white border border-asra-border rounded-xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-asra-border/50">
                <h3 className="font-serif-luxury text-xl font-medium text-asra-dark">
                  Raise a Customized Support Ticket
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-asra-gold bg-asra-champagne px-2 py-0.5 rounded border border-asra-border font-semibold">
                  Priority Desk
                </span>
              </div>

              {ticketStatus.state === 'success' ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Support Docket Created</span>
                  </div>
                  <p className="text-xs text-emerald-800/90 leading-relaxed">
                    Your inquiry has been assigned priority status under Reference:{' '}
                    <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-300 text-emerald-950 font-bold">
                      {ticketStatus.ticketId}
                    </strong>
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    A Senior Stylist will reply via phone or WhatsApp at <strong>{ticketForm.phone}</strong> within 30 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setTicketStatus({ state: 'idle', ticketId: null, error: null });
                      setTicketForm({ orderId: '', phone: '', inquiryType: 'Initials Proofing & Die Revision', message: '' });
                    }}
                    className="text-[11px] underline text-emerald-800 hover:text-emerald-950 font-medium"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  {ticketStatus.state === 'error' && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{ticketStatus.error}</span>
                    </div>
                  )}

                  {/* Order Docket Field */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-asra-muted font-semibold mb-1">
                      Order / Docket ID
                    </label>
                    <input
                      type="text"
                      value={ticketForm.orderId}
                      onChange={(e) => setTicketForm({ ...ticketForm, orderId: e.target.value })}
                      placeholder="e.g. ASRA-2026-8842X"
                      className="w-full text-xs rounded border border-asra-border bg-asra-ivory/50 px-3 py-2 text-asra-dark focus:border-asra-gold focus:ring-1 focus:ring-asra-gold focus:outline-none transition-all placeholder:text-asra-muted/60"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-asra-muted font-semibold mb-1">
                      Registered Phone Number
                    </label>
                    <input
                      type="tel"
                      value={ticketForm.phone}
                      onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                      placeholder="+91 96926 68263"
                      className="w-full text-xs rounded border border-asra-border bg-asra-ivory/50 px-3 py-2 text-asra-dark focus:border-asra-gold focus:ring-1 focus:ring-asra-gold focus:outline-none transition-all placeholder:text-asra-muted/60"
                      required
                    />
                  </div>

                  {/* Query Type Dropdown */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-asra-muted font-semibold mb-1">
                      Nature of Inquiry
                    </label>
                    <select
                      value={ticketForm.inquiryType}
                      onChange={(e) => setTicketForm({ ...ticketForm, inquiryType: e.target.value })}
                      className="w-full text-xs rounded border border-asra-border bg-asra-ivory/50 px-3 py-2 text-asra-dark focus:border-asra-gold focus:ring-1 focus:ring-asra-gold focus:outline-none transition-all"
                    >
                      <option>Initials Proofing &amp; Die Revision</option>
                      <option>Transit Status &amp; White-Glove Dispatch</option>
                      <option>Bulk Destination Hamper Sample Request</option>
                      <option>Damage, Replacement &amp; Vault Verification</option>
                      <option>GST Invoicing &amp; Billing Protocol</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-asra-muted font-semibold mb-1">
                      Support Instructions / Query
                    </label>
                    <textarea
                      rows={3}
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                      placeholder="Detail your request or event schedule change..."
                      className="w-full text-xs rounded border border-asra-border bg-asra-ivory/50 px-3 py-2 text-asra-dark focus:border-asra-gold focus:ring-1 focus:ring-asra-gold focus:outline-none transition-all placeholder:text-asra-muted/60"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-asra-gold hover:bg-asra-goldDark text-white py-2.5 rounded font-medium text-xs tracking-wider uppercase transition-colors shadow-sm"
                  >
                    Submit Support Ticket
                  </button>
                </form>
              )}
            </div>

            {/* CARD 3: Self-Service Collection Quick Tools */}
            <div className="bg-asra-cream/50 border border-asra-border rounded-xl p-6">
              <h4 className="font-serif-luxury text-lg font-medium text-asra-dark mb-3">
                Self-Service Collection Tools
              </h4>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <Link
                  href="/track-order"
                  className="flex flex-col p-3 rounded bg-white border border-asra-border hover:border-asra-gold transition-colors text-asra-dark group shadow-2xs"
                >
                  <span className="text-[10px] text-asra-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Truck className="w-3 h-3 text-asra-gold" />
                    <span>Live Transit</span>
                  </span>
                  <span className="font-medium group-hover:text-asra-gold flex items-center justify-between">
                    Track Docket →
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsVaultModalOpen(true)}
                  className="flex flex-col text-left p-3 rounded bg-white border border-asra-border hover:border-asra-gold transition-colors text-asra-dark group shadow-2xs"
                >
                  <span className="text-[10px] text-asra-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Archive className="w-3 h-3 text-asra-gold" />
                    <span>Archival</span>
                  </span>
                  <span className="font-medium group-hover:text-asra-gold flex items-center justify-between">
                    Brass Die Vault →
                  </span>
                </button>

                <Link
                  href="/return-policy"
                  className="flex flex-col p-3 rounded bg-white border border-asra-border hover:border-asra-gold transition-colors text-asra-dark group shadow-2xs"
                >
                  <span className="text-[10px] text-asra-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3 text-asra-gold" />
                    <span>Compliance</span>
                  </span>
                  <span className="font-medium group-hover:text-asra-gold flex items-center justify-between">
                    Refund Policy →
                  </span>
                </Link>

                <Link
                  href="/contact#salons"
                  className="flex flex-col p-3 rounded bg-white border border-asra-border hover:border-asra-gold transition-colors text-asra-dark group shadow-2xs"
                >
                  <span className="text-[10px] text-asra-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-asra-gold" />
                    <span>In-Person</span>
                  </span>
                  <span className="font-medium group-hover:text-asra-gold flex items-center justify-between">
                    Salon Booking →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. BOTTOM AUXILIARY PROTOCOL BAR (Minimal Docket Bar matching SCREEN_7)    */}
      {/* ========================================================================= */}
      <aside className="border-t border-asra-border bg-asra-ivory py-4 mt-12 text-xs text-asra-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Protocol Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-[11px] tracking-wide">
            <button
              type="button"
              onClick={() => setActiveProtocol('support')}
              className="hover:text-asra-dark transition-colors underline decoration-asra-border hover:decoration-asra-gold"
            >
              Support Protocols
            </button>
            <button
              type="button"
              onClick={() => setActiveProtocol('insurance')}
              className="hover:text-asra-dark transition-colors underline decoration-asra-border hover:decoration-asra-gold"
            >
              Transit Insurance Policy
            </button>
            <button
              type="button"
              onClick={() => setActiveProtocol('archival')}
              className="hover:text-asra-dark transition-colors underline decoration-asra-border hover:decoration-asra-gold"
            >
              Initials Brass Die Archival Terms
            </button>
            <button
              type="button"
              onClick={() => setActiveProtocol('privacy')}
              className="hover:text-asra-dark transition-colors underline decoration-asra-border hover:decoration-asra-gold"
            >
              Client NDA &amp; Privacy
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded border border-asra-border bg-white hover:bg-asra-champagne text-asra-dark text-xs flex items-center gap-1.5 font-medium transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-asra-gold" />
              <span>Download FAQ Docket (PDF)</span>
            </button>
            <Link
              href="/"
              className="px-4 py-1.5 rounded bg-asra-dark hover:bg-asra-charcoal text-white text-xs font-medium tracking-wide flex items-center gap-1 transition-colors shadow-xs"
            >
              <span>Return to Portal</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Copyright Subtext Ribbon matching SCREEN_7 bottom line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-3 border-t border-asra-border/40 flex flex-col sm:flex-row justify-between items-center text-[10px] text-asra-muted/80">
          <p>
            <strong className="tracking-widest font-serif-luxury text-asra-dark uppercase font-semibold">
              ASRA Wedding Canvas
            </strong>{' '}
            • Customized Collection Registry &amp; Vault Services
          </p>
          <p className="mt-1 sm:mt-0">
            © 2026 ASRA Private Limited. All customized designs, metallurgical dies, and covenants reserved.
          </p>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 4. MODALS: PROTOCOLS & BRASS DIE VAULT                                     */}
      {/* ========================================================================= */}
      {/* Protocol Annexure Modal */}
      {activeProtocol && PROTOCOLS_DATA[activeProtocol] && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-asra-border relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setActiveProtocol(null)}
              className="absolute top-4 right-4 text-asra-muted hover:text-asra-dark p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase font-bold tracking-widest text-asra-gold block mb-1">
              Collection Legal Protocol Ref: {PROTOCOLS_DATA[activeProtocol].ref}
            </span>
            <h3 className="font-serif-luxury text-2xl text-asra-dark font-semibold mb-4">
              {PROTOCOLS_DATA[activeProtocol].title}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-asra-muted leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {PROTOCOLS_DATA[activeProtocol].content.map((item, i) => (
                <div key={i} className="bg-asra-champagne/60 p-4 rounded-xl border border-asra-border/60">
                  <h4 className="font-semibold text-asra-dark mb-1 font-serif-luxury text-base">
                    {item.h}
                  </h4>
                  <p>{item.p}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-asra-border/60 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveProtocol(null)}
                className="px-5 py-2 bg-asra-dark hover:bg-asra-charcoal text-white rounded text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brass Die Vault Modal */}
      {isVaultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-asra-border relative animate-fadeIn">
            <button
              type="button"
              onClick={() => {
                setIsVaultModalOpen(false);
                setVaultResult(null);
                setVaultSearchId('');
              }}
              className="absolute top-4 right-4 text-asra-muted hover:text-asra-dark p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-asra-gold mb-1">
              <Archive className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-asra-gold">
                Hyderabad Metallurgy Archival Vault
              </span>
            </div>
            <h3 className="font-serif-luxury text-2xl text-asra-dark font-semibold mb-2">
              Brass Die Vault Verification
            </h3>
            <p className="text-xs text-asra-muted leading-relaxed mb-6">
              Search your order or wedding docket to confirm that your solid bronze metallurgy debossing plate is safely secured in our 5-year preservation vault.
            </p>

            <form onSubmit={handleVaultLookup} className="flex gap-2 mb-6">
              <input
                type="text"
                value={vaultSearchId}
                onChange={(e) => setVaultSearchId(e.target.value)}
                placeholder="Enter Docket ID (e.g. ASRA-2026-8842X)"
                className="flex-1 text-xs rounded border border-asra-border bg-asra-ivory/50 px-3 py-2 text-asra-dark focus:border-asra-gold focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                Verify
              </button>
            </form>

            {vaultResult && (
              <div
                className={`p-4 rounded-xl border text-xs ${
                  vaultResult.found
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                {vaultResult.found ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-bold text-emerald-900 border-b border-emerald-200/60 pb-1">
                      <span>{vaultResult.dieName}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Active</span>
                    </div>
                    <p><strong>Status:</strong> {vaultResult.status}</p>
                    <p><strong>Milling Date:</strong> {vaultResult.millingDate}</p>
                    <p><strong>Specification:</strong> {vaultResult.material}</p>
                    <p><strong>Retention Period:</strong> {vaultResult.vaultExpiry}</p>
                    <p><strong>Facility:</strong> {vaultResult.city}</p>
                  </div>
                ) : (
                  <p>{vaultResult.message}</p>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-asra-border/60 flex items-center justify-between text-[11px] text-asra-muted">
              <span>Try preset: <strong className="text-asra-dark">ASRA-2026-8842X</strong></span>
              <button
                type="button"
                onClick={() => {
                  setIsVaultModalOpen(false);
                  setVaultResult(null);
                  setVaultSearchId('');
                }}
                className="text-asra-dark hover:text-asra-gold font-medium uppercase"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqPage;
