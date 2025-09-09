'use client';

import { motion } from 'framer-motion';
import { Edit, Trash2, Check } from 'lucide-react';
import { Activity, categoryConfig, moodConfig } from '@/lib/types';
import Button from './Button';

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export default function ActivityCard({ activity, onEdit, onDelete, onComplete }: ActivityCardProps) {
  const categoryStyle = categoryConfig[activity.category];
  const moodEmoji = moodConfig[activity.mood];

  return (
    <motion.div
      className={`relative p-4 rounded-xl border-2 shadow-lg ${categoryStyle.color} ${
        activity.completed ? 'opacity-60' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Completion overlay */}
      {activity.completed && (
        <div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center">
          <div className="bg-green-500 text-white rounded-full p-2">
            <Check size={24} />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{categoryStyle.icon}</span>
          <div>
            <h3 className={`font-bold text-lg ${activity.completed ? 'line-through' : ''}`}>
              {activity.title}
            </h3>
            <p className="text-sm opacity-75">{activity.time}</p>
          </div>
        </div>
        <span className="text-2xl">{moodEmoji}</span>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => onComplete(activity.id)}
          variant="secondary"
          size="sm"
          className="flex-1 text-xs"
        >
          {activity.completed ? 'Undo' : 'Complete'} ✅
        </Button>
        <button
          onClick={() => onEdit(activity)}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}