import { NextRequest, NextResponse } from "next/server";

import { requireDemoApiKey } from "@/lib/mock-auth";
import { createGeneratedPost } from "@/lib/mock-store";

type GenerateBody = {
  topic?: string;
  style?: string;
  length?: number;
  language?: string;
};

export async function POST(request: NextRequest) {
  const unauthorized = requireDemoApiKey(request);
  if (unauthorized) return unauthorized;

  let body: GenerateBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", data: null, error: { code: "BAD_REQUEST", message: "Invalid JSON body" } },
      { status: 400 },
    );
  }

  if (typeof body.topic !== "string" || !body.topic.trim()) {
    return NextResponse.json(
      { status: "error", data: null, error: { code: "BAD_REQUEST", message: "topic is required" } },
      { status: 400 },
    );
  }

  const post = createGeneratedPost({
    topic: body.topic,
    style: typeof body.style === "string" && body.style.trim() ? body.style : "deep",
    length: typeof body.length === "number" && body.length > 0 ? body.length : 800,
    language: typeof body.language === "string" && body.language.trim() ? body.language : "zh",
  });

  return NextResponse.json({
    status: "ok",
    data: { id: post.id, content: post.content, state: post.state },
    error: null,
  });
}
