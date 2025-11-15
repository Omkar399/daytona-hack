'use client';

import * as React from 'react';
import { Icons8Icon } from './Icons8Icon';

// Individual icon components matching the RemixIcon API
interface IconProps {
  size?: number;
  className?: string;
}

export const FlaskIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="19706" size={size} className={className} style="ios7" />
);

export const GitBranchIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="33277" size={size} className={className} style="ios7" />
);

export const TargetIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="20884" size={size} className={className} style="ios7" />
);

export const LineChartIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="90" size={size} className={className} style="ios7" />
);

export const TimeIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="423" size={size} className={className} style="ios7" />
);

export const LoaderIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="SYOcualEVLca" size={size} className={className} style="ios7" />
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="11695" size={size} className={className} style="ios7" />
);

export const LightbulbIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="75" size={size} className={className} style="ios7" />
);

export const TerminalIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="419" size={size} className={className} style="ios7" />
);

export const RobotIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="37410" size={size} className={className} style="ios7" />
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="742" size={size} className={className} style="ios7" />
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="355" size={size} className={className} style="ios7" />
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="357" size={size} className={className} style="ios7" />
);

export const GitRepositoryIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="12598" size={size} className={className} style="ios7" />
);

export const GitPullRequestIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="33282" size={size} className={className} style="ios7" />
);

export const CheckboxCircleIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="3061" size={size} className={className} style="ios7" />
);

export const ErrorWarningIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="360" size={size} className={className} style="ios7" />
);

// Lucide-compatible icons
export const ChevronDownIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="40026" size={size} className={className} style="ios7" />
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <Icons8Icon iconId="40023" size={size} className={className} style="ios7" />
);

