import React from 'react';
import { Badge } from '@/components/ui/badge';

export const CATEGORY_PILLS = [
  { id: 'all', label: 'All Products' },
  { id: 'keepsakes', label: 'Personalized Gifts', filterCat: ['photo-frames', 'acrylic-plaques', 'wooden-keepsakes'] },
  { id: 'favors-trousseau', label: 'Wedding Favors & Essentials', filterCat: ['wedding-favors', 'trousseau-suites', 'vow-books'] },
  { id: 'for-her', label: 'Gifts For Her', recipient: 'For Her', aliases: ['bride'] },
  { id: 'for-him', label: 'Gifts For Him', recipient: 'For Him', aliases: ['groom'] },
  { id: 'couple', label: 'Anniversary & Couple', recipient: 'Couple', aliases: ['bride & groom'] },
  { id: 'hampers', label: 'Luxury Hampers', filterCat: ['hampers', 'bridal-hampers'] },
];

const ShopHeader = ({ selectedPill, onSelectPill, pillCounts }) => {
  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 sm:p-8 shadow-xs border border-outline-variant/30">
        {/* Ambient Glow Accent */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
            <span className="material-symbols-outlined text-[16px]">draw</span>
            <span>Curated Gift Archives</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface tracking-tight leading-[1.18] font-normal">
            The Collection Catalog
          </h1>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Thoughtfully personalized keepsakes, customized wedding essentials, and timeless gift favors handcrafted for
            life's most unforgettable moments. Each piece debossed, engraved, or hand-finished in our workshops.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="relative z-10 mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_PILLS.map((pill) => {
            const isSelected = selectedPill === pill.id;
            const count = pillCounts[pill.id] ?? 0;
            return (
              <button
                key={pill.id}
                onClick={() => onSelectPill(pill.id)}
                type="button"
                aria-pressed={isSelected}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-sans text-xs whitespace-nowrap transition-all shadow-xs cursor-pointer select-none ${
                  isSelected
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-outline-variant/40'
                }`}
              >
                <span>{pill.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopHeader;
