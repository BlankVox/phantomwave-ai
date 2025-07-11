# PhantomWave.ai 🎵

**Notion for audio creators** - One workspace to upload, trim, transcribe, summarize, and share your audio content.

## 🚀 What is PhantomWave.ai?

Stop juggling between Dropbox, Audacity, Google Docs, and email threads. PhantomWave.ai gives audio creators a unified workspace to:

- **Upload** audio files (MP3/WAV) with drag-and-drop
- **Trim** clips directly in your browser with waveform visualization
- **Auto-transcribe** using OpenAI Whisper
- **Generate summaries** and smart tags with GPT-4
- **Share** via simple links

## 🏗 Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Audio**: Wavesurfer.js for waveform rendering & trimming
- **Backend**: Next.js API routes, Supabase (PostgreSQL + Auth)
- **Storage**: AWS S3 / Supabase Storage
- **AI**: OpenAI Whisper + GPT-4
- **Hosting**: Vercel
- **Payments**: Stripe

## 🚧 Development Status

Currently in Sprint 1 - Setting up foundation and authentication.

## 📋 Roadmap

- **Sprint 1** (W1-2): Repo setup, branding, Supabase Auth
- **Sprint 2** (W3-4): Audio upload & dashboard
- **Sprint 3** (W5-6): Browser player & trimming
- **Sprint 4** (W7-8): Whisper transcription
- **Sprint 5** (W9-10): GPT-4 summaries & tagging
- **Sprint 6** (W11-12): Stripe billing & share links

## 🛠 Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📄 License

MIT 