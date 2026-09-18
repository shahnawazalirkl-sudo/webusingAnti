import * as React from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = {
  default:
    'border-transparent bg-primary text-on-primary shadow-xs hover:bg-primary/90',
  secondary:
    'border-transparent bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80',
  destructive:
    'border-transparent bg-error text-on-error shadow-xs hover:bg-error/90',
  outline:
    'border-outline-variant/60 text-primary bg-surface-container-high/60 backdrop-blur-xs',
  gold:
    'border-primary/30 bg-[#FAF4EB] text-primary shadow-xs',
};

function Badge({ className, variant = 'default', ...props }) {
  const variantClass = badgeVariants[variant] || badgeVariants.default;
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        variantClass,
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
