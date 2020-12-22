import readLine from "readline";
import fs from "fs";
import { BrowserWindow } from "electron";
import { ILogFile, PROCESS_EVENTS } from "../../definitions";

let totalLineCount = 0;
let currentLine = 0;
let file: string;
let logs: string[] = [];

const getReadLineHandler = () => {
  return readLine.createInterface({
    input: fs.createReadStream(file),
  });
};

const watchFile = (window: BrowserWindow) => {
  fs.watchFile(file, { interval: 500 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      readLogFile(window, file, true);
    }
  });
};

const unWatchFile = () => {
  if (file) {
    fs.unwatchFile(file);
  }
};

const readLogFile = (
  window: BrowserWindow,
  filePath: string,
  watched: boolean = false
) => {
  window.webContents.send(PROCESS_EVENTS.LOCK_UI);

  const oldLogs = logs;
  logs = [];
  unWatchFile();
  file = filePath;
  totalLineCount = 0;

  let rl = getReadLineHandler();

  rl.on("line", (line: string) => {
    try {
      logs.push(line);
      totalLineCount++;
    } catch (e) {
      console.log(e);
    }
  });

  rl.on("close", () => {
    currentLine = totalLineCount;

    watchFile(window);

    if (watched) {
      // If we are wathing, send only the new logs
      window.webContents.send(PROCESS_EVENTS.TRANSMIT_NEW_LOGS, {
        logs: logs.filter((log) => !oldLogs.includes(log)),
        lineNumber: totalLineCount,
        filePath,
        totalLineCount,
      } as ILogFile);
    } else {
      window.webContents.send(PROCESS_EVENTS.TRANSMIT_CURRENT_LOG, {
        logs,
        lineNumber: totalLineCount,
        filePath,
        totalLineCount,
      } as ILogFile);
    }
  });
};

export const fileService = {
  readLastLog: readLogFile,
  watchFile,
  unWatchFile,
};
