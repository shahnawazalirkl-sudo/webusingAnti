import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Quick Sub-category Filter Tabs matching Stitch MCP
const SUB_CATEGORIES = [
  { id: 'all', label: 'All Wedding Suites (140)' },
  { id: 'bridal-groom', label: 'Bridal & Groom Gifts' },
  { id: 'vow-books', label: 'Vow Books & Stationery' },
  { id: 'trousseau-vaults', label: 'Trousseau & Ring Vaults' },
  { id: 'wedding-favors', label: 'Wedding Favors & Bulk' },
  { id: 'preserved-varmala', label: 'Preserved Varmala Art' },
  { id: 'milestone-keepsakes', label: 'Milestone Keepsakes' },
];

// Sidebar Filter Options defined in Stitch MCP
const RECIPIENTS = [
  { id: 'For Bride & Groom', label: 'For Bride & Groom (84)' },
  { id: 'Bridal Party & Bridesmaids', label: 'Bridal Party & Bridesmaids (32)' },
  { id: 'Groomsmen & Best Man', label: 'Groomsmen & Best Man (21)' },
  { id: 'Parents of the Couple', label: 'Parents of the Couple (18)' },
  { id: 'Wedding Guests & Favors', label: 'Wedding Guests & Favors (45)' },
];

const CEREMONIES = [
  'Proposal & Engagement',
  'Haldi & Mehendi',
  'Sangeet & Cocktail Favors',
  'Wedding Day Ceremony',
  'Reception & Honeymoon',
];

const CRAFTS = [
  'Gilded Wax Seal & Deckle Edge',
  'Hand-Polished Brass & Timber',
  'Monogrammed Raw Silk & Velvet',
  'Scannable Audio Acrylic',
  'Preserved Botanical Resin',
];

const TIMELINES = [
  { id: 'Priority Express (48h)', label: 'Priority Express (48h)', icon: 'bolt' },
  { id: 'Standard Atelier (4-7 Days)', label: 'Standard Atelier (4-7 Days)' },
  { id: 'Bespoke Bridal Suite (10+ Days)', label: 'Bespoke Bridal Suite (10+ Days)' },
];

const PRICE_RANGES = [
  { id: 'under-1500', label: 'Under ₹1,500' },
  { id: '1500-3500', label: '₹1,500 - ₹3,500' },
  { id: '3500-7000', label: '₹3,500 - ₹7,000' },
  { id: 'above-7000', label: '₹7,000 & Above' },
];

// Priority ID order matching Stitch MCP's curated 12 flagship masterpieces
const STITCH_CURATED_ORDER = [
  'sovereign-bridal-suite',
  'deckle-vow-books',
  'velvet-ring-vault',
  'botanical-varmala-frame',
  'mulberry-silk-robes',
  'carved-teakwood-guestbook',
  'soundwave-acrylic-lamp',
  'crystal-toasting-flutes',
  'groom-watch-casing',
  'luxury-trousseau-trunk',
  'botanical-candle-favors',
  'marble-brass-platter',
];

const FALLBACK_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBWXIZrXYuYJm45DRWcFkOWlOTDQ0hJYgaj9KnM1VtA7Q6UD7zH_N9LxDpvDXrCEDEyVGqLNGeIo3adq69iHsyP0MtB0WvXy5AQGgicu5MLJd60FAPd0eg1vCJ-5Ue1vm79MP87sgnWSZdyw1KZd7NOjB3dnAb2RiTqXJ5Sg1dJvOCV6wuTmrZ1iM05cWgS_U0K1PM7mYhRXqBfz376zB-He9z9dijJaZJ17jO33sOhxvRxPk0te4E5GQ';

const WeddingKeepsakesPage = () => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [searchParams] = useSearchParams();

  // Active sub-category filter tab
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Sidebar Filters State
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedCeremonies, setSelectedCeremonies] = useState([]);
  const [selectedCrafts, setSelectedCrafts] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Collapsible Accordion sections
  const [accordionOpen, setAccordionOpen] = useState({
    recipient: true,
    ceremony: true,
    craft: true,
    timeline: true,
    price: true,
  });

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState('bestseller');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Customization Modal State
  const [customizingProduct, setCustomizingProduct] = useState(null);
  const [customBride, setCustomBride] = useState('Asra');
  const [customGroom, setCustomGroom] = useState('Shahnawaz');
  const [customDate, setCustomDate] = useState('2026-11-18');
  const [customCrest, setCustomCrest] = useState('Heritage Floral Crest');
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [customQuantity, setCustomQuantity] = useState(1);

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Sync default edition when a product is opened for customization
  useEffect(() => {
    if (customizingProduct) {
      if (customizingProduct.editions && customizingProduct.editions.length > 0) {
        setSelectedEdition(customizingProduct.editions[0].name);
      } else {
        setSelectedEdition('Signature Atelier Edition');
      }
      setCustomQuantity(1);
    }
  }, [customizingProduct]);

  // Compute active customized price dynamically based on selected edition
  const activeCustomizedPrice = useMemo(() => {
    if (!customizingProduct) return 0;
    if (customizingProduct.editions && customizingProduct.editions.length > 0 && selectedEdition) {
      const found = customizingProduct.editions.find((e) => e.name === selectedEdition);
      if (found && found.price) return found.price;
    }
    return customizingProduct.price;
  }, [customizingProduct, selectedEdition]);

  // Keyboard listener for Escape to dismiss modals or mobile filter drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (customizingProduct) setCustomizingProduct(null);
        if (quickViewProduct) setQuickViewProduct(null);
        if (mobileFilterOpen) setMobileFilterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [customizingProduct, quickViewProduct, mobileFilterOpen]);

  // Lock body scroll when mobile drawer or modal is open
  useEffect(() => {
    if (customizingProduct || quickViewProduct || mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [customizingProduct, quickViewProduct, mobileFilterOpen]);

  // Toggle Accordions
  const toggleAccordion = (section) => {
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Toggle multi-select checkboxes
  const toggleRecipient = (value) => {
    setSelectedRecipients((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const toggleCeremony = (value) => {
    setSelectedCeremonies((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const toggleCraft = (value) => {
    setSelectedCrafts((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveTab('all');
    setSearchQuery('');
    setSelectedRecipients([]);
    setSelectedCeremonies([]);
    setSelectedCrafts([]);
    setSelectedTimeline('all');
    setSelectedPriceRange('all');
    setSortBy('bestseller');
    setCurrentPage(1);
  };

  // Total active filter count for mobile badge
  const activeFilterCount =
    (activeTab !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    selectedRecipients.length +
    selectedCeremonies.length +
    selectedCrafts.length +
    (selectedTimeline !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0);

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 0. Search keyword filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          product.title?.toLowerCase().includes(q) ||
          product.shortDescription?.toLowerCase().includes(q) ||
          product.description?.toLowerCase().includes(q) ||
          product.craft?.toLowerCase().includes(q) ||
          product.badge?.toLowerCase().includes(q) ||
          product.recipient?.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // 1. Tab filter
      if (activeTab !== 'all') {
        if (activeTab === 'bridal-groom') {
          const match =
            product.subCategory === 'bridal-groom-gifts' ||
            product.category === 'bridal-hampers' ||
            product.category === 'robes-silk' ||
            product.category === 'barware-flutes' ||
            product.category === 'groom-accessories' ||
            product.category === 'leather-travel' ||
            product.recipient?.includes('Bride') ||
            product.recipient?.includes('Groom');
          if (!match) return false;
        } else if (activeTab === 'vow-books') {
          const match =
            product.subCategory === 'vow-stationery' ||
            product.category === 'vow-books' ||
            product.id === 'deckle-vow-books' ||
            product.title?.toLowerCase().includes('vow');
          if (!match) return false;
        } else if (activeTab === 'trousseau-vaults') {
          const match =
            product.subCategory === 'trousseau-vaults' ||
            product.category === 'velvet-boxes' ||
            product.category === 'trousseau-suites' ||
            product.id === 'velvet-ring-vault' ||
            product.id === 'luxury-trousseau-trunk';
          if (!match) return false;
        } else if (activeTab === 'wedding-favors') {
          const match =
            product.subCategory === 'wedding-favors' ||
            product.category === 'wedding-favors' ||
            product.id === 'botanical-candle-favors' ||
            product.badge?.toLowerCase().includes('favor');
          if (!match) return false;
        } else if (activeTab === 'preserved-varmala') {
          const match =
            product.subCategory === 'preserved-varmala' ||
            product.category === 'preserved-varmala' ||
            product.id === 'botanical-varmala-frame' ||
            product.craft?.includes('Preserved Botanical');
          if (!match) return false;
        } else if (activeTab === 'milestone-keepsakes') {
          const match =
            product.subCategory === 'milestone-keepsakes' ||
            product.category === 'guestbook-wood' ||
            product.category === 'acrylic-plaques' ||
            product.category === 'platters-serveware' ||
            product.category === 'photo-frames' ||
            product.id === 'carved-teakwood-guestbook' ||
            product.id === 'soundwave-acrylic-lamp' ||
            product.id === 'marble-brass-platter';
          if (!match) return false;
        }
      }

      // 2. Recipient filter (flexible matching)
      if (selectedRecipients.length > 0) {
        const prodRecipient = product.recipient || '';
        const matches = selectedRecipients.some((r) => {
          if (r === 'For Bride & Groom') {
            return (
              prodRecipient.includes('Bride') ||
              prodRecipient.includes('Groom') ||
              prodRecipient.includes('Couple')
            );
          }
          if (r === 'Bridal Party & Bridesmaids') {
            return (
              prodRecipient.includes('Bridal Party') ||
              prodRecipient.includes('Bridesmaids') ||
              prodRecipient.includes('Her')
            );
          }
          if (r === 'Groomsmen & Best Man') {
            return (
              prodRecipient.includes('Groomsmen') ||
              prodRecipient.includes('Best Man') ||
              prodRecipient.includes('Groom')
            );
          }
          if (r === 'Parents of the Couple') {
            return prodRecipient.includes('Parents') || prodRecipient.includes('Couple');
          }
          if (r === 'Wedding Guests & Favors') {
            return prodRecipient.includes('Guests') || prodRecipient.includes('Favors');
          }
          return prodRecipient.includes(r);
        });
        if (!matches) return false;
      }

      // 3. Ceremony filter (flexible matching)
      if (selectedCeremonies.length > 0) {
        const prodCeremony = `${product.ceremony || ''} ${product.occasion || ''}`;
        const matches = selectedCeremonies.some((c) => {
          if (c === 'Proposal & Engagement') {
            return (
              prodCeremony.includes('Proposal') ||
              prodCeremony.includes('Engagement') ||
              prodCeremony.includes('Roka')
            );
          }
          if (c === 'Haldi & Mehendi') {
            return prodCeremony.includes('Haldi') || prodCeremony.includes('Mehendi');
          }
          if (c === 'Sangeet & Cocktail Favors') {
            return prodCeremony.includes('Sangeet') || prodCeremony.includes('Cocktail');
          }
          if (c === 'Wedding Day Ceremony') {
            return (
              prodCeremony.includes('Wedding Day') ||
              prodCeremony.includes('Ceremony') ||
              prodCeremony.includes('Trousseau')
            );
          }
          if (c === 'Reception & Honeymoon') {
            return prodCeremony.includes('Reception') || prodCeremony.includes('Honeymoon');
          }
          return prodCeremony.includes(c);
        });
        if (!matches) return false;
      }

      // 4. Craft & Finish filter (flexible matching)
      if (selectedCrafts.length > 0) {
        const prodCraft = product.craft || '';
        const matches = selectedCrafts.some((craft) => {
          if (craft === 'Gilded Wax Seal & Deckle Edge') {
            return (
              prodCraft.includes('Wax') ||
              prodCraft.includes('Deckle') ||
              prodCraft.includes('Gold Foil')
            );
          }
          if (craft === 'Hand-Polished Brass & Timber') {
            return (
              prodCraft.includes('Brass') ||
              prodCraft.includes('Timber') ||
              prodCraft.includes('Laser') ||
              prodCraft.includes('Wood')
            );
          }
          if (craft === 'Monogrammed Raw Silk & Velvet') {
            return (
              prodCraft.includes('Silk') ||
              prodCraft.includes('Velvet') ||
              prodCraft.includes('Monogrammed') ||
              prodCraft.includes('Debossing')
            );
          }
          if (craft === 'Scannable Audio Acrylic') {
            return (
              prodCraft.includes('Acrylic') ||
              prodCraft.includes('Scannable') ||
              prodCraft.includes('Audio')
            );
          }
          if (craft === 'Preserved Botanical Resin') {
            return (
              prodCraft.includes('Preserved') ||
              prodCraft.includes('Botanical') ||
              prodCraft.includes('Resin')
            );
          }
          return prodCraft.includes(craft);
        });
        if (!matches) return false;
      }

      // 5. Timeline filter
      if (selectedTimeline !== 'all') {
        const prodTimeline = product.timeline || '';
        if (selectedTimeline === 'Priority Express (48h)') {
          if (!prodTimeline.includes('48h') && !prodTimeline.includes('24-Hour')) return false;
        } else if (selectedTimeline === 'Standard Atelier (4-7 Days)') {
          if (!prodTimeline.includes('4-7') && !prodTimeline.includes('2–3 Days')) return false;
        } else if (selectedTimeline === 'Bespoke Bridal Suite (10+ Days)') {
          if (!prodTimeline.includes('10+')) return false;
        }
      }

      // 6. Price budget filter
      if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === 'under-1500' && product.price >= 1500) return false;
        if (selectedPriceRange === '1500-3500' && (product.price < 1500 || product.price > 3500))
          return false;
        if (selectedPriceRange === '3500-7000' && (product.price < 3500 || product.price > 7000))
          return false;
        if (selectedPriceRange === 'above-7000' && product.price <= 7000) return false;
      }

      return true;
    });
  }, [
    activeTab,
    searchQuery,
    selectedRecipients,
    selectedCeremonies,
    selectedCrafts,
    selectedTimeline,
    selectedPriceRange,
  ]);

  // Sorted Products Calculation
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'express') {
      list.sort((a, b) => (a.timeline?.includes('48h') || a.timeline?.includes('24') ? -1 : 1));
    } else {
      // Default: Curated Bridal Bestsellers — preserves Stitch's 12 flagship masterpiece order!
      list.sort((a, b) => {
        const indexA = STITCH_CURATED_ORDER.indexOf(a.id);
        const indexB = STITCH_CURATED_ORDER.indexOf(b.id);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      });
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  // Handle open customizer modal
  const handleOpenCustomizer = (product) => {
    setCustomizingProduct(product);
  };

  // Submit customization & add to cart
  const handleConfirmCustomization = () => {
    if (!customizingProduct) return;
    addToCart(customizingProduct, {
      brideName: customBride,
      groomName: customGroom,
      weddingDate: customDate,
      crestStyle: customCrest,
      price: activeCustomizedPrice,
      quantity: customQuantity,
      edition:
        selectedEdition ||
        (customizingProduct.editions
          ? customizingProduct.editions[0].name
          : 'Signature Atelier Edition'),
    });
    setCustomizingProduct(null);
  };

  // Open Quick View
  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setActivePhotoIndex(0);
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* Top Ambient Glow Decorator from Stitch MCP */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-gradient-to-b from-primary-fixed/25 via-secondary-container/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Atelier Breadcrumb & Header Hero from Stitch MCP */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-6 pb-6 w-full">
          {/* Breadcrumb Bar */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-space-sm uppercase tracking-widest text-xs"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link to="/collections" className="hover:text-primary transition-colors">
              Wedding Atelier
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Luxury Keepsakes &amp; Bridal Suites</span>
          </nav>

          {/* Editorial Banner Structure */}
          <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden mb-space-lg border border-outline-variant/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full mb-space-sm shadow-2xs">
                  <span
                    className="material-symbols-outlined text-[15px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    stars
                  </span>
                  <span className="font-label-sm text-label-sm tracking-[0.2em] text-primary uppercase font-bold text-[11px]">
                    The Atelier Wedding Suite
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight mb-2">
                  Bespoke Wedding Keepsakes &amp; Bridal Luxuries
                </h1>
                <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed mt-2">
                  Celebrate timeless unions with handcrafted vow books, personalized bridal hampers, monogrammed trousseau boxes, and heirloom keepsakes crafted to cherish forever.
                </p>
              </div>

              {/* Key Metrics Badges from Stitch MCP */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-sm shrink-0 mt-4 lg:mt-0">
                <div className="bg-surface-container-low px-4 py-2.5 rounded-lg flex items-center gap-2.5 border border-outline-variant/30 shadow-2xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">palette</span>
                  <div className="flex flex-col">
                    <span className="font-sans text-sm text-on-surface leading-tight font-bold">
                      140+
                    </span>
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Wedding Creations
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low px-4 py-2.5 rounded-lg flex items-center gap-2.5 border border-outline-variant/30 shadow-2xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    workspace_premium
                  </span>
                  <div className="flex flex-col">
                    <span className="font-sans text-sm text-on-surface leading-tight font-bold">
                      100%
                    </span>
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Handcrafted Quality
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low px-4 py-2.5 rounded-lg flex items-center gap-2.5 border border-outline-variant/30 shadow-2xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">bolt</span>
                  <div className="flex flex-col">
                    <span className="font-sans text-sm text-on-surface leading-tight font-bold">
                      48H
                    </span>
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Priority Dispatch
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Sub-category Filter Tabs */}
            <div className="mt-6 pt-4 flex items-center gap-2 overflow-x-auto scrollbar-none border-t border-outline-variant/20">
              {SUB_CATEGORIES.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap text-xs transition-all font-semibold cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-on-surface text-surface-container-lowest shadow-sm'
                        : 'bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface-variant'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Main Content Grid: Sidebar + Product Showcase */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 w-full pb-16">
        {/* Mobile Filter Drawer Open Button & Search Bar on Mobile */}
        <div className="lg:hidden mb-4 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="flex-1 px-4 py-2.5 bg-surface-container-low hover:bg-surface-container rounded-lg font-semibold text-xs text-on-surface flex items-center justify-center gap-2 border border-outline-variant/40 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
              <span>Refine Wedding Craft {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-2.5 text-xs text-primary font-bold uppercase tracking-wider hover:underline cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

          <div className="relative">
            <span className="material-symbols-outlined text-[18px] text-outline absolute left-3 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search wedding keepsakes, vow books, hampers..."
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg pl-9 pr-8 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips Bar (When filters are selected) */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-xs shadow-2xs">
            <span className="font-semibold text-on-surface-variant mr-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">filter_alt</span>
              Active Filters:
            </span>
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary font-medium rounded-full">
                <span>Keyword: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label="Remove search filter"
                >
                  ✕
                </button>
              </span>
            )}
            {activeTab !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary font-medium rounded-full">
                <span>Tab: {SUB_CATEGORIES.find((t) => t.id === activeTab)?.label}</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label="Remove category filter"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedRecipients.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary-container/50 text-on-secondary-container font-medium rounded-full"
              >
                <span>{r}</span>
                <button
                  type="button"
                  onClick={() => toggleRecipient(r)}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label={`Remove recipient ${r}`}
                >
                  ✕
                </button>
              </span>
            ))}
            {selectedCeremonies.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-container text-on-surface font-medium rounded-full"
              >
                <span>{c}</span>
                <button
                  type="button"
                  onClick={() => toggleCeremony(c)}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label={`Remove ceremony ${c}`}
                >
                  ✕
                </button>
              </span>
            ))}
            {selectedCrafts.map((craft) => (
              <span
                key={craft}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-container text-on-surface font-medium rounded-full"
              >
                <span>{craft}</span>
                <button
                  type="button"
                  onClick={() => toggleCraft(craft)}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label={`Remove craft ${craft}`}
                >
                  ✕
                </button>
              </span>
            ))}
            {selectedTimeline !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary font-medium rounded-full">
                <span>{selectedTimeline}</span>
                <button
                  type="button"
                  onClick={() => setSelectedTimeline('all')}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label="Remove timeline filter"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedPriceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary font-medium rounded-full">
                <span>{PRICE_RANGES.find((p) => p.id === selectedPriceRange)?.label}</span>
                <button
                  type="button"
                  onClick={() => setSelectedPriceRange('all')}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label="Remove price filter"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-primary font-bold hover:underline ml-auto cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Filter Sidebar (Col 3 on Large) & Mobile Drawer */}
          <aside
            className={`lg:col-span-3 flex flex-col gap-space-lg ${
              mobileFilterOpen
                ? 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 overflow-y-auto flex justify-end transition-opacity duration-300'
                : 'hidden lg:flex'
            }`}
            onClick={(e) => {
              if (mobileFilterOpen && e.target === e.currentTarget) {
                setMobileFilterOpen(false);
              }
            }}
          >
            <div
              className={`bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col gap-5 border border-outline-variant/30 ${
                mobileFilterOpen
                  ? 'w-full max-w-sm h-full overflow-y-auto p-6 rounded-2xl animate-in slide-in-from-right duration-200'
                  : 'sticky top-[160px]'
              }`}
            >
              {/* Sidebar Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                  <span className="font-sans text-xs text-on-surface uppercase tracking-wider font-bold">
                    Refine Wedding Craft
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs text-primary hover:text-on-surface transition-colors uppercase tracking-widest font-semibold cursor-pointer"
                  >
                    Reset
                  </button>
                  {mobileFilterOpen && (
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(false)}
                      className="p-1 text-on-surface-variant hover:text-on-surface cursor-pointer"
                      aria-label="Close filters"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Instant Search Bar inside Sidebar (Desktop) */}
              <div className="relative hidden lg:block">
                <span className="material-symbols-outlined text-[18px] text-outline absolute left-2.5 top-1/2 -translate-y-1/2">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Keyword search..."
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg pl-8 pr-7 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Filter Group 1: Role / Recipient */}
              <div className="flex flex-col gap-2 border-b border-outline-variant/20 pb-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('recipient')}
                  className="flex items-center justify-between cursor-pointer py-1 w-full text-left"
                >
                  <span className="font-sans text-xs text-on-surface font-bold uppercase tracking-wider">
                    Wedding Recipient
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    {accordionOpen.recipient ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {accordionOpen.recipient && (
                  <div className="space-y-2 pt-1 text-xs text-on-surface-variant font-sans">
                    {RECIPIENTS.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-2.5 cursor-pointer group select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRecipients.includes(item.id)}
                          onChange={() => toggleRecipient(item.id)}
                          className="w-4 h-4 rounded bg-surface-container-low accent-[#725b38] text-primary cursor-pointer"
                        />
                        <span className="group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Group 2: Wedding Milestone / Ceremony */}
              <div className="flex flex-col gap-2 border-b border-outline-variant/20 pb-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('ceremony')}
                  className="flex items-center justify-between cursor-pointer py-1 w-full text-left"
                >
                  <span className="font-sans text-xs text-on-surface font-bold uppercase tracking-wider">
                    Ceremony &amp; Milestone
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    {accordionOpen.ceremony ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {accordionOpen.ceremony && (
                  <div className="space-y-2 pt-1 text-xs text-on-surface-variant font-sans">
                    {CEREMONIES.map((ceremony) => (
                      <label
                        key={ceremony}
                        className="flex items-center gap-2.5 cursor-pointer group select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCeremonies.includes(ceremony)}
                          onChange={() => toggleCeremony(ceremony)}
                          className="w-4 h-4 rounded bg-surface-container-low accent-[#725b38] text-primary cursor-pointer"
                        />
                        <span className="group-hover:text-primary transition-colors">
                          {ceremony}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Group 3: Craft & Material Finish */}
              <div className="flex flex-col gap-2 border-b border-outline-variant/20 pb-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('craft')}
                  className="flex items-center justify-between cursor-pointer py-1 w-full text-left"
                >
                  <span className="font-sans text-xs text-on-surface font-bold uppercase tracking-wider">
                    Craft &amp; Finish
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    {accordionOpen.craft ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {accordionOpen.craft && (
                  <div className="space-y-2 pt-1 text-xs text-on-surface-variant font-sans">
                    {CRAFTS.map((craft) => (
                      <label
                        key={craft}
                        className="flex items-center gap-2.5 cursor-pointer group select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCrafts.includes(craft)}
                          onChange={() => toggleCraft(craft)}
                          className="w-4 h-4 rounded bg-surface-container-low accent-[#725b38] text-primary cursor-pointer"
                        />
                        <span className="group-hover:text-primary transition-colors">{craft}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Group 4: Delivery Timeline */}
              <div className="flex flex-col gap-2 border-b border-outline-variant/20 pb-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('timeline')}
                  className="flex items-center justify-between cursor-pointer py-1 w-full text-left"
                >
                  <span className="font-sans text-xs text-on-surface font-bold uppercase tracking-wider">
                    Timeline Window
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    {accordionOpen.timeline ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {accordionOpen.timeline && (
                  <div className="flex flex-col gap-1.5 pt-1">
                    {TIMELINES.map((t) => {
                      const isSelected = selectedTimeline === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTimeline(isSelected ? 'all' : t.id)}
                          className={`px-3 py-2 rounded text-xs flex items-center justify-between cursor-pointer transition-colors text-left ${
                            isSelected
                              ? 'bg-surface-container text-primary font-bold border border-primary/30'
                              : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-medium'
                          }`}
                        >
                          <span>{t.label}</span>
                          {t.icon && (
                            <span className="material-symbols-outlined text-[16px] text-primary">
                              {t.icon}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Group 5: Price Chips */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => toggleAccordion('price')}
                  className="flex items-center justify-between cursor-pointer py-1 w-full text-left"
                >
                  <span className="font-sans text-xs text-on-surface font-bold uppercase tracking-wider">
                    Price Budget
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    {accordionOpen.price ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {accordionOpen.price && (
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {PRICE_RANGES.map((p) => {
                      const isSelected = selectedPriceRange === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedPriceRange(isSelected ? 'all' : p.id)}
                          className={`px-2 py-1.5 rounded text-[11px] transition-colors text-center cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-on-primary font-bold shadow-sm'
                              : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-medium'
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Concierge WhatsApp Callout Card from Stitch MCP */}
              <div className="bg-gradient-to-br from-[#1C1B1B] to-[#2E2B28] text-surface-container-lowest rounded-xl flex flex-col gap-2 relative overflow-hidden mt-2 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                    support_agent
                  </span>
                  <span className="text-xs text-primary-fixed font-bold tracking-wider uppercase font-sans">
                    Wedding Concierge
                  </span>
                </div>
                <p className="text-xs text-surface-container-highest/85 leading-relaxed">
                  Need custom bridal suite favors for 50+ guests? Connect with our dedicated wedding curator.
                </p>
                <a
                  className="mt-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container text-xs uppercase tracking-wider font-bold rounded transition-colors"
                  href="https://wa.me/919692668263?text=Hello%20ASRA%20Wedding%20Canvas,%20I%20would%20like%20to%20consult%20with%20a%20wedding%20stylist%20for%20bridal%20keepsakes."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Talk to Wedding Stylist</span>
                </a>
              </div>

              {mobileFilterOpen && (
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="mt-2 w-full py-2.5 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm cursor-pointer"
                >
                  Apply Filters ({sortedProducts.length} Results)
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid Stream (Col 9 on Large) */}
          <main className="lg:col-span-9 flex flex-col gap-space-lg">
            {/* Sorting & Results Summary Bar from Stitch MCP */}
            <div className="bg-surface-container-lowest px-4 py-3 rounded-xl flex flex-wrap items-center justify-between gap-space-sm shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-on-surface font-bold font-sans">
                  Showing {paginatedProducts.length} of {sortedProducts.length} Curated Masterpieces
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-xs text-primary uppercase tracking-widest font-bold">
                  Handmade On-Order
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-outline uppercase tracking-wider font-semibold">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container text-on-surface text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:bg-surface-container-low cursor-pointer font-semibold border border-outline-variant/30"
                >
                  <option value="bestseller">Curated Bridal Bestsellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="express">Express Delivery First</option>
                </select>
              </div>
            </div>

            {/* 12 Luxury Product Cards Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md">
                {paginatedProducts.map((product) => {
                  const isWishlisted = isInWishlist(product.id);
                  const discountPercent = product.originalPrice
                    ? Math.round(
                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                      )
                    : null;

                  return (
                    <article
                      key={product.id}
                      className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-all duration-300 relative border border-outline-variant/30"
                    >
                      {/* Card Thumbnail & Action Badges */}
                      <div className="relative w-full aspect-square overflow-hidden bg-surface-container-low">
                        <Link
                          to={`/product/${product.slug || product.id}`}
                          className="block w-full h-full cursor-pointer"
                        >
                          <img
                            alt={product.title}
                            src={product.image || FALLBACK_IMAGE}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = FALLBACK_IMAGE;
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </Link>

                        {/* Top-Left Category & Special Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                          {product.badge && (
                            <span
                              className={`text-[10px] tracking-wider uppercase px-2 py-0.5 rounded font-bold shadow-xs ${
                                product.badge.includes('Preservation') ||
                                product.badge.includes('Timber') ||
                                product.badge.includes('Makrana')
                                  ? 'bg-[#725B38] text-surface-container-lowest'
                                  : product.badge.includes('Silk') ||
                                      product.badge.includes('Paper') ||
                                      product.badge.includes('Crystal') ||
                                      product.badge.includes('Trousseau')
                                    ? 'bg-secondary text-on-secondary'
                                    : 'bg-primary text-on-primary'
                              }`}
                            >
                              {product.badge}
                            </span>
                          )}
                          {product.secondaryBadge && (
                            <span
                              className={`text-[10px] tracking-wider uppercase px-2 py-0.5 rounded shadow-xs ${
                                product.secondaryBadge.includes('Mehendi')
                                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                                  : 'bg-inverse-surface/85 text-surface-container-lowest'
                              }`}
                            >
                              {product.secondaryBadge}
                            </span>
                          )}
                        </div>

                        {/* Top-Right Wishlist Heart Action */}
                        <button
                          type="button"
                          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm z-10 cursor-pointer"
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] transition-colors ${
                              isWishlisted ? 'text-rose-600' : 'text-outline hover:text-primary'
                            }`}
                            style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            favorite
                          </span>
                        </button>

                        {/* Quick View Button Hover Overlay */}
                        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 px-4">
                          <button
                            type="button"
                            onClick={() => handleOpenQuickView(product)}
                            className="w-full py-1.5 px-3 bg-surface-container-lowest/90 backdrop-blur-sm hover:bg-surface-container-lowest text-on-surface text-[11px] font-bold rounded-lg shadow-md flex items-center justify-center gap-1.5 border border-outline-variant/40 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px] text-primary">
                              visibility
                            </span>
                            <span>Quick Photo Preview</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Content & Details */}
                      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                        <div className="flex flex-col">
                          {/* Rating & Reviews */}
                          <div className="flex items-center gap-1 text-[#C5A880] mb-1">
                            <span
                              className="material-symbols-outlined text-[16px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            <span className="text-xs text-on-surface font-bold font-sans">
                              {product.rating || 4.9}
                            </span>
                            <span className="text-[11px] text-outline font-sans">
                              ({product.reviewCount || 72} reviews)
                            </span>
                          </div>

                          {/* Title linking to product detail */}
                          <Link to={`/product/${product.slug || product.id}`}>
                            <h2 className="font-serif text-base font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-1">
                              {product.title}
                            </h2>
                          </Link>

                          {/* Short Description */}
                          <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                            {product.shortDescription}
                          </p>
                        </div>

                        {/* Price & CTA Section */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-base font-bold text-on-surface">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-outline line-through font-sans">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                            {discountPercent && (
                              <span className="text-xs text-primary font-bold font-sans">
                                {discountPercent}% OFF
                              </span>
                            )}
                          </div>

                          {/* Customize For Wedding CTA */}
                          <button
                            type="button"
                            onClick={() => handleOpenCustomizer(product)}
                            className="w-full py-2.5 px-4 bg-on-surface hover:bg-primary text-surface-container-lowest text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 font-bold shadow-xs cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            <span>Customize For Wedding</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="bg-surface-container-lowest p-12 rounded-xl text-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-outline text-[48px] mb-2">
                  search_off
                </span>
                <h3 className="font-serif text-lg text-on-surface font-semibold">
                  No Wedding Keepsakes Found
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
                  We could not find items matching your active combination of filters. Try clearing some selections to explore our full atelier collection.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-primary text-on-primary rounded text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination / Atelier Load More from Stitch MCP */}
            {sortedProducts.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-6 border-t border-outline-variant/20">
                <span className="text-xs text-on-surface-variant font-sans">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, sortedProducts.length)} to{' '}
                  {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} bespoke wedding creations
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'bg-primary text-on-primary font-bold shadow-xs'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {totalPages > 4 && (
                    <>
                      <span className="px-2 text-outline">...</span>
                      <button
                        type="button"
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-9 h-9 rounded text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                          currentPage === totalPages
                            ? 'bg-primary text-on-primary font-bold shadow-xs'
                            : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  {currentPage < totalPages && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-3 h-9 rounded bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Curated Wedding Atelier Services & Bulk Gifting Highlight Banner from Stitch MCP */}
      <section className="w-full bg-surface-container-low py-14 border-t border-outline-variant/20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-sans text-xs text-primary uppercase tracking-[0.25em] font-bold">
              Specialist Wedding Services
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-on-surface mt-1">
              Curated Wedding Atelier Privileges
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
              From personalized custom initials to complete destination wedding favor suites, let our master craftsmen bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Atelier Service 1 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-all p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">draw</span>
                </div>
                <h3 className="font-serif text-lg text-on-surface mb-2 font-semibold group-hover:text-primary transition-colors">
                  Complimentary Bridal Monogram
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Every couple receives a bespoke digital and wax-stamp wedding monogram crafted by our resident calligrapher on orders exceeding ₹5,000.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  to="/bespoke"
                  className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline"
                >
                  <span>Claim Monogram Consult</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Atelier Service 2 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-all p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">diversity_1</span>
                </div>
                <h3 className="font-serif text-lg text-on-surface mb-2 font-semibold group-hover:text-primary transition-colors">
                  Bulk Favors &amp; Gifting Concierge
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Planning Mehendi or destination wedding welcome hampers? Enjoy tiered bridal party discounts, custom wax packaging, and direct venue dispatch.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  to="/bulk-orders"
                  className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline"
                >
                  <span>View Bulk Privilege Tiers</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Atelier Service 3 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-all p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">local_florist</span>
                </div>
                <h3 className="font-serif text-lg text-on-surface mb-2 font-semibold group-hover:text-primary transition-colors">
                  Archival Varmala Floral Preservation
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Ship your sacred ceremony varmalas and bouquets to our master lab in Hyderabad. We freeze dry and encase them forever in crystal UV resin frames.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  to="/bespoke"
                  className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline"
                >
                  <span>Book Flower Collection</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Trust Banners from Stitch MCP */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 py-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-2xs">
            <span className="material-symbols-outlined text-primary text-[28px] mb-2">fingerprint</span>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">
              100% Bespoke Craft
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
              Individualized couple names, dates &amp; vows
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-2xs">
            <span className="material-symbols-outlined text-primary text-[28px] mb-2">
              verified_user
            </span>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">
              Insured Global Courier
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
              Zero damage guarantee across 140+ cities
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-2xs">
            <span className="material-symbols-outlined text-primary text-[28px] mb-2">loyalty</span>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">
              Wax-Sealed Luxury Box
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
              Unboxing worthy of wedding celebrations
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-2xs">
            <span className="material-symbols-outlined text-primary text-[28px] mb-2">headset_mic</span>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">
              Atelier Privilege Desk
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
              Dedicated bridal coordinator via WhatsApp
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Bespoke Customization Modal with Live Calligraphy Monogram Die Preview */}
      {customizingProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setCustomizingProduct(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40 relative overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-outline-variant/30 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={customizingProduct.image || FALLBACK_IMAGE}
                  alt={customizingProduct.title}
                  className="w-14 h-14 object-cover rounded-lg bg-surface-container-low border border-outline-variant/30 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                    Bespoke Wedding Customizer
                  </span>
                  <h3
                    id="modal-title"
                    className="font-serif text-base font-semibold text-on-surface line-clamp-1"
                  >
                    {customizingProduct.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-bold text-sm text-primary font-serif">
                      ₹{activeCustomizedPrice.toLocaleString('en-IN')}
                    </span>
                    {customizingProduct.originalPrice && (
                      <span className="text-[11px] text-outline line-through">
                        ₹{customizingProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {selectedEdition && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                        {selectedEdition}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCustomizingProduct(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Customization Form Fields */}
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="bride-name" className="font-semibold text-on-surface block mb-1">
                    Bride's Name
                  </label>
                  <input
                    id="bride-name"
                    type="text"
                    value={customBride}
                    onChange={(e) => setCustomBride(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2 text-on-surface font-medium focus:border-primary focus:outline-none"
                    placeholder="e.g. Asra"
                  />
                </div>
                <div>
                  <label htmlFor="groom-name" className="font-semibold text-on-surface block mb-1">
                    Groom's Name
                  </label>
                  <input
                    id="groom-name"
                    type="text"
                    value={customGroom}
                    onChange={(e) => setCustomGroom(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2 text-on-surface font-medium focus:border-primary focus:outline-none"
                    placeholder="e.g. Shahnawaz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="wedding-date" className="font-semibold text-on-surface block mb-1">
                    Ceremony / Wedding Date
                  </label>
                  <input
                    id="wedding-date"
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2 text-on-surface font-medium focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="font-semibold text-on-surface block mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center border border-outline-variant/60 rounded bg-surface-container-low">
                    <button
                      type="button"
                      onClick={() => setCustomQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-on-surface hover:bg-surface-container font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-xs">{customQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setCustomQuantity((q) => q + 1)}
                      className="px-3 py-2 text-on-surface hover:bg-surface-container font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="crest-style" className="font-semibold text-on-surface block mb-1">
                  Monogram Crest Style
                </label>
                <select
                  id="crest-style"
                  value={customCrest}
                  onChange={(e) => setCustomCrest(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2 text-on-surface font-medium focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option>Heritage Floral Crest</option>
                  <option>Royal Serif Monogram</option>
                  <option>Contemporary Minimal Crest</option>
                  <option>Botanical Wax Seal Die</option>
                </select>
              </div>

              {/* Edition Selector if available */}
              {customizingProduct.editions && customizingProduct.editions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-on-surface block">
                      Select Colorway / Atelier Edition
                    </span>
                    <span className="text-[10px] text-primary font-bold">
                      Price updates dynamically
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {customizingProduct.editions.map((ed) => {
                      const isSelected = selectedEdition === ed.name;
                      return (
                        <button
                          key={ed.name}
                          type="button"
                          onClick={() => setSelectedEdition(ed.name)}
                          className={`p-2.5 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-primary bg-primary/5 text-primary font-bold ring-1 ring-primary'
                              : 'border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:border-outline'
                          }`}
                        >
                          <div className="flex flex-col truncate mr-1">
                            <span className="text-[11px] truncate font-semibold">{ed.name}</span>
                            <span className="text-[10px] text-primary font-sans font-bold">
                              ₹{ed.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          {ed.dotColors && (
                            <span className="flex items-center -space-x-1 shrink-0">
                              {ed.dotColors.map((color, idx) => (
                                <span
                                  key={idx}
                                  className="w-3.5 h-3.5 rounded-full border border-surface shadow-2xs"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Calligraphy Die Proof Live Preview */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-fixed/20 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] text-outline uppercase tracking-wider block mb-1 font-bold">
                  Live Calligraphy Monogram Die Proof
                </span>
                <div className="font-serif text-2xl font-bold text-primary tracking-wide py-1">
                  {customBride ? customBride.trim().charAt(0).toUpperCase() : 'A'} &amp;{' '}
                  {customGroom ? customGroom.trim().charAt(0).toUpperCase() : 'S'}
                </div>
                <span className="text-[11px] text-on-surface-variant font-medium block">
                  {customBride || 'Bride'} &amp; {customGroom || 'Groom'} •{' '}
                  {customDate || 'Wedding Date'}
                </span>
                <span className="inline-block mt-1 text-[10px] text-primary uppercase tracking-widest font-semibold px-2.5 py-0.5 bg-primary/10 rounded-full">
                  {customCrest}
                </span>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="mt-5 pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-2">
              <Link
                to={`/product/${customizingProduct.slug || customizingProduct.id}`}
                onClick={() => setCustomizingProduct(null)}
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
              >
                <span>Full Product Details</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCustomizingProduct(null)}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCustomization}
                  className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>
                    Add to Bag (₹{(activeCustomizedPrice * customQuantity).toLocaleString('en-IN')})
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Photo Lightbox Modal */}
      {quickViewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-outline-variant/40 relative overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">
                  {quickViewProduct.badge || 'Atelier Masterpiece'}
                </span>
                <h3 className="font-serif text-base font-semibold text-on-surface line-clamp-1">
                  {quickViewProduct.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Photo & Gallery Thumbnails */}
              <div className="flex flex-col gap-2">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30">
                  <img
                    src={
                      (quickViewProduct.gallery && quickViewProduct.gallery[activePhotoIndex]) ||
                      quickViewProduct.image ||
                      FALLBACK_IMAGE
                    }
                    alt={quickViewProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {quickViewProduct.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer shrink-0 transition-all ${
                          activePhotoIndex === idx
                            ? 'border-primary ring-1 ring-primary'
                            : 'border-outline-variant/40 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details & Inclusions */}
              <div className="flex flex-col justify-between text-xs">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-serif text-xl font-bold text-on-surface">
                      ₹{quickViewProduct.price.toLocaleString('en-IN')}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-outline line-through">
                        ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <p className="text-on-surface-variant leading-relaxed mb-3">
                    {quickViewProduct.description || quickViewProduct.shortDescription}
                  </p>

                  {quickViewProduct.inclusions && quickViewProduct.inclusions.length > 0 && (
                    <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 mb-3">
                      <span className="font-bold text-[11px] text-on-surface block mb-1 uppercase tracking-wide">
                        Atelier Suite Inclusions:
                      </span>
                      <ul className="space-y-1 text-[11px] text-on-surface-variant">
                        {quickViewProduct.inclusions.slice(0, 4).map((inc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-primary shrink-0 mt-0.5">
                              check_circle
                            </span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 pt-3 border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => {
                      const prod = quickViewProduct;
                      setQuickViewProduct(null);
                      handleOpenCustomizer(prod);
                    }}
                    className="w-full py-2.5 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Customize This Piece</span>
                  </button>
                  <Link
                    to={`/product/${quickViewProduct.slug || quickViewProduct.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="w-full py-2 text-center text-xs font-semibold text-primary hover:underline"
                  >
                    View Comprehensive Specifications →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingKeepsakesPage;
