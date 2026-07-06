"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastGrid } from "@/components/ForecastGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Cloud } from "lucide-react";

interface WeatherData {
  city: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    isDay: number;
  };
  forecast: {
    date: string;
    maxTemp: number;
    minTemp: number;
    weatherCode: number;
  }[];
}

export function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordinates = async (city: string): Promise<{ lat: number; lon: number; name: string } | null> => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return null;
    }
    
    const result = data.results[0];
    return {
      lat: result.latitude,
      lon: result.longitude,
      name: result.name,
    };
  };

  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const data = await response.json();

    const current = data.current;
    const daily = data.daily;

    const forecast = daily.time.map((time: string, index: number) => ({
      date: time,
      maxTemp: daily.temperature_2m_max[index],
      minTemp: daily.temperature_2m_min[index],
      weatherCode: daily.weather_code[index],
    }));

    setWeatherData({
      city: cityName,
      current: {
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code,
        isDay: current.is_day,
      },
      forecast: forecast,
    });
  };

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const coords = await fetchCoordinates(city);
      if (!coords) {
        setError(`City "${city}" not found. Please try another city name.`);
        return;
      }

      await fetchWeather(coords.lat, coords.lon, coords.name);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-slate-800/80 rounded-2xl border border-teal-500/20">
            <Cloud className="w-7 h-7 md:w-8 md:h-8 text-teal-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-3 tracking-tight">
          Weather
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"> Dash</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Real-time weather insights and forecasts for any city worldwide
        </p>
      </div>

      {/* Search */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 max-w-md mx-auto animate-fade-in">
          <Alert className="bg-red-950/50 border-red-500/30 text-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Weather Content */}
      {weatherData && (
        <div className="mt-10 animate-slide-up">
          <CurrentWeather
            city={weatherData.city}
            temperature={weatherData.current.temperature}
            humidity={weatherData.current.humidity}
            windSpeed={weatherData.current.windSpeed}
            weatherCode={weatherData.current.weatherCode}
            isDay={weatherData.current.isDay}
          />
          <ForecastGrid forecast={weatherData.forecast} />
        </div>
      )}

      {/* Empty State */}
      {!weatherData && !error && !loading && (
        <div className="mt-16 md:mt-24 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-slate-800/80 rounded-3xl mb-6 animate-float border border-teal-500/20">
            <span className="text-5xl md:text-6xl">🌍</span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-2">
            Discover the Weather
          </h3>
          <p className="text-slate-500 text-sm md:text-base">
            Enter a city name to explore current conditions and forecasts
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Tokyo', 'Paris', 'New York', 'Sydney'].map((city) => (
              <button
                key={city}
                onClick={() => handleSearch(city)}
                className="px-4 py-2 bg-slate-800/80 rounded-full text-teal-300 text-sm border border-teal-500/30 hover:bg-teal-500/20 hover:border-teal-500/50 transition-all hover:text-teal-200"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/80 rounded-full border border-teal-500/20">
            <span className="w-4 h-4 border-2 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
            <span className="text-teal-300 text-sm">Fetching weather data...</span>
          </div>
        </div>
      )}
    </div>
  );
}
