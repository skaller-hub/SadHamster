import { useMemo } from "react";
import { Lock } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { UserProfileProps } from "../types/userProfileProps";
import { QuickBuySlot, QuickBuyButton, QuickBuyLockIcon } from "../styles";
import { items } from "../constants";
import { getItemCost, useBuyItem } from "../hooks";
import { formatNumber } from "../utils";

const MAX_VISIBLE_ITEMS = 6;
const RADIUS_PERCENT = 42;

export const QuickBuyRing = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const { handleBuyItem } = useBuyItem({ userProfile, setUserProfile });

  const ringItems = useMemo(() => {
    const sortedEntries = Object.entries(items).sort(
      (a, b) => a[1].cost - b[1].cost,
    );

    const unlocked = sortedEntries.filter(
      ([, item]) => item.cost <= userProfile.maxPoints,
    );
    const nextLocked = sortedEntries.find(
      ([, item]) => item.cost > userProfile.maxPoints,
    );

    const visibleUnlocked = unlocked.slice(-MAX_VISIBLE_ITEMS);

    return nextLocked ? [...visibleUnlocked, nextLocked] : visibleUnlocked;
  }, [userProfile.maxPoints]);

  if (ringItems.length === 0) {
    return null;
  }

  const count = ringItems.length;
  const startAngle = -90 + 360 / count / 2;

  return (
    <>
      {ringItems.map(([itemName, item], index) => {
        const locked = item.cost > userProfile.maxPoints;
        const itemCount = userProfile.inventory[itemName] || 0;
        const cost = locked
          ? item.cost
          : getItemCost(itemName, itemCount);
        const affordable = !locked && cost <= userProfile.points;

        const angleDeg = startAngle + (360 / count) * index;
        const angleRad = (angleDeg * Math.PI) / 180;
        const left = 50 + RADIUS_PERCENT * Math.cos(angleRad);
        const top = 50 + RADIUS_PERCENT * Math.sin(angleRad);

        return (
          <QuickBuySlot key={itemName} style={{ left: `${left}%`, top: `${top}%` }}>
            <Tooltip
              title={
                locked
                  ? `Заблокировано: нужно 🧀${formatNumber(item.cost, 0)}`
                  : `${item.name} — 🧀${formatNumber(cost, 0)}`
              }
            >
              <span>
                <QuickBuyButton
                  affordable={affordable}
                  locked={locked}
                  disabled={locked || !affordable}
                  aria-label={
                    locked ? `${item.name} заблокирован` : `Купить ${item.name}`
                  }
                  onClick={() => handleBuyItem(itemName)}
                >
                  {item.emoji}
                  {locked && (
                    <QuickBuyLockIcon>
                      <Lock sx={{ fontSize: 10 }} />
                    </QuickBuyLockIcon>
                  )}
                </QuickBuyButton>
              </span>
            </Tooltip>
          </QuickBuySlot>
        );
      })}
    </>
  );
};
