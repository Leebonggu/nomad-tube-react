/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { red } from 'styles/color';

export const Warning = styled.span`
  margin-top: 1rem;
  color: ${red};
  @media screen and (max-width: 768px) {
    margin-top: 2px;
  }
`;