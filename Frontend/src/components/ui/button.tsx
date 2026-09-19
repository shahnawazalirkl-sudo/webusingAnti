import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const buttonVariants = {
  default: 'bg-primary text-on-primary hover:bg-primary/90 shadow-xs active:scale-[0.98]',
  destructive: 'bg-error text-on-error hover:bg-error/90 shadow-xs active:scale-[0.98]',
  outline: 'border border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:bg-surface-container hover:text-primary active:scale-[0.98]',
  secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 shadow-xs active:scale-[0.98]',
  ghost: 'text-on-surface hover:bg-surface-container-high hover:text-primary',
  link: 'text-primary underline-offset-4 hover:underline',
};

const buttonSizes = {
  default: 'h-10 px-4 py-2 text-sm',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-11 rounded-lg px-6 text-base',
  icon: 'h-9 w-9 p-0',
};

const Button = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const variantClass = buttonVariants[variant as keyof typeof buttonVariants] || buttonVariants.default;
    const sizeClass = buttonSizes[size as keyof typeof buttonSizes] || buttonSizes.default;

    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none font-label-md',
          variantClass,
          sizeClass,
          className
        )}
        // @ts-ignore
        ref={ref as unknown as React.Ref<HTMLElement>}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
