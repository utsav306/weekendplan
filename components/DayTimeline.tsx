'use client';

import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { Activity } from '@/lib/types';
import ActivityCard from './ActivityCard';

interface DayTimelineProps {
  day: 'saturday' | 'sunday';
  activities: Activity[];
  onAddActivity: () => void;
  onSuggestActivities: () => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
  onCompleteActivity: (id: string) => void;
}

export default function DayTimeline({ 
  day, 
  activities, 
  onAddActivity, 
  onSuggestActivities,
  onEditActivity, 
  onDeleteActivity, 
  onCompleteActivity 
}: DayTimelineProps) {
  const dayLabel = day === 'saturday' ? 'Saturday' : 'Sunday';
  const dayEmoji = day === 'saturday' ? '🎯' : '🏁';

  return (
    <div className="relative">
      {/* Day Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-amber-900 mb-2">
          {dayLabel} {dayEmoji}
        </h2>
        <div className="w-16 h-1 bg-amber-400 rounded-full mx-auto"></div>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical dotted line */}
        {activities.length > 0 && (
          <div className="absolute left-6 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-amber-300"></div>
        )}

        {/* Activities */}
        <div className="space-y-6">
          {activities.length === 0 ? (
            /* Empty State */
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-8xl mb-4">🧭</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                No activities yet
              </h3>
              <p className="text-amber-700 mb-6">
                Start planning your {dayLabel.toLowerCase()} adventure!
              </p>
              <button
                onClick={onAddActivity}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Add First Activity
              </button>
              <button
                onClick={onSuggestActivities}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl ml-4"
              >
                <Sparkles size={20} />
                Get Suggestions
              </button>
            </motion.div>
          ) : (
            activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Timeline pin */}
                <div className="relative z-10 w-12 h-12 bg-amber-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-lg">📍</span>
                </div>

                {/* Activity Card */}
                <div className="flex-1">
                  <ActivityCard
                    activity={activity}
                    onEdit={onEditActivity}
                    onDelete={onDeleteActivity}
                    onComplete={onCompleteActivity}
                  />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Add Activity Button (when activities exist) */}
        {activities.length > 0 && (
          <motion.div 
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: activities.length * 0.1 }}
          >
            <button
              onClick={onAddActivity}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 hover:bg-white border-2 border-dashed border-amber-300 hover:border-amber-400 text-amber-700 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              Add Activity
            </button>
            <button
              onClick={onSuggestActivities}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 hover:border-purple-400 text-purple-700 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Sparkles size={20} />
              Suggest More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}