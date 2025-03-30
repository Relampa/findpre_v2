export type ValorantRank =
  | "Demir"
  | "Bronz"
  | "Gümüş"
  | "Altın"
  | "Platin"
  | "Elmas"
  | "Yükselen"
  | "Ölümsüzlük"
  | "Radyant";

export type GameMode = "Dereceli" | "Derecesiz" | "Spike Rush" | "Ölüm Maçı";

export interface Player {
  id: string;
  username: string;
  gameMode: GameMode;
  lobbyCode: string;
  minRank: ValorantRank;
  maxRank: ValorantRank;
  currentRank: ValorantRank;
  ageRange: string;
  lookingFor: number;
  createdAt: Date;
} 