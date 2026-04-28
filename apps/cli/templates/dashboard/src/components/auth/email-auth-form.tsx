"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

type EmailAuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function EmailAuthForm({ mode }: EmailAuthFormProps) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
__AUTH_SOCIAL_BUTTON_HANDLER__

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    setIsPending(true);
    setError(null);

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message ?? "Authentication failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Authentication failed.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      action={(formData) => { void handleSubmit(formData); }}
      className="auth-panel"
    >
      <div className="auth-panel-header">
        <h2>
          {isSignUp ? "Create your account" : "Sign in to your workspace"}
        </h2>
        <p>
          {isSignUp
            ? "Fill in the details below to get started."
            : "Welcome back! Please sign in to continue."}
        </p>
      </div>

      <div className="auth-grid">
        {isSignUp ? (
          <label className="field">
            <span>Name</span>
            <input name="name" type="text" placeholder="Alice Home" required />
          </label>
        ) : null}

        <label className="field">
          <span>Email</span>
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>

        <div>
          <div className="auth-field-row">
            <span className="auth-field-label">Password</span>
            {!isSignUp ? (
              <Link href="/forgot-password" className="auth-field-link">
                Forgot password?
              </Link>
            ) : null}
          </div>
          <div className="auth-input-wrap">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={isSignUp ? "At least 8 characters" : "Enter your password"}
              minLength={8}
              required
            />
            <button
              type="button"
              className="auth-toggle-pw"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                  <circle cx="10" cy="10" r="2.5" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                  <circle cx="10" cy="10" r="2.5" />
                  <line x1="3" y1="17" x2="17" y2="3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <button type="submit" className="auth-button" disabled={isPending}>
        {isPending ? "Working..." : isSignUp ? "Create account" : "Sign in"}
      </button>

__AUTH_SOCIAL_BUTTON__

      <p className="auth-switch">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
          {isSignUp ? "Sign in" : "Sign up"}
        </Link>
      </p>

      <p className="auth-security-note">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="9" width="10" height="8" rx="1.5" />
          <path d="M7 9V6a3 3 0 016 0v3" />
        </svg>
        We use industry-standard encryption to keep your data safe and secure.
        By signing in, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link>{" "}and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
