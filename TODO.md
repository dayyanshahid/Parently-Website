# Parently Web - Backend Integration Readiness and Optimizations

This TODO tracks the approved plan to optimize the frontend for all screens without changing styling or current behavior, and to prepare for MySQL backend integration for the waitlist and stats.

## Plan Checklist

- [x] 1) Integration scaffolding (no visible behavior change)
  - [x] Create src/config/env.js to centralize VITE_ env access
  - [x] Create src/services/waitlistService.js with:
    - submitWaitlist(payload) - POST to `${VITE_API_BASE_URL}/waitlist` when enabled
    - getWaitlistCount() - GET `${VITE_API_BASE_URL}/stats` when enabled
  - [x] Create .env.example with:
    - VITE_BACKEND_ENABLED=false
    - VITE_API_BASE_URL=
  - [x] Create docs/INTEGRATION.md with MySQL schema and API contract

- [x] 2) Frontend wiring (feature-flagged)
  - [x] Waitlist.jsx: add optional submit handler when VITE_BACKEND_ENABLED=true (no UI changes)
  - [x] Stats.jsx: add optional effect to fetch count when VITE_BACKEND_ENABLED=true (fallback to current static)

- [x] 3) Performance polish (no styling/functional change)
  - [x] Streamline.jsx: memoize features data with useMemo; add loading="lazy" and decoding="async" to images; wrap with React.memo
  - [x] FamilyAssistant.jsx: import iphones asset; add loading="lazy" and decoding="async"; wrap with React.memo
  - [x] Additional: Wrapped Features, Cards, Header with React.memo; optimized images in Cards

- [x] 4) MySQL readiness (documentation)
  - [x] Document minimal schema and API contract in docs/INTEGRATION.md
  - [x] Provide integration instructions and environment variable usage

## Notes

- No styling will be changed.
- Functionality remains the same until `VITE_BACKEND_ENABLED=true`.
- When you provide MySQL credentials and the API base URL, we will toggle the flag and test end-to-end.
