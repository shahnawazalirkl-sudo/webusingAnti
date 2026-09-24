import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/productsData';
import ShopFilterBar from '@/components/shop/ShopFilterBar';

export const metadata: Metadata = {
  title: 'Curated Wedding Keepsakes & Gifts Catalog | ASRA Wedding Canvas',
  description: 'Explore personalized wedding gifts, heirloom favors, bridal trousseau vaults, and handcrafted celebration hampers.',
  openGraph: {
    title: 'Curated Wedding Keepsakes & Gifts Catalog | ASRA Wedding Canvas',
    description: 'Explore personalized wedding gifts, heirloom favors, bridal trousseau vaults, and handcrafted celebration hampers.',
    url: 'https://asraweddingcanvas.com/shop',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function ShopPage() {
  return (
    <div className="w-full bg-surface min-h-screen text-on-surface">
      <Suspense
        fallback={
          <div className="min-h-screen bg-surface flex items-center justify-center text-xs text-outline uppercase tracking-wider">
            Loading Keepsakes Catalog...
          </div>
        }
      >
        <ShopFilterBar products={PRODUCTS} />
      </Suspense>
    </div>
  );
}
