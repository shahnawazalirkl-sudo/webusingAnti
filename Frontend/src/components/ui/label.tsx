import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn(
      'font-label-sm text-[11px] text-outline uppercase tracking-wider block font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none',
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
