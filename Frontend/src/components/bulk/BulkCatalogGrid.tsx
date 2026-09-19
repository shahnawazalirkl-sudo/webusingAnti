"use client";
import Image from "next/image";

import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { BULK_CATALOG_ITEMS } from '../../data/bulkOrdersData';

const BulkCatalogGrid = ({ onAddItemToDossier, onOpenSampleModal }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = activeTab === 'all'
    ? BULK_CATALOG_ITEMS
    : BULK_CATALOG_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="catalog" className="w-full py-8 sm:py-10 lg:py-14 bg-surface-container-low border-y border-outline-variant/30">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <Badge variant="outline" className="text-primary border-primary/30 bg-[#FAF4EB] uppercase tracking-[0.2em] px-3 py-1 font-semibold text-[10px] sm:text-[11px] mb-2">
              Masterpiece Catalogue
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
              Signature Favors, Welcome Suites &amp; Corporate Hampers
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mt-1 leading-relaxed">
              Handcrafted in India by master artisans. All units include complimentary custom crest debossing, ribbon tying, and individual name tag options.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-surface-container-lowest px-3.5 py-2 rounded-lg border border-outline-variant/30 shadow-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <div className="text-left">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-semibold">Standard Lead Time</span>
              <span className="text-xs text-on-surface font-bold">5 - 14 Business Days</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
          <TabsList className="bg-surface-container-lowest border border-outline-variant/30 p-1 rounded-xl flex-wrap h-auto">
            <TabsTrigger value="all" className="text-xs px-4 py-2 font-semibold">
              All Items ({BULK_CATALOG_ITEMS.length})
            </TabsTrigger>
            <TabsTrigger value="wedding-favors" className="text-xs px-4 py-2 font-semibold">
              Wedding Favors (4)
            </TabsTrigger>
            <TabsTrigger value="welcome-hampers" className="text-xs px-4 py-2 font-semibold">
              Welcome Hampers (2)
            </TabsTrigger>
            <TabsTrigger value="corporate-gifting" className="text-xs px-4 py-2 font-semibold">
              Corporate &amp; VIP (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  <div className="relative aspect-[4/3] bg-surface-container-low overflow-hidden">
                    <Image
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      alt={item.name}
                      src={item.image} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#FAF4EB] text-primary border border-primary/20 text-[9px] font-bold uppercase tracking-wider shadow-xs hover:bg-[#FAF4EB]">
                      MIN: {item.minUnits} UNITS
                    </Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface border border-outline-variant/30 text-[9px] font-bold uppercase tracking-wider shadow-xs">
                      {item.tag}
                    </Badge>
                  </div>

                  <CardContent className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-medium leading-snug text-on-surface mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant mb-3 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-bold text-base text-primary font-mono">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <span className="line-through text-outline text-xs font-mono">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-on-surface-variant font-medium">
                          per unit
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-col gap-2 border-t border-outline-variant/30">
                      <div className="flex items-center justify-between text-[11px] text-outline font-mono">
                        <span>Lead: {item.leadTime}</span>
                        <button
                          type="button"
                          onClick={() => onOpenSampleModal && onOpenSampleModal(item)}
                          className="text-primary hover:underline text-[11px] font-sans font-semibold cursor-pointer"
                        >
                          Request Sample
                        </button>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onAddItemToDossier(item)}
                        className="w-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-primary hover:text-on-primary hover:border-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_circle</span>
                        <span>Add to Dossier</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default BulkCatalogGrid;
