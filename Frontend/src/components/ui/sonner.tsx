"use client";

import { Toaster as Sonner, toast } from 'sonner';

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-surface-container-lowest group-[.toaster]:text-on-surface group-[.toaster]:border-outline-variant/60 group-[.toaster]:shadow-luxury group-[.toaster]:rounded-xl font-sans',
          description: 'group-[.toast]:text-on-surface-variant text-xs',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-on-primary font-medium rounded-lg',
          cancelButton:
            'group-[.toast]:bg-surface-container-low group-[.toast]:text-on-surface rounded-lg',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
