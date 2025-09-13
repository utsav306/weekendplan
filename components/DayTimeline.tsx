"use client";

import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Activity } from "@/lib/types";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ActivityCard from "./ActivityCard";

interface DayTimelineProps {
  day: "saturday" | "sunday";
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
  onCompleteActivity,
}: DayTimelineProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: day,
  });

  const dayLabel = day === "saturday" ? "Saturday" : "Sunday";
  const dayEmoji = day === "saturday" ? "🎯" : "🏁";

  return (
    <div className="relative">
      {/* Day Header */}
      <motion.div
        className="text-center mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
          {dayLabel} {dayEmoji}
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-amber-400 rounded-full mx-auto"></div>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical dotted line with gradient */}
        {activities.length > 0 && (
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 opacity-60"></div>
        )}

        {/* Activities */}
        <div
          ref={setNodeRef}
          className={`space-y-6 min-h-[100px] transition-colors duration-200 ${
            isOver
              ? "bg-amber-50/50 border-2 border-dashed border-amber-300 rounded-lg p-4"
              : ""
          }`}
        >
          {activities.length === 0 ? (
            /* Enhanced Empty State */
            <motion.div
              className="text-center py-10 sm:py-16 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated background circles */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-100/30 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-orange-100/40 rounded-full"
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>

              <motion.div
                className="text-6xl sm:text-8xl mb-3 sm:mb-4 relative z-10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🧭
              </motion.div>
              <motion.h3
                className="text-lg sm:text-xl font-semibold text-amber-900 mb-2 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                No activities yet
              </motion.h3>
              <motion.p
                className="text-amber-700 mb-5 sm:mb-6 px-2 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Start planning your {dayLabel.toLowerCase()} adventure!
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button
                  onClick={onAddActivity}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={18} />
                  Add First Activity
                </motion.button>
                <motion.button
                  onClick={onSuggestActivities}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={18} />
                  Get Suggestions
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <SortableContext
              items={activities.map((activity) => activity.id)}
              strategy={verticalListSortingStrategy}
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="relative flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Enhanced Timeline pin */}
                  <motion.div
                    className="relative z-10 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lg">📍</span>
                  </motion.div>

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
              ))}
            </SortableContext>
          )}
        </div>

        {/* Add Activity Button (when activities exist) */}
        {activities.length > 0 && (
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: activities.length * 0.1 }}
          >
            <motion.button
              onClick={onAddActivity}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-white/70 to-amber-50/70 hover:from-white hover:to-amber-50 border-2 border-dashed border-amber-300 hover:border-amber-400 text-amber-700 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Plus size={18} />
              </motion.div>
              Add Activity
            </motion.button>
            <motion.button
              onClick={onSuggestActivities}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 border-2 border-purple-300 hover:border-purple-400 text-purple-700 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Sparkle effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={18} />
              </motion.div>
              <span className="relative z-10">Suggest More</span>
              <motion.span
                className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                ✨
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
