import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { PageHeader } from '../components/ui/cards/PageHeader';
import { StatCard } from '../components/ui/cards/StatCard';
import { SearchBar } from '../components/ui/cards/SearchBar';
import { ContentCard } from '../components/ui/cards/ContentCard';
import { DOCUMENT_STATS, SAMPLE_DOCUMENTS } from '../constants/data';

const Task3: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="p-8">
      <PageHeader
        title="new task 3"
        description="Manage and organize your documents"
      />

      {/* Search Bar */}
      <SearchBar 
        placeholder="Search documents..." 
        onSearch={handleSearch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {DOCUMENT_STATS.map((stat, index) => (
          <StatCard 
            key={stat.label} 
            {...stat} 
            delay={index * 0.1}
            showChange={false}
          />
        ))}
      </div>

      {/* Documents List */}
      <ContentCard title="Recent Documents">
        <div className="space-y-3">
          {SAMPLE_DOCUMENTS.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{doc.name}</p>
                  <p className="text-gray-400 text-sm">{doc.size} • {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                  {doc.type}
                </span>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Download className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </ContentCard>
    </div>
  );
};

export default Task3;
