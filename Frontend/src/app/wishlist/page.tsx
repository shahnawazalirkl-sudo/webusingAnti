import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import WishlistViewClient from '@/components/wishlist/WishlistViewClient';

export const metadata: Metadata = {
  title: 'Saved Gifts & Ceremony Registry Wishlist | ASRA Wedding Canvas',
  description: 'Curate and manage your saved wedding keepsakes, monogrammed heirlooms, and gift registry for your ceremony.',
  openGraph: {
    title: 'Saved Gifts & Ceremony Registry Wishlist | ASRA Wedding Canvas',
    description: 'Curate and manage your saved wedding keepsakes, monogrammed heirlooms, and gift registry for your ceremony.',
    url: 'https://asraweddingcanvas.com/wishlist',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface selection:bg-primary/20 selection:text-on-surface font-sans antialiased">
      
      {/* TOP MINIMAL COLLECTION UTILITY BAR (Server Rendered) */}
      <header className="w-full bg-surface border-b border-outline-variant/30 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Return Link */}
          <Link 
            href="/collections" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors font-medium group"
          >
            <span className="material-symbols-outlined w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary">arrow_back</span>
            <span className="hidden sm:inline">Return to Collections</span>
            <span className="sm:hidden">Collections</span>
          </Link>

          {/* Centered Official ASRA Logo */}
          <Link href="/" className="flex flex-col items-center relative">
            <div className="relative w-32 h-10 block">
              <Image 
                src="/assets/cdn/img_0e64e51cb5ac.png" 
                alt="ASRA Wedding Canvas Logo" 
                className="object-contain drop-shadow-sm hover:opacity-95 transition-opacity" 
                fill 
                loading="lazy" 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <span className="hidden font-serif text-xl tracking-[0.2em] font-semibold text-on-surface">
              ASRA <span className="font-light italic text-primary">Canvas</span>
            </span>
          </Link>

          {/* Trust Badges & Sharing Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs tracking-wider">
            <div className="hidden md:flex items-center gap-2 bg-white/80 border border-outline-variant/30 px-3 py-1.5 rounded-full text-on-surface font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[11px] uppercase text-on-surface-variant">Customized Vault Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant bg-white/60 sm:bg-transparent px-2.5 sm:px-0 py-1 sm:py-0 rounded-full border sm:border-0 border-outline-variant/30">
              <span className="material-symbols-outlined w-3.5 h-3.5 text-primary">lock</span>
              <span className="text-[11px] uppercase tracking-wider">Private Registry</span>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN WISHLIST CONTENT */}
      <main className="flex-grow max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16">
        
        {/* PAGE TITLE & CEREMONY BANNER (Server Rendered) */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Curated Ceremony Registry & Gifts</span>
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface mb-3">
            Saved Gifts & <span className="italic font-light">Wedding Essentials Wishlist</span>
          </h1>
          <p className="text-xs sm:text-base text-on-surface-variant leading-relaxed font-light max-w-2xl mx-auto px-2">
            Your hand-selected ceremonial heirlooms, custom brass initials dies, and bridal gifts securely vaulted for <span className="text-on-surface font-medium">Asra & Shahnawaz’s Wedding Registry</span>.
          </p>
        </div>

        {/* Client Interactive Wishlist & Filter Controls */}
        <WishlistViewClient />

      </main>

      {/* MINIMAL CONFIDENTIALITY & LEGAL BAR (Server Rendered) */}
      <footer className="w-full bg-surface border-t border-outline-variant/30 py-4 mt-8">
        <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-on-surface-variant gap-3">
          <div className="flex items-center gap-2 font-medium text-center sm:text-left">
            <span className="text-on-surface uppercase tracking-wider">ASRA Wedding Canvas</span>
            <span>•</span>
            <span>Private Bridal Registry & Heirloom Vaults</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            <Link href="/privacy-policy" className="hover:text-on-surface transition hover:underline">
              Registry Privacy Protocol
            </Link>
            <span>•</span>
            <Link href="/bespoke" className="hover:text-on-surface transition hover:underline">
              Customized Initials Guarantee
            </Link>
            <span>•</span>
            <span className="text-on-surface">© 2026 ASRA Private Limited</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
