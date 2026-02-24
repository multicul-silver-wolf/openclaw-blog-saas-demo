import { NextRequest, NextResponse } from "next/server";

import { requireDemoApiKey } from "@/lib/mock-auth";
import { publishGeneratedPost } from "@/lib/mock-store";

type PublishBody = {
  id?: string;
  platform?: string;
};

export async function POST(request: NextRequest) {
  const unauthorized = requireDemoApiKey(request);
  if (unauthorized) return unauthorized;

  let body: PublishBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", data: null, error: { code: "BAD_REQUEST", message: "Invalid JSON body" } },
      { status: 400 },
    );
  }

  if (typeof body.id !== "string" || !body.id.trim()) {
    return NextResponse.json(
      { status: "error", data: null, error: { code: "BAD_REQUEST", message: "id is required" } },
      { status: 400 },
    );
  }

  const published = publishGeneratedPost(body.id, body.platform?.trim() || "mock-blog");
  if (!published) {
    return NextResponse.json(
      { status: "error", data: null, error: { code: "NOT_FOUND", message: "Generated post not found" } },
      { status: 404 },
    );
  }

  return NextResponse.json({
    status: "ok",
    data: { publishId: published.publishId, url: published.url, state: published.state },
    error: null,
  });
}
