import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { RainbowButton } from '../components/ui/buttons/RainbowButton';
import { PageHeader } from '../components/ui/cards/PageHeader';
import { StatCard } from '../components/ui/cards/StatCard';
import { ContentCard } from '../components/ui/cards/ContentCard';
import { ListItem } from '../components/ui/list/ListItem';
import { PROFILE_DATA, PROFILE_STATS, RECENT_ACTIVITIES } from '../constants/data';

const Task4: React.FC = () => {
  return (
    <div className="p-8">
      <PageHeader
        title="new task 4"
        description="Manage your profile and personal information"
      />

      {/* Profile Card */}
      <ContentCard className="mb-8">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">{PROFILE_DATA.name}</h2>
            <p className="text-gray-400 mb-4">{PROFILE_DATA.role}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{PROFILE_DATA.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{PROFILE_DATA.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">{PROFILE_DATA.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">Joined {PROFILE_DATA.joined}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <RainbowButton>Edit Profile</RainbowButton>
              <button className="btn-secondary">
                View Public Profile
              </button>
            </div>
          </div>
        </div>
      </ContentCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {PROFILE_STATS.map((stat, index) => (
          <StatCard 
            key={stat.label} 
            {...stat} 
            delay={index * 0.1}
            showChange={false}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <ContentCard title="Recent Activity">
        <div className="space-y-4">
          {RECENT_ACTIVITIES.map((activity, index) => (
            <ListItem key={index} delay={index * 0.05}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <p className="text-white">{activity.action}</p>
                </div>
                <p className="text-gray-400 text-sm">{activity.time}</p>
              </div>
            </ListItem>
          ))}
        </div>
      </ContentCard>
    </div>
  );
};

export default Task4;
