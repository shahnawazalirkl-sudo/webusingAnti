import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { PRODUCTS } from '../data/productsData';

// Quick categories for top pill filter
const categoryPills = [
  { id: 'all', label: 'All Products' },
  { id: 'keepsakes', label: 'Personalized Gifts', filterCat: ['photo-frames', 'acrylic-plaques', 'wooden-keepsakes'] },
  { id: 'favors-trousseau', label: 'Wedding Favors & Wedding Essentials', filterCat: ['wedding-favors', 'trousseau-suites', 'vow-books'] },
  { id: 'for-her', label: 'Gifts For Her', recipient: 'For Her', aliases: ['bride'] },
  { id: 'for-him', label: 'Gifts For Him', recipient: 'For Him', aliases: ['groom'] },
  { id: 'couple', label: 'Anniversary & Couple', recipient: 'Couple', aliases: ['bride & groom'] },
  { id: 'hampers', label: 'Luxury Hampers', filterCat: ['hampers', 'bridal-hampers'] },
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const catalogSectionRef = useRef(null);

  // Search and Category from query parameters
  const initialCategory = searchParams.get('cat') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Local state for all facets
  const [selectedPill, setSelectedPill] = useState(initialCategory);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all'); // 'all', 'under-1000', '1000-2500', '2500-5000', 'above-5000'
  const [selectedRecipient, setSelectedRecipient] = useState('all'); // 'all', 'For Her', 'For Him', 'Couple', 'Parents', 'Bridesmaids', 'Groomsmen'
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedPersonalization, setSelectedPersonalization] = useState('all');
  const [selectedDispatch, setSelectedDispatch] = useState('all'); // 'all', '24h', 'standard', 'customized'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating', 'newest'
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [gridCols, setGridCols] = useState(3); // 3 or 4 columns
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Sync with URL params
  useEffect(() => {
    const urlCat = searchParams.get('cat');
    if (urlCat && urlCat !== 'all') {
      const isPill = categoryPills.some((p) => p.id === urlCat);
      if (isPill) {
        setSelectedPill(urlCat);
      } else {
        setSelectedProductTypes([urlCat]);
        setSelectedPill('all');
      }
    } else {
      setSelectedPill('all');
      setSelectedProductTypes([]);
    }
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
    setCurrentPage(1);

    // If navigated with a category filter, search query, or #products anchor, directly scroll to products
    const hasCategoryOrAnchor = (urlCat && urlCat !== 'all') || urlSearch || location.hash === '#products';
    if (hasCategoryOrAnchor && catalogSectionRef.current) {
      setTimeout(() => {
        if (catalogSectionRef.current) {
          const headerOffset = 130;
          const elementPosition = catalogSectionRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 70);
    }
  }, [searchParams, location.hash]);

  // Product types for sidebar checkboxes with dynamic labels
  const productTypeOptions = [
    { id: 'photo-frames', label: 'Engraved Photo Frames', category: 'photo-frames' },
    { id: 'acrylic-plaques', label: 'LED Acrylic Song Plaques', category: 'acrylic-plaques' },
    { id: 'velvet-boxes', label: 'Initials Velvet Jewelry Boxes', category: 'velvet-boxes' },
    { id: 'wooden-keepsakes', label: 'Wooden Gift Boxes', category: 'wooden-keepsakes' },
    { id: 'leather-travel', label: 'Customized Travel Sets', category: 'leather-travel' },
    { id: 'hampers', label: 'Couple Celebration Hampers', category: 'hampers' },
    { id: 'wedding-favors', label: 'Wedding Guest Favors', category: 'wedding-favors' },
    { id: 'trousseau-suites', label: 'Bridal Wedding Essentials Suites', category: 'trousseau-suites' },
    { id: 'vow-books', label: 'Heirloom Vow Books', category: 'vow-books' },
    { id: 'robes-silk', label: 'Pure Mulberry Silk Robes', category: 'robes-silk' }
  ];

  // Occasions list
  const occasionOptions = [
    'Wedding & Reception',
    'Engagement & Roka',
    'Anniversary Milestones',
    'Birthday & Celebration',
    'Housewarming / Griha Pravesh'
  ];

  // Recipients list
  const recipientOptions = [
    'For Her',
    'For Him',
    'Couple',
    'Parents',
    'Bridesmaids',
    'Groomsmen'
  ];

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title?.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription?.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query);
        const matchesCraft = product.craft?.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query) || product.categoryLabel?.toLowerCase().includes(query);
        const matchesRecipient = product.recipient?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCraft && !matchesCategory && !matchesRecipient) {
          return false;
        }
      }

      // 2. Top Category Pill
      if (selectedPill !== 'all') {
        const foundPill = categoryPills.find((p) => p.id === selectedPill);
        if (foundPill) {
          if (foundPill.filterCat && !foundPill.filterCat.includes(product.category)) {
            return false;
          }
          if (foundPill.recipient) {
            const prodRec = (product.recipient || '').toLowerCase();
            const targetRec = foundPill.recipient.toLowerCase();
            const matchesDirect = prodRec.includes(targetRec);
            const matchesAlias = foundPill.aliases && foundPill.aliases.some((a) => prodRec.includes(a));
            if (!matchesDirect && !matchesAlias) {
              return false;
            }
          }
        }
      }

      // 3. Product Types Checkbox multi-select
      if (selectedProductTypes.length > 0) {
        if (!selectedProductTypes.includes(product.category)) {
          return false;
        }
      }

      // 4. Price Range
      if (selectedPriceRange === 'under-1000' && product.price >= 1000) return false;
      if (selectedPriceRange === '1000-2500' && (product.price < 1000 || product.price > 2500)) return false;
      if (selectedPriceRange === '2500-5000' && (product.price < 2500 || product.price > 5000)) return false;
      if (selectedPriceRange === 'above-5000' && product.price <= 5000) return false;

      // 5. Recipient
      if (selectedRecipient !== 'all') {
        if (!product.recipient?.toLowerCase().includes(selectedRecipient.toLowerCase())) {
          return false;
        }
      }

      // 6. Occasion
      if (selectedOccasions.length > 0) {
        const matchesOccasion = selectedOccasions.some((occ) =>
          product.occasion?.toLowerCase().includes(occ.toLowerCase()) ||
          product.ceremony?.toLowerCase().includes(occ.toLowerCase())
        );
        if (!matchesOccasion) return false;
      }

      // 7. Personalization Technique / Mode
      if (selectedPersonalization !== 'all') {
        const craft = (product.craft || '').toLowerCase();
        const tech = (product.techniqueTag || '').toLowerCase();
        if (selectedPersonalization === 'engraved' && !craft.includes('engraved') && !tech.includes('laser')) return false;
        if (selectedPersonalization === 'debossed' && !craft.includes('deboss') && !craft.includes('foil')) return false;
        if (selectedPersonalization === 'photo' && !craft.includes('photo') && !tech.includes('photo')) return false;
        if (selectedPersonalization === 'audio' && !craft.includes('scannable') && !craft.includes('audio') && !tech.includes('audio')) return false;
      }

      // 8. Dispatch Speed
      if (selectedDispatch === '24h') {
        const is24h = (product.timeline || '').includes('48h') ||
          (product.timeline || '').includes('24-Hour') ||
          (product.deliveryBadge || '').includes('24h');
        if (!is24h) return false;
      } else if (selectedDispatch === 'standard') {
        const isStandard = (product.timeline || '').includes('Standard') || (product.timeline || '').includes('2–3 Days');
        if (!isStandard) return false;
      } else if (selectedDispatch === 'customized') {
        const isBespoke = (product.timeline || '').includes('Customized') || (product.timeline || '').includes('5–7 Days') || (product.timeline || '').includes('10+ Days');
        if (!isBespoke) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // featured
    });
  }, [
    searchQuery,
    selectedPill,
    selectedProductTypes,
    selectedPriceRange,
    selectedRecipient,
    selectedOccasions,
    selectedPersonalization,
    selectedDispatch,
    sortBy
  ]);

  // Compute counts for top pills
  const pillCounts = useMemo(() => {
    const counts = {};
    categoryPills.forEach((pill) => {
      if (pill.id === 'all') {
        counts[pill.id] = PRODUCTS.length;
      } else if (pill.filterCat) {
        counts[pill.id] = PRODUCTS.filter((p) => pill.filterCat.includes(p.category)).length;
      } else if (pill.recipient) {
        counts[pill.id] = PRODUCTS.filter((p) =>
          p.recipient?.toLowerCase().includes(pill.recipient.toLowerCase())
        ).length;
      } else {
        counts[pill.id] = 0;
      }
    });
    return counts;
  }, []);

  // Compute active filters count for badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedPill !== 'all') count += 1;
    if (selectedProductTypes.length > 0) count += selectedProductTypes.length;
    if (selectedPriceRange !== 'all') count += 1;
    if (selectedRecipient !== 'all') count += 1;
    if (selectedOccasions.length > 0) count += selectedOccasions.length;
    if (selectedPersonalization !== 'all') count += 1;
    if (selectedDispatch !== 'all') count += 1;
    if (searchQuery.trim()) count += 1;
    return count;
  }, [
    selectedPill,
    selectedProductTypes,
    selectedPriceRange,
    selectedRecipient,
    selectedOccasions,
    selectedPersonalization,
    selectedDispatch,
    searchQuery
  ]);

  // Clear all filters
  const resetAllFilters = () => {
    setSelectedPill('all');
    setSelectedProductTypes([]);
    setSelectedPriceRange('all');
    setSelectedRecipient('all');
    setSelectedOccasions([]);
    setSelectedPersonalization('all');
    setSelectedDispatch('all');
    setSortBy('featured');
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Toggle single product type checkbox
  const toggleProductType = (cat) => {
    setSelectedProductTypes((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  // Toggle occasion checkbox
  const toggleOccasion = (occ) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
    setCurrentPage(1);
  };

  // Pagination calculations (8 products per page unless showAllProducts is true)
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    if (showAllProducts) return filteredProducts;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, showAllProducts]);

  return (
    <div className="w-full bg-surface min-h-screen text-on-surface">

      {/* 2. Editorial Page Header & Story Canvas */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 sm:p-10 shadow-xs border border-outline-variant/30">
          {/* Ambient Glow Accent */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
              <span className="material-symbols-outlined text-[16px]">draw</span>
              <span>Curated Gift Archives</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface tracking-tight leading-[1.18] font-normal">
              The Collection Catalog
            </h1>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-1">
              Thoughtfully personalized gifts, customized wedding essentials, and timeless gift favors handcrafted for
              life's most unforgettable moments. Each piece debossed, engraved, or hand-finished in our ateliers.
            </p>
          </div>

          {/* Metrics summary banner */}
          <div className="relative z-10 mt-6 pt-5 border-t border-outline-variant/40 flex flex-wrap items-center gap-6 sm:gap-10">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary">{PRODUCTS.length}</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-on-surface-variant">
                Archived Designs
              </span>
            </div>
            <div className="w-px h-8 bg-outline-variant/50 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary">4.96 ★</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-on-surface-variant">
                Client Rating
              </span>
            </div>
            <div className="w-px h-8 bg-outline-variant/50 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary">24-48h</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-on-surface-variant">
                Express Dispatch
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="relative z-10 mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categoryPills.map((pill) => {
              const isSelected = selectedPill === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => {
                    setSelectedPill(pill.id);
                    setCurrentPage(1);
                  }}
                  type="button"
                  className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-sans text-xs whitespace-nowrap transition-all shadow-xs ${
                    isSelected
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isSelected
                        ? 'bg-white/20 text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {pillCounts[pill.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Sticky Interactive Control Bar */}
      <section className="sticky top-[148px] z-30 w-full bg-surface/90 backdrop-blur-md shadow-xs border-y border-outline-variant/30 mb-8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Active Filter Indicators & Total Count */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              type="button"
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary transition-colors font-label-md text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <span className="font-body-sm text-xs text-on-surface-variant">
              Showing{' '}
              <strong className="text-on-surface font-semibold">
                {filteredProducts.length === 0 ? 0 : showAllProducts ? filteredProducts.length : paginatedProducts.length}
              </strong>{' '}
              of <strong className="text-on-surface font-semibold">{filteredProducts.length}</strong> items
            </span>

            {/* Active Tags Quick Dismiss */}
            {activeFiltersCount > 0 && (
              <div className="hidden xl:flex items-center gap-1.5 flex-wrap">
                {selectedPill !== 'all' && (
                  <span className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/40 px-2 py-0.5 rounded text-[11px] font-label-sm text-on-surface">
                    {categoryPills.find((p) => p.id === selectedPill)?.label}
                    <button
                      onClick={() => setSelectedPill('all')}
                      className="hover:text-rose-600 ml-0.5"
                      aria-label="Remove category filter"
                    >
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </span>
                )}

                {selectedPriceRange !== 'all' && (
                  <span className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/40 px-2 py-0.5 rounded text-[11px] font-label-sm text-on-surface">
                    {selectedPriceRange === 'under-1000' && 'Under ₹1,000'}
                    {selectedPriceRange === '1000-2500' && '₹1,000 - ₹2,500'}
                    {selectedPriceRange === '2500-5000' && '₹2,500 - ₹5,000'}
                    {selectedPriceRange === 'above-5000' && 'Above ₹5,000'}
                    <button
                      onClick={() => setSelectedPriceRange('all')}
                      className="hover:text-rose-600 ml-0.5"
                      aria-label="Remove price filter"
                    >
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </span>
                )}

                {selectedRecipient !== 'all' && (
                  <span className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/40 px-2 py-0.5 rounded text-[11px] font-label-sm text-on-surface">
                    {selectedRecipient}
                    <button
                      onClick={() => setSelectedRecipient('all')}
                      className="hover:text-rose-600 ml-0.5"
                      aria-label="Remove recipient filter"
                    >
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </span>
                )}

                {selectedProductTypes.map((catId) => (
                  <span
                    key={catId}
                    className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/40 px-2 py-0.5 rounded text-[11px] font-label-sm text-on-surface"
                  >
                    {productTypeOptions.find((p) => p.category === catId)?.label || catId}
                    <button
                      onClick={() => toggleProductType(catId)}
                      className="hover:text-rose-600 ml-0.5"
                      aria-label={`Remove ${catId} filter`}
                    >
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </span>
                ))}

                {searchQuery.trim() && (
                  <span className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/40 px-2 py-0.5 rounded text-[11px] font-label-sm text-on-surface">
                    "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-rose-600 ml-0.5"
                      aria-label="Clear keyword search"
                    >
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </span>
                )}

                <button
                  onClick={resetAllFilters}
                  type="button"
                  className="font-label-sm text-[11px] text-primary hover:underline ml-1 font-semibold"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Right: View Layout Toggle & Sorting Dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            {/* Grid View Switcher */}
            <div className="hidden lg:flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/40">
              <button
                onClick={() => setGridCols(3)}
                type="button"
                className={`p-1.5 rounded transition-all ${
                  gridCols === 3
                    ? 'text-on-surface bg-surface-container-lowest shadow-sm text-primary font-bold'
                    : 'text-outline hover:text-primary'
                }`}
                title="3-Column Grid"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setGridCols(4)}
                type="button"
                className={`p-1.5 rounded transition-all ${
                  gridCols === 4
                    ? 'text-on-surface bg-surface-container-lowest shadow-sm text-primary font-bold'
                    : 'text-outline hover:text-primary'
                }`}
                title="4-Column Grid"
              >
                <span className="material-symbols-outlined text-[18px]">view_comfy_alt</span>
              </button>
            </div>

            {/* Sorting Menu */}
            <div className="relative flex items-center">
              <label
                htmlFor="sortDropdown"
                className="font-label-sm text-[11px] text-outline uppercase tracking-wider mr-2 hidden sm:inline"
              >
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sortDropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-lowest text-on-surface font-title-sm text-xs pl-3 pr-8 py-1.5 rounded-lg shadow-sm border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="featured">Featured Collection Edits</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Ratings (Top Rated)</option>
                  <option value="newest">Newest Collection Arrivals</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Two-Column Catalog Layout */}
      <div id="products" ref={catalogSectionRef} className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Desktop Sticky Sidebar Filters (Left Column - 3 cols) */}
          <aside
            id="filterSidebar"
            className="lg:col-span-3 sticky top-[228px] max-h-[calc(100vh-250px)] overflow-y-auto scrollbar-none pr-1 hidden lg:flex flex-col gap-6 bg-surface-container-lowest p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs"
          >
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <div className="flex items-center gap-1.5 text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-primary">filter_vintage</span>
                <span className="font-serif text-base font-semibold tracking-wide">Refine Collection</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  type="button"
                  className="font-sans text-[11px] text-primary uppercase tracking-wider hover:underline font-bold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Keyword Search in Catalog */}
            <div>
              <label className="block text-[11px] uppercase font-bold text-outline tracking-wider mb-2 font-sans">
                Keyword Search
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search gifts, acrylics..."
                  className="w-full bg-surface-container-low pl-8 pr-3 py-2 rounded-lg border border-outline-variant/50 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* 1. Product Types Multi-select */}
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Product Types
              </span>
              <div className="flex flex-col gap-2 mt-1">
                {productTypeOptions.map((type) => {
                  const isChecked = selectedProductTypes.includes(type.category);
                  const count = PRODUCTS.filter((p) => p.category === type.category).length;
                  return (
                    <label
                      key={type.id}
                      className="flex items-center justify-between cursor-pointer group select-none"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProductType(type.category)}
                          className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                        />
                        <span className="font-body-sm text-xs text-on-surface group-hover:text-primary transition-colors">
                          {type.label}
                        </span>
                      </div>
                      <span className="font-label-sm text-[11px] text-outline">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 2. Price Range */}
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Price Range
              </span>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPriceRange(selectedPriceRange === 'under-1000' ? 'all' : 'under-1000');
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-1.5 rounded text-center text-xs transition-colors font-medium ${
                    selectedPriceRange === 'under-1000'
                      ? 'bg-secondary-container text-on-secondary-container font-bold border border-secondary/30'
                      : 'bg-surface-container-low hover:bg-secondary-container/50 text-on-surface'
                  }`}
                >
                  Under ₹1,000
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPriceRange(selectedPriceRange === '1000-2500' ? 'all' : '1000-2500');
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-1.5 rounded text-center text-xs transition-colors font-medium ${
                    selectedPriceRange === '1000-2500'
                      ? 'bg-secondary-container text-on-secondary-container font-bold border border-secondary/30'
                      : 'bg-surface-container-low hover:bg-secondary-container/50 text-on-surface'
                  }`}
                >
                  ₹1K – ₹2.5K
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPriceRange(selectedPriceRange === '2500-5000' ? 'all' : '2500-5000');
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-1.5 rounded text-center text-xs transition-colors font-medium ${
                    selectedPriceRange === '2500-5000'
                      ? 'bg-secondary-container text-on-secondary-container font-bold border border-secondary/30'
                      : 'bg-surface-container-low hover:bg-secondary-container/50 text-on-surface'
                  }`}
                >
                  ₹2.5K – ₹5K
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPriceRange(selectedPriceRange === 'above-5000' ? 'all' : 'above-5000');
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-1.5 rounded text-center text-xs transition-colors font-medium ${
                    selectedPriceRange === 'above-5000'
                      ? 'bg-secondary-container text-on-secondary-container font-bold border border-secondary/30'
                      : 'bg-surface-container-low hover:bg-secondary-container/50 text-on-surface'
                  }`}
                >
                  ₹5,000+
                </button>
              </div>
            </div>

            {/* 3. Gift Recipient */}
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Gift Recipient
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {recipientOptions.map((rec) => {
                  const isSelected = selectedRecipient === rec;
                  return (
                    <button
                      key={rec}
                      type="button"
                      onClick={() => {
                        setSelectedRecipient(isSelected ? 'all' : rec);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 rounded-full text-xs font-label-sm transition-colors ${
                        isSelected
                          ? 'bg-primary text-on-primary font-semibold shadow-sm'
                          : 'bg-surface-container-low text-on-surface hover:bg-primary-fixed'
                      }`}
                    >
                      {rec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Occasion */}
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Occasion
              </span>
              <div className="flex flex-col gap-2 mt-1">
                {occasionOptions.map((occ) => {
                  const isChecked = selectedOccasions.includes(occ);
                  return (
                    <label
                      key={occ}
                      className="flex items-center gap-2 cursor-pointer group select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOccasion(occ)}
                        className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                      />
                      <span className="font-body-sm text-xs text-on-surface group-hover:text-primary transition-colors">
                        {occ}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 5. Personalization Mode */}
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Personalization Mode
              </span>
              <select
                value={selectedPersonalization}
                onChange={(e) => {
                  setSelectedPersonalization(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant/60 text-xs text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="all">All Modes</option>
                <option value="engraved">Precision Laser Engraved</option>
                <option value="debossed">Gold Foil Stamping / Debossing</option>
                <option value="photo">HD Archival Photo Print &amp; Mount</option>
                <option value="audio">Scannable Spotify / Audio Waveform</option>
              </select>
            </div>

            {/* 6. Dispatch Window */}
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Dispatch Window
              </span>
              <div className="flex flex-col gap-2 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dispatch"
                    checked={selectedDispatch === 'all'}
                    onChange={() => setSelectedDispatch('all')}
                    className="accent-primary"
                  />
                  <span className="font-body-sm text-xs text-on-surface">All Timelines</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dispatch"
                    checked={selectedDispatch === '24h'}
                    onChange={() => setSelectedDispatch('24h')}
                    className="accent-primary"
                  />
                  <span className="font-body-sm text-xs text-on-surface">⚡ Express 24-Hour Dispatch</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dispatch"
                    checked={selectedDispatch === 'standard'}
                    onChange={() => setSelectedDispatch('standard')}
                    className="accent-primary"
                  />
                  <span className="font-body-sm text-xs text-on-surface">Standard Artisanal (2–3 Days)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dispatch"
                    checked={selectedDispatch === 'customized'}
                    onChange={() => setSelectedDispatch('customized')}
                    className="accent-primary"
                  />
                  <span className="font-body-sm text-xs text-on-surface">Customized Initials (5–7 Days)</span>
                </label>
              </div>
            </div>

            {/* Support Direct Advisory Box */}
            <div className="bg-primary-container/20 p-4 rounded-xl flex items-start gap-3 border border-primary/20 mt-2">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">support_agent</span>
              <div className="flex flex-col">
                <h4 className="font-serif text-sm text-on-surface font-semibold">Customized Support</h4>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-1 leading-snug">
                  Need assistance with bulk wedding favors, wedding essentials design, or urgent timelines?
                </p>
                <a
                  href="https://wa.me/919692668263?text=Hello%20ASRA%20Atelier,%20I%20need%20assistance%20with%20custom%20wedding%20gifting"
                  target="_blank"
                  rel="noreferrer"
                  className="font-label-sm text-[11px] text-primary hover:text-secondary font-bold uppercase tracking-wider mt-2 flex items-center gap-1"
                >
                  Connect on WhatsApp <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Product Grid & Editorial Flow (Right Column - 9 cols) */}
          <main className="lg:col-span-9 flex flex-col gap-8">
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/40 shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline mb-3">
                  <span className="material-symbols-outlined text-4xl">search_off</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-on-surface">No Heirlooms Found</h3>
                <p className="text-xs text-outline mt-1 mb-6 max-w-sm">
                  We couldn't find matches for your active filter combination. Try resetting filters or searching with
                  different keywords.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    gridCols === 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'xl:grid-cols-3'
                  } gap-3 sm:gap-4 lg:gap-5`}
                >
                  {/* First batch of products (up to 6) */}
                  {paginatedProducts.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Mid-Grid Editorial Banner / Collection Custom Notice */}
                <div className="w-full rounded-xl bg-[#FAF4EB] p-6 sm:p-8 relative overflow-hidden shadow-xs border border-primary/20">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex flex-col max-w-xl text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-1.5 text-primary font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold mb-1">
                        <span className="material-symbols-outlined text-[16px]">support_agent</span>
                        <span>Private Consultation &amp; Bulk Favors</span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl text-on-surface leading-tight font-normal">
                        Planning a Wedding or Royal Soirée?
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                        Connect directly with our Chief Atelier Designer. Receive physical wood and fabric swatch kits,
                        complimentary initials 3D mockups, and tailored volume pricing for 50+ pieces.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                      <a
                        href="https://wa.me/919692668263?text=Hello%20ASRA%20Atelier,%20I%20would%20like%20to%20consult%20for%20wedding%20favors"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#25D366] text-white hover:opacity-90 active:scale-[0.98] font-sans text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-xs font-semibold"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span>Chat on WhatsApp</span>
                      </a>
                      <Link
                        to="/bespoke"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface hover:border-primary hover:text-primary active:scale-[0.98] font-sans text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-xs font-semibold border border-outline-variant/40"
                      >
                        <span>Submit Brief</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Second batch of products (cards 7 onwards) */}
                {paginatedProducts.length > 6 && (
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                      gridCols === 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'xl:grid-cols-3'
                    } gap-3 sm:gap-4 lg:gap-5`}
                  >
                    {paginatedProducts.slice(6).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}

                    {/* Customized Discovery Card inserted at end of catalog grid */}
                    <div className="flex flex-col justify-center items-center text-center p-6 rounded-xl bg-surface-container-low border border-outline-variant/40 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-[24px]">palette</span>
                      </div>
                      <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest font-semibold">
                        Customized Commission
                      </span>
                      <h3 className="font-serif text-lg text-on-surface mt-1 font-semibold">Have a Unique Vision?</h3>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-2 mb-4 max-w-xs leading-relaxed">
                        Upload your wedding logo, custom motif, or personalized calligraphy poem for customized casting.
                      </p>
                      <Link
                        to="/bespoke"
                        className="px-4 py-2 rounded-lg bg-inverse-surface text-inverse-on-surface hover:bg-primary font-label-md text-xs transition-all shadow-sm font-semibold"
                      >
                        Your Idea → We Create
                      </Link>
                    </div>
                  </div>
                )}

                {/* Refined Pagination Bar & Action Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-sm">
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    Page <strong className="text-on-surface font-semibold">{currentPage}</strong> of{' '}
                    <strong className="text-on-surface font-semibold">{totalPages}</strong> •{' '}
                    {filteredProducts.length} Handcrafted Designs
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      type="button"
                      className="w-8 h-8 rounded bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>

                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          type="button"
                          className={`w-8 h-8 rounded font-label-md text-xs flex items-center justify-center font-bold transition-colors ${
                            currentPage === pageNum
                              ? 'bg-inverse-surface text-inverse-on-surface'
                              : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      type="button"
                      className="w-8 h-8 rounded bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowAllProducts((prev) => !prev)}
                    type="button"
                    className="font-label-md text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>{showAllProducts ? 'Paginate Catalog' : `View All ${filteredProducts.length} Products`}</span>
                    <span className="material-symbols-outlined text-[16px]">
                      {showAllProducts ? 'compress' : 'expand_all'}
                    </span>
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* 5. Trust & Collection Quality Assurance Section */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-surface-container-low rounded-2xl border border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm text-on-surface font-semibold">100% Customized Craft</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Master engravers &amp; artisans</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm text-on-surface font-semibold">Insured Express Delivery</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Safe door-to-door transit</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[24px]">featured_seasonal_and_gifts</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm text-on-surface font-semibold">Luxury Wax Gift Wrap</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Complimentary ribbons &amp; box</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[24px]">ring_volume</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm text-on-surface font-semibold">Dedicated Support</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Direct planner assistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-full max-w-xs bg-surface-container-lowest h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/40 mb-4">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary">filter_vintage</span>
                  <span className="font-serif text-lg font-semibold">Refine Collection</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Product Types */}
              <div className="mb-6">
                <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold block mb-2">
                  Product Types
                </span>
                <div className="flex flex-col gap-2">
                  {productTypeOptions.map((type) => (
                    <label key={type.id} className="flex items-center justify-between text-xs cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedProductTypes.includes(type.category)}
                          onChange={() => toggleProductType(type.category)}
                          className="accent-primary w-4 h-4 rounded"
                        />
                        <span>{type.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="mb-6">
                <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold block mb-2">
                  Price Range
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setSelectedPriceRange(selectedPriceRange === 'under-1000' ? 'all' : 'under-1000')}
                    className={`py-1 px-2 rounded text-xs ${
                      selectedPriceRange === 'under-1000' ? 'bg-primary text-on-primary' : 'bg-surface-container-low'
                    }`}
                  >
                    &lt; ₹1,000
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange(selectedPriceRange === '1000-2500' ? 'all' : '1000-2500')}
                    className={`py-1 px-2 rounded text-xs ${
                      selectedPriceRange === '1000-2500' ? 'bg-primary text-on-primary' : 'bg-surface-container-low'
                    }`}
                  >
                    ₹1K - ₹2.5K
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange(selectedPriceRange === '2500-5000' ? 'all' : '2500-5000')}
                    className={`py-1 px-2 rounded text-xs ${
                      selectedPriceRange === '2500-5000' ? 'bg-primary text-on-primary' : 'bg-surface-container-low'
                    }`}
                  >
                    ₹2.5K - ₹5K
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange(selectedPriceRange === 'above-5000' ? 'all' : 'above-5000')}
                    className={`py-1 px-2 rounded text-xs ${
                      selectedPriceRange === 'above-5000' ? 'bg-primary text-on-primary' : 'bg-surface-container-low'
                    }`}
                  >
                    ₹5,000+
                  </button>
                </div>
              </div>

              {/* Recipient */}
              <div className="mb-6">
                <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold block mb-2">
                  Recipient
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {recipientOptions.map((rec) => (
                    <button
                      key={rec}
                      onClick={() => setSelectedRecipient(selectedRecipient === rec ? 'all' : rec)}
                      className={`px-2.5 py-1 rounded-full text-xs ${
                        selectedRecipient === rec ? 'bg-primary text-on-primary' : 'bg-surface-container-low'
                      }`}
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-outline-variant/30 flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-xs"
              >
                Clear
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-xs font-semibold"
              >
                View {filteredProducts.length} Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
