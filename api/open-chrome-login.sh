#!/bin/bash
# Simple script to open Chrome with the persistent profile for X login

PROFILE_DIR="$HOME/.browser-use-x-profile"

echo "🔐 Opening Chrome for X (Twitter) login"
echo "📁 Profile: $PROFILE_DIR"
echo ""
echo "👤 Please:"
echo "   1. Login to X/Twitter in the browser window"
echo "   2. Complete any 2FA if needed"
echo "   3. Once logged in, close this Chrome window"
echo "   4. Your cookies will be saved to: $PROFILE_DIR"
echo ""
echo "🌐 Opening Chrome..."

# Open Chrome with the persistent profile
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
    --user-data-dir="$PROFILE_DIR" \
    --no-first-run \
    --no-default-browser-check \
    "https://x.com"

echo ""
echo "✅ Chrome closed - session has been saved!"
echo ""
echo "📝 Next step: Run the test"
echo "   cd /Users/omkarpodey/daytona-hackathon/api"
echo "   bun run test-post-to-x.ts"

