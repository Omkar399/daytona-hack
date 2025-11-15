import {
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  FileText,
  Folder,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Book,
  HelpCircle,
  Video,
  MessageSquare,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react';
import type { StatCard, Document, Feature, HelpCategory, ProfileData } from '../types';

/**
 * Dashboard statistics data
 */
export const DASHBOARD_STATS: StatCard[] = [
  { 
    label: 'Total Users', 
    value: '1,234', 
    change: '+12.5%', 
    icon: Users,
    color: 'text-blue-400'
  },
  { 
    label: 'Activity', 
    value: '89.2%', 
    change: '+5.2%', 
    icon: Activity,
    color: 'text-green-400'
  },
  { 
    label: 'Revenue', 
    value: '$45.2K', 
    change: '+18.3%', 
    icon: DollarSign,
    color: 'text-yellow-400'
  },
  { 
    label: 'Growth', 
    value: '23.4%', 
    change: '+8.1%', 
    icon: TrendingUp,
    color: 'text-purple-400'
  }
];

/**
 * Documents statistics
 */
export const DOCUMENT_STATS: StatCard[] = [
  { label: 'Total Documents', value: '248', icon: FileText, color: 'text-blue-400' },
  { label: 'Folders', value: '32', icon: Folder, color: 'text-green-400' },
  { label: 'Storage Used', value: '12.4 GB', icon: Download, color: 'text-purple-400' },
  { label: 'Shared', value: '64', icon: FileText, color: 'text-yellow-400' }
];

/**
 * Sample documents data
 */
export const SAMPLE_DOCUMENTS: Document[] = [
  { name: 'Project Report.pdf', size: '2.4 MB', date: '2024-10-10', type: 'PDF' },
  { name: 'Design Specs.docx', size: '856 KB', date: '2024-10-09', type: 'DOC' },
  { name: 'Data Analysis.xlsx', size: '1.2 MB', date: '2024-10-08', type: 'XLS' },
  { name: 'Meeting Notes.txt', size: '24 KB', date: '2024-10-07', type: 'TXT' },
  { name: 'Presentation.pptx', size: '5.6 MB', date: '2024-10-06', type: 'PPT' },
  { name: 'Code Review.md', size: '18 KB', date: '2024-10-05', type: 'MD' }
];

/**
 * User profile data
 */
export const PROFILE_DATA: ProfileData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joined: 'January 2024',
  role: 'Software Engineer'
};

/**
 * Profile statistics
 */
export const PROFILE_STATS: StatCard[] = [
  { label: 'Projects', value: '24', color: 'text-blue-400', icon: FileText },
  { label: 'Tasks', value: '156', color: 'text-green-400', icon: Activity },
  { label: 'Completed', value: '89%', color: 'text-purple-400', icon: TrendingUp },
  { label: 'Rating', value: '4.8', color: 'text-yellow-400', icon: Users }
];

/**
 * Recent activities
 */
export const RECENT_ACTIVITIES = [
  { action: 'Completed project milestone', time: '2 hours ago' },
  { action: 'Updated profile information', time: '5 hours ago' },
  { action: 'Joined new team', time: '1 day ago' },
  { action: 'Created new document', time: '2 days ago' },
  { action: 'Attended meeting', time: '3 days ago' }
];

/**
 * Help center categories
 */
export const HELP_CATEGORIES: HelpCategory[] = [
  {
    title: 'Getting Started',
    icon: Book,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    articles: 12
  },
  {
    title: 'FAQ',
    icon: HelpCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    articles: 28
  },
  {
    title: 'Video Tutorials',
    icon: Video,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    articles: 15
  },
  {
    title: 'Community',
    icon: MessageSquare,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    articles: 45
  }
];

/**
 * Popular articles
 */
export const POPULAR_ARTICLES = [
  'How to get started with the platform',
  'Understanding your dashboard',
  'Managing your account settings',
  'Collaborating with team members',
  'Best practices for productivity',
  'Troubleshooting common issues'
];

/**
 * Support contact information
 */
export const SUPPORT_CONTACTS = [
  {
    icon: Mail,
    color: 'text-blue-400',
    title: 'Email Support',
    value: 'support@example.com',
    info: 'Response within 24 hours'
  },
  {
    icon: Phone,
    color: 'text-green-400',
    title: 'Phone Support',
    value: '+1 (555) 123-4567',
    info: 'Mon-Fri, 9am-5pm EST'
  },
  {
    icon: MessageSquare,
    color: 'text-purple-400',
    title: 'Live Chat',
    value: 'Chat with our team',
    info: null
  }
];

/**
 * Task 1 features
 */
export const TASK1_FEATURES: Feature[] = [
  {
    title: 'Modern Design',
    description: 'Beautiful and responsive UI components built with React and Tailwind CSS.',
    icon: Sparkles,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  },
  {
    title: 'Fast Performance',
    description: 'Optimized for speed and efficiency with modern build tools.',
    icon: Zap,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20'
  },
  {
    title: 'Secure',
    description: 'Built with security best practices and regular updates.',
    icon: Shield,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20'
  }
];

/**
 * Task 1 included features list
 */
export const INCLUDED_FEATURES = [
  'Pre-built React components',
  'TypeScript support',
  'Tailwind CSS styling',
  'Framer Motion animations',
  'Modern UI design patterns',
  'Responsive layouts'
];

/**
 * Task 1 quick stats
 */
export const QUICK_STATS = [
  { label: 'Components', value: '25+' },
  { label: 'Pages', value: '6' },
  { label: 'Updates', value: 'Weekly' },
  { label: 'Support', value: '24/7' }
];

