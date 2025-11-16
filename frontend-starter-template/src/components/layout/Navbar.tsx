import React from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../ui/typography/AuroraText';
import { NAVIGATION_ITEMS, BRAND_CONFIG, AURORA_COLORS } from '../../constants/navigation';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  brandName?: string;
  brandSubtitle?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  onTabChange,
  brandName = BRAND_CONFIG.name,
  brandSubtitle = BRAND_CONFIG.subtitle
}) => {
  const menuItems = NAVIGATION_ITEMS;

  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 glass-dark border-r border-gray-700/50 h-screen flex flex-col backdrop-blur-xl"
    >
      {/* Brand Section */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">{BRAND_CONFIG.initial}</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">
              <AuroraText colors={AURORA_COLORS} speed={1.5}>
                {brandName}
              </AuroraText>
            </h1>
            <p className="text-sm text-gray-400">{brandSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 hover-lift ${
              activeTab === item.id
                ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400'
                : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Status Footer */}
      <div className="p-6 border-t border-gray-700/50">
        <div className="glass-dark border border-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">System Status</span>
          </div>
          <p className="text-xs text-gray-400">All systems operational</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;

