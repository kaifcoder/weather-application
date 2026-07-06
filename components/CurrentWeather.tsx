"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind, Thermometer, MapPin } from "lucide-react";

interface CurrentWeatherProps {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: number;
}

const weatherCodes: Record<number, { label: string; emoji: string }> = {
  0: { label: "Clear sky", emoji: "☀️" },
  1: { label: "Mainly clear", emoji: "🌤️" },
  2: { label: "Partly cloudy", emoji: "⛅" },
  3: { label: "Overcast", emoji: "☁️" },
  45: { label: "Fog", emoji: "🌫️" },
  48: { label: "Depositing rime fog", emoji: "🌫️" },
  51: { label: "Light drizzle", emoji: "🌧️" },
  53: { label: "Moderate drizzle", emoji: "🌧️" },
  55: { label: "Dense drizzle", emoji: "🌧️" },
  61: { label: "Slight rain", emoji: "🌧️" },
  63: { label: "Moderate rain", emoji: "🌧️" },
  65: { label: "Heavy rain", emoji: "🌧️" },
  71: { label: "Slight snow", emoji: "🌨️" },
  73: { label: "Moderate snow", emoji: "🌨️" },
  75: { label: "Heavy snow", emoji: "🌨️" },
  77: { label: "Snow grains", emoji: "🌨️" },
  80: { label: "Slight rain showers", emoji: "🌦️" },
  81: { label: "Moderate rain showers", emoji: "🌦️" },
  82: { label: "Violent rain showers", emoji: "⛈️" },
  85: { label: "Slight snow showers", emoji: "🌨️" },
  86: { label: "Heavy snow showers", emoji: "🌨️" },
  95: { label: "Thunderstorm", emoji: "⛈️" },
  96: { label: "Thunderstorm with hail", emoji: "⛈️" },
  99: { label: "Thunderstorm with heavy hail", emoji: "⛈️" },
};

export function CurrentWeather({
  city,
  temperature,
  humidity,
  windSpeed,
  weatherCode,
  isDay,
}: CurrentWeatherProps) {
  const weather = weatherCodes[weatherCode] || { label: "Unknown", emoji: "❓" };

  return (
    <Card className="bg-white/95 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-slate-800">
          <MapPin className="w-6 h-6 text-blue-500" />
          {city}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-2">{weather.emoji}</div>
            <div className="text-xl text-slate-600 font-medium">
              {weather.label}
            </div>
            {isDay === 0 && (
              <div className="text-sm text-slate-500">Night time</div>
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-slate-900">
            {Math.round(temperature)}°C
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col items-center gap-2">
            <Thermometer className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-slate-600">Temperature</span>
            <span className="font-semibold text-slate-900">
              {Math.round(temperature)}°C
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-slate-600">Humidity</span>
            <span className="font-semibold text-slate-900">{humidity}%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Wind className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-slate-600">Wind</span>
            <span className="font-semibold text-slate-900">
              {Math.round(windSpeed)} km/h
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
