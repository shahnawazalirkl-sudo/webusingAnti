"use client";
import Image from "next/image";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, ShoppingBag, Minus, Plus } from 'lucide-react';

const FALLBACK_IMAGE = '/assets/cdn/img_11a57511dc47.jpg';

const CREST_OPTIONS = [
  'Classic Floral Crest',
  'Royal Serif Initials',
  'Contemporary Minimal Crest',
  'Botanical Wax Seal Die',
];

const WeddingCustomizerDialog = ({
  product,
  open,
  onOpenChange,
  onConfirmCustomization,
}) => {
  const [brideName, setBrideName] = useState('Asra');
  const [groomName, setGroomName] = useState('Shahnawaz');
  const [weddingDate, setWeddingDate] = useState('2026-11-18');
  const [crestStyle, setCrestStyle] = useState('Classic Floral Crest');
  const [selectedEdition, setSelectedEdition] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Sync edition and defaults when opening with a new product
  useEffect(() => {
    if (product) {
      if (product.editions && product.editions.length > 0) {
        setSelectedEdition(product.editions[0].name);
      } else {
        setSelectedEdition('Signature Collection Edition');
      }
      setQuantity(1);
    }
  }, [product]);

  // Compute active customized price based on selected edition
  const activePrice = useMemo(() => {
    if (!product) return 0;
    if (product.editions && product.editions.length > 0 && selectedEdition) {
      const found = product.editions.find((e) => e.name === selectedEdition);
      if (found && found.price) return found.price;
    }
    return product.price || 0;
  }, [product, selectedEdition]);

  if (!product) return null;

  const handleConfirm = () => {
    onConfirmCustomization({
      product,
      brideName,
      groomName,
      weddingDate,
      crestStyle,
      price: activePrice,
      quantity,
      edition: selectedEdition || 'Signature Collection Edition',
    });
    onOpenChange(false);
  };

  const brideInitial = brideName.trim().charAt(0).toUpperCase() || 'A';
  const groomInitial = groomName.trim().charAt(0).toUpperCase() || 'S';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6">
        {/* Header with thumbnail */}
        <DialogHeader className="pb-3 border-b border-outline-variant/30 text-left">
          <div className="flex items-center gap-3 relative">
            <Image
              src={product.image || FALLBACK_IMAGE}
              alt={product.title}
              className="w-14 h-14 object-cover rounded-lg bg-surface-container-low border border-outline-variant/30 shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                Customized Wedding Customizer
              </span>
              <DialogTitle className="text-base font-semibold font-serif text-on-surface truncate">
                {product.title}
              </DialogTitle>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-bold text-sm text-primary font-serif">
                  ₹{activePrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-[11px] text-outline line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {selectedEdition && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0.2 bg-primary/10 text-primary border-0 font-medium">
                    {selectedEdition}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Customization Form */}
        <div className="space-y-3.5 text-xs pt-1">
          {/* Couple Names */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="bride-name" className="text-xs font-semibold text-on-surface">
                Bride's Name
              </Label>
              <Input
                id="bride-name"
                type="text"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="e.g. Asra"
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="groom-name" className="text-xs font-semibold text-on-surface">
                Groom's Name
              </Label>
              <Input
                id="groom-name"
                type="text"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="e.g. Shahnawaz"
                className="h-9 text-xs"
              />
            </div>
          </div>

          {/* Date & Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="wedding-date" className="text-xs font-semibold text-on-surface">
                Ceremony / Wedding Date
              </Label>
              <Input
                id="wedding-date"
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-on-surface">
                Quantity
              </Label>
              <div className="flex items-center h-9 border border-outline-variant/60 rounded-lg bg-surface-container-lowest overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 h-full text-on-surface hover:bg-surface-container-low font-bold cursor-pointer transition-colors flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="flex-1 text-center font-bold text-xs">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 h-full text-on-surface hover:bg-surface-container-low font-bold cursor-pointer transition-colors flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Crest Style Select */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-on-surface">
              Initials Crest Style
            </Label>
            <Select value={crestStyle} onValueChange={setCrestStyle}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Select crest style" />
              </SelectTrigger>
              <SelectContent>
                {CREST_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-xs">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Edition / Colorway Selection */}
          {product.editions && product.editions.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-on-surface text-xs">
                  Select Colorway / Collection Edition
                </span>
                <span className="text-[10px] text-primary font-bold">
                  Price updates dynamically
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.editions.map((ed) => {
                  const isSelected = selectedEdition === ed.name;
                  return (
                    <button
                      key={ed.name}
                      type="button"
                      onClick={() => setSelectedEdition(ed.name)}
                      className={`p-2.5 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary font-bold ring-1 ring-primary'
                          : 'border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:border-outline'
                      }`}
                    >
                      <div className="flex flex-col truncate mr-1">
                        <span className="text-[11px] truncate font-semibold">{ed.name}</span>
                        <span className="text-[10px] text-primary font-sans font-bold">
                          ₹{ed.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      {ed.dotColors && (
                        <span className="flex items-center -space-x-1 shrink-0">
                          {ed.dotColors.map((color, idx) => (
                            <span
                              key={idx}
                              className="w-3.5 h-3.5 rounded-full border border-surface shadow-2xs"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Calligraphy Initials Die Proof */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-fixed/20 rounded-full blur-xl pointer-events-none" />
            <span className="text-[10px] text-outline uppercase tracking-wider block mb-1 font-bold">
              Live Calligraphy Initials Die Proof
            </span>
            <div className="font-serif text-2xl font-bold text-primary tracking-wide py-1">
              {brideInitial} &amp; {groomInitial}
            </div>
            <span className="text-[11px] text-on-surface-variant font-medium block">
              {brideName || 'Bride'} &amp; {groomName || 'Groom'} •{' '}
              {weddingDate || 'Wedding Date'}
            </span>
            <span className="inline-block mt-1 text-[10px] text-primary uppercase tracking-widest font-semibold px-2.5 py-0.5 bg-primary/10 rounded-full">
              {crestStyle}
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-2 mt-2">
          <Link
            href={`/product/${product.slug || product.id}`}
            onClick={() => onOpenChange(false)}
            className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Full Product Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleConfirm}
              className="bg-primary hover:bg-[#5f4b2d] text-on-primary text-xs font-semibold uppercase tracking-wider gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                Add to Bag (₹{(activePrice * quantity).toLocaleString('en-IN')})
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeddingCustomizerDialog;
