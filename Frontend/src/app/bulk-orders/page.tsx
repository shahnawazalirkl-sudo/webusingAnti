import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BulkOrderFormClient from '@/components/bulk/BulkOrderFormClient';

export const metadata: Metadata = {
  title: 'Bulk Wedding Favors & Corporate Gifting | ASRA Wedding Canvas',
  description: 'Tiered volume privileges, bespoke gift boxes, and custom debossed wedding favors for 25+ guests and destination celebrations.',
  openGraph: {
    title: 'Bulk Wedding Favors & Corporate Gifting | ASRA Wedding Canvas',
    description: 'Tiered volume privileges, bespoke gift boxes, and custom debossed wedding favors for 25+ guests and destination celebrations.',
    url: 'https://asraweddingcanvas.com/bulk-orders',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function BulkOrdersPage() {
  return (
    <div className="w-full bg-surface text-on-surface flex flex-col antialiased">
      {/* Server-Rendered Breadcrumbs Navigation */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 pb-2 text-[11px] uppercase tracking-widest text-asra-muted w-full" data-purpose="breadcrumbs">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li className="text-primary/50">/</li>
          <li>
            <Link href="/collections" className="hover:text-primary transition-colors">Collections</Link>
          </li>
          <li className="text-primary/50">/</li>
          <li className="text-on-surface font-semibold">Bulk Favors &amp; Destination Suites</li>
        </ol>
      </nav>

      {/* Client Interactive Bulk Orders Workflow */}
      <BulkOrderFormClient />
    </div>
  );
}
