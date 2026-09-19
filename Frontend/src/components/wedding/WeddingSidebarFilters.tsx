import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { SlidersHorizontal, Search, X, Zap, MessageSquare, Headphones } from 'lucide-react';

export const RECIPIENTS = [
  { id: 'For Bride & Groom', label: 'For Bride & Groom' },
  { id: 'Bridal Party & Bridesmaids', label: 'Bridal Party & Bridesmaids' },
  { id: 'Groomsmen & Best Man', label: 'Groomsmen & Best Man' },
  { id: 'Parents of the Couple', label: 'Parents of the Couple' },
  { id: 'Wedding Guests & Favors', label: 'Wedding Guests & Favors' },
];

export const CEREMONIES = [
  'Proposal & Engagement',
  'Haldi & Mehendi',
  'Sangeet & Cocktail Favors',
  'Wedding Day Ceremony',
  'Reception & Honeymoon',
];

export const CRAFTS = [
  'Gilded Wax Seal & Deckle Edge',
  'Hand-Polished Brass & Timber',
  'Initials Raw Silk & Velvet',
  'Scannable Audio Acrylic',
  'Preserved Botanical Resin',
];

export const TIMELINES = [
  { id: 'Priority Express (48h)', label: 'Priority Express (48h)', hasIcon: true },
  { id: 'Standard Collection (4-7 Days)', label: 'Standard Collection (4-7 Days)' },
  { id: 'Customized Bridal Suite (10+ Days)', label: 'Customized Bridal Suite (10+ Days)' },
];

export const PRICE_RANGES = [
  { id: 'under-1500', label: 'Under ₹1,500' },
  { id: '1500-3500', label: '₹1,500 - ₹3,500' },
  { id: '3500-7000', label: '₹3,500 - ₹7,000' },
  { id: 'above-7000', label: '₹7,000 & Above' },
];

const FilterContent = ({
  searchQuery,
  setSearchQuery,
  selectedRecipients,
  toggleRecipient,
  selectedCeremonies,
  toggleCeremony,
  selectedCrafts,
  toggleCraft,
  selectedTimeline,
  setSelectedTimeline,
  selectedPriceRange,
  setSelectedPriceRange,
  handleResetFilters,
  onCloseMobile,
  isMobile = false,
  totalResults = 0,
}) => {
  return (
    <div className="flex flex-col gap-4 text-xs">
      {/* Top Refine Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span className="font-sans text-xs text-on-surface uppercase tracking-wider font-bold">
            Refine Wedding Craft
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetFilters}
          className="text-xs text-primary hover:text-on-surface uppercase tracking-widest font-semibold h-7 px-2"
        >
          Reset
        </Button>
      </div>

      {/* Keyword Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-outline absolute left-2.5 top-1/2 -translate-y-1/2" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Keyword search..."
          className="w-full bg-surface-container-low pl-8 pr-7 py-1.5 h-8 text-xs text-on-surface"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Accordion Filter Sections */}
      <Accordion
        type="multiple"
        defaultValue={['recipient', 'ceremony', 'craft', 'timeline', 'price']}
        className="space-y-2"
      >
        {/* Recipient Filter */}
        <AccordionItem value="recipient" className="border-outline-variant/30">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Wedding Recipient
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-1 pb-2">
            {RECIPIENTS.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`recip-${item.id}`}
                  checked={selectedRecipients.includes(item.id)}
                  onCheckedChange={() => toggleRecipient(item.id)}
                />
                <Label
                  htmlFor={`recip-${item.id}`}
                  className="text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-normal"
                >
                  {item.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Ceremony Filter */}
        <AccordionItem value="ceremony" className="border-outline-variant/30">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Ceremony &amp; Milestone
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-1 pb-2">
            {CEREMONIES.map((ceremony) => (
              <div key={ceremony} className="flex items-center space-x-2">
                <Checkbox
                  id={`ceremony-${ceremony}`}
                  checked={selectedCeremonies.includes(ceremony)}
                  onCheckedChange={() => toggleCeremony(ceremony)}
                />
                <Label
                  htmlFor={`ceremony-${ceremony}`}
                  className="text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-normal"
                >
                  {ceremony}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Craft & Finish */}
        <AccordionItem value="craft" className="border-outline-variant/30">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Craft &amp; Finish
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-1 pb-2">
            {CRAFTS.map((craft) => (
              <div key={craft} className="flex items-center space-x-2">
                <Checkbox
                  id={`craft-${craft}`}
                  checked={selectedCrafts.includes(craft)}
                  onCheckedChange={() => toggleCraft(craft)}
                />
                <Label
                  htmlFor={`craft-${craft}`}
                  className="text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-normal"
                >
                  {craft}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Timeline */}
        <AccordionItem value="timeline" className="border-outline-variant/30">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Timeline Window
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1.5 pt-1 pb-2">
            {TIMELINES.map((t) => {
              const isSelected = selectedTimeline === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTimeline(isSelected ? 'all' : t.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors text-left ${
                    isSelected
                      ? 'bg-surface-container text-primary font-bold border border-primary/30'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-medium'
                  }`}
                >
                  <span>{t.label}</span>
                  {t.hasIcon && <Zap className="w-3.5 h-3.5 text-primary" />}
                </button>
              );
            })}
          </AccordionContent>
        </AccordionItem>

        {/* Price Budget */}
        <AccordionItem value="price" className="border-outline-variant/30">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider py-2 hover:no-underline">
            Price Budget
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2">
            <div className="grid grid-cols-2 gap-1.5">
              {PRICE_RANGES.map((p) => {
                const isSelected = selectedPriceRange === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPriceRange(isSelected ? 'all' : p.id)}
                    className={`px-2 py-1.5 rounded-lg text-[11px] transition-colors text-center cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-medium'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Support WhatsApp Callout Card */}
      <div className="bg-gradient-to-br from-[#1C1B1B] to-[#2E2B28] text-surface-container-lowest rounded-xl flex flex-col gap-2 relative overflow-hidden mt-1 p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Headphones className="w-4 h-4 text-primary-fixed" />
          <span className="text-xs text-primary-fixed font-bold tracking-wider uppercase font-sans">
            Wedding Support
          </span>
        </div>
        <p className="text-[11px] text-surface-container-highest/85 leading-relaxed">
          Need custom bridal suite favors for 50+ guests? Connect with our dedicated wedding curator.
        </p>
        <a
          className="mt-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 shadow-xs"
          href="https://wa.me/919692668263?text=Hello%20ASRA%20Wedding%20Canvas,%20I%20would%20like%20to%20consult%20with%20a%20wedding%20stylist%20for%20bridal%20keepsakes."
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Talk to Wedding Stylist</span>
        </a>
      </div>

      {isMobile && (
        <Button
          type="button"
          onClick={onCloseMobile}
          className="mt-2 w-full bg-primary hover:bg-[#5f4b2d] text-on-primary text-xs font-semibold uppercase tracking-wider shadow-xs"
        >
          Apply Filters ({totalResults} Results)
        </Button>
      )}
    </div>
  );
};

const WeddingSidebarFilters = ({
  searchQuery,
  setSearchQuery,
  selectedRecipients,
  toggleRecipient,
  selectedCeremonies,
  toggleCeremony,
  selectedCrafts,
  toggleCraft,
  selectedTimeline,
  setSelectedTimeline,
  selectedPriceRange,
  setSelectedPriceRange,
  handleResetFilters,
  mobileOpen,
  setMobileOpen,
  totalResults,
}) => {
  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6">
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-xs flex flex-col gap-4 border border-outline-variant/30 sticky top-[160px]">
          <FilterContent
            onCloseMobile={() => {}}
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
            totalResults={totalResults}
          />
        </div>
      </aside>

      {/* Mobile Slide-In Sheet Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-full max-w-sm overflow-y-auto p-5">
          <SheetHeader className="pb-2 text-left">
            <SheetTitle className="text-base font-serif font-semibold text-on-surface">
              Refine Wedding Craft
            </SheetTitle>
          </SheetHeader>
          <div className="py-2">
            <FilterContent
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
              onCloseMobile={() => setMobileOpen(false)}
              isMobile={true}
              totalResults={totalResults}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default WeddingSidebarFilters;
