const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const autoUpdates = require("./updater");

function createWindow(v) {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    title: "test " + v,
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow(app.getVersion());

  ipcMain.handle("updateCheck", async (e) => {
    await autoUpdates.checkForUpdates();
  });
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
