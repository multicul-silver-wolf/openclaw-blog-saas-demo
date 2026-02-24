"use client";

import { useState } from "react";

type JsonValue = Record<string, unknown>;

async function callApi(path: string, method: "GET" | "POST", token: string, body?: JsonValue) {
  const response = await fetch(path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
    },
    ...(method === "POST" ? { body: JSON.stringify(body ?? {}) } : {}),
  });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = { status: "error", data: null, error: { code: "BAD_RESPONSE", message: "Non-JSON response" } };
  }

  return {
    httpStatus: response.status,
    payload,
  };
}

export default function PlaygroundPage() {
  const [token, setToken] = useState("sk-demo-openclaw-2026");
  const [query, setQuery] = useState("AI SEO");
  const [topic, setTopic] = useState("2026 AI 趋势");
  const [style, setStyle] = useState("deep");
  const [length, setLength] = useState("800");
  const [language, setLanguage] = useState("zh");
  const [generateId, setGenerateId] = useState("");
  const [platform, setPlatform] = useState("mock-blog");
  const [statusId, setStatusId] = useState("");
  const [lastRequest, setLastRequest] = useState<string>("{}");
  const [lastResponse, setLastResponse] = useState<string>("{}");

  async function runSearch() {
    const req = { query };
    setLastRequest(JSON.stringify({ endpoint: "/api/v1/search", method: "POST", body: req }, null, 2));
    const res = await callApi("/api/v1/search", "POST", token, req);
    setLastResponse(JSON.stringify(res, null, 2));
  }

  async function runGenerate() {
    const req = { topic, style, length: Number(length), language };
    setLastRequest(JSON.stringify({ endpoint: "/api/v1/generate", method: "POST", body: req }, null, 2));
    const res = await callApi("/api/v1/generate", "POST", token, req);
    const id = (res.payload as { data?: { id?: string } })?.data?.id;
    if (id) {
      setGenerateId(id);
      setStatusId(id);
    }
    setLastResponse(JSON.stringify(res, null, 2));
  }

  async function runPublish() {
    const req = { id: generateId, platform };
    setLastRequest(JSON.stringify({ endpoint: "/api/v1/publish", method: "POST", body: req }, null, 2));
    const res = await callApi("/api/v1/publish", "POST", token, req);
    setLastResponse(JSON.stringify(res, null, 2));
  }

  async function runStatus() {
    setLastRequest(JSON.stringify({ endpoint: `/api/v1/status/${statusId}`, method: "GET" }, null, 2));
    const res = await callApi(`/api/v1/status/${statusId}`, "GET", token);
    setLastResponse(JSON.stringify(res, null, 2));
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Mock OpenClaw Blog SaaS Playground</h1>
      <p className="text-sm text-zinc-600">Demo focus: OpenClaw can work with spec API + Bearer auth + SKILL.md.</p>

      <section className="rounded-lg border p-4 space-y-3">
        <label className="block text-sm font-medium">Bearer token</label>
        <input className="w-full rounded border px-3 py-2" value={token} onChange={(e) => setToken(e.target.value)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4 space-y-3">
          <h2 className="font-semibold">1) Search</h2>
          <input className="w-full rounded border px-3 py-2" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className="rounded bg-black px-3 py-2 text-white" onClick={runSearch}>Run Search</button>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <h2 className="font-semibold">2) Generate</h2>
          <input className="w-full rounded border px-3 py-2" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="topic" />
          <input className="w-full rounded border px-3 py-2" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="style" />
          <input className="w-full rounded border px-3 py-2" value={length} onChange={(e) => setLength(e.target.value)} placeholder="length" />
          <input className="w-full rounded border px-3 py-2" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="language" />
          <button className="rounded bg-black px-3 py-2 text-white" onClick={runGenerate}>Run Generate</button>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <h2 className="font-semibold">3) Publish</h2>
          <input className="w-full rounded border px-3 py-2" value={generateId} onChange={(e) => setGenerateId(e.target.value)} placeholder="gen_xxx" />
          <input className="w-full rounded border px-3 py-2" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="platform" />
          <button className="rounded bg-black px-3 py-2 text-white" onClick={runPublish}>Run Publish</button>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <h2 className="font-semibold">4) Status</h2>
          <input className="w-full rounded border px-3 py-2" value={statusId} onChange={(e) => setStatusId(e.target.value)} placeholder="gen_xxx" />
          <button className="rounded bg-black px-3 py-2 text-white" onClick={runStatus}>Run Status</button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Last Request</h3>
          <pre className="overflow-auto text-xs">{lastRequest}</pre>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Last Response</h3>
          <pre className="overflow-auto text-xs">{lastResponse}</pre>
        </div>
      </section>
    </main>
  );
}
