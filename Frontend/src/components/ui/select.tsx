import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn(
      'flex h-9 w-full items-center justify-between rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 py-1.5 text-xs text-on-surface shadow-xs ring-offset-background placeholder:text-outline/50 focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer transition-all',
      className
    )}
    {...props}
  >
    {children as React.ReactNode}
    <SelectPrimitive.Icon asChild>
      <span className="material-symbols-outlined text-[16px] text-outline ml-1">expand_more</span>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <span className="material-symbols-outlined text-[14px]">expand_less</span>
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <span className="material-symbols-outlined text-[14px]">expand_more</span>
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      // @ts-ignore
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      // @ts-ignore
position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children as React.ReactNode}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('py-1.5 pl-8 pr-2 text-xs font-semibold text-outline', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-8 pr-2 text-xs outline-none focus:bg-surface-container focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <span className="material-symbols-outlined text-[14px] text-primary">check</span>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children as React.ReactNode}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    // @ts-ignore
    ref={ref as unknown as React.Ref<HTMLElement>}
    className={cn('-mx-1 my-1 h-px bg-outline-variant/30', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
