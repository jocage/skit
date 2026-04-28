import { redirect } from "next/navigation";

import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { getSession } from "@/lib/auth-session";

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="auth-screen">
      <div className="auth-brand">
        <div className="logo">
          <span className="logo-star">★</span>
          Skit
        </div>
        <h1 className="auth-hero-title">Build your next SaaS in minutes.</h1>
        <p className="auth-hero-desc">
          Auth, billing, transactional email, and database scaffolding — all wired up
          and production-ready from day one.
        </p>
        <div className="auth-mockup-window">
          <div className="auth-mockup-bar">
            <div className="auth-mockup-dot" />
            <div className="auth-mockup-dot" />
            <div className="auth-mockup-dot" />
          </div>
          <div className="auth-mockup-body">
            <div className="auth-mockup-sidebar">
              {["Dashboard", "Billing", "Email", "Settings"].map((item, i) => (
                <div
                  key={item}
                  className={`auth-mockup-nav-item${i === 0 ? " active" : ""}`}
                >
                  <div className="auth-mockup-nav-dot" />
                  {item}
                </div>
              ))}
            </div>
            <div className="auth-mockup-content">
              <div className="auth-mockup-title-bar" />
              <div className="auth-mockup-cards">
                <div className="auth-mockup-card">
                  <div className="auth-mockup-card-label">Active users</div>
                  <div className="auth-mockup-card-value">1,892</div>
                  <div className="auth-mockup-sparkline">
                    {[40, 55, 35, 70, 45, 80, 60].map((h, i) => (
                      <div
                        key={i}
                        className="auth-mockup-bar-item"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="auth-mockup-change">↑ 2.1%</div>
                </div>
                <div className="auth-mockup-card">
                  <div className="auth-mockup-card-label">Revenue</div>
                  <div className="auth-mockup-card-value">$148,200</div>
                  <div className="auth-mockup-sparkline">
                    {[30, 50, 40, 65, 55, 80, 75].map((h, i) => (
                      <div
                        key={i}
                        className="auth-mockup-bar-item"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="auth-mockup-change">↑ 4.6%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-form-side">
        <EmailAuthForm mode="sign-up" />
      </div>
    </main>
  );
}
