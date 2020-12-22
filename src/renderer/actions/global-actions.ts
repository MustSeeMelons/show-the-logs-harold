import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IBaseAction } from ".";
import { ILogFile } from "../../definitions";
import { IState } from "../store/store";

export enum GlobalActionTypes {
  SET_LOG_FILE = "SET_CURRENT_LOG",
  ADD_NEW_LOGS = "ADD_NEW_LOGS",
  SET_TAIL_ENABLED = "SET_TAIL_ENABLED",
  SET_UI_STATE = "SET_UI_STATE",
  NEXT_LINE = "NEXT_LINE",
  PREV_LINE = "PREV_LINE", // Next log, if filter is active - next filtered log
  SET_FILTERED_LOGS = "SET_FILTERED_LOGS",
  CANCEL_FILTER = "CANCEL_FILTER",
  NEXT_FILTER_HIGHLIGHT = "NEXT_FILTER_HIGHLIGHT",
  PREVIOUS_FILTER_HIGHLIGHT = "PREVIOUS_FILTER_HIGHLIGH",
  SET_FILTER = "SET_FILTER",
  SET_FILTER_ELEMENTS = "SET_FILTER_ELEMENTS",
}

export interface ISetFilterElements {
  type: GlobalActionTypes.SET_FILTER_ELEMENTS;
  payload: {
    elements: HTMLElement[];
  };
}

export const setFilterElements = (
  elements: HTMLElement[]
): ISetFilterElements => {
  return {
    type: GlobalActionTypes.SET_FILTER_ELEMENTS,
    payload: {
      elements,
    },
  };
};

export interface ISetFilterValueAction extends IBaseAction {
  type: GlobalActionTypes.SET_FILTER;
  payload: {
    filterValue: string;
  };
}

export const setFilterValueAction = (
  filterValue: string
): ISetFilterValueAction => {
  return {
    type: GlobalActionTypes.SET_FILTER,
    payload: {
      filterValue,
    },
  };
};

export interface ICancelFilterActions extends IBaseAction {
  type: GlobalActionTypes.CANCEL_FILTER;
}

export const cancelFilterAction = (): ICancelFilterActions => {
  return {
    type: GlobalActionTypes.CANCEL_FILTER,
    payload: {},
  };
};

export interface ISetFilteredLogsAction extends IBaseAction {
  type: GlobalActionTypes.SET_FILTERED_LOGS;
  payload: {
    logs: string[];
  };
}

export const setFilteredLogsAction = (
  logs: string[]
): ISetFilteredLogsAction => {
  return {
    type: GlobalActionTypes.SET_FILTERED_LOGS,
    payload: {
      logs,
    },
  };
};

export interface ISetCurrentLogAction extends IBaseAction {
  type: GlobalActionTypes.SET_LOG_FILE;
  payload: ILogFile;
}

export const setCurrentLogAction = (
  currentLog: ILogFile
): ISetCurrentLogAction => {
  return {
    type: GlobalActionTypes.SET_LOG_FILE,
    payload: currentLog,
  };
};

export interface ISetTailEnabledAction extends IBaseAction {
  type: GlobalActionTypes.SET_TAIL_ENABLED;
  payload: {
    isTailEnabled: boolean;
  };
}

export const setTailEnabledAction = (
  isTailEnabled: boolean
): ISetTailEnabledAction => {
  return {
    type: GlobalActionTypes.SET_TAIL_ENABLED,
    payload: {
      isTailEnabled,
    },
  };
};

export interface IAddNewLogsAction extends IBaseAction {
  type: GlobalActionTypes.ADD_NEW_LOGS;
  payload: ILogFile;
}

export const addNewLogsAction = (newLogs: ILogFile): IAddNewLogsAction => {
  return {
    type: GlobalActionTypes.ADD_NEW_LOGS,
    payload: newLogs,
  };
};

export interface ISetUiStateAction extends IBaseAction {
  type: GlobalActionTypes.SET_UI_STATE;
  payload: {
    state: boolean;
  };
}

export const setuiStateAction = (state: boolean): ISetUiStateAction => {
  return {
    type: GlobalActionTypes.SET_UI_STATE,
    payload: {
      state,
    },
  };
};

export interface INextLineAction extends IBaseAction {
  type: GlobalActionTypes.NEXT_LINE;
}

export const nextLineAction = (): INextLineAction => {
  return {
    type: GlobalActionTypes.NEXT_LINE,
    payload: {},
  };
};

export interface IPrevLineAction extends IBaseAction {
  type: GlobalActionTypes.PREV_LINE;
}

export const prevLineAction = (): IPrevLineAction => {
  return {
    type: GlobalActionTypes.PREV_LINE,
    payload: {},
  };
};

export const filterLogsAction = (
  filter: string
): ThunkAction<void, IState, unknown, IBaseAction> => (
  dispatch: ThunkDispatch<IState, undefined, IBaseAction>,
  getState
) => {
  dispatch(setuiStateAction(true));

  setTimeout(() => {
    const state = getState();

    const filteredLogs = state.globalReducer.logFile.logs.filter((log) =>
      log.includes(filter)
    );

    dispatch(setFilterValueAction(filter));
    dispatch(setFilteredLogsAction(filteredLogs));
    dispatch(setuiStateAction(false));
  }, 50);
};
