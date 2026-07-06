"use client";

import { Droplets, Wind, Thermometer, MapPin, Sun, Moon } from "lucide-react";

interface CurrentWeatherProps {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: number;
}

const weatherCodes: Record<number, { label: string; emoji: string; gradient: string }> = {
  0: { label: "Clear Sky", emoji: "☀️", gradient: "from-orange-400/20 to-yellow-300/20" },
  1: { label: "Mainly Clear", emoji: "🌤️", gradient: "from-yellow-400/20 to-orange-300/20" },
  2: { label: "Partly Cloudy", emoji: "⛅", gradient: "from-blue-300/20 to-gray-200/20" },
  3: { label: "Overcast", emoji: "☁️", gradient: "from-gray-400/20 to-gray-300/20" },
  45: { label: "Foggy", emoji: "🌫️", gradient: "from-slate-400/20 to-gray-300/20" },
  48: { label: "Rime Fog", emoji: "🌫️", gradient: "from-slate-400/20 to-gray-300/20" },
  51: { label: "Light Drizzle", emoji: "🌦️", gradient: "from-blue-400/20 to-cyan-300/20" },
  53: { label: "Drizzle", emoji: "🌧️", gradient: "from-blue-500/20 to-cyan-400/20" },
  55: { label: "Heavy Drizzle", emoji: "🌧️", gradient: "from-blue-600/20 to-cyan-500/20" },
  61: { label: "Light Rain", emoji: "🌧️", gradient: "from-blue-500/20 to-indigo-400/20" },
  63: { label: "Rain", emoji: "🌧️", gradient: "from-blue-600/20 to-indigo-500/20" },
  65: { label: "Heavy Rain", emoji: "⛈️", gradient: "from-indigo-600/20 to-purple-500/20" },
  71: { label: "Light Snow", emoji: "🌨️", gradient: "from-cyan-300/20 to-blue-200/20" },
  73: { label: "Snow", emoji: "🌨️", gradient: "from-cyan-400/20 to-blue-300/20" },
  75: { label: "Heavy Snow", emoji: "❄️", gradient: "from-cyan-500/20 to-blue-400/20" },
  77: { label: "Snow Grains", emoji: "🌨️", gradient: "from-cyan-400/20 to-blue-300/20" },
  80: { label: "Light Showers", emoji: "🌦️", gradient: "from-blue-400/20 to-cyan-300/20" },
  81: { label: "Showers", emoji: "🌧️", gradient: "from-blue-500/20 to-indigo-400/20" },
  82: { label: "Heavy Showers", emoji: "⛈️", gradient: "from-indigo-500/20 to-purple-400/20" },
  85: { label: "Snow Showers", emoji: "🌨️", gradient: "from-cyan-400/20 to-blue-300/20" },
  86: { label: "Heavy Snow", emoji: "❄️", gradient: "from-cyan-500/20 to-blue-400/20" },
  95: { label: "Thunderstorm", emoji: "⚡", gradient: "from-purple-500/20 to-pink-400/20" },
  96: { label: "Thunderstorm", emoji: "⛈️", gradient: "from-purple-600/20 to-pink-500/20" },
  99: { label: "Severe Thunderstorm", emoji: "🌩️", gradient: "from-purple-700/20 to-pink-600/20" },
};

export function CurrentWeather({
  city,
  temperature,
  humidity,
  windSpeed,
  weatherCode,
  isDay,
}: CurrentWeatherProps) {
  const weather = weatherCodes[weatherCode] || { label: "Unknown", emoji: "❓", gradient: "from-gray-400/20 to-gray-300/20" };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
        {/* Weather Header with Gradient */}
        <div className={`bg-gradient-to-br ${weather.gradient} p-6 sm:p-8`}>
          <div className="flex items-center gap-2 text-slate-600/70 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Current Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">{city}</h2>
        </div>

        {/* Main Weather Display */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Weather Icon & Condition */}
            <div className="text-center sm:text-left">
              <div className="text-7xl sm:text-8xl mb-2 animate-float">{weather.emoji}</div>
              <div className="text-lg font-medium text-slate-600">{weather.label}</div>
            </div>

            {/* Temperature */}
            <div className="flex-1 text-center sm:text-right">
              <div className="text-6xl sm:text-7xl font-bold text-slate-800 tracking-tight">
                {Math.round(temperature)}°
              </div>
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600">
                {isDay ? (
                  <><Sun className="w-3.5 h-3.5 text-amber-500" /> Daytime</>
                ) : (
                  <><Moon className="w-3.5 h-3.5 text-indigo-500" /> Night</>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="text-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 mx-auto mb-2 bg-orange-100 rounded-xl flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{Math.round(temperature)}°</div>
              <div className="text-xs text-slate-500 font-medium">Feels Like</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-xl flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{humidity}%</div>
              <div className="text-xs text-slate-500 font-medium">Humidity</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 mx-auto mb-2 bg-teal-100 rounded-xl flex items-center justify-center">
                <Wind className="w-5 h-5 text-teal-500" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{Math.round(windSpeed)}</div>
              <div className="text-xs text-slate-500 font-medium">km/h Wind</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
