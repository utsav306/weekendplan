export type ActivityCategory = "fun" | "food" | "fitness" | "relax" | "social";
export type ActivityMood = "happy" | "energetic" | "calm";

export interface Activity {
  id: string;
  title: string;
  time: string;
  category: ActivityCategory;
  mood: ActivityMood;
  completed: boolean;
  day: "saturday" | "sunday";
}

export interface WeekendPlan {
  saturday: Activity[];
  sunday: Activity[];
}

export const categoryConfig = {
  fun: {
    color: "bg-purple-100 border-purple-300 text-purple-800",
    icon: "🎉",
    label: "Fun",
  },
  food: {
    color: "bg-red-100 border-red-300 text-red-800",
    icon: "🍽️",
    label: "Food",
  },
  fitness: {
    color: "bg-green-100 border-green-300 text-green-800",
    icon: "💪",
    label: "Fitness",
  },
  relax: {
    color: "bg-blue-100 border-blue-300 text-blue-800",
    icon: "🧘",
    label: "Relax",
  },
  social: {
    color: "bg-orange-100 border-orange-300 text-orange-800",
    icon: "👥",
    label: "Social",
  },
};

export const moodConfig = {
  happy: "🙂",
  energetic: "⚡",
  calm: "😌",
};

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  description: string;
  city: string;
}

export type SuggestionMood = "lazy" | "adventurous" | "social" | "chill";

export interface ActivitySuggestion {
  id: string;
  title: string;
  category: ActivityCategory;
  mood: ActivityMood;
  time: string;
  weatherDependent?: boolean;
}
