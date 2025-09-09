'use client';

import { motion } from 'framer-motion';
import { RefreshCw, MapPin } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';

interface WeatherWidgetProps {
  city?: string;
  className?: string;
}

export default function WeatherWidget({ city = 'London', className = "" }: WeatherWidgetProps) {
  const { weather, loading, error, refetch } = useWeather(city);

  if (loading) {
    return (
      <motion.div 
        className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200 ${className}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin text-amber-600" />
          <span className="text-amber-700">Loading weather...</span>
        </div>
      </motion.div>
    );
  }

  if (error || !weather) {
    return (
      <motion.div 
        className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200 ${className}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌤️</span>
            <div>
              <p className="font-semibold text-amber-900">Weather unavailable</p>
              <p className="text-sm text-amber-700">Perfect day for planning!</p>
            </div>
          </div>
          <button
            onClick={refetch}
            className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-amber-600" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{weather.icon}</span>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-amber-900">{weather.temperature}°C</span>
              <div className="flex items-center text-sm text-amber-700">
                <MapPin className="w-3 h-3 mr-1" />
                {weather.city}
              </div>
            </div>
            <p className="text-sm text-amber-700 mt-1">{weather.description}</p>
          </div>
        </div>
        <button
          onClick={refetch}
          className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-amber-600" />
        </button>
      </div>
    </motion.div>
  );
}