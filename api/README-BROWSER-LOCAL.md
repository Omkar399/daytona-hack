# Browser Use Local Setup

This setup allows you to use Browser Use with a local browser instead of Browser Use Cloud. This enables file upload capabilities for Twitter/X posts with images.

## Prerequisites

1. **Python 3.8+** installed
2. **Chrome/Chromium** browser installed:
   - macOS: `brew install --cask google-chrome`
   - Linux: `sudo apt-get install chromium-browser` or `sudo apt-get install google-chrome-stable`
   - Windows: Download from https://www.google.com/chrome/

## Setup

1. **Install Python dependencies:**
   ```bash
   cd api
   ./setup-browser-local.sh
   ```

   Or manually:
   ```bash
   pip3 install -r requirements-browser-local.txt
   ```

2. **Set environment variables in `.env` file:**
   
   Add these to your `api/.env` file:
   ```env
   ANTHROPIC_API_KEY=your_anthropic_key  # Uses Claude Sonnet for browser control
   USE_LOCAL_BROWSER=true  # Enable local browser mode
   X_USERNAME=your_username  # Only needed for first-time login
   X_PASSWORD=your_password  # Only needed for first-time login
   ```
   
   **Note:** Bun automatically loads `.env` files, so you don't need to export them. The Python script will receive these variables when called from TypeScript. If running Python directly, it will also try to load `.env` using python-dotenv.

3. **Create persistent X (Twitter) session (one-time setup):**
   
   **Option A: Automatic setup script (recommended)**
   ```bash
   cd api
   python3 setup-x-session.py
   ```
   This will:
   - Open a browser window
   - Navigate to x.com
   - You login manually (enter credentials, 2FA, etc.)
   - Save cookies to `~/.browser-use-x-profile` for future use
   
   **Option B: First run will login automatically**
   - If `X_USERNAME` and `X_PASSWORD` are set, the first run will login automatically
   - Cookies will be saved for future runs
   - Subsequent runs will skip login and reuse the saved session

## Usage

### Option 1: Use Local Browser by Default

Set `USE_LOCAL_BROWSER=true` in your environment:

```bash
export USE_LOCAL_BROWSER=true
```

Then call `postToX()` normally - it will automatically use local browser.

### Option 2: Use Local Browser Per-Call

```typescript
import { BrowserService } from '@/service/browser/Browser.service';

await BrowserService.postToX(
  'My post content',
  ['https://example.com/image.png'],
  { useLocalBrowser: true }
);
```

## How It Works

1. **TypeScript Service** (`Browser.service.ts`) detects local browser mode
2. **Python Wrapper** (`browser-local-wrapper.ts`) calls Python script
3. **Python Script** (`browser-local.py`):
   - Downloads images from URLs to local file system
   - Uses Browser Use Python library with local browser
   - Uses Playwright's native `setInputFiles()` for reliable file uploads
   - Returns results as JSON

## Advantages of Local Browser

✅ **File System Access** - Can download and access files locally  
✅ **Native File Uploads** - Playwright's `setInputFiles()` works with React file inputs  
✅ **More Control** - Full access to browser automation capabilities  
✅ **No Cloud Limitations** - No file system restrictions  
✅ **Persistent Sessions** - Login once, reuse cookies automatically (saved to `~/.browser-use-x-profile`)  

## Disadvantages

❌ **Requires Local Setup** - Need Python and Chrome installed  
❌ **Deployment Complexity** - Harder to deploy (need to install dependencies)  
❌ **Resource Usage** - Runs browser locally (uses CPU/memory)

## Persistent Sessions

The local browser uses a persistent profile directory (`~/.browser-use-x-profile`) to save cookies. This means:

- **First run**: Logs in using `X_USERNAME` and `X_PASSWORD` (or manually via `setup-x-session.py`)
- **Subsequent runs**: Automatically reuses saved cookies, skips login
- **No credentials needed**: After first login, you don't need `X_USERNAME`/`X_PASSWORD` anymore

To reset the session (logout), delete the profile directory:
```bash
rm -rf ~/.browser-use-x-profile
```  

## Testing

Test the Python script directly:

```bash
cd api/src/service/browser
python3 browser-local.py "Test post" "https://example.com/image.png"
```

## Troubleshooting

### Python not found
- Make sure Python 3.8+ is installed: `python3 --version`
- On some systems, use `python` instead of `python3`

### Chrome/Chromium not found
- Install Chrome/Chromium (see Prerequisites)
- Browser Use will download Chromium automatically if not found

### File upload still not working
- Make sure images are downloaded successfully (check temp directory)
- Verify Playwright can access the file paths
- Check browser console for errors

### Import errors
- Make sure all dependencies are installed: `pip3 install -r requirements-browser-local.txt`
- Check Python path: `which python3`

