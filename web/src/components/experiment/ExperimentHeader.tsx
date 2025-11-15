import { FlaskIcon } from "@/components/icons";

export function ExperimentHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <FlaskIcon size={32} className="text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Experiment Dashboard</h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Self-improving A/B testing system powered by AI
      </p>
    </div>
  );
}
