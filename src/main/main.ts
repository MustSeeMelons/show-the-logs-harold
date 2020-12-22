import { app, BrowserWindow } from "electron";
import * as url from "url";
import * as path from "path";
import { setupMainEventListeners } from "./main-events";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 700,
    width: 1024,
    minHeight: 700,
    minWidth: 1024,
    frame: false,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: true,
    alwaysOnTop: false,
  });

  // hiding the default menu
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  setupMainEventListeners(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => {
      console.log(`Added Extension:  ${name}`);
    })
    .catch((err) => {
      console.error("An error occurred: ", err);
    })
    .finally(() => {
      createWindow();
    });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
