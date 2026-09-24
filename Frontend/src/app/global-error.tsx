'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, Copy, Check, ShieldAlert } from 'lucide-react';
import { reportClientError, generateIncidentId } from '@/utils/telemetry';
import '@/index.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [refId, setRefId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    // Generate or derive incident reference ID
    const incidentId = error?.digest ? `ERR-${error.digest.slice(0, 8).toUpperCase()}` : generateIncidentId();
    setRefId(incidentId);

    // Silently log the critical root error
    reportClientError({
      refId: incidentId,
      message: error?.message || 'Global root layout error',
      stack: error?.stack || '',
      context: 'GlobalRootErrorBoundary',
    });
  }, [error]);

  const handleCopy = () => {
    if (!refId) return;
    navigator.clipboard?.writeText(refId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleReset = () => {
    setIsResetting(true);
    try {
      reset();
    } finally {
      setTimeout(() => setIsResetting(false), 800);
    }
  };

  return (
    <html lang="en">
      <body className="bg-[#fcf9f8] text-[#1c1b1b] min-h-screen flex items-center justify-center p-4 font-sans antialiased">
        <div className="max-w-md w-full text-center bg-white border border-[#d1c5b8]/50 rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-[#725b38]" />

          {/* Visual Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#725b38]/10 text-[#725b38] mb-6">
            <ShieldAlert className="w-8 h-8" strokeWidth={1.75} />
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl text-[#1c1b1b] font-serif font-normal tracking-wide mb-3">
            Something went wrong
          </h1>

          {/* Reassuring User Message */}
          <p className="text-[#4d463c] text-sm sm:text-base leading-relaxed mb-6">
            An unexpected error interrupted your session. Our technical team has been notified. Please try refreshing the page or navigate back to the home page.
          </p>

          {/* Reference ID Capsule */}
          {refId && (
            <div className="bg-[#f6f3f2] border border-[#d1c5b8]/60 rounded-xl p-3.5 mb-8 flex items-center justify-between gap-3 text-left">
              <div className="min-w-0">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-[#7f766a]">
                  Incident Reference
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#725b38] truncate block">
                  {refId}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#eae7e7] text-[#1c1b1b] text-xs font-medium border border-[#d1c5b8]/50 transition-colors shrink-0"
                title="Copy Reference ID"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#7f766a]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isResetting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#725b38] hover:bg-[#584323] text-white text-sm font-medium transition-all shadow-sm disabled:opacity-70 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
              <span>{isResetting ? 'Refreshing...' : 'Try Again'}</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#f6f3f2] hover:bg-[#eae7e7] text-[#1c1b1b] text-sm font-medium border border-[#d1c5b8]/50 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#7f766a]" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
