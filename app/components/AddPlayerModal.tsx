"use client";

import { useState } from "react";
import { GameMode, Player, ValorantRank } from "../types/valorant";

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (player: Omit<Player, "id" | "createdAt">) => void;
}

export function AddPlayerModal({ isOpen, onClose, onAdd }: AddPlayerModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    gameMode: "Dereceli" as GameMode,
    lobbyCode: "",
    minRank: "Demir" as ValorantRank,
    maxRank: "Demir" as ValorantRank,
    currentRank: "Demir" as ValorantRank,
    ageRange: "Tümü",
    lookingFor: 1,
  });

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1A1F2E] rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Oyuncu ara</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Lobi kodu
            </label>
            <input
              type="text"
              value={formData.lobbyCode}
              onChange={(e) => setFormData({ ...formData, lobbyCode: e.target.value })}
              className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Oyun modu
            </label>
            <select
              value={formData.gameMode}
              onChange={(e) => setFormData({ ...formData, gameMode: e.target.value as GameMode })}
              className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {gameModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Minimum Rank
              </label>
              <select
                value={formData.minRank}
                onChange={(e) => setFormData({ ...formData, minRank: e.target.value as ValorantRank })}
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
                value={formData.maxRank}
                onChange={(e) => setFormData({ ...formData, maxRank: e.target.value as ValorantRank })}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Oyuncu sayısı
              </label>
              <select
                value={formData.lookingFor}
                onChange={(e) => setFormData({ ...formData, lookingFor: Number(e.target.value) })}
                className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Yaş aralığı
              </label>
              <select
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                className="w-full bg-[#0B0E14] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Tümü">Tümü</option>
                <option value="16-20">16-20</option>
                <option value="21-25">21-25</option>
                <option value="26+">26+</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium mt-4"
          >
            Ara
          </button>
        </form>
      </div>
    </div>
  );
} 