import { spawn } from "child_process";
import electron from "electron";
import fs from "fs";

let electronProcess;

export const ElectronDevPlugin = () => {
  return {
    name: "electron-dev-plugin",
    configureServer(server) {
      const startEle = (closeVue) => {
        electronProcess?.kill(); // 终止当前的 Electron 进程
        const addressInfo = server.httpServer?.address();
        const devUrl = `http://localhost:${addressInfo.port}`;
        console.log("Vite 开发服务器地址: ", devUrl);
        electronProcess = spawn(electron, ["electron/main.js", devUrl], {
          stdio: "inherit",
        });
        if (closeVue) {
          electronProcess.on("exit", (code, singal) => {
            console.log("vue3服务关闭...");
            server.close();
            process.exit(code || 0);
          });
        }
      };
      server.httpServer?.on("listening", () => startEle(true));
      fs.watch("electron", () => {
        console.log("Electron 主进程文件发生变化，重启中...");
        startEle(false);
      });
    },
  };
};
