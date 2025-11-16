import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Full Name', value: 'John Doe', type: 'input' },
        { label: 'Email', value: 'john@example.com', type: 'input' },
        { label: 'Bio', value: 'Software Developer', type: 'textarea' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', value: notifications, type: 'toggle' },
        { label: 'Push Notifications', value: false, type: 'toggle' },
        { label: 'Weekly Summary', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Dark Mode', value: darkMode, type: 'toggle' },
        { label: 'Theme Color', value: 'blue', type: 'select' },
        { label: 'Compact View', value: false, type: 'toggle' }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Two-Factor Auth', value: false, type: 'toggle' },
        { label: 'Change Password', value: '', type: 'button' },
        { label: 'Active Sessions', value: '2 devices', type: 'info' }
      ]
    },
    {
      title: 'Language & Region',
      icon: Globe,
      items: [
        { label: 'Language', value: 'English', type: 'select' },
        { label: 'Timezone', value: 'UTC-5', type: 'select' },
        { label: 'Date Format', value: 'MM/DD/YYYY', type: 'select' }
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">new task 6</h1>
        <p className="text-gray-400">Manage your account settings and preferences.</p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-premium rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <section.icon className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                    {item.type === 'info' && (
                      <p className="text-gray-400 text-sm mt-1">{item.value}</p>
                    )}
                  </div>
                  
                  <div>
                    {item.type === 'toggle' && (
                      <button
                        onClick={() => {
                          if (item.label === 'Email Notifications') {
                            setNotifications(!notifications);
                          }
                          if (item.label === 'Dark Mode') {
                            setDarkMode(!darkMode);
                          }
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.value ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                    
                    {item.type === 'input' && (
                      <input
                        type="text"
                        defaultValue={item.value as string}
                        className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-400 focus:outline-none"
                      />
                    )}
                    
                    {item.type === 'select' && (
                      <select className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-400 focus:outline-none">
                        <option>{item.value}</option>
                      </select>
                    )}
                    
                    {item.type === 'button' && (
                      <button className="btn-secondary px-4 py-1 text-sm">
                        Change
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex justify-end space-x-4"
      >
        <button className="btn-secondary">
          Cancel
        </button>
        <button className="btn-primary">
          Save Changes
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;

