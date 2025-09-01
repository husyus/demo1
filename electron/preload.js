const { contextBridge, ipcRenderer } = require("electron");
// import path from "path";
// 向渲染进程暴露有限的API
contextBridge.exposeInMainWorld("electronAudio", {
  selectAndPlay: () => ipcRenderer.invoke("select-and-play"),
  releaseAudioUrl: (url) => ipcRenderer.invoke("release-audio-url", url),
});
