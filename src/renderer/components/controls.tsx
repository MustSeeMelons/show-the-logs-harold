import React from "react";
import styled from "styled-components";
import { invokeTailFileState, invokeFileSelect } from "../render-events";
import { Button } from "./button";
import { FaRegFileAlt, FaArrowUp, FaArrowDown, FaCheck } from "react-icons/fa";
import { IState } from "../store/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  nextLineAction,
  prevLineAction,
  setuiStateAction,
  setTailEnabledAction,
} from "../actions/global-actions";
import { ILogFile } from "../../definitions";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  row-gap: 15px;
  box-sizing: border-box;
  padding: 15px;
  border-right: 2px solid ${(p) => p.theme.colors.primary.accentText};
`;

interface IControlComponentProps {}

interface IControlsStateProps {
  isFileSelected: boolean;
  isTailEnabled: boolean;
  currentLog: ILogFile;
  incomingMesasge?: boolean;
  activeIndex?: number;
  filteredLogs?: string[];
  filteredIndex?: number;
}

interface IControlsDispatchProps {
  toggleTailEnabled: (isTailEnabled: boolean) => void;
  nextLine: () => void;
  prevLine: () => void;
}

type ControlsProps = IControlComponentProps &
  IControlsStateProps &
  IControlsDispatchProps;

const Controls: React.FC<ControlsProps> = (props) => {
  const hasNext = () => {
    if (props.filteredLogs) {
      return props.filteredIndex < props.filteredLogs.length - 1;
    } else {
      return props.activeIndex < props.currentLog?.totalLineCount - 1;
    }
  };

  const hasPrev = () => {
    if (props.filteredLogs) {
      return props.filteredIndex > 0;
    } else {
      return props.activeIndex > 0;
    }
  };

  return (
    <Container>
      <Button
        isDisabled={props.incomingMesasge}
        title="Select log file"
        onClick={() => {
          invokeFileSelect();
        }}
      >
        <FaRegFileAlt size={40} />
      </Button>
      <Button
        isDisabled={
          !props.isFileSelected || !hasPrev() || props.incomingMesasge
        }
        title="Previos Record"
        onClick={props.prevLine}
      >
        <FaArrowUp size={40} />
      </Button>
      <Button
        isDisabled={
          !props.isFileSelected || !hasNext() || props.incomingMesasge
        }
        title="Next record"
        onClick={props.nextLine}
      >
        <FaArrowDown size={40} />
      </Button>
      <Button
        title="Listen for file changes"
        isDisabled={!props.isFileSelected || props.incomingMesasge}
        isActive={props.isTailEnabled}
        onClick={() => {
          props.toggleTailEnabled(!props.isTailEnabled);
          invokeTailFileState(!props.isTailEnabled);
        }}
      >
        <FaCheck size={40} />
      </Button>
    </Container>
  );
};

const mapStateToProps = (state: IState): IControlsStateProps => {
  return {
    isFileSelected: state.globalReducer.isFileSelected,
    isTailEnabled: state.globalReducer.isTailEnabled,
    currentLog: state.globalReducer.logFile,
    incomingMesasge: state.globalReducer.isUiLocked,
    activeIndex: state.globalReducer.activeIndex,
    filteredLogs: state.globalReducer.filteredLogs,
    filteredIndex: state.globalReducer.filteredIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IControlsDispatchProps => {
  return {
    toggleTailEnabled: (isTailEnabled: boolean) => {
      dispatch(setTailEnabledAction(isTailEnabled));
    },
    nextLine: () => {
      dispatch(setuiStateAction(true));
      setTimeout(() => {
        dispatch(nextLineAction());
      }, 50);
    },
    prevLine: () => {
      dispatch(setuiStateAction(true));
      setTimeout(() => {
        dispatch(prevLineAction());
      }, 50);
    },
  };
};

const ConnectedControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);

export { ConnectedControls as Controls };
