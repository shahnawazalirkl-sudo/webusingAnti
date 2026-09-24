"use client";

import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export interface ProductCardActionProps {
  product: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image?: string;
    craft?: string;
    editions?: unknown[];
    slug?: string;
    [key: string]: unknown;
  };
  productUrl?: string;
  className?: string;
}

/**
 * Interactive Wishlist button for ProductCard with Sonner toast feedback.
 */
export function ProductCardWishlistButton({
  product,
  className = '',
}: {
  product: ProductCardActionProps['product'];
  className?: string;
}) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const willBeWishlisted = !isLiked;
    toggleWishlist(product);

    if (willBeWishlisted) {
      toast.success(`Saved "${product.title}" to Wishlist`, {
        description: 'Item is now saved in your wedding keepsakes wishlist.',
      });
    } else {
      toast.info(`Removed "${product.title}" from Wishlist`);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      aria-label={isLiked ? `Remove ${product.title} from Wishlist` : `Add ${product.title} to Wishlist`}
      className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface hover:text-rose-600 flex items-center justify-center transition-all shadow-xs z-10 ${className}`}
      type="button"
    >
      <span
        className={`material-symbols-outlined text-[18px] transition-colors ${
          isLiked ? 'text-rose-600' : 'text-outline hover:text-rose-600'
        }`}
        style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
      >
        favorite
      </span>
    </button>
  );
}

/**
 * Interactive Quick Action button (Add to Cart / Personalize Now) with toast notification.
 */
export function ProductCardQuickAction({
  product,
  productUrl,
  className = '',
}: {
  product: ProductCardActionProps['product'];
  productUrl: string;
  className?: string;
}) {
  const { addToCart } = useCart();
  const isCustomizable = Boolean(product.craft || (product.editions && product.editions.length > 0));

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`Added "${product.title}" to Cart`, {
      description: 'You can review and personalize your items in your bag.',
    });
  };

  if (isCustomizable) {
    return (
      <Link
        href={productUrl}
        className={`flex-1 py-2 rounded-lg bg-inverse-surface text-inverse-on-surface font-label-md text-label-md hover:bg-primary transition-colors text-center shadow-md flex items-center justify-center gap-1.5 ${className}`}
      >
        <span className="material-symbols-outlined text-[16px]">draw</span>
        <span>Personalize Now</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleQuickAddToCart}
      className={`flex-1 py-2 rounded-lg bg-primary text-on-primary font-label-md text-[13px] font-semibold hover:bg-primary/90 transition-colors text-center shadow-md flex items-center justify-center gap-1.5 ${className}`}
    >
      <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
      <span>Add to Cart</span>
    </button>
  );
}

export default function ProductCardActions({
  product,
  productUrl = `/product/${product.slug || product.id}`,
}: ProductCardActionProps) {
  return (
    <>
      <ProductCardWishlistButton product={product} />
      <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 z-10">
        <ProductCardQuickAction product={product} productUrl={productUrl} />
      </div>
    </>
  );
}
