import fs from 'fs';
import path from 'path';

/**
 * Sanitizes single-line string fields to prevent Log Injection / CRLF attacks
 */
function sanitizeSingleLine(str, maxLen = 300) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\r\n\t]/g, ' ')
    .trim()
    .slice(0, maxLen);
}

/**
 * Sanitizes multi-line string fields like stack traces
 */
function sanitizeMultiLine(str, maxLen = 15000) {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLen).trim();
}

/**
 * Appends error entry to local server log file
 */
function appendToLogFile(logEntry) {
  try {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const logFilePath = path.join(logsDir, 'client-errors.log');
    const line = JSON.stringify(logEntry) + '\n';
    fs.appendFileSync(logFilePath, line, 'utf8');
  } catch (fileErr) {
    console.error('[Backend Logger] Failed to write to log file:', fileErr.message);
  }
}

/**
 * Controller to receive and record client-side error telemetry
 */
export const logClientError = (req, res) => {
  try {
    const body = req.body || {};

    const refId = sanitizeSingleLine(body.refId || `ERR-${Date.now().toString(36).toUpperCase()}`, 32);
    const message = sanitizeSingleLine(body.message || 'Unknown Client Error', 500);
    const stack = sanitizeMultiLine(body.stack || 'No stack trace provided', 15000);
    const url = sanitizeSingleLine(body.url || 'Unknown URL', 2048);
    const userAgent = sanitizeSingleLine(body.userAgent || req.headers['user-agent'] || 'Unknown User-Agent', 512);
    const context = sanitizeSingleLine(body.context || 'ClientTelemetry', 100);
    const timestamp = sanitizeSingleLine(body.timestamp || new Date().toISOString(), 64);

    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                     req.socket?.remoteAddress || 
                     '127.0.0.1';

    const logRecord = {
      refId,
      timestamp,
      context,
      url,
      clientIp,
      userAgent,
      message,
      stack,
    };

    // Formatted, easy-to-read console output for backend terminal
    console.error('\n' + '='.repeat(70));
    console.error(`🚨 [BACKEND CLIENT TELEMETRY RECEIVER] Ref: ${refId}`);
    console.error('='.repeat(70));
    console.error(`📅 Timestamp:  ${timestamp}`);
    console.error(`📍 Source URL: ${url}`);
    console.error(`🏷️  Context:    ${context}`);
    console.error(`🌐 IP / Agent: ${clientIp} | ${userAgent}`);
    console.error(`💬 Message:    ${message}`);
    console.error('-'.repeat(70));
    console.error('📜 Client Stack Trace:');
    console.error(stack);
    console.error('='.repeat(70) + '\n');

    // Append to local log file
    appendToLogFile(logRecord);

    return res.status(200).json({
      success: true,
      refId,
    });
  } catch (err) {
    console.error('[Backend Logger] Error handling log-client-error request:', err);
    return res.status(200).json({
      success: false,
      error: 'Unable to process client log',
    });
  }
};
