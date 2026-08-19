import styled, { css, keyframes } from "styled-components";
import { styled as muistyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { colorPalette } from "./theme";

export const AvatarContainer = styled.span`
  margin-left: auto;
  margin-right: 30px;
  font-size: 16px;
  color: #1e293b;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    margin-right: 15px;
  }
`;

export const GameShell = styled.div<{ background: string }>`
  min-height: calc(100vh - 110px);
  padding: 24px 16px 80px;
  background: ${(props) => props.background};
  transition: background 0.8s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StagePanel = styled.div`
  width: min(760px, 92vw);
  background: rgba(15, 23, 42, 0.26);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 28px;
  backdrop-filter: blur(8px);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.15);
  padding: 18px 20px;
  text-align: center;
`;

export const StageTitle = styled.h2`
  margin: 0 0 8px;
  font-size: clamp(1.8rem, 2.4vw, 2.5rem);
  color: ${colorPalette.cream};
  text-shadow: 0 0 22px rgba(250, 204, 21, 0.4);
`;

export const StageBadge = styled.span`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  background: rgba(244, 114, 182, 0.2);
  color: ${colorPalette.cream};
  border: 1px solid rgba(244, 114, 182, 0.5);
  margin-bottom: 12px;
`;

export const StageStory = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(248, 250, 252, 0.85);
`;

export const ClickContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  position: relative;
  @media only screen and (max-width: 768px) {
    margin-top: 28px;
  }
`;

export const ClickImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 50%;
  filter: drop-shadow(0 0 30px rgba(250, 204, 21, 0.56));
`;

export const ClickButton = muistyled(Button)({
  width: "280px",
  height: "280px",
  minWidth: "280px",
  padding: 0,
  borderRadius: "50%",
  overflow: "hidden",
  border: `6px solid ${colorPalette.pink}`,
  background: "linear-gradient(135deg, rgba(248,250,252,0.14), rgba(244,114,182,0.12))",
  boxShadow: "0 0 0 12px rgba(255,255,255,0.08), 0 0 50px rgba(244,114,182,0.42), 0 25px 50px rgba(15,23,42,0.25)",
  transition: "all .15s ease-out",
  position: "relative",
  "@media not all and (pointer: coarse)": {
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  "&.clicked": {
    transform: "scale(0.95)",
    boxShadow: "0 0 0 18px rgba(250,204,21,0.18), 0 0 70px rgba(250,204,21,0.5)",
  },
  "& .MuiTouchRipple-child": {
    backgroundColor: "rgba(250, 204, 21, 0.3)",
  },
});

export const Offline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  color: rgba(248, 250, 252, 0.9);

  & span {
    color: ${colorPalette.yellow};
    text-shadow: 0 0 6px rgba(250, 204, 21, 0.6);
    margin-right: 6px;
    margin-left: 6px;
  }
`;

interface PointsProps {
  show: boolean;
}

const animatePoints = keyframes`
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 1;
  }
  30% {
    transform: translateY(-8px) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateY(-34px) scale(1.25);
    opacity: 0;
  }
`;

export const Points = styled.div<PointsProps>`
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 18%;
  transform: translateX(-50%);
  transition: 0.1s all;
  opacity: ${(props) => (props.show ? 1 : 0)};
  animation: ${(props) =>
    props.show ? css`var(--animatePoints) .35s ease-out` : "none"};
  color: ${colorPalette.yellow};
  text-shadow: 0 0 20px rgba(250, 204, 21, 0.6);
  font-weight: 700;
  --animatePoints: ${animatePoints};
`;

export const FloatingGain = styled.div<{ left: number; top: number }>`
  position: absolute;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  transform: translate(-50%, -50%);
  color: ${colorPalette.yellow};
  font-size: 1.2rem;
  font-weight: 800;
  text-shadow: 0 0 18px rgba(250, 204, 21, 0.5);
  pointer-events: none;
  animation: ${animatePoints} 0.8s ease-out forwards;
`;

export const ClickHint = styled.div`
  position: absolute;
  top: 4%;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
  color: ${colorPalette.cream};
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-shadow: 0 0 18px rgba(250, 204, 21, 0.9);
  pointer-events: none;
  animation: ${animatePoints} 1.1s ease-in-out infinite;
`;
