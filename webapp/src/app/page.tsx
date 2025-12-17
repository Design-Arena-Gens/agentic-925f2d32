import { ManualTrigger } from "@/components/manual-trigger";
import { getNextRunInfo } from "@/lib/schedule";
import { fetchLatestVideo } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export default async function Home() {
  const schedule = getNextRunInfo();
  let latestVideo = null;
  let error: string | null = null;

  try {
    latestVideo = await fetchLatestVideo();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load channel data";
  }

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-slate-50 px-6 py-12 font-sans text-slate-900">
      <header className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-bold">Animal Chaos Automation</h1>
        <p className="mt-2 text-sm text-slate-600">
          Daily videos with outrageous animal adventures. Automatically
          generates a new story, renders a video, and uploads to YouTube every
          night at 9 PM IST.
        </p>
      </header>

      <section className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Next run
          </h2>
          <p className="mt-2 text-lg font-medium text-slate-900">
            {schedule.friendly}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            UTC: {schedule.nextRunUtc}
            <br />
            IST: {schedule.nextRunInIst}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Latest upload
          </h2>
          {latestVideo ? (
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={latestVideo.url}
                className="text-lg font-semibold text-indigo-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {latestVideo.title}
              </a>
              <p className="text-xs text-slate-500">
                Published at {latestVideo.publishedAt}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-500">
              {error ?? "No uploads detected yet."}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-2">
        <ManualTrigger />
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Automation checklist
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Generate a fresh storyline with outrageous twists.</li>
            <li>• Render a 1280×720 video with animated title cards.</li>
            <li>• Mix in a background synth wave generated on the fly.</li>
            <li>• Upload to YouTube with Pets &amp; Animals category tags.</li>
            <li>• Repeat daily via Vercel cron at 9 PM IST.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
