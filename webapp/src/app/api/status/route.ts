import { NextResponse } from "next/server";

import { getNextRunInfo } from "@/lib/schedule";
import { fetchLatestVideo } from "@/lib/youtube";

export const runtime = "nodejs";

export async function GET() {
  const schedule = getNextRunInfo();
  let latestVideo = null;
  let error: string | null = null;

  try {
    latestVideo = await fetchLatestVideo();
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch latest video info";
  }

  return NextResponse.json({
    ok: true,
    schedule,
    latestVideo,
    error,
  });
}
