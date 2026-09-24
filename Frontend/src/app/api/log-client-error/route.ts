import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force node runtime for filesystem operations
export const runtime = 'nodejs';

/**
 * Sanitizes single-line string fields to prevent Log Injection / CRLF attacks
 */
function sanitizeSingleLine(str: unknown, maxLen = 300): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\r\n\t]/g, ' ')
    .trim()
    .slice(0, maxLen);
}

/**
 * Sanitizes multi-line string fields like stack traces
 */
function sanitizeMultiLine(str: unknown, maxLen = 10000): string {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLen).trim();
}

/**
 * Appends client error to local log file safely
 */
function appendToLogFile(logEntry: object) {
  try {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const logFilePath = path.join(logsDir, 'client-errors.log');
    const line = JSON.stringify(logEntry) + '\n';
    fs.appendFileSync(logFilePath, line, 'utf8');
  } catch (fileErr) {
    // Non-blocking log file write fallback
    console.error('[Telemetry Logger] Failed to write to log file:', (fileErr as Error)?.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Validate & sanitize incoming telemetry data
    const refId = sanitizeSingleLine(body.refId || `ERR-${Date.now().toString(36).toUpperCase()}`, 32);
    const message = sanitizeSingleLine(body.message || 'Unknown Client Error', 500);
    const stack = sanitizeMultiLine(body.stack || 'No stack trace available', 15000);
    const url = sanitizeSingleLine(body.url || 'Unknown URL', 2048);
    const userAgent = sanitizeSingleLine(body.userAgent || 'Unknown User-Agent', 512);
    const context = sanitizeSingleLine(body.context || 'ClientErrorBoundary', 100);
    const timestamp = sanitizeSingleLine(body.timestamp || new Date().toISOString(), 64);

    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     '127.0.0.1';

    // Structured log payload for storage
    const structuredLog = {
      refId,
      timestamp,
      context,
      url,
      clientIp,
      userAgent,
      message,
      stack,
    };

    // Formatted, easy-to-read console output for developers & observability tools
    console.error('\n' + '='.repeat(70));
    console.error(`🚨 [CLIENT TELEMETRY ERROR] Ref: ${refId}`);
    console.error('='.repeat(70));
    console.error(`📅 Timestamp:  ${timestamp}`);
    console.error(`📍 Source URL: ${url}`);
    console.error(`🏷️  Context:    ${context}`);
    console.error(`🌐 IP / Agent: ${clientIp} | ${userAgent}`);
    console.error(`💬 Message:    ${message}`);
    console.error('-'.repeat(70));
    console.error('📜 Full Client Stack Trace:');
    console.error(stack);
    console.error('='.repeat(70) + '\n');

    // Persist to local server log file
    appendToLogFile(structuredLog);

    return NextResponse.json(
      {
        success: true,
        refId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Telemetry Logger] Error processing telemetry payload:', error);
    // Always return 200 with success: false to prevent client-side cascading retry storms
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to process client log',
      },
      { status: 200 }
    );
  }
}
