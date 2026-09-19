'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/common/CartDrawer';
import { Toaster } from '@/components/ui/sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Standard editorial routes requiring the full editorial Header & Footer with pt-[148px]
  const editorialRoutes = [
    '/',
    '/shop',
    '/collections',
    '/wedding-keepsakes',
    '/personalized',
    '/bulk-orders',
    '/bespoke',
    '/your-idea-we-create',
    '/custom-atelier',
    '/offers',
    '/about',
    '/about-us',
    '/heritage',
    '/contact',
    '/contact-us',
    '/appointments',
    '/salons',
    '/concierge',
    '/faq',
    '/faqs',
    '/help-desk',
    '/help',
    '/terms-of-service',
    '/terms',
    '/charter',
    '/atelier-charter',
    '/privacy-policy',
    '/privacy',
    '/return-policy',
    '/wishlist'
  ];

  const isEditorialPage =
    editorialRoutes.includes(pathname || '') || (pathname || '').startsWith('/product/');
  const isMinimalPage = !isEditorialPage;

  const ContentContainer = !isMinimalPage ? 'main' : 'div';
  const containerClasses = !isMinimalPage ? 'flex-grow w-full pt-[98px] md:pt-[122px]' : 'flex-grow w-full';

  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
          {!isMinimalPage && <Header />}

          <ContentContainer className={containerClasses}>
            {children}
          </ContentContainer>

          {!isMinimalPage && <Footer />}

          {/* Global Slide-Over Cart Drawer & Floating Toast Notifications */}
          <CartDrawer />
          <Toaster position="bottom-right" closeButton />
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}
