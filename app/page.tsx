"use client";

import { WeatherDashboard } from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-400 via-blue-500 via-indigo-500 to-purple-600" />
      
      {/* Animated decorative blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="fixed bottom-0 right-0 w-[30rem] h-[30rem] bg-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-cyan-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10">
        <WeatherDashboard />
      </div>
    </main>
  );
}
