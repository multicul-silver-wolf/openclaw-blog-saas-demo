# API Validation Report

Generated at: 2026-02-24 11:08:39 UTC

## Positive Flow
- [x] GET /SKILL.md reachable
- [x] SKILL.md fetched successfully
- [x] search response: ```json\n{"status":"ok","data":{"items":[{"id":"blog_001","title":"Mock result 1","excerpt":"AI SEO starter patterns."}]},"error":null}\n```
- [x] generate id: `gen_zhhfoux8`
- [x] publish response: ```json\n{"status":"ok","data":{"publishId":"pub_mcpn67wu","url":"/mock-published/pub_mcpn67wu","state":"published"},"error":null}\n```
- [x] status response: ```json\n{"status":"ok","data":{"id":"gen_zhhfoux8","state":"published"},"error":null}\n```

## Negative Flow

- [x] unauthorized HTTP status: `401`
  - body: `{"status":"error","data":null,"error":{"code":"UNAUTHORIZED","message":"Invalid API key"}}`
- [x] bad request HTTP status: `400`
  - body: `{"status":"error","data":null,"error":{"code":"BAD_REQUEST","message":"topic is required"}}`
- [x] not found HTTP status: `404`
  - body: `{"status":"error","data":null,"error":{"code":"NOT_FOUND","message":"Post status not found"}}`
