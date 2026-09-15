import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  Sparkles,
  PackageCheck,
  CheckCircle2,
  Printer,
  ArrowRight,
  Phone,
  MessageCircle,
  FileText,
  Lock,
  X,
  Copy,
  Check,
  ChevronDown,
  Award,
  Archive,
  AlertTriangle,
  Building2,
  BadgeCheck
} from 'lucide-react';

const POLICY_ANNEXURES = {
  concierge: {
    title: 'Atelier Concierge Emergency Protocols',
    subtitle: 'Protocol Ref: ASRA-SOP-CONCIERGE-2026',
    content: [
      {
        heading: '1. Priority Escalation for Auspicious Dates',
        text: 'All bespoke orders linked to a certified muhurat date receive active monitoring from our dedicated bridal dispatch desk. If transit telemetry indicates any potential weather or logistics bottleneck, the contingency courier protocol is initiated 24 hours prior to the muhurat.'
      },
      {
        heading: '2. Dedicated Wedding Planner Handover',
        text: 'For destination ceremonies at designated partner palaces (Udaipur, Jaipur, Jodhpur, Mussoorie, Goa), our courier verifies the seal integrity with the lead event architect or family representative before logging completed delivery.'
      },
      {
        heading: '3. Immediate 24/7 Redressal',
        text: 'Our WhatsApp Concierge desk is staffed 24/7 during October–March peak auspicious cycles. Response time for active transit shipments is guaranteed within 8 minutes.'
      }
    ]
  },
  insurance: {
    title: 'White-Glove Transit Insurance Policy',
    subtitle: 'Underwritten by National Transit Underwriters • Policy #ASRA-TRANS-9921',
    content: [
      {
        heading: '1. 100% Comprehensive Coverage',
        text: 'Every shipment leaving our Hyderabad atelier travels with full transit insurance encompassing structural stress, glass/acrylic fractures, temperature deviations in chilled logistics vans, and water intrusion.'
      },
      {
        heading: '2. Zero-Deductible Replacement',
        text: 'In the event of qualifying transit damage, the patron incurs zero deductibles or processing charges. ASRA finances the entire re-casting, re-engraving, and express courier dispatch.'
      },
      {
        heading: '3. Claim Window & Photographic Proof',
        text: 'Claims must be lodged within 24 hours of documented white-glove arrival via WhatsApp with two high-resolution photographs illustrating the seal and affected goods.'
      }
    ]
  },
  archival: {
    title: 'Monogram Brass Die Archival & Vault Terms',
    subtitle: 'Metallurgy Vault Facility • Hyderabad Atelier Division',
    content: [
      {
        heading: '1. 5-Year Complimentary Archival',
        text: 'Every custom 3D CNC-machined brass monogram debossing die is catalogued and stored in our climate-controlled archival vault for a minimum of 5 years following initial order fulfillment.'
      },
      {
        heading: '2. Anniversary Re-order Benefit',
        text: 'Because your custom metallurgical die is preserved, future keepsake editions, anniversary invitations, and bespoke correspondence suites are discounted by ₹1,500 across all catalog collections.'
      },
      {
        heading: '3. Physical Die Possession Request',
        text: 'Patrons may request release and physical home delivery of their engraved brass die at any time. The die is polished, oiled, and dispatched in a handcrafted Indian Rosewood presentation case.'
      }
    ]
  },
  confidentiality: {
    title: 'Client Privacy & Bespoke NDA Covenant',
    subtitle: 'Strict High-Net-Worth & Celebrity Bridal Privacy Protocol',
    content: [
      {
        heading: '1. Embargo on Public Previews',
        text: 'No photographs, proof mocks, calligraphy drafts, or guest rosters will ever be showcased on ASRA social channels, digital portfolios, or print collateral before the conclusion of your wedding celebrations.'
      },
      {
        heading: '2. Secure Digital CAD Vaulting',
        text: 'All vector artwork, personal signatures, custom heraldic monograms, and wedding date dockets are encrypted with 256-bit AES protocols and restricted to certified master engravers.'
      },
      {
        heading: '3. Complete Post-Event Archival Choice',
        text: 'Clients may request permanent redaction or physical purging of their guest addresses, RSVP rosters, and personal calligraphy dies upon delivery verification.'
      }
    ]
  }
};

const ReturnPolicyPage = () => {
  const navigate = useNavigate();
  const [copiedProtocol, setCopiedProtocol] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeModalKey, setActiveModalKey] = useState(null);

  // Auto-dismiss copy notification
  useEffect(() => {
    if (copiedProtocol) {
      const timer = setTimeout(() => setCopiedProtocol(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copiedProtocol]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModalKey) {
        setActiveModalKey(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalKey]);

  const copyProtocolReference = () => {
    navigator.clipboard.writeText('ASRA-POL-BESPOKE-2026');
    setCopiedProtocol(true);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2724] font-sans antialiased selection:bg-[#EADBCE] selection:text-[#3B2C1A]">
      
      {/* DISTRACTION-FREE MINIMAL TOP UTILITY BAR (No standard Header) */}
      <header className="w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EDE6DD] sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Back / Breadcrumb Navigation */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2.5 text-xs tracking-wider uppercase font-medium text-[#7C6E63] hover:text-[#1F1915] transition-colors group cursor-pointer focus:outline-none"
            aria-label="Return to Atelier Portal"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Return to Atelier Portal</span>
          </button>

          {/* Centered ASRA Crest Logo */}
          <div className="flex items-center justify-center">
            <Link to="/" title="ASRA Wedding Canvas Home">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1OqBL8eA5LuUt8BZT1BNuBW0emy3mBR8REAKr35BPOlVbP7dgcDLfWmNRTD5JfN-8aIEGLUv7sw0mnFEeyLIjVto0Gm8OBcz27T_9jmJFPdUSqtCGmBtpOlVBCA3HDzGvfPbZBs6nttmNhBEOp4ShUn-KlkGqLJAH-fEHLB7dBZcz9Nc_oS-tQhOTSxd_67TuhiO8EsomkWJE8jkUwIC0qTfe8snSRy4qxGxrm-uNSvMgMkcRSImfKb3J6xFATvnw1Yw"
                alt="ASRA Wedding Canvas Crest Logo"
                className="h-11 w-auto object-contain drop-shadow-sm hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Live Trust & Compliance Status */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#2E6B47] bg-[#EFF8F2] px-3.5 py-1.5 rounded-full border border-[#CEEBD9]">
              <span className="w-2 h-2 rounded-full bg-[#2E6B47] animate-pulse"></span>
              <span>Legal Protocol Validated</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#8A7968] font-medium">
              <Lock className="w-4 h-4 text-[#C5A059]" />
              <span className="tracking-wide hidden sm:inline">Consumer Rights Act &amp; Die Vault Policy</span>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN EDITORIAL CONTENT */}
      <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-12 pb-24">
        
        {/* Hero Docket Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-gold text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <span>✦</span>
            <span>Atelier Bespoke Covenant &amp; Keepsake Guarantee</span>
            <span>✦</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-serif text-[#231B15] tracking-tight mb-4">
            Return &amp; Refund Policy for Bespoke Goods
          </h1>
          
          <p className="text-base text-[#6E6053] leading-relaxed font-normal max-w-2xl mx-auto">
            Due to the individual metallurgy casting, custom copperplate calligraphy, and temperature-stabilized floral infusions, every ASRA creation is uniquely commissioned. Here is our transparent protocol.
          </p>
          
          {/* Metadata Bar */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-[#8C7A6B] pt-4 border-t border-[#EDE4D8]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#4A3C30]">Protocol Reference:</span>
              <button
                onClick={copyProtocolReference}
                className="inline-flex items-center gap-1.5 font-mono bg-[#F2EDE5] hover:bg-[#EAE2D7] px-2 py-0.5 rounded text-[#3D3126] transition-colors cursor-pointer group"
                title="Click to copy protocol reference"
              >
                <span>ASRA-POL-BESPOKE-2026</span>
                {copiedProtocol ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#8C7A6B] group-hover:text-[#3D3126]" />
                )}
              </button>
              {copiedProtocol && (
                <span className="text-[11px] text-emerald-700 font-medium">Copied!</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#4A3C30]">Governing Jurisdiction:</span>
              <span>Bespoke Handcrafted Luxury Standards (India)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#4A3C30]">Effective Cycle:</span>
              <span>2026 / 2027 Wedding Season</span>
            </div>
          </div>
        </div>

        {/* QUICK REFERENCE EXECUTIVE MATRIX (4 Key Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE3D7] card-shadow text-center flex flex-col items-center hover:border-[#D8C7B2] transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#A67C37] flex items-center justify-center mb-3 border border-[#E8DCCB]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#251C15] mb-1">Pre-Casting Window</h3>
            <p className="text-xs font-semibold text-[#2E6B47] mb-2">100% Full Refund (2h)</p>
            <p className="text-[12px] text-[#786A5E] leading-snug">
              Cancel or modify free of charge before the 3D solid brass die metal casting begins.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE3D7] card-shadow text-center flex flex-col items-center hover:border-[#D8C7B2] transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#A67C37] flex items-center justify-center mb-3 border border-[#E8DCCB]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#251C15] mb-1">Digital Proof Guarantee</h3>
            <p className="text-xs font-semibold text-[#B37418] mb-2">3 Free Revisions</p>
            <p className="text-[12px] text-[#786A5E] leading-snug">
              Unlimited monogram adjustments and 3 calligraphy script reviews on WhatsApp before deboss.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE3D7] card-shadow text-center flex flex-col items-center hover:border-[#D8C7B2] transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#A67C37] flex items-center justify-center mb-3 border border-[#E8DCCB]">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#251C15] mb-1">Transit Protection</h3>
            <p className="text-xs font-semibold text-[#2E6B47] mb-2">100% Remake &amp; Express Air</p>
            <p className="text-[12px] text-[#786A5E] leading-snug">
              Any breakage or floral wilting in white-glove transit replaced within 24–48 hours at zero cost.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE3D7] card-shadow text-center flex flex-col items-center hover:border-[#D8C7B2] transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#A67C37] flex items-center justify-center mb-3 border border-[#E8DCCB]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#251C15] mb-1">Brass Die Vaulting</h3>
            <p className="text-xs font-semibold text-[#7D5A2B] mb-2">Permanent Heirloom</p>
            <p className="text-[12px] text-[#786A5E] leading-snug">
              Your custom cast metal die is preserved in our vault for 5 years for instant lifetime anniversary reorders.
            </p>
          </div>

        </div>

        {/* MAIN POLICY SECTIONS (Two Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Detailed Articles (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Clause 1: Bespoke Nature & Commissioning Principle */}
            <article className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE3D7] card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#292019] text-[#EFE7DE] flex items-center justify-center text-xs font-bold font-serif">
                  I
                </span>
                <h2 className="text-xl font-serif text-[#231B15] font-semibold">
                  The Nature of Custom &amp; Bespoke Commissions
                </h2>
              </div>
              
              <p className="text-sm text-[#5C4F44] leading-relaxed mb-4">
                Under international consumer statutory codes and Indian bespoke crafting conventions, personalized goods manufactured to client specifications are exempt from standard retail change-of-mind return rights. At ASRA Wedding Canvas, this applies to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#ECE2D5] text-xs text-[#524438]">
                  <span className="font-semibold text-[#2F241C] block mb-1">✦ 3D CNC-Milled Brass Monogram Dies</span>
                  Custom metallurgical dies machined with the couple's personal initials, heraldic crest, or ceremony date.
                </div>
                <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#ECE2D5] text-xs text-[#524438]">
                  <span className="font-semibold text-[#2F241C] block mb-1">✦ Hand-Drawn Copperplate Calligraphy</span>
                  Hand-lettered vellum envelopes, deckle-edge vows, and bespoke wax-sealed greeting cards.
                </div>
                <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#ECE2D5] text-xs text-[#524438]">
                  <span className="font-semibold text-[#2F241C] block mb-1">✦ Cryo-Hydrated Botanical Curations</span>
                  Dawn-harvested Parisian roses, fresh eucalyptus, and organic botanical infusions formulated for wedding timelines.
                </div>
                <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#ECE2D5] text-xs text-[#524438]">
                  <span className="font-semibold text-[#2F241C] block mb-1">✦ Debossed Velvet Keepsake Vaults</span>
                  Silk velvet double ring boxes, trousseau trunks, and mangalsutra vaults hot-stamped with genuine 24k gold leaf.
                </div>
              </div>

              <p className="text-xs text-[#7A6B5D] italic border-l-2 border-[#C5A059] pl-3 py-1">
                "Once a custom brass die is cast in molten metal or personalized calligraphy is inked, the raw material transformation cannot be reversed or resold to another patron."
              </p>
            </article>

            {/* Clause 2: Cancellation Windows & Refund Schedules */}
            <article className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE3D7] card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#292019] text-[#EFE7DE] flex items-center justify-center text-xs font-bold font-serif">
                  II
                </span>
                <h2 className="text-xl font-serif text-[#231B15] font-semibold">
                  Tiered Cancellation Windows &amp; Refund Schedulers
                </h2>
              </div>

              <p className="text-sm text-[#5C4F44] leading-relaxed mb-5">
                We understand wedding planning itineraries occasionally shift. We provide a fair, phased refund policy based on your order’s progression in our Hyderabad atelier:
              </p>

              <div className="space-y-4">
                
                {/* Tier 1 */}
                <div className="p-4 rounded-xl border border-[#D5ECD9] bg-[#F7FBF8]">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#E1F4E6] text-[#245C3B] mb-1">
                        Stage 01 • Immediate (Within 2 Hours)
                      </span>
                      <h4 className="text-sm font-semibold text-[#1C3E2A]">Pre-Production &amp; Pre-Casting Phase</h4>
                      <p className="text-xs text-[#486B56] mt-1">
                        If you notify our Concierge via WhatsApp or Phone within 2 hours of checkout before the digital vector CAD file is transferred to the CNC brass foundry.
                      </p>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between items-baseline sm:items-end pt-1 sm:pt-0 border-t sm:border-t-0 border-[#D5ECD9]/50">
                      <span className="text-sm font-bold text-[#1F5434]">100% REFUND</span>
                      <span className="block text-[11px] text-[#4F735D]">Instant reversal to original method</span>
                    </div>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="p-4 rounded-xl border border-[#F2E8D8] bg-[#FCFBF8]">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#F7EDDE] text-[#82561F] mb-1">
                        Stage 02 • Digital Proof Review (2h – 12h)
                      </span>
                      <h4 className="text-sm font-semibold text-[#3D2D1B]">Die Blueprint Created, But Prior to Hot Stamping</h4>
                      <p className="text-xs text-[#6E5B49] mt-1">
                        If the brass die has already entered metallurgy milling, you may cancel the hamper, confections, and trousseau trunks. You retain ownership of the custom physical brass die.
                      </p>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between items-baseline sm:items-end pt-1 sm:pt-0 border-t sm:border-t-0 border-[#F2E8D8]/50">
                      <span className="text-sm font-bold text-[#82561F]">80% REFUND</span>
                      <span className="block text-[11px] text-[#8C755E]">Less ₹1,500 Brass Die Casting Fee</span>
                    </div>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="p-4 rounded-xl border border-[#EFE5E5] bg-[#FDF9F9]">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#FCE8E8] text-[#882D2D] mb-1">
                        Stage 03 • Post-Crafting &amp; Botanical Assembly (After 12h)
                      </span>
                      <h4 className="text-sm font-semibold text-[#441C1C]">Assembly Completed or In Transit</h4>
                      <p className="text-xs text-[#7B4F4F] mt-1">
                        Once hot foil debossing, fresh dawn floral insertion, and wax sealing are finalized, orders cannot be cancelled or refunded as goods are fully tailored.
                      </p>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between items-baseline sm:items-end pt-1 sm:pt-0 border-t sm:border-t-0 border-[#EFE5E5]/50">
                      <span className="text-sm font-bold text-[#882D2D]">NO CASH REFUND</span>
                      <span className="block text-[11px] text-[#7B4F4F]">White-Glove Delivery Guaranteed</span>
                    </div>
                  </div>
                </div>

              </div>
            </article>

            {/* Clause 3: Replacement Guarantee for Transit Damaged Goods */}
            <article className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE3D7] card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#292019] text-[#EFE7DE] flex items-center justify-center text-xs font-bold font-serif">
                  III
                </span>
                <h2 className="text-xl font-serif text-[#231B15] font-semibold">
                  100% White-Glove Transit &amp; Defect Warranty
                </h2>
              </div>

              <p className="text-sm text-[#5C4F44] leading-relaxed mb-4">
                While custom products are non-returnable for aesthetic reconsideration, <strong className="text-[#2B211A]">ASRA Wedding Canvas assumes 100% comprehensive liability for physical transit damage, typographical errors on our part, or biological floral defects.</strong>
              </p>

              <div className="bg-[#FAF7F2] rounded-xl p-5 border border-[#ECE2D4] mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#70583E] mb-3">
                  Qualifying Protocols for Immediate Complimentary Remake:
                </h3>
                <ul className="space-y-2.5 text-xs text-[#5A4C40]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#2E6B47] font-bold text-sm">✓</span>
                    <span>
                      <strong>Typographical Discrepancy:</strong> If the debossed letters or calligraphy do not match the digital proof confirmed by the client or designated wedding planner on WhatsApp.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#2E6B47] font-bold text-sm">✓</span>
                    <span>
                      <strong>Floral Hydration Compromise:</strong> If fresh roses or botanical elements suffer shock, wilting, or temperature-control failure during chilled van transit.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#2E6B47] font-bold text-sm">✓</span>
                    <span>
                      <strong>Structural Damage:</strong> Any cracked crystal toasting flutes, dented keepsake trunks, or ruptured wax seals reported within 24 hours of palatial delivery.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Rapid Resolution Timeline */}
              <div className="border-t border-[#EFE6DC] pt-4">
                <h4 className="text-xs font-semibold text-[#292019] mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#A67C37]" />
                  <span>Our 24-Hour Emergency Protocol:</span>
                </h4>
                <p className="text-xs text-[#6A5A4D] leading-relaxed">
                  If an issue is reported before your wedding ceremony, our emergency atelier team activates express remake protocol. Replacement units are hand-carried by air or dispatched via priority express to your resort or bridal suite before the twilight auspicious hour.
                </p>
              </div>
            </article>

            {/* Clause 4: Step-by-Step Claim Procedure */}
            <article className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE3D7] card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#292019] text-[#EFE7DE] flex items-center justify-center text-xs font-bold font-serif">
                  IV
                </span>
                <h2 className="text-xl font-serif text-[#231B15] font-semibold">
                  Concierge Claim &amp; Replacement Procedure
                </h2>
              </div>

              <p className="text-sm text-[#5C4F44] leading-relaxed mb-6">
                To register a damage report or request authorization for replacement, please follow our rapid 3-step concierge process:
              </p>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2D6C7]">
                
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#C5A059] border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D231B]">
                    Step 01 • Instant WhatsApp Photographic Audit
                  </h4>
                  <p className="text-xs text-[#63554A] mt-1 leading-relaxed">
                    Take 2 clear photographs of the defect/damage alongside the serial badge on the hamper. Send directly to our Dedicated Wedding Concierge WhatsApp at{' '}
                    <a href="tel:+919692668263" className="font-semibold text-[#93662B] hover:underline">
                      +91 96926 68263
                    </a>{' '}
                    referencing your Atelier Order ID (e.g., <code className="bg-[#F3EFE9] px-1.5 py-0.5 rounded text-[#2E241C]">ASRA-2026-8842X</code>).
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#C5A059] border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D231B]">
                    Step 02 • Master Artisan Review (Under 45 Minutes)
                  </h4>
                  <p className="text-xs text-[#63554A] mt-1 leading-relaxed">
                    Our Senior Stylist and Quality Director verify the discrepancy against your vaulted digital monogram proof and sensor temperature logs from the white-glove transit van.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#C5A059] border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D231B]">
                    Step 03 • Fast-Track Remake or Instant Settlement
                  </h4>
                  <p className="text-xs text-[#63554A] mt-1 leading-relaxed">
                    Upon verification, a priority remake slot is staged immediately. If replacement cannot be delivered prior to your wedding ceremony date, an immediate 100% full refund is issued directly via UPI/Original Card within 2–4 hours.
                  </p>
                </div>

              </div>
            </article>

          </div>

          {/* Right Sidebar: Quick Contact, Monogram Vault FAQs & Official Seal */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Live Concierge Direct Desk */}
            <div className="bg-[#241D18] text-[#F5EDE3] p-7 rounded-2xl border border-[#3E342B] shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#352B24] border border-[#C5A059]/40 flex items-center justify-center text-[#DFBD76]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-[#F3EBE0]">Atelier Stylist Hotline</h3>
                  <p className="text-[11px] text-[#BCAAA4]">Instant Resolution for Wedding Planners</p>
                </div>
              </div>

              <p className="text-xs text-[#C8BCB0] leading-relaxed mb-5">
                Need urgent alterations to names, event dates, or delivery suite coordinates before metal casting? Our stylists are available 24/7 during wedding peak seasons.
              </p>

              <a
                href="https://wa.me/919692668263?text=Hello%20ASRA%20Atelier,%20I%20have%20an%20urgent%20inquiry%20regarding%20my%20bespoke%20order%20covenant."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5B] text-white font-medium text-xs py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Chat with Lead Stylist on WhatsApp</span>
              </a>

              <div className="mt-4 pt-4 border-t border-[#3A2F26] flex items-center justify-between text-[11px] text-[#A8988B]">
                <span>Average response: &lt; 8 mins</span>
                <span className="text-[#DFBD76] font-medium">Direct Line: +91 96926 68263</span>
              </div>
            </div>

            {/* Hallmark & Metallurgy Preservation Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#EBE3D7] card-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#FAF4ED] text-[#C5A059]">
                  <Archive className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-[#251C15]">Physical Die Vault Service</h3>
              </div>
              
              <p className="text-xs text-[#6A5B4F] leading-relaxed mb-4">
                Even if a client cancels other elements of a trousseau order, your engineered 3D Brass Monogram Die is never destroyed. It remains safely archived in our humidity-controlled Hyderabad Vault.
              </p>

              <div className="bg-[#F8F5F0] rounded-xl p-3.5 border border-[#EDE2D3] text-[11px] space-y-2 text-[#54463A]">
                <div className="flex justify-between items-center">
                  <span className="text-[#847464]">Vault Retention:</span>
                  <span className="font-semibold text-[#2D2319]">5 Years Complimentary</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#847464]">Subsequent Re-order Discount:</span>
                  <span className="font-semibold text-[#2E6B47]">Save ₹1,500 on all future suites</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#847464]">Home Delivery of Physical Die:</span>
                  <span className="font-semibold text-[#8C6228]">Available in luxury rosewood box</span>
                </div>
              </div>
            </div>

            {/* Frequently Asked Legal & Protocol Questions (Accordion) */}
            <div className="bg-white rounded-2xl p-6 border border-[#EBE3D7] card-shadow">
              <h3 className="font-serif text-base font-semibold text-[#251C15] mb-4 flex items-center gap-2">
                <span>Frequently Asked Inquiries</span>
              </h3>

              <div className="space-y-3">
                
                {/* FAQ 1 */}
                <div className="border-b border-[#F0E8DD] pb-3">
                  <button
                    onClick={() => toggleFaq(0)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-[#2B2017] hover:text-[#93662B] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>What if our wedding date is postponed?</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A67C37] transition-transform duration-200 ${
                        activeFaq === 0 ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`text-[12px] text-[#6A5A4D] leading-relaxed transition-all duration-200 overflow-hidden ${
                      activeFaq === 0 ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    Notify us at least 7 days before dispatched date. We will hold your unprinted trousseau components and fresh floral arrangement schedules without penalty for up to 90 days.
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-[#F0E8DD] pb-3">
                  <button
                    onClick={() => toggleFaq(1)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-[#2B2017] hover:text-[#93662B] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>Can I exchange for another color palette?</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A67C37] transition-transform duration-200 ${
                        activeFaq === 1 ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`text-[12px] text-[#6A5A4D] leading-relaxed transition-all duration-200 overflow-hidden ${
                      activeFaq === 1 ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    Palette changes (e.g., from <em>Classic Blush</em> to <em>Royal Emerald</em>) are permitted during the WhatsApp digital proof approval stage before hot-stamping.
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="pb-1">
                  <button
                    onClick={() => toggleFaq(2)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-[#2B2017] hover:text-[#93662B] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>How are bulk favor returns handled?</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A67C37] transition-transform duration-200 ${
                        activeFaq === 2 ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`text-[12px] text-[#6A5A4D] leading-relaxed transition-all duration-200 overflow-hidden ${
                      activeFaq === 2 ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    For destination orders over 25+ suites, 5% surplus buffer items are included automatically for on-site palace replacements.
                  </div>
                </div>

              </div>
            </div>

            {/* Legal Hallmark Badge */}
            <div className="p-5 rounded-2xl border border-[#E3D6C5] bg-gradient-to-br from-[#FAF6F0] to-[#F3ECE0] text-center">
              <div className="inline-block p-2 bg-white rounded-full shadow-sm mb-2">
                <Award className="w-6 h-6 text-[#A07736]" />
              </div>
              <h4 className="font-serif text-xs font-bold text-[#2A2016] uppercase tracking-wider mb-1">
                ASRA Quality Hallmark
              </h4>
              <p className="text-[11px] text-[#6B5A4D] leading-snug">
                Protected under 24k Gold Authenticity Standard, Bureau of Indian Standards (BIS) &amp; White-Glove Transit Insurance.
              </p>
            </div>

          </aside>

        </div>

        {/* Related Navigation Links & Actions */}
        <div className="mt-16 pt-8 border-t border-[#EAE1D4] flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs text-[#706052]">
            <button
              onClick={() => setActiveModalKey('concierge')}
              className="hover:text-[#1F1915] underline decoration-[#D0C2B0] underline-offset-4 cursor-pointer focus:outline-none"
            >
              Concierge Protocols
            </button>
            <button
              onClick={() => setActiveModalKey('insurance')}
              className="hover:text-[#1F1915] underline decoration-[#D0C2B0] underline-offset-4 cursor-pointer focus:outline-none"
            >
              Transit Insurance Policy
            </button>
            <button
              onClick={() => setActiveModalKey('archival')}
              className="hover:text-[#1F1915] underline decoration-[#D0C2B0] underline-offset-4 cursor-pointer focus:outline-none"
            >
              Monogram Brass Die Archival terms
            </button>
            <button
              onClick={() => setActiveModalKey('confidentiality')}
              className="hover:text-[#1F1915] underline decoration-[#D0C2B0] underline-offset-4 cursor-pointer focus:outline-none"
            >
              Confidentiality Agreement
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DCD0C0] text-xs font-medium text-[#46382C] hover:bg-[#F8F4EE] transition-colors card-shadow cursor-pointer"
              title="Print official policy docket"
            >
              <Printer className="w-4 h-4 text-[#7A695B]" />
              <span>Print Policy Docket</span>
            </button>
            
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#231B15] hover:bg-[#382C22] text-xs font-medium text-[#FAF5EF] transition-colors shadow-sm cursor-pointer"
            >
              <span>Acknowledge &amp; Return</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      {/* MINIMAL COPYRIGHT LEGAL BAR (No full footer) */}
      <footer className="border-t border-[#EBE2D5] bg-[#F5EFE6] py-5 print:hidden">
        <div className="max-w-7xl mx-auto px-6 text-center text-[11px] text-[#867566] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2 font-cinzel tracking-widest text-[#403328] font-semibold">
            <span>ASRA WEDDING CANVAS</span>
            <span>•</span>
            <span className="font-sans font-normal tracking-normal text-[#6A5A4D]">Bespoke Atelier Registry &amp; Vault Services</span>
          </div>
          <div>
            © 2026 ASRA Private Limited. All bespoke designs, metallurgical dies, and covenants reserved.
          </div>
        </div>
      </footer>

      {/* MODAL DIALOG FOR POLICY ANNEXURES */}
      {activeModalKey && POLICY_ANNEXURES[activeModalKey] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveModalKey(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-[#E8DFC9] shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalKey(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-[#7B6A5B] hover:text-[#231B15] hover:bg-[#FAF4EB] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#F8F3EA] text-[#8C6228] border border-[#DFCEB9] mb-2">
                Official Atelier Annexure
              </span>
              <h3 className="text-xl font-serif text-[#231B15] font-semibold">
                {POLICY_ANNEXURES[activeModalKey].title}
              </h3>
              <p className="text-xs text-[#8C7A6B] font-mono mt-0.5">
                {POLICY_ANNEXURES[activeModalKey].subtitle}
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#52453B] leading-relaxed">
              {POLICY_ANNEXURES[activeModalKey].content.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EDE2D4]">
                  <h4 className="font-semibold text-[#2C2117] mb-1">
                    {item.heading}
                  </h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#EFE5D8] flex items-center justify-between">
              <span className="text-[11px] text-[#867566]">
                Binding under ASRA Bespoke Covenant 2026
              </span>
              <button
                onClick={() => setActiveModalKey(null)}
                className="px-4 py-1.5 rounded-lg bg-[#231B15] text-[#FAF5EF] text-xs font-medium hover:bg-[#382C22] transition-colors cursor-pointer"
              >
                Close Annexure
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReturnPolicyPage;
