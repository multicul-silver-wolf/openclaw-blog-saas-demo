# Spec: Mock OpenClaw Blog SaaS Demo (Next.js only)

## 1) Scope

A minimal **Next.js demo** that simulates how a SaaS could be consumed by OpenClaw agents.

Constraints (locked):
- No external services.
- All API responses are mocked/in-memory.
- Goal is architecture clarity + runnable demo, not production infra.

## 2) Demo Objective

Show a full “search → generate → publish → status” flow + a hosted `SKILL.md` that teaches OpenClaw how to call the APIs with API key.

## 3) API Contract (Mocked)

Base path: `/api/v1`

### 3.1 POST `/api/v1/search`
Request:
```json
{ "query": "AI SEO" }
```
Response:
```json
{
  "status": "ok",
  "data": {
    "items": [
      { "id": "blog_001", "title": "Mock result 1", "excerpt": "..." }
    ]
  },
  "error": null
}
```

### 3.2 POST `/api/v1/generate`
Request:
```json
{ "topic": "2026 AI 趋势", "style": "deep", "length": 800, "language": "zh" }
```
Response:
```json
{
  "status": "ok",
  "data": {
    "id": "gen_xxx",
    "content": "# 2026 AI 趋势\n...",
    "state": "generated"
  },
  "error": null
}
```

### 3.3 POST `/api/v1/publish`
Request:
```json
{ "id": "gen_xxx", "platform": "mock-blog" }
```
Response:
```json
{
  "status": "ok",
  "data": {
    "publishId": "pub_xxx",
    "url": "/mock-published/pub_xxx",
    "state": "published"
  },
  "error": null
}
```

### 3.4 GET `/api/v1/status/:id`
Response:
```json
{
  "status": "ok",
  "data": {
    "id": "gen_xxx",
    "state": "generated|publishing|published|failed"
  },
  "error": null
}
```

## 4) Security Model (Mock, hardcoded)

- Hardcoded API key constant:
  - `DEMO_API_KEY = "sk-demo-openclaw-2026"`
- All `/api/v1/*` endpoints require:
  - `Authorization: Bearer sk-demo-openclaw-2026`
- If missing/invalid, return:
```json
{ "status": "error", "data": null, "error": { "code": "UNAUTHORIZED", "message": "Invalid API key" } }
```
- This is only for integration behavior simulation.

## 5) OpenClaw Skill Discovery Route

To support this story:
- user: "i want to teach openclaw how to use this demo"
- openclaw: "read https://example/.../SKILL.md then know how to access apis with apikey"

We provide a hosted skill document route:
- `GET /SKILL.md`

Implementation:
- store file at `public/SKILL.md`
- Next.js will serve it directly at `https://<demo-domain>/SKILL.md`

`SKILL.md` content requirements:
- clearly describe 4 endpoints (`search/generate/publish/status`)
- include hardcoded demo key usage (`Authorization: Bearer sk-demo-openclaw-2026`)
- include curl examples
- include rules: always send auth header, parse `status/data/error`, handle `UNAUTHORIZED` and `NOT_FOUND`

## 6) Data Model (in-memory)

Use module-level stores:
- `generatedPosts: Record<string, GeneratedPost>`
- `publishedPosts: Record<string, PublishedPost>`

No DB, no persistence after restart.

## 7) Frontend Pages

- `/` landing page: project intro + quick API examples + link to `/SKILL.md`
- `/playground` interactive tester:
  - form inputs for search/generate/publish/status
  - request/response JSON panels
  - prefilled auth token field (`sk-demo-openclaw-2026`)

## 8) Folder Plan

```txt
public/
  SKILL.md
src/
  app/
    page.tsx
    playground/page.tsx
    api/v1/search/route.ts
    api/v1/generate/route.ts
    api/v1/publish/route.ts
    api/v1/status/[id]/route.ts
  lib/
    mock-store.ts
    mock-auth.ts
    mock-types.ts
    constants.ts   # DEMO_API_KEY
```

## 9) Error Handling Standard

All endpoints return:
```json
{ "status": "ok|error", "data": {}, "error": null|{ "code": "...", "message": "..." } }
```

Validation errors:
- `BAD_REQUEST` for missing fields.
- `NOT_FOUND` for unknown ids.
- `UNAUTHORIZED` for invalid token.

## 10) Docs to include

- `docs/discussion/2026-02-24-grok-integration-notes.md` (raw discussion)
- `docs/specs/mock-openclaw-blog-saas-spec.md` (this file)
- `public/SKILL.md` (OpenClaw-readable usage contract)
- `README.md` updates (run instructions + curl examples + `/SKILL.md` URL)

## 11) Delivery Phases

Phase A (done):
- Scaffold complete ✅
- Discussion + spec docs ✅

Phase B (next coding pass):
- Implement mocked API routes with hardcoded key check
- Create `public/SKILL.md`
- Build playground UI
- Add README curl examples

## 12) Acceptance Criteria

- `pnpm dev` runs successfully.
- 4 endpoints respond with unified JSON schema.
- Auth check works only with `Bearer sk-demo-openclaw-2026`.
- `/SKILL.md` is publicly accessible and instructive for OpenClaw integration.
- Playground can complete full mocked flow without external dependencies.
