import Link from "next/link";

import { getSession } from "@/lib/auth-session";

export default async function DashboardPage() {
  const session = await getSession();
  const name = session?.user.name?.split(" ")[0] || "there";
  const email = session?.user.email || "";

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {name}</h1>
          <p className="dashboard-header-subtitle">{email}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Empty projects card */}
          <div className="dashboard-card">
            <div className="dashboard-empty-state">
              <svg className="dashboard-empty-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 10a2 2 0 012-2h11l3 4h18a2 2 0 012 2v22a2 2 0 01-2 2H8a2 2 0 01-2-2V10z" />
              </svg>
              <h3>You don&apos;t have any projects yet</h3>
              <p>
                Projects are where you ship your product.
                Create your first project to get started.
              </p>
              <div className="dashboard-empty-actions">
                <Link href="/dashboard/new" className="btn-primary">
                  Create your first project →
                </Link>
                <a
                  href="https://skit.dev/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Read docs ↗
                </a>
              </div>
              <p className="dashboard-empty-note">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="10" height="8" rx="1" />
                  <path d="M5 6V4a3 3 0 016 0v2" />
                </svg>
                Your data is private and secure. You can invite your team after creating a project.
              </p>
            </div>
          </div>

          {/* Get started steps */}
          <div className="quickstart-card">
            <div className="quickstart-card-header">
              <h3>Get started in minutes</h3>
              <p>Follow these steps to launch your first project.</p>
            </div>
            <div className="quickstart-step">
              <div className="quickstart-step-num">1</div>
              <div>
                <p className="quickstart-step-title">
                  <Link href="/dashboard/new">Create your first project</Link>
                </p>
                <p className="quickstart-step-desc">Name your project and connect your repository.</p>
              </div>
            </div>
            <div className="quickstart-step">
              <div className="quickstart-step-num">2</div>
              <div>
                <p className="quickstart-step-title">Add your team</p>
                <p className="quickstart-step-desc">Invite teammates and set permissions.</p>
              </div>
            </div>
            <div className="quickstart-step">
              <div className="quickstart-step-num">3</div>
              <div>
                <p className="quickstart-step-title">Configure your environment</p>
                <p className="quickstart-step-desc">Set up variables and deploy your first build.</p>
              </div>
            </div>
            <div className="quickstart-step">
              <div className="quickstart-step-num">4</div>
              <div>
                <p className="quickstart-step-title">Ship your first release</p>
                <p className="quickstart-step-desc">You&apos;re ready to build and ship.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Workspace ready */}
          <div className="workspace-card">
            <div className="workspace-card-header">
              <h3>Your workspace is ready</h3>
              <p>All systems are go. You&apos;re all set to build.</p>
            </div>
            <div className="workspace-item">
              <div className="workspace-item-left">
                <div className="workspace-item-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="10" height="8" rx="1" />
                    <path d="M5 6V4a3 3 0 016 0v2" />
                  </svg>
                </div>
                <div>
                  <p className="workspace-item-name">Auth</p>
                  <p className="workspace-item-desc">Secure sign-in and team</p>
                </div>
              </div>
              <span className="workspace-badge-ready">Ready</span>
            </div>
            <div className="workspace-item">
              <div className="workspace-item-left">
                <div className="workspace-item-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="14" height="10" rx="1.5" />
                    <path d="M1 7h14" />
                  </svg>
                </div>
                <div>
                  <p className="workspace-item-name">Billing</p>
                  <p className="workspace-item-desc">Subscriptions and invoices</p>
                </div>
              </div>
              <span className="workspace-badge-ready">Ready</span>
            </div>
            <div className="workspace-item">
              <div className="workspace-item-left">
                <div className="workspace-item-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="8" cy="4" rx="6" ry="2" />
                    <path d="M2 4v4c0 1.1 2.69 2 6 2s6-.9 6-2V4M2 8v4c0 1.1 2.69 2 6 2s6-.9 6-2V8" />
                  </svg>
                </div>
                <div>
                  <p className="workspace-item-name">Database</p>
                  <p className="workspace-item-desc">Data storage and migrations</p>
                </div>
              </div>
              <span className="workspace-badge-ready">Ready</span>
            </div>
            <div className="workspace-item">
              <div className="workspace-item-left">
                <div className="workspace-item-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="14" height="10" rx="1.5" />
                    <path d="M1 5l7 5 7-5" />
                  </svg>
                </div>
                <div>
                  <p className="workspace-item-name">Email</p>
                  <p className="workspace-item-desc">Transactional email</p>
                </div>
              </div>
              <span className="workspace-badge-ready">Ready</span>
            </div>
          </div>

          {/* Helpful resources */}
          <div className="resources-card">
            <div className="resources-card-header">
              <h3>Helpful resources</h3>
              <p>Everything you need to build faster.</p>
            </div>
            <a
              href="https://skit.dev/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-item"
            >
              <div className="resource-item-left">
                <div className="resource-item-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2h10v12H3z" /><path d="M6 6h4M6 9h4M6 12h2" />
                  </svg>
                </div>
                <div>
                  <p className="resource-item-name">Documentation</p>
                  <p className="resource-item-desc">Guides and API reference</p>
                </div>
              </div>
              <span className="resource-item-arrow">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </a>
            <a
              href="https://skit.dev/templates"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-item"
            >
              <div className="resource-item-left">
                <div className="resource-item-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" /><rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" />
                  </svg>
                </div>
                <div>
                  <p className="resource-item-name">Templates</p>
                  <p className="resource-item-desc">Start with a proven template</p>
                </div>
              </div>
              <span className="resource-item-arrow">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </a>
            <a
              href="https://skit.dev/changelog"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-item"
            >
              <div className="resource-item-left">
                <div className="resource-item-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" />
                  </svg>
                </div>
                <div>
                  <p className="resource-item-name">Changelog</p>
                  <p className="resource-item-desc">What&apos;s new in Skit</p>
                </div>
              </div>
              <span className="resource-item-arrow">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </a>
            <a
              href="https://skit.dev/community"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-item"
            >
              <div className="resource-item-left">
                <div className="resource-item-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 10a2 2 0 01-2 2H5l-3 3V4a2 2 0 012-2h8a2 2 0 012 2v6z" />
                  </svg>
                </div>
                <div>
                  <p className="resource-item-name">Community</p>
                  <p className="resource-item-desc">Ask questions and get help</p>
                </div>
              </div>
              <span className="resource-item-arrow">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
