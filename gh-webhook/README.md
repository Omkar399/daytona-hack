# GitHub Webhook Listener

A lightweight Express server that listens for GitHub webhook events and triggers actions on merged PRs.

## Features

- ✅ HMAC-SHA256 signature verification for security
- ✅ Filters for merged PR events
- ✅ Fetches CodeRabbit summaries from PR body or comments
- ✅ Posts to sandbox URL on PR merge
- ✅ Runs on port 8080

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` with your values:

```env
GH_WEBHOOK_SECRET=your_webhook_secret_from_github
GH_TOKEN=your_github_personal_access_token
SANDBOX_URL=https://your-sandbox-url.com/deploy
PORT=8080
```

### 3. Set Up GitHub Webhook

1. Go to your GitHub repository → Settings → Webhooks
2. Click "Add webhook"
3. **Payload URL**: `https://your-domain.com/github-webhook` (make sure it's publicly accessible)
4. **Content type**: `application/json`
5. **Secret**: Use a strong random string (e.g., `openssl rand -hex 32`)
6. **Events**: Select "Let me select individual events" → Choose "Pull requests"
7. Click "Add webhook"

Copy the secret and paste it into your `.env` file as `GH_WEBHOOK_SECRET`.

### 4. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will listen on http://localhost:8080

## How It Works

1. **GitHub sends webhook** → POST to `/github-webhook`
2. **Signature verification** → Checks `x-hub-signature-256` header
3. **Event filtering** → Only processes merged PR events (`pull_request` + `action: closed` + `merged: true`)
4. **Summary extraction** → 
   - First checks PR body
   - Falls back to fetching CodeRabbit comments/reviews if available
5. **Sandbox trigger** → POSTs payload to `SANDBOX_URL`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GH_WEBHOOK_SECRET` | Yes | Secret for HMAC signature verification |
| `GH_TOKEN` | No | GitHub token for fetching PR comments/reviews |
| `SANDBOX_URL` | No | Endpoint to call on merged PRs |
| `PORT` | No | Server port (default: 8080) |

## Testing Locally

Use ngrok to expose your local server:

```bash
ngrok http 8080
```

Then use the ngrok URL in your GitHub webhook settings.

## API Endpoints

### GET `/`
Health check endpoint. Returns `OK`.

### POST `/github-webhook`
GitHub webhook endpoint. Requires valid `x-hub-signature-256` header.

**Accepted events:**
- `pull_request` with `action: closed` and `merged: true`

**Payload sent to sandbox:**
```json
{
  "repo": "owner/repo-name",
  "pr": 123,
  "title": "PR Title",
  "summary": "CodeRabbit summary or PR body text"
}
```

## Security

- All incoming webhooks are verified using HMAC-SHA256
- Uses `crypto.timingSafeEqual` to prevent timing attacks
- Webhook secret is kept in environment variables
- Never logs sensitive data
