import { NextResponse } from "next/server";

import { runAutomation } from "@/lib/automation";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await runAutomation();
    return NextResponse.json(
      {
        ok: true,
        videoId: result.videoId,
        scenario: {
          title: result.scenario.title,
          description: result.scenario.description,
          scenes: result.scenario.scenes,
        },
        startedAt: result.startedAt,
        finishedAt: result.finishedAt,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[automation] failed", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unknown automation error",
      },
      { status: 500 },
    );
  }
}

export async function POST() {
  return GET();
}
