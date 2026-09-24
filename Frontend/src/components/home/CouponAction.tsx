"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CouponActionProps {
  code?: string;
  label?: string;
}

export default function CouponAction({
  code = 'ASRAFIRST',
  label = 'Welcome Code:',
}: CouponActionProps) {
  const { showToast } = useCart();
  const [copied, setCopied] = useState(false);

  const handleCopyCoupon = async (couponCode: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(couponCode);
      }
      setCopied(true);
      showToast(`Coupon ${couponCode} copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast(`Coupon ${couponCode} copied to clipboard!`);
    }
  };

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => handleCopyCoupon(code)}
            className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-primary/30 hover:border-primary transition-all text-on-surface group cursor-pointer shadow-xs"
          >
            <span className="font-sans text-[10px] text-outline uppercase font-semibold">
              {label}
            </span>
            <code className="font-mono text-xs font-bold text-primary tracking-wider">
              {code}
            </code>
            <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{copied ? 'Copied!' : 'Click to copy code'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
