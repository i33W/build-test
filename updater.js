/**
 * updater.js
 *
 * Please use manual update only when it is really required, otherwise please use recommended non-intrusive auto update.
 *
 * Import steps:
 * 1. create `updater.js` for the code snippet
 * 2. require `updater.js` for menu implementation, and set `checkForUpdates` callback from `updater` for the click property of `Check Updates...` MenuItem.
 */
const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;

autoUpdater.on("error", (error) => {
  dialog.showErrorBox(
    "Error: ",
    error == null ? "unknown" : (error.stack || error).toString()
  );
});

autoUpdater.on("update-available", () => {
  dialog
    .showMessageBox({
      type: "info",
      title: "업데이트 확인",
      message: "새로운 업데이트가 있습니다. 지금 다운로드 받으시겠습니까?",
      buttons: ["예", "아니요"],
    })
    .then((buttonIndex) => {
      if (buttonIndex === 0) {
        dialog.showMessageBox({
          title: "업데이트 다운로드",
          message: "업데이트 다운로드를 시작합니다." + buttonIndex,
        });
        autoUpdater.downloadUpdate();
      } else {
        dialog.showMessageBox({
          title: "업데이트 다운로드",
          message: "업데이트 다운로드를 취소하였습니다." + buttonIndex,
        });
      }
    });
});

autoUpdater.on("update-not-available", () => {
  dialog.showMessageBox({
    title: "업데이트 확인",
    message: "현재 최신 버전입니다.",
  });
});

autoUpdater.on("update-downloaded", () => {
  dialog
    .showMessageBox({
      title: "업데이트 설치",
      message:
        "업데이트를 다운로드합니다. 업데이트를 위해 어플리케이션이 종료됩니다.",
    })
    .then(() => {
      setImmediate(() => autoUpdater.quitAndInstall());
    });
});

module.exports = autoUpdater;
