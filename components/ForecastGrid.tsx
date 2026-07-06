"use client";

import { ForecastCard } from "@/components/ForecastCard";

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
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        7-Day Forecast
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <ForecastCard
            key={index}
            date={day.date}
            maxTemp={day.maxTemp}
            minTemp={day.minTemp}
            weatherCode={day.weatherCode}
          />
        ))}
      </div>
    </div>
  );
}
