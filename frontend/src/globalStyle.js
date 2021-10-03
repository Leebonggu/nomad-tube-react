import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  a {
  color: inherit;
  text-decoration: none;
  }

  * {
  box-sizing: border-box;
  }
`;




export default GlobalStyle;