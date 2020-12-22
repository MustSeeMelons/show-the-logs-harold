import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { setupRenderEventListeners } from "../render-events";
import { JsonContainer } from "./json-container";
import { Controls } from "./controls";
import { LogDefaultTheme } from "../theme";
import { TitleBar } from "./title-bar";
import { Options } from "./options";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  width: 100%;
`;

const LogContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 800px;
  min-height: 600px;
`;

setupRenderEventListeners();

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        background-color: ${(p) => p.theme.colors.primary.dark};
        color: ${(p) => p.theme.colors.primary.lightText};
        font-family: "Lucida Console"
    }
`;

export const Root: React.FC = () => {
  return (
    <ThemeProvider theme={LogDefaultTheme}>
      <GlobalStyles />
      <Provider store={store}>
        <AppContainer>
          <TitleBar />
          <ContentContainer>
            <Controls /> {/* Needs to be able to scroll to elements */}
            <LogContainer>
              <Options />
              <JsonContainer /> {/* Finds all the HTML elements we need */}
            </LogContainer>
          </ContentContainer>
        </AppContainer>
      </Provider>
    </ThemeProvider>
  );
};
