"use client";

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { CATEGORIES, CATEGORY_SLUG_MAP, resolveCategory } from '@/lib/collections';


interface CollectionsFilterPillsProps {
  totalCount: number;
}

export default function CollectionsFilterPills({ totalCount }: CollectionsFilterPillsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentCategory = resolveCategory(
    searchParams?.get('category') || searchParams?.get('cat')
  );

  const handleSelectCategory = (category: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString() || '');
      if (category === 'All Collections') {
        params.delete('category');
        params.delete('cat');
      } else {
        const slug = Object.keys(CATEGORY_SLUG_MAP).find(
          (k) => CATEGORY_SLUG_MAP[k] === category
        );
        params.set('category', slug || category);
      }
      const newQuery = params.toString();
      router.push(newQuery ? `${pathname}?${newQuery}` : pathname, { scroll: false });
    });
  };

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 -mx-1 px-1 touch-pan-x"
      id="collections-tab-bar"
    >
      {CATEGORIES.map((category) => {
        const isActive = currentCategory === category;
        const label =
          category === 'All Collections'
            ? `All Collections (${totalCount})`
            : category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => handleSelectCategory(category)}
            disabled={isPending}
            className={`snap-start shrink-0 min-h-[38px] px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-300 cursor-pointer font-medium touch-manipulation active:scale-95 ${
              isActive
                ? 'bg-primary text-on-primary shadow-xs font-semibold ring-1 ring-primary/50'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant/30'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
