"use client";

interface ForecastCardProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  delay?: number;
}

const weatherCodes: Record<number, { label: string; emoji: string; color: string }> = {
  0: { label: "Clear", emoji: "☀️", color: "from-amber-500 to-orange-500" },
  1: { label: "Clear", emoji: "🌤️", color: "from-amber-400 to-yellow-400" },
  2: { label: "Cloudy", emoji: "⛅", color: "from-slate-400 to-slate-500" },
  3: { label: "Cloudy", emoji: "☁️", color: "from-slate-500 to-slate-600" },
  45: { label: "Fog", emoji: "🌫️", color: "from-slate-400 to-gray-500" },
  48: { label: "Fog", emoji: "🌫️", color: "from-slate-400 to-gray-500" },
  51: { label: "Drizzle", emoji: "🌦️", color: "from-teal-400 to-cyan-500" },
  53: { label: "Drizzle", emoji: "🌧️", color: "from-teal-500 to-cyan-600" },
  55: { label: "Drizzle", emoji: "🌧️", color: "from-cyan-500 to-blue-600" },
  61: { label: "Rain", emoji: "🌧️", color: "from-blue-400 to-cyan-500" },
  63: { label: "Rain", emoji: "🌧️", color: "from-blue-500 to-teal-500" },
  65: { label: "Heavy Rain", emoji: "⛈️", color: "from-blue-600 to-purple-600" },
  71: { label: "Snow", emoji: "🌨️", color: "from-cyan-300 to-blue-400" },
  73: { label: "Snow", emoji: "🌨️", color: "from-cyan-400 to-blue-500" },
  75: { label: "Heavy Snow", emoji: "❄️", color: "from-cyan-500 to-blue-600" },
  77: { label: "Snow", emoji: "🌨️", color: "from-cyan-400 to-blue-500" },
  80: { label: "Showers", emoji: "🌦️", color: "from-teal-400 to-blue-500" },
  81: { label: "Showers", emoji: "🌧️", color: "from-blue-500 to-cyan-600" },
  82: { label: "Heavy Showers", emoji: "⛈️", color: "from-blue-600 to-purple-500" },
  85: { label: "Snow", emoji: "🌨️", color: "from-cyan-400 to-blue-500" },
  86: { label: "Heavy Snow", emoji: "❄️", color: "from-cyan-500 to-blue-600" },
  95: { label: "Thunder", emoji: "⚡", color: "from-purple-500 to-pink-500" },
  96: { label: "Thunder", emoji: "⛈️", color: "from-purple-600 to-pink-600" },
  99: { label: "Thunder", emoji: "🌩️", color: "from-purple-700 to-pink-700" },
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ForecastCard({
  date,
  maxTemp,
  minTemp,
  weatherCode,
  delay = 0,
}: ForecastCardProps) {
  const weather = weatherCodes[weatherCode] || { label: "Unknown", emoji: "❓", color: "from-slate-500 to-gray-500" };
  
  const dateObj = new Date(date);
  const dayName = days[dateObj.getDay()];
  const isToday = new Date().toDateString() === dateObj.toDateString();
  const dayOfMonth = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });

  return (
    <div 
      className="group animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-slate-800 cursor-pointer border border-slate-700/50 hover:border-teal-500/30 ${
        isToday ? 'ring-2 ring-teal-500/40 bg-slate-800' : ''
      }`}>
        {/* Day Label */}
        <div className="mb-2">
          <div className={`text-sm font-bold ${isToday ? 'text-teal-400' : 'text-slate-300'}`}>
            {isToday ? 'Today' : dayName}
          </div>
          <div className="text-xs text-slate-500">{month} {dayOfMonth}</div>
        </div>

        {/* Weather Icon */}
        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${weather.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
          <span className="text-xl">{weather.emoji}</span>
        </div>

        {/* Weather Label */}
        <div className="text-xs text-slate-500 mb-3 truncate px-2" title={weather.label}>
          {weather.label}
        </div>

        {/* Temperature Range */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-lg font-bold text-slate-200">{Math.round(maxTemp)}°</span>
          <span className="text-slate-600">/</span>
          <span className="text-sm font-medium text-slate-500">{Math.round(minTemp)}°</span>
        </div>

        {/* Temperature Bar */}
        <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
            style={{ 
              width: `${Math.max(25, Math.min(100, (maxTemp - minTemp) * 4 + 25))}%`,
              marginLeft: '15%'
            }}
          />
        </div>
      </div>
    </div>
  );
}
