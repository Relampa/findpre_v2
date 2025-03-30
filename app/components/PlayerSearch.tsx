"use client";

import { useState } from "react";
import { GameMode, ValorantRank } from "../types/valorant";

export function PlayerSearch() {
  const [gameMode, setGameMode] = useState<GameMode>("Dereceli");
  const [minRank, setMinRank] = useState<ValorantRank>("Demir");
  const [maxRank, setMaxRank] = useState<ValorantRank>("Radyant");

  const ranks: ValorantRank[] = [
    "Demir",
    "Bronz",
    "Gümüş",
    "Altın",
    "Platin",
    "Elmas",
    "Yükselen",
    "Ölümsüzlük",
    "Radyant",
  ];

  const gameModes: GameMode[] = ["Dereceli", "Derecesiz", "Spike Rush", "Ölüm Maçı"];

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
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium">
          Uygula / Yenile
        </button>
      </div>
    </div>
  );
} 