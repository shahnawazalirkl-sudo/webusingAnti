import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Printer,
  Copy,
  Check,
  Calendar,
  Building2,
  Mail,
  Phone,
  Search,
  X,
  Clock,
  Sparkles,
  Award,
  Layers,
  FileCheck2,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

const ARTICLES = [
  {
    id: 'article-01',
    number: 'Article 01',
    tag: 'Formation & Scope',
    sectionCode: '§ 1.1',
    title: 'Commission Acceptance & Client Formation',
    summary: 'Binding covenant constituted via digital docketing and customized character of goods.',
    content: (
      <>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          These Terms of Service govern the customized creation, artisanal manufacturing, brass die casting, and delivery of bridal heirlooms and ceremonial gifting suites by ASRA Wedding Canvas Private Limited (“Maison ASRA”, “we”, “our”). By placing a customized order, signing a digital commission docket, or submitting payment, you (“Client”, “Patron”) enter into a binding covenant with our collection.
        </p>
        <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-lg border border-[#EAE2D5] text-xs sm:text-sm text-neutral-700 space-y-3">
          <p>
            <strong className="text-neutral-900 font-semibold">1.1 Customized Character of Goods:</strong> Every piece produced by ASRA is made specifically to order based on proprietary patron specifications, matrimonial initials, and curated materials.
          </p>
          <p>
            <strong className="text-neutral-900 font-semibold">1.2 Digital Inception:</strong> A commission is formally constituted when (a) the requisite deposit or full prepayment is received, and (b) our Lead Stylist transmits an official Alphanumeric Docket ID.
          </p>
        </div>
      </>
    )
  },
  {
    id: 'article-02',
    number: 'Article 02',
    tag: 'Heraldry & Proofing',
    sectionCode: '§ 2.4',
    title: '3D Proofing, Typography & Initials Approval',
    summary: 'Zero-tooling guarantee with strict sign-off protocols before metal casting or leather debossing.',
    content: (
      <>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          Because customized metal casting and laser engraving cannot be undone once executed, our collection operates under an uncompromising proofing protocol designed to safeguard patron intent.
        </p>

        <div className="border-l-4 border-[#C5A059] pl-4 py-2.5 my-4 bg-[#FAF7F2] rounded-r-lg text-xs sm:text-sm text-neutral-800">
          <span className="font-semibold text-neutral-950 block mb-0.5">The Zero-Tooling Guarantee:</span>
          No CNC brass die is milled, no leather debossed, and no optical crystal engraved until the Client renders affirmative digital sign-off on the 3D photorealistic render.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs text-neutral-600">
          <div className="p-4 bg-white rounded-lg border border-[#EAE2D5] shadow-xs">
            <strong className="text-neutral-900 block mb-1.5 font-serif text-sm">Turnaround on Digital Proofs</strong>
            <p className="leading-relaxed">
              Initial vector layouts and 3D depth simulations are dispatched via WhatsApp and Client Portal within 6 hours of order docketing.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-[#EAE2D5] shadow-xs">
            <strong className="text-neutral-900 block mb-1.5 font-serif text-sm">Typography &amp; Spelling Covenant</strong>
            <p className="leading-relaxed">
              The Client holds final responsibility for vetting ceremonial dates, phonetic spellings, romanized transcriptions, and guest names on attendee favors.
            </p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'article-03',
    number: 'Article 03',
    tag: 'Foundry Craftsmanship',
    sectionCode: '§ 3.2',
    title: 'Metallurgical Craftsmanship & Natural Variance',
    summary: 'Intrinsic noble medium characteristics, organic timber grain, and 5-year brass die archival.',
    content: (
      <>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          ASRA gifts are crafted using historic, noble mediums. Patrons acknowledge that natural and artisanal raw materials possess intrinsic organic variances that distinguish them from mass-manufactured items.
        </p>

        <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-600">
          <li className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5]">
            <span className="text-[#C5A059] font-serif text-base leading-none mt-0.5">✦</span>
            <span>
              <strong className="text-neutral-900 font-semibold">Full-Grain Tuscan Calfskin &amp; Leather:</strong> Natural pebble textures, grain variations, and subtle surface grain tones are hallmarks of genuine hand-dyed hides.
            </span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5]">
            <span className="text-[#C5A059] font-serif text-base leading-none mt-0.5">✦</span>
            <span>
              <strong className="text-neutral-900 font-semibold">Reclaimed Teak &amp; Rosewood:</strong> Wood grain swirls, timber density, and natural oil absorption will exhibit mild customized divergence across multi-unit bridal orders.
            </span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5]">
            <span className="text-[#C5A059] font-serif text-base leading-none mt-0.5">✦</span>
            <span>
              <strong className="text-neutral-900 font-semibold">Solid CNC-Milled Brass Dies:</strong> Brass stamps undergo micro-polishing. 5-year archival preservation is maintained without maintenance fees in our climate vault.
            </span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5]">
            <span className="text-[#C5A059] font-serif text-base leading-none mt-0.5">✦</span>
            <span>
              <strong className="text-neutral-900 font-semibold">24K Gold Leaf Stamping:</strong> Genuine gold foil leafing is hand-embossed at 180°C. Minor hairline micro-relief margins are normal and intentional.
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'article-04',
    number: 'Article 04',
    tag: 'Production Timelines',
    sectionCode: '§ 4.1',
    title: 'Production Schedules, Deadlines & Emergency Rush',
    summary: 'Standard dispatch lead times and VIP accelerated foundry production schedule.',
    content: (
      <>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          Our collection coordinates closely with wedding planners and concierges to ensure complete alignment with ceremonial itineraries.
        </p>

        <div className="overflow-x-auto rounded-lg border border-[#EAE2D5] bg-white shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FBF7F0] text-neutral-900 border-b border-[#EAE2D5]">
              <tr>
                <th className="p-3.5 sm:p-4 font-serif font-semibold text-neutral-900">Collection Category</th>
                <th className="p-3.5 sm:p-4 font-serif font-semibold text-neutral-900">Standard Craft Turnaround</th>
                <th className="p-3.5 sm:p-4 font-serif font-semibold text-[#8C6D37]">Express Foundry Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE2D5] text-neutral-600 text-xs">
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="p-3.5 sm:p-4 font-medium text-neutral-900">Pre-Curated Luxury Gift Hampers</td>
                <td className="p-3.5 sm:p-4">24 to 48 Hours Dispatch</td>
                <td className="p-3.5 sm:p-4 text-[#8C6D37] font-medium">Same-Day Priority Aircraft Dispatch</td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="p-3.5 sm:p-4 font-medium text-neutral-900">Custom Debossed Leather &amp; Optical Acrylic</td>
                <td className="p-3.5 sm:p-4">3 to 5 Business Days</td>
                <td className="p-3.5 sm:p-4 text-[#8C6D37] font-medium">48-Hour Accelerated Casting</td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="p-3.5 sm:p-4 font-medium text-neutral-900">Customized Bridal Trunks &amp; CNC Brass Dies</td>
                <td className="p-3.5 sm:p-4">7 to 12 Business Days</td>
                <td className="p-3.5 sm:p-4 text-[#8C6D37] font-medium">5-Day VIP Foundry Fast-Track</td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="p-3.5 sm:p-4 font-medium text-neutral-900">Royal Destination Bulk Favors (&gt;100 Units)</td>
                <td className="p-3.5 sm:p-4">14 to 21 Business Days</td>
                <td className="p-3.5 sm:p-4 text-[#8C6D37] font-medium">Coordinated Multi-Artisan Cell Staging</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  {
    id: 'article-05',
    number: 'Article 05',
    tag: 'Transit & Insurance',
    sectionCode: '§ 5.3',
    title: 'White-Glove Transit, Customs & Venue Delivery',
    summary: '100% bonded transport, temperature-insulated packaging, and emergency remake warranty.',
    content: (
      <>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          Consignments destined for private estates or destination hotels (e.g. Lake Como, Udaipur, St. Moritz, French Riviera) are managed through bonded white-glove partners (DHL Luxury Express, FedEx Custom Critical).
        </p>

        <div className="space-y-3 text-xs sm:text-sm text-neutral-700">
          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5]">
            <strong className="text-neutral-900 block mb-1">5.1 Temperature &amp; Shock Protection:</strong>
            <p className="text-neutral-600 leading-relaxed">
              Luxury gift boxes containing organic botanical wax candles or cryo-preserved floral blooms are packaged in temperature-insulated outer shock crates.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5]">
            <strong className="text-neutral-900 block mb-1">5.2 100% Comprehensive Transit Replacement:</strong>
            <p className="text-neutral-600 leading-relaxed">
              If an heirloom sustains verified transit fractures or customs damage, ASRA activates emergency 24-hour priority remake and re-ships via next-flight-out protocol at zero cost to the client.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EAE2D5]">
            <strong className="text-neutral-900 block mb-1">5.3 Customs Clearance &amp; Duties:</strong>
            <p className="text-neutral-600 leading-relaxed">
              For international ceremonial shipments, import duties and clearing dockets are calculated during checkout or coordinated via the client’s wedding logistics desk.
            </p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'article-06',
    number: 'Article 06',
    tag: 'Intellectual Property',
    sectionCode: '§ 6.0',
    title: 'Heraldic Insignias, Family Crests & Media Embargo',
    summary: 'Client sole crest ownership guarantee and strict pre-ceremony social media embargo.',
    content: (
      <>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          Our collection respects the sanctity and exclusivity of matrimonial heraldry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 sm:p-5 bg-[#FAF7F2] rounded-lg border border-[#E8DFD1] shadow-2xs">
            <h4 className="font-serif font-semibold text-neutral-900 text-sm mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C5A059]" />
              Sole Client Crest Ownership
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              All customized initials vectors and coat-of-arms designs developed for the Patron remain their exclusive intellectual asset. Maison ASRA will never re-cast, license, or sell your initials to any other patron.
            </p>
          </div>
          <div className="p-4 sm:p-5 bg-[#FAF7F2] rounded-lg border border-[#E8DFD1] shadow-2xs">
            <h4 className="font-serif font-semibold text-neutral-900 text-sm mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C5A059]" />
              Ceremonial Media Embargo
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              We strictly observe ceremonial dates. We will never publish studio photographs of your wedding essentials boxes, guest favors, or vows on social media prior to your official ceremony without express permission.
            </p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'article-07',
    number: 'Article 07',
    tag: 'Remakes & Cancellations',
    sectionCode: '§ 7.5',
    title: 'Alterations, Cancellations & Customized Refunds',
    summary: 'Stage A, B, and C remedy protocol reflecting non-standard custom craftsmanship.',
    content: (
      <>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          Due to the permanent, customized nature of engraved metal, personalized leather, and carved wood, standard retail consumer return policies do not apply. Our customized remedy protocol is structured as follows:
        </p>

        <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700">
          <div className="flex items-start gap-3.5 p-4 bg-white rounded-lg border border-[#EAE2D5] shadow-xs">
            <span className="px-2.5 py-1 bg-neutral-100 text-neutral-900 text-[10px] font-mono font-bold rounded uppercase tracking-wider">
              Stage A
            </span>
            <div>
              <strong className="text-neutral-900 block text-xs sm:text-sm font-semibold mb-1">
                Prior to Digital 3D Sign-off
              </strong>
              <p className="text-neutral-600 leading-relaxed">
                100% full refund less a nominal graphic typography vector drafting fee of ₹2,500 if custom artwork has already been generated by our Master Calligrapher.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 bg-white rounded-lg border border-[#EAE2D5] shadow-xs">
            <span className="px-2.5 py-1 bg-[#FAF7F2] text-[#8C6D37] text-[10px] font-mono font-bold rounded uppercase tracking-wider border border-[#E8DFD1]">
              Stage B
            </span>
            <div>
              <strong className="text-neutral-900 block text-xs sm:text-sm font-semibold mb-1">
                Post Brass-Die CNC Milling / In Foundry Production
              </strong>
              <p className="text-neutral-600 leading-relaxed">
                Custom metallurgy tooling and materials are committed. Refund is limited to 40% of the total commission value; the physical brass die is shipped directly to the Patron.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 bg-white rounded-lg border border-[#EAE2D5] shadow-xs">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold rounded uppercase tracking-wider border border-emerald-200">
              Stage C
            </span>
            <div>
              <strong className="text-neutral-900 block text-xs sm:text-sm font-semibold mb-1">
                Collection Craft Flaw or Discrepancy Remedy
              </strong>
              <p className="text-neutral-600 leading-relaxed">
                If a delivered gift diverges from the approved digital 3D proof due to collection error, ASRA remakes the piece unconditionally with expedited same-day courier dispatch.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'article-08',
    number: 'Article 08',
    tag: 'Legal Oversight',
    sectionCode: '§ 8.2',
    title: 'Guild Governance & Salon Inquiries',
    summary: 'Arbitration under Arbitration and Conciliation Act 1996 and Hyderabad registry details.',
    content: (
      <>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
          These terms are governed by the commercial statutes of India. Any controversy, claim, or dispute arising under this covenant shall be subject to arbitration in Hyderabad, Telangana, under the Arbitration and Conciliation Act, 1996.
        </p>

        <div className="p-5 sm:p-6 bg-[#FAF8F5] rounded-xl border border-[#EAE2D5] flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#8C6D37] uppercase block mb-1">
              Maison ASRA Legal &amp; Trust Registry
            </span>
            <p className="text-xs sm:text-sm text-neutral-800 font-medium">
              Plot No. 36, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
            </p>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              shahnawazalirkl@gmail.com • +91 96926 68263
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#B38E46] text-[#141414] font-semibold text-xs rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer active:scale-95"
            >
              Download Terms Docket
            </button>
          </div>
        </div>
      </>
    )
  }
];

const TermsOfServicePage = () => {
  const navigate = useNavigate();
  const [activeArticleId, setActiveArticleId] = useState('article-01');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSha, setCopiedSha] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'Couple / Patron',
    notes: ''
  });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Provenance SHA-256
  const PROVENANCE_SHA = '4e99f182c40b82f099c2d82a17fa2b99837e2a9b';

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveArticleId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    ARTICLES.forEach((article) => {
      const el = document.getElementById(article.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [searchQuery]);

  const handleCopySha = () => {
    navigator.clipboard.writeText(PROVENANCE_SHA);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBackToMaison = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      const subject = encodeURIComponent(`Collection Terms & Custom Commission Inquiry: ${consultForm.name}`);
      const body = encodeURIComponent(
        `Maison ASRA Collection Client Care Desk,\n\n` +
        `Patron Name: ${consultForm.name}\n` +
        `Contact Number: ${consultForm.phone}\n` +
        `Email: ${consultForm.email}\n` +
        `Role: ${consultForm.role}\n\n` +
        `Inquiry / Special Request:\n${consultForm.notes}\n\n` +
        `Docket Ref: TOS-ASRA-2026-V5\n`
      );
      window.location.href = `mailto:shahnawazalirkl@gmail.com?subject=${subject}&body=${body}`;
      setIsConsultModalOpen(false);
      setConsultSubmitted(false);
    }, 1000);
  };

  const filteredArticles = ARTICLES.filter((article) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.tag.toLowerCase().includes(q) ||
      article.number.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans antialiased selection:bg-[#C5A059]/20 selection:text-[#141414]">
      
      {/* ================= TOP MINIMAL UTILITY / VAULT DOCKET BAR ================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE4D9] py-3.5 px-4 sm:px-6 md:px-12 transition-all print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Back Navigation & Status */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleBackToMaison}
              className="group flex items-center gap-2 text-xs font-semibold tracking-wider text-[#4A4A4A] hover:text-[#B38E46] transition-colors uppercase cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Maison</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-6 border-l border-[#EAE4D9] text-[11px] font-medium tracking-wide text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="uppercase tracking-widest text-[#666666]">Legal &amp; Customized Governance Protocol</span>
            </div>
          </div>

          {/* Center: Collection Seal & Brand Insignia */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#FBF7F0] border border-[#E8DFD1] flex items-center justify-center shadow-xs group-hover:border-[#C5A059] transition-colors">
              <span className="font-cinzel text-xs font-bold text-[#C5A059] tracking-tighter">AS</span>
            </div>
            <div className="text-left hidden md:block">
              <span className="block font-cinzel text-[11px] font-bold tracking-[0.2em] text-[#141414] uppercase leading-tight">
                Maison ASRA
              </span>
              <span className="block text-[9px] font-medium tracking-widest text-[#B88746] uppercase">
                Terms of Collection Service
              </span>
            </div>
          </Link>

          {/* Right: Security Badge & Action */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-[#FAF6F0] px-3.5 py-1.5 rounded-full border border-[#E8DFD1]/80 text-[11px] text-[#8C6D37] font-medium">
              <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="tracking-wider">256-Bit Encrypted Collection Covenant</span>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D9CEBF] rounded-lg text-xs font-semibold text-[#333333] hover:bg-[#FBF7F0] hover:border-[#B38E46] transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-[#888888]" />
              <span className="hidden sm:inline">Print Docket</span>
              <span className="sm:hidden">Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO STATEMENT & METADATA ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-10 pb-20">
        
        {/* Editorial Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFE6] border border-[#E2D5C3] text-[11px] font-semibold text-[#8F6B28] tracking-widest uppercase mb-4">
            <span>◆</span>
            <span>Collection Client Charter &amp; Commission Terms</span>
            <span>◆</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#141414] font-normal leading-tight mb-4 tracking-tight">
            Terms of Service &amp; <br className="hidden sm:inline" />
            <span className="italic font-normal gold-gradient-text font-serif">Artisanal Covenant</span>
          </h1>
          <p className="text-neutral-600 text-xs sm:text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Every initials casting, customized brass die, French velvet wedding essentials chest, and ceremonial gifts commission operates under the sovereign guidelines of the ASRA Collection Covenant.
          </p>

          {/* Document Metadata Strip */}
          <div className="mt-6 pt-5 border-t border-[#EAE2D5] flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-500 font-medium">
            <div>
              <span className="text-neutral-400">Charter Docket:</span>{' '}
              <strong className="text-neutral-800 font-semibold font-mono">TOS-ASRA-2026-V5</strong>
            </div>
            <span className="text-neutral-300 hidden sm:inline">•</span>
            <div>
              <span className="text-neutral-400">Effective Date:</span>{' '}
              <strong className="text-neutral-800 font-semibold">January 1, 2026</strong>
            </div>
            <span className="text-neutral-300 hidden sm:inline">•</span>
            <div>
              <span className="text-neutral-400">Jurisdiction:</span>{' '}
              <strong className="text-neutral-800 font-semibold">Hyderabad &amp; Bengaluru Guild Benches</strong>
            </div>
            <span className="text-neutral-300 hidden sm:inline">•</span>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Certified Active Covenant</span>
            </div>
          </div>
        </div>

        {/* 3 KEY ASSURANCE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className="bg-white p-6 rounded-xl border border-[#EFE8DD] shadow-xs transition-all hover:border-[#D1C2A5] hover:shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#E8DFD1] flex items-center justify-center text-[#B88746] mb-4">
              <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-base font-semibold text-neutral-900 mb-1.5">No Production Without Digital Proof</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Zero metal is milled or leather debossed without your explicit 3D photorealistic render sign-off via our digital support docket.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EFE8DD] shadow-xs transition-all hover:border-[#D1C2A5] hover:shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#E8DFD1] flex items-center justify-center text-[#B88746] mb-4">
              <Layers className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-base font-semibold text-neutral-900 mb-1.5">Archival Die Custodianship</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Your CNC-milled solid brass family insignia die remains cataloged in our climate vault for 5 years for seamless anniversary re-orders.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EFE8DD] shadow-xs transition-all hover:border-[#D1C2A5] hover:shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#E8DFD1] flex items-center justify-center text-[#B88746] mb-4">
              <Clock className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-base font-semibold text-neutral-900 mb-1.5">Insured Ceremonial Handover</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              All destination consignments (Udaipur, Lake Como, Paris) are climate-sealed, crated, and 100% bonded against transit interruption.
            </p>
          </div>
        </div>

        {/* MAIN COVENANT LAYOUT (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: STICKY CLAUSE NAVIGATION & SUPPORT ASSISTANCE */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 print:hidden">
            
            {/* Table of Contents Card */}
            <div className="bg-white rounded-xl p-6 border border-[#EAE2D5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5] mb-4">
                <h2 className="font-serif text-sm font-semibold tracking-wider text-neutral-900 uppercase">
                  Charter Clauses
                </h2>
                <span className="text-[11px] font-semibold text-[#8C6D37] bg-[#FBF7F0] px-2.5 py-0.5 rounded border border-[#E8DFD1]">
                  8 Articles
                </span>
              </div>

              {/* Clause Search Input */}
              <div className="relative mb-4">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter clauses (e.g. proof, refund)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E8DFD1] rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C5A059] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Navigation List */}
              <nav className="space-y-1 text-xs" style={{ scrollTargetGroup: 'auto' }}>
                {filteredArticles.map((article) => {
                  const isActive = activeArticleId === article.id;
                  return (
                    <a
                      key={article.id}
                      href={`#${article.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(article.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          setActiveArticleId(article.id);
                        }
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-[#141414] text-white font-medium shadow-2xs'
                          : 'text-neutral-600 hover:bg-[#FBF7F0] hover:text-[#B38E46]'
                      }`}
                    >
                      <span className="truncate pr-2">{article.number}. {article.title.split('&')[0]}</span>
                      <span className={`text-[10px] font-mono ${isActive ? 'text-[#C5A059]' : 'text-neutral-400'}`}>
                        {article.sectionCode}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Support Counsel Block (Dark Luxury Card) */}
            <div className="bg-[#141414] text-white rounded-xl p-6 border border-[#2B2B2B] shadow-lg">
              <div className="flex items-center gap-2 text-[11px] text-[#C5A059] uppercase tracking-widest font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
                <span>Collection Client Care Desk</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-neutral-100 mb-2">
                Commission Guidance
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Need customized staging for international destinations or legal billing under a private corporate foundation? Our Support Counsel is directly reachable.
              </p>
              
              <div className="space-y-2">
                <a
                  href="https://wa.me/919692668263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#B38E46] text-[#141414] font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Collection Stylist</span>
                </a>
                <button
                  onClick={() => setIsConsultModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#222222] hover:bg-[#2A2A2A] text-neutral-200 border border-[#3A3A3A] font-medium text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Submit Special Commission Request</span>
                </button>
              </div>

              <div className="mt-3 text-center text-[10px] text-neutral-400">
                Direct Support Desk: <span className="text-neutral-200 font-mono">+91 96926 68263</span>
              </div>
            </div>

            {/* Seal of Provenance Mini Badge */}
            <div className="p-4 rounded-xl border border-[#E8DFD1] bg-[#FAF8F5] text-center shadow-2xs">
              <div className="font-cinzel text-[10px] tracking-widest text-[#8F6B28] uppercase font-bold mb-1">
                Cryptographic Provenance Verified
              </div>
              <div className="text-[10px] font-mono text-neutral-600 truncate mb-2">
                SHA-256: {PROVENANCE_SHA}
              </div>
              <button
                onClick={handleCopySha}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#8C6D37] hover:text-[#5E471E] font-medium transition-colors cursor-pointer"
              >
                {copiedSha ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Provenance Hash Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Verification Hash</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: FULL LEGAL ARTICLES & CHARTER PROVISIONS */}
          <div className="lg:col-span-8 space-y-8">
            {filteredArticles.map((article) => (
              <section
                key={article.id}
                id={article.id}
                className="bg-white rounded-xl p-6 sm:p-8 border border-[#EAE2D5] shadow-xs relative transition-all scroll-mt-28"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FBF7F0] border border-[#E8DFD1] text-[10px] font-semibold text-[#8C6D37] tracking-wider uppercase">
                    <span>{article.number}</span>
                    <span>•</span>
                    <span>{article.tag}</span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200">
                    {article.sectionCode}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium mb-3">
                  {article.title}
                </h2>

                {article.content}
              </section>
            ))}

            {filteredArticles.length === 0 && (
              <div className="p-12 text-center bg-white rounded-xl border border-[#EAE2D5]">
                <HelpCircle className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                <h3 className="font-serif text-base text-neutral-800 font-medium mb-1">No matching clauses found</h3>
                <p className="text-xs text-neutral-500 mb-4">Try searching for terms like "proof", "refund", "brass", or "transit".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-[#F5EFE6] text-[#8F6B28] border border-[#E2D5C3] text-xs font-semibold rounded-lg hover:bg-[#EFE5D6] transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* ================= BOTTOM MINIMAL DOCKET BAR ================= */}
      <footer className="bg-white border-t border-[#EAE4D9] py-5 px-4 sm:px-6 md:px-12 text-xs text-neutral-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="font-cinzel text-xs font-bold text-neutral-900 tracking-wider">
              ASRA WEDDING CANVAS
            </span>
            <span className="text-neutral-300 hidden sm:inline">•</span>
            <span className="text-[11px] text-neutral-600">
              Collection Service Charter &amp; Sovereign Commission Covenant
            </span>
            <span className="text-neutral-300 hidden md:inline">•</span>
            <span className="text-[11px] font-mono text-neutral-400 hidden md:inline">
              Docket #TOS-ASRA-2026-V5
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Legal Docket</span>
            </span>
            <Link to="/" className="hover:text-[#B38E46] transition-colors font-medium">
              Return to Collection Portal →
            </Link>
          </div>
        </div>
      </footer>

      {/* ================= SPECIAL COMMISSION / CONSULTATION MODAL ================= */}
      {isConsultModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsConsultModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFD1] shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsConsultModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#F8F4EE] text-[#8C6228] border border-[#DFCEB9] mb-2">
                Collection Support Counsel
              </span>
              <h3 className="text-xl font-serif text-neutral-900 font-semibold">
                Special Commission Request
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                For custom legal clauses, private family foundation billing, or international protocol handling.
              </p>
            </div>

            <form onSubmit={handleConsultSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Patron / Representative Name *
                </label>
                <input
                  type="text"
                  required
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  placeholder="e.g. Shagufta Naaz / Event Architect"
                  className="w-full text-xs p-3 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Direct Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={consultForm.phone}
                    onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                    placeholder="+91 96926 68263"
                    className="w-full text-xs p-3 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={consultForm.email}
                    onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    placeholder="shahnawazalirkl@gmail.com"
                    className="w-full text-xs p-3 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Role
                </label>
                <select
                  value={consultForm.role}
                  onChange={(e) => setConsultForm({ ...consultForm, role: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Couple / Patron">Couple / Patron</option>
                  <option value="Wedding Planner / Event Designer">Wedding Planner / Event Designer</option>
                  <option value="Corporate / Private Family Office">Corporate / Private Family Office</option>
                  <option value="Legal Counsel">Legal Counsel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Specific Requirements or Clarifications *
                </label>
                <textarea
                  rows={3}
                  required
                  value={consultForm.notes}
                  onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                  placeholder="Details regarding your commission dates, destination staging, custom heraldic dies, or billing needs..."
                  className="w-full text-xs p-3 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={consultSubmitted}
                  className="w-full py-3 px-4 rounded-lg bg-[#C5A059] hover:bg-[#B38E46] text-[#141414] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {consultSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Transmitting Docket Request...</span>
                    </>
                  ) : (
                    <span>Transmit Docket Request to Legal Desk</span>
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

export default TermsOfServicePage;
