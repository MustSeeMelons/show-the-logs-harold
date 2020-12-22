import React, { useEffect, useRef, useState } from "react";
import ReactJson, { ReactJsonViewProps } from "react-json-view";
import { connect } from "react-redux";
import styled, { css, DefaultTheme, withTheme } from "styled-components";
import { Scrollbar } from "../composables/scrollbar";
import { IState } from "../store/store";

import gif from "../../resources/images/travolta.gif";
import { Dispatch } from "redux";
import { setFilterElements, setuiStateAction } from "../actions/global-actions";

const Container = styled.div<IJsonContainerStyleProps>`
  display: flex;
  box-sizing: border-box;
  padding: 15px;
  overflow-y: auto;
  flex-grow: 1;
  transition: opacity 0.3s ease-in-out;

  ${Scrollbar};

  ${(p) => {
    if (p.isUiLocked) {
      return css`
        opacity: 0.4;
      `;
    }
  }};
`;

const Travolta = styled.img`
  display: inline-block;
  justify-self: flex-end;
  align-self: flex-end;
  margin: 0 auto;
  margin-bottom: -15px;
`;

interface IJsonContainerStyleProps {
  isUiLocked?: boolean;
  theme: DefaultTheme;
}

interface IJsonContainerStateProps {
  currentJson?: string;
  currentFilteredJson?: string;
  filterValue: string;
  isUiLocked?: boolean;
}

interface IJsonContainerDispatchProps {
  clearMessage: () => void;
  setFilterElements: (elements: HTMLElement[]) => void;
}

type JsonContainerProps = IJsonContainerStyleProps &
  IJsonContainerStateProps &
  IJsonContainerDispatchProps;

const JsonContainer: React.FC<JsonContainerProps> = (props) => {
  const jsonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.clearMessage();
  }, [props.currentJson, props.currentFilteredJson]);

  useEffect(() => {
    const children = jsonRef.current.getElementsByTagName("*");

    const childArray = [].slice.call(children) as HTMLElement[];
    const filterElements: HTMLElement[] = [];

    childArray.forEach((el) => {
      if (
        el.textContent &&
        el.textContent.includes(props.filterValue) &&
        el.children.length === 0 &&
        props.currentFilteredJson
      ) {
        filterElements.push(el);
        el.style.backgroundColor = props.theme.colors.primary.accentText;
        el.style.color = props.theme.colors.primary.lightText;
      } else {
        el.style.backgroundColor = "inherit";
        el.style.color = "inherid";
      }
    });

    props.setFilterElements(filterElements);
  }, [props.currentFilteredJson, jsonRef, props.isUiLocked]);

  return (
    <Container isUiLocked={props.isUiLocked} ref={jsonRef}>
      {(props.currentJson && (
        <ReactJson
          src={JSON.parse(props.currentJson)}
          name={false}
          theme="solarized"
        />
      )) || <Travolta src={gif} />}
    </Container>
  );
};

const mapStateToProps = (state: IState): IJsonContainerStateProps => {
  const currentLog = state.globalReducer.logFile;
  const filteredLogs = state.globalReducer.filteredLogs;

  return {
    currentJson: currentLog && currentLog.logs[state.globalReducer.activeIndex],
    currentFilteredJson:
      filteredLogs && filteredLogs[state.globalReducer.filteredIndex],
    isUiLocked: state.globalReducer.isUiLocked,
    filterValue: state.globalReducer.filterValue,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): IJsonContainerDispatchProps => {
  return {
    clearMessage: () => {
      dispatch(setuiStateAction(false));
    },
    setFilterElements: (elements: HTMLElement[]) => {
      dispatch(setFilterElements(elements));
    },
  };
};

const JsonContainerWithTheme = withTheme(JsonContainer);

const ConnectedJsonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JsonContainerWithTheme);

export { ConnectedJsonContainer as JsonContainer };
