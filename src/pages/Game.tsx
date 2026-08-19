import { useState, useEffect } from "react";
import {
  CreateProfile,
  StatsInfo,
  Shop,
  BackToTop,
  Quests,
  MonetizationPanel,
} from "../components";
import {
  ClickButton,
  ClickContainer,
  ClickImg,
  Offline,
  Points,
  GameShell,
  StagePanel,
  StageTitle,
  StageBadge,
  StageStory,
  FloatingGain,
  ClickHint,
} from "../styles";
import { compactFormat, playSound, showToast } from "../utils";
import { achievements } from "../constants";
import "react-toastify/dist/ReactToastify.css";
import stage1 from "../assets/stage1.jpg";
import stage2 from "../assets/stage2.jpg";
import stage3 from "../assets/stage3.jpg";
import stage4 from "../assets/stage4.jpg";
import stage5 from "../assets/stage5.jpg";
import ClickSound from "../assets/sounds/click.mp3";
import { UserProfileProps } from "../types/userProfileProps";
import { WifiOff } from "@mui/icons-material";
import { useOnlineStatus } from "../hooks";

const STAGES = [
  {
    min: 0,
    max: 500,
    title: "Одиночество и Слезы",
    resource: "Сыркоины",
    button: "Пожалеть хомяка",
    image: stage1,
    background:
      "linear-gradient(180deg, rgba(15,23,42,0.92), rgba(51,65,85,0.88) 35%, rgba(148,163,184,0.7) 100%)",
    story:
      "Хомяк потерял свою любимую сырную корочку, а его хозяин забыл насыпать корм и ушёл на весь день. Он смотрит в пустоту огромными заплаканными глазами под тоскливую музыку и надеется, что кто-то наконец заметит его одиночество.",
  },
  {
    min: 500,
    max: 2500,
    title: "Первая Забота",
    resource: "Уют",
    button: "Повязать бантик",
    image: stage2,
    background:
      "linear-gradient(180deg, rgba(30,41,59,0.9), rgba(100,116,139,0.86) 45%, rgba(249,168,212,0.6) 100%)",
    story:
      "Маленький жест заботы начинает согревать хомяка. Бантик, тёплая подушка и мягкий свет помогают ему почувствовать, что мир не такой пустой, как казалось.",
  },
  {
    min: 2500,
    max: 10000,
    title: "Осознание",
    resource: "Надежда",
    button: "Посмотреть в глазки",
    image: stage3,
    background:
      "linear-gradient(180deg, rgba(51,65,85,0.88), rgba(148,163,184,0.8) 48%, rgba(244,114,182,0.44) 100%)",
    story:
      "Пара добрых слов и внимательный взгляд меняют всё. Хомяк начинает верить, что даже после грусти можно снова найти тепло и смысл в простых маленьких радостях.",
  },
  {
    min: 10000,
    max: 50000,
    title: "Шок от Счастья",
    resource: "Восторг",
    button: "Дать вкусняшку",
    image: stage4,
    background:
      "linear-gradient(180deg, rgba(100,116,139,0.8), rgba(244,114,182,0.55) 48%, rgba(250,204,21,0.7) 100%)",
    story:
      "Счастье приходит не сразу, но оно приходит. Хомяк от удивления не может оторвать глаз от маленьких чудес: тепла, вкуса и заботы, которые вдруг снова наполнили его день.",
  },
  {
    min: 50000,
    max: Infinity,
    title: "Абсолютный Кайф",
    resource: "Сырный Хайп",
    button: "Поставить лайк",
    image: stage5,
    background:
      "linear-gradient(180deg, rgba(249,168,212,0.7), rgba(250,204,21,0.8) 48%, rgba(255,255,255,0.78) 100%)",
    story:
      "Хомяк уже не просто счастлив – он сияет. Его день наполнен уютом, сыром, любовью и мемным счастьем, и он наконец понимает: путь к счастью был не в идеальности, а в заботе.",
  },
] as const;

export const Game = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const userProfileProps = { userProfile, setUserProfile };
  const [clicks, setClicks] = useState<number>(userProfile.clicks);
  const [addedPoints, setAddedPoints] = useState<number>(0);
  const [showAddedPoints, setShowAddedPoints] = useState<boolean>(false);
  const [showClickHint, setShowClickHint] = useState<boolean>(true);
  const [lastClickAt, setLastClickAt] = useState<number>(Date.now());
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [floatingGains, setFloatingGains] = useState<Array<{ id: number; value: number; left: number; top: number }>>([]);
  const isOnline = useOnlineStatus();

  const currentStage =
    STAGES.filter((stage) => userProfile.points >= stage.min && userProfile.points < stage.max)[0] ||
    STAGES[STAGES.length - 1];

  const stageBackground = currentStage.background;
  const stageImage = currentStage.image;

  const handleClick = () => {
    setShowClickHint(false);
    setLastClickAt(Date.now());
    playSound(ClickSound, userProfile.audioVolume);
    const gain = Math.max(1, userProfile.multiplier);
    handleAddPoints(userProfile.points + gain);
    setAddedPoints(gain);
    !showAddedPoints && setShowAddedPoints(true);
    setClicks(clicks + 1);

    const id = Date.now() + Math.random();
    setFloatingGains((prev) => [
      ...prev,
      { id, value: gain, left: 50 + (Math.random() * 12 - 6), top: 18 + Math.random() * 18 },
    ]);
    setTimeout(() => {
      setFloatingGains((prev) => prev.filter((item) => item.id !== id));
    }, 800);

    if (!isClicked) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 150);
    }

    const unlockedClickAchievements = Object.values(achievements).filter(
      (achievement) =>
        achievement.clicksRequired !== undefined &&
        clicks + 1 >= achievement.clicksRequired &&
        !userProfile.achievements.includes(achievement.name)
    );

    if (unlockedClickAchievements.length > 0) {
      unlockedClickAchievements.forEach((achievement) => {
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
        achievements: [
          ...userProfile.achievements,
          ...unlockedClickAchievements.map((achievement) => achievement.name),
        ],
        dateAchievements: {
          ...userProfile.dateAchievements,
          [unlockedClickAchievements[0].name]: new Date(),
        },
        newAchievements: newAchievements,
      });
    }
  };

  useEffect(() => {
    const hintTimer = window.setTimeout(() => {
      setShowClickHint(true);
    }, 5000);

    return () => window.clearTimeout(hintTimer);
  }, [lastClickAt]);

  useEffect(() => {
    setTimeout(() => {
      setShowAddedPoints(false);
    }, 250);
  }, [showAddedPoints]);

  const handleAddPoints = (points: number) => {
    const newPoints = points;
    const newMaxPoints = Math.max(newPoints, userProfile.maxPoints);

    const unlockedAchievements = Object.values(achievements).filter(
      (achievement) =>
        achievement.requirement !== undefined &&
        newMaxPoints >= achievement.requirement &&
        userProfile.maxPoints < achievement.requirement &&
        !userProfile.achievements.includes(achievement.name)
    );

    if (unlockedAchievements.length > 0) {
      unlockedAchievements.forEach((achievement) => {
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
        maxPoints: newMaxPoints,
        clicks: clicks,
        achievements: [
          ...userProfile.achievements,
          ...unlockedAchievements.map((achievement) => achievement.name),
        ],
        newAchievements: newAchievements,
        dateAchievements: {
          ...userProfile.dateAchievements,
          [unlockedAchievements[0].name]: new Date(),
        },
      });
    } else {
      setUserProfile({
        ...userProfile,
        points: newPoints,
        maxPoints: newMaxPoints,
        clicks: clicks,
      });
    }
  };

  useEffect(() => {
    if (userProfile.name !== null) {
      const intervalId = setInterval(() => {
        const pointsPerSecond = (userProfile.points + userProfile.perSecond / 100).toFixed(3);
        handleAddPoints(Number(pointsPerSecond));
      }, 10);

      return () => {
        clearInterval(intervalId);
      };
    }
  });

  useEffect(() => {
    document.title = `Sad Hamster - ${compactFormat(userProfile.points)}`;
  }, [userProfile.points]);

  useEffect(() => {
    if (userProfile.name === null) {
      setClicks(0);
    }
  }, [userProfile]);

  return (
    <>
      {userProfile.name === null ? (
        <CreateProfile {...userProfileProps} />
      ) : (
        <>
          <GameShell background={stageBackground}>
            <StagePanel>
              <StageBadge>{currentStage.resource}</StageBadge>
              <StageTitle>{currentStage.title}</StageTitle>
              <StageStory>{currentStage.story}</StageStory>
            </StagePanel>

            <ClickContainer onTouchStart={(e) => e.preventDefault()}>
              <Points show={showAddedPoints}>+{addedPoints}</Points>
              {floatingGains.map((item) => (
                <FloatingGain key={item.id} left={item.left} top={item.top}>
                  +{item.value}
                </FloatingGain>
              ))}
              {showClickHint && <ClickHint>КЛИК</ClickHint>}
              <ClickButton
                aria-label={currentStage.button}
                className={isClicked ? "clicked" : ""}
                onClick={handleClick}
                onTouchStart={(e) => e.preventDefault()}
              >
                <ClickImg draggable="false" src={stageImage} alt={currentStage.title} />
              </ClickButton>
            </ClickContainer>

            <StagePanel style={{ marginTop: "22px", maxWidth: "560px" }}>
              <StageTitle style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                {currentStage.button}
              </StageTitle>
              <StageStory>
                {currentStage.title} • {currentStage.resource} • {compactFormat(userProfile.points)}
              </StageStory>
            </StagePanel>

            <StatsInfo userProfile={userProfile} />
            <MonetizationPanel {...userProfileProps} />
            <Shop {...userProfileProps} />
            {!isOnline && (
              <Offline>
                <WifiOff /> &nbsp; Ты <span>офлайн</span>, но всё ещё можешь помогать хомяку!
              </Offline>
            )}
            <BackToTop />
          </GameShell>
        </>
      )}
    </>
  );
};
