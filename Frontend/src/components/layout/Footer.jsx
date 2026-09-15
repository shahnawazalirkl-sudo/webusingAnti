import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#181716] text-[#FAF8F5] pt-space-xl pb-space-lg mt-space-xl">
      <div className="max-w-[1360px] mx-auto px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl border-b border-[#2E2B28]">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 flex flex-col pr-space-lg">
            <Link to="/" className="mb-space-sm inline-block">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGLApMmbn_kgOFcov080VR_D8RTlk7ukPnIxBZ2_jnZjEeV1EjkWAJF13QFjI44HnvCC1tWaM5nXH69B4OveIuVU2vH0TLvYkOpTGPOifkd-3GsrFonXfvLN39RzuiMIM21u76hdThfIOIJKKaLbqgW2NRl-aXJZuLMpKb7Muat1a23tiVcpBEshEjuiunXJb9SP3BvcJjkStrzTfN4NQuIaGe2g6CgP5sY3hb7u34t77ww516wcDJm24dKA2PdxV_Li4"
                alt="ASRA Wedding Canvas"
                className="h-14 w-auto object-contain brightness-0 invert hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="font-label-sm text-label-sm text-[#C5A880] tracking-[0.2em] mb-space-md">
              CREATE MORE THAN A GIFT • CREATE A MEMORY
            </p>
            <p className="font-body-sm text-body-sm text-[#B8AEA3] leading-relaxed mb-space-md max-w-sm">
              ASRA WEDDING CANVAS is dedicated to the bespoke artistry of eternal wedding keepsakes, artisanal registries, and curated gifting experiences crafted for life's most cherished moments.
            </p>
            <div className="flex items-center gap-space-sm text-[#C5A880]">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span className="font-label-sm text-label-sm tracking-widest text-[#FAF8F5]">
                ATELIER PRIVILEGE SUITE
              </span>
            </div>
          </div>

          {/* Shop Atelier */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-title-sm text-title-sm text-[#FAF8F5] tracking-wider uppercase mb-space-xs font-semibold">
              Shop Atelier
            </h4>
            <Link to="/wedding-keepsakes" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Wedding Favors &amp; Hampers
            </Link>
            <Link to="/personalized" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Custom Monogram Suites
            </Link>
            <Link to="/collections" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Bridal Party Keepsakes
            </Link>
            <Link to="/bespoke" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Trousseau Packaging
            </Link>
            <Link to="/offers" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Curated Celebration Boxes
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-title-sm text-title-sm text-[#FAF8F5] tracking-wider uppercase mb-space-xs font-semibold">
              Company
            </h4>
            <Link to="/about" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Our Heritage Story
            </Link>
            <Link to="/about#salons" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Artisans &amp; Studio
            </Link>
            <Link to="/bulk-orders" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Corporate Privileges
            </Link>
            <Link to="/return-policy" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Care Instructions
            </Link>
            <Link to="/track-order" className="font-body-sm text-body-sm text-[#B8AEA3] hover:text-[#C5A880] transition-colors py-0.5">
              Concierge Desk
            </Link>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-title-sm text-title-sm text-[#FAF8F5] tracking-wider uppercase mb-space-xs font-semibold">
              Connect
            </h4>
            <p className="font-body-sm text-body-sm text-[#B8AEA3] mb-space-xs">
              Atelier Flagship: Jubilee Hills, Hyderabad • Indiranagar, Bengaluru
            </p>
            <p className="font-body-sm text-body-sm text-[#B8AEA3]">
              Inquiries: concierge@asraweddingcanvas.com
            </p>
            <p className="font-body-sm text-body-sm text-[#B8AEA3] mb-space-sm">
              Appointments: <a href="tel:+919692668263" className="hover:text-[#FAF8F5] transition-colors">+91 96926 68263</a>
            </p>
            <div className="flex items-center gap-space-xs text-[#FAF8F5]">
              <span className="material-symbols-outlined text-[20px] text-[#C5A880]">local_shipping</span>
              <span className="font-label-sm text-label-sm text-[#B8AEA3]">Insured Global Delivery</span>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Payment Badges */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-col sm:flex-row items-center gap-space-sm text-center sm:text-left">
            <p className="font-label-sm text-label-sm text-[#8C7A6B]">
              © 2026 ASRAWEDDINGCANVAS Private Limited. All Rights Reserved.
            </p>
            <div className="hidden sm:block text-[#8C7A6B]">•</div>
            <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-[#8C7A6B]">
              <Link to="/return-policy" className="hover:text-[#FAF8F5] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/return-policy" className="hover:text-[#FAF8F5] transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/return-policy" className="hover:text-[#FAF8F5] transition-colors">
                Shipping &amp; Returns
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-space-xs flex-wrap justify-center">
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
