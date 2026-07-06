"use client";

import { ForecastCard } from "@/components/ForecastCard";
import { CalendarDays, TrendingUp } from "lucide-react";

interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

interface ForecastGridProps {
  forecast: ForecastDay[];
}

export function ForecastGrid({ forecast }: ForecastGridProps) {
  // Get the next 7 days (skip today's index -0 if needed, but let's show all 7)
  const weeklyForecast = forecast.slice(0, 7);
  
  // Calculate some stats
  const avgHigh = Math.round(weeklyForecast.reduce((acc, day) => acc + day.maxTemp, 0) / weeklyForecast.length);
  const avgLow = Math.round(weeklyForecast.reduce((acc, day) => acc + day.minTemp, 0) / weeklyForecast.length);

  return (
    <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 glass rounded-xl">
            <CalendarDays className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">7-Day Forecast</h2>
            <p className="text-sm text-white/60">Extended weather outlook</p>
          </div>
        </div>
        
        {/* Mini Stats */}
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-white/60">Avg High</div>
            <div className="text-sm font-bold text-white">{avgHigh}°</div>
          </div>
          <div className="glass rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-white/60">Avg Low</div>
            <div className="text-sm font-bold text-white">{avgLow}°</div>
          </div>
        </div>
      </div>

      {/* Forecast Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {weeklyForecast.map((day, index) => (
          <ForecastCard
            key={index}
            date={day.date}
            maxTemp={day.maxTemp}
            minTemp={day.minTemp}
            weatherCode={day.weatherCode}
            delay={0.1 + index * 0.05}
          />
        ))}
      </div>

      {/* Weekly Summary */}
      <div className="mt-6 glass rounded-2xl p-4">
        <div className="flex items-center gap-2 text-white/80 mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">Weekly Summary</span>
        </div>
        <p className="text-sm text-white/60 leading-relaxed">
          Temperatures ranging from {Math.min(...weeklyForecast.map(d => d.minTemp))}° to {Math.max(...weeklyForecast.map(d => d.maxTemp))}° over the next week. 
          Expect {weeklyForecast.filter(d => d.weatherCode <= 3).length > 3 ? 'mostly clear' : 'variable'} conditions 
          with {weeklyForecast.filter(d => d.weatherCode >= 51).length > 0 ? 'some precipitation expected' : 'no significant precipitation'}.
        </p>
      </div>
    </div>
  );
}
