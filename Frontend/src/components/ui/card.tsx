import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <div
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn(
      'rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-on-surface shadow-xs transition-colors',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <div
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('flex flex-col space-y-1.5 p-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <div
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <div
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('text-sm text-outline', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <div 
    // @ts-ignore 
    ref={ref as unknown as React.Ref<HTMLElement>} 
    className={cn('p-4 pt-0', className)} 
    {...props} 
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <div
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('flex items-center p-4 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
