import { BrowserWindow, dialog, ipcMain } from "electron";
import { ITailFileState, PROCESS_EVENTS } from "../definitions";
import { fileService } from "./services/file-service";

export const setupMainEventListeners = (window: BrowserWindow) => {
  ipcMain.on(PROCESS_EVENTS.FILE_SELECT, async () => {
    const files = await dialog.showOpenDialog(window, {
      properties: ["openFile"],
      filters: [{ name: "LOG", extensions: ["log"] }],
    });

    // Multi selection is not allowed
    !files.canceled && fileService.readLastLog(window, files.filePaths[0]);
  });

  ipcMain.on(PROCESS_EVENTS.TAIL_FILE_STATE, (event, args: ITailFileState) => {
    if (args.doTail) {
      fileService.watchFile(window);
    } else {
      fileService.unWatchFile();
    }
  });

  ipcMain.on(PROCESS_EVENTS.MINIMIZE, () => {
    window.minimize();
  });

  ipcMain.on(PROCESS_EVENTS.MAXIMIZE, () => {
    window.maximize();
  });

  ipcMain.on(PROCESS_EVENTS.CLOSE, () => {
    window.close();
  });
};
