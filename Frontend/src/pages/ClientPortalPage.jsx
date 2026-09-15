import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Check, 
  Download, 
  MessageSquare, 
  ExternalLink, 
  Video, 
  FileText, 
  Calendar, 
  Clock, 
  Music, 
  Users, 
  Eye, 
  AlertCircle, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  X, 
  RotateCw,
  Printer,
  ChevronRight
} from 'lucide-react';

const DOCKET_DATA = {
  'ASRA-2026-8842X': {
    docketId: 'ASRA-2026-8842X',
    patronName: 'Lady Eleanor Vance & Tariq Al-Mansoor',
    patronInitials: 'EK',
    suiteCode: 'Sovereign Suite #8842X',
    ceremonyDestination: 'Villa Balbiano, Lake Como, Italy',
    ceremonyDate: 'October 28, 2026',
    deliveryDate: 'October 24, 2026',
    handoverTime: 'Target: Oct 24, 11:00 AM CET',
    overallProgress: 68,
    activeStage: 3,
    totalStages: 5,
    leadStylist: {
      name: 'Meera Kashyap',
      initials: 'MK',
      title: 'Lead Bridal Concierge',
      location: 'Atelier Jubilee Hills, Hyderabad',
      note: '"We have received the sample Italian foil swatches today. The gold hue aligns seamlessly with your stationery parchment."',
      phone: '+91 96926 68263',
      whatsapp: 'https://wa.me/919692668263'
    },
    monogramDie: {
      dieId: 'HYD-2026-ET',
      initials: 'ET',
      metal: 'Solid CNC Milled Brass',
      dimensions: '85mm × 85mm',
      relief: '2.2mm Depth',
      angle: '45° Chamfered Edge',
      bevelDepth: '0.35mm depth',
      storageTerm: '5-Yr Sovereign Preservation'
    },
    itinerary: {
      destination: 'Villa Balbiano, Via Regina 2',
      city: '22010 Ossuccio CO, Lake Como, Italy',
      careOf: 'C/O Concierge Signorina Bellini',
      crating: 'Shock-Cushioned Wooden Crating',
      lining: 'Moisture & Cryo-Sealed Lining',
      insuredValue: '₹5,00,000',
      protocol: 'Direct Suite Handover',
      inspection: 'Personalized Uncrating & Inspection'
    },
    items: [
      {
        id: 'trunk-01',
        categoryTag: 'TRUNK',
        title: 'The Sovereign Bridal Keepsake Chest',
        description: 'Hand-turned aged teakwood · French silk velvet lining · 24K Gold Inlay Monogram',
        qty: '1 Bespoke Masterpiece',
        price: '₹84,500',
        status: 'In Hand-Assembly',
        statusColor: 'emerald',
        spec: {
          material: 'Aged Solid Teakwood & 24K Leaf Inlay',
          lining: 'Champagne Silk Velvet (100% Mulberry)',
          dimensions: '45cm × 32cm × 20cm',
          lock: 'Hand-forged Brass Cremone Lock with Tasseled Key',
          artisan: 'Master Woodwright Anant & Gold Guilder Ravi'
        }
      },
      {
        id: 'favors-02',
        categoryTag: 'FAVORS',
        title: 'Lake Como Royal Guest Welcome Hampers',
        description: 'Debossed monogram luggage tag, artisanal scented candle, botanical wax seal',
        qty: '120 Guests',
        price: '₹2,04,000',
        status: 'Leather Debossing Active',
        statusColor: 'amber',
        guestListCount: 120
      },
      {
        id: 'crystal-03',
        categoryTag: 'CRYSTAL',
        title: 'Optical Crystal First-Dance Plaque with Solid Brass Base',
        description: 'Sub-millimeter laser internal etching · Scannable Spotify waveform cipher',
        qty: '1 Keepsake',
        price: '₹14,900',
        status: 'Laser Etched & Certified',
        statusColor: 'emerald',
        songTitle: 'Can\'t Help Falling In Love (Orchestral Suite)',
        artist: 'Royal Philharmonic Orchestra'
      }
    ],
    documents: [
      {
        id: 'doc-contract',
        name: 'Bespoke Production Contract',
        meta: 'Signed Sept 18 · Docket #8842X',
        type: 'PDF',
        actionLabel: 'PDF ↓',
        date: 'Sept 18, 2026'
      },
      {
        id: 'doc-gold',
        name: '24K Gold Leaf Certificate',
        meta: 'Assigned Assay Serial #GL-9021',
        type: 'CERTIFICATE',
        actionLabel: 'View Proof',
        date: 'Sept 25, 2026'
      },
      {
        id: 'doc-invoice',
        name: 'Full Invoice & GST Receipt',
        meta: 'Paid in Full via Net Banking',
        type: 'INVOICE',
        actionLabel: 'Download',
        date: 'Sept 18, 2026'
      },
      {
        id: 'doc-insurance',
        name: 'Transit Insurance Covenant',
        meta: 'Policy #ASRA-INS-4492',
        type: 'POLICY',
        actionLabel: 'Policy PDF',
        date: 'Oct 02, 2026'
      }
    ]
  }
};

const INITIAL_GUEST_PREVIEW = [
  { name: 'Lord & Lady Althorp', tagInitials: 'A', table: 'Grand Terrace', gift: 'Scented Candle + Tag' },
  { name: 'Contessa Sofia Bianchi', tagInitials: 'SB', table: 'Villa Balbiano Hall', gift: 'Botanical Wax Hamper' },
  { name: 'Dr. Tariq & Dr. Zahra Mir', tagInitials: 'ZM', table: 'Lake Pergola', gift: 'Silk Monogram Set' },
  { name: 'Prince & Princess Sayeed', tagInitials: 'PS', table: 'Royal Loggia', gift: '24K Foil Hamper' },
  { name: 'Don Alessandro Moretti', tagInitials: 'AM', table: 'Olive Grove', gift: 'Artisanal Reserve Favors' }
];

const ClientPortalPage = () => {
  const [searchParams] = useSearchParams();
  const docketId = searchParams.get('docket') || 'ASRA-2026-8842X';
  const data = DOCKET_DATA[docketId] || DOCKET_DATA['ASRA-2026-8842X'];

  // Interactive States
  const [proofApproved, setProofApproved] = useState(false);
  const [approvalDate, setApprovalDate] = useState(null);
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [revisionSubmitted, setRevisionSubmitted] = useState(false);
  const [cadModalOpen, setCadModalOpen] = useState(false);
  const [cadAngle, setCadAngle] = useState(45);
  const [cadMetalFinish, setCadMetalFinish] = useState('24k-gold');
  const [cadDepthZoom, setCadDepthZoom] = useState(1);
  
  // Modals for Items & Stylist
  const [specModalOpen, setSpecModalOpen] = useState(false);
  const [activeSpecItem, setActiveSpecItem] = useState(null);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [guests, setGuests] = useState(INITIAL_GUEST_PREVIEW);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestInitials, setNewGuestInitials] = useState('');
  
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoDate, setSelectedVideoDate] = useState('2026-09-22');
  const [selectedVideoTime, setSelectedVideoTime] = useState('16:00 IST');
  const [videoBookingConfirmed, setVideoBookingConfirmed] = useState(false);
  
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  
  const [recommissionModalOpen, setRecommissionModalOpen] = useState(false);
  const [recommissionNotes, setRecommissionNotes] = useState('');
  const [recommissionSuccess, setRecommissionSuccess] = useState(false);

  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [assistancePriority, setAssistancePriority] = useState('customs');
  const [assistanceMessage, setAssistanceMessage] = useState('');
  const [assistanceSent, setAssistanceSent] = useState(false);

  const [sessionLocked, setSessionLocked] = useState(false);
  const [unlockPin, setUnlockPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Audio simulator timer
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        // Just keeping active animation
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleApproveProof = () => {
    setProofApproved(true);
    setApprovalDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  };

  const handleAddGuest = (e) => {
    e.preventDefault();
    if (newGuestName.trim()) {
      setGuests([
        ...guests,
        {
          name: newGuestName.trim(),
          tagInitials: newGuestInitials.trim().toUpperCase() || newGuestName.trim().slice(0, 2).toUpperCase(),
          table: 'Confirmed Guest Suite',
          gift: 'Debossed Monogram Hamper'
        }
      ]);
      setNewGuestName('');
      setNewGuestInitials('');
    }
  };

  const handlePrintDocket = () => {
    window.print();
  };

  const handleUnlockSession = (e) => {
    e.preventDefault();
    if (unlockPin === '8842' || unlockPin === '1234' || unlockPin.length >= 4) {
      setSessionLocked(false);
      setUnlockPin('');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  if (sessionLocked) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-[#222222]">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#E7D5BF] card-shadow text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#121212] text-[#C8A97E] border border-[#C8A97E]/50 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#C8A97E]" />
          </div>
          <div>
            <span className="text-[10px] tracking-widest uppercase text-[#9B7443] font-semibold block mb-1">
              Encrypted Client Vault
            </span>
            <h2 className="text-2xl font-serif-luxury font-bold text-[#121212]">
              Sanctuary Locked
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              Please enter your 4-digit Sovereign Suite PIN (Default: <code className="text-[#75542E] font-bold">8842</code>) to resume your live session.
            </p>
          </div>

          <form onSubmit={handleUnlockSession} className="space-y-4">
            <input
              type="password"
              maxLength={4}
              value={unlockPin}
              onChange={(e) => { setUnlockPin(e.target.value); setPinError(false); }}
              placeholder="••••"
              className="w-36 mx-auto text-center text-2xl tracking-[0.5em] py-2 px-3 border border-[#C8A97E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75542E]/30 bg-[#FAF7F2]"
              autoFocus
            />
            {pinError && (
              <p className="text-xs text-red-600">Incorrect PIN. Try default '8842'.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#75542E] hover:bg-[#9B7443] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow"
            >
              Unlock Sovereign Vault
            </button>
          </form>

          <div className="pt-2 border-t border-[#E7D5BF]/60 text-[11px] text-stone-500">
            <Link to="/" className="text-[#75542E] hover:underline font-medium">
              Return to Public Maison Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] text-[#222222] min-h-screen antialiased selection:bg-[#E7D5BF] selection:text-[#2E1E0E]">
      
      {/* =========================================================================
          TOP MINIMALIST ATELIER ENCRYPTED UTILITY BAR (STRICTLY NO GENERAL WEBSITE HEADER)
         ========================================================================= */}
      <header className="w-full bg-[#FDFBF7] border-b border-[#E7D5BF]/70 sticky top-0 z-40 px-6 lg:px-12 py-3.5 backdrop-blur-md bg-opacity-95 transition-all print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Return Navigation & Active Session Status */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-xs tracking-wider uppercase font-medium text-[#75542E] hover:text-[#9B7443] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5 transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to Maison</span>
            </Link>
            <div className="h-4 w-[1px] bg-[#E7D5BF]"></div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot"></span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-stone-600 hidden sm:inline">
                Encrypted Client Sanctuary · Live Session
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase text-stone-600 sm:hidden">
                Live Sanctuary
              </span>
            </div>
          </div>

          {/* Center: Emblem Brand Seal */}
          <Link to="/" className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
            <div className="w-7 h-7 rounded-full border border-[#C8A97E] flex items-center justify-center bg-[#FAF7F2]">
              <span className="font-serif-luxury text-sm font-bold text-[#75542E]">AS</span>
            </div>
            <div className="text-center hidden md:block">
              <span className="block text-xs tracking-[0.25em] font-semibold text-[#2E1E0E] uppercase font-serif-luxury">
                Maison ASRA
              </span>
              <span className="block text-[9px] tracking-[0.18em] text-[#9B7443] uppercase -mt-0.5">
                Sovereign Vault
              </span>
            </div>
          </Link>

          {/* Right: Client Credentials & Security Badge */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden lg:flex items-center space-x-2 text-[11px] text-stone-500 bg-[#F4ECE0]/60 px-3 py-1 rounded-full border border-[#E7D5BF]">
              <Shield className="w-3.5 h-3.5 text-[#9B7443]" />
              <span className="font-medium text-[#75542E]">256-Bit SSL Encrypted Protocol</span>
            </div>

            {/* Account Profile Badge */}
            <div className="flex items-center space-x-2 sm:space-x-3 pl-2">
              <div className="w-8 h-8 rounded-full bg-[#121212] text-[#E7D5BF] flex items-center justify-center font-serif-luxury text-xs font-semibold border border-[#C8A97E]/50 shadow-sm">
                {data.patronInitials}
              </div>
              <div className="text-left hidden md:block">
                <span className="block text-xs font-semibold text-[#121212] leading-tight">
                  {data.patronName}
                </span>
                <span className="block text-[10px] text-[#9B7443] tracking-wide font-medium">
                  {data.suiteCode}
                </span>
              </div>
              <button 
                onClick={() => setSessionLocked(true)}
                title="Lock & Protect Session" 
                className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                aria-label="Lock Session"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* =========================================================================
          MAIN SANCTUARY CONTENT CONTAINER
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-10">
        
        {/* 1. EDITORIAL SUITE WELCOME & CEREMONIAL HEADER */}
        <section className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7D5BF] pb-8 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#9B7443] mb-2">
              <span>◆</span>
              <span>Bespoke Bridal & Trousseau Client Sanctuary</span>
              <span>◆</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-serif-luxury font-normal text-[#121212] tracking-tight">
              Welcome to Your <span className="italic font-normal gold-gradient-text font-serif">Atelier Sanctuary</span>
            </h1>
            <p className="text-xs lg:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Active commission dossier for <strong className="text-stone-800 font-semibold">{data.patronName}</strong> · Destination Ceremony: <span className="italic">{data.ceremonyDestination}</span> · Assigned Lead Atelier Stylist: <span className="text-[#75542E] font-medium underline decoration-[#C8A97E]">{data.leadStylist.name}</span>.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handlePrintDocket}
              className="px-4 py-2.5 bg-white hover:bg-stone-50 text-[#75542E] border border-[#C8A97E] text-xs font-semibold tracking-wider uppercase rounded shadow-sm transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-[#9B7443]" />
              <span>Download Master Docket</span>
            </button>

            <a 
              href={data.leadStylist.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#121212] hover:bg-[#222222] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase rounded shadow-sm transition-all flex items-center space-x-2 border border-[#C8A97E]/40"
            >
              <Phone className="w-4 h-4 text-[#C8A97E]" />
              <span>Direct Stylist Hotline</span>
            </a>
          </div>
        </section>

        {/* 2. QUICK EXECUTIVE METRICS & CEREMONIAL SUMMARY STRIP */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border border-[#E7D5BF] card-shadow">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 block">Commission Docket</span>
            <div className="text-lg sm:text-xl font-serif-luxury font-bold text-[#121212] mt-1">#{data.docketId}</div>
            <span className="text-[11px] text-[#9B7443] font-medium flex items-center mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B7443] mr-1.5"></span>
              Villa Balbiano Grand Suite
            </span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#E7D5BF] card-shadow">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 block">Overall Handcraft Status</span>
            <div className="text-lg sm:text-xl font-serif-luxury font-bold text-[#75542E] mt-1">{data.overallProgress}% Completed</div>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span>
              Stage 3: Foundry Debossing
            </span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#E7D5BF] card-shadow">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 block">Ceremony Target Date</span>
            <div className="text-lg sm:text-xl font-serif-luxury font-bold text-[#121212] mt-1">{data.ceremonyDate}</div>
            <span className="text-[11px] text-stone-600 font-medium mt-1 block">White-Glove Delivery Oct 24</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#E7D5BF] card-shadow">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 block">Monogram Die Archival</span>
            <div className="text-lg sm:text-xl font-serif-luxury font-bold text-[#121212] mt-1">Die #{data.monogramDie.dieId}</div>
            <span className="text-[11px] text-[#75542E] font-medium mt-1 block">{data.monogramDie.storageTerm}</span>
          </div>
        </section>

        {/* 3. PRODUCTION TIMELINE SHOWCASE (STAGE 3 OF 5 ACTIVE) */}
        <section className="bg-white p-6 lg:p-8 rounded-xl border border-[#E7D5BF] card-shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E7D5BF]/80 pb-5 gap-4">
            <div>
              <span className="badge-soft-gold text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded inline-block">
                Stage 3 of 5 · In Master Craft Production
              </span>
              <h2 className="text-xl lg:text-2xl font-serif-luxury font-bold text-[#121212] mt-2">
                The Sovereign Bridal Trousseau & 120 Keepsake Suites
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Docket ID: <strong>{data.docketId}</strong> · Dispatched via Insured Temperature-Controlled Air Courier
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[10px] tracking-widest uppercase text-stone-500 block font-medium">Production Progress</span>
              <span className="font-serif-luxury text-2xl md:text-3xl font-bold text-[#75542E]">{data.overallProgress}% Handcrafted</span>
            </div>
          </div>

          {/* Step Timeline Graphic */}
          <div className="pt-8 pb-4">
            <div className="relative">
              {/* Horizontal Line for Desktop */}
              <div className="hidden md:block absolute top-5 left-8 right-8 h-0.5 bg-[#E7D5BF]"></div>
              <div className="hidden md:block absolute top-5 left-8 w-1/2 h-0.5 bg-[#75542E]"></div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
                
                {/* Step 1: Completed */}
                <div className="text-center group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#121212] text-[#C8A97E] border-2 border-[#121212] flex items-center justify-center font-bold text-xs shadow-md transition-transform group-hover:scale-105">
                    ✓
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#121212] mt-2.5 font-serif-luxury">Design Blueprint</span>
                  <span className="block text-[11px] text-emerald-700 font-medium">Approved Sept 18</span>
                </div>

                {/* Step 2: Completed */}
                <div className="text-center group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#121212] text-[#C8A97E] border-2 border-[#121212] flex items-center justify-center font-bold text-xs shadow-md transition-transform group-hover:scale-105">
                    ✓
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#121212] mt-2.5 font-serif-luxury">Brass Die Casting</span>
                  <span className="block text-[11px] text-emerald-700 font-medium">Milled Sept 28</span>
                </div>

                {/* Step 3: Active Stage */}
                <div className="text-center group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#C8A97E] text-[#121212] border-2 border-[#75542E] flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-[#F4ECE0] transition-transform group-hover:scale-105">
                    03
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#75542E] mt-2.5 font-serif-luxury">Artisanal Debossing</span>
                  <span className="block text-[11px] text-[#75542E] font-medium flex items-center justify-center mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-1 pulse-dot"></span>
                    Live in Hyderabad Foundry
                  </span>
                </div>

                {/* Step 4: Pending */}
                <div className="text-center opacity-70 group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-white text-stone-400 border-2 border-[#E7D5BF] flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-stone-600 mt-2.5 font-serif-luxury">Wax Seal & Ribboning</span>
                  <span className="block text-[11px] text-stone-500">Est. Oct 16</span>
                </div>

                {/* Step 5: Handover */}
                <div className="text-center opacity-70 group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-white text-stone-400 border-2 border-[#E7D5BF] flex items-center justify-center font-bold text-xs">
                    05
                  </div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-stone-600 mt-2.5 font-serif-luxury">White-Glove Handover</span>
                  <span className="block text-[11px] text-stone-500">Est. Oct 24 (Villa Balbiano)</span>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 4. TWO-COLUMN INTERACTIVE SUITE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT / CENTER COLUMN (2 COLS): APPROVALS, COMMISSION DOSSIER, RECENT ORDERS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* PENDING APPROVAL DOCKET: 3D MONOGRAM DIE PROOF */}
            <div className="bg-[#FDFBF7] border-2 border-[#C8A97E] rounded-xl p-6 lg:p-7 card-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#C8A97E] text-[#121212] text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-bl">
                {proofApproved ? 'Patron Approval Logged ✓' : 'Action Required · Proofing Sign-off'}
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-wider uppercase text-[#75542E] mb-2">
                <span className={`w-2 h-2 rounded-full ${proofApproved ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                <span>{proofApproved ? `Approved on ${approvalDate} for Master Tooling` : 'Awaiting Patron Sign-Off'}</span>
              </div>

              <h3 className="text-xl font-serif-luxury font-bold text-[#121212]">
                3D Monogram Debossing Depth Proof (Revision v2.1)
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Master engraver <strong className="text-stone-800">Rajesh V.</strong> has adjusted the bevel relief to <strong className="text-stone-800">{data.monogramDie.bevelDepth}</strong> to guarantee razor-sharp 24K gold foil indentation on your Florentine ivory calfskin chests.
              </p>

              {/* Photorealistic Render Simulation Frame */}
              <div className="my-5 bg-[#121212] p-5 rounded-lg border border-[#C8A97E]/40 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded bg-[#1C1A17] border border-[#C8A97E] flex flex-col items-center justify-center p-2 text-center shadow-inner relative group cursor-pointer"
                       onClick={() => setCadModalOpen(true)}>
                    <span className="font-serif-luxury text-2xl font-bold gold-gradient-text tracking-tight">
                      {data.monogramDie.initials}
                    </span>
                    <span className="text-[8px] text-[#C8A97E] uppercase tracking-widest mt-0.5">24K Foil Die</span>
                    <div className="absolute inset-0 bg-[#C8A97E]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-serif-luxury font-semibold text-[#FAF7F2] text-sm block">
                      Die Spec: {data.monogramDie.metal} {data.monogramDie.dimensions.split(' ')[0]}
                    </span>
                    <span className="block text-[11px] text-[#C8A97E] mt-0.5">
                      Relief: {data.monogramDie.relief} · Angle: {data.monogramDie.angle}
                    </span>
                    <span className="block text-[10px] text-stone-400 mt-0.5">
                      Uploaded today at 11:20 AM IST by Lead Stylist {data.leadStylist.name}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setCadModalOpen(true)}
                  className="text-xs text-[#FAF7F2] hover:text-[#C8A97E] underline underline-offset-4 tracking-wider uppercase font-medium flex items-center space-x-1.5 transition-colors"
                >
                  <span>View Fullscreen 3D CAD Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sign-Off Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {!proofApproved ? (
                  <button 
                    onClick={handleApproveProof}
                    className="px-5 py-2.5 bg-[#75542E] hover:bg-[#9B7443] text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-all flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4 text-[#E7D5BF]" />
                    <span>Approve Proof for Metal Milling</span>
                  </button>
                ) : (
                  <div className="px-4 py-2 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold tracking-wider uppercase rounded flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Signed Off &amp; Sent to Foundry</span>
                  </div>
                )}
                
                <button 
                  onClick={() => setRevisionModalOpen(true)}
                  className="px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 text-xs font-medium tracking-wider uppercase rounded transition-all"
                >
                  Request Typographic Revision
                </button>
              </div>
            </div>

            {/* CURATED KEEPSAKE SUITE DOSSIER (ACTIVE ITEMS IN THIS ORDER) */}
            <div className="bg-white rounded-xl border border-[#E7D5BF] p-6 lg:p-7 card-shadow">
              <div className="flex items-center justify-between border-b border-[#E7D5BF]/80 pb-4">
                <div>
                  <h3 className="text-xl font-serif-luxury font-bold text-[#121212]">Commissioned Suite Dossier</h3>
                  <p className="text-xs text-stone-500">3 bespoke heirloom product lines active under Docket #{data.docketId}</p>
                </div>
                <span className="text-xs text-[#9B7443] font-medium tracking-wide">Vault Archive #892-HYD</span>
              </div>

              <div className="divide-y divide-[#E7D5BF]/60 mt-2">
                
                {/* Item 1: Sovereign Bridal Keepsake Chest */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded bg-[#F4ECE0] border border-[#E7D5BF] flex items-center justify-center text-xs font-bold text-[#75542E] font-serif-luxury tracking-widest uppercase shrink-0">
                      TRUNK
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#121212] font-serif-luxury text-base">
                        The Sovereign Bridal Keepsake Chest
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Hand-turned aged teakwood · French silk velvet lining · 24K Gold Inlay Monogram
                      </p>
                      <div className="flex items-center space-x-3 mt-1.5">
                        <span className="text-[10px] tracking-wider uppercase font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          In Hand-Assembly
                        </span>
                        <span className="text-xs text-stone-500">Qty: 1 Bespoke Masterpiece</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right sm:min-w-[140px]">
                    <span className="block text-sm font-bold text-[#121212] font-serif-luxury text-base">₹84,500</span>
                    <button 
                      onClick={() => { setActiveSpecItem(data.items[0]); setSpecModalOpen(true); }}
                      className="text-[11px] text-[#9B7443] hover:underline font-medium mt-0.5 inline-block"
                    >
                      View Spec Sheet →
                    </button>
                  </div>
                </div>

                {/* Item 2: Lake Como Royal Guest Favors */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded bg-[#F4ECE0] border border-[#E7D5BF] flex items-center justify-center text-xs font-bold text-[#75542E] font-serif-luxury tracking-widest uppercase shrink-0">
                      FAVORS
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#121212] font-serif-luxury text-base">
                        Lake Como Royal Guest Welcome Hampers
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Debossed monogram luggage tag, artisanal scented candle, botanical wax seal
                      </p>
                      <div className="flex items-center space-x-3 mt-1.5">
                        <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Leather Debossing Active
                        </span>
                        <span className="text-xs text-stone-500">Qty: 120 Guests</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right sm:min-w-[140px]">
                    <span className="block text-sm font-bold text-[#121212] font-serif-luxury text-base">₹2,04,000</span>
                    <button 
                      onClick={() => setGuestModalOpen(true)}
                      className="text-[11px] text-[#9B7443] hover:underline font-medium mt-0.5 inline-block"
                    >
                      Manage Guest Names →
                    </button>
                  </div>
                </div>

                {/* Item 3: Optical Crystal First Dance Plaque */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded bg-[#F4ECE0] border border-[#E7D5BF] flex items-center justify-center text-xs font-bold text-[#75542E] font-serif-luxury tracking-widest uppercase shrink-0">
                      CRYSTAL
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#121212] font-serif-luxury text-base">
                        Optical Crystal First-Dance Plaque with Solid Brass Base
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Sub-millimeter laser internal etching · Scannable Spotify waveform cipher
                      </p>
                      <div className="flex items-center space-x-3 mt-1.5">
                        <span className="text-[10px] tracking-wider uppercase font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Laser Etched &amp; Certified
                        </span>
                        <span className="text-xs text-stone-500">Qty: 1 Keepsake</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right sm:min-w-[140px]">
                    <span className="block text-sm font-bold text-[#121212] font-serif-luxury text-base">₹14,900</span>
                    <button 
                      onClick={() => setAudioModalOpen(true)}
                      className="text-[11px] text-[#9B7443] hover:underline font-medium mt-0.5 inline-block"
                    >
                      Test Audio Waveform →
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* TRANSIT & DELIVERY DESTINATION ITINERARY */}
            <div className="bg-white rounded-xl border border-[#E7D5BF] p-6 lg:p-7 card-shadow">
              <div className="flex items-center justify-between border-b border-[#E7D5BF]/80 pb-4">
                <div>
                  <h3 className="text-xl font-serif-luxury font-bold text-[#121212]">Transit &amp; Delivery Itinerary</h3>
                  <p className="text-xs text-stone-500">Insured bonded international consignment route</p>
                </div>
                <Link 
                  to="/track-order" 
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-medium tracking-wide flex items-center gap-1 group"
                >
                  <span>Global Air Vault Insured</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7D5BF]">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 block">Destination Address</span>
                  <p className="text-xs font-semibold text-stone-900 mt-1">{data.itinerary.destination}</p>
                  <p className="text-xs text-stone-600">{data.itinerary.city}</p>
                  <span className="text-[10px] text-[#75542E] font-medium block mt-1">{data.itinerary.careOf}</span>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7D5BF]">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 block">Transit Specification</span>
                  <p className="text-xs font-semibold text-stone-900 mt-1">{data.itinerary.crating}</p>
                  <p className="text-xs text-stone-600">{data.itinerary.lining}</p>
                  <span className="text-[10px] text-emerald-700 font-medium block mt-1">Insured Value: {data.itinerary.insuredValue}</span>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7D5BF]">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 block">Handover Protocol</span>
                  <p className="text-xs font-semibold text-stone-900 mt-1">{data.itinerary.protocol}</p>
                  <p className="text-xs text-stone-600">{data.itinerary.inspection}</p>
                  <span className="text-[10px] text-stone-500 block mt-1">{data.handoverTime}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (1 COL): STYLIST CONCIERGE, BRASS DIE VAULT, CLIENT VAULT DOCUMENTS */}
          <div className="space-y-8">
            
            {/* LEAD BRIDAL STYLIST CONCIERGE CARD (OBSIDIAN LUXURY) */}
            <div className="bg-[#121212] rounded-xl p-6 text-white border border-[#C8A97E]/50 card-shadow relative overflow-hidden">
              <div className="flex items-center space-x-4 border-b border-stone-800 pb-5">
                <div className="w-14 h-14 rounded-full bg-[#1C1A17] border-2 border-[#C8A97E] flex items-center justify-center font-serif-luxury text-lg font-bold text-[#E7D5BF] shrink-0">
                  {data.leadStylist.initials}
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-[#C8A97E] font-semibold block">
                    {data.leadStylist.title}
                  </span>
                  <h4 className="text-lg font-serif-luxury font-bold text-white">
                    {data.leadStylist.name}
                  </h4>
                  <span className="text-xs text-stone-400">
                    {data.leadStylist.location}
                  </span>
                </div>
              </div>

              <div className="py-4 text-xs text-stone-300 leading-relaxed italic">
                {data.leadStylist.note}
              </div>

              <div className="space-y-2.5 pt-2">
                <a 
                  href={data.leadStylist.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase rounded flex items-center justify-center space-x-2 transition-colors shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat via WhatsApp</span>
                </a>

                <button 
                  onClick={() => setVideoModalOpen(true)}
                  className="w-full py-2.5 bg-transparent hover:bg-stone-800 text-[#FAF7F2] border border-[#C8A97E] text-xs font-semibold tracking-wider uppercase rounded transition-colors flex items-center justify-center space-x-2"
                >
                  <Video className="w-4 h-4 text-[#C8A97E]" />
                  <span>Schedule Video Tasting Call</span>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 text-[10px] text-stone-400 text-center">
                Direct Atelier Line:{' '}
                <a href={`tel:${data.leadStylist.phone}`} className="text-[#E7D5BF] hover:underline font-medium">
                  {data.leadStylist.phone}
                </a>
              </div>
            </div>

            {/* BRASS DIE ARCHIVAL VAULT */}
            <div className="bg-white rounded-xl border border-[#E7D5BF] p-6 card-shadow">
              <div className="flex items-center justify-between border-b border-[#E7D5BF]/80 pb-3">
                <h3 className="text-base font-serif-luxury font-bold text-[#121212]">Brass Die Archival Vault</h3>
                <span className="text-[10px] uppercase tracking-wider text-[#75542E] font-semibold bg-[#F4ECE0] px-2 py-0.5 rounded">
                  Complimentary 5-Yr Storage
                </span>
              </div>

              <div className="my-4 p-4 bg-[#FAF7F2] rounded-lg border border-[#E7D5BF] text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#C8A97E] flex items-center justify-center font-serif-luxury text-xl font-bold gold-gradient-text shadow-sm">
                  {data.monogramDie.initials}
                </div>
                <div className="text-xs font-bold text-stone-900 mt-2">Die No. {data.monogramDie.dieId}</div>
                <div className="text-[11px] text-stone-500">{data.monogramDie.metal} · {data.monogramDie.dimensions} · {data.monogramDie.relief}</div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Your physical master die remains preserved in our climate-shielded Hyderabad vault for complimentary re-orders (anniversary gift books, thank-you cards, and holiday trousseaus).
              </p>

              <button 
                onClick={() => setRecommissionModalOpen(true)}
                className="w-full mt-4 py-2 border border-stone-300 hover:border-[#C8A97E] text-stone-700 text-xs font-medium uppercase tracking-wider rounded transition-colors"
              >
                Request Die Vault Re-Commission
              </button>
            </div>

            {/* CLIENT VAULT DOCUMENTS & CEREMONIAL CONTRACTS */}
            <div className="bg-white rounded-xl border border-[#E7D5BF] p-6 card-shadow">
              <h3 className="text-base font-serif-luxury font-bold text-[#121212] border-b border-[#E7D5BF]/80 pb-3">
                Client Vault Documents
              </h3>

              <div className="divide-y divide-[#E7D5BF]/60 text-xs mt-2">
                {data.documents.map((doc) => (
                  <div key={doc.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-stone-900 block">{doc.name}</span>
                      <span className="text-[10px] text-stone-400">{doc.meta}</span>
                    </div>
                    <button 
                      onClick={() => { setActiveDoc(doc); setDocModalOpen(true); }}
                      className="text-[#75542E] font-medium hover:underline text-[11px]"
                    >
                      {doc.actionLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* PRIORITY ASSISTANCE PROTOCOL */}
            <div className="p-4 bg-[#F4ECE0]/50 rounded-lg border border-[#E7D5BF] text-xs space-y-1.5">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#75542E] block">Priority Ceremony Assistance</span>
              <p className="text-stone-600 leading-relaxed">
                Need urgent alterations to delivery coordinates, guest counts, or destination customs clearance?
              </p>
              <button 
                onClick={() => setAssistanceModalOpen(true)}
                className="inline-block text-[#9B7443] font-semibold hover:underline pt-1 text-left"
              >
                Dispatch Urgent Request to Master of Ceremonies →
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* =========================================================================
          MINIMAL CLIENT DOCKET BAR (STRICTLY NO GENERAL WEBSITE FOOTER)
         ========================================================================= */}
      <footer className="w-full bg-[#FAF7F2] border-t border-[#E7D5BF]/80 py-4 px-6 lg:px-12 text-stone-500 text-[11px] mt-12 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-4">
            <span className="font-serif-luxury font-bold tracking-widest text-[#75542E] uppercase">ASRA Wedding Canvas</span>
            <span>·</span>
            <span>Private Bridal Client Vault · Docket #{data.docketId}</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] tracking-wider uppercase">
            <Link to="/privacy-policy" className="hover:text-[#75542E] transition-colors">Security &amp; NDA Protocol</Link>
            <Link to="/return-policy" className="hover:text-[#75542E] transition-colors">Transit Insurance</Link>
            <button 
              onClick={() => setSessionLocked(true)}
              className="hover:text-[#75542E] transition-colors text-stone-700 font-medium"
            >
              Lock &amp; Logout Portal
            </button>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE MODALS & PREVIEWS
         ========================================================================= */}

      {/* 1. 3D FULLSCREEN CAD PREVIEW MODAL */}
      {cadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#161616] text-[#FAF7F2] max-w-3xl w-full rounded-2xl border border-[#C8A97E]/50 overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A97E] font-semibold block">
                  Interactive Milling CAD Simulation
                </span>
                <h3 className="text-xl font-serif-luxury font-bold text-white">
                  3D Monogram Depth &amp; Bevel Inspection
                </h3>
              </div>
              <button 
                onClick={() => setCadModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center justify-center bg-radial from-stone-900 to-black min-h-[360px] relative select-none">
              {/* Simulated 3D Die Block */}
              <div 
                className="w-56 h-56 rounded-2xl flex flex-col items-center justify-center relative shadow-2xl transition-all duration-300"
                style={{
                  background: cadMetalFinish === '24k-gold' 
                    ? 'linear-gradient(135deg, #ECC880 0%, #C8A97E 40%, #947137 100%)' 
                    : cadMetalFinish === 'rose-gold'
                    ? 'linear-gradient(135deg, #F3C3B8 0%, #C98A7D 50%, #87473A 100%)'
                    : 'linear-gradient(135deg, #B58A55 0%, #8C6228 50%, #4D3310 100%)',
                  transform: `rotate(${cadAngle}deg) scale(${cadDepthZoom})`,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.6)'
                }}
              >
                <div className="w-44 h-44 rounded-xl border-2 border-stone-900/30 flex flex-col items-center justify-center bg-black/10 backdrop-blur-xs">
                  <span className="font-serif-luxury text-6xl font-extrabold text-stone-900/80 drop-shadow-[0_2px_2px_rgba(255,255,255,0.4)] tracking-tighter">
                    {data.monogramDie.initials}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-stone-900/70 font-bold mt-1">
                    0.35mm Bevel
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-stone-400">
                <span>Relief: {data.monogramDie.relief}</span>
                <span>Angle: {data.monogramDie.angle}</span>
                <span>Alloy: CuZn39Pb3 Brass</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="p-4 sm:p-6 bg-stone-900 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-stone-400">Rotate:</span>
                <button 
                  onClick={() => setCadAngle((prev) => (prev + 45) % 360)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-xs rounded text-stone-200 flex items-center space-x-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#C8A97E]" />
                  <span>{cadAngle}° Turn</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-stone-400">Foil Shade:</span>
                <button 
                  onClick={() => setCadMetalFinish('24k-gold')}
                  className={`px-3 py-1 text-xs rounded border ${cadMetalFinish === '24k-gold' ? 'border-[#C8A97E] text-[#C8A97E] bg-stone-800' : 'border-stone-700 text-stone-400'}`}
                >
                  24K Gold
                </button>
                <button 
                  onClick={() => setCadMetalFinish('rose-gold')}
                  className={`px-3 py-1 text-xs rounded border ${cadMetalFinish === 'rose-gold' ? 'border-[#C8A97E] text-[#C8A97E] bg-stone-800' : 'border-stone-700 text-stone-400'}`}
                >
                  Rose Gold
                </button>
                <button 
                  onClick={() => setCadMetalFinish('antique-bronze')}
                  className={`px-3 py-1 text-xs rounded border ${cadMetalFinish === 'antique-bronze' ? 'border-[#C8A97E] text-[#C8A97E] bg-stone-800' : 'border-stone-700 text-stone-400'}`}
                >
                  Bronze
                </button>
              </div>

              <button
                onClick={() => { handleApproveProof(); setCadModalOpen(false); }}
                className="px-4 py-2 bg-[#75542E] hover:bg-[#9B7443] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                Approve This Specification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TYPOGRAPHIC REVISION REQUEST MODAL */}
      {revisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-lg w-full rounded-xl border border-[#C8A97E] card-shadow p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-serif-luxury font-bold text-[#121212]">
                Request Typographic Revision
              </h3>
              <button onClick={() => { setRevisionModalOpen(false); setRevisionSubmitted(false); }} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!revisionSubmitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setRevisionSubmitted(true); }} className="space-y-3">
                <p className="text-xs text-stone-600">
                  Your notes will be dispatched immediately to Lead Engraver Rajesh V. and Stylist Meera Kashyap.
                </p>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Requested Adjustment Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={revisionNotes}
                    onChange={(e) => setRevisionNotes(e.target.value)}
                    placeholder="E.g., Please widen the spacing between 'E' and 'T' by 0.2mm, or reduce bevel slope to 30 degrees..."
                    className="w-full text-xs p-3 rounded border border-stone-300 focus:outline-none focus:border-[#75542E] bg-[#FAF7F2]"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setRevisionModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 text-xs uppercase tracking-wider rounded hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-[#75542E] hover:bg-[#9B7443] text-white text-xs uppercase tracking-wider font-semibold rounded shadow"
                  >
                    Submit Revision Docket
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif-luxury font-bold text-stone-900">Revision Docket Transmitted</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Revision v2.2 draft will be delivered to your portal within 4 hours. Stylist Meera has been notified via priority WhatsApp channel.
                </p>
                <button 
                  onClick={() => { setRevisionModalOpen(false); setRevisionSubmitted(false); }}
                  className="px-5 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider rounded font-medium mt-2"
                >
                  Return to Sanctuary
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. SPEC SHEET MODAL (CHEST) */}
      {specModalOpen && activeSpecItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-xl w-full rounded-xl border border-[#E7D5BF] card-shadow p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#9B7443] font-semibold block">Atelier Technical Dossier</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#121212]">
                  {activeSpecItem.title}
                </h3>
              </div>
              <button onClick={() => setSpecModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-[#FAF7F2] rounded border border-[#E7D5BF] grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Exterior Wood</span>
                  <span className="font-semibold text-stone-900">{activeSpecItem.spec.material}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Interior Lining</span>
                  <span className="font-semibold text-stone-900">{activeSpecItem.spec.lining}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Dimensions</span>
                  <span className="font-semibold text-stone-900">{activeSpecItem.spec.dimensions}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Hardware Lock</span>
                  <span className="font-semibold text-stone-900">{activeSpecItem.spec.lock}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#75542E] block mb-1">
                  Master Guild Signatures
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Crafted under the direct supervision of {activeSpecItem.spec.artisan}. Hand-varnished with non-toxic natural beeswax emulsion. Sealed with certified holographic tamper-evident seal #ASRA-TRK-9801.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-stone-200">
              <button
                onClick={() => setSpecModalOpen(false)}
                className="px-4 py-2 bg-[#75542E] text-white text-xs uppercase tracking-wider font-semibold rounded"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. GUEST NAMES MANAGEMENT MODAL (120 HAMPERS) */}
      {guestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-xl border border-[#E7D5BF] card-shadow p-6 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#9B7443] font-semibold block">Luggage Tag Debossing Roster</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#121212]">
                  Manage 120 Royal Guest Favors
                </h3>
              </div>
              <button onClick={() => setGuestModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Add Guest */}
            <form onSubmit={handleAddGuest} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#FAF7F2] p-3 rounded-lg border border-[#E7D5BF]">
              <input
                type="text"
                required
                placeholder="Guest Full Name..."
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                className="text-xs px-3 py-1.5 rounded border border-stone-300 focus:outline-none focus:border-[#75542E] bg-white sm:col-span-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={3}
                  placeholder="Initials"
                  value={newGuestInitials}
                  onChange={(e) => setNewGuestInitials(e.target.value)}
                  className="w-20 text-xs px-2 py-1.5 rounded border border-stone-300 uppercase text-center focus:outline-none focus:border-[#75542E] bg-white"
                />
                <button
                  type="submit"
                  className="flex-1 px-3 py-1.5 bg-[#75542E] hover:bg-[#9B7443] text-white text-xs font-semibold rounded"
                >
                  + Add
                </button>
              </div>
            </form>

            {/* Guest List Preview */}
            <div className="overflow-y-auto flex-1 divide-y divide-stone-100 text-xs pr-1">
              {guests.map((g, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded bg-[#F4ECE0] text-[#75542E] font-serif-luxury font-bold flex items-center justify-center text-xs">
                      {g.tagInitials}
                    </span>
                    <div>
                      <span className="font-medium text-stone-900 block">{g.name}</span>
                      <span className="text-[10px] text-stone-400">{g.table} · {g.gift}</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    Confirmed Die Ready
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-500">Showing {guests.length} of 120 guest dossiers entered</span>
              <button
                onClick={() => setGuestModalOpen(false)}
                className="px-4 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold rounded"
              >
                Save Roster Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. AUDIO WAVEFORM TEST MODAL */}
      {audioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121212] text-white max-w-md w-full rounded-2xl border border-[#C8A97E]/50 card-shadow p-6 space-y-5 text-center">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#C8A97E] font-semibold">
                Spotify Cipher Acoustic Verification
              </span>
              <button onClick={() => { setAudioModalOpen(false); setIsPlayingAudio(false); }} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-serif-luxury font-bold text-white">
                Can't Help Falling In Love
              </h4>
              <p className="text-xs text-stone-400">Royal Philharmonic Orchestra · First Dance Commission</p>
            </div>

            {/* Simulated Visualizer */}
            <div className="h-20 bg-stone-900/90 rounded-xl border border-stone-800 flex items-center justify-center space-x-1.5 px-4">
              {[40, 65, 20, 80, 95, 30, 60, 85, 45, 100, 75, 35, 90, 60, 40, 80, 50, 70, 30, 85].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlayingAudio ? 'bg-[#C8A97E]' : 'bg-stone-700'
                  }`}
                  style={{
                    height: isPlayingAudio ? `${Math.max(15, (h + (i % 3) * 15) % 80)}px` : '20px'
                  }}
                />
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-full py-3 bg-[#75542E] hover:bg-[#9B7443] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Music className="w-4 h-4 text-[#E7D5BF]" />
                <span>{isPlayingAudio ? 'Pause Acoustic Playback' : 'Play Crystal Etched Waveform'}</span>
              </button>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Scan the optical crystal with the Spotify app camera on wedding night to seamlessly stream your ceremonial master track.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. VIDEO TASTING CALL MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-xl border border-[#E7D5BF] card-shadow p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#9B7443] font-semibold block">Private Atelier Salon</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#121212]">
                  Schedule Video Tasting Call
                </h3>
              </div>
              <button onClick={() => { setVideoModalOpen(false); setVideoBookingConfirmed(false); }} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!videoBookingConfirmed ? (
              <form onSubmit={(e) => { e.preventDefault(); setVideoBookingConfirmed(true); }} className="space-y-3 text-xs">
                <p className="text-stone-600">
                  Connect 1-on-1 with Lead Stylist <strong>Meera Kashyap</strong> live from our Hyderabad studio to inspect ribbon dyes, fragrance oils, and wax seal swatches under studio lighting.
                </p>

                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">Select Consultation Date</label>
                  <input
                    type="date"
                    required
                    value={selectedVideoDate}
                    onChange={(e) => setSelectedVideoDate(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded bg-[#FAF7F2] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">Select Time Slot</label>
                  <select
                    value={selectedVideoTime}
                    onChange={(e) => setSelectedVideoTime(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded bg-[#FAF7F2] text-xs"
                  >
                    <option value="11:00 IST">11:00 AM IST (Morning Salon)</option>
                    <option value="14:30 IST">02:30 PM IST (Afternoon Studio Session)</option>
                    <option value="16:00 IST">04:00 PM IST (Recommended Italian Daylight Match)</option>
                    <option value="18:30 IST">06:30 PM IST (Twilight Velvet Inspection)</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setVideoModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded uppercase tracking-wider text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-[#75542E] hover:bg-[#9B7443] text-white uppercase tracking-wider font-semibold rounded shadow text-xs"
                  >
                    Confirm Private Video Slot
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif-luxury font-bold text-stone-900">Salon Appointment Confirmed</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Encrypted Google Meet link &amp; calendar invite sent to Lady Eleanor &amp; Tariq for <strong>{selectedVideoDate} at {selectedVideoTime}</strong>.
                </p>
                <button 
                  onClick={() => { setVideoModalOpen(false); setVideoBookingConfirmed(false); }}
                  className="px-5 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider rounded font-medium mt-2"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. DOCUMENT VIEWER / DOWNLOAD MODAL */}
      {docModalOpen && activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-lg w-full rounded-xl border border-[#E7D5BF] card-shadow p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#9B7443] font-semibold block">Sovereign Vault Archive</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#121212]">
                  {activeDoc.name}
                </h3>
              </div>
              <button onClick={() => setDocModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7D5BF] space-y-2 text-xs text-stone-700">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Document Type:</span>
                <span className="font-semibold text-stone-900">{activeDoc.type}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Docket Identification:</span>
                <span className="font-semibold text-stone-900">#{data.docketId}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Execution Date:</span>
                <span className="font-semibold text-stone-900">{activeDoc.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Security Signature:</span>
                <span className="font-mono text-emerald-800 font-semibold text-[11px]">SHA-256 VERIFIED ATELIER SEAL</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              This document is cryptographically countersigned by Maison ASRA legal council and bonded by Lloyd's International Fine Arts &amp; Jewels Transit underwriting.
            </p>

            <div className="pt-3 border-t border-stone-200 flex justify-end space-x-3">
              <button
                onClick={() => { alert(`Downloading ${activeDoc.name} PDF...`); setDocModalOpen(false); }}
                className="px-4 py-2 bg-[#75542E] hover:bg-[#9B7443] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Certified PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. BRASS DIE RE-COMMISSION MODAL */}
      {recommissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-xl border border-[#C8A97E] card-shadow p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-serif-luxury font-bold text-[#121212]">
                Re-Commission Master Brass Die
              </h3>
              <button onClick={() => { setRecommissionModalOpen(false); setRecommissionSuccess(false); }} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!recommissionSuccess ? (
              <form onSubmit={(e) => { e.preventDefault(); setRecommissionSuccess(true); }} className="space-y-3 text-xs">
                <p className="text-stone-600">
                  Your physical master die <strong>#{data.monogramDie.dieId}</strong> is safely cataloged in our climate vault. You can order subsequent celebratory pieces with zero tooling fees.
                </p>

                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">Intended Re-order Scope</label>
                  <select className="w-full p-2 border border-stone-300 rounded bg-[#FAF7F2] text-xs">
                    <option>Wedding Thank-You Cards &amp; Deckle Envelopes (Qty 100+)</option>
                    <option>First Anniversary Gold-Embossed Memory Folio</option>
                    <option>Holiday &amp; New Year Festive Gift Boxes</option>
                    <option>Other Custom Bespoke Leather Item</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">Artisan Instructions (Optional)</label>
                  <textarea
                    rows={3}
                    value={recommissionNotes}
                    onChange={(e) => setRecommissionNotes(e.target.value)}
                    placeholder="E.g., Match the emerald velvet ribbon from our Lake Como welcome boxes..."
                    className="w-full p-2 border border-stone-300 rounded bg-[#FAF7F2] text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setRecommissionModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded uppercase tracking-wider text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#75542E] hover:bg-[#9B7443] text-white uppercase tracking-wider font-semibold rounded shadow text-xs"
                  >
                    Submit Re-Commission Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif-luxury font-bold text-stone-900">Die Request Registered</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Stylist Meera will pull Die #{data.monogramDie.dieId} from vault storage and prepare digital layout proofs.
                </p>
                <button
                  onClick={() => { setRecommissionModalOpen(false); setRecommissionSuccess(false); }}
                  className="px-5 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider rounded font-medium mt-2"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. PRIORITY ASSISTANCE MODAL */}
      {assistanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-xl border border-[#E7D5BF] card-shadow p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-amber-700 font-semibold block">Urgent Hotline</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#121212]">
                  Ceremony Concierge Dispatch
                </h3>
              </div>
              <button onClick={() => { setAssistanceModalOpen(false); setAssistanceSent(false); }} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!assistanceSent ? (
              <form onSubmit={(e) => { e.preventDefault(); setAssistanceSent(true); }} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">Emergency Category</label>
                  <select
                    value={assistancePriority}
                    onChange={(e) => setAssistancePriority(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded bg-[#FAF7F2] text-xs"
                  >
                    <option value="customs">Italian Customs / Destination Clearance</option>
                    <option value="address">Venue Address / Suite Coordinate Change</option>
                    <option value="guests">Urgent Guest Count Increase (Express Air Remake)</option>
                    <option value="delivery">Handover Schedule Time Adjustment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">Urgent Message</label>
                  <textarea
                    rows={3}
                    required
                    value={assistanceMessage}
                    onChange={(e) => setAssistanceMessage(e.target.value)}
                    placeholder="Describe the adjustment required immediately..."
                    className="w-full p-2 border border-stone-300 rounded bg-[#FAF7F2] text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setAssistanceModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded uppercase tracking-wider text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white uppercase tracking-wider font-semibold rounded shadow text-xs"
                  >
                    Dispatch High-Priority Alert
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif-luxury font-bold text-stone-900">Dispatcher Paged</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Duty Master of Ceremonies has received your alert. Expected telephone or WhatsApp callback within <strong>15 minutes</strong>.
                </p>
                <button 
                  onClick={() => { setAssistanceModalOpen(false); setAssistanceSent(false); }}
                  className="px-5 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider rounded font-medium mt-2"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientPortalPage;
