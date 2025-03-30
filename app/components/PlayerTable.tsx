"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Player, GameMode, ValorantRank } from "../types/valorant";
import { AddPlayerModal } from "./AddPlayerModal";
import { AlertModal } from "./AlertModal";
import toast, { Toaster } from "react-hot-toast";
import { ranks } from "../constants/valorant";

interface PlayerTableProps {
  filters: {
    gameMode: GameMode;
    minRank: ValorantRank;
    maxRank: ValorantRank;
  };
}

export function PlayerTable({ filters }: PlayerTableProps) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = async () => {
    try {
      console.log("Fetching players...");
      const response = await fetch("/api/players");
      console.log("Response status:", response.status);
      
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${responseText}`);
      }
      
      const data = JSON.parse(responseText);
      console.log("Parsed data:", data);
      
      if (data.data) {
        setPlayers(data.data);
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching players:", err);
      setError(err instanceof Error ? err.message : "Failed to load players");
      toast.error("Oyuncular yüklenirken bir hata oluştu", {
        duration: 3000,
        position: "bottom-center",
        style: {
          background: "#1A1F2E",
          color: "#fff",
          border: "1px solid #374151",
        },
      });
    }
  };

  useEffect(() => {
    fetchPlayers();
    
    // Her 30 saniyede bir oyuncu listesini güncelle
    const interval = setInterval(fetchPlayers, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filtreler değiştiğinde oyuncuları yeniden getir
  useEffect(() => {
    fetchPlayers();
  }, [filters]);

  const handleAddClick = () => {
    if (!session) {
      setIsAlertOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAddPlayer = async (data: Omit<Player, "id" | "createdAt" | "userId" | "user">) => {
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add player");
      }

      const { data: newPlayer } = await response.json();
      setPlayers((prev) => [newPlayer, ...prev]);
      setIsModalOpen(false);
      toast.success("Oyuncu ilanı başarıyla eklendi!", {
        duration: 2000,
        position: "bottom-center",
        style: {
          background: "#1A1F2E",
          color: "#fff",
          border: "1px solid #374151",
        },
      });
    } catch (err) {
      console.error("Error adding player:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to add player";
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 3000,
        position: "bottom-center",
        style: {
          background: "#1A1F2E",
          color: "#fff",
          border: "1px solid #374151",
        },
      });
    }
  };

  const handleCopyLobbyCode = (lobbyCode: string) => {
    navigator.clipboard.writeText(lobbyCode);
    toast.success("Lobi kodu kopyalandı!", {
      duration: 2000,
      position: "bottom-center",
      style: {
        background: "#1A1F2E",
        color: "#fff",
        border: "1px solid #374151",
      },
    });
  };

  // Oyuncuları filtreleme
  const filteredPlayers = players.filter((player) => {
    const rankIndex = (rank: string) => ranks.indexOf(rank);
    const playerMinRankIndex = rankIndex(player.minRank);
    const playerMaxRankIndex = rankIndex(player.maxRank);
    const filterMinRankIndex = rankIndex(filters.minRank);
    const filterMaxRankIndex = rankIndex(filters.maxRank);

    return (
      player.gameMode === filters.gameMode &&
      playerMinRankIndex >= filterMinRankIndex &&
      playerMaxRankIndex <= filterMaxRankIndex
    );
  });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Aktif Oyuncular</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Oyuncu Ara
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-[#1A1F2E] text-gray-400">
            <tr>
              <th className="px-6 py-3">OYUN MODU</th>
              <th className="px-6 py-3">LOBİ KODU</th>
              <th className="px-6 py-3">MIN. - MAKS. RANK</th>
              <th className="px-6 py-3">YAŞ ARALIĞI</th>
              <th className="px-6 py-3">ARANAN</th>
              <th className="px-6 py-3">TARİH</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr
                key={player.id}
                className="border-b border-gray-700 hover:bg-[#1A1F2E]/50"
              >
                <td className="px-6 py-4">{player.gameMode}</td>
                <td 
                  className="px-6 py-4 text-blue-400 cursor-pointer hover:text-blue-300"
                  onClick={() => handleCopyLobbyCode(player.lobbyCode)}
                >
                  {player.lobbyCode}
                </td>
                <td className="px-6 py-4">
                  {player.minRank} - {player.maxRank}
                </td>
                <td className="px-6 py-4">{player.ageRange}</td>
                <td className="px-6 py-4">+{player.lookingFor}</td>
                <td className="px-6 py-4">
                  {new Date(player.createdAt).toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddPlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPlayer}
      />

      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Giriş Yapın"
        message="İlan eklemek için önce Google hesabınızla giriş yapmalısınız."
        actionText="Google ile Giriş Yap"
        onAction={() => signIn("google")}
      />

      <Toaster />
    </>
  );
} 