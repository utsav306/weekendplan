"use client";

import { useState, useEffect, useCallback } from "react";
import { WeatherData } from "@/lib/types";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationCoords | null>(null);

  // Get user's geolocation
  const getUserLocation = useCallback(() => {
    return new Promise<LocationCoords>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
         
          setLocation(coords);
          resolve(coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          // More specific error messages
          let errorMessage = "Unknown location error";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied by user";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out";
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // Cache for 5 minutes
        },
      );
    });
  }, []);

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let coords: LocationCoords;

      // Try to get user location first
      try {
        coords = location || (await getUserLocation());
      } catch (locationError) {
        console.warn(
          "Could not get user location, using default city:",
          locationError,
        );
        // Fallback to London if geolocation fails
     
        const response = await fetch("/api/weather?city=London");

     

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Fallback weather API error response:", errorText);
          throw new Error(
            `Failed to fetch weather data: ${response.status} - ${errorText}`,
          );
        }
        const data = await response.json();
    
        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main.toLowerCase(),
          icon: getWeatherIcon(data.weather[0].main),
          description: data.weather[0].description,
          city: data.name,
        });
        return;
      }

      // Fetch weather using coordinates
  
      const response = await fetch(
        `/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`,
      );

  

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Weather API error response:", errorText);
        throw new Error(
          `Failed to fetch weather data: ${response.status} - ${errorText}`,
        );
      }

      const data = await response.json();

      setWeather({
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main.toLowerCase(),
        icon: getWeatherIcon(data.weather[0].main),
        description: data.weather[0].description,
        city: data.name,
      });
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [location, getUserLocation]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, loading, error, refetch: fetchWeather };
}

// Helper function to get weather icon
function getWeatherIcon(condition: string): string {
  const weatherIcons: { [key: string]: string } = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
    Dust: "🌫️",
    Sand: "🌫️",
    Ash: "🌫️",
    Squall: "💨",
    Tornado: "🌪️",
  };

  return weatherIcons[condition] || "🌤️";
}
