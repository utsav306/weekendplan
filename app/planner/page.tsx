"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import DayTimeline from "@/components/DayTimeline";
import ActivityModal from "@/components/ActivityModal";
import WeatherWidget from "@/components/WeatherWidget";
import ProgressBar from "@/components/ProgressBar";
import SuggestionsModal from "@/components/SuggestionsModal";
import ConfettiCelebration from "@/components/ConfettiCelebration";
import DaySelectionDialog from "@/components/DaySelectionDialog";
import DragDropProvider from "@/components/DragDropProvider";
import { useWeekendPlan } from "@/hooks/useWeekendPlan";
import { useWeather } from "@/hooks/useWeather";
import { Activity, ActivitySuggestion, categoryConfig } from "@/lib/types";

const tabs = [
  { id: "saturday", label: "Saturday", emoji: "🎯" },
  { id: "sunday", label: "Sunday", emoji: "🏁" },
];

export default function PlannerPage() {
  // Dummy activities for quick add
  const dummyActivities: Omit<Activity, "id" | "completed" | "day">[] = [
    {
      title: "Go for a walk",
      time: "08:00",
      category: "fitness",
      mood: "energetic",
    },
    {
      title: "Brunch with friends",
      time: "11:00",
      category: "food",
      mood: "happy",
    },
    { title: "Read a book", time: "15:00", category: "relax", mood: "calm" },
    { title: "Movie night", time: "20:00", category: "fun", mood: "happy" },
    { title: "Yoga session", time: "07:00", category: "fitness", mood: "calm" },
    { title: "Board games", time: "17:00", category: "social", mood: "happy" },
  ];

  const handleQuickAdd = (
    activity: Omit<Activity, "id" | "completed" | "day">,
  ) => {
    setSelectedQuickActivity(activity);
    setIsDaySelectionOpen(true);
  };

  const handleAddQuickActivityToDay = (
    activity: Omit<Activity, "id" | "completed" | "day">,
    day: "saturday" | "sunday",
  ) => {
    addActivity({
      ...activity,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      completed: false,
      day,
    });
    setIsDaySelectionOpen(false);
  };
  const [activeDay, setActiveDay] = useState("saturday");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isDaySelectionOpen, setIsDaySelectionOpen] = useState(false);
  const [selectedQuickActivity, setSelectedQuickActivity] = useState<Omit<
    Activity,
    "id" | "completed" | "day"
  > | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const {
    plan,
    addActivity,
    addSuggestion,
    updateActivity,
    deleteActivity,
    toggleComplete,
    reorderActivities,
    moveActivity,
  } = useWeekendPlan();
  const { weather } = useWeather();

  // Check for 100% completion, but only celebrate once per completion
  useEffect(() => {
    const totalActivities = plan.saturday.length + plan.sunday.length;
    const completedActivities =
      plan.saturday.filter((a) => a.completed).length +
      plan.sunday.filter((a) => a.completed).length;

    if (totalActivities > 0 && completedActivities === totalActivities) {
      if (!hasCelebrated) {
        setShowConfetti(true);
        setHasCelebrated(true);
      }
    } else {
      setHasCelebrated(false);
    }
  }, [plan, hasCelebrated]);

  const handleAddActivity = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleSaveActivity = (activity: Activity) => {
    if (editingActivity) {
      updateActivity(activity);
    } else {
      addActivity(activity);
    }
  };

  const handleAddSuggestion = (
    suggestion: ActivitySuggestion,
    day: "saturday" | "sunday",
  ) => {
    addSuggestion(suggestion, day);
    setIsSuggestionsOpen(false);
  };

  const handleDeleteActivity = (id: string, day: "saturday" | "sunday") => {
    deleteActivity(id, day);
  };

  const handleCompleteActivity = (id: string, day: "saturday" | "sunday") => {
    toggleComplete(id, day);
  };

  const handleSuggestActivities = () => {
    setIsSuggestionsOpen(true);
  };

  // Wrapper functions for drag-and-drop
  const handleDragDeleteActivity = (id: string, day: "saturday" | "sunday") => {
    deleteActivity(id, day);
  };

  const handleDragCompleteActivity = (
    id: string,
    day: "saturday" | "sunday",
  ) => {
    toggleComplete(id, day);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-25 to-orange-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-rose-200/25 to-pink-200/25 rounded-full blur-lg"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full blur-2xl"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-orange-300/15 to-red-200/15 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 relative z-10">
        {/* Header */}
        <Header title="My Weekend Journey" className="mb-8 md:mb-12" />

        {/* Weather Widget */}
        <motion.div
          className="px-4 sm:px-8 md:px-12 lg:px-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <WeatherWidget className="mb-6 md:mb-8" />

          {/* Progress Bar */}
          <ProgressBar plan={plan} className="mb-6 md:mb-8" />
        </motion.div>

        {/* Day Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs tabs={tabs} activeTab={activeDay} onTabChange={setActiveDay} />
        </motion.div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop: Side by side, Mobile: Stacked */}
          <DragDropProvider
            saturdayActivities={plan.saturday}
            sundayActivities={plan.sunday}
            onReorderActivities={reorderActivities}
            onMoveActivity={moveActivity}
            onEditActivity={handleEditActivity}
            onDeleteActivity={handleDragDeleteActivity}
            onCompleteActivity={handleDragCompleteActivity}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Saturday */}
              <motion.div
                className={`${
                  activeDay !== "saturday" ? "hidden lg:block" : ""
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-200 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <DayTimeline
                      day="saturday"
                      activities={plan.saturday}
                      onAddActivity={() => {
                        setActiveDay("saturday");
                        handleAddActivity();
                      }}
                      onSuggestActivities={handleSuggestActivities}
                      onEditActivity={handleEditActivity}
                      onDeleteActivity={(id) =>
                        handleDeleteActivity(id, "saturday")
                      }
                      onCompleteActivity={(id) =>
                        handleCompleteActivity(id, "saturday")
                      }
                    />
                  </div>
                </div>
              </motion.div>

              {/* Sunday */}
              <motion.div
                className={`${activeDay !== "sunday" ? "hidden lg:block" : ""}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-200 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <DayTimeline
                      day="sunday"
                      activities={plan.sunday}
                      onAddActivity={() => {
                        setActiveDay("sunday");
                        handleAddActivity();
                      }}
                      onSuggestActivities={handleSuggestActivities}
                      onEditActivity={handleEditActivity}
                      onDeleteActivity={(id) =>
                        handleDeleteActivity(id, "sunday")
                      }
                      onCompleteActivity={(id) =>
                        handleCompleteActivity(id, "sunday")
                      }
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </DragDropProvider>
        </div>

        {/* Quick Add Activities */}
        <motion.div
          className="my-8 sm:my-10 md:my-12 max-w-4xl mx-auto px-2 sm:px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-50/50 to-amber-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.h3
              className="text-lg sm:text-xl font-semibold text-amber-900 mb-3 sm:mb-4 flex flex-wrap items-center gap-1 sm:gap-0 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.span
                className="mr-1 sm:mr-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                ⚡
              </motion.span>
              Quick Add Activities
            </motion.h3>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 relative z-10">
              {dummyActivities.map((act, idx) => {
                const categoryDetails = categoryConfig[act.category];
                return (
                  <motion.button
                    key={idx}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAdd(act)}
                    className={`p-2 sm:p-3 rounded-lg border border-amber-200 bg-white hover:${categoryDetails.color} hover:shadow-md shadow-sm text-left flex items-center gap-2 sm:gap-3 transition-all duration-300 group/item relative overflow-hidden`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + idx * 0.1 }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                    <motion.div
                      className={`p-1.5 sm:p-2 rounded-full ${categoryDetails.color} text-lg sm:text-xl flex-shrink-0 relative z-10`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {categoryDetails.icon}
                    </motion.div>
                    <div className="min-w-0 flex-1 relative z-10">
                      <div className="font-medium text-sm sm:text-base truncate">
                        {act.title}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="whitespace-nowrap">{act.time}</span>
                        <span className="hidden xs:inline-block">•</span>
                        <span className="whitespace-nowrap">
                          {categoryDetails.label}
                        </span>
                      </div>
                    </div>

                    {/* Sparkle effect on hover */}
                    <motion.div
                      className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-yellow-400 text-sm">✨</span>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Mobile Tab Hint */}
        <motion.div
          className="lg:hidden text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-amber-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👆
            </motion.span>
            <p className="text-amber-600 text-sm font-medium">
              Switch between days using the tabs above
            </p>
            <motion.span
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              👆
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Activity Modal */}
        <ActivityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveActivity}
          activity={editingActivity}
          day={activeDay as "saturday" | "sunday"}
        />

        {/* Suggestions Modal */}
        <SuggestionsModal
          isOpen={isSuggestionsOpen}
          onClose={() => setIsSuggestionsOpen(false)}
          onAddActivity={handleAddSuggestion}
          weather={weather}
        />

        {/* Confetti Celebration */}
        <ConfettiCelebration
          isActive={showConfetti}
          onComplete={() => setShowConfetti(false)}
        />

        {/* Day Selection Dialog */}
        {selectedQuickActivity && (
          <DaySelectionDialog
            isOpen={isDaySelectionOpen}
            onClose={() => {
              setIsDaySelectionOpen(false);
              setSelectedQuickActivity(null);
            }}
            activity={selectedQuickActivity}
            onSelectDay={handleAddQuickActivityToDay}
          />
        )}
      </div>
    </div>
  );
}
