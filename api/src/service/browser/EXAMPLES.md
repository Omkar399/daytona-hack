# Browser Service - Task Examples

Examples of browser tasks that benefit from automatic guidelines.

## E-Commerce Testing

```typescript
// Events app - registration flow
const task = await BrowserService.createTask(
  `Test event registration:
   1. View the events list
   2. Click "Register Now" on 3 different events
   3. Navigate to "My Events"
   4. Verify all 3 events appear
   5. Test the "Clear All" button`,
  publicUrl
);

// With guidelines, the agent will:
// ✅ Wait between each registration
// ✅ Handle page re-renders gracefully
// ✅ Take screenshots of results
```

## Form Submission

```typescript
const task = await BrowserService.createTask(
  `Fill out and submit the contact form:
   1. Enter name, email, and message
   2. Check the "Subscribe to newsletter" box
   3. Click submit
   4. Verify success message appears`,
  "https://example.com/contact"
);

// Guidelines help with:
// ✅ Waiting for form validation
// ✅ Ensuring submit completes before checking result
```

## Dashboard Navigation

```typescript
const task = await BrowserService.createTask(
  `Navigate through the admin dashboard:
   1. Click on "Analytics" in sidebar
   2. Wait for charts to load
   3. Export the monthly report
   4. Download the CSV file`,
  dashboardUrl
);

// Guidelines ensure:
// ✅ Charts fully render before export
// ✅ Download completes before continuing
```

## Authentication Flow

```typescript
const task = await BrowserService.createTask(
  `Test login with OAuth:
   1. Click "Login with Google"
   2. Complete OAuth flow in popup
   3. Return to main app
   4. Verify user is logged in
   5. Navigate to profile page`,
  appUrl
);

// Guidelines handle:
// ✅ Popup window timing
// ✅ Redirect delays
// ✅ Session initialization
```

## Shopping Cart (Your Use Case)

```typescript
const task = await BrowserService.createTask(
  `Test shopping cart functionality:
   1. Browse product catalog
   2. Add 5 items to cart
   3. Open cart drawer
   4. Remove 2 items
   5. Update quantity on 1 item
   6. Proceed to checkout
   7. Verify cart total is correct`,
  storeUrl
);

// The stale element problem is now handled:
// ✅ Waits after each add/remove
// ✅ Refreshes element indices on failures
// ✅ Completes full flow successfully
```

## SPA Navigation

```typescript
const task = await BrowserService.createTask(
  `Test single-page app routing:
   1. Navigate to /products
   2. Click on first product
   3. Go back to products list
   4. Use search to find "laptop"
   5. Filter by price range
   6. Sort by rating`,
  spaUrl
);

// Guidelines help with:
// ✅ Client-side routing delays
// ✅ Component re-mounting
// ✅ State updates between routes
```

## API Integration Testing

```typescript
const task = await BrowserService.createTask(
  `Test real-time data updates:
   1. Open the live dashboard
   2. Observe initial data state
   3. Trigger data refresh
   4. Wait for new data to appear
   5. Verify timestamps updated
   6. Check charts re-rendered`,
  dashboardUrl
);

// Guidelines ensure:
// ✅ API calls complete before verification
// ✅ Real-time updates are detected
```

## Multi-Step Workflow

```typescript
const task = await BrowserService.createTask(
  `Complete new user onboarding:
   1. Register new account
   2. Verify email (check inbox)
   3. Complete profile setup
   4. Take product tour (4 steps)
   5. Create first project
   6. Invite team member`,
  onboardingUrl
);

// Guidelines handle:
// ✅ Multi-step form progression
// ✅ External email verification wait
// ✅ Modal/dialog transitions
```

## File Upload

```typescript
const task = await BrowserService.createTask(
  `Test document upload feature:
   1. Click "Upload Document"
   2. Select file from dialog
   3. Wait for upload progress
   4. Verify file appears in list
   5. Download the uploaded file
   6. Verify it opens correctly`,
  fileManagerUrl
);

// Guidelines help with:
// ✅ Upload completion timing
// ✅ Progress bar animations
// ✅ File system interactions
```

## Disabled Guidelines Example

```typescript
// For highly controlled scenarios where you want exact timing
const preciseTask = await BrowserService.createTask(
  `Performance test with exact timing:
   1. Start timer
   2. Click button (measure response)
   3. Record exact load time
   4. No waits - measure raw performance`,
  testUrl,
  { includeGuidelines: false }  // Disable auto-waits
);
```

---

## Key Takeaway

Write your tasks **naturally** - the guidelines handle the technical challenges:

```typescript
// ❌ Don't do this (too verbose):
const task = `
1. Click button
2. Wait 3 seconds
3. Check if page updated
4. If error, wait 5 seconds and retry
5. Get fresh page state
...
`;

// ✅ Do this (clean and simple):
const task = `
1. Click button
2. Check if page updated
`;
// Guidelines handle waits, errors, and retries automatically!
```

