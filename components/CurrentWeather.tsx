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

const weatherCodes: Record<number, { label: string; emoji: string; gradient: string; bgAccent: string }> = {
  0: { label: "Clear Sky", emoji: "☀️", gradient: "from-amber-500 to-orange-500", bgAccent: "bg-amber-500/10" },
  1: { label: "Clear", emoji: "🌤️", gradient: "from-amber-400 to-yellow-400", bgAccent: "bg-amber-400/10" },
  2: { label: "Cloudy", emoji: "⛅", gradient: "from-slate-400 to-slate-500", bgAccent: "bg-slate-400/10" },
  3: { label: "Overcast", emoji: "☁️", gradient: "from-slate-500 to-slate-600", bgAccent: "bg-slate-500/10" },
  45: { label: "Foggy", emoji: "🌫️", gradient: "from-slate-400 to-gray-500", bgAccent: "bg-slate-400/10" },
  48: { label: "Fog", emoji: "🌫️", gradient: "from-slate-400 to-gray-500", bgAccent: "bg-slate-400/10" },
  51: { label: "Drizzle", emoji: "🌦️", gradient: "from-teal-400 to-cyan-500", bgAccent: "bg-teal-400/10" },
  53: { label: "Drizzle", emoji: "🌧️", gradient: "from-teal-500 to-cyan-600", bgAccent: "bg-teal-500/10" },
  55: { label: "Drizzle", emoji: "🌧️", gradient: "from-cyan-500 to-blue-600", bgAccent: "bg-cyan-500/10" },
  61: { label: "Light Rain", emoji: "🌧️", gradient: "from-blue-400 to-cyan-500", bgAccent: "bg-blue-400/10" },
  63: { label: "Rain", emoji: "🌧️", gradient: "from-blue-500 to-teal-500", bgAccent: "bg-blue-500/10" },
  65: { label: "Heavy Rain", emoji: "⛈️", gradient: "from-blue-600 to-purple-600", bgAccent: "bg-blue-600/10" },
  71: { label: "Snow", emoji: "🌨️", gradient: "from-cyan-300 to-blue-400", bgAccent: "bg-cyan-300/10" },
  73: { label: "Snow", emoji: "🌨️", gradient: "from-cyan-400 to-blue-500", bgAccent: "bg-cyan-400/10" },
  75: { label: "Heavy Snow", emoji: "❄️", gradient: "from-cyan-500 to-blue-600", bgAccent: "bg-cyan-500/10" },
  77: { label: "Snow", emoji: "🌨️", gradient: "from-cyan-400 to-blue-500", bgAccent: "bg-cyan-400/10" },
  80: { label: "Showers", emoji: "🌦️", gradient: "from-teal-400 to-blue-500", bgAccent: "bg-teal-400/10" },
  81: { label: "Showers", emoji: "🌧️", gradient: "from-blue-500 to-cyan-600", bgAccent: "bg-blue-500/10" },
  82: { label: "Heavy Showers", emoji: "⛈️", gradient: "from-blue-600 to-purple-500", bgAccent: "bg-blue-600/10" },
  85: { label: "Snow", emoji: "🌨️", gradient: "from-cyan-400 to-blue-500", bgAccent: "bg-cyan-400/10" },
  86: { label: "Heavy Snow", emoji: "❄️", gradient: "from-cyan-500 to-blue-600", bgAccent: "bg-cyan-500/10" },
  95: { label: "Thunderstorm", emoji: "⚡", gradient: "from-purple-500 to-pink-500", bgAccent: "bg-purple-500/10" },
  96: { label: "Thunderstorm", emoji: "⛈️", gradient: "from-purple-600 to-pink-600", bgAccent: "bg-purple-600/10" },
  99: { label: "Severe Storm", emoji: "🌩️", gradient: "from-purple-700 to-pink-700", bgAccent: "bg-purple-700/10" },
};

export function CurrentWeather({
  city,
  temperature,
  humidity,
  windSpeed,
  weatherCode,
  isDay,
}: CurrentWeatherProps) {
  const weather = weatherCodes[weatherCode] || { label: "Unknown", emoji: "❓", gradient: "from-slate-500 to-gray-500", bgAccent: "bg-slate-500/10" };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/40">
        {/* Weather Header */}
        <div className={`${weather.bgAccent} p-6 sm:p-8 border-b border-slate-800/50`}>
          <div className="flex items-center gap-2 text-teal-400/80 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Current Weather</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">{city}</h2>
        </div>

        {/* Main Weather Display */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Weather Icon & Condition */}
            <div className="text-center sm:text-left">
              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${weather.gradient} flex items-center justify-center shadow-lg mb-3`}>
                <span className="text-5xl sm:text-6xl">{weather.emoji}</span>
              </div>
              <div className="text-base font-medium text-teal-300">{weather.label}</div>
            </div>

            {/* Temperature */}
            <div className="flex-1 text-center sm:text-right">
              <div className="text-6xl sm:text-7xl font-bold text-slate-100 tracking-tight">
                {Math.round(temperature)}°
              </div>
              <div className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 bg-slate-800 rounded-full text-sm text-slate-400">
                {isDay ? (
                  <><Sun className="w-4 h-4 text-amber-500" /> Daytime</>
                ) : (
                  <><Moon className="w-4 h-4 text-indigo-400" /> Night</>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-8 border-t border-slate-800/50">
            <div className="text-center p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800 transition-colors border border-slate-700/50">
              <div className="w-10 h-10 mx-auto mb-3 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-slate-200">{Math.round(temperature)}°</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Feels Like</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800 transition-colors border border-slate-700/50">
              <div className="w-10 h-10 mx-auto mb-3 bg-teal-500/20 rounded-xl flex items-center justify-center">
                <Droplets className="w-5 h-5 text-teal-400" />
              </div>
              <div className="text-2xl font-bold text-slate-200">{humidity}%</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Humidity</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-2xl hover:bg-slate-800 transition-colors border border-slate-700/50">
              <div className="w-10 h-10 mx-auto mb-3 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Wind className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-slate-200">{Math.round(windSpeed)}</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">km/h Wind</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
