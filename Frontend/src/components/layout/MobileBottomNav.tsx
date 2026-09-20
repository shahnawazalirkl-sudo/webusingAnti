'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openCart) {
      openCart();
    } else if (openCartDrawer) {
      openCartDrawer();
    }
  };

  const isHomeActive = pathname === '/';
  const isShopActive =
    pathname === '/shop' ||
    Boolean(pathname?.startsWith('/shop/')) ||
    Boolean(pathname?.startsWith('/product/')) ||
    pathname === '/collections' ||
    pathname === '/personalized' ||
    pathname === '/wedding-keepsakes';
  const isWishlistActive = pathname === '/wishlist';
  const isCartActive = pathname === '/cart' || pathname === '/checkout';
  const isAccountActive =
    pathname === '/client-portal' ||
    Boolean(pathname?.startsWith('/client-portal')) ||
    pathname === '/track-order';

  return (
    <nav
      aria-label="Mobile Navigation"
      className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border border-outline-variant/40 shadow-lg"
      style={{ paddingBottom: 'max(0.35rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 h-14 items-center px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`relative flex flex-col items-center justify-center py-1 h-full transition-colors touch-manipulation ${
            isHomeActive
              ? 'text-primary font-bold'
              : 'text-on-surface-variant/75 hover:text-primary'
          }`}
          aria-label="Home"
        >
          {isHomeActive && (
            <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
          )}
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="font-label-sm text-[10px] tracking-wider uppercase mt-0.5 leading-none">
            Home
          </span>
        </Link>

        {/* 2. Shop */}
        <Link
          href="/shop"
          className={`relative flex flex-col items-center justify-center py-1 h-full transition-colors touch-manipulation ${
            isShopActive
              ? 'text-primary font-bold'
              : 'text-on-surface-variant/75 hover:text-primary'
          }`}
          aria-label="Shop"
        >
          {isShopActive && (
            <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
          )}
          <span className="material-symbols-outlined text-[22px]">storefront</span>
          <span className="font-label-sm text-[10px] tracking-wider uppercase mt-0.5 leading-none">
            Shop
          </span>
        </Link>

        {/* 3. Wishlist */}
        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center justify-center py-1 h-full transition-colors touch-manipulation ${
            isWishlistActive
              ? 'text-primary font-bold'
              : 'text-on-surface-variant/75 hover:text-primary'
          }`}
          aria-label="Wishlist"
        >
          {isWishlistActive && (
            <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
          )}
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm animate-in fade-in zoom-in-75 duration-200">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </div>
          <span className="font-label-sm text-[10px] tracking-wider uppercase mt-0.5 leading-none">
            Wishlist
          </span>
        </Link>

        {/* 4. Bag / Cart */}
        <button
          type="button"
          onClick={handleCartClick}
          className={`relative flex flex-col items-center justify-center py-1 h-full transition-colors touch-manipulation ${
            isCartActive
              ? 'text-primary font-bold'
              : 'text-on-surface-variant/75 hover:text-primary'
          }`}
          aria-label="Shopping Bag"
        >
          {isCartActive && (
            <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
          )}
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm animate-in fade-in zoom-in-75 duration-200">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
          <span className="font-label-sm text-[10px] tracking-wider uppercase mt-0.5 leading-none">
            Bag
          </span>
        </button>

        {/* 5. Menu / Account */}
        <Link
          href="/client-portal"
          className={`relative flex flex-col items-center justify-center py-1 h-full transition-colors touch-manipulation ${
            isAccountActive
              ? 'text-primary font-bold'
              : 'text-on-surface-variant/75 hover:text-primary'
          }`}
          aria-label="Account"
        >
          {isAccountActive && (
            <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
          )}
          <span className="material-symbols-outlined text-[22px]">person</span>
          <span className="font-label-sm text-[10px] tracking-wider uppercase mt-0.5 leading-none">
            Account
          </span>
        </Link>
      </div>
    </nav>
  );
}
