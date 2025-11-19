#!/usr/bin/env python3
"""
Browser Use Local Service - Python implementation for local browser automation
Uses Browser Use Python library with local browser and file system access
"""

import os
import sys
import json
import asyncio
from pathlib import Path
from typing import List, Optional, Dict, Any
import tempfile
import requests
from browser_use import Agent, Browser, ChatOpenAI

# Try to load .env file if python-dotenv is available (for direct execution)
try:
    from dotenv import load_dotenv
    # Load .env from api directory (parent of src/service/browser)
    env_path = Path(__file__).parent.parent.parent.parent / '.env'
    if env_path.exists():
        load_dotenv(env_path)
        print(f"📝 Loaded .env from: {env_path}")
except ImportError:
    # python-dotenv not installed, rely on environment variables from parent process
    pass


class BrowserLocalService:
    """Local browser automation service with file upload support"""
    
    def __init__(self):
        # Use NVIDIA's Llama model via OpenAI-compatible API
        self.api_key = os.getenv("NVIDIA_API_KEY")
        if not self.api_key:
            raise ValueError("NVIDIA_API_KEY environment variable is required")
        
        # NVIDIA's API is OpenAI-compatible, use it with ChatOpenAI
        self.base_url = "https://integrate.api.nvidia.com/v1"
        self.model = "meta/llama-4-maverick-17b-128e-instruct"
        
        # Create downloads directory for temporary files
        self.downloads_dir = Path(tempfile.gettempdir()) / "browser-use-downloads"
        self.downloads_dir.mkdir(exist_ok=True)
        
        # Persistent browser profile directory (saves cookies)
        # This allows us to login once and reuse the session
        home_dir = Path.home()
        self.profile_dir = home_dir / ".browser-use-x-profile"
        self.profile_dir.mkdir(exist_ok=True)
        print(f"📁 Using persistent profile: {self.profile_dir}")
    
    async def download_image(self, url: str, filename: str) -> Path:
        """Download an image from URL to local file system"""
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        file_path = self.downloads_dir / filename
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return file_path
    
    async def post_to_x(
        self,
        post_content: str,
        screenshot_urls: List[str] = None,
        x_username: Optional[str] = None,
        x_password: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Post to X (Twitter) with optional image attachments
        
        Args:
            post_content: Text content to post
            screenshot_urls: List of screenshot URLs to attach
            x_username: X username (if not using profile)
            x_password: X password (if not using profile)
        
        Returns:
            Dict with task_id, status, screenshots, and result
        """
        screenshot_urls = screenshot_urls or []
        
        # Download images to local file system
        image_paths = []
        if screenshot_urls:
            print(f"📥 Downloading {len(screenshot_urls)} images...")
            for i, url in enumerate(screenshot_urls):
                filename = f"screenshot_{i+1}.png"
                try:
                    path = await self.download_image(url, filename)
                    image_paths.append(str(path))
                    print(f"   ✅ Downloaded: {filename} ({path.stat().st_size} bytes)")
                except Exception as e:
                    print(f"   ❌ Failed to download {url}: {e}")
                    raise
        
        # Check if we're already logged in (have saved cookies)
        is_logged_in = self._is_logged_in()
        
        if is_logged_in:
            print("🔐 Found saved session - will skip login")
        else:
            print("🔑 No saved session - will login first time (session will be saved)")
        
        # Build task prompt
        task_prompt = self._build_task_prompt(
            post_content, 
            image_paths, 
            x_username, 
            x_password,
            skip_login=is_logged_in,
        )
        
        # Create browser with persistent profile (saves cookies)
        # This allows us to reuse the same session across multiple runs
        browser = Browser(
            headless=False,  # Set to True for production (headless mode)
            downloads_path=str(self.downloads_dir),
            accept_downloads=True,
            user_data_dir=str(self.profile_dir),  # Persistent profile directory
        )
        
        # Start the browser session explicitly
        await browser.start()
        print("🌐 Browser started successfully")
        
        # Create Agent for browser automation (not CodeAgent - that's for code execution)
        # Regular Agent can navigate, click, type, and handle file uploads
        
        # Strict JSON formatting instructions for Haiku
        strict_format_prompt = """
CRITICAL: You MUST respond with valid JSON in EXACTLY this format:
{
  "thinking": "your thought process",
  "action": {
    "name": "action_name",
    "params": {}
  }
}

NEVER omit the "action" field. ALWAYS include both "thinking" AND "action" in every response.
If you're just observing, use action: {"name": "done", "params": {}}.
"""
        
        agent = Agent(
            task=task_prompt,
            llm=ChatOpenAI(
                model=self.model,
                api_key=self.api_key,
                base_url=self.base_url,
                temperature=0.0,  # Deterministic for automation
            ),
            browser=browser,
            use_vision=False,  # Llama is text-based, not vision-enabled
            available_file_paths=image_paths,  # Allow agent to access downloaded images
        )
        
        print("🚀 Starting browser automation task...")
        
        # Run the agent
        try:
            result = await agent.run()
            
            # Get screenshots from the agent's session
            screenshots = []
            if hasattr(agent, 'session') and hasattr(agent.session, 'screenshots'):
                screenshots = [s.url if hasattr(s, 'url') else str(s) for s in agent.session.screenshots]
            
            return {
                "status": "finished",
                "result": str(result) if result else None,
                "screenshots": screenshots,
                "task_id": getattr(agent, 'task_id', None),
            }
        except Exception as e:
            print(f"❌ Task failed: {e}")
            import traceback
            traceback.print_exc()
            raise
        finally:
            # Clean up browser
            try:
                if 'browser' in locals() and browser:
                    if hasattr(browser, 'stop'):
                        await browser.stop()
                    elif hasattr(browser, 'close'):
                        await browser.close()
            except Exception as e:
                print(f"⚠️  Error closing browser: {e}")
            
            # Clean up downloaded images
            for path in image_paths:
                try:
                    Path(path).unlink(missing_ok=True)
                except:
                    pass
    
    def _build_task_prompt(
        self,
        post_content: str,
        image_paths: List[str],
        x_username: Optional[str],
        x_password: Optional[str],
        skip_login: bool = False,
    ) -> str:
        """Build the task prompt for the browser agent"""
        
        if skip_login:
            # User is already logged in (cookies saved), skip login
            prompt = f"""You are already logged into X (Twitter) using a saved session. Make EXACTLY ONE post. Follow these steps:
1. Go to x.com (you should already be logged in)
2. If you see a login page, wait 5 seconds - the session might be loading
3. If still on login page, you may need to login manually (this shouldn't happen if cookies are saved)
4. Once on the main X feed, find the "Post" or "What's happening?" text box
5. Type the following message: "{post_content}\""""
        else:
            # Need to login first time
            if not x_username or not x_password:
                raise ValueError("X_USERNAME and X_PASSWORD must be set for first-time login. After login, cookies will be saved for future use.")
            
            prompt = f"""You need to login to X (Twitter) for the FIRST TIME. This login will be saved for future use. Follow these steps:
1. Go to x.com and click on "Sign in" or "Log in"
2. Enter the username: {x_username}
3. Enter the password: {x_password}
4. Complete any additional verification if required (2FA, captcha, etc.)
5. Once logged in, find the "Post" or "What's happening?" text box
6. Type the following message: "{post_content}\""""
        
        # Continue with image upload instructions
        
        # Image upload steps (adjust step number based on login flow)
        step_num = 6 if skip_login else 7  # Skip login: steps 1-5, then 6+ | Login: steps 1-6, then 7+
        if image_paths:
            file_paths_str = ', '.join(f'"{path}"' for path in image_paths)
            prompt += f"""

{step_num}. ATTACH {len(image_paths)} IMAGE(S) DIRECTLY (without clicking media button):

   Image file paths to upload:
{chr(10).join(f'   - {path}' for path in image_paths)}
   
   STEPS:
   
   Step A: Use execute_javascript to find the hidden file input element and inject files directly:
   
   ```javascript
   // Find all file input elements on the page
   const fileInputs = document.querySelectorAll('input[type="file"]');
   let fileInput = null;
   
   // Find the one that's likely for media upload (usually first or in the composer area)
   for (let input of fileInputs) {{
     if (input.style.display !== 'none' || input.offsetWidth > 0 || input.offsetHeight > 0) {{
       fileInput = input;
       break;
     }}
   }}
   
   // If not found, try the first one (usually hidden but functional)
   if (!fileInput && fileInputs.length > 0) {{
     fileInput = fileInputs[0];
   }}
   
   if (fileInput) {{
     console.log('Found file input:', fileInput);
     // Make it visible temporarily if needed
     fileInput.style.display = 'block';
     fileInput.style.visibility = 'visible';
     fileInput.style.position = 'fixed';
     fileInput.style.top = '0';
     fileInput.style.left = '0';
     fileInput.style.zIndex = '9999';
   }} else {{
     console.error('File input not found');
   }}
   ```
   
   Step B: After finding the file input, use the 'upload_file' action with the file paths:
   - Use upload_file action to inject: {file_paths_str}
   
   Step C: Wait 5-10 seconds for X to process and display the image preview
   
   Step D: VERIFY {len(image_paths)} image preview(s) appear in the composer
   
   Step E: If images are visible, proceed to post. If not, try clicking the media button and retry."""
            step_num += 1
        
        prompt += f"""
{step_num}. VERIFY THE POST WAS CREATED:

   Step A: Navigate to your profile page to verify the post was created
   - Click on your profile icon/avatar (top right of the page)
   - Or go to: https://x.com/your_username
   - Look for the recent post with the message: "🚀 Testing automated Twitter posting with Browser Use!"
   
   Step B: Confirm the post details:
   - Verify the text content is correct
   - Verify the image is attached and visible
   - Check that the post timestamp is recent
   
   Step C: If post is visible on profile: SUCCESS - Task complete
   
   Step D: If post is NOT visible: 
   - Go back to home feed and check again
   - It may take a few seconds to appear
   - Refresh the page if needed

IMPORTANT: Do NOT make another post. Your task is complete once you verify the post exists."""
        
        return prompt
    
    def _is_logged_in(self) -> bool:
        """Check if we have saved cookies (indicating previous login)"""
        # Check if profile directory has cookie files
        # Chrome stores cookies in: user_data_dir/Default/Cookies (SQLite database)
        cookies_file = self.profile_dir / "Default" / "Cookies"
        return cookies_file.exists()


async def main():
    """CLI entry point for testing"""
    if len(sys.argv) < 2:
        print("Usage: python browser-local.py <post_content> [screenshot_url1] [screenshot_url2] ...")
        sys.exit(1)
    
    # Parse arguments - first arg is post content, rest are screenshot URLs
    post_content = sys.argv[1]
    screenshot_urls = sys.argv[2:] if len(sys.argv) > 2 else []
    
    service = BrowserLocalService()
    
    try:
        result = await service.post_to_x(
            post_content=post_content,
            screenshot_urls=screenshot_urls,
            x_username=os.getenv("X_USERNAME"),
            x_password=os.getenv("X_PASSWORD"),
        )
        
        # Output JSON result to stdout (for TypeScript wrapper to parse)
        print(json.dumps(result))
    except Exception as e:
        error_result = {
            "status": "failed",
            "error": str(e),
            "screenshots": [],
        }
        print(json.dumps(error_result))
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())

