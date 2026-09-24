/**
 * telemetry.ts - Client-Side Error Reporting & Telemetry Helper
 * 
 * Safely captures and transmits client-side errors without exposing
 * technical details, stack traces, or line numbers to end users.
 */

// Simple in-memory deduplication set to avoid spamming the log endpoint
const reportedErrorsSet = new Set<string>();

/**
 * Generates a clean, human-readable Incident Reference ID (e.g. ERR-9A3F12)
 */
export function generateIncidentId(prefix = 'ERR'): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars (O, 0, I, 1)
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

export interface ClientErrorPayload {
  refId?: string;
  message?: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  timestamp?: string;
  context?: string;
}

/**
 * Silently transmits client error telemetry to the server.
 * Guarantees zero cascading exceptions or UI blocking.
 */
export function reportClientError(errorData: ClientErrorPayload): string {
  if (typeof window === 'undefined') {
    return errorData.refId || generateIncidentId();
  }

  const refId = errorData.refId || generateIncidentId();
  const message = errorData.message || 'Unknown client error';
  const stack = errorData.stack || '';
  const url = errorData.url || window.location.href;
  const userAgent = errorData.userAgent || navigator.userAgent;
  const timestamp = errorData.timestamp || new Date().toISOString();
  const context = errorData.context || 'ErrorBoundary';

  // Deduplicate identical errors within the same session within a 5-second window
  const dedupeKey = `${message}:${url}:${context}`;
  if (reportedErrorsSet.has(dedupeKey)) {
    return refId;
  }
  reportedErrorsSet.add(dedupeKey);
  setTimeout(() => {
    reportedErrorsSet.delete(dedupeKey);
  }, 5000);

  const payload: ClientErrorPayload = {
    refId,
    message,
    stack,
    url,
    userAgent,
    timestamp,
    context,
  };

  try {
    // Silent POST fetch with .catch() so failure never propagates or blocks the app
    fetch('/api/log-client-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // Keepalive ensures the request still delivers even if the user navigates away
      keepalive: true,
    }).catch(() => {
      // Intentionally silent: never break client execution due to network logging failures
    });
  } catch {
    // Intentionally silent
  }

  return refId;
}
