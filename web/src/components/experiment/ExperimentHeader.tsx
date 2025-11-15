import { RiFlaskLine, RiRobot2Line } from "@remixicon/react";
import { AuroraText } from "@/components/ui/advanced/AuroraText";

export function ExperimentHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-2">
          <RiFlaskLine className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <RiRobot2Line className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          <AuroraText>DevRel Automation</AuroraText>
        </h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Automated feature testing and social media content generation with AI browser agents
      </p>
    </div>
  );
}
