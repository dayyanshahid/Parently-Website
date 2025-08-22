import { BACKEND_ENABLED, API_BASE_URL, assertBackendConfigured } from '../config/env';

/**
 * Submit waitlist data to backend API.
 * No-ops when BACKEND is disabled or not configured.
 * Returns:
 *  - { skipped: true } when backend disabled
 *  - { ok: true } on success
 *  - { ok: false, duplicate: true } on duplicate email
 *  - { ok: false, error: string } on other failures
 */
export async function submitWaitlist(payload) {
  console.log('[WAITLIST] submitWaitlist called with payload:', payload);
  
  if (!BACKEND_ENABLED || !API_BASE_URL) {
    console.log('[WAITLIST] Backend disabled or API_BASE_URL not set, skipping submission');
    return { skipped: true };
  }
  assertBackendConfigured();

  const url = `${API_BASE_URL}/wait_list`;
  console.log('[WAITLIST] Making POST request to:', url);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('[WAITLIST] Response status:', res.status);
    console.log('[WAITLIST] Response ok:', res.ok);

    if (res.status === 409) {
      console.log('[WAITLIST] Duplicate email detected');
      return { ok: false, duplicate: true };
    }

    if (!res.ok) {
      const text = await safeReadText(res);
      console.log('[WAITLIST] Request failed with text:', text);
      return { ok: false, error: text || res.statusText || 'Request failed' };
    }

    console.log('[WAITLIST] Submission successful');
    return { ok: true };
  } catch (err) {
    console.error('[WAITLIST] Network error:', err);
    return { ok: false, error: err?.message || String(err) };
  }
}

/**
 * Fetch total waitlist count from backend API.
 * Returns a number on success, or null when not available or disabled.
 */
export async function getWaitlistCount() {
  console.log('[STATS] getWaitlistCount called');
  
  if (!BACKEND_ENABLED || !API_BASE_URL) {
    console.log('[STATS] Backend disabled or API_BASE_URL not set, returning null');
    return null;
  }
  assertBackendConfigured();

  const url = `${API_BASE_URL}/stats`;
  console.log('[STATS] Making GET request to:', url);

  try {
    const res = await fetch(url, { method: 'GET' });
    console.log('[STATS] Response status:', res.status);
    console.log('[STATS] Response ok:', res.ok);
    
    if (!res.ok) {
      console.log('[STATS] Request failed, returning null');
      return null;
    }

    const data = await res.json().catch(() => null);
    console.log('[STATS] Response data:', data);
    
    if (!data) {
      console.log('[STATS] No data received, returning null');
      return null;
    }

    const n = Number(data.totalWaitlist);
    console.log('[STATS] Parsed count:', n);
    return Number.isFinite(n) ? n : null;
  } catch (err) {
    console.error('[STATS] Network error:', err);
    return null;
  }
}

async function safeReadText(res) {
  try {
    return await res.text();
  } catch {
    return undefined;
  }
}
