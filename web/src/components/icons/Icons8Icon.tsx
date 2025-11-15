'use client';

import * as React from 'react';

interface Icons8IconProps {
  iconId: string;
  size?: number | string;
  className?: string;
  style?: 'ios7' | 'ios11' | 'ios_filled' | 'color' | 'fluent';
}

/**
 * Icons8 Icon Component
 * Uses Icons8 CDN to display icons in SVG format for better React integration
 */
export const Icons8Icon: React.FC<Icons8IconProps> = ({
  iconId,
  size = 24,
  className = '',
  style = 'ios7',
}: Icons8IconProps) => {
  // Icons8 CDN URL format - correct format using query parameters
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  const iconUrl = `https://img.icons8.com/?id=${iconId}&format=png&size=${sizeNum}`;
  
  const [imgError, setImgError] = React.useState(false);
  
  // Fallback URL if primary fails
  const fallbackUrl = `https://img.icons8.com/${style}/${sizeNum}/${iconId}.png`;
  
  return (
    <img
      src={imgError ? fallbackUrl : iconUrl}
      alt=""
      className={className}
      width={sizeNum}
      height={sizeNum}
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle',
        objectFit: 'contain'
      }}
      loading="lazy"
      onError={() => {
        if (!imgError) {
          setImgError(true);
        }
      }}
    />
  );
};

// Icon ID mappings for common icons
export const Icons8IconIds = {
  // Flask/Experiment
  flask: '19706', // Experiment (ios7)
  
  // Git/Branch
  gitBranch: '33277', // Merge Git (ios7)
  gitRepository: '12598', // GitHub (ios7)
  
  // Target/Goal
  target: '20884', // Goal (ios7)
  
  // Chart/Analytics
  chart: '90', // Line Chart (ios7)
  
  // Clock/Time
  clock: '423', // Clock (ios7)
  
  // Loading/Spinner
  spinner: 'SYOcualEVLca', // Spinner (ios7, animated)
  
  // Checkmark
  checkmark: '11695', // Checkmark (ios7)
  
  // Lightbulb/Idea
  lightbulb: '75', // Idea (ios7)
  
  // Terminal/Console
  terminal: '419', // Console (ios7)
  
  // Robot/Agent
  robot: '37410', // Bot (ios7)
  
  // External Link
  externalLink: '742', // External Link (ios7)
  
  // Arrows
  arrowRight: '355', // Right (ios7)
  arrowLeft: '357', // Left (ios7)
  
  // Chevrons
  chevronDown: '40026', // Chevron Down (ios7)
  chevronUp: '40023', // Chevron Up (ios7)
  
  // Error/Warning
  error: '360', // Error (ios7)
  
  // Pull Request
  pullRequest: '33282', // Pull Request (ios7)
  
  // Checkbox Circle
  checkboxCircle: '3061', // Done/Checkmark (ios7)
} as const;

