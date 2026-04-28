import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const cliRoot = path.join(repoRoot, "apps", "cli");
const assetDirectories = ["templates", "modules", "presets"];
const staleCliDirectories = ["apps"];

async function main() {
  for (const directory of staleCliDirectories) {
    await rm(path.join(cliRoot, directory), {
      force: true,
      recursive: true
    });
  }

  for (const directory of assetDirectories) {
    const destination = path.join(cliRoot, directory);

    await rm(destination, {
      force: true,
      recursive: true
    });
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(repoRoot, directory), destination, {
      recursive: true
    });
  }
}

await main();
