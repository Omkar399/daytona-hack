#!/bin/bash

echo "🐍 Setting up Browser Use Local (Python)"
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip first."
    exit 1
fi

echo "📦 Installing Python dependencies..."
pip3 install -r requirements-browser-local.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Make sure Chrome/Chromium is installed:"
echo "      macOS: brew install --cask google-chrome"
echo "      Linux: sudo apt-get install chromium-browser"
echo "      Windows: Download from https://www.google.com/chrome/"
echo ""
echo "   2. Set environment variables:"
echo "      export BROWSER_USE_API_KEY=your_api_key"
echo "      export X_USERNAME=your_username  # Optional if using profile"
echo "      export X_PASSWORD=your_password  # Optional if using profile"
echo ""
echo "   3. Test the Python service:"
echo "      python3 api/src/service/browser/browser-local.py 'Test post'"
echo ""

