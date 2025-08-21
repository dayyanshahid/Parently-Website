/**
 * Centralized environment access for Vite
 * Usage:
 *   import { BACKEND_ENABLED, API_BASE_URL } from '../config/env';
 */

const rawEnabled = import.meta.env.VITE_BACKEND_ENABLED;
export const BACKEND_ENABLED =
  rawEnabled === true ||
  rawEnabled === 'true' ||
  rawEnabled === '1' ||
  rawEnabled === 1;

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

// Debug logging
console.log('[ENV] VITE_BACKEND_ENABLED:', import.meta.env.VITE_BACKEND_ENABLED);
console.log('[ENV] BACKEND_ENABLED:', BACKEND_ENABLED);
console.log('[ENV] VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('[ENV] API_BASE_URL:', API_BASE_URL);

export function assertBackendConfigured() {
  if (!BACKEND_ENABLED) {
    console.log('[ENV] Backend is disabled, skipping configuration check');
    return;
  }
  if (!API_BASE_URL) {
    // Soft warn in dev; avoids crashing the UI
    // eslint-disable-next-line no-console
    console.warn('[ENV] VITE_BACKEND_ENABLED is true but VITE_API_BASE_URL is empty.');
  } else {
    console.log('[ENV] Backend is enabled and configured with API_BASE_URL:', API_BASE_URL);
  }
}
