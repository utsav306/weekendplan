'use client';

import { useState, useEffect } from 'react';
import { WeatherData } from '@/lib/types';

const WEATHER_API_KEY = 'demo'; // In production, use environment variable
const DEFAULT_CITY = 'London';

export function useWeather(city: string = DEFAULT_CITY) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock weather data for demo (replace with real API in production)
        const mockWeatherData: WeatherData = {
          temperature: Math.floor(Math.random() * 25) + 10, // 10-35°C
          condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
          icon: ['☀️', '☁️', '🌧️'][Math.floor(Math.random() * 3)],
          description: ['Perfect weather for outdoor activities!', 'Great day for indoor activities', 'Cozy weather for staying in'][Math.floor(Math.random() * 3)],
          city: city
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setWeather(mockWeatherData);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error, refetch: () => fetchWeather() };
}