import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CartViewClient from '@/components/cart/CartViewClient';

export const metadata: Metadata = {
  title: 'Collection Shopping Cart & Customizations | ASRA Wedding Canvas',
  description: 'Review your curated wedding essentials, customize 3D debossed crests, and proceed to white-glove delivery.',
  openGraph: {
    title: 'Collection Shopping Cart & Customizations | ASRA Wedding Canvas',
    description: 'Review your curated wedding essentials, customize 3D debossed crests, and proceed to white-glove delivery.',
    url: 'https://asraweddingcanvas.com/cart',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function CartPage() {
  return (
    <div className="bg-surface min-h-screen py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Main Cart Container */}
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Top Minimal Brand Bar & Trust Badges (Server Rendered) */}
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-outline-variant/30">
          <Link
            href="/shop"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors group font-sans"
          >
            <span className="material-symbols-outlined text-[16px] mr-1.5 transform group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span>Return to Shop Catalog</span>
          </Link>

          {/* Minimal Subtle Logo Mark for Trust */}
          <div className="flex items-center gap-3">
            <Link href="/" className="relative w-28 sm:w-32 h-9 sm:h-10 block">
              <Image
                src="/assets/cdn/img_6f8c141ac172.png"
                alt="ASRA Wedding Canvas"
                className="object-contain hover:opacity-90 transition-opacity"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
            <div className="hidden sm:block text-left border-l border-outline-variant/30 pl-3">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary font-sans">Cart</div>
              <div className="text-[11px] text-on-surface-variant font-medium font-sans">Customized Checkout</div>
            </div>
          </div>

          {/* Secure Trust Indicator */}
          <div className="flex items-center text-xs text-on-surface-variant font-medium font-sans">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-2 animate-pulse" />
            <span className="hidden md:inline">256-Bit Encrypted &amp; Insured Delivery</span>
            <span className="md:hidden">Secure Cart</span>
          </div>
        </header>

        {/* Client Interactive Cart Flow */}
        <CartViewClient />
      </div>
    </div>
  );
}
