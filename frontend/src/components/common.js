/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { red, white } from 'styles/color';

export const Warning = styled.span`
  margin-top: 1rem;
  color: ${red};
  padding: 1rem;
  @media screen and (max-width: 768px) {
    margin-top: 2px;
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