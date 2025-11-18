"use client";

import React from "react";
import { GridBeams } from "./GridBeams";
import { useTheme } from "@/hooks/useTheme";

export function GridBeamsBackground() {
  const { resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === 'dark';
  
  return (
    <GridBeams
      gridSize={0}
      gridColor={isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}
      rayCount={20}
      rayOpacity={isDark ? 0.55 : 0.35}
      raySpeed={1.5}
      rayLength="40vh"
      gridFadeStart={5}
      gridFadeEnd={90}
      backgroundColor={isDark ? "#0a0a0a" : "#f9fafb"}
      className="fixed inset-0 -z-10 w-full h-full"
    >
      <></>
    </GridBeams>
  );
}

