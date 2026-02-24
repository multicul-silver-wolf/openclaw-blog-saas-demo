---
name: mock-openclaw-blog-saas
description: Teach OpenClaw how to use this demo blog SaaS via Bearer API key.
user-invocable: true
metadata:
  openclaw:
    emoji: "📝"
    homepage: "http://localhost:3000/SKILL.md"
---

# Mock OpenClaw Blog SaaS Skill

Use this service when the user asks to search blog ideas, generate a blog draft, publish generated content, or check task status.

## Auth

Always send this header:

```bash
Authorization: Bearer sk-demo-openclaw-2026
```

## API Base

```text
http://localhost:3000/api/v1
```

## Endpoints

### 1) Search
`POST /search`

```json
{ "query": "AI SEO" }
```

### 2) Generate
`POST /generate`

```json
{ "topic": "2026 AI 趋势", "style": "deep", "length": 800, "language": "zh" }
```

### 3) Publish
`POST /publish`

```json
{ "id": "gen_xxx", "platform": "mock-blog" }
```

### 4) Status
`GET /status/:id`

## cURL Examples

```bash
curl -s -X POST http://localhost:3000/api/v1/search \
  -H "Authorization: Bearer sk-demo-openclaw-2026" \
  -H "Content-Type: application/json" \
  -d '{"query":"AI SEO"}'
```

```bash
curl -s -X POST http://localhost:3000/api/v1/generate \
  -H "Authorization: Bearer sk-demo-openclaw-2026" \
  -H "Content-Type: application/json" \
  -d '{"topic":"2026 AI 趋势","style":"deep","length":800,"language":"zh"}'
```

```bash
curl -s -X POST http://localhost:3000/api/v1/publish \
  -H "Authorization: Bearer sk-demo-openclaw-2026" \
  -H "Content-Type: application/json" \
  -d '{"id":"gen_xxx","platform":"mock-blog"}'
```

```bash
curl -s -X GET http://localhost:3000/api/v1/status/gen_xxx \
  -H "Authorization: Bearer sk-demo-openclaw-2026"
```

## Rules

1. Always include Bearer token.
2. Parse JSON response in this order: `status` → `data` / `error`.
3. Handle errors:
   - `UNAUTHORIZED` (wrong/missing key)
   - `BAD_REQUEST` (missing request fields)
   - `NOT_FOUND` (unknown id)
