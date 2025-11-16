#!/bin/bash

# Script to push branch and create Pull Request
# Repository: daytona-hack
# Branch: nihals-branch -> main

echo "================================================"
echo "Creating Pull Request for nihals-branch"
echo "================================================"
echo ""

# Step 1: Push the branch
echo "Step 1: Pushing nihals-branch to remote..."
git push -u origin nihals-branch

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Push failed. Please check your GitHub credentials."
    echo ""
    echo "To fix authentication issues:"
    echo "1. Generate a Personal Access Token at: https://github.com/settings/tokens"
    echo "2. When prompted for password, use the token instead"
    echo ""
    exit 1
fi

echo ""
echo "✅ Branch pushed successfully!"
echo ""

# Step 2: Create Pull Request URL
REPO_URL="https://github.com/Omkar399/daytona-hack"
PR_URL="${REPO_URL}/compare/main...nihals-branch?expand=1"

echo "================================================"
echo "Pull Request Creation"
echo "================================================"
echo ""
echo "Your branch has been pushed! Now create the PR:"
echo ""
echo "🔗 Click this link to create your Pull Request:"
echo "$PR_URL"
echo ""
echo "Or manually:"
echo "1. Go to: $REPO_URL"
echo "2. Click 'Pull requests' tab"
echo "3. Click 'New pull request'"
echo "4. Select: base: main <- compare: nihals-branch"
echo "5. Click 'Create pull request'"
echo ""
echo "📄 Use PR_DESCRIPTION.md for the PR description"
echo ""
echo "================================================"
echo "✅ Done!"
echo "================================================"

