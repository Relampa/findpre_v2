export const ranks = [
  "Demir",
  "Bronz",
  "Gümüş",
  "Altın",
  "Platin",
  "Elmas",
  "Yükselen",
  "Ölümsüzlük",
  "Radyant",
] as const;

export const gameModes = [
  "Dereceli",
  "Derecesiz",
  "Spike Rush",
  "Ölüm Maçı",
] as const;

export const ageRanges = [
  "Tümü",
  "16-20",
  "21-25",
  "26+",
] as const;

export type ValorantRank = typeof ranks[number];
export type GameMode = typeof gameModes[number];
export type AgeRange = typeof ageRanges[number]; 