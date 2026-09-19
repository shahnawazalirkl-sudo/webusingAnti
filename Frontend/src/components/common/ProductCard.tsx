import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ product, aspectRatio = 'square', className = '' }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useRouter();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const productUrl = `/product/${product.slug || product.id}`;

  const handleQuickAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className={`group relative flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-md border-outline-variant/30 hover:border-primary/40 transition-all duration-300 ${className}`}>
      {/* Media Container */}
      <div className={`relative w-full ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden bg-surface-container-low`}>
        <Link href={productUrl} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none max-w-[calc(100%-36px)]">
          {product.badge && (
            <span className="bg-secondary-container text-on-secondary-container px-1.5 sm:px-2 py-0.5 rounded font-label-sm text-[8px] sm:text-[9px] font-bold tracking-wider uppercase shadow-xs truncate max-w-full">
              {product.badge}
            </span>
          )}
          {(product.deliveryBadge || product.secondaryBadge) && (
            <span className="bg-surface-container-lowest/90 backdrop-blur-xs text-on-surface px-1.5 sm:px-2 py-0.5 rounded font-label-sm text-[8px] sm:text-[9px] tracking-wider uppercase shadow-xs truncate max-w-full">
              {product.deliveryBadge || product.secondaryBadge}
            </span>
          )}
        </div>

        {/* Wishlist CTA Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Add to Wishlist"
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface hover:text-rose-600 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-xs z-10 cursor-pointer touch-manipulation"
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[16px] sm:text-[18px] transition-colors ${
              isLiked ? 'text-rose-600' : 'text-outline hover:text-rose-600'
            }`}
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Hover Quick Action Slide-up for Desktop */}
        <div className="hidden md:flex absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 gap-2 z-10 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handleQuickAction}
            className="flex-1 py-2 rounded-lg bg-inverse-surface text-inverse-on-surface font-label-md text-xs hover:bg-primary transition-colors text-center shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">draw</span>
            <span>Personalize Now</span>
          </button>
        </div>
      </div>

      {/* Content Details - Compact Height */}
      <CardContent className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-1">
        <div className="flex flex-col gap-0.5">
          <span className="font-label-sm text-[8px] sm:text-[9px] text-primary tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold truncate">
            {product.techniqueTag || product.categoryLabel || 'Collection'}
          </span>
          <Link href={productUrl}>
            <h3 className="font-headline-sm text-xs sm:text-sm font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2 min-h-[2rem]">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 pt-0.5">
            <div className="flex text-amber-700">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[11px] sm:text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-title-sm text-[10px] sm:text-[11px] font-semibold text-on-surface">
              {product.rating || '4.9'}
            </span>
            <span className="font-body-sm text-[9px] sm:text-[10px] text-outline">
              ({product.reviewCount || 98})
            </span>
          </div>
        </div>

        {/* Price & Add to Bag */}
        <div className="flex items-center justify-between pt-1.5 border-t border-outline-variant/20 mt-1 gap-1">
          <div className="flex items-baseline flex-wrap gap-1 sm:gap-1.5">
            <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface whitespace-nowrap">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-body-sm text-[9px] sm:text-[10px] text-outline line-through whitespace-nowrap">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent && (
              <span className="font-label-sm text-[8px] sm:text-[9px] text-secondary font-bold bg-secondary-container/40 px-1 py-0.2 rounded whitespace-nowrap">
                {discountPercent}%
              </span>
            )}
          </div>
          <button
            onClick={handleQuickAction}
            aria-label={`Add ${product.title} to Bag`}
            title="Add to Bag"
            className="w-8 h-8 sm:w-8 sm:h-8 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary flex items-center justify-center transition-all duration-200 active:scale-90 shrink-0 cursor-pointer touch-manipulation"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[17px]">shopping_bag</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
