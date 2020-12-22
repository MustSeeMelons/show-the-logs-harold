import { css } from "styled-components";

export const Scrollbar = css`
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(p) => p.theme.colors.primary.dark};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.colors.primary.subtleText};
  }

  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }
`;
