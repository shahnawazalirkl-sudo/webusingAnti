import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

const AccountHeader = ({ profile }) => {
  const getInitials = (name) => {
    if (!name) return 'AS';
    const parts = name.match(/\b([A-Z])/g);
    return parts ? parts.slice(0, 2).join('') : 'AS';
  };

  const firstName = profile?.fullName?.split('&')[0]?.trim() || 'Patron';

  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant/30 pb-6 gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-primary/30 shadow-xs">
            <AvatarFallback className="bg-surface-container-high text-primary font-serif font-bold text-sm">
              {getInitials(profile?.fullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary">
                Client Sanctuary
              </span>
              <Badge variant="gold" className="text-[10px] uppercase tracking-wider py-0 px-2">
                {profile?.vipTier || 'Sovereign Patron'}
              </Badge>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-tight tracking-tight text-on-surface">
              Welcome, <span className="italic gold-gradient-text font-serif">{firstName}</span>
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed pt-1">
          Manage your commissioned bridal suites, track real-time white-glove consignments, oversee saved delivery destinations, and coordinate with your dedicated wedding concierge.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Button asChild size="sm" className="gap-2">
          <Link to="/shop">
            <span className="material-symbols-outlined text-base">shopping_bag</span>
            <span>Explore Collections</span>
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <a href="https://wa.me/919692668263" target="_blank" rel="noopener noreferrer">
            <span className="material-symbols-outlined text-base text-primary">chat</span>
            <span>WhatsApp Stylist</span>
          </a>
        </Button>
      </div>
    </section>
  );
};

export default AccountHeader;
