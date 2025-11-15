/**
 * Common type definitions for the application
 */

export interface NavMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StatCard {
  label: string;
  value: string;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface Document {
  name: string;
  size: string;
  date: string;
  type: string;
}

export interface Activity {
  action: string;
  time: string;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
  role: string;
}

export interface SettingsItem {
  label: string;
  value: string | boolean;
  type: 'input' | 'toggle' | 'select' | 'button' | 'info';
}

export interface SettingsSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SettingsItem[];
}

export interface HelpCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  articles: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

