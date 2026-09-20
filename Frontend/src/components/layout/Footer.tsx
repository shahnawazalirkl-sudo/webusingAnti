'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shop: false,
    company: false,
    connect: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="w-full bg-[#181716] text-[#FAF8F5] pt-space-xl pb-24 md:pb-space-lg mt-space-xl">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-margin">
        {/* ================= DESKTOP GRID VIEW (md and up) ================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl border-b border-[#2E2B28]">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 flex flex-col pr-space-lg">
            <Link href="/" className="mb-space-sm inline-block">
              <img
                src="/assets/cdn/img_cfbb18b97ef1.png"
                alt="ASRA Wedding Canvas"
                className="h-14 w-auto object-contain brightness-0 invert hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="font-label-sm text-label-sm text-[#C5A880] tracking-[0.2em] mb-space-md">
              CREATE MORE THAN A GIFT • CREATE A MEMORY
            </p>
            <p className="font-body-sm text-body-sm text-[#B8AEA3] leading-relaxed mb-space-md max-w-sm">
              ASRA WEDDING CANVAS is dedicated to the customized artistry of eternal wedding gifts, artisanal registries, and curated gifting experiences crafted for life's most cherished moments.
            </p>
            <Link href="/client-portal" className="flex items-center gap-space-sm text-[#C5A880] hover:text-white transition-colors group">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span className="font-label-sm text-label-sm tracking-widest group-hover:underline">
                CUSTOMER PORTAL · MY ACCOUNT →
              </span>
            </Link>
          </div>

          {/* Shop Collection */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-title-sm text-title-sm text-[#FAF8F5] tracking-wider uppercase mb-space-xs font-semibold">
              Shop Collection
            </h4>
            <Link href="/wedding-keepsakes" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Wedding Favors &amp; Hampers
            </Link>
            <Link href="/personalized" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Custom Initials Suites
            </Link>
            <Link href="/collections" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Bridal Party Gifts
            </Link>
            <Link href="/bespoke" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Wedding Essentials Packaging
            </Link>
            <Link href="/offers" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Curated Celebration Boxes
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-title-sm text-title-sm text-[#FAF8F5] tracking-wider uppercase mb-space-xs font-semibold">
              Company
            </h4>
            <Link href="/client-portal" className="font-body-sm text-body-sm text-[#C5A880] hover:text-white font-medium transition-colors py-0.5">
              My Account
            </Link>
            <Link href="/about" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Our Story
            </Link>
            <Link href="/contact#salons" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Showrooms &amp; Studios
            </Link>
            <Link href="/bulk-orders" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Corporate &amp; Bulk Orders
            </Link>
            <Link href="/return-policy" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Care Instructions
            </Link>
            <Link href="/faq" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              FAQ &amp; Help Center
            </Link>
            <Link href="/contact" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Support &amp; Appointments
            </Link>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-title-sm text-title-sm text-[#FAF8F5] tracking-wider uppercase mb-space-xs font-semibold">
              Connect
            </h4>
            <p className="font-body-sm text-body-sm text-[#B8AEA3] mb-space-xs">
              Showrooms: Jubilee Hills, Hyderabad • Indiranagar, Bengaluru
            </p>
            <p className="font-body-sm text-body-sm text-[#B8AEA3]">
              Inquiries: <a href="mailto:shahnawazalirkl@gmail.com" className="hover:text-[#FAF8F5] transition-colors">shahnawazalirkl@gmail.com</a>
            </p>
            <p className="font-body-sm text-body-sm text-[#B8AEA3]">
              Appointments: <a href="tel:+919692668263" className="hover:text-[#FAF8F5] transition-colors">+91 96926 68263</a>
            </p>
            <Link href="/contact" className="font-label-sm text-[11px] text-[#C5A880] hover:underline mb-space-sm inline-block">
              Book a Private Consultation →
            </Link>
            <div className="flex items-center gap-space-xs text-[#FAF8F5]">
              <span className="material-symbols-outlined text-[20px] text-[#C5A880]">local_shipping</span>
              <span className="font-label-sm text-label-sm text-[#B8AEA3]">Insured Global Delivery</span>
            </div>
          </div>
        </div>

        {/* ================= MOBILE COLLAPSIBLE ACCORDIONS (md:hidden) ================= */}
        <div className="md:hidden flex flex-col gap-6 pb-space-lg border-b border-[#2E2B28]">
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-2 inline-block">
              <img
                src="/assets/cdn/img_cfbb18b97ef1.png"
                alt="ASRA Wedding Canvas"
                className="h-12 w-auto object-contain brightness-0 invert hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="font-label-sm text-[10px] text-[#C5A880] tracking-[0.2em] uppercase mb-2">
              Create More Than a Gift • Create a Memory
            </p>
            <p className="font-body-sm text-xs text-[#B8AEA3] leading-relaxed max-w-xs mb-3">
              Artisanal custom wedding gifts, registries, and keepsake suites crafted for life's most cherished moments.
            </p>
            <Link
              href="/client-portal"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#242220] border border-[#3A3632] text-[#C5A880] hover:text-white text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="font-label-sm text-[11px] tracking-wider uppercase font-semibold">
                Client Portal · My Account →
              </span>
            </Link>
          </div>

          {/* Accordion Stack */}
          <div className="space-y-2.5">
            {/* Accordion 1: Shop Collection */}
            <div className="border border-[#2E2B28] rounded-xl bg-[#1F1D1B] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('shop')}
                className="w-full py-3.5 px-4 flex items-center justify-between text-left text-[#FAF8F5] hover:text-[#C5A880] transition-colors"
                aria-expanded={openSections.shop}
              >
                <span className="font-title-sm text-xs tracking-wider uppercase font-semibold">
                  Shop Collection
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#C5A880] transition-transform duration-300 ${
                    openSections.shop ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openSections.shop && (
                <div className="px-4 pb-3.5 pt-1 border-t border-[#2E2B28]/60 flex flex-col gap-1.5 text-xs animate-in fade-in-0 duration-200">
                  <Link href="/wedding-keepsakes" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Wedding Favors &amp; Hampers
                  </Link>
                  <Link href="/personalized" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Custom Initials Suites
                  </Link>
                  <Link href="/collections" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Bridal Party Gifts
                  </Link>
                  <Link href="/bespoke" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Wedding Essentials Packaging
                  </Link>
                  <Link href="/offers" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Curated Celebration Boxes
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion 2: Company */}
            <div className="border border-[#2E2B28] rounded-xl bg-[#1F1D1B] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('company')}
                className="w-full py-3.5 px-4 flex items-center justify-between text-left text-[#FAF8F5] hover:text-[#C5A880] transition-colors"
                aria-expanded={openSections.company}
              >
                <span className="font-title-sm text-xs tracking-wider uppercase font-semibold">
                  Company &amp; Care
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#C5A880] transition-transform duration-300 ${
                    openSections.company ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openSections.company && (
                <div className="px-4 pb-3.5 pt-1 border-t border-[#2E2B28]/60 flex flex-col gap-1.5 text-xs animate-in fade-in-0 duration-200">
                  <Link href="/client-portal" className="text-[#C5A880] hover:text-white font-medium transition-colors py-1 block">
                    My Account Vault
                  </Link>
                  <Link href="/about" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Our Story &amp; Heritage
                  </Link>
                  <Link href="/contact#salons" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Showrooms &amp; Studios
                  </Link>
                  <Link href="/bulk-orders" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Corporate &amp; Bulk Orders
                  </Link>
                  <Link href="/return-policy" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Care Instructions
                  </Link>
                  <Link href="/faq" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    FAQ &amp; Help Center
                  </Link>
                  <Link href="/contact" className="text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-1 block">
                    Support &amp; Appointments
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion 3: Connect & Salons */}
            <div className="border border-[#2E2B28] rounded-xl bg-[#1F1D1B] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('connect')}
                className="w-full py-3.5 px-4 flex items-center justify-between text-left text-[#FAF8F5] hover:text-[#C5A880] transition-colors"
                aria-expanded={openSections.connect}
              >
                <span className="font-title-sm text-xs tracking-wider uppercase font-semibold">
                  Connect &amp; Salons
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#C5A880] transition-transform duration-300 ${
                    openSections.connect ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openSections.connect && (
                <div className="px-4 pb-3.5 pt-1 border-t border-[#2E2B28]/60 flex flex-col gap-2 text-xs animate-in fade-in-0 duration-200">
                  <p className="text-[#B8AEA3] leading-relaxed">
                    Showrooms: Jubilee Hills, Hyderabad • Indiranagar, Bengaluru
                  </p>
                  <p className="text-[#B8AEA3]">
                    Inquiries:{' '}
                    <a href="mailto:shahnawazalirkl@gmail.com" className="hover:text-[#FAF8F5] transition-colors text-[#C5A880]">
                      shahnawazalirkl@gmail.com
                    </a>
                  </p>
                  <p className="text-[#B8AEA3]">
                    Appointments:{' '}
                    <a href="tel:+919692668263" className="hover:text-[#FAF8F5] transition-colors text-[#C5A880]">
                      +91 96926 68263
                    </a>
                  </p>
                  <Link href="/contact" className="font-label-sm text-[11px] text-[#C5A880] hover:underline pt-0.5 inline-block">
                    Book a Private Consultation →
                  </Link>
                  <div className="flex items-center gap-2 text-[#FAF8F5] pt-1">
                    <span className="material-symbols-outlined text-[18px] text-[#C5A880]">local_shipping</span>
                    <span className="font-label-sm text-xs text-[#B8AEA3]">Insured Global Delivery</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Rights & Payment Badges */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-col sm:flex-row items-center gap-space-sm text-center sm:text-left">
            <p className="font-label-sm text-xs text-[#8C7A6B]">
              © 2026 ASRAWEDDINGCANVAS Private Limited. All Rights Reserved.
            </p>
            <div className="hidden sm:block text-[#8C7A6B]">•</div>
            <div className="flex items-center gap-space-sm flex-wrap justify-center font-label-sm text-xs text-[#8C7A6B]">
              <Link href="/privacy-policy" className="hover:text-[#FAF8F5] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-[#FAF8F5] transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/return-policy" className="hover:text-[#FAF8F5] transition-colors">
                Shipping &amp; Returns
              </Link>
              <span>•</span>
              <Link href="/faq" className="hover:text-[#FAF8F5] transition-colors">
                Help &amp; FAQs
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-space-xs flex-wrap justify-center">
            <span className="px-2 py-1 bg-[#242220] rounded border border-[#3A3632] font-label-sm text-[10px] text-[#C5A880] tracking-wider uppercase">
              UPI
            </span>
            <span className="px-2 py-1 bg-[#242220] rounded border border-[#3A3632] font-label-sm text-[10px] text-[#C5A880] tracking-wider uppercase">
              VISA
            </span>
            <span className="px-2 py-1 bg-[#242220] rounded border border-[#3A3632] font-label-sm text-[10px] text-[#C5A880] tracking-wider uppercase">
              MASTERCARD
            </span>
            <span className="px-2 py-1 bg-[#242220] rounded border border-[#3A3632] font-label-sm text-[10px] text-[#C5A880] tracking-wider uppercase">
              AMEX
            </span>
            <span className="px-2 py-1 bg-[#242220] rounded border border-[#3A3632] font-label-sm text-[10px] text-[#C5A880] tracking-wider uppercase">
              NET BANKING
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
