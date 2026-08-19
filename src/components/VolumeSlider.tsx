import { useEffect, useRef, useState } from "react";
import { UserProfileProps } from "../types/userProfileProps";
import { Stack, Tooltip, IconButton, Slider } from "@mui/material";
import { VolumeOff, VolumeDown, VolumeUp } from "@mui/icons-material";
import { defaultUserProfile, achievements } from "../constants";
import { useKeyDown } from "../hooks";
import { showToast } from "../utils";
import { colorPalette } from "../styles";
import SadHamsterMusic from "../assets/sad-hamster.mp3";
import WinerMusic from "../assets/winer.mp3";

interface VolumeSliderProps extends UserProfileProps {
  isVictory?: boolean;
}

export const VolumeSlider = ({
  userProfile,
  setUserProfile,
  isVictory = false,
}: VolumeSliderProps) => {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const [previousValue, setPreviousValue] = useState<number>(
    defaultUserProfile.audioVolume
  );
  const [previousMusicValue, setPreviousMusicValue] = useState<number>(
    defaultUserProfile.musicVolume
  );
  const musicVolume = userProfile.musicVolume ?? defaultUserProfile.musicVolume;

  useEffect(() => {
    const music = new Audio(isVictory ? WinerMusic : SadHamsterMusic);
    music.loop = true;
    music.volume = musicVolume;
    musicRef.current = music;

    const startMusic = () => {
      void music.play().catch(() => undefined);
    };

    document.addEventListener("pointerdown", startMusic, { once: true });
    document.addEventListener("touchstart", startMusic, { once: true });
    document.addEventListener("keydown", startMusic, { once: true });

    return () => {
      document.removeEventListener("pointerdown", startMusic);
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("keydown", startMusic);
      music.pause();
      musicRef.current = null;
    };
  }, [isVictory]);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  const handleMuteClick = () => {
    setPreviousValue(userProfile.audioVolume);
    userProfile.audioVolume === 0
      ? setUserProfile({
          ...userProfile,
          audioVolume: previousValue !== 0 ? previousValue : 1,
        })
      : setUserProfile({ ...userProfile, audioVolume: 0 });
  };

  const handleSliderChange = (e: Event, value: number | number[]) => {
    const volumeAchievementName = "volumeController";
    const volumeAchievement = achievements[volumeAchievementName];
    const newAchievements = userProfile.newAchievements + 1;
    if (!userProfile.achievements.includes(volumeAchievement.name)) {
      const updatedAchievements = [
        ...userProfile.achievements,
        volumeAchievement.name,
      ];
      setUserProfile({
        ...userProfile,
        audioVolume: value as number,
        achievements: updatedAchievements,
        newAchievements: newAchievements,
        dateAchievements: {
          ...userProfile.dateAchievements,
          [volumeAchievement.name]: new Date(),
        },
      });
      showToast({
        header: `Достижение разблокировано: ${volumeAchievement.name}`,
        text: volumeAchievement.description,
        emoji: volumeAchievement.emoji,
        volume: userProfile.audioVolume,
      });
    } else {
      setUserProfile({
        ...userProfile,
        audioVolume: value as number,
      });
    }
  };

  const handleMusicChange = (e: Event, value: number | number[]) => {
    const nextValue = value as number;
    if (nextValue !== 0) {
      setPreviousMusicValue(nextValue);
    }
    setUserProfile({
      ...userProfile,
      musicVolume: nextValue,
    });
  };

  const handleMusicMuteClick = () => {
    handleMusicChange(
      {} as Event,
      musicVolume === 0 ? previousMusicValue || 0.5 : 0
    );
  };

  const volumeLabel = (value: number) => {
    const vol = Math.floor(value * 100);
    return vol === 0 ? "Muted" : vol + "%";
  };
  useKeyDown("m", handleMuteClick);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        margin: 0,
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: "8px",
        "@media (max-width: 700px)": {
          display: "none",
        },
      }}
    >
      <VolumeControl label="Эффекты">
        <Tooltip title={userProfile.audioVolume === 0 ? "Включить эффекты" : "Выключить эффекты"}>
          <IconButton sx={{ color: colorPalette.slate900 }} onClick={handleMuteClick}>
            {userProfile.audioVolume === 0 ? (
              <VolumeOff />
            ) : userProfile.audioVolume <= 0.5 ? (
              <VolumeDown />
            ) : (
              <VolumeUp />
            )}
          </IconButton>
        </Tooltip>
        <Slider
          sx={{ width: "78px", padding: "6px 0", "@media (max-width: 700px)": { width: "58px" } }}
          aria-label="Громкость эффектов"
          value={userProfile.audioVolume}
          min={0}
          max={1}
          step={0.01}
          valueLabelFormat={() => volumeLabel(userProfile.audioVolume)}
          valueLabelDisplay="auto"
          onChange={handleSliderChange}
        />
      </VolumeControl>
      <VolumeControl label="Музыка" className="music-control">
        <Tooltip title={musicVolume === 0 ? "Включить музыку" : "Выключить музыку"}>
          <IconButton
            sx={{ color: colorPalette.slate900 }}
            onClick={handleMusicMuteClick}
          >
            {musicVolume === 0 ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        </Tooltip>
        <Slider
          sx={{ width: "78px", padding: "6px 0", "@media (max-width: 700px)": { width: "58px" } }}
          aria-label="Громкость музыки"
          value={musicVolume}
          min={0}
          max={1}
          step={0.01}
          valueLabelFormat={() => volumeLabel(musicVolume)}
          valueLabelDisplay="auto"
          onChange={handleMusicChange}
        />
      </VolumeControl>
    </Stack>
  );
};


const VolumeControl = ({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Stack
    className={className}
    spacing={0.25}
    sx={{
      width: "138px",
      background: "rgba(255, 255, 255, 0.16)",
      padding: "4px 8px 5px",
      borderRadius: "10px",
      transition: ".3s all",
      ":hover": { background: "rgba(255, 255, 255, 0.24)" },
    }}
  >
    <strong style={{ color: colorPalette.slate900, fontSize: "0.72rem" }}>{label}</strong>
    <Stack direction="row" spacing={1} alignItems="center">
      {children}
    </Stack>
  </Stack>
);
