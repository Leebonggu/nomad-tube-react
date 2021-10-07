import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  }

  /* html, body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  } */
  a {
  color: inherit;
  text-decoration: none;
  }
`;




export default GlobalStyle;