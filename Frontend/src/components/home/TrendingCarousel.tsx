"use client";

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/common/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

interface ProductItem {
  id: string;
  title: string;
  price: number;
  image: string;
  originalPrice?: number;
  slug?: string;
  [key: string]: unknown;
}

interface TrendingCarouselProps {
  products: ProductItem[];
  totalCount?: number;
}

export default function TrendingCarousel({
  products,
  totalCount,
}: TrendingCarouselProps) {
  return (
    <Carousel opts={{ align: 'start' }} className="w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3">
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary font-semibold block mb-1">
            Handpicked Favorites
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal leading-tight">
            Trending Wedding Keepsakes &amp; Favors
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-outline-variant/50 rounded-lg p-0.5 bg-surface-container-lowest shadow-xs">
            <CarouselPrevious className="static translate-y-0 h-8 w-8 rounded-full border-0 bg-transparent hover:bg-surface-container-high text-on-surface transition-colors" />
            <CarouselNext className="static translate-y-0 h-8 w-8 rounded-full border-0 bg-transparent hover:bg-surface-container-high text-on-surface transition-colors" />
          </div>
          <Link
            href="/shop"
            className="font-sans text-xs text-on-surface font-semibold hover:text-primary transition-colors flex items-center gap-1 px-2.5 py-1.5 uppercase tracking-wider"
          >
            <span>View All {totalCount !== undefined ? `(${totalCount})` : ''}</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Scroll Track using Carousel */}
      <CarouselContent className="-ml-3 sm:-ml-4 lg:-ml-5 pb-3">
        {products.map((prod) => (
          <CarouselItem
            key={prod.id}
            className="pl-3 sm:pl-4 lg:pl-5 basis-[210px] sm:basis-[240px] md:basis-[260px] shrink-0 grow-0"
          >
            <ProductCard product={prod as any} aspectRatio="square" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
