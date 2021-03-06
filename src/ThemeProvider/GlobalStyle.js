import { createGlobalStyle } from "styled-components"


export const GlobalStyle = createGlobalStyle` 
* {
  box-sizing: border-box;
}
body, html {
    margin: 0;
    padding: 0;
    background-color: ${[props => props.theme.background]};
    font-family: Helvetica, Sans-Serif;
  }
`;

