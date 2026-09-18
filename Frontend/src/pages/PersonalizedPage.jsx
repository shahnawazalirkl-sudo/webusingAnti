import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { PRODUCTS } from '../data/productsData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FileCheck2, Sparkles, ShieldCheck, SlidersHorizontal, RotateCcw, X, SearchX } from 'lucide-react';

const PersonalizedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [craftFilter, setCraftFilter] = useState(searchParams.get('craft') || 'all');
  const [recipientFilter, setRecipientFilter] = useState(searchParams.get('recipient') || 'all');
  const productSectionRef = useRef(null);

  useEffect(() => {
    const c = searchParams.get('craft') || 'all';
    const r = searchParams.get('recipient') || 'all';
    setCraftFilter(c);
    setRecipientFilter(r);

    // If navigated with a filter or #products anchor, directly scroll to the product section
    const hasFilterOrAnchor = c !== 'all' || r !== 'all' || location.hash === '#products';
    if (hasFilterOrAnchor && productSectionRef.current) {
      setTimeout(() => {
        if (productSectionRef.current) {
          const headerOffset = 110;
          const elementPosition = productSectionRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 60);
    }
  }, [searchParams, location.hash]);

  const filtered = PRODUCTS.filter((p) => {
    if (craftFilter !== 'all') {
      const searchSpace = `${p.craft || ''} ${p.title || ''} ${p.description || ''} ${p.categoryLabel || ''} ${p.badge || ''}`.toLowerCase();
      if (!searchSpace.includes(craftFilter.toLowerCase())) {
        return false;
      }
    }
    if (recipientFilter !== 'all') {
      const searchRecipient = `${p.recipient || ''} ${p.title || ''} ${p.categoryLabel || ''} ${p.badge || ''}`.toLowerCase();
      if (!searchRecipient.includes(recipientFilter.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="w-full bg-surface text-on-surface antialiased py-8 sm:py-10 lg:py-12">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2">
            Individual Artisanship
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface">
            Personalized Gifts
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed mt-2.5">
            Every monogram is individually rendered and debossed using real bronze metallurgy stamping dies for heirloom depth.
          </p>
        </div>

        {/* How It Works Banner */}
        <div className="bg-surface-container-low/60 rounded-2xl p-5 sm:p-8 border border-outline-variant/30 mb-10 sm:mb-12 shadow-xs">
          <div className="text-center max-w-lg mx-auto mb-7">
            <Badge variant="gold" className="uppercase tracking-[0.2em] font-semibold text-[10px] sm:text-[11px] px-3 py-1 mb-2">
              Artisan Precision Standard
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
              How Custom Personalization Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <Card className="hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center shadow-xs">
                    1
                  </span>
                  <FileCheck2 className="w-5 h-5 text-primary/70" />
                </div>
                <CardTitle className="font-serif text-base font-medium leading-snug text-on-surface">
                  Digital 3D CAD Proof
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Within 6 hours of your order, our calligraphy team sends high-resolution typography proofs via WhatsApp.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center shadow-xs">
                    2
                  </span>
                  <Sparkles className="w-5 h-5 text-primary/70" />
                </div>
                <CardTitle className="font-serif text-base font-medium leading-snug text-on-surface">
                  Solid Bronze Die Metallurgy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  We machine heavy brass plates heated to 140°C to permanently imprint your monogram into full-grain leather and velvet.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center shadow-xs">
                    3
                  </span>
                  <ShieldCheck className="w-5 h-5 text-primary/70" />
                </div>
                <CardTitle className="font-serif text-base font-medium leading-snug text-on-surface">
                  Sealed Collection Certificate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Each finished creation is hand-checked for foil crispness and sealed with hot bronze wax before insured venue dispatch.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Craft & Recipient Filters */}
        <div
          id="products"
          ref={productSectionRef}
          className="space-y-4 pb-6 mb-8 border-b border-outline-variant/30 scroll-mt-28"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Craft Pill Selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-outline mr-1 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                Craft:
              </span>
              {[
                { id: 'all', label: 'All Techniques' },
                { id: 'monogram', label: 'Monogram' },
                { id: 'velvet', label: 'Velvet & Silk' },
                { id: 'wax', label: 'Wax & Deckle' },
                { id: 'botanical', label: 'Preserved Florals' },
                { id: 'gold', label: 'Gold Foil' }
              ].map((c) => {
                const isActive = craftFilter === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCraftFilter(c.id);
                      setSearchParams((prev) => {
                        const next = new URLSearchParams(prev);
                        if (c.id === 'all') next.delete('craft');
                        else next.set('craft', c.id);
                        return next;
                      });
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-xs ring-2 ring-primary/30'
                        : 'bg-surface-container-lowest border border-outline-variant/40 text-on-surface hover:border-primary/60 hover:text-primary'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* Recipient Filter & Item Count */}
            <div className="flex items-center justify-between lg:justify-end gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-outline whitespace-nowrap">
                  Recipient:
                </span>
                <select
                  value={recipientFilter}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRecipientFilter(val);
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      if (val === 'all') next.delete('recipient');
                      else next.set('recipient', val);
                      return next;
                    });
                  }}
                  aria-label="Filter gifts by recipient"
                  className="bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-semibold text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all cursor-pointer shadow-xs"
                >
                  <option value="all">All Recipients</option>
                  <option value="bride">Bride &amp; Bridesmaids</option>
                  <option value="groom">Groom &amp; Groomsmen</option>
                  <option value="couple">Couple &amp; Anniversary</option>
                  <option value="parents">Parents of the Couple</option>
                </select>
              </div>

              <Badge variant="outline" className="text-xs font-serif font-normal py-1 px-3 hidden sm:inline-flex">
                {filtered.length} {filtered.length === 1 ? 'Design' : 'Designs'}
              </Badge>
            </div>
          </div>

          {/* Active Filter Chips & Reset */}
          {(craftFilter !== 'all' || recipientFilter !== 'all') && (
            <div className="flex items-center gap-2 flex-wrap pt-2">
              <span className="text-[11px] text-on-surface-variant font-medium">Active Filters:</span>
              {craftFilter !== 'all' && (
                <Badge
                  variant="secondary"
                  className="text-xs gap-1 pl-2.5 pr-1.5 py-1 cursor-pointer hover:bg-secondary-container/90"
                  onClick={() => {
                    setCraftFilter('all');
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      next.delete('craft');
                      return next;
                    });
                  }}
                >
                  Craft: {craftFilter}
                  <X className="w-3 h-3 text-on-secondary-container/70 hover:text-on-secondary-container" />
                </Badge>
              )}
              {recipientFilter !== 'all' && (
                <Badge
                  variant="secondary"
                  className="text-xs gap-1 pl-2.5 pr-1.5 py-1 cursor-pointer hover:bg-secondary-container/90"
                  onClick={() => {
                    setRecipientFilter('all');
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      next.delete('recipient');
                      return next;
                    });
                  }}
                >
                  Recipient: {recipientFilter}
                  <X className="w-3 h-3 text-on-secondary-container/70 hover:text-on-secondary-container" />
                </Badge>
              )}
              <button
                type="button"
                onClick={() => {
                  setCraftFilter('all');
                  setRecipientFilter('all');
                  setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    next.delete('craft');
                    next.delete('recipient');
                    return next;
                  });
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline ml-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Product Grid / Empty State */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} aspectRatio="portrait" />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto my-12 p-8 text-center border-dashed border-outline-variant/60 bg-surface-container-low/40">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-6 h-6" />
            </div>
            <CardTitle className="font-serif text-xl font-medium text-on-surface mb-2">
              No matching heirloom gifts
            </CardTitle>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              We couldn't find any personalized designs matching your selected craft technique or recipient.
            </p>
            <button
              type="button"
              onClick={() => {
                setCraftFilter('all');
                setRecipientFilter('all');
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  next.delete('craft');
                  next.delete('recipient');
                  return next;
                });
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PersonalizedPage;
