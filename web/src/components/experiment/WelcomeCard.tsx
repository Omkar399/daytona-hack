"use client";

import { RiFlaskLine, RiGithubFill, RiRobot2Line, RiCameraLine, RiShareForwardLine } from "@remixicon/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/ui/advanced/AuroraText";
import { RainbowButton } from "@/components/ui/advanced/RainbowButton";

interface WelcomeCardProps {
  onNewExperiment: () => void;
}

export function WelcomeCard({ onNewExperiment }: WelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-2 hover-lift glass-card border-neutral-200 dark:border-neutral-700/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiFlaskLine className="h-6 w-6" />
            <AuroraText>Automated DevRel Flow</AuroraText>
          </CardTitle>
        <CardDescription className="text-base">
          Transform feature launches into engaging social media content with automated browser testing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: RiGithubFill, title: "Merge PR", desc: "GitHub webhook triggers flow", delay: 0.1 },
            { icon: RiRobot2Line, title: "AI Tests Features", desc: "Browser agent explores app", delay: 0.2 },
            { icon: RiCameraLine, title: "Captures Screenshots", desc: "Of new features in action", delay: 0.3 },
            { icon: RiShareForwardLine, title: "Generates Post", desc: "Ready to share on social", delay: 0.4 }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: item.delay }}
              className="flex gap-3 glass p-3 rounded-lg hover-lift"
            >
              <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</p>
                <p className="text-neutral-600 dark:text-neutral-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2">
          <RainbowButton onClick={onNewExperiment} className="w-full">
            <RiFlaskLine className="h-5 w-5" />
            Create New DevRel Flow
          </RainbowButton>
        </div>

        {/* Quick link */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          Or set up a GitHub webhook to trigger automatically on PR merges →
        </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
