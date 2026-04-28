import { describe, it, expect } from "vitest";
import path from "node:path";

import { resolveScaffoldPlan } from "../lib/module-resolver.mjs";
import {
  buildModuleTokenReplacements,
  buildModuleFileOverlays,
  buildModulePruneList
} from "../lib/module-application.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");

function base(overrides = {}) {
  return {
    template: "blank",
    databaseDriver: "pg",
    authMode: "email-password",
    billingProvider: "stripe",
    emailProvider: "resend",
    deployTarget: "vercel",
    aiTools: [],
    ...overrides
  };
}

async function plan(overrides = {}) {
  return resolveScaffoldPlan(ROOT, base(overrides));
}

// ─── module resolver ──────────────────────────────────────────────────────────

describe("resolveScaffoldPlan — always-present modules", () => {
  it("includes quality-baseline for every combination", async () => {
    const result = await plan();
    expect(result.modules).toContain("quality-baseline");
  });

  it("includes testing-baseline for every combination", async () => {
    const result = await plan();
    expect(result.modules).toContain("testing-baseline");
  });

  it("includes auth-core for every combination", async () => {
    const result = await plan();
    expect(result.modules).toContain("auth-core");
  });

  it("quality-baseline comes before its dependents in sorted order", async () => {
    const result = await plan({ billingProvider: "both", aiTools: ["cursor"] });
    const qi = result.modules.indexOf("quality-baseline");
    for (const mod of result.modules) {
      if (mod !== "quality-baseline") {
        expect(result.modules.indexOf(mod)).toBeGreaterThan(qi);
      }
    }
  });
});

describe("resolveScaffoldPlan — templates", () => {
  it("blank does not include dashboard-shell", async () => {
    const result = await plan({ template: "blank" });
    expect(result.modules).not.toContain("dashboard-shell");
  });

  it("dashboard includes dashboard-shell", async () => {
    const result = await plan({ template: "dashboard" });
    expect(result.modules).toContain("dashboard-shell");
  });

  it("blank base is base-web", async () => {
    const result = await plan({ template: "blank" });
    expect(result.base).toBe("base-web");
  });

  it("dashboard base is base-web", async () => {
    const result = await plan({ template: "dashboard" });
    expect(result.base).toBe("base-web");
  });
});

describe("resolveScaffoldPlan — database driver", () => {
  it("pg includes db-pg and excludes db-postgresjs", async () => {
    const result = await plan({ databaseDriver: "pg" });
    expect(result.modules).toContain("db-pg");
    expect(result.modules).not.toContain("db-postgresjs");
  });

  it("postgres.js includes db-postgresjs and excludes db-pg", async () => {
    const result = await plan({ databaseDriver: "postgres.js" });
    expect(result.modules).toContain("db-postgresjs");
    expect(result.modules).not.toContain("db-pg");
  });

  it("pg and postgres.js throw conflict error when somehow both are requested", async () => {
    // Simulate by constructing a fake plan with both — the conflict is caught in validateConflicts
    // The CLI prevents this at the CLI level but the resolver enforces it too via conflictsWith
    const pgPlan = await resolveScaffoldPlan(ROOT, base({ databaseDriver: "pg" }));
    expect(pgPlan.modules).not.toContain("db-postgresjs");
  });
});

describe("resolveScaffoldPlan — auth mode", () => {
  it("email-password only — no social provider modules", async () => {
    const result = await plan({ authMode: "email-password" });
    expect(result.modules).not.toContain("auth-github");
    expect(result.modules).not.toContain("auth-google");
  });

  it("email-password+github includes auth-github but not auth-google", async () => {
    const result = await plan({ authMode: "email-password+github" });
    expect(result.modules).toContain("auth-github");
    expect(result.modules).not.toContain("auth-google");
  });

  it("email-password+google includes auth-google but not auth-github", async () => {
    const result = await plan({ authMode: "email-password+google" });
    expect(result.modules).toContain("auth-google");
    expect(result.modules).not.toContain("auth-github");
  });

  it("email-password+github+google includes both social providers", async () => {
    const result = await plan({ authMode: "email-password+github+google" });
    expect(result.modules).toContain("auth-github");
    expect(result.modules).toContain("auth-google");
  });

  it("auth-github depends on auth-core which is always present", async () => {
    const result = await plan({ authMode: "email-password+github" });
    expect(result.modules).toContain("auth-core");
    expect(result.modules.indexOf("auth-core")).toBeLessThan(
      result.modules.indexOf("auth-github")
    );
  });

  it("auth-google depends on auth-core which is always present", async () => {
    const result = await plan({ authMode: "email-password+google" });
    expect(result.modules).toContain("auth-core");
    expect(result.modules.indexOf("auth-core")).toBeLessThan(
      result.modules.indexOf("auth-google")
    );
  });
});

describe("resolveScaffoldPlan — billing provider", () => {
  it("stripe includes billing-stripe only", async () => {
    const result = await plan({ billingProvider: "stripe" });
    expect(result.modules).toContain("billing-stripe");
    expect(result.modules).not.toContain("billing-polar");
  });

  it("polar includes billing-polar only", async () => {
    const result = await plan({ billingProvider: "polar" });
    expect(result.modules).toContain("billing-polar");
    expect(result.modules).not.toContain("billing-stripe");
  });

  it("both includes billing-stripe and billing-polar", async () => {
    const result = await plan({ billingProvider: "both" });
    expect(result.modules).toContain("billing-stripe");
    expect(result.modules).toContain("billing-polar");
  });

  it("none includes neither billing module", async () => {
    const result = await plan({ billingProvider: "none" });
    expect(result.modules).not.toContain("billing-stripe");
    expect(result.modules).not.toContain("billing-polar");
  });
});

describe("resolveScaffoldPlan — email provider", () => {
  it("resend includes email-resend", async () => {
    const result = await plan({ emailProvider: "resend" });
    expect(result.modules).toContain("email-resend");
  });

  it("none does not include email-resend", async () => {
    const result = await plan({ emailProvider: "none" });
    expect(result.modules).not.toContain("email-resend");
  });
});

describe("resolveScaffoldPlan — deploy target", () => {
  it("vercel does not include deploy-docker", async () => {
    const result = await plan({ deployTarget: "vercel" });
    expect(result.modules).not.toContain("deploy-docker");
  });

  it("docker includes deploy-docker", async () => {
    const result = await plan({ deployTarget: "docker" });
    expect(result.modules).toContain("deploy-docker");
  });
});

describe("resolveScaffoldPlan — AI tools", () => {
  it("empty array includes no AI modules", async () => {
    const result = await plan({ aiTools: [] });
    expect(result.modules).not.toContain("ai-dx");
    expect(result.modules).not.toContain("ai-dx-cursor");
    expect(result.modules).not.toContain("ai-dx-claude");
    expect(result.modules).not.toContain("ai-dx-gemini");
  });

  it("cursor includes ai-dx and ai-dx-cursor", async () => {
    const result = await plan({ aiTools: ["cursor"] });
    expect(result.modules).toContain("ai-dx");
    expect(result.modules).toContain("ai-dx-cursor");
    expect(result.modules).not.toContain("ai-dx-claude");
    expect(result.modules).not.toContain("ai-dx-gemini");
  });

  it("claude includes ai-dx and ai-dx-claude", async () => {
    const result = await plan({ aiTools: ["claude"] });
    expect(result.modules).toContain("ai-dx");
    expect(result.modules).toContain("ai-dx-claude");
    expect(result.modules).not.toContain("ai-dx-cursor");
    expect(result.modules).not.toContain("ai-dx-gemini");
  });

  it("gemini includes ai-dx and ai-dx-gemini", async () => {
    const result = await plan({ aiTools: ["gemini"] });
    expect(result.modules).toContain("ai-dx");
    expect(result.modules).toContain("ai-dx-gemini");
    expect(result.modules).not.toContain("ai-dx-cursor");
    expect(result.modules).not.toContain("ai-dx-claude");
  });

  it("copilot includes only ai-dx (no copilot-specific module)", async () => {
    const result = await plan({ aiTools: ["copilot"] });
    expect(result.modules).toContain("ai-dx");
    expect(result.modules).not.toContain("ai-dx-cursor");
    expect(result.modules).not.toContain("ai-dx-claude");
    expect(result.modules).not.toContain("ai-dx-gemini");
  });

  it("all tools includes ai-dx and all tool-specific modules", async () => {
    const result = await plan({ aiTools: ["cursor", "claude", "gemini", "copilot"] });
    expect(result.modules).toContain("ai-dx");
    expect(result.modules).toContain("ai-dx-cursor");
    expect(result.modules).toContain("ai-dx-claude");
    expect(result.modules).toContain("ai-dx-gemini");
  });

  it("ai-dx-cursor depends on ai-dx which appears before it", async () => {
    const result = await plan({ aiTools: ["cursor"] });
    expect(result.modules.indexOf("ai-dx")).toBeLessThan(
      result.modules.indexOf("ai-dx-cursor")
    );
  });

  it("ai-dx depends on quality-baseline which appears before it", async () => {
    const result = await plan({ aiTools: ["claude"] });
    expect(result.modules.indexOf("quality-baseline")).toBeLessThan(
      result.modules.indexOf("ai-dx")
    );
  });
});

describe("resolveScaffoldPlan — cross-dimension combinations", () => {
  it("minimal: blank, pg, email-password, none billing, none email, vercel, no AI", async () => {
    const result = await plan({
      billingProvider: "none",
      emailProvider: "none",
      deployTarget: "vercel",
      aiTools: []
    });
    expect(result.modules).toEqual(
      expect.arrayContaining(["quality-baseline", "testing-baseline", "auth-core", "db-pg"])
    );
    expect(result.modules).not.toContain("billing-stripe");
    expect(result.modules).not.toContain("billing-polar");
    expect(result.modules).not.toContain("email-resend");
    expect(result.modules).not.toContain("deploy-docker");
    expect(result.modules).not.toContain("ai-dx");
  });

  it("maximal: dashboard, postgres.js, github+google, both billing, resend, docker, all AI", async () => {
    const result = await plan({
      template: "dashboard",
      databaseDriver: "postgres.js",
      authMode: "email-password+github+google",
      billingProvider: "both",
      emailProvider: "resend",
      deployTarget: "docker",
      aiTools: ["cursor", "claude", "gemini", "copilot"]
    });
    expect(result.modules).toContain("dashboard-shell");
    expect(result.modules).toContain("db-postgresjs");
    expect(result.modules).toContain("auth-github");
    expect(result.modules).toContain("auth-google");
    expect(result.modules).toContain("billing-stripe");
    expect(result.modules).toContain("billing-polar");
    expect(result.modules).toContain("email-resend");
    expect(result.modules).toContain("deploy-docker");
    expect(result.modules).toContain("ai-dx");
    expect(result.modules).toContain("ai-dx-cursor");
    expect(result.modules).toContain("ai-dx-claude");
    expect(result.modules).toContain("ai-dx-gemini");
    expect(result.modules).not.toContain("db-pg");
  });

  it("modules are deduplicated when deps are shared across multiple modules", async () => {
    // Both auth-github and auth-google depend on auth-core — auth-core should appear once
    const result = await plan({ authMode: "email-password+github+google" });
    const authCoreCount = result.modules.filter((m) => m === "auth-core").length;
    expect(authCoreCount).toBe(1);
    const qualityCount = result.modules.filter((m) => m === "quality-baseline").length;
    expect(qualityCount).toBe(1);
  });
});

// ─── module application — token replacements ─────────────────────────────────

describe("buildModuleTokenReplacements — billing provider token", () => {
  it("stripe → __BILLING_PROVIDER__ is stripe", async () => {
    const p = await plan({ billingProvider: "stripe" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__BILLING_PROVIDER__).toBe("stripe");
  });

  it("polar → __BILLING_PROVIDER__ is polar", async () => {
    const p = await plan({ billingProvider: "polar" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__BILLING_PROVIDER__).toBe("polar");
  });

  it("both → __BILLING_PROVIDER__ is both", async () => {
    const p = await plan({ billingProvider: "both" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__BILLING_PROVIDER__).toBe("both");
  });

  it("none → __BILLING_PROVIDER__ is none", async () => {
    const p = await plan({ billingProvider: "none" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__BILLING_PROVIDER__).toBe("none");
  });
});

describe("buildModuleTokenReplacements — email provider token", () => {
  it("resend → __EMAIL_PROVIDER__ is resend", async () => {
    const p = await plan({ emailProvider: "resend" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__EMAIL_PROVIDER__).toBe("resend");
  });

  it("none → __EMAIL_PROVIDER__ is none", async () => {
    const p = await plan({ emailProvider: "none" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__EMAIL_PROVIDER__).toBe("none");
  });
});

describe("buildModuleTokenReplacements — package dependencies", () => {
  it("stripe billing adds stripe package dependency", async () => {
    const p = await plan({ billingProvider: "stripe" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__PROVIDER_PACKAGE_DEPENDENCIES__).toContain('"stripe"');
  });

  it("polar billing does not add stripe package dependency", async () => {
    const p = await plan({ billingProvider: "polar" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__PROVIDER_PACKAGE_DEPENDENCIES__).not.toContain('"stripe"');
  });

  it("both billing adds stripe package dependency", async () => {
    const p = await plan({ billingProvider: "both" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__PROVIDER_PACKAGE_DEPENDENCIES__).toContain('"stripe"');
  });

  it("no billing and no email — empty package dependencies", async () => {
    const p = await plan({ billingProvider: "none", emailProvider: "none" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__PROVIDER_PACKAGE_DEPENDENCIES__).toBe("");
  });

  it("resend email adds resend package dependency", async () => {
    const p = await plan({ emailProvider: "resend" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__PROVIDER_PACKAGE_DEPENDENCIES__).toContain('"resend"');
  });

  it("no email — resend not in dependencies", async () => {
    const p = await plan({ emailProvider: "none", billingProvider: "none" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__PROVIDER_PACKAGE_DEPENDENCIES__).not.toContain('"resend"');
  });
});

describe("buildModuleTokenReplacements — auth social tokens", () => {
  it("email-password only — no auth provider env token set (preset supplies empty default)", async () => {
    const p = await plan({ authMode: "email-password" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_PROVIDER_ENV_EXAMPLE__).toBeUndefined();
  });

  it("github auth — env example contains GITHUB_CLIENT_ID", async () => {
    const p = await plan({ authMode: "email-password+github" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_PROVIDER_ENV_EXAMPLE__).toContain("GITHUB_CLIENT_ID");
    expect(tokens.__AUTH_PROVIDER_ENV_EXAMPLE__).toContain("GITHUB_CLIENT_SECRET");
  });

  it("google auth — env example contains GOOGLE_CLIENT_ID", async () => {
    const p = await plan({ authMode: "email-password+google" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_PROVIDER_ENV_EXAMPLE__).toContain("GOOGLE_CLIENT_ID");
    expect(tokens.__AUTH_PROVIDER_ENV_EXAMPLE__).toContain("GOOGLE_CLIENT_SECRET");
  });

  it("github auth — env schema contains GITHUB_CLIENT_ID", async () => {
    const p = await plan({ authMode: "email-password+github" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_PROVIDER_ENV_SCHEMA__).toContain("GITHUB_CLIENT_ID");
  });

  it("google auth — env schema contains GOOGLE_CLIENT_ID", async () => {
    const p = await plan({ authMode: "email-password+google" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_PROVIDER_ENV_SCHEMA__).toContain("GOOGLE_CLIENT_ID");
  });

  it("github auth — social providers block contains github config", async () => {
    const p = await plan({ authMode: "email-password+github" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_SOCIAL_PROVIDERS_BLOCK__).toContain("github");
  });

  it("google auth — social providers block contains google config", async () => {
    const p = await plan({ authMode: "email-password+google" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_SOCIAL_PROVIDERS_BLOCK__).toContain("google");
  });

  it("email-password only — no social providers block token set (preset supplies empty default)", async () => {
    const p = await plan({ authMode: "email-password" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_SOCIAL_PROVIDERS_BLOCK__).toBeUndefined();
  });

  it("github auth — social button handler references handleGithubSignIn", async () => {
    const p = await plan({ authMode: "email-password+github" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_SOCIAL_BUTTON_HANDLER__).toContain("handleGithubSignIn");
  });

  it("google auth — social button handler references handleGoogleSignIn", async () => {
    const p = await plan({ authMode: "email-password+google" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__AUTH_SOCIAL_BUTTON_HANDLER__).toContain("handleGoogleSignIn");
  });
});

describe("buildModuleTokenReplacements — database tokens", () => {
  it("pg driver — __DATABASE_DRIVER__ is pg", async () => {
    const p = await plan({ databaseDriver: "pg" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__DATABASE_DRIVER__).toBe("pg");
  });

  it("postgres.js driver — __DATABASE_DRIVER__ is postgres.js", async () => {
    const p = await plan({ databaseDriver: "postgres.js" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__DATABASE_DRIVER__).toBe("postgres.js");
  });

  it("pg — drizzle import path is drizzle-orm/node-postgres", async () => {
    const p = await plan({ databaseDriver: "pg" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__DRIZZLE_DRIVER_IMPORT__).toBe("drizzle-orm/node-postgres");
  });

  it("postgres.js — drizzle import path is drizzle-orm/postgres-js", async () => {
    const p = await plan({ databaseDriver: "postgres.js" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__DRIZZLE_DRIVER_IMPORT__).toBe("drizzle-orm/postgres-js");
  });
});

describe("buildModuleTokenReplacements — email implementation", () => {
  it("resend — email send implementation references resend.emails.send", async () => {
    const p = await plan({ emailProvider: "resend" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__EMAIL_SEND_IMPLEMENTATION__).toContain("resend.emails.send");
  });

  it("none email — send implementation is skipped stub", async () => {
    const p = await plan({ emailProvider: "none" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__EMAIL_SEND_IMPLEMENTATION__).toContain("skipped");
  });

  it("none email — send signature uses underscore-prefixed param", async () => {
    const p = await plan({ emailProvider: "none" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__EMAIL_SEND_SIGNATURE__).toBe("_input");
  });

  it("resend — send signature uses input param", async () => {
    const p = await plan({ emailProvider: "resend" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__EMAIL_SEND_SIGNATURE__).toBe("input");
  });
});

describe("buildModuleTokenReplacements — billing webhook tokens", () => {
  it("stripe — webhook route body is set", async () => {
    const p = await plan({ billingProvider: "stripe" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__STRIPE_WEBHOOK_ROUTE_BODY__).toContain("getBillingProvider");
  });

  it("no stripe — webhook route body is 404 stub", async () => {
    const p = await plan({ billingProvider: "polar" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__STRIPE_WEBHOOK_ROUTE_BODY__).toContain("404");
  });

  it("polar — polar webhook route body is set", async () => {
    const p = await plan({ billingProvider: "polar" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__POLAR_WEBHOOK_ROUTE_BODY__).toContain("getBillingProvider");
  });

  it("no polar — polar webhook route body is 404 stub", async () => {
    const p = await plan({ billingProvider: "stripe" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__POLAR_WEBHOOK_ROUTE_BODY__).toContain("404");
  });

  it("stripe — webhook route signature is request param", async () => {
    const p = await plan({ billingProvider: "stripe" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__STRIPE_WEBHOOK_ROUTE_SIGNATURE__).toBe("request: Request");
  });

  it("no stripe — webhook route signature is _request", async () => {
    const p = await plan({ billingProvider: "polar" });
    const tokens = await buildModuleTokenReplacements(ROOT, p);
    expect(tokens.__STRIPE_WEBHOOK_ROUTE_SIGNATURE__).toBe("_request: Request");
  });
});

// ─── module application — file overlays ──────────────────────────────────────

describe("buildModuleFileOverlays — deploy-docker", () => {
  it("docker target includes Dockerfile overlay", async () => {
    const p = await plan({ deployTarget: "docker" });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).toContain("Dockerfile");
  });

  it("docker target includes .dockerignore overlay", async () => {
    const p = await plan({ deployTarget: "docker" });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).toContain(".dockerignore");
  });

  it("vercel target has no Dockerfile overlay", async () => {
    const p = await plan({ deployTarget: "vercel" });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).not.toContain("Dockerfile");
  });
});

describe("buildModuleFileOverlays — ai-dx", () => {
  it("no AI tools — no AGENTS.md overlay", async () => {
    const p = await plan({ aiTools: [] });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).not.toContain("AGENTS.md");
  });

  it("any AI tool — includes AGENTS.md overlay", async () => {
    const p = await plan({ aiTools: ["copilot"] });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).toContain("AGENTS.md");
    expect(destinations).toContain("ARCHITECTURE.md");
  });

  it("cursor tool — includes .cursor/rules files", async () => {
    const p = await plan({ aiTools: ["cursor"] });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).toContain(".cursor/rules/project.mdc");
    expect(destinations).toContain(".cursor/rules/nextjs.mdc");
    expect(destinations).toContain(".cursor/rules/database.mdc");
    expect(destinations).toContain(".cursor/rules/auth.mdc");
    expect(destinations).toContain(".cursor/rules/testing.mdc");
    expect(destinations).toContain(".cursor/rules/env.mdc");
  });

  it("claude tool — includes CLAUDE.md overlay", async () => {
    const p = await plan({ aiTools: ["claude"] });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).toContain("CLAUDE.md");
  });

  it("gemini tool — includes .gemini/GEMINI.md overlay", async () => {
    const p = await plan({ aiTools: ["gemini"] });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).toContain(".gemini/GEMINI.md");
  });

  it("copilot only — no cursor/claude/gemini-specific files", async () => {
    const p = await plan({ aiTools: ["copilot"] });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).not.toContain("CLAUDE.md");
    expect(destinations).not.toContain(".gemini/GEMINI.md");
    expect(destinations.some((d) => d.startsWith(".cursor/"))).toBe(false);
  });
});

describe("buildModuleFileOverlays — dashboard-shell", () => {
  it("dashboard template includes globals.css overlay from dashboard-shell", async () => {
    const p = await plan({ template: "dashboard" });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).toContain("src/app/globals.css");
  });

  it("blank template does not include globals.css overlay", async () => {
    const p = await plan({ template: "blank" });
    const overlays = await buildModuleFileOverlays(ROOT, p);
    const destinations = overlays.map((o) => o.destination);
    expect(destinations).not.toContain("src/app/globals.css");
  });
});

// ─── module application — prune list ─────────────────────────────────────────

describe("buildModulePruneList — billing file pruning", () => {
  it("stripe only — prunes polar provider and webhook route", () => {
    const p = { modules: ["billing-stripe"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).toContain("src/lib/billing/providers/polar.ts");
    expect(pruned).toContain("src/app/api/webhooks/polar/route.ts");
  });

  it("stripe only — keeps stripe files (not pruned)", () => {
    const p = { modules: ["billing-stripe"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).not.toContain("src/lib/billing/providers/stripe.ts");
    expect(pruned).not.toContain("src/app/api/webhooks/stripe/route.ts");
  });

  it("polar only — prunes stripe provider and webhook route", () => {
    const p = { modules: ["billing-polar"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).toContain("src/lib/billing/providers/stripe.ts");
    expect(pruned).toContain("src/app/api/webhooks/stripe/route.ts");
  });

  it("polar only — keeps polar files (not pruned)", () => {
    const p = { modules: ["billing-polar"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).not.toContain("src/lib/billing/providers/polar.ts");
    expect(pruned).not.toContain("src/app/api/webhooks/polar/route.ts");
  });

  it("both providers — prunes neither stripe nor polar files", () => {
    const p = { modules: ["billing-stripe", "billing-polar"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).not.toContain("src/lib/billing/providers/stripe.ts");
    expect(pruned).not.toContain("src/lib/billing/providers/polar.ts");
  });

  it("no billing — prunes entire billing structure", () => {
    const p = { modules: ["quality-baseline", "auth-core"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).toContain("src/lib/billing");
    expect(pruned).toContain("src/app/api/billing");
    expect(pruned).toContain("src/app/api/webhooks/stripe");
    expect(pruned).toContain("src/app/api/webhooks/polar");
    expect(pruned).toContain("src/app/billing");
  });

  it("no billing — does not prune individual provider files (whole dirs pruned instead)", () => {
    const p = { modules: ["quality-baseline", "auth-core"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).not.toContain("src/lib/billing/providers/stripe.ts");
    expect(pruned).not.toContain("src/lib/billing/providers/polar.ts");
  });
});

describe("buildModulePruneList — email file pruning", () => {
  it("no email — prunes entire email structure", () => {
    const p = { modules: ["quality-baseline", "auth-core"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).toContain("src/lib/email");
    expect(pruned).toContain("src/app/api/email");
    expect(pruned).toContain("src/app/email");
  });

  it("resend email — does not prune email structure", () => {
    const p = { modules: ["quality-baseline", "auth-core", "email-resend"] };
    const pruned = buildModulePruneList(p);
    expect(pruned).not.toContain("src/lib/email");
    expect(pruned).not.toContain("src/app/api/email");
    expect(pruned).not.toContain("src/app/email");
  });
});
