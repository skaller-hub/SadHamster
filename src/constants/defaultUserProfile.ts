import { User } from "../types/user";
export const defaultUserProfile: User = {
  name: null,
  createdAt: new Date(),
  profilePicture: null,
  points: 0,
  clicks: 0,
  maxPoints: 0,
  multiplier: 1,
  perSecond: 1,
  inventory: {},
  achievements: [],
  newAchievements: 0,
  audioVolume: 0.5,
  musicVolume: 0.5,
  unlockedCosmetics: [],
  dateAchievements: {},
  quests: {
    daysCounter: 0,
  },
};
