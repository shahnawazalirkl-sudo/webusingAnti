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

const ShopControlBar = ({
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
    <section className="sticky top-[148px] z-30 w-full bg-surface/90 backdrop-blur-md shadow-xs border-y border-outline-variant/30 mb-8">
      <TooltipProvider delayDuration={150}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Filter Indicators & Item Count */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Mobile Filter Drawer Trigger */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onOpenMobileFilters}
                  variant="outline"
                  size="sm"
                  className="lg:hidden flex items-center gap-1.5 h-8 text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Refine Filters</p>
              </TooltipContent>
            </Tooltip>

            <span className="font-body-sm text-xs text-on-surface-variant">
              Showing <strong className="text-on-surface font-semibold">{displayCount}</strong> of{' '}
              <strong className="text-on-surface font-semibold">{filteredCount}</strong> items
            </span>

            {/* Active Dismissible Filter Badges */}
            {activeFiltersCount > 0 && (
              <div className="hidden xl:flex items-center gap-1.5 flex-wrap">
                {selectedPill !== 'all' && (
                  <Badge variant="outline" className="gap-1 text-[11px] py-0.5 px-2">
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
                  <Badge variant="outline" className="gap-1 text-[11px] py-0.5 px-2">
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
                  <Badge variant="outline" className="gap-1 text-[11px] py-0.5 px-2">
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
                  <Badge key={catId} variant="outline" className="gap-1 text-[11px] py-0.5 px-2">
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
                  <Badge variant="outline" className="gap-1 text-[11px] py-0.5 px-2">
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

                <button
                  onClick={onResetAll}
                  type="button"
                  className="text-[11px] text-primary hover:underline ml-1 font-semibold cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Right: Grid switcher & Sort Select */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Grid Switcher */}
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

            {/* shadcn Select for Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-outline uppercase tracking-wider hidden sm:inline font-medium">
                Sort:
              </span>
              <div className="w-48">
                <Select value={sortBy} onValueChange={onSortChange}>
                  <SelectTrigger className="h-8 text-xs bg-surface-container-lowest font-medium">
                    <SelectValue placeholder="Sort products" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </section>
  );
};

export default ShopControlBar;
