"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BULK_CATALOG_ITEMS } from '../../data/bulkOrdersData';

const BulkSampleBoxDialog = ({ open, onOpenChange, initialProduct, onSubmitSampleRequest }) => {
  const [sampleData, setSampleData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    selectedProduct: initialProduct?.name || BULK_CATALOG_ITEMS[0].name,
    estimatedUnits: '100-200'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitSampleRequest) {
      onSubmitSampleRequest(sampleData);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-surface-container-lowest border-outline-variant/40 p-6 sm:p-7">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#FAF4EB] text-primary border-primary/20 text-[9px] uppercase font-bold tracking-wider">
              Physical Master Box
            </Badge>
          </div>
          <DialogTitle className="font-serif text-xl sm:text-2xl text-on-surface">
            Request Luxury Physical Sample Kit
          </DialogTitle>
          <DialogDescription className="text-xs text-on-surface-variant leading-relaxed">
            Feel the pure mulberry silk, inspect our 3D hot-stamp brass debossing, and evaluate fragrances before initiating bulk production.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <h4 className="font-serif text-lg font-medium text-on-surface">
              Sample Box Request Shipped to Concierge
            </h4>
            <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
              Our lead bridal stylist will WhatsApp you at <strong className="text-on-surface">{sampleData.phone}</strong> to confirm your courier tracking and custom swatch selection.
            </p>
            <Button onClick={handleClose} className="mt-4 text-xs font-semibold uppercase tracking-wider">
              Return to Catalog
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-[#FAF4EB] rounded-lg border border-primary/20 text-[11px] text-on-surface-variant flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
              <span>
                <strong>100% Complimentary</strong> for celebrations above 50 units. Shipped via express air courier within 48 business hours.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="sample-name" className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="sample-name"
                  required
                  placeholder="e.g. Asra Khan"
                  value={sampleData.name}
                  onChange={(e) => setSampleData({ ...sampleData, name: e.target.value })}
                  className="text-xs bg-surface"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sample-phone" className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  WhatsApp Number *
                </Label>
                <Input
                  id="sample-phone"
                  required
                  type="tel"
                  placeholder="+91 96926 68263"
                  value={sampleData.phone}
                  onChange={(e) => setSampleData({ ...sampleData, phone: e.target.value })}
                  className="text-xs bg-surface"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Target Product Sample
                </Label>
                <Select
                  value={sampleData.selectedProduct}
                  onValueChange={(val) => setSampleData({ ...sampleData, selectedProduct: val })}
                >
                  <SelectTrigger className="text-xs bg-surface">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {BULK_CATALOG_ITEMS.map((item) => (
                      <SelectItem key={item.id} value={item.name} className="text-xs">
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Estimated Bulk Count
                </Label>
                <Select
                  value={sampleData.estimatedUnits}
                  onValueChange={(val) => setSampleData({ ...sampleData, estimatedUnits: val })}
                >
                  <SelectTrigger className="text-xs bg-surface">
                    <SelectValue placeholder="Quantity range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-100" className="text-xs">50 - 100 Units</SelectItem>
                    <SelectItem value="100-250" className="text-xs">100 - 250 Units</SelectItem>
                    <SelectItem value="250-500" className="text-xs">250 - 500 Units</SelectItem>
                    <SelectItem value="500+" className="text-xs">500+ Units (Grand Royal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sample-address" className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Delivery Postal Address *
              </Label>
              <Input
                id="sample-address"
                required
                placeholder="Apartment, Street Address, City, Pincode"
                value={sampleData.address}
                onChange={(e) => setSampleData({ ...sampleData, address: e.target.value })}
                className="text-xs bg-surface"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={handleClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" className="text-xs font-semibold uppercase tracking-wider">
                Shipping Sample Kit Request
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BulkSampleBoxDialog;
