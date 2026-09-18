import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const BulkHero = ({ onOpenSampleModal, onScrollToSection, refs }) => {
  return (
    <section className="w-full bg-surface-container-low py-8 sm:py-10 lg:py-14 border-b border-outline-variant/30">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF4EB] border border-primary/20 rounded-full mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
                Volume Privileges &amp; Event Concierge
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-[1.18] tracking-tight text-on-surface mb-4">
              Curated Wedding Favors &amp; Bespoke Bulk Gifting for Grand Celebrations
            </h1>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl mb-6">
              From 25 intimate keepsakes to 5,000+ guest royal gala suites. Handcrafted in India with complimentary custom couple initial brass dies, volume tiered pricing, and direct-to-venue white-glove transit worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                onClick={() => onScrollToSection(refs?.inquiryFormRef)}
                className="text-xs uppercase tracking-wider font-semibold"
                size="lg"
              >
                <span>Book Concierge Consultation</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => onScrollToSection(refs?.calculatorRef)}
                className="text-xs uppercase tracking-wider font-semibold"
                size="lg"
              >
                <span className="material-symbols-outlined text-primary text-[16px]">calculate</span>
                <span>Estimate Bulk Pricing</span>
              </Button>

              <Button
                variant="secondary"
                onClick={onOpenSampleModal}
                className="text-xs uppercase tracking-wider font-semibold bg-[#FAF4EB] text-primary border border-primary/30 hover:bg-[#F3E7D3]"
                size="lg"
              >
                <span className="material-symbols-outlined text-primary text-[16px]">inventory</span>
                <span>Request Sample Box</span>
              </Button>
            </div>
          </div>

          {/* Hero Embellishment Graphic */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-md border border-outline-variant/30 group transition-all duration-300">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                alt="Deluxe pastel pink bridal welcome hamper wrapped in pure silk ribbon with custom gold foil ASRA crest"
                src="/assets/cdn/img_ce96f997d2cf.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <Badge variant="secondary" className="w-fit mb-1 bg-[#FAF4EB]/90 text-primary uppercase tracking-widest text-[9px] font-bold">
                  Masterpiece Suite
                </Badge>
                <p className="font-serif text-lg sm:text-xl font-medium text-white leading-snug">
                  The Imperial Royal Guest Suite
                </p>
                <p className="text-xs text-stone-300 mt-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-400 text-[14px]">location_on</span>
                  <span>Delivered to The Oberoi Udaivilas, Udaipur</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Value Assurance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 pt-2">
          <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">25+ Minimum Units</h4>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                Flexible collection tiering suited for intimate bridesmaid hampers up to 5,000+ guest royal galas.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Complimentary Brass Die</h4>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                Bespoke couple crest or corporate logo CNC-machined brass die for deep 24k gold hot-stamping.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Direct Venue Logistics</h4>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                Temperature-controlled white-glove dispatch with resort room placement across 140+ global destinations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkHero;
