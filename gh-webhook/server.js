import express from "express";
import crypto from "crypto";
import fetch from "node-fetch";

const app = express();

// Parse form data (GitHub sends webhooks as form-urlencoded with 'payload' field)
app.use(express.urlencoded({ 
  extended: true, 
  limit: '1mb',
  verify: (req, res, buf) => { 
    req.rawBody = buf; 
  }
}));

// Also parse JSON for other uses
app.use(express.json({
  verify: (req, res, buf) => { 
    req.rawBody = buf; 
  }
}));

const WEBHOOK_SECRET = process.env.GH_WEBHOOK_SECRET; // same value you set in GitHub
const GH_TOKEN = process.env.GH_TOKEN;                 // optional: to fetch PR comments
const SANDBOX_URL = process.env.SANDBOX_URL || "https://your-sandbox.example.com/deploy";

function verifySig(req) {
  // If no webhook secret is set, skip verification (for development/testing)
  if (!WEBHOOK_SECRET) {
    console.warn("⚠️  Warning: GH_WEBHOOK_SECRET is not set. Skipping signature verification.");
    return true;
  }

  const sig = req.get("x-hub-signature-256") || "";
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  hmac.update(req.rawBody);
  const expected = "sha256=" + hmac.digest("hex");
  // timingSafeEqual requires equal-length buffers
  return sig.length === expected.length &&
         crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

app.post("/github-webhook", async (req, res) => {
  if (!verifySig(req)) return res.status(401).send("Invalid signature");

  const event = req.get("x-github-event");
  const p = req.body;

  // Log everything while you're developing
  console.log(`[${new Date().toISOString()}] Event: ${event}, Action: ${p.action || "(n/a)"}`);

  // Only act on merged PRs
  if (event === "pull_request" && p.action === "closed" && p.pull_request?.merged) {
    const { number, title, body } = p.pull_request;
    const [owner, repo] = p.repository.full_name.split("/");

    // 1) Try PR body (CodeRabbit often injects/updates the summary)
    let summary = body || "";

    // 2) Optionally fetch latest CodeRabbit comments/reviews for richer text
    try {
      if (!summary && GH_TOKEN) {
        const headers = {
          Authorization: `Bearer ${GH_TOKEN}`,
          "User-Agent": "gh-webhook-app",
          Accept: "application/vnd.github+json"
        };

        const comments = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments?per_page=100`, { headers }
        ).then(r => r.json());

        const reviews = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/pulls/${number}/reviews?per_page=100`, { headers }
        ).then(r => r.json());

        const botLogins = new Set(["coderabbitai", "coderabbit-ai", "coderabbit[bot]"]);
        const latest = [...(comments || []), ...(reviews || [])]
          .filter(c => c?.user && botLogins.has(c.user.login))
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

        if (latest?.body) summary = latest.body;
      }
    } catch (e) {
      console.warn("Failed to fetch CodeRabbit comments/reviews:", e.message);
    }

    // 3) Trigger your sandbox
    const payload = {
      repo: p.repository.full_name,
      pr: number,
      title,
      summary: summary || "(no summary found on PR body or CodeRabbit comments)"
    };

    console.log("Posting to sandbox:", payload);

    const resp = await fetch(SANDBOX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    console.log("Sandbox response status:", resp.status);
  }

  res.send("ok");
});

app.get("/", (_req, res) => res.send("OK"));

// Also accept POST requests to root path
app.post("/", async (req, res) => {
  if (!verifySig(req)) return res.status(401).send("Invalid signature");

  const event = req.get("x-github-event");
  
  // GitHub sends form data with a 'payload' field containing JSON
  let p = req.body;
  if (typeof p.payload === 'string') {
    try {
      p = JSON.parse(p.payload);
    } catch (e) {
      console.error("Failed to parse payload:", e.message);
    }
  }

  // Log everything while you're developing
  console.log(`\n${"=".repeat(80)}`);
  console.log(`[${new Date().toISOString()}] Incoming GitHub Event`);
  console.log(`${"=".repeat(80)}`);
  console.log(`Event Type: ${event}`);
  console.log(`Action: ${p.action || "(n/a)"}`);
  console.log(`Repository: ${p.repository?.full_name || "unknown"}`);
  console.log(`\nRequest Headers:`);
  console.log(`  Content-Type: ${req.get("content-type")}`);
  console.log(`  Content-Length: ${req.get("content-length")}`);
  console.log(`  X-GitHub-Event: ${req.get("x-github-event")}`);
  console.log(`\nBody Type: ${typeof p}`);
  console.log(`Body Keys: ${Object.keys(p).length > 0 ? Object.keys(p).join(", ") : "(empty)"}`);
  console.log(`\nFull Event Payload:`);
  console.log(JSON.stringify(p, null, 2));
  console.log(`${"=".repeat(80)}\n`);

  // Only act on merged PRs
  if (event === "pull_request" && p.action === "closed" && p.pull_request?.merged) {
    const { number, title, body } = p.pull_request;
    const [owner, repo] = p.repository.full_name.split("/");

    // 1) Try PR body (CodeRabbit often injects/updates the summary)
    let summary = body || "";

    // 2) Optionally fetch latest CodeRabbit comments/reviews for richer text
    try {
      if (!summary && GH_TOKEN) {
        const headers = {
          Authorization: `Bearer ${GH_TOKEN}`,
          "User-Agent": "gh-webhook-app",
          Accept: "application/vnd.github+json"
        };

        const comments = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments?per_page=100`, { headers }
        ).then(r => r.json());

        const reviews = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/pulls/${number}/reviews?per_page=100`, { headers }
        ).then(r => r.json());

        const botLogins = new Set(["coderabbitai", "coderabbit-ai", "coderabbit[bot]"]);
        const latest = [...(comments || []), ...(reviews || [])]
          .filter(c => c?.user && botLogins.has(c.user.login))
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

        if (latest?.body) summary = latest.body;
      }
    } catch (e) {
      console.warn("Failed to fetch CodeRabbit comments/reviews:", e.message);
    }

    // 3) Trigger your sandbox
    const payload = {
      repo: p.repository.full_name,
      pr: number,
      title,
      summary: summary || "(no summary found on PR body or CodeRabbit comments)"
    };

    console.log("Posting to sandbox:", payload);

    const resp = await fetch(SANDBOX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    console.log("Sandbox response status:", resp.status);
  }

  res.send("ok");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Webhook listener running on port ${PORT}`);
  console.log(`\n📋 Configuration:`);
  console.log(`   Webhook Secret: ${WEBHOOK_SECRET ? "✅ Set" : "❌ Not set (signature verification disabled)"}`);
  console.log(`   GitHub Token: ${GH_TOKEN ? "✅ Set" : "❌ Not set"}`);
  console.log(`   Sandbox URL: ${SANDBOX_URL}`);
  console.log(`\n📡 Listening for GitHub webhooks at:`);
  console.log(`   POST /`);
  console.log(`   POST /github-webhook\n`);
});
