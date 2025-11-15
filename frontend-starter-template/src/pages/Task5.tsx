import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Book } from 'lucide-react';
import { PageHeader } from '../components/ui/cards/PageHeader';
import { FeatureCard } from '../components/ui/cards/FeatureCard';
import { ContentCard } from '../components/ui/cards/ContentCard';
import { SearchBar } from '../components/ui/cards/SearchBar';
import { HELP_CATEGORIES, POPULAR_ARTICLES, SUPPORT_CONTACTS } from '../constants/data';

const Task5: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="p-8">
      <PageHeader
        title="new task 5"
        description="Find answers and get help"
      />

      {/* Search Bar with custom header */}
      <ContentCard className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">How can we help you?</h2>
          <p className="text-gray-400">Search our knowledge base for answers</p>
        </div>
        <div className="flex items-center space-x-4 bg-gray-800/50 rounded-lg p-4">
          <HelpCircle className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Type your question here..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <button className="btn-primary text-sm px-6 py-2">
            Search
          </button>
        </div>
      </ContentCard>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {HELP_CATEGORIES.map((category, index) => (
          <FeatureCard 
            key={category.title} 
            title={category.title}
            description={`${category.articles} articles`}
            {...category} 
            delay={index * 0.1}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Articles */}
        <ContentCard title="Popular Articles" animateFrom="left">
          <div className="space-y-3">
            {POPULAR_ARTICLES.map((article, index) => (
              <motion.div
                key={article}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <Book className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{article}</span>
              </motion.div>
            ))}
          </div>
        </ContentCard>

        {/* Contact Support */}
        <ContentCard title="Contact Support" animateFrom="right">
          <p className="text-gray-400 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          
          <div className="space-y-4">
            {SUPPORT_CONTACTS.map((contact, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-800/50">
                <div className="flex items-center space-x-3 mb-2">
                  <contact.icon className={`h-5 w-5 ${contact.color}`} />
                  <span className="text-white font-medium">{contact.title}</span>
                </div>
                <p className="text-gray-400 text-sm">{contact.value}</p>
                {contact.info && (
                  <p className="text-gray-500 text-xs mt-2">{contact.info}</p>
                )}
                {contact.title === 'Live Chat' && (
                  <button className="btn-primary w-full mt-3">
                    Start Chat
                  </button>
                )}
              </div>
            ))}
          </div>
        </ContentCard>
      </div>
    </div>
  );
};

export default Task5;
