"use client";

import { PlayerSearch } from "./components/PlayerSearch";
import { PlayerTable } from "./components/PlayerTable";
import { AuthButton } from "./components/AuthButton";
import { useState } from "react";
import { GameMode, ValorantRank } from "./types/valorant";

export default function Home() {
  const [filters, setFilters] = useState({
    gameMode: "Dereceli" as GameMode,
    minRank: "Demir" as ValorantRank,
    maxRank: "Radyant" as ValorantRank,
  });

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Findpre.com</h1>
          <p className="text-gray-400">Valorant Oyuncu Bulma Platformu</p>
        </div>
        <div>
          <AuthButton />
        </div>
      </header>

      <PlayerSearch filters={filters} onApplyFilters={handleApplyFilters} />
      <PlayerTable filters={filters} />
    </div>
  );
}
