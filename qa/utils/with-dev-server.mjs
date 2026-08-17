// Starts `npm run dev`, waits until it actually answers HTTP requests, runs
// the given script, then always shuts the dev server down — used by
// qa:performance since Lighthouse drives its own Chrome instance and can't
// use Playwright's built-in webServer the way the Playwright test suites do.

import { spawn } from "node:child_process";

const BASE_URL = process.env.QA_BASE_URL ?? "http://localhost:3000";
const scriptToRun = process.argv[2];

if (!scriptToRun) {
  console.error("Usage: node qa/utils/with-dev-server.mjs <script-to-run.mjs>");
  process.exit(1);
}

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function main() {
  console.log("Starting dev server for performance run...");
  const server = spawn("npm", ["run", "dev"], { stdio: "pipe", detached: true });

  const ready = await waitForServer(BASE_URL);
  if (!ready) {
    console.error(`Dev server never became reachable at ${BASE_URL}`);
    process.kill(-server.pid);
    process.exit(1);
  }
  console.log(`Dev server ready at ${BASE_URL}`);

  const child = spawn("node", [scriptToRun], { stdio: "inherit" });
  const exitCode = await new Promise((resolve) => child.on("exit", resolve));

  console.log("Shutting down dev server...");
  try {
    process.kill(-server.pid);
  } catch {
    // already gone
  }

  process.exit(exitCode ?? 0);
}

main();
