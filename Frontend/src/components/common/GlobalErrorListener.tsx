'use client';

import { useEffect } from 'react';
import { reportClientError, generateIncidentId } from '@/utils/telemetry';

/**
 * GlobalErrorListener
 * Attaches window-level event listeners for uncaught runtime exceptions
 * and unhandled promise rejections outside React's component tree.
 */
export default function GlobalErrorListener() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleWindowError = (event: ErrorEvent) => {
      // Ignore empty or opaque third-party script errors
      if (!event.message && !event.error) return;

      const message = event.error?.message || event.message || 'Uncaught window error';
      // Suppress benign browser extension or resize-observer noise
      if (message.includes('ResizeObserver loop') || message.includes('Extension context invalidated')) {
        return;
      }

      const refId = generateIncidentId('ERR-WIN');
      reportClientError({
        refId,
        message,
        stack: event.error?.stack || `${event.filename || 'unknown'}:${event.lineno || 0}:${event.colno || 0}`,
        context: 'UncaughtWindowError',
        url: window.location.href,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      let message = 'Unhandled Promise Rejection';
      let stack = '';

      if (event.reason instanceof Error) {
        message = event.reason.message || message;
        stack = event.reason.stack || '';
      } else if (typeof event.reason === 'string') {
        message = event.reason;
      } else if (event.reason && typeof event.reason === 'object') {
        try {
          message = JSON.stringify(event.reason);
        } catch {
          message = 'Complex rejection object';
        }
      }

      // Suppress common harmless promise cancellation / navigation aborts
      if (message.includes('AbortError') || message.includes('cancelled')) {
        return;
      }

      const refId = generateIncidentId('ERR-ASYNC');
      reportClientError({
        refId,
        message,
        stack,
        context: 'UnhandledPromiseRejection',
        url: window.location.href,
      });
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
