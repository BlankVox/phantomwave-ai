# PhantomWave.ai Setup Guide 🚀

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd phantomwave-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.template .env.local
   # Edit .env.local with your API keys
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Visit the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy `env.template` to `.env.local` and fill in your API keys:

### Required for Sprint 1 (Auth)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

### Required for Sprint 2+ (Audio & AI)
- `OPENAI_API_KEY` - OpenAI API key for Whisper & GPT-4
- `AWS_ACCESS_KEY_ID` - AWS S3 access key
- `AWS_SECRET_ACCESS_KEY` - AWS S3 secret key
- `AWS_REGION` - AWS region (e.g., us-east-1)
- `AWS_S3_BUCKET_NAME` - S3 bucket for audio files

### Required for Sprint 6 (Billing)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret

## Project Structure

```
phantomwave-ai/
├── src/
│   └── app/                    # Next.js App Router
│       ├── layout.tsx          # Root layout
│       ├── page.tsx            # Landing page
│       └── globals.css         # Global styles
├── public/                     # Static assets
│   ├── logo.svg               # PhantomWave.ai logo
│   ├── favicon.svg            # Favicon
│   └── vercel.svg             # Vercel logo
├── env.template               # Environment variables template
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json               # Dependencies & scripts
└── README.md                  # Project overview
```

## Brand Colors

PhantomWave.ai uses a custom color palette:

- **Phantom Purple**: `#8b5cf6` (Primary brand color)
- **Wave Teal**: `#14b8a6` (Secondary brand color)

Available as Tailwind classes:
- `text-phantom-purple-600`, `bg-phantom-purple-50`, etc.
- `text-wave-teal-600`, `bg-wave-teal-50`, etc.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Next Steps

### Sprint 1 (Current)
- [x] Repository setup
- [x] Next.js + TypeScript + Tailwind
- [x] Branding assets
- [x] Environment variables
- [ ] Supabase Auth integration
- [ ] Sign up / Log in pages

### Sprint 2
- [ ] Audio upload API
- [ ] Drag & drop interface
- [ ] Dashboard listing

### Sprint 3
- [ ] Wavesurfer.js integration
- [ ] Browser player
- [ ] Trim functionality

### Sprint 4
- [ ] Whisper transcription
- [ ] Transcript display

### Sprint 5
- [ ] GPT-4 summaries
- [ ] Smart tagging

### Sprint 6
- [ ] Stripe billing
- [ ] Shareable links
- [ ] Beta launch

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: AWS S3 / Supabase Storage
- **AI**: OpenAI (Whisper + GPT-4)
- **Audio**: Wavesurfer.js
- **Payments**: Stripe
- **Hosting**: Vercel
- **Monitoring**: Sentry

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For questions or issues, please open a GitHub issue or contact the team. 