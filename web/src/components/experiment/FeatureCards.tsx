"use client";

import { RiGitBranchLine, RiCameraLine, RiShareForwardLine } from "@remixicon/react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function FeatureCards() {
  const features = [
    {
      icon: RiGitBranchLine,
      title: "GitHub Webhook Integration",
      description: "Automatically trigger when PRs are merged with CodeRabbit analysis",
      delay: 0
    },
    {
      icon: RiCameraLine,
      title: "Automated Browser Testing",
      description: "AI agent explores new features and captures professional screenshots",
      delay: 0.1
    },
    {
      icon: RiShareForwardLine,
      title: "Social Media Ready",
      description: "Generate engaging posts with screenshots ready to share",
      delay: 0.2
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: feature.delay }}
        >
          <Card className="hover-lift glass-card border-neutral-200 dark:border-neutral-700/50 h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-3">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
