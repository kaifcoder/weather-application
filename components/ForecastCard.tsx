"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ForecastCardProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

const weatherCodes: Record<number, { label: string; emoji: string }> = {
  0: { label: "Clear", emoji: "☀️" },
  1: { label: "Mainly clear", emoji: "🌤️" },
  2: { label: "Partly cloudy", emoji: "⛅" },
  3: { label: "Overcast", emoji: "☁️" },
  45: { label: "Fog", emoji: "🌫️" },
  48: { label: "Rime fog", emoji: "🌫️" },
  51: { label: "Drizzle", emoji: "🌧️" },
  53: { label: "Drizzle", emoji: "🌧️" },
  55: { label: "Drizzle", emoji: "🌧️" },
  61: { label: "Rain", emoji: "🌧️" },
  63: { label: "Rain", emoji: "🌧️" },
  65: { label: "Heavy rain", emoji: "🌧️" },
  71: { label: "Snow", emoji: "🌨️" },
  73: { label: "Snow", emoji: "🌨️" },
  75: { label: "Heavy snow", emoji: "🌨️" },
  77: { label: "Snow grains", emoji: "🌨️" },
  80: { label: "Showers", emoji: "🌦️" },
  81: { label: "Showers", emoji: "🌦️" },
  82: { label: "Heavy showers", emoji: "⛈️" },
  85: { label: "Snow showers", emoji: "🌨️" },
  86: { label: "Heavy snow", emoji: "🌨️" },
  95: { label: "Thunderstorm", emoji: "⛈️" },
  96: { label: "Thunderstorm", emoji: "⛈️" },
  99: { label: "Thunderstorm", emoji: "⛈️" },
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ForecastCard({
  date,
  maxTemp,
  minTemp,
  weatherCode,
}: ForecastCardProps) {
  const weather = weatherCodes[weatherCode] || { label: "Unknown", emoji: "❓" };
  
  const dateObj = new Date(date);
  const dayName = days[dateObj.getDay()];
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="bg-white/90 border-0 hover:bg-white transition-colors">
      <CardContent className="p-4 text-center">
        <div className="font-semibold text-slate-800 mb-1">{dayName}</div>
        <div className="text-sm text-slate-500 mb-3">{formattedDate}</div>
        <div className="text-4xl mb-2">{weather.emoji}</div>
        <div className="text-sm text-slate-600 mb-2">{weather.label}</div>
        <div className="flex justify-center gap-2">
          <span className="font-bold text-slate-900">{Math.round(maxTemp)}°</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600">{Math.round(minTemp)}°</span>
        </div>
      </CardContent>
    </Card>
  );
}
