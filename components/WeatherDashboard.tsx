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
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Cloud className="w-10 h-10 md:w-12 md:h-12" />
          Weather Dashboard
        </h1>
        <p className="text-white/80 text-lg">
          Check current conditions and 7-day forecast for any city
        </p>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="mt-6 max-w-md mx-auto">
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {weatherData && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-md mx-auto">
            <CurrentWeather
              city={weatherData.city}
              temperature={weatherData.current.temperature}
              humidity={weatherData.current.humidity}
              windSpeed={weatherData.current.windSpeed}
              weatherCode={weatherData.current.weatherCode}
              isDay={weatherData.current.isDay}
            />
          </div>
          <ForecastGrid forecast={weatherData.forecast} />
        </div>
      )}

      {!weatherData && !error && !loading && (
        <div className="mt-16 text-center">
          <div className="text-6xl mb-4">🌍</div>
          <p className="text-white/70 text-lg">
            Enter a city name above to get started
          </p>
        </div>
      )}
    </div>
  );
}
