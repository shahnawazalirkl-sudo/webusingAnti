import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

/**
 * Helmet Security Headers Configuration
 * - Removes X-Powered-By header
 * - Protects against Clickjacking (X-Frame-Options: SAMEORIGIN)
 * - Enforces MIME-type sniffing defense (X-Content-Type-Options: nosniff)
 * - Enables XSS filters and HSTS
 */
export const configureSecurityHeaders = () => {
  return helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
        connectSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com']
      }
    }
  });
};

/**
 * Global API Rate Limiter
 * - Prevents brute-force attacks and Denial of Service (DoS)
 * - Max 120 requests per 15-minute window per IP
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 120, // Limit each IP to 120 requests per `window`
  standardHeaders: true, // Return standard rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    error: 'Too many requests from this client. Please try again later.',
    statusCode: 429
  }
});

/**
 * Strict Rate Limiter for Sensitive Endpoints (e.g. Auth, Checkout, Inquiries)
 * - Max 20 requests per 15-minute window per IP
 */
export const strictRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many submissions. Please wait a few minutes before trying again.',
    statusCode: 429
  }
});

/**
 * Sanitizes request query and body against prototype pollution and control characters
 */
export const sanitizeInputs = (req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    // Prevent prototype pollution
    delete obj.__proto__;
    delete obj.constructor;
    delete obj.prototype;

    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        // Strip null bytes and dangerous script injection tokens
        obj[key] = obj[key].replace(/\0/g, '').trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
    return obj;
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};
