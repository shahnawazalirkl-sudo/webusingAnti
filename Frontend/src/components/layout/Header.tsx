"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import LocationModal from '../ui/LocationModal';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const Header = () => {
  const { itemCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [deliveryCity, setDeliveryCity] = useState('Select Location');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useRouter();
  const location = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location]);

  const isActive = (path: string) => location === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Top Announcement Bar - Streamlined & Focused */}
        <div className="bg-inverse-surface text-inverse-on-surface py-1.5 px-3 sm:px-6 lg:px-margin text-xs">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between">
            <div className="hidden lg:flex items-center gap-2 text-surface-container-high font-medium">
              <span className="material-symbols-outlined text-[15px] text-primary-fixed-dim">verified</span>
              <span>Luxury Custom &amp; Handcrafted Keepsakes</span>
            </div>
            <p className="font-label-sm text-[11px] sm:text-xs tracking-wider text-primary-fixed-dim mx-auto lg:mx-0 text-center font-medium truncate sm:whitespace-normal">
              Complimentary Luxury Gift Box on Orders Above ₹2,499 | Use Code:{' '}
              <span className="text-white font-bold tracking-normal underline decoration-primary underline-offset-2">ASRAFIRST</span>
            </p>
            <div className="hidden md:flex items-center gap-4 text-xs text-surface-container-high justify-end">
              <Link href="/track-order" className="hover:text-primary-fixed-dim cursor-pointer transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                <span>Track Order</span>
              </Link>
              <span>•</span>
              <a href="https://wa.me/919692668263" target="_blank" rel="noopener noreferrer" className="hover:text-primary-fixed-dim cursor-pointer transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">support_agent</span>
                <span>Customer Support</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Bar - Compact & Sleek */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-margin">
          <div className="h-14 md:h-16 flex items-center justify-between gap-2 md:gap-space-md">
            
            {/* Logo & Delivery Location */}
            <div className="flex items-center gap-2 sm:gap-space-md md:gap-space-lg shrink-0">
              <Link href="/" className="group flex flex-col items-start">
                <img
                  src="/assets/cdn/img_c432d69126c7.png"
                  alt="ASRA Wedding Canvas"
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-300 hover:opacity-90"
                />
              </Link>

              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors py-1 px-2.5 rounded-lg hover:bg-surface-container-low border border-outline-variant/30"
                title="Select Delivery Destination"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[9px] text-outline uppercase tracking-wider">Deliver to</span>
                  <span className="font-title-sm text-xs font-semibold text-on-surface leading-tight max-w-[100px] truncate">
                    {deliveryCity}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[14px] text-outline">expand_more</span>
              </button>
            </div>

            {/* Global Search Bar (Desktop) */}
            <div className="flex-1 max-w-md mx-2 md:mx-4 hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-[18px]">
                  search
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search personalized gifts, wedding favors, hampers..."
                  className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-xs pl-9 pr-16 py-2 rounded-full border border-outline-variant/50 focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-all shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1 px-3 py-1 bg-primary text-on-primary hover:bg-primary/90 rounded-full flex items-center gap-1 font-label-sm text-[11px] font-medium transition-all"
                >
                  <span>Search</span>
                </button>
              </form>
            </div>

            {/* Right Header Navigation */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 shrink-0 justify-end">
              {/* Mobile Quick Search Button */}
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen((prev) => !prev)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-on-surface hover:text-primary rounded-full hover:bg-surface-container-low transition-colors"
                aria-label="Search"
                title="Search"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isMobileSearchOpen ? 'close' : 'search'}
                </span>
              </button>

              {/* Desktop Wishlist Button */}
              <Link
                href="/wishlist"
                className="hidden md:flex relative items-center justify-center p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-full transition-colors"
                title="Saved Wishlist"
              >
                <span className="material-symbols-outlined text-[22px]">favorite_border</span>
                {mounted && wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-primary text-on-primary text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="flex items-center gap-1.5 p-1.5 px-2.5 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface transition-colors border border-outline-variant/40 touch-manipulation"
                title="View Cart"
                aria-label="View Cart"
              >
                <div className="relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  {mounted && itemCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-primary text-on-primary text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold leading-none">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-label-md text-xs font-semibold">Cart</span>
              </button>

              {/* Desktop Account Button */}
              <Link
                href="/client-portal"
                aria-label="My Account & Orders"
                title="My Account"
                className="hidden md:inline-flex p-2 rounded-full hover:bg-surface-container-low text-on-surface hover:text-primary items-center justify-center shrink-0 transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">account_circle</span>
              </Link>

              {/* Mobile Burger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-on-surface hover:text-primary rounded-full hover:bg-surface-container-low transition-colors touch-manipulation"
                aria-label="Open Navigation Menu"
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Expandable Quick Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 py-2.5 bg-surface-container-lowest border-t border-outline-variant/30 animate-in fade-in-0 slide-in-from-top-2 duration-200 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-[18px]">
                search
              </span>
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search personalized gifts, hampers..."
                className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-xs pl-9 pr-16 py-2 rounded-full border border-outline-variant/50 focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 px-3 py-1 bg-primary text-on-primary hover:bg-primary/90 rounded-full flex items-center gap-1 font-label-sm text-[11px] font-medium transition-all"
              >
                <span>Search</span>
              </button>
            </form>
          </div>
        )}

        {/* Secondary Navigation Menu with Refined Mega Dropdowns - Ultra Compact */}
        <div className="border-t border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-md hidden md:block shadow-sm">
          <div className="max-w-[1360px] mx-auto px-margin">
            <nav className="flex items-center justify-center gap-space-md lg:gap-space-lg py-1 relative">
              
              {/* 1. SHOP MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  href="/shop"
                  className={`font-label-md text-xs tracking-wider transition-colors py-1 whitespace-nowrap inline-flex items-center gap-0.5 cursor-pointer ${
                    isActive('/shop')
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>SHOP</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-0 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto max-w-[95vw]">
                  <div className="w-[300px] max-w-[95vw] max-h-[calc(100vh-120px)] overflow-y-auto bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-3 flex flex-col gap-0.5 text-left backdrop-blur-md">
                    <span className="font-headline-sm text-xs text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1 mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">category</span> Shop Categories
                    </span>
                    <Link
                      href="/shop#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">All Products</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      href="/shop?cat=keepsakes#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Personalized Gifts</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      href="/shop?cat=favors-trousseau#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Wedding Favors &amp; Essentials</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      href="/shop?cat=for-her#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Gifts For Her</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      href="/shop?cat=for-him#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Gifts For Him</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      href="/shop?cat=couple#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Anniversary &amp; Couple</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      href="/shop?cat=hampers#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Luxury Hampers</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 2. PERSONALIZED MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  href="/personalized"
                  className={`font-label-md text-xs tracking-wider transition-colors py-1 whitespace-nowrap inline-flex items-center gap-0.5 cursor-pointer ${
                    isActive('/personalized')
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>PERSONALIZED</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-0 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto max-w-[90vw]">
                  <div className="w-[480px] max-w-[90vw] max-h-[calc(100vh-120px)] overflow-y-auto bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-3 grid grid-cols-2 gap-3 text-left backdrop-blur-md">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-headline-sm text-xs text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1 mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">brush</span> Craft Technique
                      </span>
                      <Link
                        href="/personalized#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">All Techniques</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?craft=monogram#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Initials</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?craft=velvet#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Velvet &amp; Silk</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?craft=wax#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Wax &amp; Deckle</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?craft=botanical#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Preserved Florals</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?craft=gold#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Gold Foil</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="font-headline-sm text-xs text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1 mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">person</span> By Recipient
                      </span>
                      <Link
                        href="/personalized#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">All Recipients</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?recipient=bride#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Bride &amp; Bridesmaids</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?recipient=groom#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Groom &amp; Groomsmen</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?recipient=couple#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Couple &amp; Anniversary</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        href="/personalized?recipient=parents#products"
                        className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2 py-1 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-[11px]">Parents of Couple</span>
                        <span className="material-symbols-outlined text-[13px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. WEDDING MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  href="/wedding-keepsakes"
                  className={`font-label-md text-xs tracking-wider transition-colors py-1 whitespace-nowrap inline-flex items-center gap-0.5 cursor-pointer ${
                    isActive('/wedding-keepsakes')
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>WEDDING</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto max-w-[95vw]">
                  <div className="w-[320px] max-w-[95vw] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-3 flex flex-col gap-0.5 text-left backdrop-blur-md">
                    <span className="font-headline-sm text-xs text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1 mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">celebration</span> Wedding Categories
                    </span>
                    <Link
                      href="/wedding-keepsakes#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">All Wedding Suites</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/wedding-keepsakes?tab=bridal-groom#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Bridal &amp; Groom Gifts</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/wedding-keepsakes?tab=vow-books#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Vow Books &amp; Stationery</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/wedding-keepsakes?tab=trousseau-vaults#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Wedding Essentials &amp; Vaults</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/wedding-keepsakes?tab=wedding-favors#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Wedding Favors &amp; Bulk</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/wedding-keepsakes?tab=preserved-varmala#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Preserved Varmala Art</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/wedding-keepsakes?tab=milestone-keepsakes#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Milestone Gifts</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 4. COLLECTIONS MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  href="/collections"
                  className={`font-label-md text-xs tracking-wider transition-colors py-1 whitespace-nowrap inline-flex items-center gap-0.5 cursor-pointer ${
                    isActive('/collections')
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>COLLECTIONS</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto max-w-[95vw]">
                  <div className="w-[330px] max-w-[95vw] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-3 flex flex-col gap-0.5 text-left backdrop-blur-md">
                    <span className="font-headline-sm text-xs text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1 mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">collections_bookmark</span> Collections
                    </span>
                    <Link
                      href="/collections#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">All Collections</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/collections?category=bridal-trousseau#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Bridal Essentials Series</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/collections?category=heirloom-woodcraft#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Heirloom Woodcraft</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/collections?category=floral-preservation#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Botanical &amp; Florals</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/collections?category=velvet-leather#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Velvet &amp; Gilded Leather</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/collections?category=celestial-acrylic#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Celestial Acrylic</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      href="/collections?category=destination-favors#products"
                      className="text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Destination Favors</span>
                      <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 5. OFFERS & DISCOUNTS MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  href="/offers"
                  className={`font-label-md text-xs tracking-wider transition-colors py-1 whitespace-nowrap inline-flex items-center gap-0.5 cursor-pointer ${
                    isActive('/offers')
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="bg-secondary-container text-on-secondary-container px-1 py-0.2 rounded font-bold text-[9px] tracking-wider">OFFERS</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[380px] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-3 flex flex-col gap-2 text-left backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-outline-variant/30 pb-1.5">
                      <span className="font-headline-sm text-xs text-primary font-serif font-semibold">
                        Bridal &amp; Bank Coupons
                      </span>
                      <span className="text-[9px] font-label-sm uppercase font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                        Live Deals
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg border border-outline-variant/40">
                      <div>
                        <span className="font-mono font-bold text-xs text-primary block">ASRAFIRST</span>
                        <span className="text-[11px] text-on-surface-variant">Complimentary gift box + 10% off</span>
                      </div>
                      <span className="text-[10px] text-outline font-medium">&gt; ₹2,499</span>
                    </div>
                    <div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg border border-outline-variant/40">
                      <div>
                        <span className="font-mono font-bold text-xs text-primary block">HDFCWED1500</span>
                        <span className="text-[11px] text-on-surface-variant">Flat ₹1,500 off luxury hampers</span>
                      </div>
                      <span className="text-[10px] text-outline font-medium">Min ₹9,999</span>
                    </div>
                    <Link href="/offers" className="text-xs font-semibold text-primary hover:underline text-center pt-0.5 flex items-center justify-center gap-1">
                      <span>View All Offers</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 6. YOUR IDEA -> WE CREATE MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  href="/bespoke"
                  className={`font-label-md text-xs tracking-wider transition-colors py-1 whitespace-nowrap inline-flex items-center gap-0.5 cursor-pointer ${
                    isActive('/bespoke')
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>YOUR IDEA → WE CREATE</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[420px] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-3 flex flex-col gap-2 text-left backdrop-blur-md">
                    <div className="flex items-center gap-1.5 border-b border-outline-variant/30 pb-1.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">design_services</span>
                      <span className="font-headline-sm text-xs text-on-surface font-serif font-semibold">
                        Custom Design Studio &amp; Workshop
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Bring your wedding logo or custom crest. Our team crafts 3D proofs and precision designs.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <Link href="/bespoke" className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col border border-outline-variant/30">
                        <span className="text-[11px] font-semibold text-on-surface">Upload Crest</span>
                        <span className="text-[10px] text-outline">Free digital 3D proof</span>
                      </Link>
                      <a href="https://wa.me/919692668263" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col border border-outline-variant/30">
                        <span className="text-[11px] font-semibold text-on-surface">Designer Chat</span>
                        <span className="text-[10px] text-outline">Instant support</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. BULK ORDERS MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  href="/bulk-orders"
                  className={`font-label-md text-xs tracking-wider transition-colors py-1 whitespace-nowrap inline-flex items-center gap-0.5 cursor-pointer ${
                    isActive('/bulk-orders')
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>BULK ORDERS</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute right-0 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[320px] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-3 flex flex-col gap-1.5 text-left backdrop-blur-md">
                    <span className="font-headline-sm text-xs text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">corporate_fare</span> Bulk &amp; Event Gifting
                    </span>
                    <Link href="/bulk-orders#pricing" className="text-xs text-on-surface-variant hover:text-primary transition-colors py-0.5 flex items-center justify-between">
                      <span className="text-[11px]">Tiered Pricing (25+ units)</span>
                      <span className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded">Save 35%</span>
                    </Link>
                    <Link href="/bulk-orders#corporate" className="text-[11px] text-on-surface-variant hover:text-primary transition-colors py-0.5">
                      Corporate &amp; Festive Favors
                    </Link>
                    <Link href="/bulk-orders#logistics" className="text-[11px] text-on-surface-variant hover:text-primary transition-colors py-0.5">
                      Destination Logistics
                    </Link>
                    <div className="mt-1 pt-1.5 border-t border-outline-variant/30">
                      <Link href="/bulk-orders" className="w-full py-1.5 bg-primary text-on-primary rounded-lg text-center text-[11px] font-semibold tracking-wider block hover:bg-primary/90 transition-colors shadow-sm">
                        Request Bulk Catalog
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. ABOUT ATELIER */}
              <Link
                href="/about"
                className={`font-label-md text-xs tracking-wider transition-colors py-1 whitespace-nowrap inline-flex items-center cursor-pointer ${
                  isActive('/about') || isActive('/about-us') || isActive('/heritage')
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span>OUR STORY</span>
              </Link>

            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent
            side="left"
            className="w-[85vw] max-w-[340px] p-0 flex flex-col justify-between bg-surface-container-lowest border-r border-outline-variant/40 shadow-2xl z-50 h-full"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between pr-12">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-start">
                <img
                  src="/assets/cdn/img_c432d69126c7.png"
                  alt="ASRA Wedding Canvas"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-label-sm text-[9px] text-primary tracking-[0.2em] uppercase font-semibold mt-1">
                  Artisanal Keepsakes
                </span>
              </Link>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Search Input in Drawer */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                  search
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search gifts, keepsakes, hampers..."
                  className="w-full bg-surface-container-low text-xs pl-9 pr-14 py-2.5 rounded-lg border border-outline-variant/50 focus:outline-none focus:border-primary text-on-surface"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-primary text-on-primary text-[10px] font-semibold rounded-md uppercase"
                >
                  Go
                </button>
              </form>

              {/* Quick Patron Links */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/client-portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg border flex items-center gap-2 transition-colors ${
                    isActive('/client-portal')
                      ? 'bg-primary/10 border-primary/40 text-primary'
                      : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30 text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold">Client Portal</span>
                    <span className="text-[9px] text-outline">Orders &amp; Vault</span>
                  </div>
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg border flex items-center gap-2 transition-colors ${
                    isActive('/track-order')
                      ? 'bg-primary/10 border-primary/40 text-primary'
                      : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30 text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold">Track Order</span>
                    <span className="text-[9px] text-outline">GPS Transit</span>
                  </div>
                </Link>
              </div>

              {/* Nav Sections */}
              <div className="flex flex-col gap-3 text-xs font-medium tracking-wide divide-y divide-outline-variant/20">
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-outline tracking-widest px-1 mb-1">
                    Collections &amp; Gifts
                  </span>
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center justify-between ${
                      isActive('/shop')
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">storefront</span>
                      <span>Shop All Collections</span>
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  </Link>
                  <Link
                    href="/personalized"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center justify-between ${
                      isActive('/personalized')
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">brush</span>
                      <span>Personalized Keepsakes</span>
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  </Link>
                  <Link
                    href="/wedding-keepsakes"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center justify-between ${
                      isActive('/wedding-keepsakes')
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">celebration</span>
                      <span>Wedding Keepsakes &amp; Favors</span>
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  </Link>
                  <Link
                    href="/collections"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center justify-between ${
                      isActive('/collections')
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">collections_bookmark</span>
                      <span>Signature Collections</span>
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  </Link>
                  <Link
                    href="/bespoke"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center justify-between ${
                      isActive('/bespoke')
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">design_services</span>
                      <span className="font-semibold text-primary">Your Idea → We Create</span>
                    </span>
                    <span className="text-[9px] uppercase font-bold bg-primary/15 text-primary px-1.5 py-0.5 rounded">Custom</span>
                  </Link>
                  <Link
                    href="/bulk-orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center justify-between ${
                      isActive('/bulk-orders')
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">corporate_fare</span>
                      <span>Bulk &amp; Corporate Gifting</span>
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  </Link>
                  <Link
                    href="/offers"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center justify-between ${
                      isActive('/offers')
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">local_offer</span>
                      <span>Privilege Offers &amp; Deals</span>
                    </span>
                    <span className="text-[9px] uppercase font-bold bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded">Deals</span>
                  </Link>
                </div>

                <div className="flex flex-col gap-1 pt-3">
                  <span className="text-[10px] uppercase font-bold text-outline tracking-widest px-1 mb-1">
                    Atelier &amp; Concierge
                  </span>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center gap-2.5 ${
                      isActive('/about') ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">history_edu</span>
                    <span>About Our Atelier</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center gap-2.5 ${
                      isActive('/contact') ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">pin_drop</span>
                    <span>Showrooms &amp; Salons</span>
                  </Link>
                  <Link
                    href="/faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-2 rounded-md flex items-center gap-2.5 ${
                      isActive('/faq') ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">help</span>
                    <span>FAQ &amp; Care Guides</span>
                  </Link>
                  <a
                    href="https://wa.me/919692668263"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-2 rounded-md flex items-center gap-2.5 text-on-surface hover:bg-surface-container-low hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                    <span>WhatsApp Concierge (24/7)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLocationModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-outline uppercase tracking-wider">Deliver to</span>
                    <span className="font-semibold text-xs truncate max-w-[150px]">{deliveryCity}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
              </button>
              <p className="text-[10px] text-outline text-center tracking-wide">
                Complimentary gift box on orders above ₹2,499
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectCity={(city) => setDeliveryCity(city)}
      />
    </>
  );
};

export default Header;
