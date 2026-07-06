"use client";

interface ForecastCardProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  delay?: number;
}

const weatherCodes: Record<number, { label: string; emoji: string; color: string }> = {
  0: { label: "Clear", emoji: "☀️", color: "from-orange-400 to-yellow-400" },
  1: { label: "Clear", emoji: "🌤️", color: "from-yellow-400 to-orange-300" },
  2: { label: "Partly Cloudy", emoji: "⛅", color: "from-blue-300 to-gray-300" },
  3: { label: "Cloudy", emoji: "☁️", color: "from-gray-400 to-gray-300" },
  45: { label: "Fog", emoji: "🌫️", color: "from-slate-400 to-gray-300" },
  48: { label: "Fog", emoji: "🌫️", color: "from-slate-400 to-gray-300" },
  51: { label: "Drizzle", emoji: "🌦️", color: "from-blue-400 to-cyan-300" },
  53: { label: "Drizzle", emoji: "🌧️", color: "from-blue-500 to-cyan-400" },
  55: { label: "Drizzle", emoji: "🌧️", color: "from-blue-600 to-cyan-500" },
  61: { label: "Rain", emoji: "🌧️", color: "from-blue-500 to-indigo-400" },
  63: { label: "Rain", emoji: "🌧️", color: "from-blue-600 to-indigo-500" },
  65: { label: "Heavy Rain", emoji: "⛈️", color: "from-indigo-600 to-purple-500" },
  71: { label: "Snow", emoji: "🌨️", color: "from-cyan-300 to-blue-200" },
  73: { label: "Snow", emoji: "🌨️", color: "from-cyan-400 to-blue-300" },
  75: { label: "Heavy Snow", emoji: "❄️", color: "from-cyan-500 to-blue-400" },
  77: { label: "Snow", emoji: "🌨️", color: "from-cyan-400 to-blue-300" },
  80: { label: "Showers", emoji: "🌦️", color: "from-blue-400 to-cyan-300" },
  81: { label: "Showers", emoji: "🌧️", color: "from-blue-500 to-indigo-400" },
  82: { label: "Heavy Showers", emoji: "⛈️", color: "from-indigo-500 to-purple-400" },
  85: { label: "Snow", emoji: "🌨️", color: "from-cyan-400 to-blue-300" },
  86: { label: "Heavy Snow", emoji: "❄️", color: "from-cyan-500 to-blue-400" },
  95: { label: "Thunder", emoji: "⚡", color: "from-purple-500 to-pink-400" },
  96: { label: "Thunder", emoji: "⛈️", color: "from-purple-600 to-pink-500" },
  99: { label: "Thunder", emoji: "🌩️", color: "from-purple-700 to-pink-600" },
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function ForecastCard({
  date,
  maxTemp,
  minTemp,
  weatherCode,
  delay = 0,
}: ForecastCardProps) {
  const weather = weatherCodes[weatherCode] || { label: "Unknown", emoji: "❓", color: "from-gray-400 to-gray-300" };
  
  const dateObj = new Date(date);
  const dayName = days[dateObj.getDay()];
  const fullDayName = fullDays[dateObj.getDay()];
  const isToday = new Date().toDateString() === dateObj.toDateString();
  const dayOfMonth = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });

  return (
    <div 
      className="group animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`glass rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-white/25 cursor-pointer ${
        isToday ? 'ring-2 ring-white/40 bg-white/20' : ''
      }`}>
        {/* Day Label */}
        <div className="mb-2">
          <div className={`text-sm font-bold ${isToday ? 'text-white' : 'text-white/90'}`}>
            {isToday ? 'Today' : dayName}
          </div>
          <div className="text-xs text-white/60">{month} {dayOfMonth}</div>
        </div>

        {/* Weather Icon */}
        <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${weather.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
          <span className="text-2xl">{weather.emoji}</span>
        </div>

        {/* Weather Label */}
        <div className="text-xs text-white/70 mb-3 truncate px-2" title={weather.label}>
          {weather.label}
        </div>

        {/* Temperature Range */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-lg font-bold text-white">{Math.round(maxTemp)}°</span>
          <span className="text-white/40">/</span>
          <span className="text-sm font-medium text-white/70">{Math.round(minTemp)}°</span>
        </div>

        {/* Temperature Bar */}
        <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
            style={{ 
              width: `${Math.max(20, Math.min(100, (maxTemp - minTemp) * 5 + 20))}%`,
              marginLeft: '10%'
            }}
          />
        </div>
      </div>
    </div>
  );
}
