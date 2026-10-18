import "dotenv/config";
import fs from "node:fs";
import { spawn } from "node:child_process";
import { bin, install } from "cloudflared";

const token = process.env.CLOUDFLARE_TUNNEL_TOKEN?.trim();
if (!token) {
  console.error("Missing CLOUDFLARE_TUNNEL_TOKEN in .env (see .env.example).");
  process.exit(1);
}

if (!fs.existsSync(bin)) {
  console.log("cloudflared binary not found, downloading...");
  await install(bin);
}

console.log("Starting Cloudflare Tunnel...");

const child = spawn(bin, ["tunnel", "--no-autoupdate", "run"], {
  stdio: "inherit",
  env: { ...process.env, TUNNEL_TOKEN: token },
});

child.on("error", (err) => {
  console.error("Failed to start cloudflared:", err);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  console.log(`cloudflared exited (${signal ?? code}).`);
  process.exit(code ?? 0);
});

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => child.kill(sig));
}
