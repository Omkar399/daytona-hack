import { 
  RiFlaskLine, 
  RiGitBranchLine, 
  RiTargetLine,
  RiFileListLine,
  RiServerLine,
  RiRobot2Line,
  RiCameraLine,
  RiShareForwardLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RainbowButton } from "@/components/ui/advanced/RainbowButton";

interface ExperimentFormData {
  repoUrl: string;
  goal: string;
}

interface ExperimentFormProps {
  formData: ExperimentFormData;
  onFormDataChange: (data: ExperimentFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ExperimentForm({ formData, onFormDataChange, onSubmit, onCancel, isSubmitting = false }: ExperimentFormProps) {
  return (
    <Card className="max-w-2xl mx-auto border-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <RiFlaskLine className="h-6 w-6" />
          New DevRel Flow
        </CardTitle>
        <CardDescription className="text-base">
          Automatically test and showcase new features with automated browser testing and social media posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Git Repository URL */}
          <div className="space-y-2">
            <Label htmlFor="repoUrl" className="text-base font-semibold flex items-center gap-2">
              <RiGitBranchLine className="h-4 w-4" />
              Git Repository URL
            </Label>
            <Input
              id="repoUrl"
              type="url"
              placeholder="https://github.com/username/repository"
              value={formData.repoUrl}
              onChange={(e) => onFormDataChange({ ...formData, repoUrl: e.target.value })}
              required
              className="h-11"
            />
            <p className="text-sm text-muted-foreground">
              Your application repository. Triggered automatically by GitHub webhooks when PRs are merged.
            </p>
          </div>

          {/* Task / Prompt */}
          <div className="space-y-2">
            <Label htmlFor="goal" className="text-base font-semibold flex items-center gap-2">
              <RiTargetLine className="h-4 w-4" />
              Description / Goal
            </Label>
            <Textarea
              id="goal"
              placeholder="Describe your app or what you want to highlight... e.g., E-commerce platform with new color theme, Product showcase application"
              value={formData.goal}
              onChange={(e) => onFormDataChange({ ...formData, goal: e.target.value })}
              required
              className="min-h-[200px] resize-y"
            />
            <p className="text-sm text-muted-foreground">
              This helps the browser agent understand what to test and showcase
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100 font-semibold mb-3">
              How it works:
            </p>
            <p className="text-sm text-blue-900 dark:text-blue-200 mb-2">
              When you merge a PR with CodeRabbit analysis, our DevRel agent will:
            </p>
            <div className="space-y-2 mt-3">
              <div className="flex items-start gap-2">
                <RiFileListLine className="h-4 w-4 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-900 dark:text-blue-200">Extract new features from the PR analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <RiServerLine className="h-4 w-4 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-900 dark:text-blue-200">Spawn a sandbox environment for your app</span>
              </div>
              <div className="flex items-start gap-2">
                <RiRobot2Line className="h-4 w-4 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-900 dark:text-blue-200">Use an AI browser agent to test the new features</span>
              </div>
              <div className="flex items-start gap-2">
                <RiCameraLine className="h-4 w-4 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-900 dark:text-blue-200">Capture screenshots of the features in action</span>
              </div>
              <div className="flex items-start gap-2">
                <RiShareForwardLine className="h-4 w-4 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-900 dark:text-blue-200">Generate an engaging social media post ready to share</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <RainbowButton type="submit" className="flex-1" disabled={isSubmitting}>
              <RiFlaskLine className="h-5 w-5" />
              {isSubmitting ? "Starting..." : "Create DevRel Flow"}
            </RainbowButton>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
