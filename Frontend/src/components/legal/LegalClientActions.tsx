"use client";

import React, { useState } from 'react';

interface PrintDocketButtonProps {
  className?: string;
  label?: string;
  iconOnlyOnMobile?: boolean;
}

export function PrintDocketButton({
  className,
  label = 'Print Docket',
  iconOnlyOnMobile = true
}: PrintDocketButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={
        className ||
        "px-4 py-2 border border-outline-variant/50 text-on-surface rounded-lg text-xs font-semibold uppercase tracking-wider hover:border-primary hover:text-primary active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
      }
      title="Print legal docket"
    >
      <span className="material-symbols-outlined text-[16px] text-primary">print</span>
      {iconOnlyOnMobile ? (
        <>
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">Print</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}

interface CopyDocketButtonProps {
  docketId: string;
  label?: string;
  className?: string;
}

export function CopyDocketButton({
  docketId,
  label = 'Docket ID:',
  className
}: CopyDocketButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(docketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="flex items-center gap-1.5">
      {label && <span className="font-semibold text-on-surface">{label}</span>}
      <button
        type="button"
        onClick={handleCopy}
        className={
          className ||
          "font-mono text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer bg-[#FAF4EB] px-2 py-0.5 rounded border border-primary/20"
        }
        title={`Click to copy ${label || 'Docket ID'}`}
      >
        <span>{docketId}</span>
        {copied ? (
          <span className="material-symbols-outlined text-[14px] text-emerald-700">check</span>
        ) : (
          <span className="material-symbols-outlined text-[14px] text-primary">content_copy</span>
        )}
      </button>
      {copied && (
        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-200">
          Copied
        </span>
      )}
    </div>
  );
}
