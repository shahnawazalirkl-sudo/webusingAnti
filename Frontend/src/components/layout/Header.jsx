import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import LocationModal from '../ui/LocationModal';

const Header = () => {
  const { itemCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [deliveryCity, setDeliveryCity] = useState('Select Location');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Top Announcement Bar */}
        <div className="bg-inverse-surface text-inverse-on-surface py-space-xs px-margin">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between text-center">
            <div className="hidden md:block w-24"></div>
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim mx-auto">
              Complimentary Luxury Gift Box &amp; Express Delivery on Orders Above ₹2,499 | Use Code:{' '}
              <span className="text-surface-container-lowest font-bold tracking-normal">ASRAFIRST</span>
            </p>
            <div className="hidden md:flex items-center gap-space-sm font-label-sm text-label-sm text-surface-container-high justify-end">
              <Link to="/contact" className="hover:text-primary-fixed-dim cursor-pointer transition-colors">
                Concierge
              </Link>
              <span>•</span>
              <Link to="/client-portal" className="hover:text-primary-fixed-dim cursor-pointer transition-colors text-primary-fixed">
                Client Sanctuary
              </Link>
              <span>•</span>
              <Link to="/faq" className="hover:text-primary-fixed-dim cursor-pointer transition-colors">
                FAQ &amp; Help
              </Link>
              <span>•</span>
              <Link to="/bespoke" className="hover:text-primary-fixed-dim cursor-pointer transition-colors">
                Bespoke Atelier
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-[1360px] mx-auto px-margin">
          <div className="h-20 flex items-center justify-between gap-space-md">
            
            {/* Logo & Delivery Location */}
            <div className="flex items-center gap-space-lg shrink-0">
              <Link to="/" className="group flex flex-col items-start">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo2aVx5ofNeY7UD9ZQZdBKpFZgqM0Cx9MR769u756jxAC6rOGj1UMS6WfgH6xh-uzoiuLK1hTjb9MmZV-1BFP4pGH8RX8s0qRG7lsEtCj1gS27bRgnzpQfFmCGsmBLJ6a2WDlBXVgcjZRa1Z22nyu4jOw5Z4-b5g8abpGT15XFy7GyIVGLzRoysX6Lq0Ryp452SE1R6GZYjdUpGMaII_yTE8R3-cqANe06ONdjovo00DXMnNk5_5I6aBfQyBjR4H3YiXY"
                  alt="ASRA Wedding Canvas"
                  className="h-12 w-auto object-contain transition-opacity duration-300 hover:opacity-90"
                />
              </Link>

              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="hidden lg:flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors py-space-xs px-space-sm rounded-lg hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[0.65rem] text-outline uppercase">Where to deliver?</span>
                  <span className="font-title-sm text-label-md font-semibold text-on-surface leading-tight">
                    {deliveryCity}
                  </span>
                </div>
              </button>
            </div>

            {/* Global Search Bar */}
            <div className="flex-1 max-w-sm mx-space-md hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">
                  search
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search personalized gifts, wedding favors, hampers..."
                  className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm pl-11 pr-24 py-space-sm rounded-lg border border-outline-variant/60 focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-space-sm py-1 bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface-variant rounded flex items-center gap-1 font-label-sm text-label-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">filter_list</span>
                  <span>Finder</span>
                </button>
              </form>
            </div>

            {/* Right Header Navigation */}
            <div className="flex items-center gap-space-md lg:gap-space-lg shrink-0 justify-end">
              <Link
                to="/offers"
                className="hidden xl:flex items-center gap-space-xs text-on-surface hover:text-primary transition-colors font-label-md text-label-md"
              >
                <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-bold text-[10px] tracking-wider">
                  NEW
                </span>
                <span>Offers</span>
              </Link>

              <Link
                to="/wishlist"
                className="relative hidden lg:flex items-center text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
              >
                <span>My Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-primary text-on-primary text-[10px] rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <div className="hidden sm:flex items-center gap-1 font-label-md text-label-md text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                <span className="font-semibold">INR ₹</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </div>

              <Link
                to="/bulk-orders"
                className={`hidden lg:flex transition-colors font-label-md text-label-md ${
                  isActive('/bulk-orders') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Corporate
              </Link>

              {/* Cart Button */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="flex items-center gap-1.5 text-on-surface hover:text-primary transition-colors"
              >
                <div className="relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                  <span className="absolute -top-1 -right-2 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                </div>
                <span className="hidden sm:inline ml-1 font-label-md text-label-md">Cart</span>
              </button>

              <Link
                to="/client-portal"
                aria-label="Client Sanctuary & Sovereign Portal"
                title="Sovereign Client Sanctuary"
                className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface inline-flex items-center justify-center shrink-0 transition-colors border border-outline-variant/60 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </Link>

              {/* Mobile Burger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1 text-on-surface hover:text-primary"
                aria-label="Toggle Navigation Menu"
              >
                <span className="material-symbols-outlined text-[26px]">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Secondary Navigation Menu with 7 Mega Dropdowns */}
        <div className="border-t border-outline-variant/40 bg-surface-container-lowest/70 backdrop-blur-sm hidden md:block">
          <div className="max-w-[1360px] mx-auto px-margin">
            <nav className="flex items-center justify-center gap-space-lg py-space-sm relative">
              
              {/* 1. SHOP MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  to="/shop"
                  className={`font-label-md text-label-md tracking-wider transition-colors py-2 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer ${
                    isActive('/shop')
                      ? 'text-on-surface font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>SHOP</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto max-w-[95vw]">
                  <div className="w-[320px] max-w-[95vw] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-space-md flex flex-col gap-1 text-left backdrop-blur-md">
                    <span className="font-headline-sm text-[15px] text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1.5 mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">category</span> Shop Categories
                    </span>
                    <Link
                      to="/shop#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">All Products</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      to="/shop?cat=keepsakes#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Personalized Keepsakes</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      to="/shop?cat=favors-trousseau#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Wedding Favors &amp; Trousseau</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      to="/shop?cat=for-her#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Gifts For Her</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      to="/shop?cat=for-him#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Gifts For Him</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      to="/shop?cat=couple#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Anniversary &amp; Couple</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      to="/shop?cat=hampers#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Luxury Hampers</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 2. PERSONALIZED MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  to="/personalized"
                  className={`font-label-md text-label-md tracking-wider transition-colors py-2 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer ${
                    isActive('/personalized')
                      ? 'text-on-surface font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>PERSONALIZED</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto max-w-[90vw]">
                  <div className="w-[520px] max-w-[90vw] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-space-md grid grid-cols-2 gap-space-md text-left backdrop-blur-md">
                    <div className="flex flex-col gap-1">
                      <span className="font-headline-sm text-[14px] text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1.5 mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[17px]">brush</span> By Craft Technique
                      </span>
                      <Link
                        to="/personalized#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">All Techniques</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?craft=monogram#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Monogrammed</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?craft=velvet#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Velvet &amp; Silk</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?craft=wax#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Wax &amp; Deckle</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?craft=botanical#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Preserved Florals</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?craft=gold#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Gold Foil</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-headline-sm text-[14px] text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1.5 mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[17px]">person</span> By Recipient
                      </span>
                      <Link
                        to="/personalized#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">All Recipients</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?recipient=bride#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Bride &amp; Bridesmaids</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?recipient=groom#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Groom &amp; Groomsmen</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?recipient=couple#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Couple &amp; Anniversary</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                      <Link
                        to="/personalized?recipient=parents#products"
                        className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium text-xs">Parents of the Couple</span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">
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
                  to="/wedding-keepsakes"
                  className={`font-label-md text-label-md tracking-wider transition-colors py-2 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer ${
                    isActive('/wedding-keepsakes')
                      ? 'text-on-surface font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>WEDDING</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto max-w-[95vw]">
                  <div className="w-[340px] max-w-[95vw] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-space-md flex flex-col gap-1 text-left backdrop-blur-md">
                    <span className="font-headline-sm text-[15px] text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1.5 mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">celebration</span> Wedding Categories
                    </span>
                    <Link
                      to="/wedding-keepsakes#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">All Wedding Suites</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      to="/wedding-keepsakes?tab=bridal-groom#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Bridal &amp; Groom Gifts</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      to="/wedding-keepsakes?tab=vow-books#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Vow Books &amp; Stationery</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      to="/wedding-keepsakes?tab=trousseau-vaults#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Trousseau &amp; Ring Vaults</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      to="/wedding-keepsakes?tab=wedding-favors#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Wedding Favors &amp; Bulk</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      to="/wedding-keepsakes?tab=preserved-varmala#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Preserved Varmala Art</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                    <Link
                      to="/wedding-keepsakes?tab=milestone-keepsakes#products"
                      className="text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">Milestone Keepsakes</span>
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 4. COLLECTIONS MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  to="/collections"
                  className={`font-label-md text-label-md tracking-wider transition-colors py-2 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer ${
                    isActive('/collections')
                      ? 'text-on-surface font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>COLLECTIONS</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[560px] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-space-lg grid grid-cols-2 gap-space-lg text-left backdrop-blur-md">
                    <div className="flex flex-col gap-2">
                      <span className="font-headline-sm text-[15px] text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1.5 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">diamond</span> Signature Series
                      </span>
                      <Link to="/collections?search=royal+heritage+trousseau" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">The Royal Heritage Trousseau</Link>
                      <Link to="/collections?search=aura+acrylic+led" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Aura Acrylic &amp; LED Melodies</Link>
                      <Link to="/collections?search=tuscan+leather+travel" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Tuscan Leather Travel Suites</Link>
                      <Link to="/collections?search=velvet+heirloom+jewel" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Velvet Heirloom Jewel Cases</Link>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="font-headline-sm text-[15px] text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1.5 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">filter_vintage</span> Seasonal Releases
                      </span>
                      <Link to="/collections?search=summer+soiree+2025" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Summer Soirée 2025 Editions</Link>
                      <Link to="/collections?search=minimalist+nordic+wood" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Minimalist Nordic Wood Hampers</Link>
                      <Link to="/collections?search=festive+royale+silver" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Festive Royale Silver Accents</Link>
                      <Link to="/collections?search=anniversary+milestone" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Anniversary Milestone Editions</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. OFFERS & DISCOUNTS MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  to="/offers"
                  className={`font-label-md text-label-md tracking-wider transition-colors py-2 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer ${
                    isActive('/offers')
                      ? 'text-on-surface font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>OFFERS &amp; DISCOUNTS</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[480px] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-space-md flex flex-col gap-3 text-left backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                      <span className="font-headline-sm text-[15px] text-primary font-serif font-semibold">
                        Active Bridal &amp; Bank Coupons
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-label-sm uppercase font-semibold">
                        6 Offers Live
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded border border-outline-variant/40">
                      <div>
                        <span className="font-mono font-bold text-xs text-primary block">ASRAFIRST</span>
                        <span className="text-xs text-on-surface-variant">Complimentary gift box + 10% off for first-time couples</span>
                      </div>
                      <span className="text-[11px] text-outline font-medium">Orders &gt; ₹2,499</span>
                    </div>
                    <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded border border-outline-variant/40">
                      <div>
                        <span className="font-mono font-bold text-xs text-primary block">HDFCWED1500</span>
                        <span className="text-xs text-on-surface-variant">Flat ₹1,500 off on luxury trousseau &amp; bulk hampers</span>
                      </div>
                      <span className="text-[11px] text-outline font-medium">Min ₹9,999</span>
                    </div>
                    <Link to="/offers" className="text-xs font-semibold text-primary hover:underline text-center pt-1 flex items-center justify-center gap-1">
                      <span>View All 6 Deals &amp; Bank Partnerships</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 6. YOUR IDEA -> WE CREATE MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  to="/bespoke"
                  className={`font-label-md text-label-md tracking-wider transition-colors py-2 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer ${
                    isActive('/bespoke')
                      ? 'text-on-surface font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>YOUR IDEA → WE CREATE</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[520px] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-space-lg flex flex-col gap-3 text-left backdrop-blur-md">
                    <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">design_services</span>
                      <span className="font-headline-sm text-[15px] text-on-surface font-serif font-semibold">
                        Bespoke Custom Atelier Studio
                      </span>
                    </div>
                    <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Bring your wedding logo, bespoke font, or specific dimensions. We craft sample 3D proofs in 6 hours with custom brass stamping dies.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link to="/bespoke" className="p-2.5 rounded bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col border border-outline-variant/30">
                        <span className="text-xs font-semibold text-on-surface">Upload Vector Crest</span>
                        <span className="text-[11px] text-outline">Get a free digital 3D proof</span>
                      </Link>
                      <a href="https://wa.me/919692668263" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col border border-outline-variant/30">
                        <span className="text-xs font-semibold text-on-surface">Concierge WhatsApp</span>
                        <span className="text-[11px] text-outline">Instant artisan response</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. BULK ORDERS MEGA DROPDOWN */}
              <div className="group relative">
                <Link
                  to="/bulk-orders"
                  className={`font-label-md text-label-md tracking-wider transition-colors py-2 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer ${
                    isActive('/bulk-orders')
                      ? 'text-on-surface font-bold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>BULK ORDERS</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:rotate-180 transition-transform duration-300 text-outline">
                    keyboard_arrow_down
                  </span>
                </Link>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[380px] bg-[#FCF9F8] rounded-xl shadow-xl border border-outline-variant/50 p-space-md flex flex-col gap-2.5 text-left backdrop-blur-md">
                    <span className="font-headline-sm text-[15px] text-primary font-serif font-semibold border-b border-outline-variant/30 pb-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">corporate_fare</span> Bulk &amp; Event Gifting
                    </span>
                    <Link to="/404" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1 flex items-center justify-between">
                      <span>Tiered Bulk Pricing (25+ units)</span>
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">Save up to 35%</span>
                    </Link>
                    <Link to="/404" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Corporate Brand &amp; Festive Favors</Link>
                    <Link to="/404" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Destination Wedding Logistics</Link>
                    <Link to="/404" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1">Custom Branded Ribbons &amp; Tags</Link>
                    <div className="mt-1 pt-2 border-t border-outline-variant/30">
                      <Link to="/bulk-orders" className="w-full py-2 bg-on-surface text-surface rounded text-center text-xs font-semibold tracking-wider block hover:bg-primary transition-colors">
                        Request Bulk Quote Catalog
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. HERITAGE & ATELIER */}
              <Link
                to="/about"
                className={`font-label-md text-label-md tracking-wider transition-colors py-2 whitespace-nowrap inline-flex items-center cursor-pointer ${
                  isActive('/about') || isActive('/about-us') || isActive('/heritage')
                    ? 'text-on-surface font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span>HERITAGE &amp; ATELIER</span>
              </Link>

            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant/60 px-6 py-5 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keepsakes & gifts..."
                className="w-full bg-surface-container-low text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:outline-none"
              />
            </form>

            <div className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-wider text-on-surface">
              <Link to="/client-portal" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors flex items-center justify-between ${isActive('/client-portal') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>
                <span>Client Sanctuary &amp; Sovereign Vault</span>
                <span className="text-[10px] bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-semibold">Portal</span>
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/about') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Heritage &amp; Atelier (About Us)</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/contact') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Contact &amp; Private Appointments</Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/shop') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Shop All Collections</Link>
              <Link to="/personalized" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/personalized') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Personalized Keepsakes</Link>
              <Link to="/wedding-keepsakes" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/wedding-keepsakes') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Wedding Registry &amp; Favors</Link>
              <Link to="/collections" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/collections') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Signature Collections</Link>
              <Link to="/offers" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/offers') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Offers &amp; Discounts</Link>
              <Link to="/bespoke" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/bespoke') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'text-primary hover:underline'}`}>Your Idea → We Create</Link>
              <Link to="/bulk-orders" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/bulk-orders') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Bulk Orders &amp; Corporate</Link>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/wishlist') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>My Saved Keepsakes ({wishlistCount})</Link>
              <Link to="/track-order" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/track-order') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Track My Order</Link>
              <Link to="/return-policy" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/return-policy') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Return &amp; Refund Policy</Link>
              <Link to="/terms-of-service" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/terms-of-service') || isActive('/terms') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Terms of Service &amp; Charter</Link>
              <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className={`py-1 transition-colors ${isActive('/privacy-policy') ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'hover:text-primary'}`}>Privacy &amp; NDA Covenant</Link>
            </div>
          </div>
        )}
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
