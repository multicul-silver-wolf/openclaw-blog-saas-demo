import { NextRequest, NextResponse } from "next/server";

import { requireDemoApiKey } from "@/lib/mock-auth";
import { searchPosts } from "@/lib/mock-store";

export async function POST(request: NextRequest) {
  const unauthorized = requireDemoApiKey(request);
  if (unauthorized) return unauthorized;

  let body: { query?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", data: null, error: { code: "BAD_REQUEST", message: "Invalid JSON body" } },
      { status: 400 },
    );
  }

  if (typeof body.query !== "string") {
    return NextResponse.json(
      { status: "error", data: null, error: { code: "BAD_REQUEST", message: "query is required" } },
      { status: 400 },
    );
  }

  return NextResponse.json({ status: "ok", data: { items: searchPosts(body.query) }, error: null });
}
