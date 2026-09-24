"use client";

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn(
      'rounded-lg border border-outline-variant/40 bg-surface-container-lowest overflow-hidden transition-all duration-200',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      // @ts-ignore
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={cn(
        'flex flex-1 items-center justify-between p-3 sm:p-3.5 text-left font-title-sm text-xs sm:text-sm text-on-surface font-semibold hover:text-primary transition-all [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-primary',
        className
      )}
      {...props}
    >
      {children as React.ReactNode}
      <ChevronDown className="h-4 w-4 shrink-0 text-outline transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className="overflow-hidden font-body-sm text-xs text-on-surface-variant leading-relaxed transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('px-3 sm:px-3.5 pb-3.5 pt-2 border-t border-outline-variant/20', className)}>
      {children as React.ReactNode}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
