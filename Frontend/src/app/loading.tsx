import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading ASRA Wedding Canvas"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface/90 backdrop-blur-md transition-opacity duration-300"
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Decorative Ambient Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Center Spinner Ring & Brand Logo */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Subtle Outer Spinner Ring */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-primary-fixed-dim/40 border-t-primary animate-spin" />
          
          {/* Inner Pulsing Ring */}
          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-primary/20 animate-pulse" />

          {/* ASRA Wedding Canvas Logo */}
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <Image
              src="/assets/cdn/img_c432d69126c7.png"
              alt="ASRA Wedding Canvas"
              width={64}
              height={64}
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm select-none"
              priority
            />
          </div>
        </div>

        {/* Brand Title */}
        <h2 className="font-serif tracking-[0.28em] text-xs uppercase text-primary font-semibold mb-1.5">
          ASRA Wedding Canvas
        </h2>

        {/* Subtitle / Status Text */}
        <p className="font-serif italic text-xs sm:text-sm text-on-surface-variant/80 tracking-wide mb-4">
          Curating bespoke bridal luxuries...
        </p>

        {/* Elegant Indeterminate Progress Bar */}
        <div className="w-36 h-[2px] bg-outline-variant/30 rounded-full overflow-hidden relative">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        </div>

        <span className="sr-only">Loading page content, please wait...</span>
      </div>
    </div>
  );
}
