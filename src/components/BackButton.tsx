import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorPalette } from "../styles";

export const BackButton = () => {
  const n = useNavigate();
  const handleClick = () => {
    n(-1);
  };
  return (
    <Btn onClick={handleClick}>
      <ArrowBackIosNew />
      &nbsp;Назад
    </Btn>
  );
};

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 20px;
  margin: 20px 8px 8px;
  margin-left: 16px;
  padding: 12px 18px;
  background-color: transparent;
  background: #f5f5f5;
  color: ${colorPalette.orange};
  cursor: pointer;
  border-radius: 20px;
  transition: 0.3s all;
  &:hover {
    background: #f5f5f5e8;
  }

  @media (max-width: 700px) {
    margin-top: 18px;
  }
`;
