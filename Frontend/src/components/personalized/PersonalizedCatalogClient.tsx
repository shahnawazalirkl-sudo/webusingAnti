"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/common/ProductCard';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, RotateCcw, X, SearchX } from 'lucide-react';

interface PersonalizedCatalogClientProps {
  products: any[];
}

export default function PersonalizedCatalogClient({ products }: PersonalizedCatalogClientProps) {
  const searchParams = useSearchParams();
  const location = usePathname();
  const [craftFilter, setCraftFilter] = useState(searchParams?.get('craft') || 'all');
  const [recipientFilter, setRecipientFilter] = useState(searchParams?.get('recipient') || 'all');
  const productSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = searchParams?.get('craft') || 'all';
    const r = searchParams?.get('recipient') || 'all';
    setCraftFilter(c);
    setRecipientFilter(r);

    // If navigated with a filter or #products anchor, directly scroll to the product section
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const hasFilterOrAnchor = c !== 'all' || r !== 'all' || hash === '#products';
    if (hasFilterOrAnchor && productSectionRef.current) {
      setTimeout(() => {
        if (productSectionRef.current) {
          const headerOffset = 110;
          const elementPosition = productSectionRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 60);
    }
  }, [searchParams, location]);

  const filtered = products.filter((p) => {
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
            { id: 'gold', label: 'Gold Foil' },
          ].map((c) => {
            const isActive = craftFilter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCraftFilter(c.id);
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
            }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline ml-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid / Empty State */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 pt-4">
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
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </Card>
      )}
    </div>
  );
}
