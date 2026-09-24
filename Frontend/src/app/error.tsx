'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home, Copy, Check, ShieldAlert } from 'lucide-react';
import { reportClientError, generateIncidentId } from '@/utils/telemetry';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const [refId, setRefId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    // Generate or derive incident reference ID
    const incidentId = error?.digest ? `ERR-${error.digest.slice(0, 8).toUpperCase()}` : generateIncidentId();
    setRefId(incidentId);

    // Silently report client error telemetry without exposing internal details on screen
    reportClientError({
      refId: incidentId,
      message: error?.message || 'Component rendering error',
      stack: error?.stack || '',
      context: 'PageErrorBoundary',
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
    <div className="min-h-[75vh] w-full flex items-center justify-center px-4 py-16 bg-surface text-on-surface">
      <div className="max-w-md w-full text-center bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Decorative subtle accent bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

        {/* Visual Icon Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 ring-8 ring-primary/5">
          <ShieldAlert className="w-8 h-8" strokeWidth={1.75} />
        </div>

        {/* Reassuring Headline */}
        <h1 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal tracking-wide mb-3">
          Something went wrong
        </h1>

        {/* User-friendly message (strictly zero stack traces or line numbers) */}
        <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-6">
          We encountered an unexpected issue while loading this page. Our atelier team has been notified. Please try refreshing or return to the atelier homepage.
        </p>

        {/* Reference ID Capsule */}
        {refId && (
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5 mb-8 flex items-center justify-between gap-3 text-left">
            <div className="min-w-0">
              <span className="block text-[11px] font-medium uppercase tracking-wider text-outline">
                Incident Reference
              </span>
              <span className="font-mono text-xs sm:text-sm font-semibold text-primary truncate block">
                {refId}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-variant text-on-surface text-xs font-medium border border-outline-variant/50 transition-colors shrink-0"
              title="Copy Reference ID"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-outline" />
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-sm font-medium transition-all shadow-sm disabled:opacity-70 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
            <span>{isResetting ? 'Refreshing...' : 'Try Again'}</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface text-sm font-medium border border-outline-variant/50 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-outline" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
