import React from "react";
import styled, { css } from "styled-components";

const Container = styled.button<IButtonStyleProps>`
  border: none;
  text-decoration: none;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  padding: none;

  ${(p) => {
    if (p.isDisabled) {
      return css`
        cursor: default;

        background-color: ${(p) => p.theme.colors.primary.subtleText};
      `;
    } else {
      return css<IButtonStyleProps>`
        background-color: ${(p) =>
          p.isActive
            ? p.theme.colors.primary.lightText
            : p.theme.colors.primary.dark};

        :hover {
          background-color: ${(p) => p.theme.colors.primary.accentText};
        }
      `;
    }
  }}
`;

export interface IButtonStyleProps {
  isDisabled?: boolean;
  isActive?: boolean; // FIXME this should be a different button
}

interface IButtonComponentProps {
  title?: string;
  onClick: () => void;
}

type ButtonProps = IButtonComponentProps &
  IButtonStyleProps &
  React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Container
      className={props.className}
      isActive={props.isActive === undefined ? true : props.isActive}
      title={props.title}
      isDisabled={props.isDisabled}
      type="button"
      onClick={!props.isDisabled ? props.onClick : undefined}
    >
      {props.children}
    </Container>
  );
};

export { Button };
