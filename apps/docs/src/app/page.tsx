import Link from 'next/link';
import { AnimatedTerminal } from '@/components/terminal';
import { Logo } from '@/components/logo';

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Authentication',
    description: 'Secure sign up, sign in, and session management out of the box.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: 'Billing',
    description: 'Subscriptions, invoices, coupons, dunning, and usage metering.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Email',
    description: 'Transactional emails with Resend, templates, and beautiful previews.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Database',
    description: 'PostgreSQL with Drizzle ORM, migrations, and type-safe queries.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Testing',
    description: 'Vitest and Playwright configured for unit, integration, and E2E tests.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'AI-First DX',
    description: 'Lint-staged, structure, clear boundaries, and great defaults for AI coding.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
      </svg>
    ),
    title: 'Deploy',
    description: 'Optimized for Vercel with preview deployments and env management.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    title: 'Modular',
    description: 'Feature-based architecture so you can keep or drop what you need.',
  },
];

const TECH_STACK = [
  { name: 'Next.js', cdnSlug: 'nextdotjs', color: 'ffffff' },
  { name: 'React', cdnSlug: 'react', color: '61dafb' },
  { name: 'TypeScript', cdnSlug: 'typescript', color: '3178c6' },
  { name: 'Tailwind CSS', cdnSlug: 'tailwindcss', color: '06b6d4' },
  { name: 'PostgreSQL', cdnSlug: 'postgresql', color: '4169e1' },
  { name: 'Drizzle ORM', cdnSlug: 'drizzle', color: 'c5f74f' },
  { name: 'Better Auth', letter: 'BA', accent: '#a855f7' },
  { name: 'Stripe', cdnSlug: 'stripe', color: '635bff' },
  { name: 'Polar', letter: 'P◆', accent: '#3b82f6' },
  { name: 'Resend', cdnSlug: 'resend', color: 'ffffff' },
  { name: 'Vitest', cdnSlug: 'vitest', color: '6e9f18' },
  { name: 'Playwright', letter: 'PW', accent: '#2ead33' },
  { name: 'Docker', cdnSlug: 'docker', color: '2496ed' },
  { name: 'Vercel', cdnSlug: 'vercel', color: 'ffffff' },
  { name: 'GitHub Actions', cdnSlug: 'githubactions', color: '2088ff' },
] as const;

const STEPS = [
  {
    step: '01',
    title: 'Generate',
    description: 'Scaffold your app in seconds.',
    code: 'npx create-skit my-saas',
  },
  {
    step: '02',
    title: 'Configure',
    description: 'Add your environment variables.',
    code: 'cp .env.example .env.local',
  },
  {
    step: '03',
    title: 'Ship',
    description: 'Build and run your SaaS.',
    code: 'pnpm build && pnpm start',
  },
];

const FAQ_LEFT = [
  {
    q: 'How is this different from other SaaS starters?',
    a: 'Most starters are either too thin or too bloated. Skit is opinionated enough to ship, modular enough to extend, and free under MIT — no paywalls, no vendor lock-in.',
  },
  {
    q: 'Can I swap billing providers?',
    a: 'Billing sits behind a provider abstraction. Stripe and Polar work out of the box. Adding another provider means implementing one interface in src/lib/billing/.',
  },
  {
    q: 'Does it support MySQL, SQLite, or Prisma?',
    a: "No. Skit is opinionated: PostgreSQL + Drizzle ORM. Fewer choices, better defaults.",
  },
];

const FAQ_RIGHT = [
  {
    q: 'Do I have to use Vercel?',
    a: 'No. Pick --deploy-target docker at generation time and you get a multi-stage Dockerfile ready to run anywhere.',
  },
  {
    q: 'How does it work with AI coding agents?',
    a: 'Every generated project ships AGENTS.md and ARCHITECTURE.md — explicit rules covering the stack, file conventions, and commands. Use --ai-tools cursor,claude,gemini to add tool-specific configs.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. MIT license. Generate projects, fork it, build commercial products on top — all allowed.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/docs" className="text-zinc-400 transition-colors hover:text-white">
            Docs
          </Link>
          <a
            href="https://github.com/jocage/skit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <Link
            href="/docs"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32">
        <div>
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
            Next.js 16 • React 19
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Ship your SaaS
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              in minutes
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
            Opinionated Next.js 16 starter with auth, billing, email,
            database, and AI-first DX. One command to scaffold.
            Zero config to start building.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started →
            </Link>
            <a
              href="https://github.com/jocage/skit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10"
            >
              View on GitHub
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 opacity-60">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <AnimatedTerminal />
        </div>
      </section>

      {/* AI-First */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          <div className="border-b border-white/[0.06] px-8 py-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              AI-first from day one
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Your tokens should build features,<br className="hidden sm:block" /> not discover boilerplate.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
              An agent dropped into an unfamiliar codebase burns thousands of tokens just figuring out what exists.
              Skit ships with everything an agent needs to contribute immediately.
            </p>
          </div>

          <div className="grid divide-y divide-white/[0.06] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {/* Without */}
            <div className="px-8 py-7">
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-red-400/70">Without Skit</p>
              <div className="space-y-3">
                {[
                  { q: 'How does auth work here?', tokens: '+2,400 tokens' },
                  { q: 'Where does billing logic live?', tokens: '+1,800 tokens' },
                  { q: 'What\'s the folder convention?', tokens: '+900 tokens' },
                  { q: 'How do I add a new route?', tokens: '+1,200 tokens' },
                  { q: 'Which env vars are required?', tokens: '+600 tokens' },
                ].map(({ q, tokens }) => (
                  <div key={q} className="flex items-start justify-between gap-4 rounded-lg border border-red-500/10 bg-red-500/[0.04] px-4 py-3">
                    <span className="text-sm text-zinc-400">&ldquo;{q}&rdquo;</span>
                    <span className="flex-shrink-0 rounded bg-red-500/10 px-1.5 py-0.5 font-mono text-xs text-red-400">{tokens}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-right font-mono text-xs text-red-400/60">~6,900 tokens on setup</p>
            </div>

            {/* With Skit */}
            <div className="px-8 py-7">
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-emerald-400/70">With Skit</p>
              <div className="space-y-2.5">
                {[
                  { file: 'AGENTS.md', desc: 'Stack, conventions, forbidden patterns, commands' },
                  { file: 'ARCHITECTURE.md', desc: 'Module map, data flow, key decisions' },
                  { file: 'llms.txt', desc: 'Optimized docs for LLM consumption' },
                  { file: '.cursor/rules/*.mdc', desc: 'Auto-activated rules per file pattern' },
                  { file: 'CLAUDE.md', desc: 'Claude Code workflow and project context' },
                  { file: 'skit.json', desc: 'Exact generation config — every agent knows the setup' },
                ].map(({ file, desc }) => (
                  <div key={file} className="flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div>
                      <span className="font-mono text-xs font-semibold text-emerald-300">{file}</span>
                      <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-right font-mono text-xs text-emerald-400/60">0 tokens on discovery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-3 text-center text-3xl font-bold tracking-tight">Everything you need</h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-zinc-400">
          Opinionated defaults so you can focus on building.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-300">
                {f.icon}
              </div>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Built with</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-white/[0.14] hover:text-zinc-300"
            >
              <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
                {'cdnSlug' in tech ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://cdn.simpleicons.org/${tech.cdnSlug}/${tech.color}`}
                    alt={tech.name}
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain opacity-70"
                  />
                ) : (
                  <span className="text-[10px] font-bold leading-none" style={{ color: tech.accent }}>
                    {tech.letter}
                  </span>
                )}
              </div>
              {tech.name}
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-16 text-center text-3xl font-bold tracking-tight">How it works</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-zinc-700 lg:block">→</div>
              )}
              <div className="mb-4 text-sm font-bold text-emerald-400">{s.step}</div>
              <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">{s.description}</p>
              <div className="flex items-center justify-between rounded-lg bg-black/50 px-4 py-3 font-mono text-xs text-zinc-400">
                <span><span className="text-emerald-400">$ </span>{s.code}</span>
                <button
                  onClick={undefined}
                  className="ml-3 flex-shrink-0 text-zinc-600 hover:text-zinc-400"
                  aria-label="Copy"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">FAQ</h2>
        <div className="grid gap-x-12 lg:grid-cols-2">
          <div className="divide-y divide-white/[0.06]">
            {FAQ_LEFT.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-white">
                  {q}
                  <span className="mt-0.5 flex-shrink-0 text-zinc-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{a}</p>
              </details>
            ))}
          </div>
          <div className="divide-y divide-white/[0.06]">
            {FAQ_RIGHT.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-white">
                  {q}
                  <span className="mt-0.5 flex-shrink-0 text-zinc-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
          <div className="text-sm text-zinc-500">
            MIT License · Skit
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/docs" className="transition-colors hover:text-white">
              Docs
            </Link>
            <a
              href="https://github.com/jocage/skit"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              GitHub
            </a>
            <Link href="/llms.txt" className="transition-colors hover:text-white">
              llms.txt
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-6 text-center text-xs text-zinc-600">
          Are you an LLM? View{' '}
          <Link href="/llms.txt" className="underline hover:text-zinc-400">
            /llms.txt
          </Link>{' '}
          for optimized Markdown documentation, or{' '}
          <Link href="/llms-full.txt" className="underline hover:text-zinc-400">
            /llms-full.txt
          </Link>{' '}
          for the full documentation bundle.
        </div>
      </footer>
    </main>
  );
}
