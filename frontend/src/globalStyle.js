import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
y
  html, body {
    margin: 0;
    padding: 0;
    height: 100%; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;




export default GlobalStyle;