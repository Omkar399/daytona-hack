import { 
  Home,
  LayoutDashboard,
  FileText,
  User,
  HelpCircle,
  Settings
} from 'lucide-react';
import type { NavMenuItem } from '../types';

/**
 * Navigation menu items configuration
 */
export const NAVIGATION_ITEMS: NavMenuItem[] = [
  { id: 'task1', icon: Home, label: 'new task 1' },
  { id: 'task2', icon: LayoutDashboard, label: 'new task 2' },
  { id: 'task3', icon: FileText, label: 'new task 3' },
  { id: 'task4', icon: User, label: 'new task 4' },
  { id: 'task5', icon: HelpCircle, label: 'new task 5' },
  { id: 'task6', icon: Settings, label: 'new task 6' }
];

/**
 * Brand configuration
 */
export const BRAND_CONFIG = {
  name: 'no name',
  subtitle: 'project',
  initial: 'N'
} as const;

/**
 * Aurora text color scheme
 */
export const AURORA_COLORS = ['#ffffff', '#60a5fa', '#3b82f6', '#1d4ed8'];

