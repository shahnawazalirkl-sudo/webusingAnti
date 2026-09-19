"use client";
import Image from "next/image";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SHOWCASE_ITEMS = [
  {
    id: 'udaipur-vow-trunk',
    category: 'trunks',
    title: 'The Royal Udaipur Vow Trunk',
    couple: 'For Asra & Shahnawaz',
    image: '/assets/cdn/img_eafddfa4ed3e.jpg',
    craft: 'Solid Walnut • 24k Gold Debossing',
    description: 'Hand-carved solid walnut with dual hidden brass drawers, velvet-lined ring cushions, and debossed ceremony vows in 24k leaf.',
    quote: '"It stood at our mandap altar and now rests as our family\'s most sacred heirloom."',
    prefillData: {
      category: 'wedding essentials',
      materials: ['24k_gold', 'plantation_teak', 'mulberry_silk'],
      budget: '10k-25k',
      note: 'Requesting similar design to The Royal Udaipur Vow Trunk with hand-carved wood and dual drawers'
    }
  },
  {
    id: 'jaimala-crystal-arch',
    category: 'flora',
    title: 'Preserved Jaimala Crystal Arch',
    couple: 'For Sagil & Shagufta',
    image: '/assets/cdn/img_31355173f069.jpg',
    craft: 'Resin Botanical • Optical Cast Acrylic',
    description: '3D botanical garland resin suspension encased inside diamond-polished cast acrylic with customized brass pedestal base.',
    quote: '"Our original ceremony varmala looks as vibrant as the evening we exchanged vows."',
    prefillData: {
      category: 'floral_shadowbox',
      materials: ['cast_acrylic', 'makrana_marble', 'flora'],
      budget: '5k-10k',
      note: 'Requesting floral garland preservation similar to Preserved Jaimala Crystal Arch'
    }
  },
  {
    id: 'first-dance-songwave',
    category: 'sculptures',
    title: 'Celestial First Dance Songwave',
    couple: 'For Jawed & Asra',
    image: '/assets/cdn/img_a1877a3f3271.jpg',
    craft: 'Spotify Waveform • Backlit Marble',
    description: 'Scannable Spotify audio waveform of their first dance embedded into etched optical glass with warm LED ambient backlighting.',
    quote: '"Scanning the lamp on our anniversary plays our song instantly. Pure magic."',
    prefillData: {
      category: 'audio_acrylic',
      materials: ['cast_acrylic', 'makrana_marble', '24k_gold'],
      budget: '2.5k-5k',
      note: 'Requesting First Dance Songwave sculpture with custom couple audio track'
    }
  },
  {
    id: 'leather-passport-trunk',
    category: 'leather',
    title: 'Initials Passport Trunk',
    couple: 'For Zeeshan & Shagufta',
    image: '/assets/cdn/img_23f7486a1ad8.jpg',
    craft: 'Italian Saddle Leather • Brass Die Stamped',
    description: 'Full-grain Italian saddle leather folio duo with personalized family heraldry brass die hot-stamping and boarding card slots.',
    quote: '"Carried on our honeymoon to Amalfi — effortlessly chic and eternal quality."',
    prefillData: {
      category: 'wedding essentials',
      materials: ['italian_leather', '24k_gold'],
      budget: '5k-10k',
      note: 'Requesting Initials Leather Travel Suite with custom gold debossed heraldry'
    }
  }
];

const BespokeShowcaseGallery = ({ onPrefill }) => {
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredItems = selectedTab === 'all'
    ? SHOWCASE_ITEMS
    : SHOWCASE_ITEMS.filter((item) => item.category === selectedTab);

  return (
    <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <Badge variant="gold" className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 mb-2">
            Archive of Realized Dreams
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
            Recent Bespoke Creations Realized
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
            Every commissioned piece is archived with its couple's journey and craftsmanship pedigree.
          </p>
        </div>

        {/* Tab Filters */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-auto">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="text-xs">All Pieces</TabsTrigger>
            <TabsTrigger value="trunks" className="text-xs">Wedding Trunks</TabsTrigger>
            <TabsTrigger value="flora" className="text-xs">Flora Resin</TabsTrigger>
            <TabsTrigger value="sculptures" className="text-xs">Sculptures</TabsTrigger>
            <TabsTrigger value="leather" className="text-xs">Leather</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 4 Showcase Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="group hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Media Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to stylized cover if specific asset is missing
                    e.currentTarget.src = '/assets/cdn/img_eafddfa4ed3e.jpg';
                  }} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <Badge
                  variant="gold"
                  className="absolute top-3 left-3 text-[10px] font-bold shadow-xs backdrop-blur-xs"
                >
                  {item.couple}
                </Badge>
                <span className="absolute bottom-2 left-3 right-3 text-[11px] font-mono text-white/90 truncate">
                  {item.craft}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2">
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface">
                  {item.title}
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <blockquote className="border-l-2 border-primary pl-2.5 text-[11px] italic text-outline mt-2">
                  {item.quote}
                </blockquote>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Button
                variant="outline"
                onClick={() =>
                  onPrefill(
                    item.prefillData.category,
                    item.prefillData.materials,
                    item.prefillData.budget,
                    item.prefillData.note
                  )
                }
                className="w-full text-xs uppercase tracking-wider font-semibold hover:border-primary hover:text-primary"
              >
                Request Similar Piece →
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BespokeShowcaseGallery;
