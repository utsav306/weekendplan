'use client';

import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  emoji?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onTabChange, className = "" }: TabsProps) {
  return (
    <div className={`flex justify-center mb-8 ${className}`}>
      <div className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg border border-amber-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-amber-900'
                  : 'text-amber-700 hover:text-amber-800'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-amber-100 rounded-full"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.emoji && <span>{tab.emoji}</span>}
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}