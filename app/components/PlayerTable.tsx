"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Player } from "../types/valorant";
import { AddPlayerModal } from "./AddPlayerModal";
import { AlertModal } from "./AlertModal";
import toast, { Toaster } from "react-hot-toast";

export function PlayerTable() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  // Sayfa yüklendiğinde oyuncuları getir
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch("/api/players");
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Oyuncular yüklenirken hata oluştu:", error);
    }
  };

  const handleAddPlayer = async (newPlayer: Omit<Player, "id" | "createdAt">) => {
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        throw new Error("Oyuncu eklenirken bir hata oluştu");
      }

      const addedPlayer = await response.json();
      setPlayers([addedPlayer, ...players]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Oyuncu eklenirken hata oluştu:", error);
    }
  };

  const handleAddClick = () => {
    if (!session) {
      setIsAlertOpen(true);
    } else {
      setIsModalOpen(true);
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

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Aktif Oyuncular</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Oyuncu Ara
        </button>
      </div>

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
            {players.map((player) => (
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