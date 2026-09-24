import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/productsData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileCheck2, Sparkles, ShieldCheck } from 'lucide-react';
import PersonalizedCatalogClient from '@/components/personalized/PersonalizedCatalogClient';

export const metadata: Metadata = {
  title: 'Personalized Wedding Gifts & Custom Monograms | ASRA Wedding Canvas',
  description: 'Every monogram is individually rendered and debossed using real bronze metallurgy stamping dies for heirloom depth. Explore custom personalized wedding gifts.',
  openGraph: {
    title: 'Personalized Wedding Gifts & Custom Monograms | ASRA Wedding Canvas',
    description: 'Every monogram is individually rendered and debossed using real bronze metallurgy stamping dies for heirloom depth. Explore custom personalized wedding gifts.',
    url: 'https://asraweddingcanvas.com/personalized',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function PersonalizedPage() {
  return (
    <div className="w-full bg-surface text-on-surface antialiased py-8 sm:py-10 lg:py-12">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2">
            Individual Artisanship
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface">
            Personalized Gifts
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed mt-2.5">
            Every monogram is individually rendered and debossed using real bronze metallurgy stamping dies for heirloom depth.
          </p>
        </div>

        {/* How It Works Banner */}
        <div className="bg-surface-container-low/60 rounded-2xl p-5 sm:p-8 border border-outline-variant/30 mb-10 sm:mb-12 shadow-xs">
          <div className="text-center max-w-lg mx-auto mb-7">
            <Badge variant="gold" className="uppercase tracking-[0.2em] font-semibold text-[10px] sm:text-[11px] px-3 py-1 mb-2">
              Artisan Precision Standard
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
              How Custom Personalization Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <Card className="hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center shadow-xs">
                    1
                  </span>
                  <FileCheck2 className="w-5 h-5 text-primary/70" />
                </div>
                <CardTitle className="font-serif text-base font-medium leading-snug text-on-surface">
                  Digital 3D CAD Proof
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Within 6 hours of your order, our calligraphy team sends high-resolution typography proofs via WhatsApp.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center shadow-xs">
                    2
                  </span>
                  <Sparkles className="w-5 h-5 text-primary/70" />
                </div>
                <CardTitle className="font-serif text-base font-medium leading-snug text-on-surface">
                  Solid Bronze Die Metallurgy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  We machine heavy brass plates heated to 140°C to permanently imprint your monogram into full-grain leather and velvet.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center shadow-xs">
                    3
                  </span>
                  <ShieldCheck className="w-5 h-5 text-primary/70" />
                </div>
                <CardTitle className="font-serif text-base font-medium leading-snug text-on-surface">
                  Sealed Collection Certificate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Each finished creation is hand-checked for foil crispness and sealed with hot bronze wax before insured venue shipping.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Catalog Section with Client Filtering */}
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs text-outline uppercase tracking-wider">Loading Personalized Catalog...</div>}>
          <PersonalizedCatalogClient products={PRODUCTS} />
        </Suspense>
      </div>
    </div>
  );
}
