"use client";

import { WeatherDashboard } from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-4">
      <WeatherDashboard />
    </main>
  );
}
