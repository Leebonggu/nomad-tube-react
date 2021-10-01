import styled from "styled-components";
import { red,  white } from './color';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  /* margin: 0 auto; */
  padding-right: 50px;
  padding-left: 50px;
  overflow-y: none;
  
  @media screen and (max-width: 992px) {
    padding: 0 30px;
  }
`;

export const Button = styled.button`
  border-radius: 4px;
  background-color: ${red};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: ${white};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    background: ${white};
    background-color: ${red};
  }
`;