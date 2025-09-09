'use client';

import { ActivitySuggestion, SuggestionMood, WeatherData, ActivityCategory, ActivityMood } from '@/lib/types';

const suggestionDatabase = {
  lazy: {
    sunny: [
      { title: 'Read a book in the garden', category: 'relax', mood: 'calm', time: '14:00' },
      { title: 'Watch Netflix series', category: 'fun', mood: 'happy', time: '20:00' },
      { title: 'Order favorite takeout', category: 'food', mood: 'happy', time: '19:00' },
      { title: 'Take a relaxing bath', category: 'relax', mood: 'calm', time: '21:00' }
    ],
    cloudy: [
      { title: 'Binge-watch documentaries', category: 'fun', mood: 'calm', time: '15:00' },
      { title: 'Cook comfort food', category: 'food', mood: 'happy', time: '18:00' },
      { title: 'Indoor yoga session', category: 'fitness', mood: 'calm', time: '10:00' },
      { title: 'Organize photo albums', category: 'relax', mood: 'calm', time: '16:00' }
    ],
    rainy: [
      { title: 'Make homemade soup', category: 'food', mood: 'happy', time: '17:00' },
      { title: 'Read by the window', category: 'relax', mood: 'calm', time: '13:00' },
      { title: 'Watch classic movies', category: 'fun', mood: 'happy', time: '19:30' },
      { title: 'Listen to podcasts', category: 'relax', mood: 'calm', time: '11:00' }
    ]
  },
  adventurous: {
    sunny: [
      { title: 'Go hiking', category: 'fitness', mood: 'energetic', time: '09:00' },
      { title: 'Outdoor picnic', category: 'food', mood: 'happy', time: '12:00' },
      { title: 'Cycling adventure', category: 'fitness', mood: 'energetic', time: '08:00' },
      { title: 'Visit local market', category: 'social', mood: 'happy', time: '10:30' }
    ],
    cloudy: [
      { title: 'Explore new neighborhood', category: 'fun', mood: 'energetic', time: '14:00' },
      { title: 'Try rock climbing gym', category: 'fitness', mood: 'energetic', time: '16:00' },
      { title: 'Visit art gallery', category: 'fun', mood: 'happy', time: '11:00' },
      { title: 'Food truck hunting', category: 'food', mood: 'happy', time: '13:00' }
    ],
    rainy: [
      { title: 'Indoor escape room', category: 'fun', mood: 'energetic', time: '15:00' },
      { title: 'Cooking class', category: 'food', mood: 'happy', time: '18:00' },
      { title: 'Museum exploration', category: 'fun', mood: 'happy', time: '12:00' },
      { title: 'Bowling with friends', category: 'social', mood: 'energetic', time: '19:00' }
    ]
  },
  social: {
    sunny: [
      { title: 'Outdoor barbecue party', category: 'social', mood: 'happy', time: '17:00' },
      { title: 'Beach volleyball', category: 'fitness', mood: 'energetic', time: '15:00' },
      { title: 'Park picnic with friends', category: 'social', mood: 'happy', time: '12:30' },
      { title: 'Outdoor café meetup', category: 'social', mood: 'happy', time: '10:00' }
    ],
    cloudy: [
      { title: 'Game night at home', category: 'social', mood: 'happy', time: '20:00' },
      { title: 'Coffee shop hangout', category: 'social', mood: 'happy', time: '14:00' },
      { title: 'Group cooking session', category: 'food', mood: 'happy', time: '18:30' },
      { title: 'Visit local brewery', category: 'social', mood: 'happy', time: '16:00' }
    ],
    rainy: [
      { title: 'Indoor movie marathon', category: 'social', mood: 'happy', time: '19:00' },
      { title: 'Board game café', category: 'social', mood: 'happy', time: '15:00' },
      { title: 'Cozy dinner party', category: 'social', mood: 'happy', time: '18:00' },
      { title: 'Karaoke night', category: 'social', mood: 'energetic', time: '21:00' }
    ]
  },
  chill: {
    sunny: [
      { title: 'Meditation in the park', category: 'relax', mood: 'calm', time: '08:00' },
      { title: 'Gentle nature walk', category: 'fitness', mood: 'calm', time: '09:30' },
      { title: 'Outdoor sketching', category: 'fun', mood: 'calm', time: '11:00' },
      { title: 'Sunset photography', category: 'fun', mood: 'calm', time: '18:30' }
    ],
    cloudy: [
      { title: 'Spa day at home', category: 'relax', mood: 'calm', time: '14:00' },
      { title: 'Gentle yoga flow', category: 'fitness', mood: 'calm', time: '10:00' },
      { title: 'Journaling session', category: 'relax', mood: 'calm', time: '16:00' },
      { title: 'Herbal tea tasting', category: 'food', mood: 'calm', time: '15:30' }
    ],
    rainy: [
      { title: 'Mindfulness meditation', category: 'relax', mood: 'calm', time: '09:00' },
      { title: 'Aromatherapy bath', category: 'relax', mood: 'calm', time: '20:00' },
      { title: 'Gentle stretching', category: 'fitness', mood: 'calm', time: '11:00' },
      { title: 'Calming music session', category: 'relax', mood: 'calm', time: '17:00' }
    ]
  }
};

export function useActivitySuggestions() {
  const getSuggestions = (mood: SuggestionMood, weather?: WeatherData | null): ActivitySuggestion[] => {
    const weatherCondition = weather?.condition || 'sunny';
    const suggestions = suggestionDatabase[mood][weatherCondition as keyof typeof suggestionDatabase[typeof mood]] || suggestionDatabase[mood].sunny;
    
    return suggestions.slice(0, 4).map((suggestion, index) => ({
      ...suggestion,
      id: `suggestion-${Date.now()}-${index}`,
      weatherDependent: true,
      category: suggestion.category as ActivityCategory,
      mood: suggestion.mood as ActivityMood
    }));
  };

  return { getSuggestions };
}