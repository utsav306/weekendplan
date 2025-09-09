'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Activity, ActivityCategory, ActivityMood, categoryConfig, moodConfig } from '@/lib/types';
import Button from './Button';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  activity?: Activity | null;
  day: 'saturday' | 'sunday';
}

export default function ActivityModal({ isOpen, onClose, onSave, activity, day }: ActivityModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    category: 'fun' as ActivityCategory,
    mood: 'happy' as ActivityMood
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title,
        time: activity.time,
        category: activity.category,
        mood: activity.mood
      });
    } else {
      setFormData({
        title: '',
        time: '',
        category: 'fun',
        mood: 'happy'
      });
    }
  }, [activity, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.time) return;

    const newActivity: Activity = {
      id: activity?.id || Date.now().toString(),
      title: formData.title.trim(),
      time: formData.time,
      category: formData.category,
      mood: formData.mood,
      completed: activity?.completed || false,
      day
    };

    onSave(newActivity);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-amber-900">
                  {activity ? 'Edit Activity' : 'Add Activity'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="What are you planning to do?"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: key as ActivityCategory })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.category === key
                            ? config.color
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{config.icon}</div>
                        <div className="text-xs font-medium">{config.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mood
                  </label>
                  <div className="flex gap-2">
                    {Object.entries(moodConfig).map(([key, emoji]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({ ...formData, mood: key as ActivityMood })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.mood === key
                            ? 'border-amber-400 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl">{emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                  >
                    {activity ? 'Update' : 'Add'} Activity
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}