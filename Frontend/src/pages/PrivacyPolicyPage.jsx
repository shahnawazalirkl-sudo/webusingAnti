import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Printer,
  Copy,
  Check,
  Calendar,
  FileCheck2,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Search,
  X,
  Send,
  EyeOff,
  Scale,
  Award,
  ExternalLink
} from 'lucide-react';

const CLAUSES = [
  {
    id: 'clause-1',
    articleNum: 'ARTICLE 01',
    category: 'Context & Legal Framework',
    title: 'Genesis, Custodianship & Scope of Collection',
    summary: 'Data custodianship for matrimonial milestones, heraldic monograms, and ceremony coordinates.',
    content: (
      <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-3.5">
        <p>
          ASRA Wedding Canvas Private Limited ("Maison ASRA", "we", "us", or "our") acts as the sovereign data custodian for all couples, wedding planners, royal patronages, and gift recipients engaging our bespoke services. We operate under the paramount tenet that matrimonial milestones, genealogical family crests, and personal ceremonial details belong exclusively to the commissioning couple.
        </p>
        <p>
          When commissioning bespoke bridal trousseaus, custom debossed leather suites, laser-engraved optical crystals, or destination gift boxes, we collect only the precision metadata strictly required to fulfill master craftsmanship:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-[#555555]">
          <li>
            <strong className="text-[#111111]">Couple &amp; Patron Coordinates:</strong> Full names, honorary titles, marital dates, private residence and atelier delivery addresses, phone/WhatsApp contact tokens.
          </li>
          <li>
            <strong className="text-[#111111]">Typographical &amp; Heraldic Assets:</strong> Vector initials, family monogram sketches, Latin and devanagari calligraphic charters, and bespoke wedding vows.
          </li>
          <li>
            <strong className="text-[#111111]">Ceremony Specifics:</strong> Venue coordinates (e.g. Villa Balbiano, Udaipur Lake Palace), banquet dates, and guest welcome hamper distribution registries.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'clause-2',
    articleNum: 'ARTICLE 02',
    category: 'Intellectual Property & Heraldry',
    title: 'Bespoke Heraldry, Family Crests & Design Assets',
    summary: 'Exclusive intellectual property rights and strict social media embargo policies.',
    content: (
      <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-3.5">
        <p>
          The artistic collaboration between the client and our Master Typographers entails the generation of proprietary vector files, 3D debossing relief proofs, and solid brass engraving toolpaths.
        </p>
        <div className="p-4 rounded-lg bg-[#FAF8F5] border-l-4 border-[#C5A059] space-y-2">
          <h4 className="font-bold text-[#111111] text-xs uppercase tracking-wide flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#C5A059]" />
            Client Sole Ownership Guarantee
          </h4>
          <p className="text-xs text-[#555555]">
            All bespoke monogram insignias and heraldic crests designed specifically for the couple remain the exclusive intellectual and aesthetic property of the couple. Maison ASRA will never re-use, resell, or license your commissioned family crest for any other patron.
          </p>
        </div>
        <p>
          <strong className="text-[#111111]">Photography &amp; Social Media Embargo:</strong> Maison ASRA strictly respects the ceremonial calendar. We will never post, publish, exhibit, or share photographic reproductions of your wedding hampers, vow books, or bridal trunks on social media, press features, or our website catalog prior to your official ceremony conclusion without prior written authorization.
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
      <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-3.5">
        <p>
          For bulk wedding commissions requiring individualized name personalization (e.g. customized leather luggage tags, monogrammed silk sleepwear, or individual welcome hampers for destination attendees), clients may provide attendee manifests.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <div className="p-3.5 rounded bg-[#F7F3EB]/60 border border-[#E6D7BA]">
            <span className="font-bold text-xs text-[#111111] block mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
              Strict Isolation
            </span>
            <span className="text-xs text-[#666666]">
              Guest manifests are partitioned in cryptographically isolated folders, accessible solely by the assigned lead production artisan.
            </span>
          </div>
          <div className="p-3.5 rounded bg-[#F7F3EB]/60 border border-[#E6D7BA]">
            <span className="font-bold text-xs text-[#111111] block mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              Automated Purging
            </span>
            <span className="text-xs text-[#666666]">
              Guest lists uploaded for laser engraving or calligraphy dispatch are permanently scrubbed 60 days following ceremonial delivery.
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
      <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-3.5">
        <p>
          Financial transactions for bespoke bridal commissions are handled with sovereign-level banking protocols:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-[#555555]">
          <li>
            <strong className="text-[#111111]">Zero Card Storage:</strong> Payment details (credit cards, UPI tokens, wire transfer origins) are processed directly via PCI-DSS Level 1 certified payment gateways. ASRA systems never store raw card numbers, CVVs, or bank security PINs.
          </li>
          <li>
            <strong className="text-[#111111]">Invoice Discretion:</strong> High-value wire transfers, corporate gifting dockets, and private royal commissions can be billed under non-descriptive luxury atelier nomenclatures upon request to preserve discretion.
          </li>
          <li>
            <strong className="text-[#111111]">24K Gold Leaf Authenticity Records:</strong> Serial numbers associated with your 24K gold certificates of authenticity are recorded in an encrypted offline register to safeguard your heirloom warranty.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'clause-5',
    articleNum: 'ARTICLE 05',
    category: 'Physical Master Die Storage',
    title: 'Physical Monogram Archival (5-Year Brass Die Vault)',
    summary: 'Climate-controlled foundry storage in Hyderabad with anonymous alphanumeric docketing.',
    content: (
      <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-3.5">
        <p>
          As a complimentary privilege of commissioning bespoke leather goods, your CNC-milled solid brass monogram debossing die (85mm × 85mm × 2.2mm relief) is archived in our climate-controlled Hyderabad foundry vault for five (5) complimentary years.
        </p>
        <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E8E4DC] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#111111] uppercase tracking-wide">Archival Security Protocol</span>
            <span className="text-[10px] font-mono text-[#C5A059] bg-[#F7F3EB] px-2 py-0.5 rounded border border-[#E6D7BA]">VAULT-HYD-SEC-22</span>
          </div>
          <p className="text-xs text-[#555555]">
            Physical master dies are cataloged under anonymous alphanumeric docket codes (e.g. #HYD-2026-ET). Only your verified Atelier Concierge can link the physical metal stamp to your client profile during milestone re-orders (anniversary gift books, holiday trousseaus, baby keepsakes).
          </p>
        </div>
        <p>
          Clients may at any time request the physical handover of their master brass die, shipped directly to their residence via climate-insured courier in an artisanal Indian Rosewood keepsake box.
        </p>
      </div>
    )
  },
  {
    id: 'clause-6',
    articleNum: 'ARTICLE 06',
    category: 'International Logistics',
    title: 'White-Glove Transit & International Customs',
    summary: 'Bonded air courier data exchange restricted purely to export compliance.',
    content: (
      <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-3.5">
        <p>
          For destination wedding consignments dispatched across Europe, the GCC, the United Kingdom, or the United States, we share requisite declarations with international customs authorities and our bonded air courier partners (DHL Luxury Express / FedEx Custom Critical).
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
      <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-3.5">
        <p>
          Under the Digital Personal Data Protection (DPDP) Act 2023 and the General Data Protection Regulation (GDPR), couples commissioning ASRA retain indelible rights regarding their personal and matrimonial metadata:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <div className="border border-[#E8E4DC] p-3.5 rounded-lg bg-white shadow-2xs hover:border-[#C5A059] transition-colors">
            <span className="text-xs font-bold text-[#111111] block mb-1">Right to Complete Redaction</span>
            <span className="text-xs text-[#666666]">
              Request the total permanent purging of digital CAD proofs, wedding dates, and contact logs from our systems.
            </span>
          </div>
          <div className="border border-[#E8E4DC] p-3.5 rounded-lg bg-white shadow-2xs hover:border-[#C5A059] transition-colors">
            <span className="text-xs font-bold text-[#111111] block mb-1">Right to Vector Portability</span>
            <span className="text-xs text-[#666666]">
              Download complete high-resolution AI/EPS/SVG vector assets of your commissioned family heraldry at any time.
            </span>
          </div>
          <div className="border border-[#E8E4DC] p-3.5 rounded-lg bg-white shadow-2xs hover:border-[#C5A059] transition-colors">
            <span className="text-xs font-bold text-[#111111] block mb-1">Right to Revoke Marketing</span>
            <span className="text-xs text-[#666666]">
              Opt out of milestone anniversary notices or private atelier salon invitations with a single tap.
            </span>
          </div>
          <div className="border border-[#E8E4DC] p-3.5 rounded-lg bg-white shadow-2xs hover:border-[#C5A059] transition-colors">
            <span className="text-xs font-bold text-[#111111] block mb-1">Right to Die Surrender</span>
            <span className="text-xs text-[#666666]">
              Request the decommissioning or physical dispatch of your custom brass stamping die at any milestone.
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
      <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-4">
        <p>
          To exercise your privacy prerogatives, register an NDA covenant for a destination royal celebration, or inquire regarding brass die vault status, contact our designated Data Protection Officer:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-lg bg-[#FAF8F5] border border-[#E6D7BA]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
              Data Governance Officer
            </span>
            <h4 className="font-serif text-base font-bold text-[#111111]">Taofique Alkhair Khan</h4>
            <p className="text-xs text-[#666666] mt-0.5">Head of Legal, Archival &amp; Client Confidentiality</p>
            <div className="mt-3 text-xs space-y-1 text-[#444444]">
              <div>
                <span className="font-medium text-[#111111]">Email:</span>{' '}
                <a href="mailto:shahnawazalirkl@gmail.com" className="text-[#C5A059] hover:underline font-medium">
                  shahnawazalirkl@gmail.com
                </a>
              </div>
              <div>
                <span className="font-medium text-[#111111]">Concierge Desk:</span>{' '}
                <a href="tel:+919692668263" className="hover:text-[#C5A059] transition-colors">
                  +91 96926 68263
                </a>
              </div>
            </div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-[#E8E4DC] pt-4 md:pt-0 md:pl-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
              Physical Foundry &amp; Registered Office
            </span>
            <p className="text-xs text-[#555555] leading-relaxed">
              ASRA Wedding Canvas Private Limited<br />
              Plot No. 36, Road No. 36, Jubilee Hills<br />
              Hyderabad, Telangana 500033, India<br />
              <span className="text-[#888888]">Attn: Data Protection Registry</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
];

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const [activeClauseId, setActiveClauseId] = useState('clause-1');
  const [copiedDocket, setCopiedDocket] = useState(false);
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

  // Safe back navigation handler
  const handleBackToMaison = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Copy Docket ID
  const handleCopyDocket = () => {
    navigator.clipboard.writeText('PRIV-ASRA-2026-V4');
    setCopiedDocket(true);
    setTimeout(() => setCopiedDocket(false), 2400);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // ScrollSpy using IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries) => {
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
  }, []);

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

  const handleNdaSubmit = (e) => {
    e.preventDefault();
    setNdaSubmitted(true);
    setTimeout(() => {
      const subject = encodeURIComponent(`Custom NDA Request: ${ndaForm.name} (${ndaForm.ceremonyDate || '2026'})`);
      const body = encodeURIComponent(
        `Dear Maison ASRA Concierge Legal Desk,\n\n` +
        `Client / Patron: ${ndaForm.name}\n` +
        `Role: ${ndaForm.role}\n` +
        `Phone: ${ndaForm.phone}\n` +
        `Ceremony Date: ${ndaForm.ceremonyDate}\n` +
        `Venue / Destination: ${ndaForm.venue}\n\n` +
        `Embargo & Discretion Requirements:\n${ndaForm.requirements}\n\n` +
        `Request Docket Generated via ASRA Client Sanctuary.\n`
      );
      window.location.href = `mailto:shahnawazalirkl@gmail.com?subject=${subject}&body=${body}`;
      setIsNdaModalOpen(false);
      setNdaSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1E1E] antialiased selection:bg-[#C5A059]/20 selection:text-[#111111]">
      
      {/* ================= TOP FOCUSED ATELIER UTILITY BAR (NO WEBSITE HEADER) ================= */}
      <header className="bg-white border-b border-[#E8E4DC] sticky top-0 z-40 transition-shadow duration-300 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Back action & Vault context */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToMaison}
              className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#666666] hover:text-[#C5A059] transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Maison</span>
            </button>
            <span className="hidden sm:inline-block w-px h-4 bg-[#E8E4DC]"></span>
            <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#888888]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Legal &amp; Client Trust Registry</span>
            </div>
          </div>

          {/* Center: Emblem Mark */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-[#FAF8F5] flex items-center justify-center shadow-2xs group-hover:border-[#C5A059] transition-colors">
              <span className="font-serif italic font-bold text-base text-[#C5A059]">AS</span>
            </div>
            <div className="text-center hidden md:block">
              <span className="font-serif tracking-widest uppercase font-semibold text-xs text-[#111111] block leading-tight">
                Maison ASRA
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                Bespoke Privacy Covenant
              </span>
            </div>
          </Link>

          {/* Right: Security Credentials & Direct Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded bg-[#F7F3EB] border border-[#E6D7BA] text-[10px] font-semibold tracking-wider text-[#916E2E] uppercase">
              <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>256-Bit Encrypted Vault Protocol</span>
            </div>
            
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-[#111111] border border-[#E8E4DC] hover:border-[#C5A059] hover:bg-white transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Print legal docket"
            >
              <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Print Docket</span>
              <span className="sm:hidden">Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO EDITORIAL TITLE & COVENANT SUMMARY ================= */}
      <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-b border-[#E8E4DC] bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5]">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F3EB] border border-[#E6D7BA] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#916E2E]">
              Maison Security, NDA &amp; Personal Data Governance
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-normal leading-[1.15] mb-4">
            Client Privacy Policy &amp; <br className="hidden sm:inline" />
            <span className="italic font-semibold text-[#C5A059]">Confidentiality Covenant</span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#666666] font-normal leading-relaxed mb-6">
            Every monogram die, wedding guest list, heraldic crest vector, and ceremonial date entrusted to ASRA Wedding Canvas is held under strict high-jewelry confidentiality standards. Herein lies our sovereign pledge to your privacy and metadata discretion.
          </p>

          {/* Key Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#555555]">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#111111]">Docket ID:</span>
              <button
                onClick={handleCopyDocket}
                className="font-mono text-[#C5A059] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                title="Click to copy Docket ID"
              >
                PRIV-ASRA-2026-V4
                {copiedDocket ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 inline" />
                ) : (
                  <Copy className="w-3 h-3 text-[#916E2E] inline opacity-60 hover:opacity-100" />
                )}
              </button>
              {copiedDocket && (
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                  Copied
                </span>
              )}
            </div>

            <span className="text-[#CCCCCC] hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#111111]">Effective Date:</span>
              <span>January 1, 2026</span>
            </div>

            <span className="text-[#CCCCCC] hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#111111]">Jurisdiction:</span>
              <span>India (DPDP Act 2023) &amp; GDPR Sovereign Compliance</span>
            </div>

            <span className="text-[#CCCCCC] hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-emerald-700 font-medium">Active Covenant</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3 TRUST PILLARS RIBBON ================= */}
      <section className="bg-white border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#FAF8F5] border border-[#F0EBE1] hover:border-[#E6D7BA] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#F7F3EB] border border-[#E6D7BA] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#111111]">Zero-Sale Promise</h3>
                <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                  We never sell, monetize, broker, or rent your bridal records, private guest addresses, or photographic assets to third-party advertisers.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#FAF8F5] border border-[#F0EBE1] hover:border-[#E6D7BA] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#F7F3EB] border border-[#E6D7BA] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#111111]">Physical &amp; Brass Vault Security</h3>
                <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                  Custom engraved CNC dies, wax seal crests, and vector CAD files are stored in climate-monitored, access-restricted Hyderabad vaults.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#FAF8F5] border border-[#F0EBE1] hover:border-[#E6D7BA] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#F7F3EB] border border-[#E6D7BA] flex items-center justify-center shrink-0">
                <EyeOff className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#111111]">VIP &amp; Celebrity Non-Disclosure</h3>
                <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                  For high-profile, diplomatic, or celebrity destination weddings, we sign customized mutual NDAs ensuring complete silence and embargoed release.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MAIN LEGAL CONTENT WITH STICKY NAVIGATION ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT SIDEBAR: STICKY CLAUSE INDEX & QUICK CONTACT */}
          <aside className="lg:col-span-4 space-y-6 print:hidden">
            <div className="bg-white p-6 rounded-xl border border-[#E8E4DC] shadow-2xs sticky top-24">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E4DC]">
                <h4 className="font-serif text-lg font-bold text-[#111111]">Covenant Clauses</h4>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A059] bg-[#FAF8F5] px-2.5 py-0.5 rounded border border-[#E6D7BA]">
                  8 Articles
                </span>
              </div>

              {/* Clause Search */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter clauses (e.g. brass, NDA, DPDP)..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-md text-[#111111] placeholder-[#999999] focus:outline-hidden focus:border-[#C5A059] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111]"
                  >
                    <X className="w-3.5 h-3.5" />
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
                      className={`flex items-center justify-between px-3 py-2 rounded-md font-medium transition-all group ${
                        isActive
                          ? 'bg-[#F7F3EB] text-[#C5A059] font-bold border-l-2 border-[#C5A059]'
                          : 'text-[#555555] hover:bg-[#F7F3EB] hover:text-[#C5A059]'
                      }`}
                    >
                      <span className="truncate pr-2">
                        {clause.articleNum.replace('ARTICLE ', '')}. {clause.title}
                      </span>
                      <span
                        className={`text-[#C5A059] transition-opacity shrink-0 ${
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
              <div className="mt-6 p-4 rounded-lg bg-[#111111] text-white shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                    Private Concierge Counsel
                  </span>
                </div>
                <p className="text-xs text-[#BBBBBB] leading-relaxed">
                  Require an executive Non-Disclosure Agreement (NDA) or custom data segregation protocol for your high-profile commission?
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                  <button
                    onClick={() => setIsNdaModalOpen(true)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-[#C5A059] hover:bg-[#B08B46] text-[#111111] text-xs font-bold transition-all text-center cursor-pointer shadow-xs active:scale-95"
                  >
                    Request Custom NDA Execution
                  </button>
                  <a
                    href="tel:+919692668263"
                    className="text-[10px] text-[#888888] text-center hover:text-[#C5A059] transition-colors"
                  >
                    Direct line: +91 96926 68263
                  </a>
                </div>
              </div>

              {/* Document Verification Stamp */}
              <div className="mt-6 p-3.5 rounded-lg border border-dashed border-[#C5A059]/60 bg-[#FAF8F5] text-center">
                <div className="text-[9px] uppercase tracking-widest text-[#888888]">
                  Cryptographic Seal of Authenticity
                </div>
                <div className="font-serif text-sm font-bold text-[#111111] mt-0.5">
                  ASRA Provenance Certified
                </div>
                <div className="text-[10px] font-mono text-[#C5A059] mt-1 flex items-center justify-center gap-1">
                  <span>SHA-256: 7f8a92b1...d408c</span>
                  <Award className="w-3 h-3 text-[#C5A059]" />
                </div>
              </div>

            </div>
          </aside>

          {/* RIGHT COLUMN: FULL LEGAL CLAUSES & ARTICLES */}
          <article className="lg:col-span-8 space-y-10">
            {filteredClauses.map((clause) => (
              <section
                key={clause.id}
                id={clause.id}
                className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E4DC] shadow-2xs scroll-mt-24 transition-all hover:border-[#D8CEBA]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#C5A059] px-2.5 py-1 bg-[#F7F3EB] rounded border border-[#E6D7BA]">
                    {clause.articleNum}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#888888]">
                    {clause.category}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-bold mb-4">
                  {clause.title}
                </h2>

                {clause.content}

                {/* Article 8 Action Buttons */}
                {clause.id === 'clause-8' && (
                  <div className="pt-4 flex flex-wrap items-center gap-3 print:hidden">
                    <a
                      href="mailto:shahnawazalirkl@gmail.com?subject=Privacy%20Data%20Request%20Docket%20-%20ASRA"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#C5A059] hover:bg-[#B08B46] text-[#111111] text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Initiate Privacy Request</span>
                    </a>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white hover:bg-[#FAF8F5] text-[#111111] border border-[#E8E4DC] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      <Printer className="w-4 h-4 text-[#C5A059]" />
                      <span>Download PDF Covenant</span>
                    </button>
                  </div>
                )}
              </section>
            ))}

            {filteredClauses.length === 0 && (
              <div className="bg-white p-12 rounded-xl border border-[#E8E4DC] text-center space-y-3">
                <Search className="w-8 h-8 text-[#888888] mx-auto opacity-50" />
                <h3 className="font-serif text-lg font-bold text-[#111111]">No matching clauses found</h3>
                <p className="text-xs text-[#666666]">
                  We couldn't find any articles matching "{searchQuery}". Try searching for terms like "die", "NDA", "embargo", or "GDPR".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center text-xs font-semibold text-[#C5A059] hover:underline pt-2"
                >
                  Clear search query
                </button>
              </div>
            )}
          </article>

        </div>
      </main>

      {/* ================= MINIMAL ATELIER DOCKET BAR (NO WEBSITE FOOTER) ================= */}
      <footer className="bg-white border-t border-[#E8E4DC] py-4 px-4 sm:px-6 lg:px-8 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#777777]">
          
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span className="font-semibold text-[#111111] uppercase tracking-wider">
              ASRA Wedding Canvas
            </span>
            <span>•</span>
            <span>Bespoke Client Privacy &amp; NDA Covenant</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline font-mono text-[#999999]">
              Vault Docket #PRIV-ASRA-2026-V4
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Encrypted Data Registry</span>
            </span>
            <span>•</span>
            <button
              onClick={handleBackToMaison}
              className="font-semibold text-[#111111] hover:text-[#C5A059] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Return to Portal &rarr;
            </button>
          </div>

        </div>
      </footer>

      {/* ================= INTERACTIVE NDA EXECUTION MODAL ================= */}
      {isNdaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in print:hidden">
          <div className="bg-white w-full max-w-lg rounded-xl border border-[#E6D7BA] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsNdaModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 text-[#888888] hover:text-[#111111] rounded-full hover:bg-[#FAF8F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#F7F3EB] border border-[#E6D7BA] flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block">
                  Private Salon Counsel
                </span>
                <h3 className="font-serif text-lg font-bold text-[#111111]">
                  Request Bespoke NDA Execution
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#666666] leading-relaxed mb-5">
              For high-profile, celebrity, or diplomatic matrimonial celebrations, we enter into bilateral non-disclosure agreements prior to reviewing wedding itineraries or master heraldic crests.
            </p>

            <form onSubmit={handleNdaSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#111111] mb-1">
                  Commissioning Patron or Lead Planner Name *
                </label>
                <input
                  type="text"
                  required
                  value={ndaForm.name}
                  onChange={(e) => setNdaForm({ ...ndaForm, name: e.target.value })}
                  placeholder="e.g. Asra Ansari / Mr. Sk Shahnawaz Ali"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4DC] rounded text-[#111111] focus:outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#111111] mb-1">
                    Direct Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={ndaForm.email}
                    onChange={(e) => setNdaForm({ ...ndaForm, email: e.target.value })}
                    placeholder="shahnawazalirkl@gmail.com"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4DC] rounded text-[#111111] focus:outline-hidden focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#111111] mb-1">
                    Private Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={ndaForm.phone}
                    onChange={(e) => setNdaForm({ ...ndaForm, phone: e.target.value })}
                    placeholder="+91 96926 68263"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4DC] rounded text-[#111111] focus:outline-hidden focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#111111] mb-1">
                    Ceremony Muhurat / Date
                  </label>
                  <input
                    type="text"
                    value={ndaForm.ceremonyDate}
                    onChange={(e) => setNdaForm({ ...ndaForm, ceremonyDate: e.target.value })}
                    placeholder="e.g. November 24, 2026"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4DC] rounded text-[#111111] focus:outline-hidden focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#111111] mb-1">
                    Destination Venue
                  </label>
                  <input
                    type="text"
                    value={ndaForm.venue}
                    onChange={(e) => setNdaForm({ ...ndaForm, venue: e.target.value })}
                    placeholder="e.g. Lake Como / Udaipur / St. Moritz"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4DC] rounded text-[#111111] focus:outline-hidden focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#111111] mb-1">
                  Special Embargo &amp; Secrecy Instructions
                </label>
                <textarea
                  rows="3"
                  value={ndaForm.requirements}
                  onChange={(e) => setNdaForm({ ...ndaForm, requirements: e.target.value })}
                  placeholder="e.g. Total social media embargo, custom packaging without exterior logos, or strict delivery to private airport terminal..."
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4DC] rounded text-[#111111] focus:outline-hidden focus:border-[#C5A059]"
                ></textarea>
              </div>

              <div className="p-3 rounded bg-[#FAF8F5] border border-[#E6D7BA] flex items-center gap-2 text-[11px] text-[#666666]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>
                  Our in-house legal counsel will counter-sign and return your bilateral NDA within 4 business hours.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNdaModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-semibold text-[#666666] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={ndaSubmitted}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded bg-[#C5A059] hover:bg-[#B08B46] text-[#111111] font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {ndaSubmitted ? (
                    <>
                      <Check className="w-4 h-4 animate-spin" />
                      <span>Generating Docket...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch NDA Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default PrivacyPolicyPage;
