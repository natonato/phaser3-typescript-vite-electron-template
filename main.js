/* eslint-disable no-console */
// @ts-nocheck
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    center: true,
    useContentSize: true,
    // frame: false,
    width: 1920,
    height: 1080,
    minWidth: 1280,
    minHeight: 720,
    resizable: false,
    autoFocus: true,
    webPreferences: {
      // nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      backgroundThrottling: false, // Run the game even if the window is obscured
    },
  });

  // Hot reload
  if (process.env.ELECTRON_HOT === "true") {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "build/index.html"));
  }

  if (process.env.ELECTRON_DEBUG === "true") {
    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  // fullscreen event
  mainWindow.on("enter-full-screen", () => {
    mainWindow?.setResizable(true);
  });
  mainWindow.on("leave-full-screen", () => {
    setTimeout(() => {
      mainWindow?.setResizable(false);
    });
  });

  // keep ratio when scaling
  mainWindow.setAspectRatio(16 / 9);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.removeMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on("resize-window", (event, { width, height }) => {
  changeWindowSize(width, height);
});

function changeWindowSize(width, height) {
  if (mainWindow) {
    mainWindow.setContentSize(width, height);
    mainWindow.center();
  }
}

ipcMain.on("toggle-fullscreen", (eventevent, flag) => {
  mainWindow.setFullScreen(flag);

  // set phaser fullscreen too
  mainWindow.webContents.send("fullscreen-changed", flag);
});

const settingsPath = path.join(app.getPath("userData"), "settings.json");

ipcMain.handle("get-settings", () => {
  if (fs.existsSync(settingsPath)) {
    return JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
  }
  return {
    currentLanguage: "en",
    currentResolutionIdx: 2,
    fullscreenFlag: false,
    volume: { main: 10, effect: 10 },
  }; // default value
});

ipcMain.on("save-settings", (event, settings) => {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings));
  } catch (err) {
    console.log("Error writing settings.json:" + err.message);
  }
});

ipcMain.on("console-log", (event, data) => {
  console.log(`log: ${data?.name || ""}`, data);
});
