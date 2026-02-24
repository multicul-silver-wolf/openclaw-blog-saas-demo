# Implementation Plan & DoD (Mock OpenClaw Blog SaaS Demo)

## Plan

### Phase 0 — Baseline Alignment
- Lock API response schema to unified contract:
  - `{ status, data, error }`
- Lock hardcoded API key:
  - `sk-demo-openclaw-2026`
- Lock route scope:
  - `/api/v1/search`
  - `/api/v1/generate`
  - `/api/v1/publish`
  - `/api/v1/status/:id`
  - `/SKILL.md`

### Phase 1 — Core Mock API
- Create `src/lib/constants.ts`
  - Export `DEMO_API_KEY`
- Create `src/lib/mock-auth.ts`
  - Shared Bearer auth validator
- Create `src/lib/mock-store.ts`
  - In-memory stores for generated/published posts
- Implement endpoints:
  - `POST /api/v1/search`
  - `POST /api/v1/generate`
  - `POST /api/v1/publish`
  - `GET /api/v1/status/[id]`
- Implement standard error mapping:
  - `UNAUTHORIZED`, `BAD_REQUEST`, `NOT_FOUND`

### Phase 2 — OpenClaw Teaching Surface
- Add `public/SKILL.md`
- Ensure `GET /SKILL.md` is directly accessible (static serve)
- Include in SKILL.md:
  - Endpoint overview + request fields
  - Auth header usage
  - cURL examples
  - Error handling rules

### Phase 3 — Playground & Developer Experience
- Build `/playground`
  - Forms for search/generate/publish/status
  - Request/response JSON panels
  - Prefilled token field (`sk-demo-openclaw-2026`)
- Update `/` landing page
  - Demo overview + quick links (`/playground`, `/SKILL.md`)
- Update `README.md`
  - Run instructions
  - cURL test flow
  - `/SKILL.md` usage note

### Phase 4 — Verification & Consistency
- Run full manual flow:
  - search → generate → publish → status
- Run negative tests:
  - missing/invalid auth
  - missing required fields
  - unknown id
- Ensure consistency across:
  - spec, API behavior, SKILL.md, README

---

## Definition of Done (DoD)

### A) Functional DoD
- `pnpm dev` starts successfully.
- All 4 API endpoints are reachable and return unified schema.
- API access is accepted **only** with:
  - `Authorization: Bearer sk-demo-openclaw-2026`
- `/SKILL.md` is publicly readable and accurately describes API usage.

### B) API Contract DoD
- Success shape:
```json
{ "status": "ok", "data": { }, "error": null }
```
- Error shape:
```json
{ "status": "error", "data": null, "error": { "code": "...", "message": "..." } }
```
- Error codes are stable and used correctly:
  - `UNAUTHORIZED`
  - `BAD_REQUEST`
  - `NOT_FOUND`

### C) UX DoD
- `/playground` can complete full mocked flow with no external dependency.
- Playground clearly displays request/response payloads for each step.
- Home page links to `/playground` and `/SKILL.md`.

### D) Documentation DoD
- `docs/specs/mock-openclaw-blog-saas-spec.md` matches implementation behavior.
- `public/SKILL.md` includes valid endpoint + auth examples.
- `README.md` includes:
  - local run command
  - cURL examples for all routes
  - API key and `/SKILL.md` references

### E) Reliability DoD
- No persistence dependency (in-memory only).
- No external service/API calls in runtime flow.
- Restarting dev server resets demo data (expected behavior, documented).
