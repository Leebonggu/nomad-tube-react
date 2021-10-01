/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { red,  subBackgroud,  white } from './color';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-right: 50px;
  padding-left: 50px;
  overflow-y: none;
  
  @media screen and (max-width: 992px) {
    padding: 0 30px;
  }
`;
