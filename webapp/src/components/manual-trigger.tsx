"use client";

import { useState } from "react";

type TriggerState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success";
      videoId: string | null;
      title: string;
    }
  | { status: "error"; message: string };

export function ManualTrigger() {
  const [state, setState] = useState<TriggerState>({ status: "idle" });

  const handleRun = async () => {
    try {
      setState({ status: "loading" });
      const response = await fetch("/api/run", { method: "POST" });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Automation failed");
      }

      setState({
        status: "success",
        title: payload.scenario.title,
        videoId: payload.videoId ?? null,
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Unexpected automation error",
      });
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Manual trigger
          </h2>
          <p className="text-sm text-zinc-500">
            Launch the automation now. Videos will also auto-run daily at 9 PM
            IST.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRun}
          disabled={state.status === "loading"}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {state.status === "loading" ? "Running..." : "Run automation"}
        </button>
        {state.status === "success" && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <p>Generated: {state.title}</p>
            {state.videoId ? (
              <p>
                Uploaded to YouTube as{" "}
                <a
                  href={`https://www.youtube.com/watch?v=${state.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline"
                >
                  video {state.videoId}
                </a>
                .
              </p>
            ) : (
              <p>Upload skipped (dry run mode).</p>
            )}
          </div>
        )}
        {state.status === "error" && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600">
            {state.message}
          </div>
        )}
      </div>
    </div>
  );
}
