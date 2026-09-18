import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-3.5 py-2 text-sm text-on-surface ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-outline/50 focus-visible:outline-none focus-visible:border-primary focus-visible:bg-surface-container-lowest focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all font-body-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
