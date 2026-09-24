"use client";

import Image from 'next/image';
import React from 'react';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCardWishlistButton, ProductCardQuickAction } from '@/components/shop/ProductCardActions';

const ProductCard = ({ product, aspectRatio = 'square', className = '' }: any) => {

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const productUrl = `/product/${product.slug || product.id}`;

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
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-label-sm text-[10px] font-bold tracking-wider uppercase shadow-xs">
              {product.badge}
            </span>
          )}
          {(product.deliveryBadge || product.secondaryBadge) && (
            <span className="bg-surface-container-lowest/90 backdrop-blur-xs text-on-surface px-2 py-0.5 rounded font-label-sm text-[9px] tracking-wider uppercase shadow-xs">
              {product.deliveryBadge || product.secondaryBadge}
            </span>
          )}
        </div>

        {/* Wishlist CTA Button */}
        <ProductCardWishlistButton product={product} />

        {/* Hover Quick Action Slide-up */}
        <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 z-10">
          <ProductCardQuickAction product={product} productUrl={productUrl} />
        </div>
      </div>

      {/* Content Details - Compact Height */}
      <CardContent className="p-3 flex flex-col flex-1 justify-between gap-1">
        <div className="flex flex-col gap-0.5">
          <span className="font-label-sm text-[9px] text-primary tracking-[0.2em] uppercase font-semibold">
            {product.techniqueTag || product.categoryLabel || 'Collection'}
          </span>
          <Link href={productUrl}>
            <h3 className="font-headline-sm text-xs sm:text-sm font-semibold text-on-surface group-hover:text-primary transition-colors leading-tight line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 pt-0.5">
            <div className="flex text-amber-700">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-title-sm text-[11px] font-semibold text-on-surface">
              {product.rating || '4.9'}
            </span>
            <span className="font-body-sm text-[10px] text-outline">
              ({product.reviewCount || 98})
            </span>
          </div>
        </div>

        {/* Price & Forward Link */}
        <div className="flex items-baseline justify-between pt-1 border-t border-outline-variant/20 mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-body-sm text-[10px] text-outline line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent && (
              <span className="font-label-sm text-[9px] text-secondary font-bold bg-secondary-container/40 px-1 py-0.2 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          <Link
            href={productUrl}
            className="text-outline hover:text-primary transition-colors"
            aria-label={`View details for ${product.title}`}
          >
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
