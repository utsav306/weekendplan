"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button";
import { Activity } from "@/lib/types";

interface DaySelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Omit<Activity, "id" | "completed" | "day">;
  onSelectDay: (
    activity: Omit<Activity, "id" | "completed" | "day">,
    day: "saturday" | "sunday",
  ) => void;
}

export default function DaySelectionDialog({
  isOpen,
  onClose,
  activity,
  onSelectDay,
}: DaySelectionDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-sm mx-3 shadow-2xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-amber-900">
                  Choose a Day
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Activity Preview */}
              <div className="mb-4 p-2.5 sm:p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg sm:text-xl">
                    {
                      require("@/lib/types").categoryConfig[activity.category]
                        .icon
                    }
                  </span>
                  <span className="font-medium text-sm sm:text-base truncate">
                    {activity.title}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Time: {activity.time}
                </div>
              </div>

              {/* Day Selection */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectDay(activity, "saturday")}
                  className="flex flex-col items-center p-3 sm:p-4 rounded-lg border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-400 transition-all"
                >
                  <span className="text-xl sm:text-2xl mb-1 sm:mb-2">🎯</span>
                  <span className="font-medium text-sm sm:text-base">
                    Saturday
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectDay(activity, "sunday")}
                  className="flex flex-col items-center p-3 sm:p-4 rounded-lg border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-400 transition-all"
                >
                  <span className="text-xl sm:text-2xl mb-1 sm:mb-2">🏁</span>
                  <span className="font-medium text-sm sm:text-base">
                    Sunday
                  </span>
                </motion.button>
              </div>

              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
