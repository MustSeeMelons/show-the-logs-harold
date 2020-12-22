import { ipcRenderer } from "electron";
import { ILogFile, ITailFileState, PROCESS_EVENTS } from "../definitions";
import {
  addNewLogsAction,
  setCurrentLogAction,
  setuiStateAction,
} from "./actions/global-actions";
import { store } from "./store/store";

export const invokeFileSelect = () => {
  ipcRenderer.send(PROCESS_EVENTS.FILE_SELECT);
};

export const invokeMinimize = () => {
  ipcRenderer.send(PROCESS_EVENTS.MINIMIZE);
};

export const invokeMaximize = () => {
  ipcRenderer.send(PROCESS_EVENTS.MAXIMIZE);
};

export const invokeClose = () => {
  ipcRenderer.send(PROCESS_EVENTS.CLOSE);
};

export const invokeTailFileState = (doTail: boolean) => {
  ipcRenderer.send(PROCESS_EVENTS.TAIL_FILE_STATE, {
    doTail,
  } as ITailFileState);
};

export const setupRenderEventListeners = () => {
  ipcRenderer.on(
    PROCESS_EVENTS.TRANSMIT_CURRENT_LOG,
    (event, args: ILogFile) => {
      store.dispatch(setCurrentLogAction(args));
    }
  );

  ipcRenderer.on(PROCESS_EVENTS.LOCK_UI, () => {
    store.dispatch(setuiStateAction(true));
  });

  ipcRenderer.on(PROCESS_EVENTS.TRANSMIT_NEW_LOGS, (event, args: ILogFile) => {
    store.dispatch(addNewLogsAction(args));
    console.log(args);
  });
};
