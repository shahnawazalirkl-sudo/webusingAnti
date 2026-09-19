"use client";
import { useSearchParams } from 'next/navigation';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { getAllOrders, getLastOrder } from '@/utils/orderStorage';
import { safeStorage } from '@/utils/safeStorage';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AccountHeader from '@/components/account/AccountHeader';
import AccountOrders from '@/components/account/AccountOrders';
import AccountProfile from '@/components/account/AccountProfile';
import AccountWishlist from '@/components/account/AccountWishlist';
import AccountConcierge from '@/components/account/AccountConcierge';

const STORAGE_KEY_PROFILE = 'asra_user_profile';
const STORAGE_KEY_ADDRESSES = 'asra_saved_addresses';

const DEFAULT_PROFILE = {
  fullName: 'Asra Ansari & Sk Shahnawaz Ali',
  email: 'client@asrawedding.com',
  phone: '+91 96926 68263',
  weddingDate: '2026-11-18',
  partnerName: 'Sk Shahnawaz Ali',
  primaryVenue: 'The Oberoi Udaivilas, Udaipur',
  vipTier: 'Sovereign Union Patron'
};

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Primary Wedding Residence',
    recipient: 'Asra Ansari',
    phone: '+91 96926 68263',
    street: 'Badi-Gorela Canal Road, Haridas Ji Ki Magri',
    city: 'Udaipur',
    state: 'Rajasthan',
    pincode: '313001',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Ceremony Delivery Venue',
    recipient: 'Wedding Concierge / C/O Shahnawaz Ali',
    phone: '+91 96926 68263',
    street: 'The Oberoi Udaivilas, Kohinoor Suite VIP Gate',
    city: 'Udaipur',
    state: 'Rajasthan',
    pincode: '313001',
    isDefault: false
  }
];

const VALID_TABS = ['orders', 'profile', 'wishlist', 'concierge'];

import { Suspense } from 'react';
const ClientPortalContent = () => {
  

  const { wishlistItems } = useWishlist();

  // Active Tab synchronized with search params
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab');
  const activeTab = VALID_TABS.includes(tabParam as string) ? tabParam : 'orders';

  const handleTabChange = (val) => {
    /* setSearchParams({ tab: val }); */
  };

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);

  // Profile State
  const [profile, setProfile] = useState<any>(DEFAULT_PROFILE);

  // Addresses State
  const [addresses, setAddresses] = useState<any>(DEFAULT_ADDRESSES);

  // Load profile, addresses and orders from storage after mount
  useEffect(() => {
    const savedProfile = safeStorage.getItem(STORAGE_KEY_PROFILE, null);
    if (savedProfile !== null) setProfile(savedProfile);

    const savedAddresses = safeStorage.getItem(STORAGE_KEY_ADDRESSES, null);
    if (savedAddresses !== null) setAddresses(savedAddresses);

    try {
      const all = getAllOrders();
      const list = Object.values(all || {});
      if (list.length > 0) {
        list.sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setOrders(list as any);
      } else {
        const last = getLastOrder();
        if (last) {
          setOrders([last]);
        }
      }
    } catch (err) {
      console.warn('Failed to retrieve user orders', err);
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return 'AS';
    const parts = name.match(/\b([A-Z])/g);
    return parts ? parts.slice(0, 2).join('') : 'AS';
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen antialiased flex flex-col justify-between">
      
      {/* Top Sanctuary Navigation Bar */}
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
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
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

          <div className="flex items-center space-x-2.5">
            <Avatar className="h-8 w-8 border border-primary/30 shadow-xs">
              <AvatarFallback className="bg-surface-container-high text-primary font-serif font-bold text-xs">
                {getInitials(profile.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-semibold text-on-surface leading-tight max-w-[130px] truncate">
                {profile.fullName}
              </span>
              <span className="block text-[10px] text-primary font-medium">
                {profile.vipTier}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 flex-grow">
        
        {/* Welcome Editorial Header */}
        <AccountHeader profile={profile} />

        {/* Shadcn Tabs Navigation */}
        <Tabs value={activeTab || 'orders'} onValueChange={handleTabChange} className="w-full space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto no-scrollbar gap-1 p-1 bg-surface-container-low border border-outline-variant/40 rounded-xl h-auto">
            <TabsTrigger value="orders" className="gap-2 py-2 px-4 rounded-lg data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-xs">
              <span className="material-symbols-outlined text-base">package_2</span>
              <span>Your Orders & Tracking</span>
              {orders.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-primary/10 text-primary">
                  {orders.length}
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger value="profile" className="gap-2 py-2 px-4 rounded-lg data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-xs">
              <span className="material-symbols-outlined text-base">person</span>
              <span>Profile & Saved Venues</span>
            </TabsTrigger>

            <TabsTrigger value="wishlist" className="gap-2 py-2 px-4 rounded-lg data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-xs">
              <span className="material-symbols-outlined text-base">favorite</span>
              <span>Saved Treasures</span>
              {wishlistItems.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-primary/10 text-primary">
                  {wishlistItems.length}
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger value="concierge" className="gap-2 py-2 px-4 rounded-lg data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-xs">
              <span className="material-symbols-outlined text-base">support_agent</span>
              <span>Wedding Concierge</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: ORDERS */}
          <TabsContent value="orders">
            <AccountOrders orders={orders} defaultProfile={profile} />
          </TabsContent>

          {/* TAB 2: PROFILE & ADDRESSES */}
          <TabsContent value="profile">
            <AccountProfile
              profile={profile}
              setProfile={setProfile}
              addresses={addresses}
              setAddresses={setAddresses}
            />
          </TabsContent>

          {/* TAB 3: WISHLIST */}
          <TabsContent value="wishlist">
            <AccountWishlist />
          </TabsContent>

          {/* TAB 4: CONCIERGE */}
          <TabsContent value="concierge">
            <AccountConcierge />
          </TabsContent>
        </Tabs>

      </main>

      {/* Sanctuary Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-6 px-4 sm:px-6 lg:px-12 text-on-surface-variant text-xs mt-12">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-serif font-bold tracking-widest text-primary uppercase">Maison ASRA</span>
            <span>·</span>
            <span>Client Sanctuary & Account Hub</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] tracking-wider uppercase">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy & Security</Link>
            <Link href="/return-policy" className="hover:text-primary transition-colors">Transit Guarantees</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Concierge</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function ClientPortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center">Loading Sanctuary...</div>}>
      <ClientPortalContent />
    </Suspense>
  );
}
