"use client";

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-xs border border-outline-variant/30',
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
