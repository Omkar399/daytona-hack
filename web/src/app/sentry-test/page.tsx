"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SentryTestPage() {
  const throwError = () => {
    throw new Error("Sentry Frontend Test Error - This is intentional!");
  };

  const captureMessage = async () => {
    const Sentry = await import("@sentry/nextjs");
    Sentry.captureMessage("Test message from frontend", "info");
    alert("Message sent to Sentry! Check your dashboard.");
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Sentry Frontend Test</CardTitle>
          <CardDescription>
            Test your Sentry integration for the Next.js frontend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Test 1: Throw Error</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This will throw an unhandled error that Sentry will catch.
            </p>
            <Button onClick={throwError} variant="destructive">
              Throw Test Error
            </Button>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Test 2: Capture Message</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This will send a test message to Sentry without throwing an error.
            </p>
            <Button onClick={captureMessage}>
              Send Test Message
            </Button>
          </div>

          <div className="border-t pt-4 bg-muted p-4 rounded-md">
            <h3 className="text-sm font-semibold mb-2">After Testing:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://sentry.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">sentry.io</a></li>
              <li>Navigate to <strong>Issues</strong></li>
              <li>You should see the error or message you just triggered</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

