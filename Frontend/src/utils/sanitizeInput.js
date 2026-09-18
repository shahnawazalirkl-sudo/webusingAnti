/**
 * sanitizeInput.js - Client-Side Input Sanitization & Validation Helpers
 * Protects against Stored XSS, injection, and invalid formats
 */

/**
 * Strips script tags, HTML tags, null bytes, and trims whitespace
 */
export function sanitizeString(value, maxLength = 500) {
  if (typeof value !== 'string') return '';
  
  return value
    .replace(/\0/g, '') // Remove null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script blocks
    .replace(/<[^>]+>/g, '') // Strip HTML tags
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates email address format
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates phone numbers (supports Indian & International formats)
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const phoneRegex = /^\+?[0-9]{10,14}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Recursively sanitizes all string properties within an object
 */
export function sanitizeFormData(data) {
  if (!data || typeof data !== 'object') return data;
  
  if (Array.isArray(data)) {
    return data.map((item) =>
      typeof item === 'string' ? sanitizeString(item) : sanitizeFormData(item)
    );
  }

  const clean = {};
  for (const [key, val] of Object.entries(data)) {
    if (typeof val === 'string') {
      clean[key] = sanitizeString(val);
    } else if (typeof val === 'object' && val !== null) {
      clean[key] = sanitizeFormData(val);
    } else {
      clean[key] = val;
    }
  }
  return clean;
}
