import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { cn } from '@/lib/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 bg-surface-container-lowest select-none', className)}
      classNames={{
        root: `${defaultClassNames.root} relative`,
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center mb-2',
        caption_label: 'text-sm font-serif font-medium text-on-surface tracking-wide',
        nav: 'flex items-center gap-1',
        button_previous: cn(
          'absolute left-1 top-0 h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 rounded-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all'
        ),
        button_next: cn(
          'absolute right-1 top-0 h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 rounded-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex justify-between mb-1',
        weekday: 'text-outline text-[11px] font-medium w-9 text-center uppercase tracking-wider',
        weeks: 'flex flex-col gap-1',
        week: 'flex w-full justify-between',
        day: 'h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center rounded-lg',
        day_button: cn(
          'h-9 w-9 p-0 font-normal rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors text-xs'
        ),
        selected: '!bg-primary !text-on-primary font-semibold shadow-xs [&>button]:!text-on-primary [&>button]:hover:!bg-primary',
        today: 'border border-primary/50 text-primary font-semibold',
        outside: 'opacity-40 text-outline',
        disabled: 'opacity-20 pointer-events-none text-outline',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) => {
          if (orientation === 'left') {
            return <ChevronLeft className="h-4 w-4 text-primary" {...chevronProps} />;
          }
          return <ChevronRight className="h-4 w-4 text-primary" {...chevronProps} />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
