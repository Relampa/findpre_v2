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
    <div className="bg-[#1A1F2E] rounded-lg p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Oyun Modu
          </label>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {gameModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Minimum Rank
          </label>
          <select
            value={minRank}
            onChange={(e) => setMinRank(e.target.value as ValorantRank)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ranks.map((rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Maksimum Rank
          </label>
          <select
            value={maxRank}
            onChange={(e) => setMaxRank(e.target.value as ValorantRank)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ranks.map((rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleApply}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium"
        >
          Uygula / Yenile
        </button>
      </div>
    </div>
  );
} 