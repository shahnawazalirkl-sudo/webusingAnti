"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AboutTabsClient() {
  return (
    <Tabs defaultValue="leather" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="bg-white/80 border border-asra-gold/30 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger
            value="leather"
            className="data-[state=active]:bg-asra-gold data-[state=active]:text-white text-xs px-4 py-2"
          >
            Tuscan Leather &amp; Teakwood
          </TabsTrigger>
          <TabsTrigger
            value="silk"
            className="data-[state=active]:bg-asra-gold data-[state=active]:text-white text-xs px-4 py-2"
          >
            Lyon Silk Velvet &amp; Zari
          </TabsTrigger>
          <TabsTrigger
            value="gold"
            className="data-[state=active]:bg-asra-gold data-[state=active]:text-white text-xs px-4 py-2"
          >
            24K Gold Leaf &amp; Brass Dies
          </TabsTrigger>
          <TabsTrigger
            value="acrylic"
            className="data-[state=active]:bg-asra-gold data-[state=active]:text-white text-xs px-4 py-2"
          >
            Optical Crystal Acrylic
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Tab 1: Leather */}
      <TabsContent value="leather">
        <Card className="bg-white border-asra-border shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="outline" className="text-[10px] text-asra-goldDark uppercase tracking-wider">
                Certified Provenance: Santa Croce sull'Arno, Italy
              </Badge>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-asra-charcoal">
                Full-Grain Vegetable-Tanned Tuscan Hide
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                Tanned naturally using chestnut bark and mimosa tannins over 40 days, our leather preserves the raw grain structure of every hide. Hand-beveled along every edge, each wedding album vault and keepsake chest develops a lustrous, golden amber patina with age.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                  <div className="text-[11px] font-bold text-asra-charcoal uppercase">Organic Wax Conditioning</div>
                  <div className="text-[10px] text-asra-muted">Resistant to humidity and temperature shifts</div>
                </div>
                <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                  <div className="text-[11px] font-bold text-asra-charcoal uppercase">Sustainably Sourced Teak</div>
                  <div className="text-[10px] text-asra-muted">Aged 50+ year plantation reclaimed timber</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-asra-sand/20 border border-asra-border p-6 text-center rounded-lg">
              <div className="font-cinzel text-xs uppercase tracking-widest text-asra-goldDark font-bold mb-1">
                Vault Longevity Standard
              </div>
              <div className="font-cormorant text-4xl font-bold text-asra-charcoal my-2">100+ Years</div>
              <p className="text-xs text-asra-muted font-light">
                Engineered for multi-generational longevity without cracking or synthetic delamination.
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>

      {/* Tab 2: Silk */}
      <TabsContent value="silk">
        <Card className="bg-white border-asra-border shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="outline" className="text-[10px] text-asra-goldDark uppercase tracking-wider">
                Certified Provenance: Lyon, France &amp; Varanasi Zari
              </Badge>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-asra-charcoal">
                Loomed French Silk Velvet &amp; Metallic Zari
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                Lined with deep French silk velvet that absorbs light to create an opulent backdrop for your keepsake jewelry, vow folios, and bridal accessories. Woven with authentic gold-dipped zari ribbons that never fray.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                  <div className="text-[11px] font-bold text-asra-charcoal uppercase">Microfiber Cushioning</div>
                  <div className="text-[10px] text-asra-muted">Prevents micro-abrasions on rings and gold jewelry</div>
                </div>
                <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                  <div className="text-[11px] font-bold text-asra-charcoal uppercase">Fray-Proof Weave</div>
                  <div className="text-[10px] text-asra-muted">Precision hand-stitched borders with silk filament</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-asra-sand/20 border border-asra-border p-6 text-center rounded-lg">
              <div className="font-cinzel text-xs uppercase tracking-widest text-asra-goldDark font-bold mb-1">
                Touch &amp; Texture Index
              </div>
              <div className="font-cormorant text-4xl font-bold text-asra-charcoal my-2">Haute Velvet</div>
              <p className="text-xs text-asra-muted font-light">
                Double-sided plush lining in Champagne, Bordeaux, and Royal Midnight Navy.
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>

      {/* Tab 3: Gold */}
      <TabsContent value="gold">
        <Card className="bg-white border-asra-border shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="outline" className="text-[10px] text-asra-goldDark uppercase tracking-wider">
                Certified Standard: 24K Dual-Layer Hot Foil Fusion
              </Badge>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-asra-charcoal">
                Solid CNC Brass Dies &amp; Pure Gold Leaf
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                Unlike superficial surface printing, our intaglio debossing uses heavy heated solid brass dies under 2.5 tons of pressure. The 24-karat gold leaf fuses permanently into the fibers of the leather and archival papers.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                  <div className="text-[11px] font-bold text-asra-charcoal uppercase">Permanent Die Vault</div>
                  <div className="text-[10px] text-asra-muted">Your custom couple die is preserved forever in our archive</div>
                </div>
                <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                  <div className="text-[11px] font-bold text-asra-charcoal uppercase">Zero Rub-Off Guarantee</div>
                  <div className="text-[10px] text-asra-muted">Thermal fusion resistant to handling and moisture</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-asra-sand/20 border border-asra-border p-6 text-center rounded-lg">
              <div className="font-cinzel text-xs uppercase tracking-widest text-asra-goldDark font-bold mb-1">
                Deboss Depth Precision
              </div>
              <div className="font-cormorant text-4xl font-bold text-asra-charcoal my-2">0.8 mm</div>
              <p className="text-xs text-asra-muted font-light">
                Tactile deep-relief intaglio that you can feel with every touch.
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>

      {/* Tab 4: Acrylic */}
      <TabsContent value="acrylic">
        <Card className="bg-white border-asra-border shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="outline" className="text-[10px] text-asra-goldDark uppercase tracking-wider">
                Optical Grade: Diamond Polished Crystal Acrylic
              </Badge>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-asra-charcoal">
                Sub-Millimeter Optical Laser Etching
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                Crafted from ultra-pure lucite with 99.4% optical clarity, diamond-faceted at 45-degree angles and illuminated with laser precision for Spotify code plaques, vow displays, and luxury wedding table numbers.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                  <div className="text-[11px] font-bold text-asra-charcoal uppercase">UV Non-Yellowing</div>
                  <div className="text-[10px] text-asra-muted">Guaranteed to remain crystal clear in sunlight</div>
                </div>
                <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                  <div className="text-[11px] font-bold text-asra-charcoal uppercase">Diamond Polished Bevel</div>
                  <div className="text-[10px] text-asra-muted">Smooth, gemstone-grade perimeter finish</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-asra-sand/20 border border-asra-border p-6 text-center rounded-lg">
              <div className="font-cinzel text-xs uppercase tracking-widest text-asra-goldDark font-bold mb-1">
                Clarity Rating
              </div>
              <div className="font-cormorant text-4xl font-bold text-asra-charcoal my-2">99.4%</div>
              <p className="text-xs text-asra-muted font-light">
                Higher optical transmission than standard float glass.
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
