import Link from 'next/link';
import { AnimatedTerminal } from '@/components/terminal';
import { Logo } from '@/components/logo';

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Authentication',
    description: 'Secure sign up, sign in, and session management out of the box.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: 'Billing',
    description: 'Subscriptions, invoices, coupons, dunning, and usage metering.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Email',
    description: 'Transactional emails with Resend, templates, and beautiful previews.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Testing',
    description: 'Vitest and Playwright configured for unit, integration, and E2E tests.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M5 3l4 4-4 4M11 7h8M5 17l4-4-4-4" />
        <path d="M11 13h8" />
        <circle cx="18" cy="17" r="1" />
        <path d="M14 17h-3" />
      </svg>
    ),
    title: 'AI-First DX',
    description: 'Lint-staged, structure, clear boundaries, and great defaults for AI coding.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    title: 'Modular',
    description: 'Feature-based architecture so you can keep or drop what you need.',
  },
];

const TECH_STACK = [
  { name: 'Next.js', cdnSlug: 'nextdotjs', color: '000000' },
  { name: 'React', cdnSlug: 'react', color: '087ea4' },
  { name: 'TypeScript', cdnSlug: 'typescript', color: '3178c6' },
  { name: 'Tailwind CSS', cdnSlug: 'tailwindcss', color: '06b6d4' },
  { name: 'PostgreSQL', cdnSlug: 'postgresql', color: '4169e1' },
  { name: 'Drizzle ORM', cdnSlug: 'drizzle', color: 'c5f74f' },
  { name: 'Better Auth', letter: 'BA', accent: '#a855f7' },
  { name: 'Stripe', cdnSlug: 'stripe', color: '635bff' },
  { name: 'Polar', letter: 'P◆', accent: '#3b82f6' },
  { name: 'Resend', cdnSlug: 'resend', color: '000000' },
  { name: 'Vitest', cdnSlug: 'vitest', color: '6e9f18' },
  { name: 'Playwright', letter: 'PW', accent: '#2ead33' },
  { name: 'Docker', cdnSlug: 'docker', color: '2496ed' },
  { name: 'Vercel', cdnSlug: 'vercel', color: '000000' },
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
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/docs" className="text-zinc-500 transition-colors hover:text-zinc-900">
            Docs
          </Link>
          <a
            href="https://github.com/jocage/skit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-zinc-900"
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
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-16">
        <div className="pt-4">
          <div className="mb-5 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-500">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
            Next.js 16 • React 19
          </div>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Ship your SaaS
            <br />
            in minutes
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-500">
            Opinionated Next.js 16 starter with auth, billing, email,
            database, and AI-first DX. One command to scaffold.
            Zero config to start building.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              Get Started
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href="https://github.com/jocage/skit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              View on GitHub
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-zinc-500">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <AnimatedTerminal />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-zinc-100">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Everything you need</h2>
        <p className="mb-12 text-sm text-zinc-500">
          Opinionated defaults so you can focus on building.
        </p>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 text-zinc-400">
                {f.icon}
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-zinc-900">{f.title}</h3>
                <p className="text-xs leading-relaxed text-zinc-500">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-6xl px-6 py-12 border-t border-zinc-100">
        <h2 className="mb-6 text-lg font-semibold tracking-tight">Built with</h2>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
            >
              <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
                {'cdnSlug' in tech ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://cdn.simpleicons.org/${tech.cdnSlug}/${tech.color}`}
                    alt={tech.name}
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain"
                  />
                ) : (
                  <span className="text-[9px] font-bold leading-none" style={{ color: tech.accent }}>
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
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-zinc-100">
        <h2 className="mb-12 text-2xl font-bold tracking-tight">How it works</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative">
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-5 hidden -translate-y-1/2 translate-x-1/2 text-zinc-300 lg:block">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className="mb-3 text-sm font-bold text-zinc-400">{s.step}</div>
              <h3 className="mb-1 text-lg font-semibold">{s.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-zinc-500">{s.description}</p>
              <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-3 font-mono text-xs text-zinc-600">
                <span>{s.code}</span>
                <button
                  className="ml-3 flex-shrink-0 text-zinc-400 hover:text-zinc-600"
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
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-zinc-100">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">FAQ</h2>
        <div className="grid gap-x-16 lg:grid-cols-2">
          <div className="divide-y divide-zinc-100">
            {FAQ_LEFT.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-zinc-900">
                  {q}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform group-open:rotate-180">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </summary>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-500">{a}</p>
              </details>
            ))}
          </div>
          <div className="divide-y divide-zinc-100">
            {FAQ_RIGHT.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-zinc-900">
                  {q}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform group-open:rotate-180">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </summary>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-500">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
          <div className="text-sm text-zinc-400">
            MIT License · Skit
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/docs" className="transition-colors hover:text-zinc-900">
              Docs
            </Link>
            <a
              href="https://github.com/jocage/skit"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900"
            >
              GitHub
            </a>
            <Link href="/llms.txt" className="transition-colors hover:text-zinc-900">
              llms.txt
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
