"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const MonogramPreviewStudio = () => {
  const [partner1, setPartner1] = useState('Aarav');
  const [partner2, setPartner2] = useState('Ananya');
  const [selectedDate, setSelectedDate] = useState(() => new Date(2025, 11, 24));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [foilStyle, setFoilStyle] = useState('gold'); // 'gold' | 'rose' | 'silver'
  const [itemType, setItemType] = useState('passport'); // 'passport' | 'acrylic' | 'ringbox'

  const initials = `${(partner1[0] || 'A').toUpperCase()} & ${(partner2[0] || 'A').toUpperCase()}`;
  const fullNameStr = `${partner1 || 'Partner 1'} & ${partner2 || 'Partner 2'}`;
  const formattedWeddingDate = selectedDate ? format(selectedDate, 'dd.MM.yyyy') : '24.12.2025';

  const foilStyles = {
    gold: {
      textClass: 'text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f7e49a] to-[#aa8010]',
      shadow: 'drop-shadow-[0_2px_4px_rgba(170,128,16,0.35)]',
      border: 'border-[#d4af37]/40',
      label: '24K Royal Gold Leaf'
    },
    rose: {
      textClass: 'text-transparent bg-clip-text bg-gradient-to-r from-[#f4b3b3] via-[#fce4e4] to-[#c77d7d]',
      shadow: 'drop-shadow-[0_2px_4px_rgba(199,125,125,0.35)]',
      border: 'border-[#f4b3b3]/40',
      label: 'Rose Gold Shimmer'
    },
    silver: {
      textClass: 'text-transparent bg-clip-text bg-gradient-to-r from-[#e0e0e0] via-[#ffffff] to-[#9e9e9e]',
      shadow: 'drop-shadow-[0_2px_4px_rgba(158,158,158,0.35)]',
      border: 'border-[#e0e0e0]/40',
      label: 'Sterling Silver Foil'
    }
  };

  const activeFoil = foilStyles[foilStyle] || foilStyles.gold;

  return (
    <section className="w-full max-w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface relative overflow-hidden border-t border-outline-variant/30">
      <div className="max-w-[1360px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
          
          {/* Left Controls Column */}
          <div className="lg:col-span-6 flex flex-col w-full max-w-full">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-secondary-container/60 text-on-secondary-container rounded-full font-label-sm text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold mb-2 w-fit">
              <span className="material-symbols-outlined text-[13px] text-primary">auto_fix_high</span>
              <span>Interactive Monogram Studio</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal mb-2 leading-tight">
              Preview Your Wedding Initials <span className="italic text-primary">Live</span>
            </h2>

            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed font-normal">
              Type your names and wedding date below to visualize your customized gold debossing die before our artisans hand-stamp your heirlooms.
            </p>

            <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/50 shadow-xs space-y-3">
              {/* Partner Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="partner1">First Name (Bride / Groom)</Label>
                  <Input
                    id="partner1"
                    type="text"
                    maxLength={14}
                    value={partner1}
                    onChange={(e) => setPartner1(e.target.value)}
                    placeholder="Aarav"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="partner2">Second Name (Bride / Groom)</Label>
                  <Input
                    id="partner2"
                    type="text"
                    maxLength={14}
                    value={partner2}
                    onChange={(e) => setPartner2(e.target.value)}
                    placeholder="Ananya"
                  />
                </div>
              </div>

              {/* Date Picker & Foil Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Ceremony / Milestone Date</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          'flex h-10 w-full items-center justify-between rounded-lg border border-outline-variant/60 bg-surface-container-low px-3.5 py-2 text-sm text-on-surface transition-all hover:bg-surface-container hover:border-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-body-sm text-left',
                          !selectedDate && 'text-outline/50'
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                          <span className="font-medium text-xs sm:text-sm">
                            {formattedWeddingDate}
                          </span>
                        </span>
                        <span className="text-[10px] text-outline uppercase font-mono tracking-wider">
                          {selectedDate ? format(selectedDate, 'MMM yyyy') : 'Pick Date'}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border border-outline-variant/50 shadow-luxury" align="start">
                      <Calendar
                        className=""
                        classNames={{}}
                        mode="single"
                        selected={selectedDate as Date}
                        onSelect={(date: unknown) => {
                          if (date) {
                            setSelectedDate(date as Date);
                            setIsCalendarOpen(false);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-1.5">
                  <Label>Metallic Foil Finish</Label>
                  <ToggleGroup
                    type="single"
                    value={foilStyle}
                    onValueChange={(val: unknown) => {
                      if (val) setFoilStyle(val as string);
                    }}
                    variant="outline"
                    className="grid grid-cols-3 gap-2 w-full"
                  >
                    {[
                      { id: 'gold', bg: 'bg-[#d4af37]', label: 'Gold' },
                      { id: 'rose', bg: 'bg-[#e0a899]', label: 'Rose' },
                      { id: 'silver', bg: 'bg-[#c0c0c0]', label: 'Silver' },
                    ].map((f) => (
                      <ToggleGroupItem
                        key={f.id}
                        value={f.id}
                        className="h-10 w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold data-[state=on]:border-primary data-[state=on]:bg-primary-container/30 data-[state=on]:text-on-surface data-[state=on]:ring-1 data-[state=on]:ring-primary"
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${f.bg} inline-block shrink-0 shadow-xs`} />
                        <span>{f.label}</span>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>

              {/* Item Type Switcher */}
              <div className="space-y-1.5">
                <Label>Preview On Heirloom Piece</Label>
                <ToggleGroup
                  type="single"
                  value={itemType}
                  onValueChange={(val: unknown) => {
                    if (val) setItemType(val as string);
                  }}
                  variant="solid"
                  className="grid grid-cols-3 gap-2 w-full"
                >
                  {[
                    { id: 'passport', label: 'Leather Suite', icon: 'flight_takeoff' },
                    { id: 'acrylic', label: 'Acoustic Plaque', icon: 'lightbulb' },
                    { id: 'ringbox', label: 'Velvet Ring Vault', icon: 'inventory_2' },
                  ].map((item) => (
                    <ToggleGroupItem
                      key={item.id}
                      value={item.id}
                      className="h-10 w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-on-primary data-[state=on]:shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[15px] shrink-0">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-body-sm text-[11px] sm:text-[12px] text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                  Free physical brass proof on approval
                </span>
                <Link
                  href="/bespoke"
                  className="text-primary font-label-md text-xs font-semibold hover:underline flex items-center gap-1 w-fit"
                >
                  <span>Start Custom Order</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Live Canvas Simulation - Sleek & Mobile Optimized Height */}
          <div className="lg:col-span-6 flex items-center justify-center w-full max-w-full overflow-hidden mt-2 lg:mt-0">
            <div className="relative w-full max-w-[380px] h-[280px] sm:h-[340px] md:h-[360px] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/40 flex flex-col justify-between p-3.5 sm:p-5 text-center select-none transition-all duration-700">
              
              {/* Item Backdrop & Textures */}
              {itemType === 'passport' && (
                <div className="absolute inset-0 bg-[#2b1810] bg-[radial-gradient(#4a2b1c_1px,transparent_1px)] [background-size:14px_14px]">
                  <div className="absolute inset-x-4 top-4 bottom-4 border-2 border-dashed border-[#d4af37]/25 rounded-xl pointer-events-none"></div>
                </div>
              )}

              {itemType === 'acrylic' && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#1e1b4b]">
                  <div className="absolute -top-10 inset-x-0 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none"></div>
                  <div className="absolute bottom-0 inset-x-6 h-8 bg-[#c5a880]/30 rounded-t-lg blur-xs"></div>
                </div>
              )}

              {itemType === 'ringbox' && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#4a0e2e] via-[#33081e] to-[#1e0512]">
                  <div className="absolute inset-3 rounded-xl border border-[#d4af37]/30"></div>
                </div>
              )}

              {/* Top Studio Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-black/40 backdrop-blur-md rounded-full text-[9px] font-label-sm tracking-widest text-[#f5ebd7] uppercase border border-white/10">
                  {itemType === 'passport' ? 'Full-Grain Leather' : itemType === 'acrylic' ? 'Optic Acrylic Plaque' : 'Velvet Ring Vault'}
                </span>
                <span className="text-[9px] font-mono text-[#f5ebd7]/80 tracking-wider">
                  ASRA • STUDIO
                </span>
              </div>

              {/* Center Monogram Dynamic Stamping */}
              <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center">
                <div className="w-8 h-8 mb-1.5 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                </div>

                <div className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-1 ${activeFoil.textClass} ${activeFoil.shadow}`}>
                  {initials}
                </div>

                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent my-1"></div>

                <div className="font-serif text-xs sm:text-sm text-[#faf8f5] tracking-widest uppercase font-light">
                  {fullNameStr}
                </div>

                <div className="font-mono text-[10px] text-[#c5a880] tracking-[0.25em] uppercase mt-1">
                  {formattedWeddingDate}
                </div>
              </div>

              {/* Bottom Specs Pill */}
              <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10 flex items-center justify-between text-left">
                <div>
                  <span className="font-label-sm text-[8px] text-[#c5a880] uppercase tracking-wider block">Applied Die Technique</span>
                  <span className="font-body-sm text-[10px] text-[#faf8f5] font-medium">{activeFoil.label}</span>
                </div>
                <Link
                  href={`/shop?search=${encodeURIComponent(itemType === 'passport' ? 'leather travel set' : itemType === 'acrylic' ? 'acrylic song plaque' : 'velvet jewelry box')}`}
                  className="px-2.5 py-1 bg-[#c5a880] text-black font-label-sm text-[9px] font-bold tracking-wider uppercase rounded hover:bg-white transition-colors"
                >
                  Order This
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MonogramPreviewStudio;
