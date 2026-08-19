import styled, { css } from "styled-components";

import { colorPalette } from "./theme";



export const Container = styled.div`

  display: flex;

  justify-content: center;

  flex-wrap: wrap;



  @media screen and (max-width: 700px) {

    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 10px;

    padding: 0 10px;

  }

`;



export const Header = styled.div`

  color: white;

  margin-top: 40px;

  display: flex;

  align-items: center;

  text-align: center;

  font-size: 26px;

  font-weight: bold;

  &::before,

  &::after {

    content: "";

    flex: 1;

    border-bottom: 3px solid white;

    border-radius: 100px;

    margin-left: 100px;

    margin-right: 100px;

  }



  &:not(:empty)::before {

    margin-right: 0.5em;

    opacity: 0.7;

  }



  &:not(:empty)::after {

    margin-left: 0.5em;

    opacity: 0.7;

  }



  @media screen and (max-width: 700px) {

    justify-content: center;

    margin-top: 20px;

    padding: 0 8px;

    font-size: 23px;



    &::before,

    &::after {

      display: none;

    }

  }

`;



const Item = css`

  display: flex;

  flex-direction: column;

  gap: 8px;

  & > * {
    margin: 0;
  }

  & > p {
    margin: 0;
  }

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

  background: #ffffff1d;

  min-height: 420px;

  border: 5px solid ${colorPalette.orange};

  padding: 12px 12px 14px 12px;

  border-radius: 40px;

  transition: 0.3s all ease-out;

  min-width: 360px;

  margin: 12px;

  flex-basis: calc(25% - 10px);

  margin-bottom: 12px;

  



  @media screen and (max-width: 992px) {

    flex-basis: calc(33.33% - 10px);

  }



  @media screen and (max-width: 768px) {

    flex-basis: calc(50% - 10px);

  }



  @media screen and (max-width: 480px) {

    flex-basis: 100%;

  }



  @media screen and (max-width: 700px) {

    min-width: 0;

    width: 100%;

    height: auto;

    min-height: 250px;

    margin: 0;

    padding: 8px 10px 10px;

    border-width: 2px;

    border-radius: 18px;

    flex-basis: auto;

  }

`;



export const ItemWrapper = styled.div`

  ${Item}

  &:hover {

    box-shadow: 0px 0px 26px ${colorPalette.orange};

  }

`;

export const LockedContainer = styled.div`

  ${Item}

  opacity: 0.8;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 20px;

`;



export const ItemName = styled.h2`

  color: white;

  text-align: center;

  font-size: 24px;



  @media screen and (max-width: 700px) {

    margin: 0 0 10px;

    font-size: 14px;

    line-height: 1.25;

    overflow-wrap: anywhere;

  }

`;



interface CostProps {

  enoughtPoints: boolean;

}



export const Cost = styled.h3<CostProps>`

  transition: 0.3s all;

  color: ${(props) => (props.enoughtPoints ? "white" : colorPalette.red)};

  text-shadow: ${(props) =>

    props.enoughtPoints

      ? "0px 0px 5px rgba(0, 0, 0, 0.25)"

      : "0 0 12px#ff5e5e"};



  @media screen and (max-width: 700px) {

    margin: 6px 0;

    font-size: 18px;

  }

`;



export const Description = styled.h4`

  opacity: 0.8;

  font-size: 14px;

  min-height: 72px;

  max-height: 72px;

  font-style: italic;

  font-weight: 600;



  @media screen and (max-width: 700px) {

    display: none;

  }

`;



export const BuyButton = styled.button`

  margin-top: 4px;

  width: 100%;

  padding: 12px 16px;

  font-size: 22px;

  border: 2px solid transparent;

  background: ${colorPalette.orange};

  color: white;

  cursor: pointer;

  border-radius: 25px;

  transition: 0.3s all;

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

  &:disabled {

    cursor: not-allowed;

    opacity: 0.7;

    text-shadow: none;

  }



  @media screen and (max-width: 700px) {

    margin-top: auto;

    padding: 10px 6px;

    font-size: 14px;

    border-radius: 14px;

  }

`;