/**
 * safeStorage.js - Secure and Resilient LocalStorage Wrapper
 * Protects against:
 * 1. Prototype Pollution attacks (__proto__, constructor, prototype)
 * 2. Malformed JSON / Client-side DoS crashes
 * 3. Type mismatch vulnerabilities
 * 4. QuotaExceeded errors
 */

/**
 * Deeply strips dangerous keys from parsed objects to prevent prototype pollution
 */
function sanitizeObject(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const cleanObj = Object.create(null);
  for (const key of Object.keys(obj)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    cleanObj[key] = sanitizeObject(obj[key]);
  }
  return { ...cleanObj };
}

export const safeStorage = {
  /**
   * Safely retrieve and parse a value from localStorage with a default fallback
   */
  getItem: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return defaultValue;
      }
      const raw = window.localStorage.getItem(key);
      if (raw === null || raw === undefined) {
        return defaultValue;
      }
      const parsed = JSON.parse(raw);
      const sanitized = sanitizeObject(parsed);

      // If default is an array, ensure result is an array
      if (Array.isArray(defaultValue) && !Array.isArray(sanitized)) {
        return defaultValue;
      }

      // If default is a plain object, ensure result is a non-null object
      if (
        defaultValue !== null &&
        typeof defaultValue === 'object' &&
        !Array.isArray(defaultValue) &&
        (typeof sanitized !== 'object' || Array.isArray(sanitized) || sanitized === null)
      ) {
        return defaultValue;
      }

      return sanitized !== null ? (sanitized as T) : defaultValue;
    } catch (err) {
      console.warn(`[SafeStorage] Failed to parse key "${key}", using fallback:`, err);
      return defaultValue;
    }
  },

  /**
   * Safely set a serialized value to localStorage
   */
  setItem: (key: string, value: unknown): boolean => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      const sanitized = sanitizeObject(value);
      window.localStorage.setItem(key, JSON.stringify(sanitized));
      return true;
    } catch (err) {
      console.warn(`[SafeStorage] Failed to save key "${key}" to localStorage:`, err);
      return false;
    }
  },

  /**
   * Safely remove an item from localStorage
   */
  removeItem: (key: string): boolean => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      window.localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.warn(`[SafeStorage] Failed to remove key "${key}" from localStorage:`, err);
      return false;
    }
  }
};
