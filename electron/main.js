import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import fs from "fs";
import { URL, fileURLToPath } from "url";
// const { app, BrowserWindow, ipcMain, dialog } = require("electron");
// const path = require("node:path");
// const { URL } = require("node:url");
// const fs = require("node:fs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;
const blobUrls = new Set();

function createWin() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // 建议启用上下文隔离
      allowFileAccess: true,
      preload: path.join(__dirname, "preload.js"), // 如果需要使用预加载脚本
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
  blobUrls.forEach((url) => URL.revokeObjectURL(url));
  blobUrls.clear();
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle("select-and-play", async () => {
  if (!win) {
    return;
  }
  try {
    const { filePaths } = await dialog.showOpenDialog(win, {
      title: "选择文件",
      filters: [{ name: "Audio", extensions: ["mp3", "wav", "m4a"] }],
      properties: ["openFile"],
    });
    if (!filePaths.length) {
      return null;
    }
    const filePath = filePaths[0];
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypeMap = {
      ".mp3": "audio/mpeg",
      ".wav": "audio/wav",
      ".flac": "audio/flac",
      ".ogg": "audio/ogg",
      ".m4a": "audio/mp4",
    };
    const mimeType = mimeTypeMap[ext] || "audio/mpeg";
    const buffer = await fs.readFileSync(filePath);
    const base64 = buffer.toString("base64");
    const blob = new Blob([buffer], { type: mimeType });
    const fileUrl = URL.createObjectURL(blob);
    console.log("fileUrl", fileUrl);
    blobUrls.add(fileUrl);
    return {
      blobUrl: fileUrl,
      fileName: path.basename(filePath),
      fileType: mimeType,
      dataUrl: `data:${mimeType};base64,${base64}`,
    };
  } catch (error) {
    console.error("音频文件处理失败");
    return { error: error };
  }
});

// 释放Blob URL
ipcMain.handle("release-audio-url", (event, blobUrl) => {
  if (blobUrl && blobUrls.has(blobUrl)) {
    URL.revokeObjectURL(blobUrl);
    blobUrls.delete(blobUrl);
    return true;
  }
  return false;
});
