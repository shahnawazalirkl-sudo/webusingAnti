import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { BULK_TIERS } from '../../data/bulkOrdersData';

const BulkTiersGrid = ({ selectedTierValue, onSelectTier, onScrollToForm }) => {
  return (
    <section id="pricing" className="w-full py-8 sm:py-10 lg:py-14 bg-surface border-t border-outline-variant/30">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <Badge variant="outline" className="text-primary border-primary/30 bg-[#FAF4EB] uppercase tracking-[0.2em] px-3 py-1 font-semibold text-[10px] sm:text-[11px] mb-2">
            Tiered Collection Economics
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
            Volume Privileges &amp; Celebration Tiers
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
            Transparent volume collection pricing structured to reward grand celebrations and corporate orders with complimentary personalization privileges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {BULK_TIERS.map((tier) => {
            const isSelected = selectedTierValue === tier.value;
            return (
              <Card
                key={tier.tier}
                className={`transition-all duration-300 flex flex-col justify-between relative ${
                  tier.popular
                    ? 'bg-surface-container-lowest shadow-md hover:shadow-xl border-primary ring-1 ring-primary/40'
                    : isSelected
                    ? 'bg-[#FAF4EB]/30 border-primary ring-1 ring-primary/30'
                    : 'border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs z-10">
                    Most Selected
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={tier.popular ? 'default' : 'secondary'}
                      className={`text-[10px] uppercase font-bold tracking-wider ${
                        tier.popular ? 'bg-[#FAF4EB] text-primary border border-primary/20 hover:bg-[#FAF4EB]' : ''
                      }`}
                    >
                      {tier.tier}
                    </Badge>
                    <span className="font-mono text-xs font-bold text-primary">
                      {tier.range}
                    </span>
                  </div>

                  <CardTitle className="font-serif text-base sm:text-lg font-medium text-on-surface leading-snug">
                    {tier.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div
                    className={`p-3 rounded-lg flex items-baseline gap-2 ${
                      tier.popular ? 'bg-[#FAF4EB] border border-primary/20' : 'bg-surface-container-low'
                    }`}
                  >
                    <span className="font-serif text-2xl font-bold text-primary">
                      {tier.discount}
                    </span>
                    <span className="text-xs font-semibold text-on-surface">
                      {tier.privilegeLabel}
                    </span>
                  </div>

                  <ul className="space-y-2 text-on-surface-variant text-xs">
                    {tier.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-2">
                  <Button
                    variant={tier.popular ? 'default' : 'outline'}
                    onClick={() => {
                      onSelectTier(tier.value, tier.range);
                      if (onScrollToForm) onScrollToForm();
                    }}
                    className="w-full text-xs font-semibold uppercase tracking-wider"
                  >
                    {isSelected ? `Selected (${tier.tier})` : `Inquire ${tier.tier}`}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BulkTiersGrid;
