import { NextRequest, NextResponse } from "next/server";

import { requireDemoApiKey } from "@/lib/mock-auth";
import { getStatus } from "@/lib/mock-store";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireDemoApiKey(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const status = getStatus(id);

  if (!status) {
    return NextResponse.json(
      { status: "error", data: null, error: { code: "NOT_FOUND", message: "Post status not found" } },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: "ok", data: status, error: null });
}
