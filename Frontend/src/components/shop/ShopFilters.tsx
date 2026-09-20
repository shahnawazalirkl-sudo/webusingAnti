import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ShopFilters = ({
  searchQuery,
  onSearchChange,
  selectedProductTypes,
  onToggleProductType,
  productTypeOptions,
  productsList,
  selectedPriceRange,
  onSelectPriceRange,
  selectedRecipient,
  onSelectRecipient,
  recipientOptions,
  selectedOccasions,
  onToggleOccasion,
  occasionOptions,
  selectedPersonalization,
  onSelectPersonalization,
  selectedDispatch,
  onSelectDispatch,
  activeFiltersCount,
  onResetAll,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
        <div className="flex items-center gap-1.5 text-on-surface">
          <span className="material-symbols-outlined text-[20px] text-primary">filter_vintage</span>
          <span className="font-serif text-base font-semibold tracking-wide">Refine Collection</span>
        </div>
        {activeFiltersCount > 0 && (
          <Button
            onClick={onResetAll}
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-[11px] text-primary uppercase tracking-wider font-bold hover:bg-transparent hover:underline"
          >
            Reset
          </Button>
        )}
      </div>

      {/* Keyword Search */}
      <div>
        <label className="block text-[11px] uppercase font-bold text-outline tracking-wider mb-2 font-sans">
          Keyword Search
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none z-10">
            search
          </span>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search gifts, plaques..."
            className="pl-8 text-xs h-9"
          />
        </div>
      </div>

      {/* Filter Accordion */}
      <Accordion type="multiple" defaultValue={['types', 'price', 'recipient']} className="flex flex-col gap-2">
        {/* 1. Product Types Multi-select */}
        <AccordionItem value="types">
          <AccordionTrigger className="py-2.5 px-1 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Product Types
              </span>
              {selectedProductTypes.length > 0 && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary font-bold">
                  {selectedProductTypes.length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="flex flex-col gap-2.5">
              {productTypeOptions.map((type) => {
                const isChecked = selectedProductTypes.includes(type.category);
                const count = productsList.filter((p) => p.category === type.category).length;
                return (
                  <div
                    key={type.id}
                    className="flex items-center justify-between group select-none py-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => onToggleProductType(type.category)}
                        id={`type-${type.id}`}
                      />
                      <label htmlFor={`type-${type.id}`} className="font-body-sm text-xs text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        {type.label}
                      </label>
                    </div>
                    <span className="font-label-sm text-[11px] text-outline">{count}</span>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2. Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-2.5 px-1 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Price Range
              </span>
              {selectedPriceRange !== 'all' && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary font-bold">
                  1
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'under-1000', label: 'Under ₹1,000' },
                { id: '1000-2500', label: '₹1K – ₹2.5K' },
                { id: '2500-5000', label: '₹2.5K – ₹5K' },
                { id: 'above-5000', label: '₹5,000+' },
              ].map((range) => {
                const isActive = selectedPriceRange === range.id;
                return (
                  <button
                    key={range.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onSelectPriceRange(isActive ? 'all' : range.id)}
                    className={`px-2 py-1.5 rounded-lg text-center text-xs transition-colors font-medium cursor-pointer ${
                      isActive
                        ? 'bg-secondary-container text-on-secondary-container font-bold border border-secondary/30'
                        : 'bg-surface-container-low hover:bg-secondary-container/40 text-on-surface'
                    }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3. Recipient */}
        <AccordionItem value="recipient">
          <AccordionTrigger className="py-2.5 px-1 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Gift Recipient
              </span>
              {selectedRecipient !== 'all' && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary font-bold">
                  1
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="flex flex-wrap gap-1.5">
              {recipientOptions.map((rec) => {
                const isSelected = selectedRecipient === rec;
                return (
                  <button
                    key={rec}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectRecipient(isSelected ? 'all' : rec)}
                    className={`px-2.5 py-1 rounded-full text-xs font-label-sm transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary font-semibold shadow-xs'
                        : 'bg-surface-container-low text-on-surface hover:bg-primary-fixed'
                    }`}
                  >
                    {rec}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. Occasion */}
        <AccordionItem value="occasion">
          <AccordionTrigger className="py-2.5 px-1 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Occasion
              </span>
              {selectedOccasions.length > 0 && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary font-bold">
                  {selectedOccasions.length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="flex flex-col gap-2.5">
              {occasionOptions.map((occ) => {
                const isChecked = selectedOccasions.includes(occ);
                return (
                  <div
                    key={occ}
                    className="flex items-center gap-2 group select-none py-0.5"
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => onToggleOccasion(occ)}
                      id={`occ-${occ}`}
                    />
                    <label htmlFor={`occ-${occ}`} className="font-body-sm text-xs text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                      {occ}
                    </label>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5. Personalization Mode */}
        <AccordionItem value="personalization">
          <AccordionTrigger className="py-2.5 px-1 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Personalization
              </span>
              {selectedPersonalization !== 'all' && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary font-bold">
                  1
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <Select value={selectedPersonalization} onValueChange={onSelectPersonalization}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="All Craft Techniques" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Craft Techniques</SelectItem>
                <SelectItem value="engraved">Precision Laser Engraved</SelectItem>
                <SelectItem value="debossed">Gold Foil Stamping / Debossed</SelectItem>
                <SelectItem value="photo">HD Archival Photo Print</SelectItem>
                <SelectItem value="audio">Scannable Audio / Spotify Wave</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* 6. Shipping Window */}
        <AccordionItem value="shipping">
          <AccordionTrigger className="py-2.5 px-1 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                Shipping Window
              </span>
              {selectedDispatch !== 'all' && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary font-bold">
                  1
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <RadioGroup value={selectedDispatch} onValueChange={onSelectDispatch} className="gap-2.5">
              {[
                { value: 'all', label: 'All Timelines' },
                { value: '24h', label: '⚡ Express 24-Hour Shipping' },
                { value: 'standard', label: 'Standard Artisanal (2–3 Days)' },
                { value: 'customized', label: 'Customized Initials (5–7 Days)' },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2 cursor-pointer py-0.5">
                  <RadioGroupItem value={opt.value} id={`shipping-${opt.value}`} />
                  <label htmlFor={`shipping-${opt.value}`} className="text-xs text-on-surface cursor-pointer select-none">
                    {opt.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Support Direct Advisory Box */}
      <div className="bg-primary-container/20 p-4 rounded-xl flex items-start gap-3 border border-primary/20 mt-1">
        <span className="material-symbols-outlined text-primary text-[22px] shrink-0">support_agent</span>
        <div className="flex flex-col">
          <h4 className="font-serif text-sm text-on-surface font-semibold">Customized Support</h4>
          <p className="font-body-sm text-[11px] text-on-surface-variant mt-1 leading-snug">
            Need assistance with bulk wedding favors, wedding essentials design, or urgent timelines?
          </p>
          <a
            href="https://wa.me/919692668263?text=Hello%20ASRA%20Team,%20I%20need%20assistance%20with%20custom%20wedding%20gifting"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-primary hover:text-secondary font-bold uppercase tracking-wider mt-2 flex items-center gap-1"
          >
            Connect on WhatsApp <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;
