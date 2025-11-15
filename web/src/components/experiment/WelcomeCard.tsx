import { RiFlaskLine, RiGithubFill, RiRobot2Line, RiCameraLine, RiShareForwardLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface WelcomeCardProps {
  onNewExperiment: () => void;
}

export function WelcomeCard({ onNewExperiment }: WelcomeCardProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <RiFlaskLine className="h-6 w-6" />
          Automated DevRel Flow
        </CardTitle>
        <CardDescription className="text-base">
          Transform feature launches into engaging social media content with automated browser testing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex gap-3 bg-neutral-50 p-3 rounded-lg">
            <RiGithubFill className="h-5 w-5 text-neutral-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-neutral-900">Merge PR</p>
              <p className="text-neutral-600">GitHub webhook triggers flow</p>
            </div>
          </div>
          <div className="flex gap-3 bg-neutral-50 p-3 rounded-lg">
            <RiRobot2Line className="h-5 w-5 text-neutral-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-neutral-900">AI Tests Features</p>
              <p className="text-neutral-600">Browser agent explores app</p>
            </div>
          </div>
          <div className="flex gap-3 bg-neutral-50 p-3 rounded-lg">
            <RiCameraLine className="h-5 w-5 text-neutral-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-neutral-900">Captures Screenshots</p>
              <p className="text-neutral-600">Of new features in action</p>
            </div>
          </div>
          <div className="flex gap-3 bg-neutral-50 p-3 rounded-lg">
            <RiShareForwardLine className="h-5 w-5 text-neutral-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-neutral-900">Generates Post</p>
              <p className="text-neutral-600">Ready to share on social</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button onClick={onNewExperiment} size="lg" className="w-full gap-2">
            <RiFlaskLine className="h-5 w-5" />
            Create New DevRel Flow
          </Button>
        </div>

        {/* Quick link */}
        <p className="text-xs text-neutral-500 text-center">
          Or set up a GitHub webhook to trigger automatically on PR merges →
        </p>
      </CardContent>
    </Card>
  );
}
