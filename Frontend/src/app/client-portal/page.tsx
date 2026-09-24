import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ClientPortalClient from '@/components/account/ClientPortalClient';

export const metadata: Metadata = {
  title: 'Client Sanctuary & Private Portal | ASRA Wedding Canvas',
  description: 'Manage your commissioned wedding heirlooms, live tracking telemetries, saved delivery addresses, and personal concierge requests.',
  openGraph: {
    title: 'Client Sanctuary & Private Portal | ASRA Wedding Canvas',
    description: 'Manage your commissioned wedding heirlooms, live tracking telemetries, saved delivery addresses, and personal concierge requests.',
    url: 'https://asraweddingcanvas.com/client-portal',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function ClientPortalPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen antialiased flex flex-col justify-between">
      
      {/* Top Sanctuary Navigation Bar (Server Rendered) */}
      <header className="w-full bg-surface-container-lowest/95 border-b border-outline-variant/30 sticky top-0 z-40 px-4 sm:px-6 lg:px-12 py-3 backdrop-blur-md">
        <div className="max-w-[1360px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-xs tracking-wider uppercase font-medium text-primary hover:text-primary/80 transition-colors group"
            >
              <span className="material-symbols-outlined text-base mr-1.5 transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <span>Back to Maison</span>
            </Link>
            <div className="h-4 w-[1px] bg-outline-variant/50 hidden sm:block"></div>
            <div className="hidden sm:flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-on-surface-variant">
                Verified Account Dashboard
              </span>
            </div>
          </div>

          <Link href="/" className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
            <div className="w-7 h-7 rounded-full border border-primary/40 flex items-center justify-center bg-surface">
              <span className="font-serif text-xs font-bold text-primary">AS</span>
            </div>
            <div className="text-center hidden md:block">
              <span className="block text-xs tracking-[0.25em] font-semibold text-on-surface uppercase font-serif">
                Maison ASRA
              </span>
              <span className="block text-[9px] tracking-[0.18em] text-primary uppercase -mt-0.5">
                Client Sanctuary
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-2.5 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-primary">verified_user</span>
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider text-primary font-semibold">
              VIP Sanctuary Access
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 flex-grow">
        <Suspense fallback={<div className="min-h-[50vh] bg-surface flex items-center justify-center text-xs text-on-surface-variant font-mono">Loading Sanctuary Telemetry...</div>}>
          <ClientPortalClient />
        </Suspense>
      </main>

      {/* Sanctuary Footer (Server Rendered) */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-6 px-4 sm:px-6 lg:px-12 text-on-surface-variant text-xs mt-12">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-serif font-bold tracking-widest text-primary uppercase">Maison ASRA</span>
            <span>·</span>
            <span>Client Sanctuary &amp; Account Hub</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] tracking-wider uppercase">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy &amp; Security</Link>
            <Link href="/return-policy" className="hover:text-primary transition-colors">Delivery Guarantees</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Concierge</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
