import React from 'react';
import { Activity } from 'lucide-react';
import { RainbowButton } from '../components/ui/buttons/RainbowButton';
import { PageHeader } from '../components/ui/cards/PageHeader';
import { StatCard } from '../components/ui/cards/StatCard';
import { ContentCard } from '../components/ui/cards/ContentCard';
import { ListItem } from '../components/ui/list/ListItem';
import { DASHBOARD_STATS } from '../constants/data';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <PageHeader
        title="new task 2"
        description="Welcome back! Here's what's happening today."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {DASHBOARD_STATS.map((stat, index) => (
          <StatCard key={stat.label} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ContentCard title="Recent Activity" animateFrom="left">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <ListItem key={i} delay={i * 0.05}>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Activity {i}</p>
                    <p className="text-gray-400 text-sm">Just now</p>
                  </div>
                </div>
              </ListItem>
            ))}
          </div>
        </ContentCard>

        <ContentCard title="Quick Actions" animateFrom="right">
          <div className="space-y-3">
            <RainbowButton className="w-full">
              Create New Project
            </RainbowButton>
            <button className="btn-secondary w-full">
              View Analytics
            </button>
            <button className="btn-secondary w-full">
              Invite Team Members
            </button>
          </div>
        </ContentCard>
      </div>

      {/* Additional Content */}
      <ContentCard title="Overview">
        <p className="text-gray-400 mb-4">
          This is your main dashboard. Customize it to show the metrics and information 
          that matter most to you and your team.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4'].map((metric) => (
            <div key={metric} className="text-center p-4 rounded-lg bg-gray-800/50">
              <p className="text-gray-400 text-sm mb-1">{metric}</p>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
          ))}
        </div>
      </ContentCard>
    </div>
  );
};

export default Dashboard;
