import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';

const ToggleGroupContext = React.createContext({
  size: 'default',
  variant: 'default',
});

const ToggleGroup = React.forwardRef<React.ElementRef<typeof ToggleGroupPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & { variant?: string; size?: string }>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      // @ts-ignore
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={cn('flex items-center justify-center gap-1.5', className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children as React.ReactNode}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
);
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    const itemVariant = variant || context.variant;
    const itemSize = size || context.size;

    return (
      <ToggleGroupPrimitive.Item
        // @ts-ignore
        ref={ref as unknown as React.Ref<HTMLElement>}
        className={cn(
          'inline-flex items-center justify-center rounded-lg text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
          // Variants
          itemVariant === 'default' &&
            'border border-outline-variant/60 bg-transparent text-on-surface-variant hover:border-outline hover:text-on-surface data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-on-primary data-[state=on]:shadow-xs',
          itemVariant === 'outline' &&
            'border border-outline-variant/60 bg-surface-container-low/50 text-on-surface-variant hover:border-outline hover:bg-surface-container hover:text-on-surface data-[state=on]:border-primary data-[state=on]:bg-primary-container/30 data-[state=on]:text-on-surface data-[state=on]:ring-1 data-[state=on]:ring-primary',
          itemVariant === 'solid' &&
            'border border-outline-variant/60 bg-surface-container-low text-on-surface-variant hover:border-primary hover:text-on-surface data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-on-primary data-[state=on]:shadow-xs',
          // Sizes
          itemSize === 'sm' && 'h-8 px-2.5 text-[11px]',
          itemSize === 'lg' && 'h-11 px-5 text-sm',
          (!itemSize || itemSize === 'default') && 'h-9 px-3 text-xs',
          className
        )}
        {...props}
      >
        {children as React.ReactNode}
      </ToggleGroupPrimitive.Item>
    );
  }
);
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
