"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, Check } from "lucide-react";
import { Activity, categoryConfig, moodConfig } from "@/lib/types";
import Button from "./Button";

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export default function ActivityCard({
  activity,
  onEdit,
  onDelete,
  onComplete,
}: ActivityCardProps) {
  const categoryStyle = categoryConfig[activity.category];
  const moodEmoji = moodConfig[activity.mood];

  return (
    <motion.div
      className={`relative p-4 rounded-xl border-2 shadow-lg overflow-hidden group ${
        categoryStyle.color
      } ${activity.completed ? "opacity-60" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        y: -2,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Completion overlay */}
      {activity.completed && (
        <motion.div
          className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-green-500 text-white rounded-full p-2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Check size={24} />
          </motion.div>
        </motion.div>
      )}

      <div className="flex items-start justify-between mb-3 relative z-10 pointer-events-auto">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-2xl"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.2 }}
          >
            {categoryStyle.icon}
          </motion.span>
          <div>
            <h3
              className={`font-bold text-lg ${
                activity.completed ? "line-through" : ""
              }`}
            >
              {activity.title}
            </h3>
            <p className="text-sm opacity-75">{activity.time}</p>
          </div>
        </div>
        <motion.span
          className="text-2xl"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {moodEmoji}
        </motion.span>
      </div>

      <div className="flex gap-2 mt-4 relative z-10 pointer-events-auto">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onComplete(activity.id)}
            variant="secondary"
            size="sm"
            className="flex-1 text-xs bg-white/80 hover:bg-white border-2 border-green-300 hover:border-green-400 text-green-700 font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {activity.completed ? "Undo" : "Complete"} ✅
          </Button>
        </motion.div>
        <motion.button
          onClick={() => onEdit(activity)}
          className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Edit size={16} />
        </motion.button>
        <motion.button
          onClick={() => onDelete(activity.id)}
          className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-red-600"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
