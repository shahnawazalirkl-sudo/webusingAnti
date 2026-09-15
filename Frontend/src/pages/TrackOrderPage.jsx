import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, 
  Shield, 
  Phone, 
  Share2, 
  Download, 
  Sparkles, 
  Clock, 
  MapPin, 
  Check, 
  Truck, 
  Thermometer, 
  Activity, 
  AlertCircle,
  X,
  ExternalLink,
  ChevronRight,
  Search,
  MessageSquare
} from 'lucide-react';

const PRESET_DOCKETS = {
  'ASRA-2026-8842X': {
    orderId: 'ASRA-2026-8842X',
    clientTitle: "Asra & Shahnawaz's Sovereign Suite",
    clientName: 'Asra Ansari & Sk Shahnawaz Ali',
    phone: '+91 96926 68263',
    initials: '"A & S" • Classic Floral Crest',
    status: 'IN TRANSIT • CHILLED VAN FLT-08',
    statusCategory: 'in_transit',
    expectedArrival: 'Nov 14, 2026 • 04:00 PM – 08:00 PM',
    slotNotice: '(Twilight Royal Slot Guaranteed)',
    venueName: 'The Oberoi Udaivilas, Udaipur',
    venueDetail: 'Kohinoor Suite & Private Villa 4',
    venueAddress: 'Badi-Gorela Canal Road, Haridas Ji Ki Magri, Udaipur 313001',
    plannerName: 'Shagufta Naaz (Designated Wedding Architect)',
    plannerPhone: '+91 96926 68263',
    confidentialProtocol: "Handover strictly to wedding planner Miss Shagufta Naaz at the Kohinoor Suite or Bride's mother Miss Sultana Begum. Temperature to remain stabilized at 18°C during all segments of transit.",
    driverName: 'Marshal Jawed Ali',
    driverBadge: 'ASRA-EXEC-19',
    driverPhone: '+91 96926 68263',
    vehicleReg: 'Mercedes-Benz Sprinter Chilled Fleet (Reg: MH-04-AR-2026)',
    otp: '8842',
    baseTemp: 18.2,
    gForce: '< 0.18 G',
    remainingKm: 142,
    lat: 25.1782,
    lng: 73.8423,
    cruisingSpeed: '62 km/h',
    items: [
      {
        id: 'sov-suite',
        title: 'The Sovereign Bridal & Wedding Essentials Suite',
        price: '₹7,499',
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1WWF5xvSFhZfraQNuZ5QJPkPkwOA7moevDQMXbk6g5GfhQjfg2Z83P-u6zYCC1yMFsxUjfoBWemmareJbeeghnEjxPCCk8pU17Sp5a4j5ZUtKFR3Mb8kBYNW_VepfRLyIG4QLzjwzT5HUgJlvRaNv386XaXDH3zn3Rp2kRX9TFbJIZ9uC8cdio9LJ4Iza1YgNb1vCk3YwY3PGfkJ8oLQahxRtWzdx5ToPRumfXGiwW7-rRqwpKhA2pAZGhJmH6ePGDmvWpp0TJucIM',
        palette: 'Classic Blush & Champagne Gold',
        monogramText: '"A & S" (Classic Crest)',
        ink: 'Royal Copperplate',
        aroma: 'Kashmiri Rose & Amber'
      },
      {
        id: 'velvet-box',
        title: 'Customized Velvet Double Ring & Mangalsutra Vault',
        price: '₹1,899',
        monogramIcon: 'A & S',
        shade: 'Royal Emerald Silk Velvet',
        badge: 'Die matched to Masterpiece Suite Initials'
      }
    ],
    settledAmount: '₹8,459',
    settlementMethod: 'UPI Verified (shahnawazalirkl@okaxis)',
    royalCredits: '845 ASRA Royal Credits Logged',
    stylistName: 'Ms. Shagufta Naaz'
  },
  'ASRA-2026-7910K': {
    orderId: 'ASRA-2026-7910K',
    clientTitle: "Shagufta & Sagil's Royal Wedding Essentials",
    clientName: 'Shagufta Naaz & Sagil Doza',
    phone: '+91 96926 68263',
    initials: '"S & S" • Imperial Peacock Crest',
    status: 'COLLECTION PRODUCTION • 24K EMBOSSING',
    statusCategory: 'production',
    expectedArrival: 'Nov 18, 2026 • 11:00 AM – 03:00 PM',
    slotNotice: '(Morning Auspicious Muhurat Handover)',
    venueName: 'Taj Lake Palace, Udaipur',
    venueDetail: 'Grand Royal Presidential Suite',
    venueAddress: 'Pichola, Udaipur, Rajasthan 313001',
    plannerName: 'Zeeshan Rashid (Customized Events)',
    plannerPhone: '+91 96926 68263',
    confidentialProtocol: 'Vault handover to bride Shagufta Naaz personally with wax seal verification certificate.',
    driverName: 'Marshal Taofique Alkhair Khan',
    driverBadge: 'ASRA-EXEC-07',
    driverPhone: '+91 96926 68263',
    vehicleReg: 'Collection Vault Fleet (Reg: DL-01-AS-2026)',
    otp: '7910',
    baseTemp: 19.0,
    gForce: '0.00 G (In Collection)',
    remainingKm: 0,
    lat: 17.3850,
    lng: 78.4867,
    cruisingSpeed: 'Stationary in Collection',
    items: [
      {
        id: 'sov-suite-mk',
        title: 'The Sovereign Bridal & Wedding Essentials Suite',
        price: '₹7,499',
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1WWF5xvSFhZfraQNuZ5QJPkPkwOA7moevDQMXbk6g5GfhQjfg2Z83P-u6zYCC1yMFsxUjfoBWemmareJbeeghnEjxPCCk8pU17Sp5a4j5ZUtKFR3Mb8kBYNW_VepfRLyIG4QLzjwzT5HUgJlvRaNv386XaXDH3zn3Rp2kRX9TFbJIZ9uC8cdio9LJ4Iza1YgNb1vCk3YwY3PGfkJ8oLQahxRtWzdx5ToPRumfXGiwW7-rRqwpKhA2pAZGhJmH6ePGDmvWpp0TJucIM',
        palette: 'Royal Ivory & Regal Gold',
        monogramText: '"S & S" (Imperial Crest)',
        ink: 'Gilded Sepia Ink',
        aroma: 'Mysore Sandalwood & Jasmine'
      }
    ],
    settledAmount: '₹7,499',
    settlementMethod: 'Credit Card Verified (Amex Centurion ****1004)',
    royalCredits: '750 ASRA Royal Credits Logged',
    stylistName: 'Mr. Sagil Doza'
  }
};

const TrackOrderPage = () => {
  const location = useLocation();
  const { showToast } = useCart();

  // Load saved order from localStorage or location state if available
  const [activeDocketId, setActiveDocketId] = useState(() => {
    if (location.state?.orderId && PRESET_DOCKETS[location.state.orderId]) {
      return location.state.orderId;
    }
    try {
      const saved = localStorage.getItem('asra_last_order');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.orderId) {
          return parsed.orderId;
        }
      }
    } catch (e) {
      console.warn('Error reading saved order', e);
    }
    return 'ASRA-2026-8842X';
  });

  // Current order data
  const currentDocket = PRESET_DOCKETS[activeDocketId] || PRESET_DOCKETS['ASRA-2026-8842X'];

  // Input states for docket switcher
  const [isEditingDocket, setIsEditingDocket] = useState(false);
  const [inputDocketId, setInputDocketId] = useState(activeDocketId);
  const [inputMobile, setInputMobile] = useState(currentDocket.phone);
  const [docketError, setDocketError] = useState('');

  // Modals & Drawers
  const [showChauffeurModal, setShowChauffeurModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Live telemetry pulse simulation
  const [tempOffset, setTempOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTempOffset((Math.random() * 0.2 - 0.1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Update input states when active docket changes
  useEffect(() => {
    setInputDocketId(currentDocket.orderId);
    setInputMobile(currentDocket.phone);
  }, [currentDocket]);

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    setDocketError('');
    const cleanId = inputDocketId.trim().toUpperCase();

    if (PRESET_DOCKETS[cleanId]) {
      setActiveDocketId(cleanId);
      setIsEditingDocket(false);
      showToast(`Telemetry locked for ${cleanId}`);
    } else {
      setDocketError(`Docket "${cleanId}" not found in database. Reverting to verified docket.`);
      setActiveDocketId('ASRA-2026-8842X');
      setIsEditingDocket(false);
      showToast(`Demo telemetry loaded for ASRA-2026-8842X`);
    }
  };

  const handleShareWithPlanner = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Docket tracking link copied to clipboard');
      }).catch(() => {
        showToast('Tracking link ready: ' + shareUrl);
      });
    } else {
      showToast('Tracking link ready: ' + shareUrl);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const currentTempFormatted = (currentDocket.baseTemp + tempOffset).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] text-[#1A1A1A] font-sans antialiased text-[13px] leading-relaxed selection:bg-[#E8DFD3] selection:text-black">
      
      {/* ==================== MINIMAL UTILITY HEADER (NO GLOBAL NAVBAR) ==================== */}
      <header className="bg-white border-b border-[#E8DFD3] py-3 px-4 sm:px-6 md:px-12 sticky top-0 z-40 shadow-sm no-print">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          {/* Left: Return Navigation Link */}
          <Link
            to="/order-confirmation"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6E675F] hover:text-[#1A1A1A] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Orders</span>
          </Link>

          {/* Center: Collection Brand Emblem */}
          <div className="flex items-center justify-center">
            <Link to="/">
              <img
                alt="ASRA Wedding Canvas Crest"
                className="h-9 sm:h-10 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWIXZQ8rqZyXwm73emnLPVajZCrE3lrS9tqfafPI4fnjtMw-d0DbJWD-2E7RbRrcF9xioPMgh4HQt3FuoQYu4Ay8UXzcVPkNvGxgdzYqlCyXK7U0sFKV35vswGPGVOVEohvbOeb4fp9fLCo9AYCysTRgOmJBBz6f98_2sqxxsjn-ZSVMl3y8Kr8ngiMXG-OXAv2VKVZpRvDKX9B1-7F2yLmQLsOtNFASIsSWMTiEujW125ygM5Y3Au4xEEBPFEI5065hk"
              />
            </Link>
          </div>

          {/* Right: Security & Live Transit Status Badges */}
          <div className="flex items-center gap-2 sm:gap-4 text-[11px]">
            <Link
              to={`/client-portal?docket=${activeDocketId}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] text-[#75542E] hover:bg-[#F4ECE0] font-medium text-[10px] sm:text-[11px] rounded-full border border-[#E7D5BF] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B7443]"></span>
              <span>Sovereign My Account Vault →</span>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#E8F3EE] text-[#0F3828] font-medium rounded-full border border-[#D3E5DC]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Live White-Glove GPS Transit</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-[#6E675F]">
              <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="tracking-tight">256-Bit Encrypted Collection Docket</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN TRACKER CONTENT ==================== */}
      <main className="flex-grow max-w-[1360px] mx-auto w-full px-4 sm:px-6 md:px-12 py-8 md:py-10">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto mb-8">
          {/* Ceremony Dispatch Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#F6F0E6] border border-[#E8DFD3] text-[#9E7A44] text-[11px] uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Ceremony Dispatch &amp; Transit Surveillance</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-[#1A1A1A] tracking-normal leading-tight">
            Track Your Customized Ceremony Dispatch
          </h1>

          {/* Sub-headline */}
          <p className="mt-2 text-[#6E675F] text-[13px] md:text-[14px] max-w-2xl mx-auto font-light leading-relaxed">
            Real-time surveillance, climate telemetry, and white-glove transit logs for your custom initials bridal &amp; wedding essentials ensembles.
          </p>

          {/* Docket Switcher & Lookup Input Bar */}
          <div className="mt-6 bg-white border border-[#E8DFD3] rounded-xl p-3 sm:p-5 shadow-sm max-w-3xl mx-auto text-left">
            <form onSubmit={handleLookupSubmit} className="flex flex-col md:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <label className="block text-[10px] uppercase font-semibold text-[#6E675F] tracking-wider mb-1">
                  Active Collection Order ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputDocketId}
                    onChange={(e) => {
                      setInputDocketId(e.target.value);
                      setIsEditingDocket(true);
                    }}
                    placeholder="e.g. ASRA-2026-8842X"
                    className="w-full bg-[#FAF7F2]/80 border border-[#E8DFD3] rounded-md px-3 py-2 text-xs font-semibold text-[#1A1A1A] tracking-wide focus:ring-1 focus:ring-[#C5A880] focus:outline-none"
                  />
                  <span className="absolute right-2.5 top-2 text-[10px] bg-[#EAE2D5] text-[#594B39] font-medium px-2 py-0.5 rounded pointer-events-none">
                    Verified Vault
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full">
                <label className="block text-[10px] uppercase font-semibold text-[#6E675F] tracking-wider mb-1">
                  Registered Support Mobile
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputMobile}
                    onChange={(e) => {
                      setInputMobile(e.target.value);
                      setIsEditingDocket(true);
                    }}
                    placeholder="+91 96926 68263"
                    className="w-full bg-[#FAF7F2]/80 border border-[#E8DFD3] rounded-md px-3 py-2 text-xs font-medium text-[#1A1A1A] focus:ring-1 focus:ring-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="w-full md:w-auto self-end">
                <button
                  type="submit"
                  className="w-full md:w-auto px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-medium tracking-wider rounded-md transition-colors whitespace-nowrap shadow-sm"
                >
                  {isEditingDocket ? 'Verify & Load' : 'Track Another Order'}
                </button>
              </div>
            </form>

            {docketError && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {docketError}
              </p>
            )}

            {/* Pre-filled Badge Alert & History Link */}
            <div className="mt-3 pt-3 border-t border-[#F2ECE3] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6E675F]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                <span>
                  Active Docket: <strong className="text-[#1A1A1A] font-semibold">{currentDocket.orderId}</strong> — {currentDocket.clientTitle}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setShowHistoryModal(true)}
                className="text-[#9E7A44] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View Historical Dockets</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ==================== TWO COLUMN TRACKER LAYOUT ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==================== LEFT COLUMN: Artisanal Timeline & Transit Telemetry (7 Cols) ==================== */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* Live Transit Overview Card */}
            <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E8DFD3]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E675F] block">
                    Initials Brass Die Docket
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mt-0.5">
                    {currentDocket.initials}
                  </h2>
                </div>

                {/* Status Pill */}
                <div className="flex items-center gap-2 bg-[#E9F3EE] border border-[#CDE5D8] px-3.5 py-1.5 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B4B32]">
                    {currentDocket.status}
                  </span>
                </div>
              </div>

              {/* Quick Spec Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-[#F4EFE6] text-xs">
                <div>
                  <span className="text-[11px] text-[#6E675F] block">Expected Palatial Handover</span>
                  <strong className="font-semibold text-[#1A1A1A] text-sm block mt-0.5">
                    {currentDocket.expectedArrival}
                  </strong>
                  <span className="text-[10px] text-[#9E7A44] block mt-0.5">
                    {currentDocket.slotNotice}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#6E675F] block">Palace Destination Property</span>
                  <strong className="font-semibold text-[#1A1A1A] text-sm block mt-0.5">
                    {currentDocket.venueName}
                  </strong>
                  <span className="text-[10px] text-[#6E675F] block mt-0.5">
                    {currentDocket.venueDetail}
                  </span>
                </div>
              </div>

              {/* Section Header */}
              <div className="mt-6 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-[#C5A880] text-[#9E7A44] text-[11px] flex items-center justify-center font-serif font-bold">
                    I
                  </span>
                  <h3 className="font-serif text-lg font-bold uppercase tracking-widest text-[#1A1A1A]">
                    Artisanal Milestone &amp; Transit Log
                  </h3>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#FDF6EC] text-[#9E7A44] border border-[#F3DFC1] px-2.5 py-0.5 rounded-full">
                  Real-Time Telemetry Active
                </span>
              </div>

              {/* Vertical Timeline Steps Container */}
              <div className="space-y-8 mt-6">
                
                {/* PHASE A: COLLECTION PRODUCTION & ARTISANAL CRAFTING */}
                <div className="bg-[#FBF9F5] border border-[#E8DFD3] rounded-xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-5 border-b border-[#EDE4D6]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-[#FAF7F2] flex items-center justify-center text-[10px] font-bold font-serif">
                        A
                      </span>
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#9E7A44] block">
                          Phase I • Hyderabad Flagship Collection
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#1A1A1A]">
                          Collection Production &amp; Artisanal Crafting
                        </h4>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E7F7ED] text-emerald-800 border border-[#CDE5D8] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      All 5 Craftsmanship Gates Completed
                    </span>
                  </div>

                  {/* Production Steps Timeline */}
                  <ol className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-3 before:w-[1.5px] before:bg-[#E2D6C5]">
                    
                    {/* Step 1 */}
                    <li className="relative group" aria-label="Step 1: 3D Brass Die Milling and Metallurgy Casting">
                      <span className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-[#0F3828] text-white flex items-center justify-center text-xs shadow-sm ring-4 ring-[#FBF9F5]">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-[#1A1A1A]">1. 3D Brass Die Milling &amp; Metallurgy Casting</h5>
                          <span className="text-[9px] font-semibold uppercase bg-[#F2ECE3] text-[#1A1A1A] px-2 py-0.5 rounded">
                            Die Proof Locked
                          </span>
                        </div>
                        <time className="text-[11px] text-[#6E675F] font-medium">Nov 10, 01:15 PM</time>
                      </div>
                      <p className="text-[11px] text-[#6E675F] mt-1 leading-normal">
                        Solid heavy brass deboss die cut with nanometer precision for initials "A &amp; S" with customized royal acanthus border flourishes.
                      </p>
                      <div className="mt-2 bg-white p-2 rounded border border-[#EDE4D6] flex items-center justify-between text-[10px]">
                        <span className="text-[#6E675F]">
                          Master Artisan: <strong className="text-[#1A1A1A] font-semibold">Jawed Ali (Master Engraver)</strong>
                        </span>
                        <span className="text-[#9E7A44] font-semibold">Zero-Deformation Tested</span>
                      </div>
                    </li>

                    {/* Step 2 */}
                    <li className="relative group" aria-label="Step 2: Copperplate Calligraphy and Initials Authorization">
                      <span className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-[#0F3828] text-white flex items-center justify-center text-xs shadow-sm ring-4 ring-[#FBF9F5]">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-[#1A1A1A]">2. Copperplate Calligraphy &amp; Initials Authorization</h5>
                          <span className="text-[9px] font-semibold uppercase bg-[#EAE2D5] text-[#4A3B25] px-2 py-0.5 rounded">
                            Client Verified
                          </span>
                        </div>
                        <time className="text-[11px] text-[#6E675F] font-medium">Nov 10, 04:15 PM</time>
                      </div>
                      <p className="text-[11px] text-[#6E675F] mt-1 leading-normal">
                        Hand-lettered Copperplate flourishes rendered in archival sepia ink; approved directly by Bride Asra Ansari via private digital salon.
                      </p>
                      <div className="mt-2 bg-white p-2 rounded border border-[#EDE4D6] flex items-center justify-between text-[10px]">
                        <span className="text-[#6E675F]">
                          Calligrapher: <strong className="text-[#1A1A1A] font-semibold">Zeeshan Firoz (Lead Scribe)</strong>
                        </span>
                        <span className="text-emerald-700 font-semibold">WhatsApp Sign-Off: Confirmed</span>
                      </div>
                    </li>

                    {/* Step 3 */}
                    <li className="relative group" aria-label="Step 3: Master Hot-Stamping and 24k Gold Foil Leaf Imprint">
                      <span className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-[#0F3828] text-white flex items-center justify-center text-xs shadow-sm ring-4 ring-[#FBF9F5]">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-[#1A1A1A]">3. Master Hot-Stamping &amp; 24k Gold Foil Leaf Imprint</h5>
                          <span className="text-[9px] font-semibold uppercase bg-[#FDF6EC] text-[#9E7A44] border border-[#F3DFC1] px-2 py-0.5 rounded">
                            24k Hallmark Certified
                          </span>
                        </div>
                        <time className="text-[11px] text-[#6E675F] font-medium">Nov 11, 11:30 AM</time>
                      </div>
                      <p className="text-[11px] text-[#6E675F] mt-1 leading-normal">
                        Heated pressure impression calibrated at 145°C onto luxury blush silk cylinder and royal emerald velvet ring &amp; mangalsutra vault.
                      </p>
                      <div className="mt-2 bg-white p-2 rounded border border-[#EDE4D6] flex items-center justify-between text-[10px]">
                        <span className="text-[#6E675F]">
                          Technique: <strong className="text-[#1A1A1A] font-semibold">Precision Hydraulic Deboss</strong>
                        </span>
                        <span className="text-[#9E7A44] font-semibold">Gold Weight: 0.12g Pure Leaf</span>
                      </div>
                    </li>

                    {/* Step 4 */}
                    <li className="relative group" aria-label="Step 4: Artisanal Fragrance Infusion and Dawn Florals Collection">
                      <span className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-[#0F3828] text-white flex items-center justify-center text-xs shadow-sm ring-4 ring-[#FBF9F5]">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-[#1A1A1A]">4. Artisanal Fragrance Infusion &amp; Dawn Florals Collection</h5>
                          <span className="text-[9px] font-semibold uppercase bg-[#E9F3EE] text-[#0B4B32] px-2 py-0.5 rounded">
                            Botanical Seal
                          </span>
                        </div>
                        <time className="text-[11px] text-[#6E675F] font-medium">Nov 12, 09:00 AM</time>
                      </div>
                      <p className="text-[11px] text-[#6E675F] mt-1 leading-normal">
                        Kashmiri Rose and warm Amber essential micro-ampoules sealed; fresh morning-harvested baby breath blossoms integrated with cryo-capsules.
                      </p>
                      <div className="mt-2 bg-white p-2 rounded border border-[#EDE4D6] flex items-center justify-between text-[10px]">
                        <span className="text-[#6E675F]">
                          Botanical Lead: <strong className="text-[#1A1A1A] font-semibold">Taofique Alkhair Khan (Chief Floralist)</strong>
                        </span>
                        <span className="text-emerald-700 font-semibold">Hydration: 72-Hour Sustained Dew</span>
                      </div>
                    </li>

                    {/* Step 5 */}
                    <li className="relative group" aria-label="Step 5: Quality Inspection and Collection Hallmark Vaulting">
                      <span className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-[#0F3828] text-white flex items-center justify-center text-xs shadow-sm ring-4 ring-[#FBF9F5]">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-[#1A1A1A]">5. Quality Inspection &amp; Collection Hallmark Vaulting</h5>
                          <span className="text-[9px] font-semibold uppercase bg-[#E5D7C2] text-[#4A3B25] px-2 py-0.5 rounded">
                            Docket Locked
                          </span>
                        </div>
                        <time className="text-[11px] text-[#6E675F] font-medium">Nov 12, 06:45 PM</time>
                      </div>
                      <p className="text-[11px] text-[#6E675F] mt-1 leading-normal">
                        Full 28-point inspection completed under daylight spectrum lighting. Ensembles hermetically boxed in insulated shock-resistant luggage.
                      </p>
                      <div className="mt-2 bg-white p-2 rounded border border-[#EDE4D6] flex items-center justify-between text-[10px]">
                        <span className="text-[#6E675F]">
                          Quality Director: <strong className="text-[#1A1A1A] font-semibold">Zeeshan Rashid</strong>
                        </span>
                        <span className="text-[#1A1A1A] font-semibold">ASRA Certificate ID: #HK-8842-X</span>
                      </div>
                    </li>

                  </ol>
                </div>

                {/* PHASE B: CLIMATE-CONTROLLED TRANSIT & PALATIAL HANDOVER */}
                <div className="bg-white border border-[#E8DFD3] rounded-xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-5 border-b border-[#E8DFD3]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#0F3828] text-white flex items-center justify-center text-[10px] font-bold font-serif">
                        B
                      </span>
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-700 block">
                          Phase II • Active Surveillance
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#1A1A1A]">
                          Climate-Controlled White-Glove Transit &amp; Handover
                        </h4>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F3EE] text-[#0B4B32] border border-[#CDE5D8] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                      Active Transit Segment
                    </span>
                  </div>

                  {/* Transit Steps Timeline */}
                  <ol className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-3 before:w-[1.5px] before:bg-[#E2D6C5]">
                    
                    {/* Transit Step 6: ACTIVE LEG */}
                    <li className="relative group bg-[#FAF6F0] -mx-3 p-3.5 rounded-xl border border-[#D8C7B0] shadow-sm" aria-current="step">
                      <span className="absolute -left-3 sm:-left-5 top-4 w-6 h-6 rounded-full bg-[#9E7A44] text-white flex items-center justify-center text-xs shadow-md ring-4 ring-[#FAF6F0]">
                        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                        </svg>
                      </span>

                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-[#1A1A1A]">6. Chilled Transit Van Dispatched &amp; Ajmer Highway Segment</h5>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-[#E5D7C2] text-[#4A3B25] rounded uppercase tracking-wider">
                            Active In-Flight
                          </span>
                        </div>
                        <time className="text-[11px] font-bold text-[#9E7A44]">Today, 08:30 AM</time>
                      </div>

                      <p className="text-[11px] text-[#4F473E] mt-1 leading-normal">
                        Mercedes-Benz Sprinter FLT-08 operating on Ajmer-Udaipur NH58. Climate vault holding steady at {currentTempFormatted}°C with automated zero-shock leveling.
                      </p>

                      {/* GPS Telematics Box */}
                      <div className="mt-2.5 bg-white/90 border border-[#E8DFD3] rounded-lg p-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></div>
                          <span className="text-[#1A1A1A] font-medium">
                            GPS: {currentDocket.lat}° N, {currentDocket.lng}° E ({currentDocket.remainingKm} km remaining)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-[#6E675F]">
                            Driver: <strong className="text-[#1A1A1A]">{currentDocket.driverName}</strong>
                          </span>
                          <span className="text-[10px] text-[#9E7A44] uppercase font-bold">
                            Cruising: {currentDocket.cruisingSpeed}
                          </span>
                        </div>
                      </div>
                    </li>

                    {/* Transit Step 7: Scheduled Udaivilas Check-in */}
                    <li className="relative group opacity-85">
                      <span className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-white border-2 border-[#D5C6B1] text-[#6E675F] flex items-center justify-center text-xs shadow-sm ring-4 ring-white font-serif font-bold">
                        7
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-semibold text-[#1A1A1A]">7. The Oberoi Udaivilas Security &amp; Support Check-in</h5>
                          <span className="text-[9px] font-medium uppercase bg-[#FAF7F2] text-[#6E675F] px-2 py-0.5 rounded border border-[#EDE4D6]">
                            Scheduled
                          </span>
                        </div>
                        <time className="text-[11px] text-[#6E675F]">Nov 14, 02:30 PM (Est.)</time>
                      </div>
                      <p className="text-[11px] text-[#6E675F] mt-1 leading-normal">
                        Vehicle arrival at Haridas Ji Ki Magri entrance. Dedicated bell desk clearance verified under Head Support advance protocol docket.
                      </p>
                    </li>

                    {/* Transit Step 8: Scheduled Final Handover */}
                    <li className="relative group opacity-85">
                      <span className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-white border-2 border-[#D5C6B1] text-[#6E675F] flex items-center justify-center text-xs shadow-sm ring-4 ring-white font-serif font-bold">
                        8
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-semibold text-[#1A1A1A]">8. Royal Suite Handover to Wedding Support</h5>
                          <span className="text-[9px] font-medium uppercase bg-[#FAF7F2] text-[#6E675F] px-2 py-0.5 rounded border border-[#EDE4D6]">
                            Handover Window
                          </span>
                        </div>
                        <time className="text-[11px] text-[#6E675F]">Nov 14, 04:00 PM – 08:00 PM</time>
                      </div>
                      <p className="text-[11px] text-[#6E675F] mt-1 leading-normal">
                        In-suite presentation at Kohinoor Suite &amp; Villa 4 to designated Wedding Architect Shagufta Naaz with physical wax-seal hallmark authentication.
                      </p>
                    </li>

                  </ol>
                </div>

              </div>

              {/* Climate & Vault Telemetry Box */}
              <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 shadow-sm mt-6">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F4EFE6]">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#9E7A44]" />
                    <h4 className="font-serif text-base font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Vault Environmental &amp; Chauffeur Telemetry
                    </h4>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Live Sensor Feed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="bg-[#FBF9F5] border border-[#E8DFD3] rounded-xl p-3">
                    <span className="text-[10px] uppercase font-bold text-[#6E675F] block tracking-wider">Atmosphere Temp</span>
                    <div className="font-serif text-2xl font-bold text-[#0F3828] mt-1">
                      {currentTempFormatted}°C
                    </div>
                    <span className="text-[10px] text-[#6E675F] block mt-0.5">Optimal Bloom Hydration</span>
                  </div>

                  <div className="bg-[#FBF9F5] border border-[#E8DFD3] rounded-xl p-3">
                    <span className="text-[10px] uppercase font-bold text-[#6E675F] block tracking-wider">Shock &amp; G-Force</span>
                    <div className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">
                      {currentDocket.gForce}
                    </div>
                    <span className="text-[10px] text-[#6E675F] block mt-0.5">Zero-Vibration Air-Ride</span>
                  </div>

                  <div className="bg-[#FBF9F5] border border-[#E8DFD3] rounded-xl p-3">
                    <span className="text-[10px] uppercase font-bold text-[#6E675F] block tracking-wider">Transit Marshal</span>
                    <div className="text-xs font-bold text-[#1A1A1A] mt-2">
                      {currentDocket.driverName}
                    </div>
                    <span className="text-[10px] text-[#9E7A44] block">Badge: {currentDocket.driverBadge}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F4EFE6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-[#6E675F] text-[11px]">
                    Vehicle: {currentDocket.vehicleReg}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowChauffeurModal(true)}
                      className="px-3.5 py-1.5 rounded bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#E8DFD3] text-[#1A1A1A] text-[11px] font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3 h-3 text-[#9E7A44]" />
                      <span>Call White-Glove Chauffeur</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Last Minute Reassurance Banner */}
              <div className="bg-[#F8F5EE] border border-[#E8DFD3] rounded-xl p-4 flex items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EFE7D8] flex items-center justify-center text-[#9E7A44] shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1A1A1A]">Resort Support Protocol Active</h5>
                    <p className="text-[11px] text-[#6E675F]">
                      The Oberoi Udaivilas head support has logged early baggage claim clearance for Kohinoor Suite arrival.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#9E7A44] shrink-0 uppercase tracking-wider">
                  Verified
                </span>
              </div>

            </div>

          </section>

          {/* ==================== RIGHT COLUMN: Curated Ensemble & Stylist Support (5 Cols) ==================== */}
          <section className="lg:col-span-5 space-y-6">
            
            {/* Curated Heirloom Ensemble Summary Card */}
            <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Ensemble Under Transit
                </h3>
                <span className="text-[11px] font-medium bg-[#F5EFE6] border border-[#E8DFD3] px-2.5 py-0.5 rounded-full text-[#9E7A44]">
                  {currentDocket.items.length} Heirlooms Vaulted
                </span>
              </div>

              {/* Item 1: Masterpiece Hamper */}
              {currentDocket.items[0] && (
                <div className="py-4 border-b border-[#F4EFE6] flex gap-3.5">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-[#E8DFD3] bg-[#FAF7F2]">
                    <img
                      alt={currentDocket.items[0].title}
                      className="w-full h-full object-cover"
                      src={currentDocket.items[0].image}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#1A1A1A] truncate">
                        {currentDocket.items[0].title}
                      </h4>
                      <span className="text-xs font-semibold text-[#1A1A1A] whitespace-nowrap">
                        {currentDocket.items[0].price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6E675F] mt-0.5">Palette: {currentDocket.items[0].palette}</p>
                    <div className="mt-2 bg-[#FAF7F2] p-2 rounded border border-[#EDE4D6] text-[10px] space-y-0.5">
                      <div className="flex justify-between">
                        <span className="text-[#6E675F]">Debossed Initials:</span>
                        <span className="font-bold text-[#1A1A1A]">{currentDocket.items[0].monogramText}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E675F]">Calligraphy Ink:</span>
                        <span className="italic text-[#1A1A1A]">{currentDocket.items[0].ink}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E675F]">Aroma Collection:</span>
                        <span className="text-[#1A1A1A]">{currentDocket.items[0].aroma}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Item 2: Velvet Box */}
              {currentDocket.items[1] && (
                <div className="py-4 border-b border-[#F4EFE6] flex gap-3.5">
                  <div className="w-20 h-20 rounded-lg shrink-0 bg-[#0C3524] text-[#E5D7C2] flex flex-col items-center justify-center text-center p-2 border border-[#09281b]">
                    <span className="font-serif text-sm tracking-wider font-bold">
                      {currentDocket.items[1].monogramIcon || 'A & R'}
                    </span>
                    <span className="text-[7px] uppercase tracking-widest mt-1 opacity-80">
                      Emerald Velvet
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#1A1A1A] truncate">
                        {currentDocket.items[1].title}
                      </h4>
                      <span className="text-xs font-semibold text-[#1A1A1A] whitespace-nowrap">
                        {currentDocket.items[1].price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6E675F] mt-0.5">Shade: {currentDocket.items[1].shade}</p>
                    <div className="mt-2 text-[10px] text-emerald-800 flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>{currentDocket.items[1].badge}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Price & Settlement Recap */}
              <div className="pt-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6E675F]">
                  <span>Settled Total Amount</span>
                  <span className="text-[#1A1A1A] font-semibold">{currentDocket.settledAmount}</span>
                </div>
                <div className="flex justify-between text-[#6E675F]">
                  <span>Settlement Method</span>
                  <span className="text-[#1A1A1A]">{currentDocket.settlementMethod}</span>
                </div>
                <div className="flex justify-between text-[#6E675F]">
                  <span>Privilege Points Earned</span>
                  <span className="text-[#9E7A44] font-semibold">{currentDocket.royalCredits}</span>
                </div>
              </div>

              {/* PDF & Docket Buttons */}
              <div className="mt-5 pt-4 border-t border-[#E8DFD3] grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full py-2.5 px-3 rounded-lg border border-[#E8DFD3] bg-white hover:bg-[#FAF7F2] text-[#1A1A1A] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Download Docket (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={handleShareWithPlanner}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#1A1A1A] hover:bg-black text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share with Planner</span>
                </button>
              </div>
            </div>

            {/* Venue Handover Protocol Details Card */}
            <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full border border-[#C5A880] text-[#9E7A44] text-[11px] flex items-center justify-center font-serif font-bold">
                  II
                </span>
                <h4 className="font-serif text-base font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Destination &amp; Protocol Coordinates
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-[#FAF7F2]/80 p-3 rounded-xl border border-[#E8DFD3]">
                  <span className="text-[10px] uppercase font-bold text-[#6E675F] block tracking-wider">Palace Venue</span>
                  <p className="font-semibold text-[#1A1A1A] mt-0.5">
                    {currentDocket.venueName}, {currentDocket.venueDetail}
                  </p>
                  <p className="text-[11px] text-[#6E675F] mt-0.5">
                    {currentDocket.venueAddress}
                  </p>
                </div>

                <div className="bg-[#FAF7F2]/80 p-3 rounded-xl border border-[#E8DFD3]">
                  <span className="text-[10px] uppercase font-bold text-[#6E675F] block tracking-wider">Handover Representative</span>
                  <p className="font-semibold text-[#1A1A1A] mt-0.5">
                    {currentDocket.plannerName}
                  </p>
                  <p className="text-[11px] text-[#6E675F] mt-0.5">
                    {currentDocket.plannerPhone} • Authorized by {currentDocket.clientName}
                  </p>
                </div>

                {/* Chauffeur Special Instruction Pill */}
                <div className="bg-[#EFF8F2] border border-[#D0E5DA] p-3 rounded-xl flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-[#2E6B47] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#0A3D29] leading-relaxed">
                    <strong>Confidential Protocol:</strong> {currentDocket.confidentialProtocol}
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Stylist WhatsApp Support Box */}
            <div className="bg-white border border-[#E8DFD3] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E7F7ED] text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Need to Alter Handover Timing or Suite?</h4>
                  <p className="text-[11px] text-[#6E675F] mt-0.5">
                    Senior Stylist {currentDocket.stylistName} is dedicated to this order docket.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <a
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F3828] hover:bg-[#09261b] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                  href={`https://wa.me/919692668263?text=${encodeURIComponent(
                    `Hello ${currentDocket.stylistName}, I am inquiring regarding ASRA Ceremony Order Docket ${currentDocket.orderId} for ${currentDocket.clientTitle}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Chat with Stylist on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Collection Authenticity Guarantee Seal */}
            <div className="bg-[#FCFAF7] border border-dashed border-[#D8C7B0] rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-[#9E7A44] mb-1">
                <Shield className="w-4 h-4 fill-current" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Hallmarked Gift Guarantee</span>
              </div>
              <p className="text-[10px] text-[#6E675F] max-w-sm mx-auto leading-relaxed">
                The master 3D brass deboss die for initials {currentDocket.initials} is vault-preserved for future milestone anniversaries and family crest orders.
              </p>
            </div>

          </section>

        </div>

      </main>

      {/* ==================== MINIMAL LEGAL FOOTER ==================== */}
      <footer className="mt-12 py-5 border-t border-[#E8DFD3] bg-white text-center text-[10px] text-[#6E675F] tracking-normal no-print">
        <div className="max-w-[1360px] mx-auto px-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="font-bold text-[#1A1A1A] uppercase tracking-wider">ASRA Wedding Canvas</span>
          <span>•</span>
          <span>Private Collection &amp; Wedding Essentials Vaults</span>
          <span>•</span>
          <span>Support Protocols</span>
          <span>•</span>
          <span>Hallmark Verification</span>
          <span>•</span>
          <span>Transit Insurance Policy</span>
          <span>•</span>
          <span>Confidentiality Guarantee</span>
          <span>•</span>
          <span>© 2026 ASRA Collection. All royal rights reserved.</span>
        </div>
      </footer>

      {/* ==================== CHAUFFEUR CALL MODAL ==================== */}
      {showChauffeurModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8DFD3] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowChauffeurModal(false)}
              className="absolute top-4 right-4 text-[#6E675F] hover:text-[#1A1A1A] p-1 rounded-full hover:bg-[#FAF7F2]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-[#E8DFD3]">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8DFD3] flex items-center justify-center text-[#9E7A44]">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9E7A44] tracking-wider block">
                  Encrypted Chauffeur Relay
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  {currentDocket.driverName}
                </h3>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EDE4D6] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#6E675F]">Marshal Security Badge:</span>
                  <strong className="text-[#1A1A1A]">{currentDocket.driverBadge}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E675F]">Assigned Transit Vehicle:</span>
                  <strong className="text-[#1A1A1A]">{currentDocket.vehicleReg}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E675F]">Palatial Destination:</span>
                  <strong className="text-[#1A1A1A]">{currentDocket.venueName}</strong>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <span className="text-[10px] uppercase font-bold tracking-wider block text-amber-800">
                  Palace Handover Security OTP
                </span>
                <div className="font-mono text-2xl font-bold tracking-widest text-[#9E7A44] mt-1">
                  {currentDocket.otp}
                </div>
                <p className="text-[10px] text-amber-800 mt-1">
                  Share this 4-digit token with the driver only upon physical inspection of wax seal.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`tel:${currentDocket.driverPhone}`}
                className="flex-1 py-2.5 px-4 bg-[#0F3828] hover:bg-[#09261b] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Chauffeur Direct</span>
              </a>
              <button
                type="button"
                onClick={() => setShowChauffeurModal(false)}
                className="py-2.5 px-4 border border-[#E8DFD3] hover:bg-[#FAF7F2] text-[#1A1A1A] text-xs font-semibold rounded-xl transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== HISTORICAL DOCKETS MODAL ==================== */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#E8DFD3] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowHistoryModal(false)}
              className="absolute top-4 right-4 text-[#6E675F] hover:text-[#1A1A1A] p-1 rounded-full hover:bg-[#FAF7F2]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-3 border-b border-[#E8DFD3]">
              <span className="text-[10px] uppercase font-bold text-[#9E7A44] tracking-wider block">
                Collection Vault Archive
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                Available Ceremony Dockets
              </h3>
            </div>

            <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-1">
              {Object.values(PRESET_DOCKETS).map((docket) => (
                <div
                  key={docket.orderId}
                  onClick={() => {
                    setActiveDocketId(docket.orderId);
                    setShowHistoryModal(false);
                    showToast(`Switched to Docket ${docket.orderId}`);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    activeDocketId === docket.orderId
                      ? 'border-[#9E7A44] bg-[#FAF6F0] shadow-sm'
                      : 'border-[#E8DFD3] bg-white hover:border-[#C5A880] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1A1A1A]">{docket.orderId}</span>
                    <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {docket.statusCategory === 'in_transit' ? 'In Transit' : 'In Production'}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] mt-1">
                    {docket.clientTitle}
                  </h4>
                  <p className="text-[11px] text-[#6E675F] mt-0.5">
                    Destination: {docket.venueName}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-[#E8DFD3] flex justify-end">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="py-2 px-4 border border-[#E8DFD3] hover:bg-[#FAF7F2] text-[#1A1A1A] text-xs font-semibold rounded-lg transition-colors"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TrackOrderPage;
