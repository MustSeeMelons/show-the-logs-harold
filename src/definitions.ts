export const PROCESS_EVENTS = {
  FILE_SELECT: "file-select",
  TRANSMIT_CURRENT_LOG: "transmit-current-log",
  TRANSMIT_NEW_LOGS: "transmit-new-logs",
  LOCK_UI: "lock-ui",
  TAIL_FILE_STATE: "tail-file-state",
  MINIMIZE: "minimize",
  MAXIMIZE: "maximize",
  CLOSE: "close",
};

export interface ILogFile {
  filePath: string;
  logs: string[];
  totalLineCount: number;
}

export interface ITailFileState {
  doTail: boolean;
}
