"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, Check, GripVertical } from "lucide-react";
import { Activity, categoryConfig, moodConfig } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "./Button";

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  isDragging?: boolean;
}

export default function ActivityCard({
  activity,
  onEdit,
  onDelete,
  onComplete,
  isDragging = false,
}: ActivityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: activity.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const categoryStyle = categoryConfig[activity.category];
  const moodEmoji = moodConfig[activity.mood];

  const isCurrentlyDragging = isDragging || isSortableDragging;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isCurrentlyDragging ? "z-50" : ""}`}
    >
      <motion.div
        className={`relative p-4 rounded-xl border-2 shadow-lg overflow-hidden group ${
          categoryStyle.color
        } ${activity.completed ? "opacity-60" : ""} ${
          isCurrentlyDragging ? "rotate-3 shadow-2xl" : ""
        }`}
        initial={!isCurrentlyDragging ? { opacity: 0, y: 20 } : undefined}
        animate={!isCurrentlyDragging ? { opacity: 1, y: 0 } : undefined}
        transition={!isCurrentlyDragging ? { duration: 0.3 } : undefined}
        whileHover={
          !isCurrentlyDragging
            ? {
                scale: 1.02,
                y: -2,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }
            : undefined
        }
        layout
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
            {/* Drag handle */}
            <button
              className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1 -ml-1"
              {...attributes}
              {...listeners}
            >
              <GripVertical size={16} />
            </button>

            <motion.span
              className="text-2xl"
              whileHover={
                !isCurrentlyDragging ? { scale: 1.2, rotate: 10 } : {}
              }
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
            whileHover={!isCurrentlyDragging ? { scale: 1.1 } : undefined}
            transition={{ duration: 0.2 }}
          >
            {moodEmoji}
          </motion.span>
        </div>

        <div className="flex gap-2 mt-4 relative z-10 pointer-events-auto">
          <motion.div
            whileHover={!isCurrentlyDragging ? { scale: 1.05 } : undefined}
            whileTap={!isCurrentlyDragging ? { scale: 0.95 } : undefined}
          >
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
            whileHover={
              !isCurrentlyDragging ? { scale: 1.1, rotate: 5 } : undefined
            }
            whileTap={!isCurrentlyDragging ? { scale: 0.9 } : undefined}
          >
            <Edit size={16} />
          </motion.button>
          <motion.button
            onClick={() => onDelete(activity.id)}
            className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-red-600"
            whileHover={
              !isCurrentlyDragging ? { scale: 1.1, rotate: -5 } : undefined
            }
            whileTap={!isCurrentlyDragging ? { scale: 0.9 } : undefined}
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
