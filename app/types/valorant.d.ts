export interface Player {
  id: string;
  createdAt: string;
  username: string;
  gameMode: string;
  lobbyCode: string;
  minRank: string;
  maxRank: string;
  currentRank: string;
  ageRange: string;
  lookingFor: number;
  userId: string;
  user?: {
    name: string | null;
    image: string | null;
  };
} 