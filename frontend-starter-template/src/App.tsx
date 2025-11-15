import React, { useState, useMemo } from 'react';
import Layout from './components/layout/Layout';
import Task1 from './pages/Task1';
import Dashboard from './pages/Dashboard';
import Task3 from './pages/Task3';
import Task4 from './pages/Task4';
import Task5 from './pages/Task5';
import Settings from './pages/Settings';
import { BRAND_CONFIG } from './constants/navigation';

function App() {
  const [activeTab, setActiveTab] = useState('task1');

  // Memoize page rendering for better performance
  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'task1':
        return <Task1 />;
      case 'task2':
        return <Dashboard />;
      case 'task3':
        return <Task3 />;
      case 'task4':
        return <Task4 />;
      case 'task5':
        return <Task5 />;
      case 'task6':
        return <Settings />;
      default:
        return <Task1 />;
    }
  }, [activeTab]);

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      brandName={BRAND_CONFIG.name}
      brandSubtitle={BRAND_CONFIG.subtitle}
    >
      {renderContent}
    </Layout>
  );
}

export default App;

