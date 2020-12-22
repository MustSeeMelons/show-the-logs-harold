import { timeStamp } from "console";
import { Action } from "../actions";
import { GlobalActionTypes } from "../actions/global-actions";
import {
  IGlobalState,
  initGlobalState,
  refStore,
  REF_KEY,
} from "../store/store";

export const globalReducer = (
  state: IGlobalState = initGlobalState,
  action: Action
): IGlobalState => {
  switch (action.type) {
    case GlobalActionTypes.SET_LOG_FILE:
      return {
        ...state,
        logFile: {
          ...action.payload,
        },
        timestamp: new Date(),
        isFileSelected: true,
        isUiLocked: false,
        activeIndex: action.payload.totalLineCount - 1,
      };
    case GlobalActionTypes.SET_TAIL_ENABLED:
      return {
        ...state,
        isTailEnabled: action.payload.isTailEnabled,
      };
    case GlobalActionTypes.SET_UI_STATE:
      return {
        ...state,
        isUiLocked: action.payload.state,
      };
    case GlobalActionTypes.NEXT_LINE:
      if (state.filteredLogs) {
        const nextLine = (state.filteredIndex + 1) % state.filteredLogs.length;

        return {
          ...state,
          filteredIndex: nextLine,
          timestamp: new Date(),
          isUiLocked: false,
        };
      } else {
        const nextLine = (state.activeIndex + 1) % state.logFile.totalLineCount;

        return {
          ...state,
          activeIndex: nextLine,
          timestamp: new Date(),
          isUiLocked: false,
        };
      }

    case GlobalActionTypes.PREV_LINE:
      if (state.filteredLogs) {
        const prevLine = (state.filteredIndex - 1) % state.filteredLogs.length;

        return {
          ...state,
          filteredIndex: prevLine,
          timestamp: new Date(),
          isUiLocked: false,
        };
      } else {
        const prevLine = (state.activeIndex - 1) % state.logFile.totalLineCount;

        return {
          ...state,
          activeIndex: prevLine,
          timestamp: new Date(),
          isUiLocked: false,
        };
      }
    case GlobalActionTypes.ADD_NEW_LOGS:
      return {
        ...state,
        isUiLocked: false,
        activeIndex: action.payload.totalLineCount - 1,
        timestamp: new Date(),
        logFile: {
          ...action.payload,
          logs: [...state.logFile.logs, ...action.payload.logs],
        },
      };
    case GlobalActionTypes.SET_FILTER:
      return {
        ...state,
        filterValue: action.payload.filterValue,
      };
    case GlobalActionTypes.SET_FILTERED_LOGS:
      return {
        ...state,
        filteredLogs: action.payload.logs,
        filteredIndex: action.payload.logs.length - 1,
      };
    case GlobalActionTypes.CANCEL_FILTER:
      return {
        ...state,
        filteredLogs: undefined,
      };
    case GlobalActionTypes.SET_FILTER_ELEMENTS:
      /*
        As the chaning of refStore does not change the store itself we need
        to add a variable to the store to signal it has changed.
      */
      refStore[REF_KEY.FILTER_ELEMENTS] = action.payload.elements;

      return {
        ...state,
        filterElementsUpdate: Math.random() * 10000,
      };
    default:
      return state;
  }
};
