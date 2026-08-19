import React from "react";
import { useEffect } from "react";
import { BackButton } from "../components";
import styled from "styled-components";
import { colorPalette } from "../styles";
import { GitHub } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { achievements, items } from "../constants";
import PLFlag from "../assets/poland-flag-icon.svg";

export const About = () => {
  const achievementsCount = Object.keys(achievements).length;
  const itemsCount = Object.keys(items).length;
  useEffect(() => {
    document.title = "История";
  }, []);

  const techStack = [
    { name: "React.js", link: "https://react.dev/" },
    { name: "TypeScript", link: "https://www.typescriptlang.org/" },
    { name: "Vite", link: "https://vitejs.dev/" },
    { name: "MUI", link: "https://mui.com/" },
    { name: "styled-components", link: "https://styled-components.com/" },
  ];

  return (
    <>
      <BackButton />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AboutContainer>
          <AboutTitle>Sad Hamster: Путь к Счастью</AboutTitle>
          <AboutText>
            Хомяк потерял любимую сырную корочку, а его хозяин ушёл на весь день и забыл насыпать корм. Одиночество давит на него, и он смотрит на мир огромными заплаканными глазами под тоскливую музыку.
          </AboutText>
          <AboutText>
            <b>Главная цель:</b> помочь хомяку пройти 5 стадий от отчаяния до полного счастья — через клики, уют, заботу и маленькие радости. Каждый шаг приносит тепло, надежду и, наконец, улыбку.
          </AboutText>
          <AboutText>
            В игре доступно <b>{achievementsCount} достижений</b> и <b>{itemsCount} предметов</b> уюта. В процессе ты развиваешь хомяка от грусти к живому, яркому счастью.
          </AboutText>


          <br />
          <Stack spacing={2} direction="row">
            <Button
              href="https://github.com/skaller-hub"
              target="_blank"
              variant="outlined"
              style={{
                fontSize: ".9rem",
                borderRadius: 12,
                padding: 10,
              }}
            >
              <GitHub /> &nbsp; GitHub
            </Button>
          </Stack>
        </AboutContainer>
      </div>
    </>
  );
};
const AboutContainer = styled.div`
  background-color: #f5f5f5;
  padding: 32px;
  margin: 18px;
  border-radius: 28px;
  max-width: 1000px;
`;

const AboutTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${colorPalette.orange};
  margin-bottom: 20px;
`;

const AboutText = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: #333333;
`;

const Flag = styled.img`
  width: 20px;
  border-radius: 3px;
  filter: drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.45));
`;

interface LinkProps {
  color?: string;
}

const AboutLink = styled.a<LinkProps>`
  cursor: pointer;
  color: ${(props) => props.color || colorPalette.orange};
  display: inline-block;
  position: relative;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s all;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${(props) => props.color || colorPalette.orange};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
    border-radius: 100px;
  }
  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  &:hover {
    text-shadow: 0px 0px 20px ${(props) => props.color || colorPalette.orange};
  }
  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;
