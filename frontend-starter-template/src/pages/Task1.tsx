import React from 'react';
import { motion } from 'framer-motion';
import { RainbowButton } from '../components/ui/buttons/RainbowButton';
import { PageHeader } from '../components/ui/cards/PageHeader';
import { FeatureCard } from '../components/ui/cards/FeatureCard';
import { ContentCard } from '../components/ui/cards/ContentCard';
import { TASK1_FEATURES, INCLUDED_FEATURES, QUICK_STATS } from '../constants/data';

const Task1: React.FC = () => {
  return (
    <div className="p-8">
      <PageHeader
        title="new task 1"
        description="Welcome to the first task. This is a modern React application with beautiful UI components."
      >
        <div className="flex space-x-4">
          <RainbowButton>Get Started</RainbowButton>
          <button className="btn-secondary">Learn More</button>
        </div>
      </PageHeader>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {TASK1_FEATURES.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentCard title="What's Included" animateFrom="left">
          <ul className="space-y-3">
            {INCLUDED_FEATURES.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </ContentCard>

        <ContentCard title="Quick Stats" animateFrom="right">
          <div className="grid grid-cols-2 gap-4">
            {QUICK_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-4 rounded-lg bg-gray-800/50"
              >
                <p className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ContentCard>
      </div>
    </div>
  );
};

export default Task1;
