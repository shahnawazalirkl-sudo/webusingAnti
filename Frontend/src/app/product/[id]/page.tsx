import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCTS } from '@/data/productsData';
import ProductDetailClient from '@/components/product/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.slug || product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find(
    (p) => p.id === id || p.slug === id || (p.aliases && p.aliases.includes(id))
  ) || PRODUCTS[0];

  const title = `${product.title} | ASRA Wedding Canvas`;
  const description =
    product.shortDescription ||
    product.description ||
    'Luxury personalized wedding keepsakes, bridal essentials, and heirloom gifts handcrafted by ASRA Wedding Canvas.';
  const ogImageUrl = product.image?.startsWith('http')
    ? product.image
    : `https://asraweddingcanvas.com${product.image || '/assets/cdn/img_eafddfa4ed3e.jpg'}`;
  const canonicalUrl = `https://asraweddingcanvas.com/product/${product.slug || product.id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ASRA Wedding Canvas',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Find product or fallback to Sovereign Suite (Flagship)
  const product = PRODUCTS.find(
    (p) => p.id === id || p.slug === id || (p.aliases && p.aliases.includes(id))
  ) || PRODUCTS[0];

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface antialiased pb-28 md:pb-0">
      {/* Breadcrumb Navigation Bar (Server Component) */}
      <nav aria-label="Breadcrumb" className="w-full bg-surface-container-low px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-on-surface-variant overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-outline-variant font-serif">/</span>
          <Link href="/collections" className="hover:text-primary transition-colors">Wedding</Link>
          <span className="text-outline-variant font-serif">/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Curated Catalog</Link>
          <span className="text-outline-variant font-serif">/</span>
          <span className="text-on-surface font-semibold truncate">{product.title}</span>
        </div>
      </nav>

      {/* Client-Interactive Product Customizer & Presentation */}
      <ProductDetailClient product={product} />
    </div>
  );
}
