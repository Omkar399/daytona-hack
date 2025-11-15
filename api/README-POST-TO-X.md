# Post to X (Twitter) Script

This script uses browser-use to automatically login to X (formerly Twitter) and make a post.

## What It Does

The script automates the following tasks:
1. Opens a browser and navigates to X.com
2. Logs in with your credentials
3. Creates a single post with your specified content
4. Captures screenshots of each step
5. Returns logs and confirmation of the post

## Prerequisites

Before using this script, you need:

- **Bun runtime** installed
- **browser-use API key** (get one at [browser-use.com](https://browser-use.com))
- **X (Twitter) account** with valid credentials
- All dependencies installed (`bun install`)

## Setup

### 1. Environment Variables

Create or update your `.env` file in the `api` directory with the following variables:

```env
# Required - Your browser-use API key
BROWSER_USE_API_KEY=bu_your_api_key_here

# Required - Your X credentials
X_USERNAME=your_x_username_or_email
X_PASSWORD=your_x_password

# Optional - Custom post content (defaults to a test message)
POST_CONTENT=Hello from browser-use! This is an automated post.
```

**Important Security Notes:**
- Never commit your `.env` file to version control
- Keep your credentials secure
- The `.env` file should already be in your `.gitignore`

### 2. Install Dependencies

Make sure all dependencies are installed:

```bash
cd api
bun install
```

## How to Run

Run the script using Bun:

```bash
cd api
bun run post-to-x.ts
```

You'll see output showing:
- Task creation confirmation
- Live URL to watch the browser agent in real-time
- Progress updates as the agent works
- Screenshots from each step
- Task completion confirmation

## Configuration Options

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BROWSER_USE_API_KEY` | Yes | - | Your browser-use API key |
| `X_USERNAME` | Yes | 'your_username' | Your X username or email |
| `X_PASSWORD` | Yes | 'your_password' | Your X password |
| `POST_CONTENT` | No | 'Hello from browser-use! This is an automated post.' | The text content of your post |

### Customizing Post Content

You can customize what gets posted in three ways:

**1. Via environment variable:**
```bash
POST_CONTENT="Check out this amazing project!" bun run post-to-x.ts
```

**2. Via .env file:**
```env
POST_CONTENT=My custom post content here
```

**3. Edit the script directly:**
```typescript
const POST_CONTENT = 'Your custom message here';
```

## Expected Output

When the script runs successfully, you'll see:

```
🐦 Posting to X (Twitter)

📝 Step 1: Creating browser task to login and post to X...
✅ Task created

📊 Task Details:
   - Task ID: task_xxxxx
   - Live URL: https://...

⏳ Step 2: Waiting for browser agent to complete (max 5 minutes)...
   (This may take a while as the agent logs in and posts)

✅ Task completed!
   - Status: finished
   - Result: {...}

📸 Step 3: Extracting screenshots from task steps...
✅ Found X screenshots

📷 Screenshots:
   Screenshot 1:
   - Step #1
   - URL: https://...
   ...

📋 Step 4: Getting task logs...
✅ Got logs (XXXX characters)

✅ POST TO X COMPLETE!
════════════════════════════════════════════════════════════
📊 Summary:
   ✅ Logged into X
   ✅ Post created: "Your post content"
   ✅ Screenshots captured: X

🎉 Successfully posted to X!
```

## Troubleshooting

### Error: 401 or 403

**Problem:** Invalid or expired API key

**Solution:**
- Check that `BROWSER_USE_API_KEY` is set correctly in `.env`
- Verify your API key is valid at browser-use.com
- Make sure the key starts with `bu_`

### Error: Timeout

**Problem:** Task took too long to complete

**Possible causes:**
- Invalid X credentials
- 2FA/additional verification required
- X is slow or having issues
- Network connectivity problems

**Solution:**
- Verify your X credentials are correct
- Check if 2FA is enabled on your account (see 2FA section below)
- Try again after a few minutes
- Check the live URL to see what the agent is doing

### Error: ENOTFOUND or ECONNREFUSED

**Problem:** Cannot reach X.com

**Solution:**
- Check your internet connection
- Verify X.com is accessible from your location
- Check if you're behind a firewall or proxy

### Double Posting Issue

**Problem:** Script posts twice instead of once

**Solution:**
- This should be fixed in the current version
- The script now explicitly tells the agent to post only once and stop
- If still occurring, check the logs for repeated actions

## Two-Factor Authentication (2FA)

If your X account has 2FA enabled:

- The browser-use agent may need additional time to handle verification
- You might need to manually intervene during the live session
- Consider using the live URL to watch and assist if needed
- For fully automated posting, you may need to disable 2FA or use an app password

## Rate Limits and Best Practices

**X Rate Limits:**
- X has rate limits on posting frequency
- Avoid running this script too frequently
- Respect X's Terms of Service

**Best Practices:**
- Test with a test account first
- Don't spam or abuse automated posting
- Monitor the live URL to ensure everything works correctly
- Keep your credentials secure
- Use meaningful, legitimate content

## Live URL Feature

When the task is created, you'll receive a `liveUrl`. You can:
- Open this URL in your browser
- Watch the browser agent in real-time
- See exactly what the agent is doing
- Intervene if needed

This is useful for:
- Debugging issues
- Verifying the agent's behavior
- Understanding how the automation works

## Script Architecture

The script uses:
- **BrowserService**: Wrapper around browser-use SDK
- **Task creation**: Sends instructions to browser-use
- **Task monitoring**: Polls for completion
- **Screenshot capture**: Gets visual confirmation of steps
- **Log retrieval**: Downloads full execution logs

## Support and Documentation

- **browser-use SDK**: [https://browser-use.com/docs](https://browser-use.com/docs)
- **X API**: [https://developer.x.com](https://developer.x.com)
- **Bun runtime**: [https://bun.sh](https://bun.sh)

## License

This script is part of the Daytona Hackathon project.