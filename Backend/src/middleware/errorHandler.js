import fs from 'fs';
import path from 'path';

/**
 * Appends server error to logs/server-errors.log safely
 */
function appendServerError(record) {
  try {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const logFilePath = path.join(logsDir, 'server-errors.log');
    fs.appendFileSync(logFilePath, JSON.stringify(record) + '\n', 'utf8');
  } catch (err) {
    console.error('[Error Logger] Failed to write server log:', err.message);
  }
}

/**
 * 404 Route Not Found Handler
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'The requested resource was not found.',
    statusCode: 404,
  });
};

/**
 * Global Centralized Error Handler
 * - Prevents technical stack traces and line numbers from leaking to clients
 * - Standardizes safe, user-friendly API error responses
 * - Attaches an incident reference ID for auditability and support tickets
 */
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  
  // Generate random incident reference ID for server error
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const refId = `SRV-${rand}`;
  const timestamp = new Date().toISOString();

  // Internal detailed server-side logging
  console.error('\n' + '='.repeat(70));
  console.error(`🚨 [SERVER EXCEPTION] Ref: ${refId} | Status: ${statusCode}`);
  console.error('='.repeat(70));
  console.error(`📅 Timestamp: ${timestamp}`);
  console.error(`📍 Route:     ${req.method} ${req.originalUrl}`);
  console.error(`💬 Message:   ${err.message}`);
  if (err.stack) {
    console.error('-'.repeat(70));
    console.error('📜 Server Stack Trace:');
    console.error(err.stack);
  }
  console.error('='.repeat(70) + '\n');

  // Persist server error to log file
  appendServerError({
    refId,
    timestamp,
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message: err.message,
    stack: err.stack,
  });

  // Client response: strictly NO stack traces, internal file paths, or line numbers
  const isClientSafe = statusCode < 500 && err.isOperational;
  const userMessage = isClientSafe
    ? err.message
    : 'An unexpected error occurred while processing your request. Please try again later.';

  res.status(statusCode).json({
    success: false,
    error: userMessage,
    refId,
    statusCode,
  });
};
