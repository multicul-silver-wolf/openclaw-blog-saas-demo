import { NextRequest, NextResponse } from "next/server";

import { DEMO_API_KEY } from "@/lib/constants";
import type { ApiFailure } from "@/lib/mock-types";

export function requireDemoApiKey(request: NextRequest): NextResponse<ApiFailure> | null {
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";

  if (token !== DEMO_API_KEY) {
    return NextResponse.json(
      {
        status: "error",
        data: null,
        error: { code: "UNAUTHORIZED", message: "Invalid API key" },
      },
      { status: 401 },
    );
  }

  return null;
}
