"use client";

import { WeatherDashboard } from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0f1419]">
      {/* Dark gradient background with teal accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900" />
      
      {/* Teal/cyan accent glows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse-soft" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1s' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-800/50 rounded-full blur-[150px]" />
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-[15%] w-3 h-3 bg-teal-400/40 rounded-full animate-float" />
      <div className="fixed top-40 right-[20%] w-2 h-2 bg-cyan-400/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-32 left-[25%] w-4 h-4 bg-emerald-400/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10">
        <WeatherDashboard />
      </div>
    </main>
  );
}
