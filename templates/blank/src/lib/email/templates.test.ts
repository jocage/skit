import { describe, expect, it } from "vitest";

import { createWelcomeEmailTemplate } from "@/lib/email/templates";

describe("createWelcomeEmailTemplate", () => {
  it("includes the app name in the subject", () => {
    const template = createWelcomeEmailTemplate({
      appName: "Skit",
      recipientName: "Ada"
    });

    expect(template.subject).toContain("Skit");
    expect(template.text).toContain("Ada");
  });
});
