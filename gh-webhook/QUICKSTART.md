# Quick Start Guide for GitHub Webhook Server

## 1. Set Environment Variables

```bash
export GH_WEBHOOK_SECRET="your_webhook_secret_from_github"
export GH_TOKEN="your_github_personal_access_token"  # Optional
export SANDBOX_URL="https://your-sandbox.example.com/deploy"
export PORT=8080
```

## 2. Run the Server

```bash
cd gh-webhook
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

You should see:
```
🚀 Webhook listener running on port 8080
```

## 3. Test the Server

Health check:
```bash
curl http://localhost:8080
# Response: OK
```

## 4. Configure GitHub Webhook

1. Go to your repository → Settings → Webhooks → Add webhook
2. Set Payload URL to: `https://yourdomain.com/github-webhook`
3. Set Content type to: `application/json`
4. Set Secret to: Your webhook secret value
5. Select event: "Let me select individual events" → Check "Pull requests"
6. Click "Add webhook"

## 5. How It Works

When a pull request is **merged** in your repository:

1. GitHub sends a webhook POST to `/github-webhook`
2. Server verifies the HMAC-SHA256 signature
3. Extracts PR details and CodeRabbit summary (if available)
4. POSTs to your `SANDBOX_URL` with:
   ```json
   {
     "repo": "owner/repo-name",
     "pr": 123,
     "title": "PR Title Here",
     "summary": "CodeRabbit review summary or PR body"
   }
   ```

## Environment Variables Reference

- **GH_WEBHOOK_SECRET** (required): Secret from GitHub webhook settings
- **GH_TOKEN** (optional): GitHub PAT to fetch CodeRabbit comments
- **SANDBOX_URL** (optional): Endpoint to trigger on PR merge
- **PORT** (optional, default: 8080): Server port

## Troubleshooting

**"Invalid signature" errors:**
- Make sure `GH_WEBHOOK_SECRET` matches exactly what's set in GitHub

**Can't connect from GitHub:**
- Use `ngrok` to expose local server: `ngrok http 8080`
- Update GitHub webhook URL with the ngrok URL

**Not fetching CodeRabbit summaries:**
- Make sure `GH_TOKEN` has read access to issues and pull requests
- Check that CodeRabbit bot has commented on the PR
