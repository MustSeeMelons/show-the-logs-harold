import "styled-components";

declare module "*.scss";

declare module "styled-components" {
  // Must be named this way for autocompelte to work with props.theme
  export interface DefaultTheme {
    colors: {
      primary: {
        dark: string;
        lightText: string;
        accentText: string;
        subtleText: string;
      };
    };
  }
}
