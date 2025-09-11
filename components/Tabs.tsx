"use client";

import { motion } from "framer-motion";

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

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: TabsProps) {
  return (
    <div className={`flex justify-center mb-8 ${className}`}>
      <div className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg border border-amber-200 relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-orange-100/50 to-amber-100/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />

        <div className="flex relative z-10">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-amber-900 shadow-md"
                  : "text-amber-700 hover:text-amber-800 hover:bg-white/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full shadow-lg"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  animate={
                    activeTab === tab.id ? { rotate: [0, 10, -10, 0] } : {}
                  }
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  {tab.emoji}
                </motion.span>
                {tab.label}
              </span>

              {/* Active indicator sparkle */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute -top-1 -right-1 text-yellow-400"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <span className="text-sm">✨</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
