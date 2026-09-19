import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';

const AccountConcierge = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
      
      {/* Direct Stylist Hotline Card */}
      <Card className="bg-surface-container-lowest border-primary/40 shadow-sm p-6 space-y-5">
        <div className="flex items-center space-x-3.5 border-b border-outline-variant/30 pb-4">
          <Avatar className="h-12 w-12 border border-primary/40 shadow-xs">
            <AvatarFallback className="bg-surface-container-high text-primary font-serif font-bold text-sm">
              SN
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="text-[10px] tracking-widest uppercase text-primary font-semibold block">
              Lead Wedding Architect
            </span>
            <h4 className="text-base font-serif font-bold text-on-surface">
              Shagufta Naaz
            </h4>
            <span className="text-xs text-outline">
              Flagship Atelier Concierge
            </span>
          </div>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed italic">
          "Our master craftspeople are at your service for personalized 24K gold-leaf proofing, bespoke ribbon swatches, and palace venue delivery coordination."
        </p>

        <div className="space-y-2.5 pt-2">
          <Button asChild className="w-full gap-2 bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs">
            <a href="https://wa.me/919692668263" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Direct WhatsApp Channel</span>
            </a>
          </Button>

          <Button asChild variant="outline" className="w-full gap-2 border-primary/30">
            <a href="tel:+919692668263">
              <span className="material-symbols-outlined text-base text-primary">call</span>
              <span>Call +91 96926 68263</span>
            </a>
          </Button>
        </div>
      </Card>

      {/* Atelier Services & Quick Guidance */}
      <Card className="md:col-span-2 p-6 space-y-5">
        <div className="border-b border-outline-variant/30 pb-3">
          <CardTitle className="font-serif font-bold text-lg text-on-surface">
            Ceremony Concierge & Assistance
          </CardTitle>
          <CardDescription className="text-xs text-on-surface-variant mt-0.5">
            Key coordination points for custom commission turnarounds, venue handovers, and atelier proofing.
          </CardDescription>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1.5">
            <h4 className="font-semibold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">schedule</span>
              <span>Turnaround & Express Dispatch</span>
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Standard dispatch is 24 to 48 hours. Urgent wedding ceremonies are prioritized for express white-glove courier handover.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1.5">
            <h4 className="font-semibold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">sparkles</span>
              <span>Crest & Monogram Proofing</span>
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Before hot-stamp milling or foil indentation commences, you can connect directly on WhatsApp to adjust spellings or crest styles.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1.5">
            <h4 className="font-semibold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">location_on</span>
              <span>Direct Palace & Resort Delivery</span>
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              We coordinate directly with hotel concierges, banquet managers, and event planners across India and international destinations.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1.5">
            <h4 className="font-semibold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">draw</span>
              <span>Bespoke Commission Atelier</span>
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Looking for custom trunk sizes or signature union crests? Launch our interactive personalization studio anytime.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-4 text-xs">
          <Button asChild variant="link" className="p-0 h-auto font-semibold">
            <Link href="/personalized">Launch Monogram Studio →</Link>
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button asChild variant="link" className="p-0 h-auto text-on-surface-variant hover:text-primary">
            <Link href="/faq">Browse All FAQs</Link>
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button asChild variant="link" className="p-0 h-auto text-on-surface-variant hover:text-primary">
            <Link href="/return-policy">Transit Guarantees</Link>
          </Button>
        </div>
      </Card>

    </div>
  );
};

export default AccountConcierge;
