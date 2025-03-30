import { GameMode, ValorantRank } from "../types/valorant";

export const ranks: ValorantRank[] = [
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

export const gameModes: GameMode[] = [
  "Dereceli",
  "Derecesiz",
  "Spike Rush",
  "Ölüm Maçı",
];

export const ageRanges = [
  "Tümü",
  "16-20",
  "21-25",
  "26+",
] as const;

export type AgeRange = typeof ageRanges[number]; 