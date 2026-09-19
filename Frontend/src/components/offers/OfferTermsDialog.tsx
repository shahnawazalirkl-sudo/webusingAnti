import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const OfferTermsDialog = ({ isOpen, onClose, offer }) => {
  if (!offer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-surface-container-lowest border-outline-variant/50">
        <DialogHeader className="text-left space-y-2 pb-2 border-b border-outline-variant/30">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-primary">
              {offer.partner || 'ASRA Privilege'}
            </span>
            {offer.badge && (
              <Badge variant={offer.badgeVariant || 'gold'} className="text-[10px] uppercase tracking-wider">
                {offer.badge}
              </Badge>
            )}
          </div>
          <DialogTitle className="font-serif text-lg sm:text-xl font-normal text-on-surface leading-snug">
            {offer.title}
          </DialogTitle>
          {offer.code && (
            <DialogDescription className="font-mono text-xs font-bold text-primary">
              Offer Code: <span className="bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{offer.code}</span>
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-2 text-xs text-on-surface-variant space-y-2.5 leading-relaxed max-h-72 overflow-y-auto pr-1 scrollbar-thin">
          <h4 className="font-semibold text-on-surface text-xs uppercase tracking-wider">
            Terms & Conditions
          </h4>
          {offer.terms && offer.terms.length > 0 ? (
            <ul className="space-y-2 list-disc list-inside">
              {offer.terms.map((term, idx) => (
                <li key={idx} className="text-on-surface-variant leading-relaxed">
                  {term}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-on-surface-variant">
              • Valid on applicable transactions during the promotional campaign.<br />
              • Cannot be clubbed with separate non-stackable promo codes.<br />
              • Terms subject to standard collection policies.
            </p>
          )}
        </div>

        <DialogFooter className="pt-2 border-t border-outline-variant/20 sm:justify-end">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto uppercase tracking-wider text-xs font-semibold"
          >
            Understood
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OfferTermsDialog;
