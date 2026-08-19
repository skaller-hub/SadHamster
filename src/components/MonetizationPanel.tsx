import { useState } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { UserProfileProps } from "../types/userProfileProps";
import { formatNumber } from "../utils";
import { toast } from "react-toastify";

const DAILY_BONUS = 2500;
const VIDEO_REWARD = 5000;
const COSMETIC_COST = 25000;

export const MonetizationPanel = ({
  userProfile,
  setUserProfile,
}: UserProfileProps) => {
  const [isWatching, setIsWatching] = useState(false);
  const [videoCooldown, setVideoCooldown] = useState(false);
  const claimedToday = userProfile.dailyBonusClaimedAt
    ? new Date(userProfile.dailyBonusClaimedAt).toDateString() ===
      new Date().toDateString()
    : false;
  const hasCosmetic = userProfile.unlockedCosmetics?.includes("warm-frame") ?? false;

  const addCoins = (amount: number) => {
    const points = userProfile.points + amount;
    setUserProfile({
      ...userProfile,
      points,
      maxPoints: Math.max(userProfile.maxPoints, points),
    });
  };

  const claimDailyBonus = () => {
    if (claimedToday) return;
    setUserProfile({
      ...userProfile,
      points: userProfile.points + DAILY_BONUS,
      maxPoints: Math.max(userProfile.maxPoints, userProfile.points + DAILY_BONUS),
      dailyBonusClaimedAt: new Date().toISOString(),
    });
    toast.success(`Ежедневный подарок: +${formatNumber(DAILY_BONUS)} 🧀`);
  };

  const watchRewardedVideo = () => {
    if (isWatching || videoCooldown) return;
    setIsWatching(true);
    window.setTimeout(() => {
      addCoins(VIDEO_REWARD);
      setIsWatching(false);
      setVideoCooldown(true);
      toast.success(`Награда за просмотр: +${formatNumber(VIDEO_REWARD)} 🧀`);
      window.setTimeout(() => setVideoCooldown(false), 30000);
    }, 1500);
  };

  const unlockCosmetic = () => {
    if (hasCosmetic || userProfile.points < COSMETIC_COST) return;
    setUserProfile({
      ...userProfile,
      points: userProfile.points - COSMETIC_COST,
      unlockedCosmetics: [
        ...(userProfile.unlockedCosmetics ?? []),
        "warm-frame",
      ],
    });
    toast.success("Эксклюзивная рамка хомяка разблокирована!");
  };

  return (
    <Panel>
      <PanelTitle>🎁 Бонусы и премиум</PanelTitle>
      <PanelSubtitle></PanelSubtitle>
      <Offers>
        <Offer>
          <OfferTitle>Ежедневный подарок</OfferTitle>
          <OfferText>Возвращайся каждый день и получай {formatNumber(DAILY_BONUS)} сыркоинов.</OfferText>
          <ActionButton disabled={claimedToday} onClick={claimDailyBonus}>
            {claimedToday ? "Уже получен" : "Забрать подарок"}
          </ActionButton>
        </Offer>
        <Offer>
          <OfferTitle>Rewarded-реклама</OfferTitle>
          <OfferText>Демонстрация просмотра рекламы с наградой, без подключения рекламной сети.</OfferText>
          <ActionButton disabled={isWatching || videoCooldown} onClick={watchRewardedVideo}>
            {isWatching ? "Идёт просмотр..." : videoCooldown ? "Доступно через 30 сек" : `Смотреть за +${formatNumber(VIDEO_REWARD)} 🧀`}
          </ActionButton>
        </Offer>
        <Offer>
          <OfferTitle>Косметический премиум</OfferTitle>
          <OfferText>Эксклюзивная рамка для профиля за заработанные сыркоины.</OfferText>
          <ActionButton disabled={hasCosmetic || userProfile.points < COSMETIC_COST} onClick={unlockCosmetic}>
            {hasCosmetic ? "Разблокировано" : `Открыть за ${formatNumber(COSMETIC_COST)} 🧀`}
          </ActionButton>
        </Offer>
      </Offers>
    </Panel>
  );
};

const Panel = styled.section`
  width: min(920px, calc(100% - 32px));
  margin: 28px auto;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.28);
  color: white;
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`;

const PanelSubtitle = styled.p`
  margin: 6px 0 18px;
  opacity: 0.78;
`;

const Offers = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Offer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
`;

const OfferTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const OfferText = styled.p`
  min-height: 54px;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.84;
`;

const ActionButton = styled(Button)`
  && {
    margin-top: auto;
    border-radius: 10px;
    color: white;
    border-color: rgba(255, 255, 255, 0.45);
  }
`;
