import { UserProfileProps } from "../types/userProfileProps";
import { achievements, items } from "../constants";
import BuySound from "../assets/sounds/buy.mp3";
import { playSound, showToast } from "../utils";

export const RATE_GROWN = 1.213742069;

export const getItemCost = (itemName: string, itemCount: number) =>
  Math.floor(items[itemName].cost * Math.pow(RATE_GROWN, itemCount));

export const useBuyItem = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const handleBuyItem = (item: string) => {
    playSound(BuySound, userProfile.audioVolume);

    const selectedItem = items[item];

    const itemCount = userProfile.inventory[item] || 0;

    const newCost = getItemCost(item, itemCount);

    const newPoints = userProfile.points - newCost;

    const newMultiplier = userProfile.multiplier + selectedItem.multiplier;

    const newPerSecond = userProfile.perSecond + selectedItem.perSecond;

    const newInventory = { ...userProfile.inventory };

    newInventory[item] = (newInventory[item] || 0) + 1;

    setUserProfile({
      ...userProfile,
      points: newPoints,
      multiplier: newMultiplier,
      perSecond: newPerSecond,
      inventory: newInventory,
    });

    const purchasedItemsSum = Object.values(userProfile.inventory).reduce(
      (a, b) => a + b,
      1,
    );

    if (!userProfile.inventory[item]) {
      showToast({
        header: "Новый уют разблокирован!",
        text: `${selectedItem.name} ${selectedItem.emoji}`,
        emoji: "🔓",
        volume: userProfile.audioVolume,
      });
    }

    const unlockedPurchaseAchievements = Object.values(achievements).filter(
      (achievement) =>
        achievement.purchasesRequired !== undefined &&
        purchasedItemsSum >= achievement.purchasesRequired &&
        !userProfile.achievements.includes(achievement.name),
    );

    if (unlockedPurchaseAchievements.length > 0) {
      unlockedPurchaseAchievements.forEach((achievement) => {
        showToast({
          header: `Достижение разблокировано: ${achievement.name}`,
          text: achievement.description,
          emoji: achievement.emoji,
          volume: userProfile.audioVolume,
        });
      });

      const newAchievements = userProfile.newAchievements + 1;

      setUserProfile({
        ...userProfile,
        points: newPoints,
        multiplier: newMultiplier,
        perSecond: newPerSecond,
        inventory: newInventory,
        achievements: [
          ...userProfile.achievements,
          ...unlockedPurchaseAchievements.map(
            (achievement) => achievement.name,
          ),
        ],
        newAchievements: newAchievements,
        dateAchievements: {
          ...userProfile.dateAchievements,
          [unlockedPurchaseAchievements[0].name]: new Date(),
        },
      });
    }
  };

  return { handleBuyItem };
};
