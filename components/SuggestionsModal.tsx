"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, RefreshCw } from "lucide-react";
import {
  SuggestionMood,
  ActivitySuggestion,
  WeatherData,
  categoryConfig,
} from "@/lib/types";
import { useActivitySuggestions } from "@/hooks/useActivitySuggestions";
import Button from "./Button";

interface SuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (
    suggestion: ActivitySuggestion,
    day: "saturday" | "sunday",
  ) => void;
  weather?: WeatherData | null;
}

const moodOptions = [
  {
    id: "lazy",
    label: "Lazy",
    emoji: "😴",
    description: "Low-key, relaxing activities",
  },
  {
    id: "adventurous",
    label: "Adventurous",
    emoji: "🗺️",
    description: "Exciting, active experiences",
  },
  {
    id: "social",
    label: "Social",
    emoji: "👥",
    description: "Fun activities with others",
  },
  {
    id: "chill",
    label: "Chill",
    emoji: "🧘",
    description: "Peaceful, mindful moments",
  },
];

export default function SuggestionsModal({
  isOpen,
  onClose,
  onAddActivity,
  weather,
}: SuggestionsModalProps) {
  const [selectedMood, setSelectedMood] = useState<SuggestionMood | null>(null);
  const [suggestions, setSuggestions] = useState<ActivitySuggestion[]>([]);
  const [selectedDay, setSelectedDay] = useState<"saturday" | "sunday">(
    "saturday",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingAI, setUsingAI] = useState(true);
  const { getSuggestions, isLoadingAI, aiError } = useActivitySuggestions();

  const handleMoodSelect = async (mood: SuggestionMood) => {
    setSelectedMood(mood);
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      // Try to get user's location for better AI suggestions
      let location = "Unknown location";
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
              });
            },
          );
          location = `${position.coords.latitude.toFixed(
            2,
          )}, ${position.coords.longitude.toFixed(2)}`;
        } catch (geoError) {
          console.log("Could not get location, using default");
        }
      }

      const newSuggestions = await getSuggestions(
        mood,
        weather,
        location,
        usingAI,
      );
      setSuggestions(newSuggestions);
    } catch (err) {
      setError("Failed to get suggestions");
      console.error("Error getting suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddActivity = (suggestion: ActivitySuggestion) => {
    onAddActivity(suggestion, selectedDay);
  };

  const handleRefreshSuggestions = () => {
    if (selectedMood) {
      handleMoodSelect(selectedMood);
    }
  };

  const handleClose = () => {
    setSelectedMood(null);
    setSuggestions([]);
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
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  <h2 className="text-2xl font-bold text-amber-900">
                    {usingAI ? "AI" : "Curated"} Activity Suggestions
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  {/* AI Toggle */}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm ${
                        usingAI ? "text-gray-500" : "text-amber-600 font-medium"
                      }`}
                    >
                      Curated
                    </span>
                    <button
                      onClick={() => setUsingAI(!usingAI)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        usingAI ? "bg-amber-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          usingAI ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span
                      className={`text-sm ${
                        usingAI ? "text-amber-600 font-medium" : "text-gray-500"
                      }`}
                    >
                      AI
                    </span>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Weather Context */}
              {weather && (
                <div className="bg-amber-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{weather.icon}</span>
                    <div>
                      <p className="font-semibold text-amber-900">
                        {weather.temperature}°C in {weather.city}
                      </p>
                      <p className="text-sm text-amber-700">
                        {weather.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!selectedMood ? (
                /* Mood Selection */
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    What's your weekend mood?
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {moodOptions.map((mood) => (
                      <motion.button
                        key={mood.id}
                        onClick={() =>
                          handleMoodSelect(mood.id as SuggestionMood)
                        }
                        className="p-4 rounded-xl border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-3xl">{mood.emoji}</span>
                          <h4 className="font-bold text-gray-800">
                            {mood.label}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          {mood.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Suggestions Display */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Perfect for a {selectedMood} weekend
                      {usingAI && !isLoading && !error && (
                        <span className="text-xs text-amber-600 ml-2">
                          ✨ AI Generated
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {/* Refresh Button */}
                      {!isLoading && suggestions.length > 0 && (
                        <button
                          onClick={handleRefreshSuggestions}
                          className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Refresh suggestions"
                        >
                          <RefreshCw size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedMood(null);
                          setSuggestions([]);
                          setError(null);
                        }}
                        className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                      >
                        ← Change mood
                      </button>
                    </div>
                  </div>

                  {/* Loading State */}
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
                      <p className="text-gray-600">
                        {usingAI
                          ? "AI is thinking of perfect activities..."
                          : "Loading suggestions..."}
                      </p>
                    </div>
                  )}

                  {/* Error State */}
                  {error && !isLoading && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-red-700 text-sm">
                        {error}. Showing curated suggestions instead.
                      </p>
                    </div>
                  )}

                  {/* AI Error Fallback Notice */}
                  {aiError && !usingAI && !isLoading && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-blue-700 text-sm">
                        AI suggestions temporarily unavailable. Showing our
                        curated picks!
                      </p>
                    </div>
                  )}

                  {/* Day Selection */}
                  <div className="flex space-x-2 mb-6">
                    <button
                      onClick={() => setSelectedDay("saturday")}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedDay === "saturday"
                          ? "bg-amber-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Saturday 🎯
                    </button>
                    <button
                      onClick={() => setSelectedDay("sunday")}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedDay === "sunday"
                          ? "bg-amber-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Sunday 🏁
                    </button>
                  </div>

                  {/* Suggestions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestions.map((suggestion, index) => {
                      const categoryStyle = categoryConfig[suggestion.category];
                      // Fallback if categoryStyle is undefined
                      const fallbackStyle = {
                        color: "border-gray-200",
                        icon: "❓",
                      };
                      const safeCategoryStyle = categoryStyle || fallbackStyle;
                      return (
                        <motion.div
                          key={suggestion.id}
                          className={`p-4 rounded-xl border-2 ${safeCategoryStyle.color}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">
                                {safeCategoryStyle.icon}
                              </span>
                              <div>
                                <h4 className="font-bold">
                                  {suggestion.title}
                                </h4>
                                <p className="text-sm opacity-75">
                                  {suggestion.time}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleAddActivity(suggestion)}
                            variant="primary"
                            size="sm"
                            className="w-full"
                          >
                            Add to{" "}
                            {selectedDay === "saturday" ? "Saturday" : "Sunday"}
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
