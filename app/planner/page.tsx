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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-25 to-orange-100">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <Header title="My Weekend Journey" className="mb-8 md:mb-12" />

        {/* Weather Widget */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-20">
          <WeatherWidget className="mb-6 md:mb-8" />

          {/* Progress Bar */}
          <ProgressBar plan={plan} className="mb-6 md:mb-8" />
        </div>

        {/* Day Tabs */}

        <Tabs tabs={tabs} activeTab={activeDay} onTabChange={setActiveDay} />

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop: Side by side, Mobile: Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Saturday */}
            <motion.div
              className={`${activeDay !== "saturday" ? "hidden lg:block" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-200">
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
            </motion.div>

            {/* Sunday */}
            <motion.div
              className={`${activeDay !== "sunday" ? "hidden lg:block" : ""}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-200">
                <DayTimeline
                  day="sunday"
                  activities={plan.sunday}
                  onAddActivity={() => {
                    setActiveDay("sunday");
                    handleAddActivity();
                  }}
                  onSuggestActivities={handleSuggestActivities}
                  onEditActivity={handleEditActivity}
                  onDeleteActivity={(id) => handleDeleteActivity(id, "sunday")}
                  onCompleteActivity={(id) =>
                    handleCompleteActivity(id, "sunday")
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Add Activities */}
        <div className="my-8 sm:my-10 md:my-12 max-w-4xl mx-auto px-2 sm:px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-amber-200">
            <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-3 sm:mb-4 flex flex-wrap items-center gap-1 sm:gap-0">
              <span className="mr-1 sm:mr-2">⚡</span>
              Quick Add Activities
              <span className="ml-auto text-xs sm:text-sm font-normal text-amber-600 whitespace-nowrap">
                Click to add
              </span>
            </h3>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {dummyActivities.map((act, idx) => {
                const categoryDetails = categoryConfig[act.category];
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAdd(act)}
                    className={`p-2 sm:p-3 rounded-lg border border-amber-200 bg-white hover:${categoryDetails.color} hover:shadow-md shadow-sm text-left flex items-center gap-2 sm:gap-3 transition`}
                  >
                    <div
                      className={`p-1.5 sm:p-2 rounded-full ${categoryDetails.color} text-lg sm:text-xl flex-shrink-0`}
                    >
                      {categoryDetails.icon}
                    </div>
                    <div className="min-w-0 flex-1">
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
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Tab Hint */}
        <motion.div
          className="lg:hidden text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-amber-600 text-sm">
            Switch between days using the tabs above
          </p>
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
