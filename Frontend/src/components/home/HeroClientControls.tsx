"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const ThreeGiftBox = dynamic(() => import('@/components/common/ThreeGiftBox'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-surface-container-low animate-pulse rounded-xl">
      <span className="text-xs text-primary font-medium tracking-wider uppercase">Loading 3D Canvas...</span>
    </div>
  ),
});

export default function HeroClientControls() {
  const [heroMode, setHeroMode] = useState<string>('photo'); // 'photo' | '3d'

  return (
    <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
      <div className="relative w-full max-w-[380px] sm:max-w-[400px]">
        {/* Ambient Glow */}
        <div className="absolute -top-8 -right-8 w-60 h-60 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none" />

        {/* View Switcher */}
        <Tabs
          value={heroMode}
          onValueChange={setHeroMode}
          className="absolute top-3 right-3 z-30"
        >
          <TabsList className="text-[10px] font-semibold">
            <TabsTrigger value="photo" className="px-2.5 py-0.5 text-[10px]">
              Photo
            </TabsTrigger>
            <TabsTrigger value="3d" className="px-2.5 py-0.5 text-[10px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">view_in_ar</span>
              3D View
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Primary Showcase Card */}
        <div className="relative bg-surface-container-lowest p-2 rounded-2xl shadow-lg overflow-hidden group border border-outline-variant/40">
          <div className="aspect-[4/5] min-h-[300px] sm:min-h-[340px] max-h-[360px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-surface-container-lowest via-surface-container-low/50 to-surface-container relative flex items-center justify-center">
            {heroMode === 'photo' ? (
              <Image
                src="/assets/cdn/img_ea7b421bfaad.png"
                alt="ASRA Wedding Canvas Luxury Gift Hamper"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full">
                <ThreeGiftBox />
              </div>
            )}
          </div>

          <div className="p-2.5 sm:p-3 flex items-center justify-between bg-surface-container-lowest relative z-20">
            <div>
              <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest font-semibold block">
                Artisan Spotlight
              </span>
              <h3 className="font-title-sm text-xs sm:text-sm text-on-surface font-semibold">
                Wedding Essentials Travel Suite
              </h3>
            </div>
            <span className="font-title-sm text-xs sm:text-sm text-primary font-bold">₹1,699</span>
          </div>
        </div>

        {/* Overlapping Certified Badge */}
        <div className="absolute -bottom-3 sm:-bottom-4 -left-2 sm:-left-4 bg-surface-container-lowest/95 backdrop-blur-md p-2 sm:p-2.5 rounded-lg shadow-md border border-outline-variant/40 flex items-center gap-2 max-w-[210px] sm:max-w-[230px] z-30">
          <div className="w-8 h-8 rounded-full bg-secondary-container/60 flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
          </div>
          <div className="flex flex-col items-start">
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-semibold tracking-wider uppercase text-primary bg-secondary-container/50 border-0">
              Studio Certified
            </Badge>
            <span className="font-body-sm text-[11px] text-on-surface font-medium leading-tight mt-0.5">
              Custom debossed with brass dies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
