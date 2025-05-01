const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Let electron reloads by itself
if (
  process.env.ELECTRON_DEBUG === "true" ||
  process.env.ELECTRON_DEBUG === "vscode"
) {
  require("electron-reload")(__dirname, {});
}

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    center: true,
    // useContentSize: true,
    frame: false,
    width: 1920,
    height: 1080,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // preload 파일 경로
      contextIsolation: true,
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

  // keep ratio when scaling
  mainWindow.setAspectRatio(16 / 9);
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

ipcMain.on("toggle-fullscreen", (event) => {
  const fullScreenMode = mainWindow.fullScreen;
  mainWindow.setFullScreen(!fullScreenMode);

  // Electron과 Phaser의 상태 동기화
  mainWindow.webContents.send("fullscreen-changed", !fullScreenMode);
});
