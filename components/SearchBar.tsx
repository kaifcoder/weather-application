"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Navigation } from "lucide-react";

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
        className={`glass-dark rounded-2xl p-2 transition-all duration-300 ${
          isFocused ? 'ring-2 ring-white/30 shadow-lg shadow-white/5' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 text-white/50">
            <Navigation className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12"
            disabled={loading}
          />
          <Button 
            type="submit" 
            disabled={loading || !city.trim()} 
            className="bg-white hover:bg-white/90 text-slate-900 h-11 px-5 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-900 rounded-full animate-spin" />
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
