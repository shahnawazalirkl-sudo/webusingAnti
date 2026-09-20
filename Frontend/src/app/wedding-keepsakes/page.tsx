"use client";
import Image from "next/image";

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useMemo, useEffect, useRef } from 'react';

import Link from 'next/link';
import { PRODUCTS } from '@/data/productsData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Heart,
  Eye,
  Edit,
  SlidersHorizontal,
  Search,
  X,
  Filter,
  Palette,
  Award,
  Zap,
  Star,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Package,
  Headphones,
  ArrowRight,
  PackageSearch,
} from 'lucide-react';

import WeddingCustomizerDialog from '@/components/wedding/WeddingCustomizerDialog';
import WeddingQuickViewDialog from '@/components/wedding/WeddingQuickViewDialog';
import WeddingSidebarFilters, { PRICE_RANGES } from '@/components/wedding/WeddingSidebarFilters';

// Quick Sub-category Filter Tabs
const SUB_CATEGORIES = [
  { id: 'all', label: 'All Wedding Suites' },
  { id: 'bridal-groom', label: 'Bridal & Groom Gifts' },
  { id: 'vow-books', label: 'Vow Books & Stationery' },
  { id: 'trousseau-vaults', label: 'Wedding Essentials & Ring Vaults' },
  { id: 'wedding-favors', label: 'Wedding Favors & Bulk' },
  { id: 'preserved-varmala', label: 'Preserved Varmala Art' },
  { id: 'milestone-keepsakes', label: 'Milestone Gifts' },
];

// Curated 12 flagship masterpiece priority order
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
  'luxury-wedding essentials-trunk',
  'botanical-candle-favors',
  'marble-brass-platter',
];

const FALLBACK_IMAGE = '/assets/cdn/img_11a57511dc47.jpg';

interface WishlistContextType {
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (product: unknown) => void;
}

const WeddingKeepsakesPageInner = () => {
  const { addToCart } = useCart() as NonNullable<ReturnType<typeof useCart>>;
  const { isInWishlist, toggleWishlist } = useWishlist() as unknown as WishlistContextType;
  const searchParams = useSearchParams();
const setSearchParams = (params: any) => {};
  const location = usePathname();
  const productsSectionRef = useRef(null);

  // Active sub-category filter tab
  const [activeTab, setActiveTab] = useState(searchParams?.get('tab') || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sidebar Filters State
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedCeremonies, setSelectedCeremonies] = useState<string[]>([]);
  const [selectedCrafts, setSelectedCrafts] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sorting & Pagination
  const [sortBy, setSortBy] = useState('bestseller');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Dialog States
  const [customizingProduct, setCustomizingProduct] = useState<Record<string, unknown> | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Record<string, unknown> | null>(null);

  // Sync with URL params & scroll anchor
  useEffect(() => {
    const tab = searchParams?.get('tab') || 'all';
    setActiveTab(tab);
    setCurrentPage(1);

    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const hasTabOrAnchor = (tab && tab !== 'all') || hash === '#products';
    if (hasTabOrAnchor && productsSectionRef.current) {
      setTimeout(() => {
        if (productsSectionRef.current) {
          const headerOffset = 120;
          const elementPosition = (productsSectionRef.current as HTMLElement).getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 70);
    }
  }, [searchParams, location]);

  // Toggle helpers for multi-select
  const toggleRecipient = (value: string) => {
    setSelectedRecipients((prev: string[]) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const toggleCeremony = (value: string) => {
    setSelectedCeremonies((prev: string[]) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const toggleCraft = (value: string) => {
    setSelectedCrafts((prev: string[]) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

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
    const newParams = new URLSearchParams(searchParams?.toString() || '');
    newParams.delete('tab');
    setSearchParams(newParams);
  };

  // Active filter count calculation
  const activeFilterCount =
    (activeTab !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    selectedRecipients.length +
    selectedCeremonies.length +
    selectedCrafts.length +
    (selectedTimeline !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search keyword
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

      // 2. Tab category filter
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
        } else if (activeTab === 'trousseau-vaults' || activeTab === 'wedding essentials-vaults') {
          const match =
            product.subCategory === 'trousseau-vaults' ||
            product.subCategory === 'wedding essentials-vaults' ||
            product.category === 'velvet-boxes' ||
            product.category === 'wedding essentials-suites' ||
            product.id === 'velvet-ring-vault' ||
            product.id === 'luxury-wedding essentials-trunk';
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
        } else if (activeTab === 'milestone-keepsakes' || activeTab === 'milestone-gifts') {
          const match =
            product.subCategory === 'milestone-gifts' ||
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

      // 3. Recipient filter
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

      // 4. Ceremony filter
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
              prodCeremony.includes('Wedding Essentials')
            );
          }
          if (c === 'Reception & Honeymoon') {
            return prodCeremony.includes('Reception') || prodCeremony.includes('Honeymoon');
          }
          return prodCeremony.includes(c);
        });
        if (!matches) return false;
      }

      // 5. Craft filter
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
          if (craft === 'Initials Raw Silk & Velvet') {
            return (
              prodCraft.includes('Silk') ||
              prodCraft.includes('Velvet') ||
              prodCraft.includes('Initials') ||
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

      // 6. Timeline filter
      if (selectedTimeline !== 'all') {
        const prodTimeline = product.timeline || '';
        if (selectedTimeline === 'Priority Express (48h)') {
          if (!prodTimeline.includes('48h') && !prodTimeline.includes('24-Hour')) return false;
        } else if (selectedTimeline === 'Standard Collection (4-7 Days)') {
          if (!prodTimeline.includes('4-7') && !prodTimeline.includes('2–3 Days')) return false;
        } else if (selectedTimeline === 'Customized Bridal Suite (10+ Days)') {
          if (!prodTimeline.includes('10+')) return false;
        }
      }

      // 7. Price budget filter
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

  // Sort products
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

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const handleConfirmCustomization = ({
    product,
    brideName,
    groomName,
    weddingDate,
    crestStyle,
    price,
    quantity,
    edition,
  }) => {
    addToCart(product, {
      brideName,
      groomName,
      weddingDate,
      crestStyle,
      price,
      quantity,
      edition,
    });
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* Top Ambient Glow & Hero Banner */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-gradient-to-b from-primary-fixed/25 via-secondary-container/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-outline mb-4"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/collections" className="hover:text-primary transition-colors">
              Wedding Collection
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Luxury Gifts &amp; Bridal Suites</span>
          </nav>

          {/* Editorial Banner */}
          <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden mb-8 border border-outline-variant/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2">
                  The Collection Wedding Suite
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-3">
                  Customized Wedding Gifts &amp; Bridal Luxuries
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Celebrate timeless unions with handcrafted vow books, personalized bridal hampers, initials wedding essentials boxes, and heirloom gifts crafted to cherish forever.
                </p>
              </div>

              {/* Key Metrics Badges */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 mt-4 lg:mt-0">
                <div className="bg-surface-container-low px-4 py-2.5 rounded-xl flex items-center gap-2.5 border border-outline-variant/30 shadow-xs">
                  <Palette className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface leading-tight font-bold font-serif">
                      140+
                    </span>
                    <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Wedding Creations
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low px-4 py-2.5 rounded-xl flex items-center gap-2.5 border border-outline-variant/30 shadow-xs">
                  <Award className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface leading-tight font-bold font-serif">
                      100%
                    </span>
                    <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Handcrafted Quality
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low px-4 py-2.5 rounded-xl flex items-center gap-2.5 border border-outline-variant/30 shadow-xs">
                  <Zap className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface leading-tight font-bold font-serif">
                      48H
                    </span>
                    <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Priority Shipping
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-category Filter Tabs */}
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
                      const newParams = new URLSearchParams(searchParams?.toString() || '');
                      if (tab.id === 'all') {
                        newParams.delete('tab');
                      } else {
                        newParams.set('tab', tab.id);
                      }
                      setSearchParams(newParams);
                    }}
                    className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-300 font-semibold cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
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

      {/* Main Content: Sidebar + Products Showcase */}
      <section id="products" ref={productsSectionRef} className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 sm:pb-16 scroll-mt-32">
        {/* Mobile Filter Button & Search Bar */}
        <div className="lg:hidden mb-4 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setMobileFilterOpen(true)}
              className="flex-1 font-semibold text-xs h-10 gap-2 shadow-xs bg-surface-container-low"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Refine Wedding Craft {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </Button>
            {activeFilterCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs text-primary font-bold uppercase tracking-wider"
              >
                Reset All
              </Button>
            )}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search wedding gifts, vow books, hampers..."
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

        {/* Active Filter Chips Bar */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-xs shadow-2xs">
            <span className="font-semibold text-on-surface-variant mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-primary" />
              Active Filters:
            </span>
            {searchQuery.trim() && (
              <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-0 font-medium">
                <span>Keyword: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label="Remove search keyword"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {activeTab !== 'all' && (
              <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-0 font-medium">
                <span>Tab: {SUB_CATEGORIES.find((t) => t.id === activeTab)?.label}</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label="Remove tab filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedRecipients.map((r) => (
              <Badge key={r} variant="secondary" className="gap-1 bg-secondary-container/50 text-on-secondary-container border-0 font-medium">
                <span>{r}</span>
                <button
                  type="button"
                  onClick={() => toggleRecipient(r)}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label={`Remove recipient ${r}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {selectedCeremonies.map((c) => (
              <Badge key={c} variant="secondary" className="gap-1 bg-surface-container text-on-surface border-0 font-medium">
                <span>{c}</span>
                <button
                  type="button"
                  onClick={() => toggleCeremony(c)}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label={`Remove ceremony ${c}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {selectedCrafts.map((craft) => (
              <Badge key={craft} variant="secondary" className="gap-1 bg-surface-container text-on-surface border-0 font-medium">
                <span>{craft}</span>
                <button
                  type="button"
                  onClick={() => toggleCraft(craft)}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label={`Remove craft ${craft}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {selectedTimeline !== 'all' && (
              <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-0 font-medium">
                <span>{selectedTimeline}</span>
                <button
                  type="button"
                  onClick={() => setSelectedTimeline('all')}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label="Remove timeline filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedPriceRange !== 'all' && (
              <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-0 font-medium">
                <span>{PRICE_RANGES.find((p) => p.id === selectedPriceRange)?.label}</span>
                <button
                  type="button"
                  onClick={() => setSelectedPriceRange('all')}
                  className="hover:text-error ml-1 font-bold cursor-pointer"
                  aria-label="Remove price filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={handleResetFilters}
              className="text-xs text-primary font-bold ml-auto h-auto p-0"
            >
              Clear All
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Subcomponent: Filter Sidebar (Desktop) & Sheet Drawer (Mobile) */}
          <WeddingSidebarFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedRecipients={selectedRecipients}
            toggleRecipient={toggleRecipient}
            selectedCeremonies={selectedCeremonies}
            toggleCeremony={toggleCeremony}
            selectedCrafts={selectedCrafts}
            toggleCraft={toggleCraft}
            selectedTimeline={selectedTimeline}
            setSelectedTimeline={setSelectedTimeline}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            handleResetFilters={handleResetFilters}
            mobileOpen={mobileFilterOpen}
            setMobileOpen={setMobileFilterOpen}
            totalResults={sortedProducts.length}
          />

          {/* Products Grid Column */}
          <main className="lg:col-span-9 flex flex-col gap-6">
            {/* Sorting Bar */}
            <div className="bg-surface-container-lowest px-4 py-3 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xs border border-outline-variant/30">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-on-surface font-semibold font-sans">
                  Showing {paginatedProducts.length} of {sortedProducts.length} Curated Masterpieces
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-xs text-primary uppercase tracking-widest font-semibold">
                  Handmade On-Order
                </span>
              </div>
              <div className="flex items-center gap-2 min-w-[220px]">
                <span className="text-xs text-outline uppercase tracking-wider font-semibold whitespace-nowrap">
                  Sort by:
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-8 text-xs font-semibold">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bestseller" className="text-xs">Curated Bridal Bestsellers</SelectItem>
                    <SelectItem value="price-low" className="text-xs">Price: Low to High</SelectItem>
                    <SelectItem value="price-high" className="text-xs">Price: High to Low</SelectItem>
                    <SelectItem value="rating" className="text-xs">Highest Customer Rating</SelectItem>
                    <SelectItem value="express" className="text-xs">Express Delivery First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {paginatedProducts.map((product) => {
                  const isWishlisted = isInWishlist(product.id);
                  const discountPercent = product.originalPrice
                    ? Math.round(
                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                      )
                    : null;

                  return (
                    <Card
                      key={product.id}
                      className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col group shadow-xs hover:shadow-md transition-all duration-300 relative border-outline-variant/30"
                    >
                      {/* Media container */}
                      <div className="relative w-full aspect-square overflow-hidden bg-surface-container-low">
                        <Link
                          href={`/product/${product.slug || product.id}`}
                          className="block w-full h-full cursor-pointer relative"
                        >
                          <Image
                            alt={product.title}
                            src={product.image || FALLBACK_IMAGE}
                                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    (e.target as HTMLImageElement).onerror = null;
                                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                                  }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy" fill sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </Link>

                        {/* Top-Left Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                          {product.badge && (
                            <Badge className="bg-[#FAF4EB] text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider shadow-xs">
                              {product.badge}
                            </Badge>
                          )}
                          {product.secondaryBadge && (
                            <Badge className="bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider border-0 shadow-xs">
                              {product.secondaryBadge}
                            </Badge>
                          )}
                        </div>

                        {/* Top-Right Wishlist Heart */}
                        <button
                          type="button"
                          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-outline-variant/30 flex items-center justify-center text-on-surface hover:text-rose-600 transition-colors shadow-xs z-10 cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-outline hover:text-rose-600'
                            }`}
                          />
                        </button>

                        {/* Quick View Hover Action */}
                        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 px-4">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => setQuickViewProduct(product)}
                            className="w-full py-1.5 px-3 bg-surface-container-lowest/90 backdrop-blur-sm hover:bg-surface-container-lowest text-on-surface text-[11px] font-semibold uppercase tracking-wider rounded-lg shadow-xs flex items-center justify-center gap-1.5 border border-outline-variant/40 cursor-pointer h-8"
                          >
                            <Eye className="w-3.5 h-3.5 text-primary" />
                            <span>Quick Photo Preview</span>
                          </Button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <CardContent className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                        <div className="flex flex-col">
                          {/* Rating & Reviews */}
                          <div className="flex items-center gap-1 text-[#C5A880] mb-1.5">
                            <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                            <span className="text-xs text-on-surface font-semibold font-sans">
                              {product.rating || 4.9}
                            </span>
                            <span className="text-[11px] text-outline font-sans">
                              ({product.reviewCount || 72} reviews)
                            </span>
                          </div>

                          {/* Title */}
                          <Link href={`/product/${product.slug || product.id}`}>
                            <h2 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                              {product.title}
                            </h2>
                          </Link>

                          {/* Short Description */}
                          <p className="text-xs text-on-surface-variant line-clamp-2 mt-1.5 leading-relaxed font-sans">
                            {product.shortDescription}
                          </p>
                        </div>

                        {/* Price & CTA Section */}
                        <div className="flex flex-col gap-3 pt-3 border-t border-outline-variant/20">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-lg font-normal text-on-surface">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-outline line-through font-sans">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                            {discountPercent && (
                              <span className="text-xs text-emerald-700 font-semibold font-sans">
                                {discountPercent}% OFF
                              </span>
                            )}
                          </div>

                          {/* Customize For Wedding CTA */}
                          <Button
                            type="button"
                            onClick={() => setCustomizingProduct(product)}
                            className="w-full bg-primary hover:bg-[#5f4b2d] text-on-primary text-xs font-semibold uppercase tracking-wider shadow-xs gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Customize For Wedding</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="bg-surface-container-lowest p-12 rounded-xl text-center border border-outline-variant/30 flex flex-col items-center">
                <PackageSearch className="w-12 h-12 text-outline mb-2" />
                <h3 className="font-serif text-lg text-on-surface font-medium">
                  No Wedding Gifts Found
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto font-sans leading-relaxed">
                  We could not find items matching your active combination of filters. Try clearing some selections to explore our full collection.
                </p>
                <Button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 bg-primary hover:bg-[#5f4b2d] text-on-primary text-xs font-semibold uppercase tracking-wider shadow-xs"
                >
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
            {sortedProducts.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-outline-variant/20">
                <span className="text-xs text-on-surface-variant font-sans">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, sortedProducts.length)} to{' '}
                  {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} customized wedding creations
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'bg-primary text-on-primary font-bold shadow-xs'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="h-9 text-xs font-semibold uppercase tracking-wider gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Specialist Wedding Services Privileges */}
      <section className="w-full bg-surface-container-low py-8 sm:py-10 lg:py-12 border-t border-outline-variant/20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2 font-sans">
              Specialist Wedding Services
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
              Curated Wedding Collection Privileges
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
              From personalized custom initials to complete destination wedding favor suites, let our master craftsmen bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {/* Privilege 1 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs flex flex-col justify-between group hover:shadow-md transition-all duration-300 p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2 group-hover:text-primary transition-colors">
                  Complimentary Bridal Initials
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  Every couple receives a customized digital and wax-stamp wedding initials crafted by our resident calligrapher on orders exceeding ₹5,000.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  href="/bespoke"
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>Claim Initials Consult</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Privilege 2 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs flex flex-col justify-between group hover:shadow-md transition-all duration-300 p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xs">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2 group-hover:text-primary transition-colors">
                  Bulk Favors &amp; Gifting Support
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  Planning Mehendi or destination wedding welcome hampers? Enjoy tiered bridal party discounts, custom wax packaging, and direct venue shipping.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  href="/bulk-orders"
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>View Bulk Privilege Tiers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Privilege 3 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs flex flex-col justify-between group hover:shadow-md transition-all duration-300 p-6 border border-outline-variant/30">
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xs">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2 group-hover:text-primary transition-colors">
                  Archival Varmala Floral Preservation
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  Ship your sacred ceremony varmalas and bouquets to our master lab in Hyderabad. We freeze dry and encase them forever in crystal UV resin frames.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4">
                <Link
                  href="/bespoke"
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>Book Flower Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Trust Banners */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <Sparkles className="w-7 h-7 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              100% Customized Craft
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal font-sans">
              Individualized couple names, dates &amp; vows
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <ShieldCheck className="w-7 h-7 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Insured Global Courier
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal font-sans">
              Zero damage guarantee across 140+ cities
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <Package className="w-7 h-7 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Wax-Sealed Luxury Box
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal font-sans">
              Unboxing worthy of wedding celebrations
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <Headphones className="w-7 h-7 text-primary mb-2" />
            <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Collection Privilege Desk
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-normal font-sans">
              Dedicated bridal coordinator via WhatsApp
            </p>
          </div>
        </div>
      </section>

      {/* Subcomponent: Customizer Dialog */}
      <WeddingCustomizerDialog
        product={customizingProduct}
        open={Boolean(customizingProduct)}
        onOpenChange={(isOpen) => !isOpen && setCustomizingProduct(null)}
        onConfirmCustomization={handleConfirmCustomization}
      />

      {/* Subcomponent: Quick View Dialog */}
      <WeddingQuickViewDialog
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onOpenChange={(isOpen) => !isOpen && setQuickViewProduct(null)}
        onOpenCustomizer={(prod) => setCustomizingProduct(prod)}
      />
    </div>
  );
};

import { Suspense } from 'react';
export default function WeddingKeepsakesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center">Loading...</div>}>
      <WeddingKeepsakesPageInner />
    </Suspense>
  );
}
