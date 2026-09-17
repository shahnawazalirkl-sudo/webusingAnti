import React, { useState, useEffect } from 'react';


const STORAGE_KEY_PROFILE = 'asra_user_profile';
const STORAGE_KEY_ADDRESSES = 'asra_saved_addresses';
const STORAGE_KEY_MONOGRAMS = 'asra_saved_monograms';

const DEFAULT_PROFILE = {
  fullName: 'Asra Ansari & Sk Shahnawaz Ali',
  email: 'client@asrawedding.com',
  phone: '+91 96926 68263',
  weddingDate: '2026-11-18',
  partnerName: 'Sk Shahnawaz Ali',
  primaryVenue: 'The Oberoi Udaivilas, Udaipur',
  vipTier: 'Sovereign Union Patron'
};

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Primary Wedding Residence',
    recipient: 'Asra Ansari',
    phone: '+91 96926 68263',
    street: 'Badi-Gorela Canal Road, Haridas Ji Ki Magri',
    city: 'Udaipur',
    state: 'Rajasthan',
    pincode: '313001',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Ceremony Delivery Venue',
    recipient: 'Wedding Concierge / C/O Shahnawaz Ali',
    phone: '+91 96926 68263',
    street: 'The Oberoi Udaivilas, Kohinoor Suite VIP Gate',
    city: 'Udaipur',
    state: 'Rajasthan',
    pincode: '313001',
    isDefault: false
  }
];

const DEFAULT_MONOGRAMS = [
  {
    id: 'mono-1',
    initials: 'A & S',
    names: 'Asra & Shahnawaz',
    crestStyle: 'Classic Floral Crest',
    foilFinish: '24K Florentine Gold Foil',
    fontStyle: 'Royal Copperplate Script',
    date: '18th November 2026'
  }
];

const ClientPortalPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Active Tab: 'orders' | 'profile' | 'monograms' | 'wishlist' | 'concierge'
  const tabParam = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    if (tabParam && ['orders', 'profile', 'monograms', 'wishlist', 'concierge'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const switchTab = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  // Orders State
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Profile State
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(profile);
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // Addresses State
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADDRESSES);
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: 'New Address',
    recipient: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  // Saved Monograms State
  const [monograms, setMonograms] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MONOGRAMS);
      return saved ? JSON.parse(saved) : DEFAULT_MONOGRAMS;
    } catch {
      return DEFAULT_MONOGRAMS;
    }
  });
  const [showMonogramModal, setShowMonogramModal] = useState(false);
  const [monogramForm, setMonogramForm] = useState({
    initials: '',
    names: '',
    crestStyle: 'Classic Floral Crest',
    foilFinish: '24K Florentine Gold Foil',
    fontStyle: 'Royal Copperplate Script',
    date: ''
  });

  // Load Real Orders from Storage
  useEffect(() => {
    try {
      const all = getAllOrders();
      const list = Object.values(all || {});
      if (list.length > 0) {
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setOrders(list);
      } else {
        const last = getLastOrder();
        if (last) {
          setOrders([last]);
        }
      }
    } catch (err) {
      console.warn('Failed to retrieve user orders', err);
    }
  }, []);

  // Sync Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(profileForm);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profileForm));
    } catch (err) {
      console.warn('Error saving profile', err);
    }
    setIsEditingProfile(false);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  // Sync Addresses
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!addressForm.recipient || !addressForm.street) return;
    const newAddr = {
      ...addressForm,
      id: `addr-${Date.now()}`
    };
    let updated = [...addresses];
    if (newAddr.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }
    updated.push(newAddr);
    setAddresses(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error saving address', err);
    }
    setShowAddressModal(false);
    setAddressForm({
      label: 'New Address',
      recipient: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error removing address', err);
    }
  };

  const handleSetDefaultAddress = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    setAddresses(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error updating default address', err);
    }
  };

  // Sync Monograms
  const handleAddMonogram = (e) => {
    e.preventDefault();
    if (!monogramForm.initials) return;
    const newMono = {
      ...monogramForm,
      id: `mono-${Date.now()}`
    };
    const updated = [...monograms, newMono];
    setMonograms(updated);
    try {
      localStorage.setItem(STORAGE_KEY_MONOGRAMS, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error saving monogram', err);
    }
    setShowMonogramModal(false);
    setMonogramForm({
      initials: '',
      names: '',
      crestStyle: 'Classic Floral Crest',
      foilFinish: '24K Florentine Gold Foil',
      fontStyle: 'Royal Copperplate Script',
      date: ''
    });
  };

  const handleDeleteMonogram = (id) => {
    const updated = monograms.filter((m) => m.id !== id);
    setMonograms(updated);
    try {
      localStorage.setItem(STORAGE_KEY_MONOGRAMS, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error removing monogram', err);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'AS';
    const parts = name.match(/\b([A-Z])/g);
    return parts ? parts.slice(0, 2).join('') : 'AS';
  };
  return (
    <div className="bg-surface text-on-surface min-h-screen antialiased selection:bg-[#E7D5BF] selection:text-on-surface">
      
      {/* Top Header Bar */}
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant/30/80 sticky top-0 z-40 px-6 lg:px-12 py-3.5 backdrop-blur-md bg-opacity-95">
        <div className="max-w-[1360px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-xs tracking-wider uppercase font-medium text-primary hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined w-3.5 h-3.5 mr-1.5 transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <span>Back to Maison</span>
            </Link>
            <div className="h-4 w-[1px] bg-[#E7D5BF]"></div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-on-surface-variant">
                Verified Account Dashboard
              </span>
            </div>
          </div>

          <Link to="/" className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
            <div className="w-7 h-7 rounded-full border border-primary/40 flex items-center justify-center bg-surface">
              <span className="font-serif text-sm font-bold text-primary">AS</span>
            </div>
            <div className="text-center hidden md:block">
              <span className="block text-xs tracking-[0.25em] font-semibold text-on-surface uppercase font-serif">
                Maison ASRA
              </span>
              <span className="block text-[9px] tracking-[0.18em] text-primary uppercase -mt-0.5">
                Client Sanctuary
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-[11px] text-on-surface-variant bg-[#FAF4EB]/60 px-3 py-1 rounded-full border border-outline-variant/30">
              <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">shield</span>
              <span className="font-medium text-primary">256-Bit SSL Encrypted Vault</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#121212] text-[#E7D5BF] flex items-center justify-center font-serif text-xs font-semibold border border-primary/40/50 shadow-sm">
                {getInitials(profile.fullName)}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-semibold text-on-surface leading-tight max-w-[140px] truncate">
                  {profile.fullName}
                </span>
                <span className="block text-[10px] text-primary font-medium">
                  {profile.vipTier}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-8">
        
        {/* Editorial Greeting Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant/30 pb-6 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-primary mb-1.5">
              <span>◆</span>
              <span>Personal Wedding Atelier & Account Hub</span>
              <span>◆</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface">
              Welcome, <span className="italic font-normal gold-gradient-text font-serif">{profile.fullName.split('&')[0]?.trim() || 'Patron'}</span>
            </h1>
            <p className="text-xs lg:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
              Manage your commissioned bridal suites, track real-time white-glove consignments, preserve custom monograms, and coordinate with your dedicated wedding concierge.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/shop" 
              className="px-4 py-2 bg-primary hover:bg-[#5f4b2d] text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-all flex items-center space-x-2"
            >
              <span className="material-symbols-outlined w-3.5 h-3.5">shopping_bag</span>
              <span>Explore Collections</span>
            </Link>
            <a 
              href="https://wa.me/919692668263"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white hover:bg-stone-50 text-primary border border-primary/40 text-xs font-semibold tracking-wider uppercase rounded shadow-sm transition-all flex items-center space-x-2"
            >
              <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">chat</span>
              <span>Support WhatsApp</span>
            </a>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex border-b border-outline-variant/30 overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          {[
            { id: 'orders', label: 'Your Orders & Tracking', iconName: 'package_2', count: orders.length },
            { id: 'profile', label: 'Profile & Saved Addresses', iconName: 'person' },
            { id: 'monograms', label: 'Wedding Monograms', iconName: 'sparkles', count: monograms.length },
            { id: 'wishlist', label: 'Saved Treasures', iconName: 'favorite', count: wishlistItems.length },
            { id: 'concierge', label: 'Wedding Concierge', iconName: 'call' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                  isActive
                    ? 'border-[#75542E] text-primary bg-[#FAF4EB]/50'
                    : 'border-transparent text-on-surface-variant hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-outline'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-primary text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: ORDERS & TRACKING
           ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-outline-variant/30 p-10 text-center card-shadow max-w-xl mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-surface border border-primary/40 flex items-center justify-center mx-auto text-primary">
                  <span className="material-symbols-outlined w-7 h-7">package_2</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-on-surface">
                  No Commissions Placed Yet
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-md mx-auto">
                  When you commission a bespoke bridal trunk, ring vault, or royal guest welcome favors, your real-time tracking dossier and production telemetry will display here.
                </p>
                <div className="pt-2">
                  <Link
                    to="/shop"
                    className="inline-flex items-center space-x-2 px-6 py-2.5 bg-primary hover:bg-[#5f4b2d] text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-all"
                  >
                    <span className="material-symbols-outlined w-4 h-4">shopping_bag</span>
                    <span>Explore Bridal Masterpieces</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                    Showing {orders.length} {orders.length === 1 ? 'Registered Order' : 'Registered Orders'}
                  </span>
                  <Link
                    to="/track-order"
                    className="text-xs font-semibold text-primary hover:text-primary flex items-center space-x-1"
                  >
                    <span>Open Live Telemetry GPS Tracking</span>
                    <span className="material-symbols-outlined w-3.5 h-3.5">open_in_new</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {orders.map((ord, idx) => {
                    const total = typeof ord.grandTotal === 'number'
                      ? `₹${ord.grandTotal.toLocaleString('en-IN')}`
                      : (ord.grandTotal || '₹7,499');
                    const orderDate = ord.createdAt
                      ? new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : (ord.arrivalDate || 'Recent Order');
                    const items = Array.isArray(ord.items) && ord.items.length > 0 ? ord.items : [];

                    return (
                      <div
                        key={ord.orderId || idx}
                        className="bg-white rounded-xl border border-outline-variant/30 card-shadow p-5 lg:p-6 transition-all hover:border-primary/40 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-outline-variant/30/80 gap-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-surface border border-primary/40 flex items-center justify-center text-primary shrink-0">
                              <span className="material-symbols-outlined w-5 h-5">package_2</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-serif font-bold text-base text-on-surface">
                                  Docket #{ord.orderId}
                                </h3>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  {ord.status || 'Active Commission'}
                                </span>
                              </div>
                              <p className="text-xs text-on-surface-variant mt-0.5">
                                Placed on {orderDate} · Payment Status: <span className="text-emerald-700 font-semibold">{ord.paymentMethod === 'cod' ? 'Pay on Delivery' : 'Authorized & Confirmed'}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => navigate(`/track-order?docket=${encodeURIComponent(ord.orderId)}`)}
                              className="px-4 py-2 bg-primary hover:bg-[#5f4b2d] text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-all flex items-center space-x-1.5"
                            >
                              <span>Track Consignment</span>
                              <span className="material-symbols-outlined w-3.5 h-3.5">chevron_right</span>
                            </button>
                            <button
                              onClick={() => setSelectedOrder(selectedOrder === ord.orderId ? null : ord.orderId)}
                              className="px-3 py-2 bg-surface hover:bg-stone-100 text-primary border border-outline-variant/30 text-xs font-medium uppercase tracking-wider rounded transition-all"
                            >
                              {selectedOrder === ord.orderId ? 'Hide Items' : 'View Items'}
                            </button>
                          </div>
                        </div>

                        {/* Order Summary Strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface p-3.5 rounded-lg border border-outline-variant/30/80 text-xs">
                          <div>
                            <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Recipient</span>
                            <span className="font-semibold text-stone-900 truncate block">{ord.recipientName || profile.fullName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Delivery Target</span>
                            <span className="font-semibold text-stone-900">{ord.arrivalDate || 'Scheduled for Ceremony'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Destination</span>
                            <span className="font-semibold text-stone-900 truncate block">{ord.venueName || ord.city || 'Udaipur, Rajasthan'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Grand Total</span>
                            <span className="font-bold text-primary font-serif text-sm">{total}</span>
                          </div>
                        </div>

                        {/* Expandable Items List */}
                        {selectedOrder === ord.orderId && (
                          <div className="pt-2 divide-y divide-stone-100 border-t border-stone-200">
                            {items.length > 0 ? (
                              items.map((item, i) => (
                                <div key={i} className="py-3 flex items-center justify-between gap-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                                      {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                      ) : (
                                        <span className="material-symbols-outlined w-5 h-5 text-outline">shopping_bag</span>
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-serif font-semibold text-sm text-stone-900">{item.title}</h4>
                                      <p className="text-xs text-on-surface-variant">
                                        Qty: {item.quantity || 1} {item.edition ? `· ${item.edition}` : ''} {item.monogramDie ? `· Crest: ${item.monogramDie}` : ''}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="font-serif font-bold text-sm text-stone-900">
                                      {item.price ? `₹${item.price.toLocaleString('en-IN')}` : '₹7,499'}
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="py-3 text-xs text-on-surface-variant italic">Customized bridal heirloom ensemble details recorded under master commission vault.</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: PROFILE & SAVED ADDRESSES
           ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-200">
            
            {/* Profile Credentials Card */}
            <div className="lg:col-span-1 bg-white rounded-xl border border-outline-variant/30 card-shadow p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-outline-variant/30/80 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined w-4 h-4 text-primary">person</span>
                  <h3 className="font-serif font-bold text-base text-on-surface">
                    Profile Dossier
                  </h3>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => { setProfileForm(profile); setIsEditingProfile(true); }}
                    className="text-xs font-semibold text-primary hover:text-primary flex items-center space-x-1"
                  >
                    <span className="material-symbols-outlined w-3.5 h-3.5">edit</span>
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {profileSavedToast && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center space-x-2">
                  <span className="material-symbols-outlined w-4 h-4 text-emerald-600">check_circle</span>
                  <span>Profile updated successfully.</span>
                </div>
              )}

              {!isEditingProfile ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Patron Name</span>
                    <span className="font-semibold text-stone-900 text-sm">{profile.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Partner / Spouse</span>
                    <span className="font-semibold text-stone-900">{profile.partnerName || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Email Address</span>
                    <span className="font-semibold text-stone-900">{profile.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Contact Phone</span>
                    <span className="font-semibold text-stone-900">{profile.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Ceremony / Wedding Date</span>
                    <span className="font-semibold text-primary">{profile.weddingDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Primary Destination Venue</span>
                    <span className="font-semibold text-stone-900">{profile.primaryVenue}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[10px] uppercase text-on-surface-variant block font-medium">Patron Status</span>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EB] text-primary border border-outline-variant/30">
                      {profile.vipTier}
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase text-on-surface-variant font-semibold mb-1">Full Names</label>
                    <input
                      type="text"
                      required
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded bg-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-on-surface-variant font-semibold mb-1">Partner Name</label>
                    <input
                      type="text"
                      value={profileForm.partnerName}
                      onChange={(e) => setProfileForm({ ...profileForm, partnerName: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded bg-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-on-surface-variant font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded bg-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-on-surface-variant font-semibold mb-1">Phone</label>
                    <input
                      type="text"
                      required
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded bg-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-on-surface-variant font-semibold mb-1">Ceremony Date</label>
                    <input
                      type="date"
                      value={profileForm.weddingDate}
                      onChange={(e) => setProfileForm({ ...profileForm, weddingDate: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded bg-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-on-surface-variant font-semibold mb-1">Destination Venue</label>
                    <input
                      type="text"
                      value={profileForm.primaryVenue}
                      onChange={(e) => setProfileForm({ ...profileForm, primaryVenue: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded bg-surface"
                    />
                  </div>
                  <div className="pt-2 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-1.5 border border-stone-300 rounded hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-primary hover:bg-[#5f4b2d] text-white font-semibold rounded shadow"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Saved Delivery Addresses (Address Book) */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant/30 card-shadow p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-outline-variant/30/80 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined w-4 h-4 text-primary">location_on</span>
                    <h3 className="font-serif font-bold text-base text-on-surface">
                      Saved Addresses & Delivery Venues
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Select default shipping destinations for seamless one-click bespoke checkout.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="px-3 py-1.5 bg-primary hover:bg-[#5f4b2d] text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-all flex items-center space-x-1.5"
                >
                  <span className="material-symbols-outlined w-3.5 h-3.5">add</span>
                  <span>Add Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-xl border transition-all relative ${
                      addr.isDefault
                        ? 'border-[#75542E] bg-surface'
                        : 'border-outline-variant/30 bg-white hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-serif font-bold text-on-surface">
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-primary text-white px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-on-surface-variant space-y-1">
                      <p className="font-semibold text-stone-900">{addr.recipient}</p>
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.state} — {addr.pincode}</p>
                      <p className="text-on-surface-variant">Contact: {addr.phone}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-primary hover:underline font-medium text-[11px]"
                        >
                          Make Default
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                          <span className="material-symbols-outlined w-3 h-3">check_circle</span> Primary Dispatch Venue
                        </span>
                      )}
                      {addresses.length > 1 && (
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-outline hover:text-red-600 transition-colors p-1"
                          title="Remove address"
                        >
                          <span className="material-symbols-outlined w-3.5 h-3.5">delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3: WEDDING MONOGRAMS & PERSONALIZATION VAULT
           ========================================================================= */}
        {activeTab === 'monograms' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-on-surface">
                  Saved Couple Monograms & Crests
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Your preserved hot-stamp initials, brass dies, and calligraphy crest styles applied across your wedding suites.
                </p>
              </div>
              <button
                onClick={() => setShowMonogramModal(true)}
                className="px-4 py-2 bg-primary hover:bg-[#5f4b2d] text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-all flex items-center space-x-1.5"
              >
                <span className="material-symbols-outlined w-3.5 h-3.5">add</span>
                <span>Save New Monogram Crest</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monograms.map((mono) => (
                <div
                  key={mono.id}
                  className="bg-white rounded-xl border border-outline-variant/30 card-shadow p-6 space-y-4 hover:border-primary/40 transition-all"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-surface border-2 border-primary/40 flex flex-col items-center justify-center shadow-inner relative">
                    <span className="font-serif text-2xl font-bold gold-gradient-text tracking-wider">
                      {mono.initials}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-primary mt-0.5">
                      Hot-Stamped
                    </span>
                  </div>

                  <div className="text-center space-y-1">
                    <h4 className="font-serif font-bold text-base text-on-surface">
                      {mono.names || 'Custom Union Crest'}
                    </h4>
                    <p className="text-xs text-primary font-medium">{mono.crestStyle}</p>
                  </div>

                  <div className="p-3 bg-surface rounded-lg border border-outline-variant/30 text-xs space-y-1.5 text-on-surface-variant">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Foil Finish:</span>
                      <span className="font-semibold text-stone-900">{mono.foilFinish}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Typography:</span>
                      <span className="font-semibold text-stone-900">{mono.fontStyle}</span>
                    </div>
                    {mono.date && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Event Date:</span>
                        <span className="font-semibold text-stone-900">{mono.date}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <Link
                      to="/personalized"
                      className="text-primary hover:underline font-semibold text-[11px]"
                    >
                      Apply to New Heirloom →
                    </Link>
                    {monograms.length > 1 && (
                      <button
                        onClick={() => handleDeleteMonogram(mono.id)}
                        className="text-outline hover:text-red-600 p-1"
                        title="Remove crest"
                      >
                        <span className="material-symbols-outlined w-3.5 h-3.5">delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: SAVED TREASURES (WISHLIST)
           ========================================================================= */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-on-surface">
                  Saved Treasures & Wishlist
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Bridal suites and ceremony essentials curated for your celebration.
                </p>
              </div>
              <Link
                to="/wishlist"
                className="text-xs font-semibold text-primary hover:text-primary flex items-center space-x-1"
              >
                <span>Open Full Wishlist Suite</span>
                <span className="material-symbols-outlined w-3.5 h-3.5">chevron_right</span>
              </Link>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="bg-white rounded-xl border border-outline-variant/30 p-10 text-center card-shadow max-w-xl mx-auto space-y-4">
                <span className="material-symbols-outlined w-12 h-12 text-stone-300 mx-auto">favorite</span>
                <h3 className="font-serif font-bold text-lg text-stone-800">Your Wishlist is Empty</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  Browse our handcrafted collections to save keepsakes, trunk chests, and guest welcome sets.
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-5 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Discover Collections
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-outline-variant/30 card-shadow overflow-hidden flex flex-col justify-between hover:border-primary/40 transition-all"
                  >
                    <div>
                      <div className="h-48 bg-stone-100 relative overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-outline">
                            <span className="material-symbols-outlined w-8 h-8">shopping_bag</span>
                          </div>
                        )}
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-outline hover:text-red-600 shadow"
                          title="Remove from wishlist"
                        >
                          <span className="material-symbols-outlined w-3.5 h-3.5">delete</span>
                        </button>
                      </div>

                      <div className="p-4 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">
                          {item.categoryName || 'Bridal Keepsake'}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-on-surface line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-on-surface-variant line-clamp-2">
                          {item.description}
                        </p>
                        <div className="pt-1 flex items-baseline gap-2">
                          <span className="font-serif font-bold text-base text-on-surface">
                            ₹{item.price?.toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-outline line-through">
                              ₹{item.originalPrice?.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            image: item.image,
                            quantity: 1
                          });
                          removeFromWishlist(item.id);
                        }}
                        className="w-full py-2 bg-primary hover:bg-[#5f4b2d] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow flex items-center justify-center space-x-1.5"
                      >
                        <span className="material-symbols-outlined w-3.5 h-3.5">shopping_bag</span>
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 5: WEDDING CONCIERGE & DEDICATED STYLIST
           ========================================================================= */}
        {activeTab === 'concierge' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
            
            {/* Direct Stylist Hotline Card */}
            <div className="bg-[#121212] text-white rounded-xl border border-primary/40/50 card-shadow p-6 space-y-5">
              <div className="flex items-center space-x-3.5 border-b border-stone-800 pb-4">
                <div className="w-12 h-12 rounded-full bg-[#1C1A17] border border-primary/40 flex items-center justify-center font-serif text-base font-bold text-[#E7D5BF]">
                  SN
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-primary font-semibold block">
                    Lead Wedding Architect
                  </span>
                  <h4 className="text-base font-serif font-bold text-white">
                    Shagufta Naaz
                  </h4>
                  <span className="text-xs text-outline">
                    Hyderabad Flagship Atelier
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed italic">
                "Our master craftspeople are at your service for personalized gold-leaf proofing, ribbon pairing swatches, and international wedding venue delivery logistics."
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="https://wa.me/919692668263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center space-x-2 transition-colors shadow"
                >
                  <span className="material-symbols-outlined w-4 h-4">chat</span>
                  <span>Direct WhatsApp Channel</span>
                </a>

                <a
                  href="tel:+919692668263"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-[surface] border border-primary/40/50 text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center space-x-2 transition-colors"
                >
                  <span className="material-symbols-outlined w-4 h-4 text-primary">call</span>
                  <span>Call +91 96926 68263</span>
                </a>
              </div>
            </div>

            {/* Concierge FAQs & Quick Help */}
            <div className="md:col-span-2 bg-white rounded-xl border border-outline-variant/30 card-shadow p-6 space-y-5">
              <div className="border-b border-outline-variant/30/80 pb-3">
                <h3 className="font-serif font-bold text-lg text-on-surface">
                  Ceremony Concierge & Assistance
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Frequently addressed inquiries regarding bespoke turnaround, proofing, and venue handovers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-surface rounded-lg border border-outline-variant/30 space-y-1.5">
                  <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">schedule</span>
                    <span>How quickly can my order arrive?</span>
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    Standard dispatch is 24 to 48 hours. Urgent wedding dates can be prioritized for express white-glove courier handover.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded-lg border border-outline-variant/30 space-y-1.5">
                  <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">sparkles</span>
                    <span>Can I adjust names or initials?</span>
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    Yes. Before brass die milling or foil indentation commences, reach out on WhatsApp to update spellings with zero delay fee.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded-lg border border-outline-variant/30 space-y-1.5">
                  <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">location_on</span>
                    <span>Direct Resort & Palace Delivery</span>
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    We coordinate directly with banquet managers, hotel concierges, or wedding planners across India and international destinations.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded-lg border border-outline-variant/30 space-y-1.5">
                  <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">description</span>
                    <span>GST Invoices & Corporate Orders</span>
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    GST-compliant tax invoices are issued automatically with each dispatch and accessible directly via WhatsApp assistance.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <Link to="/faq" className="text-primary hover:underline font-semibold">
                  Browse All FAQs →
                </Link>
                <Link to="/return-policy" className="text-on-surface-variant hover:text-stone-800">
                  Return & Replacement Policy
                </Link>
                <Link to="/terms-of-service" className="text-on-surface-variant hover:text-stone-800">
                  Terms of Service & Care
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Address Creation Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-xl border border-outline-variant/30 card-shadow p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-on-surface border-b border-stone-200 pb-3">
              Add New Delivery Venue / Address
            </h3>
            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Address Label</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Udaivilas Suite / Home Residence"
                  value={addressForm.label}
                  onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-surface"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={addressForm.recipient}
                    onChange={(e) => setAddressForm({ ...addressForm, recipient: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded bg-surface"
                  />
                </div>
                <div>
                  <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91..."
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded bg-surface"
                  />
                </div>
              </div>
              <div>
                <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Street / Venue Gate</label>
                <input
                  type="text"
                  required
                  placeholder="Address Line & Hotel / Landmark"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-surface"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded bg-surface"
                  />
                </div>
                <div>
                  <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">State</label>
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded bg-surface"
                  />
                </div>
                <div>
                  <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    placeholder="313001"
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded bg-surface"
                  />
                </div>
              </div>
              <label className="flex items-center space-x-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="rounded text-primary focus:ring-[#75542E]"
                />
                <span className="text-stone-700">Set as primary dispatch address</span>
              </label>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-3 py-1.5 border border-stone-300 rounded hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary hover:bg-[#5f4b2d] text-white font-semibold rounded shadow"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Monogram Creation Modal */}
      {showMonogramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-xl border border-outline-variant/30 card-shadow p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-on-surface border-b border-stone-200 pb-3">
              Save Couple Monogram & Crest
            </h3>
            <form onSubmit={handleAddMonogram} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Initials</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="A & S"
                    value={monogramForm.initials}
                    onChange={(e) => setMonogramForm({ ...monogramForm, initials: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded bg-surface text-center uppercase font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Full Names</label>
                  <input
                    type="text"
                    placeholder="Asra & Shahnawaz"
                    value={monogramForm.names}
                    onChange={(e) => setMonogramForm({ ...monogramForm, names: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded bg-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Crest Border Style</label>
                <select
                  value={monogramForm.crestStyle}
                  onChange={(e) => setMonogramForm({ ...monogramForm, crestStyle: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-surface"
                >
                  <option>Classic Floral Crest</option>
                  <option>Minimalist Geometric Border</option>
                  <option>Florentine Filigree Frame</option>
                  <option>Royal Botanical Wreath</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Preferred Foil Finish</label>
                <select
                  value={monogramForm.foilFinish}
                  onChange={(e) => setMonogramForm({ ...monogramForm, foilFinish: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-surface"
                >
                  <option>24K Florentine Gold Foil</option>
                  <option>Champagne Rose Gold Foil</option>
                  <option>Hand-Burnished Antique Bronze</option>
                  <option>Blind Deboss (No Foil)</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-on-surface-variant text-[10px] font-semibold mb-1">Event Date (Optional)</label>
                <input
                  type="text"
                  placeholder="18th November 2026"
                  value={monogramForm.date}
                  onChange={(e) => setMonogramForm({ ...monogramForm, date: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-surface"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowMonogramModal(false)}
                  className="px-3 py-1.5 border border-stone-300 rounded hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary hover:bg-[#5f4b2d] text-white font-semibold rounded shadow"
                >
                  Save Monogram Crest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant/30/80 py-6 px-6 lg:px-12 text-on-surface-variant text-xs mt-12">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-serif font-bold tracking-widest text-primary uppercase">Maison ASRA</span>
            <span>·</span>
            <span>Client Sanctuary & Account Hub</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] tracking-wider uppercase">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy & Security</Link>
            <Link to="/return-policy" className="hover:text-primary transition-colors">Transit Guarantees</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact Concierge</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ClientPortalPage;
