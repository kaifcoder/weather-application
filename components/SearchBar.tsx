"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 bg-white/90 border-0 text-slate-900 placeholder:text-slate-500"
        disabled={loading}
      />
      <Button type="submit" disabled={loading || !city.trim()} className="bg-white text-blue-600 hover:bg-white/90">
        <Search className="w-4 h-4 mr-2" />
        {loading ? "Loading..." : "Search"}
      </Button>
    </form>
  );
}
