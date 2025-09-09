'use client';

import { motion } from 'framer-motion';
import { WeekendPlan } from '@/lib/types';

interface ProgressBarProps {
  plan: WeekendPlan;
  className?: string;
}

export default function ProgressBar({ plan, className = "" }: ProgressBarProps) {
  const totalActivities = plan.saturday.length + plan.sunday.length;
  const completedActivities = plan.saturday.filter(a => a.completed).length + plan.sunday.filter(a => a.completed).length;
  const progressPercentage = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;

  const milestones = [
    { percentage: 25, icon: '🎯', label: 'Getting Started' },
    { percentage: 50, icon: '🚀', label: 'Halfway There' },
    { percentage: 75, icon: '⭐', label: 'Almost Done' },
    { percentage: 100, icon: '🏆', label: 'Weekend Complete!' }
  ];

  return (
    <motion.div 
      className={`bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-amber-900">Weekend Progress</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🧑‍🦱</span>
          <span className="text-sm text-amber-700">{completedActivities}/{totalActivities} completed</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        {/* Background track */}
        <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Milestones */}
        <div className="flex justify-between mt-2">
          {milestones.map((milestone, index) => {
            const isReached = progressPercentage >= milestone.percentage;
            return (
              <motion.div
                key={milestone.percentage}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    isReached 
                      ? 'bg-amber-400 text-white shadow-lg' 
                      : 'bg-amber-100 text-amber-600'
                  }`}
                  animate={isReached ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {milestone.icon}
                </motion.div>
                <span className={`text-xs mt-1 text-center ${
                  isReached ? 'text-amber-900 font-semibold' : 'text-amber-600'
                }`}>
                  {milestone.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Traveler Avatar Position */}
      <div className="relative mt-4">
        <div className="w-full h-1 bg-amber-200 rounded-full relative">
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            initial={{ left: '0%' }}
            animate={{ left: `${Math.min(progressPercentage, 100)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-lg">🧑‍🦱</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}