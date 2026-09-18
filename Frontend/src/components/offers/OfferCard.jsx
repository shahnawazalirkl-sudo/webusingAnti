import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const OfferCard = ({
  offer,
  variant = 'bank', // 'featured' | 'bank' | 'upi' | 'voucher'
  copiedCode,
  onCopy,
  onOpenTerms,
}) => {
  const isCopied = offer.code && copiedCode === offer.code;

  // 1. Featured Grand Banner Style
  if (variant === 'featured') {
    return (
      <div className="relative bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-6 sm:p-8 rounded-2xl shadow-md border border-outline-variant/40 flex flex-col justify-between overflow-hidden group">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
        
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant={offer.badgeVariant || 'gold'} className="font-bold text-[10px] uppercase tracking-widest">
                  {offer.badge}
                </Badge>
                {offer.validity && (
                  <span className="flex items-center gap-1 text-tertiary font-label-sm text-[11px]">
                    <span className="material-symbols-outlined text-[14px]">
                      {offer.validityIcon || 'schedule'}
                    </span>
                    {offer.validity}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface tracking-wide">
                {offer.title}
              </h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                {offer.description}
              </p>
            </div>

            {/* Partner Stamp */}
            <div className="px-3 py-2 bg-surface-container-highest rounded-lg text-center shrink-0 shadow-sm border border-outline-variant/20">
              <span className="font-label-sm text-label-sm font-bold text-on-surface tracking-wider block">
                {offer.partner}
              </span>
              {offer.partnerType && (
                <span className="font-label-sm text-[9px] text-primary uppercase tracking-widest block">
                  {offer.partnerType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Voucher Code Bar */}
        <div className="mt-6 pt-4 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px]">local_activity</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-outline">Coupon Code</span>
              <span className="font-mono text-xs font-bold text-primary tracking-wider">
                {offer.code}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => onCopy(offer.code, e)}
              type="button"
              variant="default"
              size="sm"
              className="px-4 py-2 uppercase tracking-wider text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isCopied ? 'done' : 'content_copy'}
              </span>
              <span>{isCopied ? 'Copied' : 'Copy Code'}</span>
            </Button>
            
            {onOpenTerms && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onOpenTerms(offer)}
                      aria-label="Terms and conditions"
                      type="button"
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">info</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Terms & Conditions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Standard Perforated Bank Ticket Card Style
  if (variant === 'bank') {
    return (
      <Card className="relative bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden border border-outline-variant/40">
        {/* Top Half */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded uppercase font-label-sm text-[11px] font-bold tracking-wider ${offer.partnerStyle || 'bg-surface-container-high text-on-surface'}`}>
              {offer.partner}
            </span>
            <Badge variant={offer.badgeVariant || 'gold'} className="text-[10px] uppercase font-bold tracking-wider">
              {offer.badge}
            </Badge>
          </div>
          <h3 className="font-serif text-base sm:text-lg font-medium text-on-surface mt-1">
            {offer.title}
          </h3>
          <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
            {offer.description}
          </p>
          {offer.applicable && (
            <div className="mt-3 flex items-center gap-1.5 text-on-surface-variant font-label-sm text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-primary">
                {offer.applicableIcon || 'verified'}
              </span>
              <span>Applicable on: {offer.applicable}</span>
            </div>
          )}
        </div>

        {/* Perforated Divider with Opposing Semicircle Cutouts */}
        <div className="relative w-full py-1">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-surface rounded-r-full shadow-inner" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-surface rounded-l-full shadow-inner" />
          <div className="w-full h-px border-b border-dashed border-outline-variant/80 px-4" />
        </div>

        {/* Bottom Voucher Half */}
        <div className="p-4 bg-surface-container-low flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-[9px] text-outline uppercase tracking-wider">
              {offer.isAutoApplied ? 'Auto Applied' : 'Offer Code'}
            </span>
            <span className="font-mono text-xs font-bold text-primary tracking-wider">
              {offer.code}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {offer.learnLink ? (
              <Link
                to={offer.learnLink}
                className="px-3.5 py-1.5 bg-[#FAF4EB] text-on-surface border border-outline-variant/30 hover:bg-primary hover:text-on-primary text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Learn
              </Link>
            ) : (
              <Button
                onClick={(e) => onCopy(offer.code, e)}
                type="button"
                variant="outline"
                size="sm"
                className="px-3.5 py-1.5 bg-on-surface text-surface-container-lowest hover:bg-primary hover:text-on-primary text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <span className="material-symbols-outlined text-[14px]">done</span>
                    <span>Copied</span>
                  </>
                ) : (
                  <span>Copy</span>
                )}
              </Button>
            )}

            {onOpenTerms && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onOpenTerms(offer)}
                      aria-label="Terms"
                      type="button"
                      className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">info</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Offer Terms</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // 3. UPI / Digital Wallet Cashback Style
  if (variant === 'upi') {
    return (
      <Card className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 bg-surface-container-high rounded font-label-sm text-[10px] font-bold tracking-wider">
              {offer.partner}
            </span>
            <span className={`font-label-sm text-label-sm font-semibold ${offer.rewardStyle || 'text-primary'}`}>
              {offer.reward}
            </span>
          </div>
          <h4 className="font-serif text-base font-medium leading-snug text-on-surface mt-2">
            {offer.title}
          </h4>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            {offer.description}
          </p>
        </div>

        {offer.code ? (
          <div className="mt-5 pt-2 flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/30">
            <span className="font-label-sm text-[11px] text-outline font-mono font-bold tracking-wider uppercase">
              Code: <span className="text-primary font-bold">{offer.code}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => onCopy(offer.code, e)}
                type="button"
                className="text-on-surface font-label-sm text-xs uppercase font-bold hover:text-primary transition-colors flex items-center gap-1"
              >
                {isCopied ? (
                  <span className="text-primary font-bold">Copied</span>
                ) : (
                  <span>Copy</span>
                )}
              </button>
              {onOpenTerms && (
                <button
                  onClick={() => onOpenTerms(offer)}
                  title="Terms"
                  type="button"
                  className="p-1 text-on-surface-variant hover:text-primary rounded"
                >
                  <span className="material-symbols-outlined text-[16px]">info</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-5 pt-2 flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/30">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-outline">
              {offer.footerText}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">
                {offer.footerIcon || 'check_circle'}
              </span>
              {onOpenTerms && (
                <button
                  onClick={() => onOpenTerms(offer)}
                  title="Terms"
                  type="button"
                  className="p-1 text-on-surface-variant hover:text-primary rounded"
                >
                  <span className="material-symbols-outlined text-[16px]">info</span>
                </button>
              )}
            </div>
          </div>
        )}
      </Card>
    );
  }

  // 4. Store Exclusive Voucher Style
  return (
    <Card className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Badge variant={offer.badgeVariant || 'gold'} className="text-[10px] uppercase font-bold tracking-wider">
            {offer.badge}
          </Badge>
          <span className={`font-title-sm text-title-sm font-bold ${offer.discountStyle || 'text-primary'}`}>
            {offer.discount}
          </span>
        </div>
        <h4 className="font-serif text-base font-medium leading-snug text-on-surface mt-1">
          {offer.title}
        </h4>
        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
          {offer.description}
        </p>
        <div className="mt-3 text-outline font-label-sm text-[11px]">
          {offer.subtext}
        </div>
      </div>

      <div className="mt-5 pt-2 flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/30">
        <span className="font-mono text-xs font-bold text-primary tracking-wider">
          {offer.code}
        </span>
        <div className="flex items-center gap-1.5">
          <Button
            onClick={(e) => onCopy(offer.code, e)}
            type="button"
            variant="outline"
            size="sm"
            className="px-3.5 py-1 bg-on-surface text-surface-container-lowest hover:bg-primary hover:text-on-primary text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1"
          >
            {isCopied ? (
              <>
                <span className="material-symbols-outlined text-[14px]">done</span>
                <span>Copied</span>
              </>
            ) : (
              <span>Copy</span>
            )}
          </Button>
          {onOpenTerms && (
            <button
              onClick={() => onOpenTerms(offer)}
              title="Terms"
              type="button"
              className="p-1 text-on-surface-variant hover:text-primary rounded"
            >
              <span className="material-symbols-outlined text-[16px]">info</span>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OfferCard;
