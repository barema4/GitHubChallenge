import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    overflow-x: hidden;
  }

  body, 
  input, 
  button, 
  textarea, 
  select {
    font-family: 'Space Mono', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

`;
ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root') as HTMLElement
);
