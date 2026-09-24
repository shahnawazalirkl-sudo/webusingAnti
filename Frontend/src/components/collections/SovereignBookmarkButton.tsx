"use client";

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface SovereignBookmarkButtonProps {
  productId?: string;
}

export default function SovereignBookmarkButton({
  productId = 'sovereign-bridal-suite',
}: SovereignBookmarkButtonProps) {
  const { isWishlisted, toggleWishlist } = useWishlist() as {
    isWishlisted: (id: string) => boolean;
    toggleWishlist: (p: unknown) => void;
  };

  const isBookmarked = isWishlisted(productId);

  const handleBookmark = () => {
    toggleWishlist(productId);
    if (isBookmarked) {
      toast.info('Removed The Sovereign Suite from your Wishlist');
    } else {
      toast.success('Saved The Sovereign Suite to your Wishlist');
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleBookmark}
            aria-label={isBookmarked ? 'Remove from Wishlist' : 'Bookmark Suite'}
            className="h-11 w-11 min-h-[44px] min-w-[44px] touch-manipulation shrink-0"
          >
            <span
              className={`material-symbols-outlined text-[18px] transition-colors ${
                isBookmarked ? 'text-rose-600' : 'text-outline hover:text-primary'
              }`}
            >
              {isBookmarked ? 'bookmark_added' : 'bookmark'}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? 'Remove from Wishlist' : 'Bookmark Suite'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
