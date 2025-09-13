"use client";

import { useReducer, useEffect, useState } from "react";
import { Activity, WeekendPlan, ActivitySuggestion } from "@/lib/types";

type Action =
  | { type: "ADD_ACTIVITY"; payload: Activity }
  | {
      type: "ADD_SUGGESTION";
      payload: { suggestion: ActivitySuggestion; day: "saturday" | "sunday" };
    }
  | { type: "UPDATE_ACTIVITY"; payload: Activity }
  | {
      type: "DELETE_ACTIVITY";
      payload: { id: string; day: "saturday" | "sunday" };
    }
  | {
      type: "TOGGLE_COMPLETE";
      payload: { id: string; day: "saturday" | "sunday" };
    }
  | {
      type: "REORDER_ACTIVITIES";
      payload: { day: "saturday" | "sunday"; activities: Activity[] };
    }
  | {
      type: "MOVE_ACTIVITY";
      payload: {
        activityId: string;
        fromDay: "saturday" | "sunday";
        toDay: "saturday" | "sunday";
        newIndex?: number;
      };
    }
  | { type: "LOAD_PLAN"; payload: WeekendPlan };

const initialState: WeekendPlan = {
  saturday: [],
  sunday: [],
};

function weekendPlanReducer(state: WeekendPlan, action: Action): WeekendPlan {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return {
        ...state,
        [action.payload.day]: [
          ...state[action.payload.day],
          action.payload,
        ].sort((a, b) => a.time.localeCompare(b.time)),
      };

    case "ADD_SUGGESTION":
      const newActivity: Activity = {
        id: Date.now().toString(),
        title: action.payload.suggestion.title,
        time: action.payload.suggestion.time,
        category: action.payload.suggestion.category,
        mood: action.payload.suggestion.mood,
        completed: false,
        day: action.payload.day,
      };
      return {
        ...state,
        [action.payload.day]: [...state[action.payload.day], newActivity].sort(
          (a, b) => a.time.localeCompare(b.time),
        ),
      };

    case "UPDATE_ACTIVITY":
      return {
        ...state,
        [action.payload.day]: state[action.payload.day]
          .map((activity) =>
            activity.id === action.payload.id ? action.payload : activity,
          )
          .sort((a, b) => a.time.localeCompare(b.time)),
      };

    case "DELETE_ACTIVITY":
      return {
        ...state,
        [action.payload.day]: state[action.payload.day].filter(
          (activity) => activity.id !== action.payload.id,
        ),
      };

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        [action.payload.day]: state[action.payload.day].map((activity) =>
          activity.id === action.payload.id
            ? { ...activity, completed: !activity.completed }
            : activity,
        ),
      };

    case "REORDER_ACTIVITIES":
      return {
        ...state,
        [action.payload.day]: action.payload.activities,
      };

    case "MOVE_ACTIVITY":
      const { activityId, fromDay, toDay, newIndex } = action.payload;
      const activityToMove = state[fromDay].find(
        (activity) => activity.id === activityId,
      );

      if (!activityToMove) return state;

      // Update the activity's day property
      const updatedActivity = { ...activityToMove, day: toDay };

      // Remove from source day
      const sourceActivities = state[fromDay].filter(
        (activity) => activity.id !== activityId,
      );

      // Add to target day
      let targetActivities = [...state[toDay]];
      if (typeof newIndex === "number" && newIndex >= 0) {
        targetActivities.splice(newIndex, 0, updatedActivity);
      } else {
        targetActivities.push(updatedActivity);
        targetActivities.sort((a, b) => a.time.localeCompare(b.time));
      }

      return {
        ...state,
        [fromDay]: sourceActivities,
        [toDay]: targetActivities,
      };

    case "LOAD_PLAN":
      return action.payload;

    default:
      return state;
  }
}

export function useWeekendPlan() {
  const [plan, dispatch] = useReducer(weekendPlanReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("weekendly-plan");
    if (saved) {
      try {
        const parsedPlan = JSON.parse(saved);
        dispatch({ type: "LOAD_PLAN", payload: parsedPlan });
      } catch (error) {
        console.error("Failed to load saved plan:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever plan changes (but not on initial render)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("weekendly-plan", JSON.stringify(plan));
    }
  }, [plan, isInitialized]);

  const addActivity = (activity: Activity) => {
    dispatch({ type: "ADD_ACTIVITY", payload: activity });
  };

  const addSuggestion = (
    suggestion: ActivitySuggestion,
    day: "saturday" | "sunday",
  ) => {
    dispatch({ type: "ADD_SUGGESTION", payload: { suggestion, day } });
  };

  const updateActivity = (activity: Activity) => {
    dispatch({ type: "UPDATE_ACTIVITY", payload: activity });
  };

  const deleteActivity = (id: string, day: "saturday" | "sunday") => {
    dispatch({ type: "DELETE_ACTIVITY", payload: { id, day } });
  };

  const toggleComplete = (id: string, day: "saturday" | "sunday") => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: { id, day } });
  };

  const reorderActivities = (
    day: "saturday" | "sunday",
    activities: Activity[],
  ) => {
    dispatch({ type: "REORDER_ACTIVITIES", payload: { day, activities } });
  };

  const moveActivity = (
    activityId: string,
    fromDay: "saturday" | "sunday",
    toDay: "saturday" | "sunday",
    newIndex?: number,
  ) => {
    dispatch({
      type: "MOVE_ACTIVITY",
      payload: { activityId, fromDay, toDay, newIndex },
    });
  };

  return {
    plan,
    addActivity,
    addSuggestion,
    updateActivity,
    deleteActivity,
    toggleComplete,
    reorderActivities,
    moveActivity,
  };
}
