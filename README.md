# Mock OpenClaw Blog SaaS Demo

A minimal Next.js demo to validate this integration pattern:

- Spec-style API endpoints
- Bearer API key auth
- Hosted `SKILL.md` to teach OpenClaw usage

## Run

```bash
pnpm install
pnpm dev
```

Open:
- Home: http://localhost:3000
- Playground: http://localhost:3000/playground
- Skill doc: http://localhost:3000/SKILL.md

## Auth

All `/api/v1/*` endpoints require:

```text
Authorization: Bearer sk-demo-openclaw-2026
```

## API Endpoints

- `POST /api/v1/search`
- `POST /api/v1/generate`
- `POST /api/v1/publish`
- `GET /api/v1/status/:id`

Response contract:

```json
{ "status": "ok|error", "data": {}, "error": null|{ "code": "...", "message": "..." } }
```

## cURL Flow

### 1) Search

```bash
curl -s -X POST http://localhost:3000/api/v1/search \
  -H "Authorization: Bearer sk-demo-openclaw-2026" \
  -H "Content-Type: application/json" \
  -d '{"query":"AI SEO"}'
```

### 2) Generate

```bash
curl -s -X POST http://localhost:3000/api/v1/generate \
  -H "Authorization: Bearer sk-demo-openclaw-2026" \
  -H "Content-Type: application/json" \
  -d '{"topic":"2026 AI 趋势","style":"deep","length":800,"language":"zh"}'
```

### 3) Publish

```bash
curl -s -X POST http://localhost:3000/api/v1/publish \
  -H "Authorization: Bearer sk-demo-openclaw-2026" \
  -H "Content-Type: application/json" \
  -d '{"id":"gen_xxx","platform":"mock-blog"}'
```

### 4) Status

```bash
curl -s -X GET http://localhost:3000/api/v1/status/gen_xxx \
  -H "Authorization: Bearer sk-demo-openclaw-2026"
```

## Notes

- In-memory only (no DB).
- No external service calls.
- Restarting dev server resets generated/published data.
