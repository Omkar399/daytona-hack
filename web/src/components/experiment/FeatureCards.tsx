import { GitBranchIcon, TargetIcon, LineChartIcon } from "@/components/icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <GitBranchIcon size={32} className="mb-2 text-primary" />
          <CardTitle className="text-lg">Repository Integration</CardTitle>
          <CardDescription>
            Connect your GitHub repository and let AI generate optimized variants
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <TargetIcon size={32} className="mb-2 text-primary" />
          <CardTitle className="text-lg">Goal-Driven Testing</CardTitle>
          <CardDescription>
            Define your objectives and let AI optimize for your specific goals
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <LineChartIcon size={32} className="mb-2 text-primary" />
          <CardTitle className="text-lg">Automated Optimization</CardTitle>
          <CardDescription>
            Browser agents test variants and merge winning changes automatically
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
