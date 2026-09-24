"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const MonogramPreviewStudio = dynamic(
  () => import('@/components/common/MonogramPreviewStudio'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full py-16 px-4 flex items-center justify-center bg-surface-container-low animate-pulse">
        <span className="text-xs text-primary font-medium tracking-wider uppercase">
          Loading Monogram Studio...
        </span>
      </div>
    ),
  }
);

export default function HomeMonogramStudio() {
  return <MonogramPreviewStudio />;
}
