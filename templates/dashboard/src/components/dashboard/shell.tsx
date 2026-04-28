"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";

type DashboardShellProps = {
  user: { name: string; email: string };
  children: React.ReactNode;
};

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" />
      </svg>
    ),
  },
  {
    href: "/billing",
    label: "Billing",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="14" height="10" rx="1.5" />
        <path d="M1 7h14" />
      </svg>
    ),
  },
  {
    href: "/email",
    label: "Email",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="14" height="10" rx="1.5" />
        <path d="M1 5l7 5 7-5" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="2" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.54 11.54l1.41 1.41M3.05 12.95l1.42-1.42M11.54 4.46l1.41-1.41" />
      </svg>
    ),
  },
];

export function DashboardShell({ user, children }: DashboardShellProps) {
  const pathname = usePathname();

  const initials = (user.name || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const orgInitials = (user.name || "A")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-star">★</span>
          Skit
        </div>

        <button type="button" className="sidebar-org-selector">
          <span className="sidebar-org-left">
            <span className="sidebar-org-avatar">{orgInitials}</span>
            <span className="sidebar-org-name">{user.name || "My Workspace"}</span>
          </span>
          <span className="sidebar-org-chevron">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </span>
        </button>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link${pathname === item.href ? " active" : ""}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-footer">
          <a
            href="https://skit.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-footer-link"
          >
            <span className="sidebar-footer-link-left">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 2h12v12H2V2z" opacity="0" />
                <path d="M3 3h4v10H3zM9 3h4v10H9zM3 8h4M9 5h4M9 8h2" />
              </svg>
              Documentation
            </span>
            <span className="sidebar-footer-link-arrow">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </a>
          <a
            href="https://skit.dev/support"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-footer-link"
          >
            <span className="sidebar-footer-link-left">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 10v1M8 5a2 2 0 011.73 3c-.35.6-1.73 1-1.73 2" />
              </svg>
              Support
            </span>
            <span className="sidebar-footer-link-arrow">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </a>
        </div>

        <div className="sidebar-user">
          <span className="sidebar-user-left">
            <span className="sidebar-avatar">{initials}</span>
            <span className="sidebar-user-info">
              <span className="sidebar-user-name">{user.name || "User"}</span>
              <span className="sidebar-user-email">{user.email}</span>
            </span>
          </span>
          <span className="sidebar-chevron">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </span>
        </div>

        <div style={{ padding: "0 8px 8px" }}>
          <SignOutButton />
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}
