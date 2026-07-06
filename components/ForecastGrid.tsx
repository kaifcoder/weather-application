"use client";

import { ForecastCard } from "@/components/ForecastCard";
import { CalendarDays } from "lucide-react";

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
  const weeklyForecast = forecast.slice(0, 7);
  
  const avgHigh = Math.round(weeklyForecast.reduce((acc, day) => acc + day.maxTemp, 0) / weeklyForecast.length);
  const avgLow = Math.round(weeklyForecast.reduce((acc, day) => acc + day.minTemp, 0) / weeklyForecast.length);

  return (
    <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700/50">
            <CalendarDays className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-200">7-Day Forecast</h2>
            <p className="text-sm text-slate-500">Extended weather outlook</p>
          </div>
        </div>
        
        {/* Mini Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 rounded-xl px-4 py-2 text-center border border-slate-700/50">
            <div className="text-xs text-slate-500 uppercase tracking-wide">Avg High</div>
            <div className="text-sm font-bold text-teal-400">{avgHigh}°</div>
          </div>
          <div className="bg-slate-800/80 rounded-xl px-4 py-2 text-center border border-slate-700/50">
            <div className="text-xs text-slate-500 uppercase tracking-wide">Avg Low</div>
            <div className="text-sm font-bold text-cyan-400">{avgLow}°</div>
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
      <div className="mt-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
        <div className="flex items-center gap-2 text-teal-400 mb-2">
          <span className="text-sm font-semibold">Weekly Summary</span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Temperatures ranging from <span className="text-cyan-400 font-medium">{Math.min(...weeklyForecast.map(d => d.minTemp))}°</span> to <span className="text-teal-400 font-medium">{Math.max(...weeklyForecast.map(d => d.maxTemp))}°</span> over the next week. 
          Expect {weeklyForecast.filter(d => d.weatherCode <= 3).length > 3 ? 'mostly clear' : 'variable'} conditions.
        </p>
      </div>
    </div>
  );
}
