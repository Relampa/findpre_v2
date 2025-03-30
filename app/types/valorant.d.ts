export type GameMode = "Dereceli" | "Derecesiz" | "Spike Rush" | "Ölüm Maçı";
export type ValorantRank = "Demir" | "Bronz" | "Gümüş" | "Altın" | "Platin" | "Elmas" | "Yükselen" | "Ölümsüzlük" | "Radyant";
export type AgeRange = "18-20" | "21-25" | "26-30" | "30+";

export interface Player {
  id: string;
  createdAt: Date;
  username: string;
  gameMode: GameMode;
  lobbyCode: string;
  minRank: ValorantRank;
  maxRank: ValorantRank;
  currentRank: ValorantRank;
  ageRange: AgeRange;
  lookingFor: number;
  userId: string;
  user?: {
    name?: string | null;
    image?: string | null;
  };
} 