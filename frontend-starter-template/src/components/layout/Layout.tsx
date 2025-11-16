import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import GridBeamsBackground from '../ui/backgrounds/GridBeamsBackground';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  brandName?: string;
  brandSubtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange,
  brandName,
  brandSubtitle
}) => {
  return (
    <div className="flex flex-col h-screen relative dark">
      <GridBeamsBackground />
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Navbar 
          activeTab={activeTab} 
          onTabChange={onTabChange}
          brandName={brandName}
          brandSubtitle={brandSubtitle}
        />
        
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;

