import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { globalReducer } from "../reducers/global-reducer";
import { ILogFile } from "../../definitions";

export enum REF_KEY {
  FILTER_ELEMENTS,
}

export interface IGlobalState {
  logFile?: ILogFile;
  activeIndex?: number;
  timestamp?: Date;
  isFileSelected: boolean;
  isTailEnabled: boolean;
  isUiLocked?: boolean;
  filteredLogs?: string[];
  filteredIndex?: number;
  filterValue: string;
  filterElementsUpdate: number;
}

export const initGlobalState: IGlobalState = {
  isFileSelected: false,
  isTailEnabled: true,
  filterValue: "",
  filterElementsUpdate: 0,
};

export interface IState {
  globalReducer: IGlobalState;
}

/**
 * Ref store for keeping function references set by actions
 */
export const refStore: { [key: string]: any } = {};

export const store = createStore(
  combineReducers({ globalReducer }),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
