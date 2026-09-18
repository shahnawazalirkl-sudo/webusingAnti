import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export const MilestoneTracker = ({ milestones = [] }) => {
  if (!milestones.length) return null;

  return (
    <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
          <div>
            <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] font-semibold">
              Collection Tier Perks
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface mt-0.5">
              The Celebratory Gifting Scale
            </h2>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">redeem</span>
            <span>Automatic Tier Application at Checkout</span>
          </div>
        </div>

        {/* Progressive Track Visualization */}
        <div className="relative py-2">
          {/* Connecting Track Bar for desktop */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-surface-container-high -translate-y-1/2 z-0 rounded-full">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-2/3 rounded-full" />
          </div>

          {/* Milestone Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {milestones.map((item) => (
              <Card
                key={item.id}
                className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between shadow-sm border border-outline-variant/30 group hover:bg-surface-container transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="gold" className="font-mono font-bold text-[11px]">
                      {item.tag}
                    </Badge>
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      {item.icon}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-medium leading-snug text-on-surface">
                    {item.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-outline font-label-sm text-[10px] tracking-wider uppercase">
                  <span>{item.tierBadge}</span>
                  <span className={`font-bold ${item.valueColor || 'text-primary'}`}>
                    {item.valueBadge}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MilestoneTracker;
