export interface User {
  name: string | null;
  profilePicture: string | null;
  createdAt: Date;
  points: number;
  clicks: number;
  maxPoints: number;
  multiplier: number;
  perSecond: number;
  inventory: {
    [itemName: string]: number;
  };
  achievements: string[];
  newAchievements: number;
  audioVolume: number;
  musicVolume: number;
  dailyBonusClaimedAt?: string;
  unlockedCosmetics?: string[];
  dateAchievements: {
    [achievementName: string]: Date;
  };
  quests: {
    daysCounter: number;
  };
}
