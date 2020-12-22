import {
  IAddNewLogsAction,
  ISetFilteredLogsAction,
  INextLineAction,
  IPrevLineAction,
  ISetCurrentLogAction,
  ISetUiStateAction,
  ISetTailEnabledAction,
  ICancelFilterActions,
  ISetFilterValueAction,
  ISetFilterElements,
} from "./global-actions";

export interface IBaseAction {
  type: string;
  payload: any;
  refs?: any;
}

export type Action =
  | ISetCurrentLogAction
  | ISetTailEnabledAction
  | ISetUiStateAction
  | INextLineAction
  | IPrevLineAction
  | IAddNewLogsAction
  | ISetFilteredLogsAction
  | ICancelFilterActions
  | ISetFilterValueAction
  | ISetFilterElements;
