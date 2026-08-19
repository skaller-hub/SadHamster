import { formatNumber } from "../utils";
import { User } from "../types/user";
import styled from "styled-components";
import { colorPalette } from "../styles";
import { useScrollTrigger } from "../hooks";

interface Props {
  userProfile: User;
}

export const StatsInfo = ({ userProfile }: Props) => {
  const checkShowPoints = useScrollTrigger();

  const formatPoints = () => {
    return `Сыркоин 🧀: ${
      userProfile.points > 100
        ? formatNumber(userProfile.points, 0)
        : formatNumber(userProfile.points)
    }`;
  };

  return (
    <>
      <StatsContainer>
        <h2>{formatPoints()}</h2>
        <span>
          Максимум:{" "}
          {userProfile.maxPoints > 100
            ? formatNumber(userProfile.maxPoints, 0)
            : formatNumber(userProfile.maxPoints)}
        </span>
        <br />
        <span>Клики: {formatNumber(userProfile.clicks, 0)}</span>
        <br />
        <span>Нажатий за раз: {formatNumber(userProfile.multiplier, 0)}</span>
        <br />
        <span>В секунду: {formatNumber(userProfile.perSecond)}</span>
      </StatsContainer>
      <Points show={checkShowPoints}>{formatPoints()}</Points>
    </>
  );
};

const StatsContainer = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif !important;
  text-align: center;
  & h2 {
    font-size: 28px;
  }
  & span {
    font-size: 20px;
  }
`;

interface PointsProps {
  show: boolean;
}

const Points = styled.div<PointsProps>`
  z-index: 2;
  position: fixed;
  top: 110px;
  left: 50%;
  transition: 0.3s all ease-in-out;
  transform: translate(-50%, 0) scale(${(props) => (props.show ? 1 : 0)});
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(8px);
  color: #1e293b;
  border: 4px solid ${colorPalette.pink};
  font-size: 18px;
  border-radius: 20px;
  font-weight: 500;
  padding: 20px;
  min-width: 280px;

  @media (max-width: 600px) {
    top: 160px;
    z-index: 11;
    font-size: 16px;
    min-width: 220px;
  }
`;
