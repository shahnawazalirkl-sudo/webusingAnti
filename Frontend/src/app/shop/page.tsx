"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useMemo, useEffect, useRef } from 'react';

import ProductCard from '@/components/common/ProductCard';
import { PRODUCTS } from '@/data/productsData';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Modular Shop Subcomponents
import ShopHeader, { CATEGORY_PILLS } from '@/components/shop/ShopHeader';
import ShopControlBar from '@/components/shop/ShopControlBar';
import ShopFilters from '@/components/shop/ShopFilters';
import ShopPagination from '@/components/shop/ShopPagination';

// Available Filter Options
const PRODUCT_TYPE_OPTIONS = [
  { id: 'photo-frames', label: 'Engraved Photo Frames', category: 'photo-frames' },
  { id: 'acrylic-plaques', label: 'LED Acrylic Song Plaques', category: 'acrylic-plaques' },
  { id: 'velvet-boxes', label: 'Initials Velvet Jewelry Boxes', category: 'velvet-boxes' },
  { id: 'wooden-keepsakes', label: 'Wooden Gift Boxes', category: 'wooden-keepsakes' },
  { id: 'leather-travel', label: 'Customized Travel Sets', category: 'leather-travel' },
  { id: 'hampers', label: 'Couple Celebration Hampers', category: 'hampers' },
  { id: 'wedding-favors', label: 'Wedding Guest Favors', category: 'wedding-favors' },
  { id: 'trousseau-suites', label: 'Bridal Wedding Essentials Suites', category: 'trousseau-suites' },
  { id: 'vow-books', label: 'Heirloom Vow Books', category: 'vow-books' },
  { id: 'robes-silk', label: 'Pure Mulberry Silk Robes', category: 'robes-silk' },
];

const OCCASION_OPTIONS = [
  'Wedding & Reception',
  'Engagement & Roka',
  'Anniversary Milestones',
  'Birthday & Celebration',
  'Housewarming / Griha Pravesh',
];

const RECIPIENT_OPTIONS = [
  'For Her',
  'For Him',
  'Couple',
  'Parents',
  'Bridesmaids',
  'Groomsmen',
];

const ShopPageInner = () => {
  const searchParams = useSearchParams();
const setSearchParams = (params: any) => {};
  const location = usePathname();
  const catalogSectionRef = useRef<HTMLDivElement | null>(null);

  // Read URL query parameters
  const initialCategory = searchParams?.get('cat') || 'all';
  const initialSearch = searchParams?.get('search') || '';

  // Local state for all facets
  const [selectedPill, setSelectedPill] = useState(initialCategory);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedRecipient, setSelectedRecipient] = useState('all');
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedPersonalization, setSelectedPersonalization] = useState('all');
  const [selectedDispatch, setSelectedDispatch] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [gridCols, setGridCols] = useState(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Synchronize state with URL parameters
  useEffect(() => {
    const urlCat = searchParams?.get('cat');
    if (urlCat && urlCat !== 'all') {
      const isPill = CATEGORY_PILLS.some((p) => p.id === urlCat);
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

    const urlSearch = searchParams?.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    setCurrentPage(1);

    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const hasCategoryOrAnchor = (urlCat && urlCat !== 'all') || urlSearch || hash === '#products';
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
  }, [searchParams, location]);

  // Filter products using all active criteria
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Keyword search
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
        const foundPill = CATEGORY_PILLS.find((p) => p.id === selectedPill);
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

      // 3. Product Types multi-select
      if (selectedProductTypes.length > 0) {
        if (!selectedProductTypes.includes(product.category)) {
          return false;
        }
      }

      // 4. Price Brackets
      if (selectedPriceRange === 'under-1000' && product.price >= 1000) return false;
      if (selectedPriceRange === '1000-2500' && (product.price < 1000 || product.price > 2500)) return false;
      if (selectedPriceRange === '2500-5000' && (product.price < 2500 || product.price > 5000)) return false;
      if (selectedPriceRange === 'above-5000' && product.price <= 5000) return false;

      // 5. Gift Recipient
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

      // 7. Personalization Technique
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
    sortBy,
  ]);

  // Compute counts for top category pills
  const pillCounts = useMemo(() => {
    const counts = {};
    CATEGORY_PILLS.forEach((pill) => {
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

  // Compute active filters count
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
    searchQuery,
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
  const toggleProductType = (cat: string) => {
    setSelectedProductTypes((prev: string[]) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setSelectedPill('all'); // Clear quick-pill if advanced filter is used
    setCurrentPage(1);
  };

  // Toggle occasion checkbox
  const toggleOccasion = (occ: string) => {
    setSelectedOccasions((prev: string[]) =>
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
      {/* 1. Page Header & Category Pills */}
      <ShopHeader
        selectedPill={selectedPill}
        onSelectPill={(pillId) => {
          setSelectedPill(pillId);
          setCurrentPage(1);
        }}
        pillCounts={pillCounts}
      />

      {/* 2. Sticky Interactive Control Bar */}
      <ShopControlBar
        totalItems={PRODUCTS.length}
        filteredCount={filteredProducts.length}
        displayCount={showAllProducts ? filteredProducts.length : paginatedProducts.length}
        activeFiltersCount={activeFiltersCount}
        selectedPill={selectedPill}
        onResetPill={() => setSelectedPill('all')}
        selectedPriceRange={selectedPriceRange}
        onResetPrice={() => setSelectedPriceRange('all')}
        selectedRecipient={selectedRecipient}
        onResetRecipient={() => setSelectedRecipient('all')}
        selectedProductTypes={selectedProductTypes}
        onToggleProductType={toggleProductType}
        productTypeOptions={PRODUCT_TYPE_OPTIONS}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
        onResetAll={resetAllFilters}
        gridCols={gridCols}
        onGridColsChange={setGridCols}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
      />

      {/* 3. Catalog Grid & Two-Column Layout */}
      <div id="products" ref={catalogSectionRef} className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Desktop Sticky Sidebar (3 Columns) */}
          <aside
            id="filterSidebar"
            className="lg:col-span-3 sticky top-[228px] max-h-[calc(100vh-250px)] overflow-y-auto scrollbar-none pr-1 hidden lg:flex flex-col bg-surface-container-lowest p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs"
          >
            <ShopFilters
              searchQuery={searchQuery}
              onSearchChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              selectedProductTypes={selectedProductTypes}
              onToggleProductType={toggleProductType}
              productTypeOptions={PRODUCT_TYPE_OPTIONS}
              productsList={PRODUCTS}
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={(val) => {
                setSelectedPriceRange(val);
                setCurrentPage(1);
              }}
              selectedRecipient={selectedRecipient}
              onSelectRecipient={(val) => {
                setSelectedRecipient(val);
                setCurrentPage(1);
              }}
              recipientOptions={RECIPIENT_OPTIONS}
              selectedOccasions={selectedOccasions}
              onToggleOccasion={toggleOccasion}
              occasionOptions={OCCASION_OPTIONS}
              selectedPersonalization={selectedPersonalization}
              onSelectPersonalization={(val) => {
                setSelectedPersonalization(val);
                setCurrentPage(1);
              }}
              selectedDispatch={selectedDispatch}
              onSelectDispatch={(val) => {
                setSelectedDispatch(val);
                setCurrentPage(1);
              }}
              activeFiltersCount={activeFiltersCount}
              onResetAll={resetAllFilters}
            />
          </aside>

          {/* Main Product Grid (9 Columns) */}
          <main className="lg:col-span-9 flex flex-col gap-8">
            {filteredProducts.length === 0 ? (
              <Card className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-xs">
                <CardContent className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline mb-4">
                    <span className="material-symbols-outlined text-3xl">filter_alt_off</span>
                  </div>
                  <h3 className="font-serif text-xl text-on-surface font-medium mb-2">No Matching Keepsakes Found</h3>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
                    We couldn't find products matching all your active filter criteria. Try clearing some filters or searching for broader terms.
                  </p>
                  <Button
                    onClick={resetAllFilters}
                    className="h-10 px-6 font-semibold"
                  >
                    Reset All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Responsive Product Grid: 2-column standardized on mobile */}
                <div
                  className={`grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 ${
                    gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                  }`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                <ShopPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalFiltered={filteredProducts.length}
                  showAllProducts={showAllProducts}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onToggleShowAll={() => {
                    setShowAllProducts((prev) => !prev);
                    if (showAllProducts) {
                      catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              </>
            )}
          </main>
        </div>
      </div>

      {/* 4. Mobile Filter Drawer Sheet */}
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col h-full bg-surface text-on-surface border-l border-outline-variant/30 overflow-hidden"
        >
          {/* Header */}
          <SheetHeader className="p-4 sm:p-5 border-b border-outline-variant/30 text-left shrink-0 bg-surface-container-low/50">
            <div className="flex items-center justify-between pr-8">
              <SheetTitle className="flex items-center gap-2 text-base font-serif text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-primary">filter_vintage</span>
                <span>Refine Collection</span>
              </SheetTitle>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs text-primary hover:underline font-bold uppercase tracking-wider"
                >
                  Reset ({activeFiltersCount})
                </button>
              )}
            </div>
            <SheetDescription className="text-xs text-on-surface-variant mt-0.5">
              Refine by craft technique, recipient, price, or dispatch timeline.
            </SheetDescription>
          </SheetHeader>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 overscroll-contain">
            <ShopFilters
              searchQuery={searchQuery}
              onSearchChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              selectedProductTypes={selectedProductTypes}
              onToggleProductType={toggleProductType}
              productTypeOptions={PRODUCT_TYPE_OPTIONS}
              productsList={PRODUCTS}
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={(val) => {
                setSelectedPriceRange(val);
                setCurrentPage(1);
              }}
              selectedRecipient={selectedRecipient}
              onSelectRecipient={(val) => {
                setSelectedRecipient(val);
                setCurrentPage(1);
              }}
              recipientOptions={RECIPIENT_OPTIONS}
              selectedOccasions={selectedOccasions}
              onToggleOccasion={toggleOccasion}
              occasionOptions={OCCASION_OPTIONS}
              selectedPersonalization={selectedPersonalization}
              onSelectPersonalization={(val) => {
                setSelectedPersonalization(val);
                setCurrentPage(1);
              }}
              selectedDispatch={selectedDispatch}
              onSelectDispatch={(val) => {
                setSelectedDispatch(val);
                setCurrentPage(1);
              }}
              activeFiltersCount={activeFiltersCount}
              onResetAll={resetAllFilters}
              hideHeader={true}
            />
          </div>

          {/* Sticky Bottom Action Footer with Apply & Reset */}
          <div className="p-3 sm:p-4 border-t border-outline-variant/30 bg-surface/95 backdrop-blur-md shrink-0 flex items-center gap-2.5 z-10 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
            <Button
              onClick={resetAllFilters}
              variant="outline"
              className="flex-1 h-11 text-xs font-semibold uppercase tracking-wider border-outline-variant/50 touch-manipulation active:scale-98"
            >
              Reset All
            </Button>
            <Button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-[2] h-11 text-xs font-semibold uppercase tracking-wider bg-primary text-on-primary hover:bg-[#5f4b2d] touch-manipulation active:scale-98 shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Apply Filters</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px] font-mono">
                {filteredProducts.length}
              </span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

import { Suspense } from 'react';
export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center">Loading...</div>}>
      <ShopPageInner />
    </Suspense>
  );
}
