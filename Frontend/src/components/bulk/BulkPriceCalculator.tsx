"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BULK_CATALOG_ITEMS, BULK_TIERS, BULK_ADDONS } from '../../data/bulkOrdersData';

const QUANTITY_PRESETS = [50, 100, 200, 350, 500, 1000];

const BulkPriceCalculator = ({ onTransferEstimate }) => {
  const [selectedProductId, setSelectedProductId] = useState(BULK_CATALOG_ITEMS[0].id);
  const [quantity, setQuantity] = useState(100);
  const [selectedAddons, setSelectedAddons] = useState(['custom-brass-die', 'hand-pressed-wax-seal']);

  const activeProduct = useMemo(() => {
    return BULK_CATALOG_ITEMS.find((p) => p.id === selectedProductId) || BULK_CATALOG_ITEMS[0];
  }, [selectedProductId]);

  // Determine tier discount rate based on quantity
  const activeTier = useMemo(() => {
    if (quantity >= 501) return BULK_TIERS[3];
    if (quantity >= 201) return BULK_TIERS[2];
    if (quantity >= 76) return BULK_TIERS[1];
    return BULK_TIERS[0];
  }, [quantity]);

  // Calculations
  const baseUnitPrice = activeProduct.price;
  const originalUnitPrice = activeProduct.originalPrice;
  const subtotalBase = baseUnitPrice * quantity;
  const originalSubtotal = originalUnitPrice * quantity;

  // Add-ons cost
  const addonsTotalPerUnit = useMemo(() => {
    return selectedAddons.reduce((acc, addonId) => {
      const addon = BULK_ADDONS.find((a) => a.id === addonId);
      return acc + (addon ? addon.price : 0);
    }, 0);
  }, [selectedAddons]);

  const totalAddonsCost = addonsTotalPerUnit * quantity;

  // Tier discount applied on base price
  const discountRate = activeTier.discountRate;
  const tierSavings = subtotalBase * discountRate;
  const discountedSubtotal = subtotalBase - tierSavings;

  const totalEstimate = Math.round(discountedSubtotal + totalAddonsCost);
  const effectivePerUnit = Math.round(totalEstimate / (quantity || 1));
  const totalClientSavings = Math.round(originalSubtotal - totalEstimate);

  // Dynamic Lead Time
  const estimatedLeadTime = useMemo(() => {
    if (quantity > 500) return '12 - 16 Business Days';
    if (quantity > 200) return '9 - 12 Business Days';
    return '6 - 9 Business Days';
  }, [quantity]);

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleApplyEstimate = () => {
    if (onTransferEstimate) {
      onTransferEstimate({
        productName: activeProduct.name,
        quantity: quantity,
        tierName: activeTier.tier,
        discount: activeTier.discount,
        effectivePerUnit: effectivePerUnit,
        totalEstimate: totalEstimate,
        addons: selectedAddons.map((id) => BULK_ADDONS.find((a) => a.id === id)?.name).filter(Boolean)
      });
    }
  };

  return (
    <section id="calculator" className="w-full py-8 sm:py-10 lg:py-14 bg-surface">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <Badge variant="outline" className="text-primary border-primary/30 bg-[#FAF4EB] uppercase tracking-[0.2em] px-3 py-1 font-semibold text-[10px] sm:text-[11px] mb-2">
            Real-Time Estimator
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
            Interactive Volume Price &amp; Savings Calculator
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
            Test tier economics instantaneously. Adjust your guest count and luxury personalization embellishments to preview real-time per-unit savings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Controls Form Card */}
          <Card className="lg:col-span-7 bg-surface-container-lowest border-outline-variant/30 shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-serif text-lg sm:text-xl font-normal text-on-surface">
                1. Select Favor Suite &amp; Volume
              </CardTitle>
              <CardDescription className="text-xs text-on-surface-variant">
                Choose the base gifting item and choose your guest headcount.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Product Selector */}
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                  Select Favor / Hamper Item
                </label>
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger className="w-full bg-surface border-outline-variant/40">
                    <SelectValue placeholder="Select catalog item" />
                  </SelectTrigger>
                  <SelectContent>
                    {BULK_CATALOG_ITEMS.map((item) => (
                      <SelectItem key={item.id} value={item.id} className="text-xs sm:text-sm py-2">
                        <span className="font-medium text-on-surface">{item.name}</span>
                        <span className="text-primary font-mono ml-2 font-semibold">₹{item.price.toLocaleString('en-IN')}/unit</span>
                        <span className="text-outline text-[11px] ml-1">({item.categoryLabel})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity Presets & Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                    Guest Count / Order Quantity
                  </label>
                  <span className="text-xs font-mono font-bold text-primary bg-[#FAF4EB] px-2 py-0.5 rounded border border-primary/20">
                    {quantity} Units ({activeTier.tier})
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {QUANTITY_PRESETS.map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant={quantity === preset ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setQuantity(preset)}
                      className="text-xs font-mono font-semibold"
                    >
                      {preset}
                    </Button>
                  ))}
                </div>

                {/* Custom Number Input */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs text-on-surface-variant">Custom count:</span>
                  <input
                    type="number"
                    min="25"
                    max="10000"
                    step="5"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(25, parseInt(e.target.value) || 25))}
                    className="w-32 bg-surface text-on-surface text-xs font-mono px-3 py-1.5 rounded-md border border-outline-variant/40 focus:border-primary focus:outline-none"
                  />
                  <span className="text-[11px] text-outline font-medium">Min MOQ: {activeProduct.minUnits} units</span>
                </div>
              </div>

              {/* Personalization Add-ons */}
              <div className="space-y-3 pt-2 border-t border-outline-variant/30">
                <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                  Personalization &amp; Embellishments
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BULK_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-[#FAF4EB] border-primary/40 ring-1 ring-primary/30'
                            : 'bg-surface border-outline-variant/30 hover:border-primary/30'
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleAddon(addon.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-on-surface">{addon.name}</span>
                            <span className="text-[11px] font-mono text-primary font-bold">
                              {addon.price === 0 ? 'FREE' : `+₹${addon.price}/u`}
                            </span>
                          </div>
                          <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-Time Live Quote Breakdown Card */}
          <Card className="lg:col-span-5 bg-[#FAF4EB]/50 border-primary/30 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-24 h-24 bg-primary/5 rounded-full pointer-events-none" />

            <CardHeader className="pb-3 border-b border-primary/20">
              <div className="flex items-center justify-between">
                <Badge className="bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider">
                  {activeTier.tier} Privileges Applied
                </Badge>
                <span className="font-mono text-xs font-bold text-primary">
                  {activeTier.discount} OFF
                </span>
              </div>
              <CardTitle className="font-serif text-xl sm:text-2xl font-normal text-on-surface mt-2">
                Live Pricing Summary
              </CardTitle>
              <CardDescription className="text-xs text-on-surface-variant">
                {quantity} × {activeProduct.name}
              </CardDescription>
            </CardHeader>

            <CardContent className="py-4 space-y-3.5 text-xs text-on-surface-variant">
              <div className="flex justify-between items-center">
                <span>Standard Individual Retail:</span>
                <span className="line-through text-outline font-mono">
                  ₹{originalSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Volume Tier Base Total:</span>
                <span className="font-mono text-on-surface font-medium">
                  ₹{subtotalBase.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center text-primary font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">local_offer</span>
                  <span>{activeTier.discount} Celebration Tier Privilege:</span>
                </span>
                <span className="font-mono font-bold">-₹{Math.round(tierSavings).toLocaleString('en-IN')}</span>
              </div>

              {totalAddonsCost > 0 && (
                <div className="flex justify-between items-center">
                  <span>Embellishments &amp; Add-ons:</span>
                  <span className="font-mono text-on-surface font-medium">
                    +₹{totalAddonsCost.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-primary/20 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary block">
                    Effective Unit Cost
                  </span>
                  <span className="font-serif text-2xl font-bold text-on-surface">
                    ₹{effectivePerUnit.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-outline ml-1">/ unit</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary block">
                    Estimated Net Total
                  </span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    ₹{totalEstimate.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {totalClientSavings > 0 && (
                <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">savings</span>
                    <span>Total Celebration Savings:</span>
                  </span>
                  <span className="font-mono font-bold">₹{totalClientSavings.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-[11px] text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-[14px]">schedule</span>
                  <span>Est. Lead Time:</span>
                </span>
                <span className="font-semibold text-on-surface">{estimatedLeadTime}</span>
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <Button
                onClick={handleApplyEstimate}
                className="w-full text-xs font-semibold uppercase tracking-wider py-2.5 flex items-center justify-center gap-2"
              >
                <span>Transfer Estimate to Inquiry Dossier</span>
                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BulkPriceCalculator;
