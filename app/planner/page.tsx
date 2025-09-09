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
import { useWeekendPlan } from "@/hooks/useWeekendPlan";
import { useWeather } from "@/hooks/useWeather";
import { Activity, ActivitySuggestion } from "@/lib/types";

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
    addActivity({
      ...activity,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      completed: false,
      day: activeDay as "saturday" | "sunday",
    });
  };
  const [activeDay, setActiveDay] = useState("saturday");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
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
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <Header title="My Weekend Journey" className="mb-12" />

        {/* Weather Widget */}
        <div className="px-20">
          <WeatherWidget className="mb-8" />

          {/* Progress Bar */}
          <ProgressBar plan={plan} className="mb-8" />
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

        {/* Quick Add Dummy Activities - moved below timelines */}
        <div className="mb-8 max-w-2xl mx-auto px-4">
          <h3 className="text-lg font-semibold text-amber-900 mb-2 text-center">
            Quick Add Activities
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {dummyActivities.map((act, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAdd(act)}
                className="px-4 py-2 rounded-lg border border-amber-300 bg-white/80 hover:bg-amber-100 shadow text-sm flex items-center gap-2 transition min-w-[140px]"
              >
                <span className="text-xl">
                  {require("@/lib/types").categoryConfig[act.category].icon}
                </span>
                {act.title}{" "}
                <span className="text-xs text-gray-500">({act.time})</span>
              </button>
            ))}
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
      </div>
    </div>
  );
}
