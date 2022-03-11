const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  autoUpdater.on("error", () => {
    console.log("error");
  });
  autoUpdater.on("checking-for-update", () => {
    console.log("checking-for-update");
  });
  autoUpdater.on("update-available", () => {
    console.log("update-available");
  });
  autoUpdater.on("update-not-available", () => {
    console.log("update-not-available");
  });
  autoUpdater.on("download-progress", () => {
    console.log("download-progress");
  });
  autoUpdater.on("update-downloaded", () => {
    console.log("update-downloaded");
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
