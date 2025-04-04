"use client";

import { useState, useEffect } from "react";
import { GameMode, ValorantRank } from "../types/valorant";
import { ranks, gameModes } from "../constants/valorant";

interface PlayerSearchProps {
  filters: {
    gameMode: GameMode;
    minRank: ValorantRank;
    maxRank: ValorantRank;
  };
  onApplyFilters: (filters: {
    gameMode: GameMode;
    minRank: ValorantRank;
    maxRank: ValorantRank;
  }) => void;
}

export function PlayerSearch({ filters, onApplyFilters }: PlayerSearchProps) {
  const [gameMode, setGameMode] = useState<GameMode>(filters.gameMode);
  const [minRank, setMinRank] = useState<ValorantRank>(filters.minRank);
  const [maxRank, setMaxRank] = useState<ValorantRank>(filters.maxRank);

  // Dışarıdan gelen filtreler değiştiğinde state'i güncelle
  useEffect(() => {
    setGameMode(filters.gameMode);
    setMinRank(filters.minRank);
    setMaxRank(filters.maxRank);
  }, [filters]);

  const handleApply = () => {
    onApplyFilters({
      gameMode,
      minRank,
      maxRank,
    });
  };

  return (
    <div className="bg-[#1A1F2E] rounded-lg p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Oyun Modu
          </label>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {gameModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Minimum Rank
          </label>
          <select
            value={minRank}
            onChange={(e) => setMinRank(e.target.value as ValorantRank)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {ranks.map((rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Maksimum Rank
          </label>
          <select
            value={maxRank}
            onChange={(e) => setMaxRank(e.target.value as ValorantRank)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {ranks.map((rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <button 
          onClick={handleApply}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-md font-medium transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          Uygula / Yenile
        </button>
      </div>
    </div>
  );
} 