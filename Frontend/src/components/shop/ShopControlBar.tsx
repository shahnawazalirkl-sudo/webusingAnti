import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORY_PILLS } from './ShopHeader';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Edits' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Customer Rated' },
  { value: 'newest', label: 'Newest Arrivals' },
];

interface ShopControlBarProps {
  totalItems: number;
  filteredCount: number;
  displayCount: number;
  activeFiltersCount: number;
  selectedPill: string;
  onResetPill: () => void;
  selectedPriceRange: string;
  onResetPrice: () => void;
  selectedRecipient: string;
  onResetRecipient: () => void;
  selectedProductTypes: string[];
  onToggleProductType: (cat: string) => void;
  productTypeOptions: Array<{ id: string; label: string; category: string }>;
  searchQuery: string;
  onClearSearch: () => void;
  onResetAll: () => void;
  gridCols: number;
  onGridColsChange: (cols: number) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
  onOpenMobileFilters: () => void;
}

const ShopControlBar: React.FC<ShopControlBarProps> = ({
  totalItems,
  filteredCount,
  displayCount,
  activeFiltersCount,
  selectedPill,
  onResetPill,
  selectedPriceRange,
  onResetPrice,
  selectedRecipient,
  onResetRecipient,
  selectedProductTypes,
  onToggleProductType,
  productTypeOptions,
  searchQuery,
  onClearSearch,
  onResetAll,
  gridCols,
  onGridColsChange,
  sortBy,
  onSortChange,
  onOpenMobileFilters,
}) => {
  return (
    <section className="sticky top-[78px] md:top-[118px] lg:top-[132px] z-30 w-full bg-surface/95 backdrop-blur-md shadow-xs border-y border-outline-variant/30 mb-6 sm:mb-8">
      <TooltipProvider delayDuration={150}>
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex flex-col gap-2">
          {/* Main Control Bar Row: Compact & One-touch on Mobile */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
            {/* Left: Filter Trigger & Count */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Mobile Filter Drawer Trigger */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onOpenMobileFilters}
                    variant="outline"
                    size="sm"
                    className="lg:hidden flex items-center gap-1.5 h-9 px-3 text-xs font-semibold rounded-lg bg-surface-container-low hover:bg-surface-container border-outline-variant/50 text-on-surface touch-manipulation active:scale-95"
                    aria-label={`Open Filters (${activeFiltersCount} active)`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                    <span>Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Refine Filters</p>
                </TooltipContent>
              </Tooltip>

              {/* Live Count Indicator */}
              <span className="font-body-sm text-[11px] sm:text-xs text-on-surface-variant truncate">
                <span className="hidden xs:inline">Showing </span>
                <strong className="text-on-surface font-semibold">{displayCount}</strong>
                <span className="text-outline-variant">/</span>
                <strong className="text-on-surface font-semibold">{filteredCount}</strong>
                <span className="hidden sm:inline"> items</span>
              </span>
            </div>

            {/* Middle: Active Badges on Desktop */}
            <div className="hidden xl:flex items-center gap-1.5 flex-1 flex-wrap px-2 overflow-hidden">
              {selectedPill !== 'all' && (
                <Badge variant="outline" className="gap-1 text-[11px] py-0.5 px-2 bg-surface-container-lowest">
                  {CATEGORY_PILLS.find((p) => p.id === selectedPill)?.label}
                  <button
                    onClick={onResetPill}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label="Remove category filter"
                  >
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </Badge>
              )}

              {selectedPriceRange !== 'all' && (
                <Badge variant="outline" className="gap-1 text-[11px] py-0.5 px-2 bg-surface-container-lowest">
                  {selectedPriceRange === 'under-1000' && 'Under ₹1,000'}
                  {selectedPriceRange === '1000-2500' && '₹1,000 - ₹2,500'}
                  {selectedPriceRange === '2500-5000' && '₹2,500 - ₹5,000'}
                  {selectedPriceRange === 'above-5000' && 'Above ₹5,000'}
                  <button
                    onClick={onResetPrice}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label="Remove price filter"
                  >
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </Badge>
              )}

              {selectedRecipient !== 'all' && (
                <Badge variant="outline" className="gap-1 text-[11px] py-0.5 px-2 bg-surface-container-lowest">
                  {selectedRecipient}
                  <button
                    onClick={onResetRecipient}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label="Remove recipient filter"
                  >
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </Badge>
              )}

              {selectedProductTypes.map((catId) => (
                <Badge key={catId} variant="outline" className="gap-1 text-[11px] py-0.5 px-2 bg-surface-container-lowest">
                  {productTypeOptions.find((p) => p.category === catId)?.label || catId}
                  <button
                    onClick={() => onToggleProductType(catId)}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label={`Remove ${catId} filter`}
                  >
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </Badge>
              ))}

              {searchQuery.trim() && (
                <Badge variant="outline" className="gap-1 text-[11px] py-0.5 px-2 bg-surface-container-lowest">
                  "{searchQuery}"
                  <button
                    onClick={onClearSearch}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label="Clear keyword search"
                  >
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </Badge>
              )}

              {activeFiltersCount > 0 && (
                <button
                  onClick={onResetAll}
                  type="button"
                  className="text-[11px] text-primary hover:underline ml-1 font-semibold cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Right: Grid Switcher & Sort Select */}
            <div className="flex items-center justify-end gap-2 shrink-0">
              {/* Grid Switcher (Desktop) */}
              <ToggleGroup
                type="single"
                value={String(gridCols)}
                onValueChange={(val) => {
                  if (val) onGridColsChange(Number(val));
                }}
                className="hidden lg:flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/40 gap-0.5"
                aria-label="Grid layout switcher"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value="3"
                      aria-label="3 Columns"
                      className="p-1.5 h-auto w-auto rounded border-0 bg-transparent text-outline hover:text-primary data-[state=on]:bg-surface-container-lowest data-[state=on]:text-primary data-[state=on]:shadow-xs transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">grid_view</span>
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>3 Columns</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value="4"
                      aria-label="4 Columns"
                      className="p-1.5 h-auto w-auto rounded border-0 bg-transparent text-outline hover:text-primary data-[state=on]:bg-surface-container-lowest data-[state=on]:text-primary data-[state=on]:shadow-xs transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">view_comfy_alt</span>
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>4 Columns</p>
                  </TooltipContent>
                </Tooltip>
              </ToggleGroup>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-outline uppercase tracking-wider hidden sm:inline font-medium">
                  Sort:
                </span>
                <div className="w-32 xs:w-36 sm:w-44">
                  <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger className="h-9 text-xs bg-surface-container-lowest font-medium touch-manipulation">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {SORT_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Active Filter Badges Strip (Scrollable) */}
          {activeFiltersCount > 0 && (
            <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 -mx-1 px-1 touch-pan-x border-t border-outline-variant/20 pt-1.5">
              <span className="text-[10px] uppercase font-bold text-outline tracking-wider shrink-0 mr-1">
                Active ({activeFiltersCount}):
              </span>

              {selectedPill !== 'all' && (
                <Badge variant="outline" className="shrink-0 gap-1 text-[10px] py-0.5 px-2 bg-surface-container-lowest">
                  {CATEGORY_PILLS.find((p) => p.id === selectedPill)?.label}
                  <button
                    onClick={onResetPill}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label="Remove category filter"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </Badge>
              )}

              {selectedPriceRange !== 'all' && (
                <Badge variant="outline" className="shrink-0 gap-1 text-[10px] py-0.5 px-2 bg-surface-container-lowest">
                  {selectedPriceRange === 'under-1000' && '< ₹1k'}
                  {selectedPriceRange === '1000-2500' && '₹1k–2.5k'}
                  {selectedPriceRange === '2500-5000' && '₹2.5k–5k'}
                  {selectedPriceRange === 'above-5000' && '> ₹5k'}
                  <button
                    onClick={onResetPrice}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label="Remove price filter"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </Badge>
              )}

              {selectedRecipient !== 'all' && (
                <Badge variant="outline" className="shrink-0 gap-1 text-[10px] py-0.5 px-2 bg-surface-container-lowest">
                  {selectedRecipient}
                  <button
                    onClick={onResetRecipient}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label="Remove recipient filter"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </Badge>
              )}

              {selectedProductTypes.map((catId) => (
                <Badge key={catId} variant="outline" className="shrink-0 gap-1 text-[10px] py-0.5 px-2 bg-surface-container-lowest">
                  {productTypeOptions.find((p) => p.category === catId)?.label || catId}
                  <button
                    onClick={() => onToggleProductType(catId)}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label={`Remove ${catId} filter`}
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </Badge>
              ))}

              {searchQuery.trim() && (
                <Badge variant="outline" className="shrink-0 gap-1 text-[10px] py-0.5 px-2 bg-surface-container-lowest">
                  "{searchQuery}"
                  <button
                    onClick={onClearSearch}
                    className="hover:text-rose-600 ml-0.5 inline-flex items-center cursor-pointer"
                    aria-label="Clear keyword search"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </Badge>
              )}

              <button
                onClick={onResetAll}
                type="button"
                className="shrink-0 text-[10px] text-primary hover:underline ml-1 font-bold uppercase tracking-wider cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </TooltipProvider>
    </section>
  );
};

export default ShopControlBar;
