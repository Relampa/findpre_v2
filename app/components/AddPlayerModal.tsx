"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Player, GameMode, ValorantRank, AgeRange } from "../types/valorant";
import { ranks, gameModes, ageRanges } from "../constants/valorant";

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (player: Omit<Player, "id" | "createdAt" | "userId" | "user">) => void;
}

export function AddPlayerModal({ isOpen, onClose, onAdd }: AddPlayerModalProps) {
  const [formData, setFormData] = useState<{
    gameMode: GameMode;
    lobbyCode: string;
    minRank: ValorantRank;
    maxRank: ValorantRank;
    ageRange: AgeRange;
    lookingFor: number;
  }>({
    gameMode: gameModes[0],
    lobbyCode: "",
    minRank: ranks[0],
    maxRank: ranks[0],
    ageRange: ageRanges[0],
    lookingFor: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      currentRank: formData.minRank,
      username: "", // This will be set by the server
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1A1F2E] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white mb-4"
                >
                  Oyuncu İlanı Ekle
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Oyun Modu
                    </label>
                    <select
                      value={formData.gameMode}
                      onChange={(e) =>
                        setFormData({ ...formData, gameMode: e.target.value as GameMode })
                      }
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#111827] text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {gameModes.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Lobi Kodu
                    </label>
                    <input
                      type="text"
                      value={formData.lobbyCode}
                      onChange={(e) =>
                        setFormData({ ...formData, lobbyCode: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#111827] text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400">
                        Minimum Rank
                      </label>
                      <select
                        value={formData.minRank}
                        onChange={(e) =>
                          setFormData({ ...formData, minRank: e.target.value as ValorantRank })
                        }
                        className="mt-1 block w-full rounded-md border-gray-600 bg-[#111827] text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {ranks.map((rank) => (
                          <option key={rank} value={rank}>
                            {rank}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400">
                        Maksimum Rank
                      </label>
                      <select
                        value={formData.maxRank}
                        onChange={(e) =>
                          setFormData({ ...formData, maxRank: e.target.value as ValorantRank })
                        }
                        className="mt-1 block w-full rounded-md border-gray-600 bg-[#111827] text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {ranks.map((rank) => (
                          <option key={rank} value={rank}>
                            {rank}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Yaş Aralığı
                    </label>
                    <select
                      value={formData.ageRange}
                      onChange={(e) =>
                        setFormData({ ...formData, ageRange: e.target.value as AgeRange })
                      }
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#111827] text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {ageRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Aranan Oyuncu Sayısı
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={formData.lookingFor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lookingFor: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#111827] text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      Ekle
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 