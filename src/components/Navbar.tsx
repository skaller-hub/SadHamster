import { ReactNode } from "react";
import HamsterImage from "../assets/hamster-face.png";
import styled from "styled-components";
import { colorPalette } from "../styles";
import { Link } from "react-router-dom";
import { Share } from "@mui/icons-material";
import { achievements } from "../constants";
import { showToast } from "../utils";
import { UserProfileProps } from "../types/userProfileProps";
import { ProfileAvatar } from "./ProfileAvatar";
import { VolumeSlider } from "./VolumeSlider";

interface Props extends UserProfileProps {
  children?: ReactNode;
}

export const Navbar = ({ userProfile, setUserProfile }: Props) => {
  const handleShareClick = async () => {
    const shareAchievement = achievements.ShareGameEnthusiast;

    if (!userProfile.achievements.includes(shareAchievement.name)) {
      const updatedPoints = userProfile.points + (shareAchievement.reward ?? 0);
      setUserProfile({
        ...userProfile,
        achievements: [...userProfile.achievements, shareAchievement.name],
        points: updatedPoints,
        maxPoints: Math.max(userProfile.maxPoints, updatedPoints),
        newAchievements: userProfile.newAchievements + 1,
        dateAchievements: {
          ...userProfile.dateAchievements,
          [shareAchievement.name]: new Date(),
        },
      });
      showToast({
        header: `Достижение разблокировано: ${shareAchievement.name}`,
        text: `${shareAchievement.description} Награда: 🧀${shareAchievement.reward ?? 0}`,
        emoji: shareAchievement.emoji,
        volume: userProfile.audioVolume,
      });
    }

    if (navigator.share) {
      await navigator.share({
        title: "Sad Hamster: Путь к Счастью",
        text: "Помоги хомяку пройти путь от одиночества к счастью через клики, уют и маленькие радости.",
        url: window.location.href,
      }).catch(() => undefined);
    }
  };

  return (
    <>
      <Nav>
        <NavIdentity>
          <Link to="/">
            <LogoContainer>
              <LogoImage alt="логотип хомяка" src={HamsterImage} />
              <LogoTxt>Sad Hamster</LogoTxt>
            </LogoContainer>
          </Link>
          <AboutLink to="/about">История</AboutLink>
        </NavIdentity>
        <NavActions>
          {userProfile.name !== null && (
            <VolumeSlider
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              isVictory={userProfile.points >= 50000}
            />
          )}
          {userProfile.name !== null && (
            <ShareButton onClick={handleShareClick}>
              <Share />
              <span>Поделиться</span>
            </ShareButton>
          )}
          <ProfileAvatar
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        </NavActions>
      </Nav>
      <NavSpacer />
    </>
  );
};

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(248, 250, 252, 0.82);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 16px;
  box-sizing: border-box;
  z-index: 12;
  user-select: none;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);

  @media (max-width: 700px) {
    gap: 8px;
    padding: 6px 10px;
  }
`;

const NavSpacer = styled.div`
  height: 82px;

  @media (max-width: 700px) {
    height: 62px;
  }
`;

const NavIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex-shrink: 0;

  @media (max-width: 700px) {
    gap: 8px;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  min-width: 0;
  flex-grow: 1;

  @media (max-width: 900px) {
    gap: 8px;
  }

  @media (max-width: 700px) {
    gap: 6px;
  }
`;

const LogoContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 66px;
  height: 66px;
  margin-left: 0;
  flex-shrink: 0;
  transition: 0.3s filter;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    margin-left: 0;
  }

  ${LogoContainer}:hover > & {
    filter: drop-shadow(0px 0px 16px rgba(250, 204, 21, 0.8));
  }
`;

const AboutLink = styled(Link)`
  font-size: 20px;
  color: ${colorPalette.slate900};
  font-weight: 700;
  transition: 0.3s text-shadow;

  &:hover {
    text-shadow: 0px 0px 12px rgba(244, 114, 182, 0.7);
  }

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const ShareButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  outline: none;
  padding: 10px 14px;
  font-size: 15px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.18);
  color: ${colorPalette.slate900};
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: 0.3s all;

  &:hover {
    background: rgba(244, 114, 182, 0.24);
    transform: translateY(-1px);
  }

  @media (max-width: 900px) {
    & span {
      display: none;
    }
  }

  @media (max-width: 700px) {
    width: 44px;
    height: 40px;
    justify-content: center;
    padding: 8px;
  }
`;

const LogoTxt = styled.p`
  font-size: 26px;
  color: ${colorPalette.slate900};
  font-weight: 800;
  margin: 0 0 0 8px;
  text-shadow: 0px 0px 6px rgba(244, 114, 182, 0.2);
  transition: 0.3s text-shadow;

  ${LogoContainer}:hover > & {
    text-shadow: 0px 0px 12px rgba(244, 114, 182, 0.5);
  }

  @media (max-width: 700px) {
    font-size: 19px;
  }
`;