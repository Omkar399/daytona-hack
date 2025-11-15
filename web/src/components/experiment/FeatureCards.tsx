import { RiGitBranchLine, RiCameraLine, RiShareForwardLine } from "@remixicon/react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <RiGitBranchLine className="h-8 w-8 mb-2 text-blue-600" />
          <CardTitle className="text-lg">GitHub Webhook Integration</CardTitle>
          <CardDescription>
            Automatically trigger when PRs are merged with CodeRabbit analysis
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <RiCameraLine className="h-8 w-8 mb-2 text-blue-600" />
          <CardTitle className="text-lg">Automated Browser Testing</CardTitle>
          <CardDescription>
            AI agent explores new features and captures professional screenshots
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <RiShareForwardLine className="h-8 w-8 mb-2 text-blue-600" />
          <CardTitle className="text-lg">Social Media Ready</CardTitle>
          <CardDescription>
            Generate engaging posts with screenshots ready to share
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
