"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const electron_1=require("electron");exports.default=e=>{electron_1.ipcMain.on("getAppSettings",((t,n)=>{e.mainWindow.webContents.send("appSettings",{type:n,data:e.settings[n].allSerialized})})),electron_1.ipcMain.on("updateAppSettings",((t,n)=>{e.settings[n.type].set(n.data)}))};