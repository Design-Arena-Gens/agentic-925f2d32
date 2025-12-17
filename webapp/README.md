# Animal Chaos Automation

Daily video automation that scripts outrageous animal adventures, renders title-card videos, and uploads to YouTube every night at 9 PM IST.

## Features

- Scenario generator that mixes animals, wild environments, and unpredictable twists.
- Server-side video renderer using `ffmpeg-static`, producing 1280×720 MP4 clips with synth backing audio.
- YouTube Data API integration with OAuth refresh token flow.
- Manual trigger dashboard plus scheduled execution via Vercel Cron (`30 15 * * *`, i.e. 9 PM IST).

## Prerequisites

Set the following environment variables locally and on Vercel:

```
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
YOUTUBE_REFRESH_TOKEN=...
YOUTUBE_CHANNEL_ID=...         # for dashboard status
YOUTUBE_PLAYLIST_ID=...        # optional
YOUTUBE_CATEGORY_ID=15         # optional, defaults to Pets & Animals
YOUTUBE_PRIVACY=public         # optional
```

The refresh token must include the `https://www.googleapis.com/auth/youtube.upload` scope.

## Local Development

```
npm install
npm run dev
```

Visit http://localhost:3000 for the dashboard.

### Manual execution

- Dry run (skips upload, still renders video): `npm run automation:dry-run`
- Full upload (requires credentials): `npm run automation:run`

The scripts emit JSON including YouTube IDs for auditing.

## Deployment

```
npm run lint
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-925f2d32
```

The included `vercel.json` registers the daily cron trigger. After deployment, Vercel will invoke `/api/run` every day at 15:30 UTC (21:00 IST).
