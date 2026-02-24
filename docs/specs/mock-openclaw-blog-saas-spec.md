# Spec: Mock OpenClaw Blog SaaS Demo (Next.js only)

## 1) Scope

A minimal **Next.js demo** that simulates how a SaaS could be consumed by OpenClaw agents.

Constraints (locked):
- No external services.
- All API responses are mocked/in-memory.
- Goal is architecture clarity + runnable demo, not production infra.

## 2) Demo Objective

Show a full “search → generate → publish → status” flow with consistent JSON contract so agent-side integration is obvious.

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

## 4) Security Model (Mock)

- Accept `Authorization: Bearer demo-key`.
- If missing/invalid, return:
```json
{ "status": "error", "data": null, "error": { "code": "UNAUTHORIZED", "message": "Invalid API key" } }
```
- This is only for integration behavior simulation.

## 5) Data Model (in-memory)

Use module-level stores:
- `generatedPosts: Record<string, GeneratedPost>`
- `publishedPosts: Record<string, PublishedPost>`

No DB, no persistence after restart.

## 6) Frontend Pages

- `/` landing page: project intro + quick API examples.
- `/playground` interactive tester:
  - form inputs for search/generate/publish/status
  - request/response JSON panels
  - prefilled auth token field

## 7) Folder Plan

```txt
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
```

## 8) Error Handling Standard

All endpoints return:
```json
{ "status": "ok|error", "data": {}, "error": null|{ "code": "...", "message": "..." } }
```

Validation errors:
- `BAD_REQUEST` for missing fields.
- `NOT_FOUND` for unknown ids.
- `UNAUTHORIZED` for invalid token.

## 9) Docs to include

- `docs/discussion/2026-02-24-grok-integration-notes.md` (raw discussion)
- `docs/specs/mock-openclaw-blog-saas-spec.md` (this file)
- `README.md` updates (run instructions + curl examples)

## 10) Delivery Phases

Phase A (now):
- Scaffold complete ✅
- Discussion + spec docs ✅

Phase B (next coding pass):
- Implement mocked API routes
- Build playground UI
- Add README curl examples

## 11) Acceptance Criteria

- `pnpm dev` runs successfully.
- 4 endpoints respond with the unified JSON schema.
- Auth check works with `Bearer demo-key`.
- Playground can complete full mocked flow without external dependencies.
