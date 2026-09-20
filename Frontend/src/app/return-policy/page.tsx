"use client";
import Image from "next/image";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import Link from 'next/link';

const POLICY_ANNEXURES = {
  support: {
    title: 'Collection Support Emergency Protocols',
    subtitle: 'Protocol Ref: ASRA-SOP-SUPPORT-2026',
    content: [
      {
        heading: '1. Priority Escalation for Auspicious Dates',
        text: 'All customized orders linked to a certified muhurat date receive active monitoring from our dedicated bridal shipping desk. If delivery telemetry indicates any potential weather or logistics bottleneck, the contingency courier protocol is initiated 24 hours prior to the muhurat.'
      },
      {
        heading: '2. Dedicated Wedding Planner Handover',
        text: 'For destination ceremonies at designated partner palaces (Udaipur, Jaipur, Jodhpur, Mussoorie, Goa), our courier verifies the seal integrity with the lead event architect or family representative before logging completed delivery.'
      },
      {
        heading: '3. Immediate 24/7 Redressal',
        text: 'Our WhatsApp Support desk is staffed 24/7 during October–March peak auspicious cycles. Response time for active delivery shipments is guaranteed within 8 minutes.'
      }
    ]
  },
  insurance: {
    title: 'White-Glove Delivery Insurance Policy',
    subtitle: 'Underwritten by National Delivery Underwriters • Policy #ASRA-TRANS-9921',
    content: [
      {
        heading: '1. 100% Comprehensive Coverage',
        text: 'Every shipment leaving our Hyderabad collection travels with full delivery insurance encompassing structural stress, glass/acrylic fractures, temperature deviations in chilled logistics vans, and water intrusion.'
      },
      {
        heading: '2. Zero-Deductible Replacement',
        text: 'In the event of qualifying delivery damage, the patron incurs zero deductibles or processing charges. ASRA finances the entire re-casting, re-engraving, and express courier shipping.'
      },
      {
        heading: '3. Claim Window & Photographic Proof',
        text: 'Claims must be lodged within 24 hours of documented white-glove arrival via WhatsApp with two high-resolution photographs illustrating the seal and affected goods.'
      }
    ]
  },
  archival: {
    title: 'Initials Brass Die Archival & Vault Terms',
    subtitle: 'Metallurgy Vault Facility • Hyderabad Collection Division',
    content: [
      {
        heading: '1. 5-Year Complimentary Archival',
        text: 'Every custom 3D CNC-machined brass initials debossing die is catalogued and stored in our climate-controlled archival vault for a minimum of 5 years following initial order fulfillment.'
      },
      {
        heading: '2. Anniversary Re-order Benefit',
        text: 'Because your custom metallurgical die is preserved, future gift editions, anniversary invitations, and customized correspondence suites are discounted by ₹1,500 across all catalog collections.'
      },
      {
        heading: '3. Physical Die Possession Request',
        text: 'Patrons may request release and physical home delivery of their engraved brass die at any time. The die is polished, oiled, and shipped in a handcrafted Indian Rosewood presentation case.'
      }
    ]
  },
  confidentiality: {
    title: 'Client Privacy & Customized NDA Covenant',
    subtitle: 'Strict High-Net-Worth & Celebrity Bridal Privacy Protocol',
    content: [
      {
        heading: '1. Embargo on Public Previews',
        text: 'No photographs, proof mocks, calligraphy drafts, or guest rosters will ever be showcased on ASRA social channels, digital portfolios, or print collateral before the conclusion of your wedding celebrations.'
      },
      {
        heading: '2. Secure Digital CAD Vaulting',
        text: 'All vector artwork, personal signatures, custom heraldic initials, and wedding date dockets are encrypted with 256-bit AES protocols and restricted to certified master engravers.'
      },
      {
        heading: '3. Complete Post-Event Archival Choice',
        text: 'Clients may request permanent redaction or physical purging of their guest addresses, RSVP rosters, and personal calligraphy dies upon delivery verification.'
      }
    ]
  }
};

const ReturnPolicyPage = () => {
  const navigate = useRouter();
  const [copiedProtocol, setCopiedProtocol] = useState(false);
  const [activeFaq, setActiveFaq] = useState<any>(null);
  const [activeModalKey, setActiveModalKey] = useState<any>(null);

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
    navigator.clipboard.writeText('ASRA-POL-CUSTOMIZED-2026');
    setCopiedProtocol(true);
  };

  const toggleFaq = (index) => {
    (setActiveFaq as any)(activeFaq === index ? null : index);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate.back();
    } else {
      navigate.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      
      {/* DISTRACTION-FREE MINIMAL TOP UTILITY BAR (No standard Header) */}
      <header className="w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50 print:hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Back / Breadcrumb Navigation */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all duration-300 group cursor-pointer focus:outline-hidden"
            aria-label="Return to Collection Portal"
          >
            <span className="material-symbols-outlined text-[18px] transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span>Return to Collection Portal</span>
          </button>

          {/* Centered ASRA Crest Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" title="ASRA Wedding Canvas Home" className="relative">
              <Image
                src="/assets/cdn/img_07137c99d96f.png"
                alt="ASRA Wedding Canvas Crest Logo"
                className="h-10 sm:h-11 w-auto object-contain drop-shadow-xs hover:opacity-90 transition-opacity" fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          </div>

          {/* Live Trust & Compliance Status */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Legal Protocol Validated</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-[18px] text-primary">lock</span>
              <span className="tracking-wide hidden sm:inline">Consumer Rights Act &amp; Die Vault Policy</span>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN EDITORIAL CONTENT */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        
        {/* Hero Docket Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4EB] border border-primary/20 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-4 shadow-xs">
            <span>✦</span>
            <span>Collection Customized Covenant &amp; Gift Guarantee</span>
            <span>✦</span>
          </div>
          
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-4">
            Return &amp; Refund Policy for Customized Goods
          </h1>
          
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Due to the individual metallurgy casting, custom copperplate calligraphy, and temperature-stabilized floral infusions, every ASRA creation is uniquely commissioned. Here is our transparent protocol.
          </p>
          
          {/* Metadata Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs text-on-surface-variant pt-4 border-t border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-on-surface">Protocol Reference:</span>
              <button
                onClick={copyProtocolReference}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary bg-[#FAF4EB] hover:bg-primary/15 px-2 py-0.5 rounded border border-primary/20 transition-colors cursor-pointer group"
                title="Click to copy protocol reference"
              >
                <span>ASRA-POL-CUSTOMIZED-2026</span>
                {copiedProtocol ? (
                  <span className="material-symbols-outlined text-[16px] text-emerald-700">check</span>
                ) : (
                  <span className="material-symbols-outlined text-[16px] text-primary">content_copy</span>
                )}
              </button>
              {copiedProtocol && (
                <span className="text-[11px] text-emerald-700 font-semibold">Copied!</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-on-surface">Governing Jurisdiction:</span>
              <span>Customized Handcrafted Luxury Standards (India)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-on-surface">Effective Cycle:</span>
              <span>2026 / 2027 Wedding Season</span>
            </div>
          </div>
        </div>

        {/* QUICK REFERENCE EXECUTIVE MATRIX (4 Key Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-12">
          
          {/* Pillar 1 */}
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] text-primary flex items-center justify-center mb-3 border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1">Pre-Casting Window</h3>
            <p className="text-xs font-semibold text-emerald-700 mb-2">100% Full Refund (2h)</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Cancel or modify free of charge before the 3D solid brass die metal casting begins.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] text-primary flex items-center justify-center mb-3 border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1">Digital Proof Guarantee</h3>
            <p className="text-xs font-semibold text-primary mb-2">3 Free Revisions</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Unlimited initials adjustments and 3 calligraphy script reviews on WhatsApp before deboss.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] text-primary flex items-center justify-center mb-3 border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1">Delivery Protection</h3>
            <p className="text-xs font-semibold text-emerald-700 mb-2">100% Remake &amp; Express Air</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Any breakage or floral wilting in white-glove delivery replaced within 24–48 hours at zero cost.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] text-primary flex items-center justify-center mb-3 border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-1">Brass Die Vaulting</h3>
            <p className="text-xs font-semibold text-primary mb-2">Permanent Heirloom</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your custom cast metal die is preserved in our vault for 5 years for instant lifetime anniversary reorders.
            </p>
          </div>

        </div>

        {/* MAIN POLICY SECTIONS (Two Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          
          {/* Detailed Articles (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Clause 1: Customized Nature & Commissioning Principle */}
            <article className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold font-serif">
                  I
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface">
                  The Nature of Custom &amp; Customized Commissions
                </h2>
              </div>
              
              <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant mb-4">
                Under international consumer statutory codes and Indian customized crafting conventions, personalized goods manufactured to client specifications are exempt from standard retail change-of-mind return rights. At ASRA Wedding Canvas, this applies to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 rounded-lg bg-[#FAF4EB] border border-primary/20 text-xs text-on-surface-variant">
                  <span className="font-semibold text-on-surface block mb-1">✦ 3D CNC-Milled Brass Initials Dies</span>
                  Custom metallurgical dies machined with the couple's personal initials, heraldic crest, or ceremony date.
                </div>
                <div className="p-3.5 rounded-lg bg-[#FAF4EB] border border-primary/20 text-xs text-on-surface-variant">
                  <span className="font-semibold text-on-surface block mb-1">✦ Hand-Drawn Copperplate Calligraphy</span>
                  Hand-lettered vellum envelopes, deckle-edge vows, and customized wax-sealed greeting cards.
                </div>
                <div className="p-3.5 rounded-lg bg-[#FAF4EB] border border-primary/20 text-xs text-on-surface-variant">
                  <span className="font-semibold text-on-surface block mb-1">✦ Cryo-Hydrated Botanical Collections</span>
                  Dawn-harvested Parisian roses, fresh eucalyptus, and organic botanical infusions formulated for wedding timelines.
                </div>
                <div className="p-3.5 rounded-lg bg-[#FAF4EB] border border-primary/20 text-xs text-on-surface-variant">
                  <span className="font-semibold text-on-surface block mb-1">✦ Debossed Velvet Gift Vaults</span>
                  Silk velvet double ring boxes, wedding essentials trunks, and mangalsutra vaults hot-stamped with genuine 24k gold leaf.
                </div>
              </div>

              <p className="text-xs text-on-surface-variant italic border-l-2 border-primary pl-3 py-1">
                "Once a custom brass die is cast in molten metal or personalized calligraphy is inked, the raw material transformation cannot be reversed or resold to another patron."
              </p>
            </article>

            {/* Clause 2: Cancellation Windows & Refund Schedules */}
            <article className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold font-serif">
                  II
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface">
                  Tiered Cancellation Windows &amp; Refund Schedulers
                </h2>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant mb-5">
                We understand wedding planning itineraries occasionally shift. We provide a fair, phased refund policy based on your order’s progression in our Hyderabad collection:
              </p>

              <div className="space-y-3">
                
                {/* Tier 1 */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-1">
                        Stage 01 • Immediate (Within 2 Hours)
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-on-surface">Pre-Production &amp; Pre-Casting Phase</h4>
                      <p className="text-xs text-on-surface-variant mt-1">
                        If you notify our Support via WhatsApp or Phone within 2 hours of checkout before the digital vector CAD file is transferred to the CNC brass foundry.
                      </p>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between items-baseline sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-emerald-200">
                      <span className="text-xs sm:text-sm font-bold text-emerald-800">100% REFUND</span>
                      <span className="block text-[11px] text-on-surface-variant">Instant reversal to original method</span>
                    </div>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="p-4 rounded-xl border border-primary/20 bg-[#FAF4EB]">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white text-primary border border-primary/20 mb-1">
                        Stage 02 • Digital Proof Review (2h – 12h)
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-on-surface">Die Blueprint Created, But Prior to Hot Stamping</h4>
                      <p className="text-xs text-on-surface-variant mt-1">
                        If the brass die has already entered metallurgy milling, you may cancel the hamper, confections, and wedding essentials trunks. You retain ownership of the custom physical brass die.
                      </p>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between items-baseline sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-primary/20">
                      <span className="text-xs sm:text-sm font-bold text-primary">80% REFUND</span>
                      <span className="block text-[11px] text-on-surface-variant">Less ₹1,500 Brass Die Casting Fee</span>
                    </div>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="p-4 rounded-xl border border-red-200 bg-red-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 mb-1">
                        Stage 03 • Post-Crafting &amp; Botanical Assembly (After 12h)
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-on-surface">Assembly Completed or In Delivery</h4>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Once hot foil debossing, fresh dawn floral insertion, and wax sealing are finalized, orders cannot be cancelled or refunded as goods are fully tailored.
                      </p>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between items-baseline sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-red-200">
                      <span className="text-xs sm:text-sm font-bold text-red-800">NO CASH REFUND</span>
                      <span className="block text-[11px] text-on-surface-variant">White-Glove Delivery Guaranteed</span>
                    </div>
                  </div>
                </div>

              </div>
            </article>

            {/* Clause 3: Replacement Guarantee for Delivery Damaged Goods */}
            <article className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold font-serif">
                  III
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface">
                  100% White-Glove Delivery &amp; Defect Warranty
                </h2>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant mb-4">
                While custom products are non-returnable for aesthetic reconsideration, <strong className="text-on-surface">ASRA Wedding Canvas assumes 100% comprehensive liability for physical delivery damage, typographical errors on our part, or biological floral defects.</strong>
              </p>

              <div className="bg-[#FAF4EB] rounded-xl p-5 border border-primary/20 mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                  Qualifying Protocols for Immediate Complimentary Remake:
                </h3>
                <ul className="space-y-2.5 text-xs text-on-surface-variant">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-emerald-700 shrink-0">check_circle</span>
                    <span>
                      <strong className="text-on-surface">Typographical Discrepancy:</strong> If the debossed letters or calligraphy do not match the digital proof confirmed by the client or designated wedding planner on WhatsApp.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-emerald-700 shrink-0">check_circle</span>
                    <span>
                      <strong className="text-on-surface">Floral Hydration Compromise:</strong> If fresh roses or botanical elements suffer shock, wilting, or temperature-control failure during chilled van delivery.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-emerald-700 shrink-0">check_circle</span>
                    <span>
                      <strong className="text-on-surface">Structural Damage:</strong> Any cracked crystal toasting flutes, dented gift trunks, or ruptured wax seals reported within 24 hours of palatial delivery.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Rapid Resolution Timeline */}
              <div className="border-t border-outline-variant/30 pt-4">
                <h4 className="text-xs font-semibold text-on-surface mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                  <span>Our 24-Hour Emergency Protocol:</span>
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  If an issue is reported before your wedding ceremony, our emergency collection team activates express remake protocol. Replacement units are hand-carried by air or shipped via priority express to your resort or bridal suite before the twilight auspicious hour.
                </p>
              </div>
            </article>

            {/* Clause 4: Step-by-Step Claim Procedure */}
            <article className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold font-serif">
                  IV
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface">
                  Support Claim &amp; Replacement Procedure
                </h2>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant mb-6">
                To register a damage report or request authorization for replacement, please follow our rapid 3-step support process:
              </p>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/40">
                
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-xs flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                    Step 01 • Instant WhatsApp Photographic Audit
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Take 2 clear photographs of the defect/damage alongside the serial badge on the hamper. Send directly to our Dedicated Wedding Support WhatsApp at{' '}
                    <a href="tel:+919692668263" className="font-semibold text-primary hover:underline">
                      +91 96926 68263
                    </a>{' '}
                    referencing your Collection Order ID (e.g., <code className="font-mono bg-[#FAF4EB] text-primary px-1.5 py-0.5 rounded border border-primary/20">ASRA-2026-8842X</code>).
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-xs flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                    Step 02 • Master Artisan Review (Under 45 Minutes)
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Our Senior Stylist and Quality Director verify the discrepancy against your vaulted digital initials proof and sensor temperature logs from the white-glove delivery van.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-xs flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                    Step 03 • Fast-Track Remake or Instant Settlement
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Upon verification, a priority remake slot is staged immediately. If replacement cannot be delivered prior to your wedding ceremony date, an immediate 100% full refund is issued directly via UPI/Original Card within 2–4 hours.
                  </p>
                </div>

              </div>
            </article>

          </div>

          {/* Right Sidebar: Quick Contact, Initials Vault FAQs & Official Seal */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Live Support Direct Desk */}
            <div className="bg-[#1c1b1b] text-[#fcf9f8] p-6 sm:p-7 rounded-xl border border-outline-variant/30 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-fixed">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-white">Collection Stylist Hotline</h3>
                  <p className="text-[11px] text-outline-variant">Instant Resolution for Wedding Planners</p>
                </div>
              </div>

              <p className="text-xs text-outline-variant leading-relaxed mb-5">
                Need urgent alterations to names, event dates, or delivery suite coordinates before metal casting? Our stylists are available 24/7 during wedding peak seasons.
              </p>

              <a
                href="https://wa.me/919692668263?text=Hello%20ASRA%20Team,%20I%20have%20an%20urgent%20inquiry%20regarding%20my%20custom%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5B] text-white font-semibold text-xs py-2.5 px-4 rounded-lg uppercase tracking-wider shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer group"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat on WhatsApp</span>
              </a>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-outline-variant">
                <span>Average response: &lt; 8 mins</span>
                <span className="text-primary-fixed font-medium">+91 96926 68263</span>
              </div>
            </div>

            {/* Hallmark & Metallurgy Preservation Card */}
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#FAF4EB] text-primary flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium text-on-surface">Physical Die Vault Service</h3>
              </div>
              
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Even if a client cancels other elements of a wedding essentials order, your engineered 3D Brass Initials Die is never destroyed. It remains safely archived in our humidity-controlled Hyderabad Vault.
              </p>

              <div className="bg-[#FAF4EB] rounded-lg p-3.5 border border-primary/20 text-[11px] space-y-2 text-on-surface-variant">
                <div className="flex justify-between items-center">
                  <span className="text-outline">Vault Retention:</span>
                  <span className="font-semibold text-on-surface">5 Years Complimentary</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-outline">Subsequent Re-order Discount:</span>
                  <span className="font-semibold text-emerald-800">Save ₹1,500 on all future suites</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-outline">Home Delivery of Physical Die:</span>
                  <span className="font-semibold text-primary">Available in luxury rosewood box</span>
                </div>
              </div>
            </div>

            {/* Frequently Asked Legal & Protocol Questions (Accordion) */}
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-xs">
              <h3 className="font-serif text-base sm:text-lg font-medium text-on-surface mb-4 flex items-center gap-2">
                <span>Frequently Asked Inquiries</span>
              </h3>

              <div className="space-y-3">
                
                {/* FAQ 1 */}
                <div className="border-b border-outline-variant/30 pb-3">
                  <button
                    onClick={() => toggleFaq(0)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-on-surface hover:text-primary transition-colors focus:outline-hidden cursor-pointer"
                  >
                    <span>What if our wedding date is postponed?</span>
                    <span className={`material-symbols-outlined text-[18px] text-primary transition-transform duration-200 ${
                      activeFaq === 'support' ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`text-xs text-on-surface-variant leading-relaxed transition-all duration-200 overflow-hidden ${
                      activeFaq === 'support' ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    Notify us at least 7 days before shipped date. We will hold your unprinted wedding essentials components and fresh floral arrangement schedules without penalty for up to 90 days.
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-outline-variant/30 pb-3">
                  <button
                    onClick={() => toggleFaq(1)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-on-surface hover:text-primary transition-colors focus:outline-hidden cursor-pointer"
                  >
                    <span>Can I exchange for another color palette?</span>
                    <span className={`material-symbols-outlined text-[18px] text-primary transition-transform duration-200 ${
                      activeFaq === 'insurance' ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`text-xs text-on-surface-variant leading-relaxed transition-all duration-200 overflow-hidden ${
                      activeFaq === 'insurance' ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    Palette changes (e.g., from <em>Classic Blush</em> to <em>Royal Emerald</em>) are permitted during the WhatsApp digital proof approval stage before hot-stamping.
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="pb-1">
                  <button
                    onClick={() => toggleFaq(2)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-on-surface hover:text-primary transition-colors focus:outline-hidden cursor-pointer"
                  >
                    <span>How are bulk favor returns handled?</span>
                    <span className={`material-symbols-outlined text-[18px] text-primary transition-transform duration-200 ${
                      activeFaq === 'archival' ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`text-xs text-on-surface-variant leading-relaxed transition-all duration-200 overflow-hidden ${
                      activeFaq === 'archival' ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    For destination orders over 25+ suites, 5% surplus buffer items are included automatically for on-site palace replacements.
                  </div>
                </div>

              </div>
            </div>

            {/* Legal Hallmark Badge */}
            <div className="p-5 rounded-xl border border-primary/20 bg-[#FAF4EB] text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-xs mb-2 text-primary">
                <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
              </div>
              <h4 className="font-serif text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                ASRA Quality Hallmark
              </h4>
              <p className="text-[11px] text-on-surface-variant leading-snug">
                Protected under 24k Gold Authenticity Standard, Bureau of Indian Standards (BIS) &amp; White-Glove Delivery Insurance.
              </p>
            </div>

          </aside>

        </div>

        {/* Related Navigation Links & Actions */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs text-on-surface-variant">
            <button
              onClick={() => setActiveModalKey('support')}
              className="hover:text-primary underline decoration-outline-variant underline-offset-4 cursor-pointer focus:outline-hidden"
            >
              Support Protocols
            </button>
            <button
              onClick={() => setActiveModalKey('insurance')}
              className="hover:text-primary underline decoration-outline-variant underline-offset-4 cursor-pointer focus:outline-hidden"
            >
              Delivery Insurance Policy
            </button>
            <button
              onClick={() => setActiveModalKey('archival')}
              className="hover:text-primary underline decoration-outline-variant underline-offset-4 cursor-pointer focus:outline-hidden"
            >
              Initials Brass Die Archival terms
            </button>
            <button
              onClick={() => setActiveModalKey('confidentiality')}
              className="hover:text-primary underline decoration-outline-variant underline-offset-4 cursor-pointer focus:outline-hidden"
            >
              Confidentiality Agreement
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 border border-outline-variant/50 text-on-surface rounded-lg text-xs font-semibold uppercase tracking-wider hover:border-primary hover:text-primary active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-xs"
              title="Print official policy docket"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Docket</span>
            </button>
            
            <button
              onClick={handleBack}
              className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Acknowledge &amp; Return</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

      </main>

      {/* MINIMAL COPYRIGHT LEGAL BAR (No full footer) */}
      <footer className="border-t border-outline-variant/30 bg-surface-container-low py-4 print:hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-[11px] text-outline flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2 tracking-widest text-on-surface font-semibold uppercase">
            <span>ASRA WEDDING CANVAS</span>
            <span>•</span>
            <span className="font-sans font-normal tracking-normal text-on-surface-variant lowercase">Customized Collection Registry &amp; Vault Services</span>
          </div>
          <div>
            © 2026 ASRA Private Limited. All customized designs, metallurgical dies, and covenants reserved.
          </div>
        </div>
      </footer>

      {/* MODAL DIALOG FOR POLICY ANNEXURES */}
      {activeModalKey && POLICY_ANNEXURES[activeModalKey] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setActiveModalKey(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-surface-container-lowest rounded-xl max-w-xl w-full p-6 sm:p-8 border border-outline-variant/30 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalKey(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/90 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300 cursor-pointer"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="mb-6">
              <span className="inline-block px-2 py-1 bg-[#FAF4EB] text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                Official Collection Annexure
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface">
                {POLICY_ANNEXURES[activeModalKey].title}
              </h3>
              <p className="text-xs text-outline font-mono mt-0.5">
                {POLICY_ANNEXURES[activeModalKey].subtitle}
              </p>
            </div>

            <div className="space-y-3 text-xs text-on-surface-variant leading-relaxed">
              {POLICY_ANNEXURES[activeModalKey].content.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#FAF4EB] border border-primary/20">
                  <h4 className="font-semibold text-on-surface mb-1">
                    {item.heading}
                  </h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
              <span className="text-[11px] text-outline">
                Binding under ASRA Customized Covenant 2026
              </span>
              <button
                onClick={() => setActiveModalKey(null)}
                className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#5f4b2d] active:scale-[0.98] transition-all duration-300 cursor-pointer"
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
