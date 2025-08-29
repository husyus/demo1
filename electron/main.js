import { app, BrowserWindow } from "electron";
import { join } from "path";

let win;

function createWin() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // 建议启用上下文隔离
      //   preload: join(__dirname, "preload.js"), // 如果需要使用预加载脚本
    },
  });
  const devUrl = process.argv[2];
  if (devUrl) {
    win.loadURL(devUrl);
    win.webContents.openDevTools(); // 开发时打开调试工具
    win.on("close", () => {
      win = null;
    });
  } else {
    win.loadURL("https://www.baidu.com");
  }
}

app.whenReady().then(() => {
  createWin();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
