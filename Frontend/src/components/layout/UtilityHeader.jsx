import React from 'react';
import { Link } from 'react-router-dom';

const UtilityHeader = ({ backTo = '/', backText = 'Return to Collection Portal', badgeText = '256-Bit Encrypted Docket' }) => {
  return (
    <header className="bg-white border-b border-brand-border py-3 px-4 sm:px-8 md:px-12 sticky top-0 z-40">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between">
        {/* Left: Return Navigation Link */}
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-brand-muted hover:text-brand-charcoal transition-colors group"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span>{backText}</span>
        </Link>

        {/* Center: Atelier Brand Emblem */}
        <div className="flex items-center justify-center">
          <Link to="/">
            <img
              alt="ASRA Wedding Canvas Crest"
              className="h-10 w-auto object-contain"
              src="/assets/cdn/img_016731a0c986.png"
            />
          </Link>
        </div>

        {/* Right: Security & Live Status Badges */}
        <div className="flex items-center gap-4 text-[11px]">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-brand-emeraldLight text-brand-emerald font-medium rounded-full border border-[#D3E5DC]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse-slow"></span>
            <span>White-Glove Protocol</span>
          </div>
          <div className="flex items-center gap-1 text-brand-muted">
            <span className="material-symbols-outlined text-brand-gold text-[16px]">lock</span>
            <span className="tracking-tight hidden md:inline">{badgeText}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UtilityHeader;
