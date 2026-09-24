import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import BespokeConsultationClient from '@/components/bespoke/BespokeConsultationClient';

export const metadata: Metadata = {
  title: 'Bespoke Commission Studio & Custom Monograms | ASRA Wedding Canvas',
  description: 'Turn your wedding dreams into reality with our bespoke bridal commissions, custom wax seals, hand-carved brass dies, and heirloom vaults.',
  openGraph: {
    title: 'Bespoke Commission Studio & Custom Monograms | ASRA Wedding Canvas',
    description: 'Turn your wedding dreams into reality with our bespoke bridal commissions, custom wax seals, hand-carved brass dies, and heirloom vaults.',
    url: 'https://asraweddingcanvas.com/bespoke',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function BespokePage() {
  return (
    <div className="w-full bg-surface min-h-screen text-on-surface">
      {/* Breadcrumb Navigation (Server Rendered) */}
      <nav className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-[11px] uppercase tracking-widest text-on-surface-variant w-full" data-purpose="breadcrumbs">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li className="text-primary/50">/</li>
          <li>
            <Link href="/collections" className="hover:text-primary transition-colors">Atelier</Link>
          </li>
          <li className="text-primary/50">/</li>
          <li className="text-on-surface font-semibold">Bespoke Commission Studio</li>
        </ol>
      </nav>

      {/* 1. Hero Header (Server Rendered) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pb-8 border-b border-outline-variant/30">
          <div className="max-w-2xl">
            <Badge variant="gold" className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 mb-2.5">
              Customized Commission Studio
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight text-on-surface mb-3">
              Your Idea → We Create
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Turn your visionary wedding dreams, bespoke gift concepts, or one-of-a-kind couple heirloom ideas into
              masterfully handcrafted reality. From initial 3D sketch to wax-sealed delivery.
            </p>
          </div>

          {/* Hero Metrics Bar */}
          <div className="flex items-center gap-3 sm:gap-4 bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/30 shadow-xs shrink-0 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-3 px-3 py-1 border-r border-outline-variant/30">
              <span className="font-serif text-2xl font-bold text-primary">500+</span>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant leading-tight">
                Customized Concepts<br />
                <span className="font-semibold text-on-surface">Realized</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-1 border-r border-outline-variant/30">
              <span className="font-serif text-2xl font-bold text-primary">1-on-1</span>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant leading-tight">
                Master Artisan<br />
                <span className="font-semibold text-on-surface">Collaboration</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-1">
              <span className="font-serif text-2xl font-bold text-primary">48h</span>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant leading-tight">
                3D Digital Mockup<br />
                <span className="font-semibold text-on-surface">Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works Timeline (Server Rendered) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <Badge variant="gold" className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 mb-2">
            Collection Craft Journey
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
            How Your Idea Becomes Reality
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            Our transparent four-step artisan process guarantees peerless attention to detail.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            {
              step: '01',
              title: 'Share Your Vision',
              desc: 'Upload reference moodboards, Pinterest sketches, photos, or describe your concept in our studio configuration form.'
            },
            {
              step: '02',
              title: 'Digital Render & Samples',
              desc: 'Receive a photorealistic 3D render, custom font styles, and physical material swatches like teakwood, leather, or silk.'
            },
            {
              step: '03',
              title: 'Artisanal Handcrafting',
              desc: 'Master calligraphers, laser engravers, and leather crafters bring the piece to life in our state-of-the-art atelier.'
            },
            {
              step: '04',
              title: 'Wax-Sealed Delivery',
              desc: 'Insured white-glove packaging with complimentary wax seal unboxing delivered straight to your doorstep or venue.'
            }
          ].map((item) => (
            <Card
              key={item.step}
              className="hover:shadow-md hover:border-primary/40 transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container-low border border-primary text-primary flex items-center justify-center font-serif font-bold text-sm mb-4">
                {item.step}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Client Interactive Bespoke Consultation Form & Showcase */}
      <BespokeConsultationClient />

      {/* 7. Brand Trust Guarantees Bar (Server Rendered) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-6 px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">100% Customized Craft</h4>
              <p className="text-[11px] text-on-surface-variant">Custom dies &amp; real gold leaf</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">Insured Global Courier</h4>
              <p className="text-[11px] text-on-surface-variant">Doorstep delivery protection</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">featured_seasonal_and_gifts</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">Wax-Sealed Luxury Box</h4>
              <p className="text-[11px] text-on-surface-variant">Complimentary presentation</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">Privilege Concierge</h4>
              <p className="text-[11px] text-on-surface-variant">Personal bridal stylist 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
