// ─────────────────────────────────────────────────────────────────────────
// Security helpers
// ─────────────────────────────────────────────────────────────────────────
// Use these utilities whenever you add forms, auth, or persisted state.
// ─────────────────────────────────────────────────────────────────────────

/**
 * SAFE-FOR-localStorage CHECKLIST
 * ────────────────────────────────────────────────────────────────────────
 * localStorage is readable by any JS on the same origin (incl. XSS payloads).
 * NEVER store any of the following client-side:
 *   ✗ Auth tokens / JWTs / session IDs   → use httpOnly Secure cookies
 *   ✗ API keys, OAuth tokens, refresh tokens
 *   ✗ Personal data (email, phone, address, payment info)
 *   ✗ Server-issued user identifiers
 *
 * SAFE to store:
 *   ✓ UI preferences (theme, language, layout)
 *   ✓ Non-PII analytics consent flag (this app uses 'ks-analytics-consent')
 *   ✓ Feature-flag overrides for the current device
 *
 * Always wrap access in try/catch — Safari private mode throws on write.
 */
export const LOCAL_STORAGE_ALLOWLIST = Object.freeze([
  'ks-analytics-consent',
  'ks-theme', // future use
]);

export function safeLocalSet(key, value) {
  if (!LOCAL_STORAGE_ALLOWLIST.includes(key)) {
    if (import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[security] Blocked localStorage write to non-allowlisted key: "${key}"`);
    }
    return false;
  }
  try { localStorage.setItem(key, String(value)); return true; } catch { return false; }
}

export function safeLocalGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

// ─────────────────────────────────────────────────────────────────────────
// Cookie helpers — SameSite=Strict by default
// ─────────────────────────────────────────────────────────────────────────
// For real auth, set cookies SERVER-SIDE with HttpOnly + Secure + SameSite=Strict.
// JS-readable cookies set here are only suitable for non-sensitive UI state
// (e.g. CSRF double-submit token mirror, locale preference).

/**
 * @param {string} name
 * @param {string} value
 * @param {{ days?: number, path?: string, sameSite?: 'Strict'|'Lax'|'None' }} [opts]
 */
export function setCookie(name, value, opts = {}) {
  const { days = 365, path = '/', sameSite = 'Strict' } = opts;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
  document.cookie =
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}` +
    `; Expires=${expires}; Path=${path}; SameSite=${sameSite}${secure}`;
}

export function getCookie(name) {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(encodeURIComponent(name) + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

export function deleteCookie(name, path = '/') {
  document.cookie = `${encodeURIComponent(name)}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}; SameSite=Strict`;
}

// ─────────────────────────────────────────────────────────────────────────
// Input validation — client + server pattern
// ─────────────────────────────────────────────────────────────────────────
// Client-side validation is for UX only. ALWAYS re-validate on the server
// before persisting, emailing, or forwarding to a third party.
//
// Recommended: install `zod` (`npm i zod`) and define schemas like:
//
//   import { z } from 'zod';
//   export const ContactSchema = z.object({
//     name:    z.string().trim().min(1).max(100),
//     email:   z.string().trim().email().max(255),
//     message: z.string().trim().min(1).max(2000),
//   });
//
// Until then, here are dependency-free validators for common form fields.
// ─────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validators = {
  email(value) {
    const v = String(value ?? '').trim();
    if (!v) return 'Email is required.';
    if (v.length > 255) return 'Email is too long.';
    if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';
    return null;
  },
  name(value) {
    const v = String(value ?? '').trim();
    if (!v) return 'Name is required.';
    if (v.length > 100) return 'Name must be under 100 characters.';
    return null;
  },
  message(value, { max = 2000 } = {}) {
    const v = String(value ?? '').trim();
    if (!v) return 'Message is required.';
    if (v.length > max) return `Message must be under ${max} characters.`;
    return null;
  },
};

/**
 * Run multiple validators and return a `{ field: errorMessage }` map.
 * Empty object = valid.
 */
export function validateForm(data, schema) {
  const errors = {};
  for (const [field, validate] of Object.entries(schema)) {
    const err = validate(data[field]);
    if (err) errors[field] = err;
  }
  return errors;
}
