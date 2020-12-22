import styled, { css } from "styled-components";
import { Button, IButtonStyleProps } from "./button";

const SmollButton = styled(Button)`
  width: 20px;
  height: 20px;
  color: ${(p) => p.theme.colors.primary.lightText};

  ${(p) => {
    if (p.isDisabled) {
      return css`
        cursor: default;

        background-color: unset;
      `;
    } else {
      return css<IButtonStyleProps>`
        background-color: unset;

        :hover {
          background-color: ${(p) => p.theme.colors.primary.accentText};
        }
      `;
    }
  }};
`;

export { SmollButton };
