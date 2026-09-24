"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';
import { getAllOrders, getLastOrder } from '@/utils/orderStorage';
import { safeStorage } from '@/utils/safeStorage';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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

export default function ClientPortalClient() {
  const { wishlistItems } = useWishlist();

  // Active Tab synchronized with search params
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab');
  const activeTab = VALID_TABS.includes(tabParam as string) ? (tabParam as string) : 'orders';

  const handleTabChange = (_val: string) => {
    // Tab switching handled by Shadcn Tabs internal state or routing
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

  return (
    <div className="space-y-8">
      {/* Welcome Editorial Header */}
      <AccountHeader profile={profile} />

      {/* Shadcn Tabs Navigation */}
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto no-scrollbar gap-1 p-1 bg-surface-container-low border border-outline-variant/40 rounded-xl h-auto">
          <TabsTrigger value="orders" className="gap-2 py-2 px-4 rounded-lg data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-xs">
            <span className="material-symbols-outlined text-base">package_2</span>
            <span>Your Orders &amp; Tracking</span>
            {orders.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-primary/10 text-primary">
                {orders.length}
              </span>
            )}
          </TabsTrigger>

          <TabsTrigger value="profile" className="gap-2 py-2 px-4 rounded-lg data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-xs">
            <span className="material-symbols-outlined text-base">person</span>
            <span>Profile &amp; Saved Venues</span>
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
    </div>
  );
}
