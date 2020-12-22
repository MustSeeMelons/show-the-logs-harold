import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaWindowMinimize,
  FaWindowClose,
  FaWindowMaximize,
} from "react-icons/fa";
import { invokeClose, invokeMaximize, invokeMinimize } from "../render-events";
import { IState } from "../store/store";
import { connect } from "react-redux";
import { ILogFile } from "../../definitions";
import { Emoji } from "./emoji";
import { TitleText } from "./text";

const Container = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  -webkit-app-region: drag;
  background-color: ${(p) => p.theme.colors.primary.accentText};
`;

const IconContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  -webkit-app-region: no-drag;

  :hover {
    cursor: pointer;

    * {
      color: ${(p) => p.theme.colors.primary.dark};
    }
  }
`;

interface ITitleBarStateProps {
  currentLog: ILogFile;
  timestamp: Date;
  incomingMessage?: boolean;
  activeIndex?: number;
  filteredLogs?: string[];
  filteredIndex?: number;
}

type TutleBarProps = ITitleBarStateProps;

const TitleBar: React.FC<TutleBarProps> = (props) => {
  const [secondsAgo, setSecondsAgo] = useState<number>();

  useEffect(() => {
    if (!props.timestamp) {
      return;
    }

    const processTimeDiff = () => {
      const now = new Date();

      const diff = now.getTime() - props.timestamp.getTime();

      setSecondsAgo(Math.floor(diff / 1000));
    };

    processTimeDiff();

    const timeInterval = setInterval(processTimeDiff, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [props.timestamp]);

  const getLastUpdatedText = () => {
    if (props.incomingMessage) {
      return ": Updating...";
    }

    return secondsAgo > 0
      ? `: Last updated ${secondsAgo} seconds ago`
      : `: Last updated just now`;
  };

  const renderTitleText = () => {
    if (props.currentLog) {
      const isFiltered = !!props.filteredLogs;
      const activeIndex = isFiltered
        ? props.filteredIndex + 1
        : props.activeIndex + 1;
      const total = isFiltered
        ? props.filteredLogs.length
        : props.currentLog.totalLineCount;

      return (
        <TitleText>
          {props.currentLog.filePath} - {activeIndex}/{total}
          {getLastUpdatedText()}
        </TitleText>
      );
    } else {
      return <TitleText>Show The Logs Harold</TitleText>;
    }
  };

  return (
    <Container>
      <Emoji symbol="🍆" />
      {renderTitleText()}
      <IconContainer>
        <FaWindowMinimize size={20} onClick={invokeMinimize} />
      </IconContainer>
      <IconContainer>
        <FaWindowMaximize size={20} onClick={invokeMaximize} />
      </IconContainer>
      <IconContainer>
        <FaWindowClose size={20} onClick={invokeClose} />
      </IconContainer>
    </Container>
  );
};

const mapStateToProps = (state: IState): ITitleBarStateProps => {
  return {
    currentLog: state.globalReducer.logFile,
    timestamp: state.globalReducer.timestamp,
    incomingMessage: state.globalReducer.isUiLocked,
    activeIndex: state.globalReducer.activeIndex,
    filteredLogs: state.globalReducer.filteredLogs,
    filteredIndex: state.globalReducer.filteredIndex,
  };
};

const ConnectedTitlebar = connect(mapStateToProps)(TitleBar);

export { ConnectedTitlebar as TitleBar };
