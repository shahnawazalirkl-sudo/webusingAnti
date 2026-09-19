"use client";
import Image from "next/image";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Edit, ArrowRight } from 'lucide-react';

const FALLBACK_IMAGE = '/assets/cdn/img_11a57511dc47.jpg';

const WeddingQuickViewDialog = ({
  product,
  open,
  onOpenChange,
  onOpenCustomizer,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setActivePhotoIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const currentImage =
    (product.gallery && product.gallery[activePhotoIndex]) ||
    product.image ||
    FALLBACK_IMAGE;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-6">
        <DialogHeader className="pb-3 border-b border-outline-variant/30 text-left">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-[#FAF4EB] text-primary border-primary/20 text-[10px] font-bold uppercase tracking-wider">
              {product.badge || 'Collection Masterpiece'}
            </Badge>
            <DialogTitle className="text-base font-semibold font-serif text-on-surface truncate">
              {product.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Photos & Thumbnails */}
          <div className="flex flex-col gap-2">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30 relative">
              <Image
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`${`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer shrink-0 transition-all ${
                                          activePhotoIndex === idx
                                            ? 'border-primary ring-1 ring-primary'
                                            : 'border-outline-variant/40 opacity-70 hover:opacity-100'
                                        }`} relative`}
                  >
                    <Image
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Inclusions */}
          <div className="flex flex-col justify-between text-xs">
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-xl font-normal text-on-surface">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-outline line-through font-sans">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-on-surface-variant leading-relaxed font-sans">
                {product.description || product.shortDescription}
              </p>

              {product.inclusions && product.inclusions.length > 0 && (
                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30">
                  <span className="font-semibold text-[11px] text-on-surface block mb-1 uppercase tracking-wider font-sans">
                    Collection Suite Inclusions:
                  </span>
                  <ul className="space-y-1 text-[11px] text-on-surface-variant font-sans">
                    {product.inclusions.slice(0, 4).map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-outline-variant/30 mt-4">
              <Button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onOpenCustomizer(product);
                }}
                className="w-full bg-primary hover:bg-[#5f4b2d] text-on-primary font-semibold uppercase tracking-wider text-xs gap-1.5 shadow-xs"
              >
                <Edit className="w-4 h-4" />
                <span>Customize This Piece</span>
              </Button>
              <Link
                href={`/product/${product.slug || product.id}`}
                onClick={() => onOpenChange(false)}
                className="w-full py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-primary hover:underline inline-flex items-center justify-center gap-1"
              >
                <span>View Comprehensive Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeddingQuickViewDialog;
