"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className={`bg-slate-800/80 rounded-2xl p-2 transition-all duration-300 border border-slate-700 ${
          isFocused ? 'ring-2 ring-teal-500/30 border-teal-500/50 shadow-lg shadow-teal-500/10' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 text-teal-500/60">
            <MapPin className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-0 text-slate-200 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12"
            disabled={loading}
          />
          <Button 
            type="submit" 
            disabled={loading || !city.trim()} 
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 h-11 px-5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-600/50 border-t-slate-900 rounded-full animate-spin" />
                <span className="hidden sm:inline">Loading</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
