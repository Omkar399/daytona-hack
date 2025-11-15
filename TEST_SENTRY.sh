#!/bin/bash

echo "════════════════════════════════════════════════════════"
echo "  Testing Sentry Integration"
echo "════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Step 1: Checking if API server is running..."
echo ""

HEALTH_CHECK=$(curl -s http://localhost:8000/health 2>&1)

if [ "$HEALTH_CHECK" = "OK" ]; then
    echo -e "${GREEN}✅ Server is running${NC}"
else
    echo -e "${RED}❌ Server is not running${NC}"
    echo ""
    echo "Please start the server first:"
    echo "  cd api"
    echo "  bun run dev"
    echo ""
    exit 1
fi

echo ""
echo "Step 2: Testing Sentry error endpoint..."
echo ""

RESPONSE=$(curl -s http://localhost:8000/sentry-test 2>&1)

echo "Response from /sentry-test:"
echo "$RESPONSE"
echo ""

if [[ "$RESPONSE" == *"error"* ]] || [[ "$RESPONSE" == *"Error"* ]]; then
    echo -e "${GREEN}✅ Error endpoint responded${NC}"
    echo ""
    echo "Expected response should include:"
    echo '  - "error": "Internal Server Error"'
    echo '  - "message": "Test error for Sentry integration"'
    echo ""
else
    echo -e "${YELLOW}⚠️  Unexpected response${NC}"
    echo ""
    echo "The endpoint might not be working correctly."
    echo "Check server logs for details."
    echo ""
fi

echo "Step 3: Checking server logs for Sentry initialization..."
echo ""
echo "Look for these lines in your server output:"
echo "  ✅ Sentry initialized"
echo "  🦊 API is running at 0.0.0.0:8000"
echo ""

echo "Step 4: Check Sentry Dashboard"
echo ""
echo "1. Go to: https://sentry.io"
echo "2. Navigate to: Issues"
echo "3. Look for: 'Test error for Sentry integration'"
echo ""

echo "════════════════════════════════════════════════════════"
echo "  Test Complete"
echo "════════════════════════════════════════════════════════"
echo ""
echo "If Sentry is working, you should see:"
echo "  ✅ Server running"
echo "  ✅ Error endpoint responded"
echo "  ✅ '✅ Sentry initialized' in server logs"
echo "  ✅ Error appears in Sentry dashboard"
echo ""

