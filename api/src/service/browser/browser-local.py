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
from browser_use import Agent, Browser, ChatAnthropic

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
        self.api_key = os.getenv("ANTHROPIC_API_KEY")
        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY environment variable is required")
        
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
            llm=ChatAnthropic(
                model="claude-sonnet-4-5-20250929",  # Claude Haiku 4.5 - Fast and cheap
                api_key=self.api_key,
                temperature=0.0,  # Deterministic for automation
            ),
            browser=browser,
            available_file_paths=image_paths,  # Allow agent to access downloaded images
            extend_system_message=strict_format_prompt,  # Add strict JSON formatting rules
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
            prompt += f"""

{step_num}. CRITICAL: Attach images as FILES. Twitter/X requires actual image files to be uploaded.

   You have {len(image_paths)} image(s) to attach. Follow these steps:
   
   Step A: Click the image/media attachment button (usually an image icon, "+" button, or media icon near the post text box)
   
   Step B: Upload each image file using the file picker:
   
   For each image:
   {chr(10).join(f'   - {path}  # Image {i+1}' for i, path in enumerate(image_paths))}
   
   IMPORTANT: 
   - Click the media/image button to open the file picker
   - When the file dialog appears, select and upload each image file above
   - The Agent will automatically handle the file upload dialog
   
   Step C: Wait 5-10 seconds after uploading to allow Twitter/X to process and display previews
   Step D: VERIFY {len(image_paths)} image preview(s) appear in the composer before posting
   Step E: If previews are visible, proceed to post. If not, try clicking media button again and re-uploading"""
            step_num += 1
        
        prompt += f"""
{step_num}. ONLY click "Post" if you can VERIFY all images are visible in the composer (or if no images, just verify the text is correct)
{step_num + 1}. If everything looks good, click the "Post" or "Tweet" button ONCE
{step_num + 2}. Wait for the post to appear in the feed
{step_num + 3}. STOP - Your task is complete. Do NOT make another post.

IMPORTANT: Make only ONE post and then stop. Do not repeat the posting action."""
        
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

